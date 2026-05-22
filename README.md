# ☕ Brew & Bean — Next.js Coffee Shop on AWS

A small Next.js 14 coffee-shop website built as a self-directed learning project
to understand how AWS compute, database, and storage services work together.

> **Architecture:** User → EC2 (Next.js) → DynamoDB (orders) → S3 (images)

---

## ✨ Features

- **Home** — hero, intro, featured drinks
- **Menu** — 8 drinks loaded with images from S3
- **Gallery** — masonry-style photo grid (S3-hosted)
- **Order** — form that writes orders to DynamoDB via `/api/orders`

The app works locally **without** AWS configured (images fall back to demo
Unsplash photos, DynamoDB writes are skipped with a warning). When you add AWS
credentials and resources, everything lights up.

---

## 🛠 Tech Stack

| Layer       | Technology                              |
|-------------|-----------------------------------------|
| Frontend    | Next.js 14 (App Router), React 18       |
| Styling     | Plain CSS with custom design system     |
| Backend     | Next.js API Routes (Node.js runtime)    |
| Database    | DynamoDB via `@aws-sdk/lib-dynamodb`    |
| Storage     | S3 via `@aws-sdk/client-s3`             |
| Compute     | EC2 (Amazon Linux 2023, Node.js 20)     |

---

## 🚀 Quick Start (local)

```bash
# 1. Install deps
npm install

# 2. Copy env example
cp .env.local.example .env.local

# 3. (Optional) Fill in AWS config — see "AWS Setup" below.
#    If you skip this, the app still runs with placeholders.

# 4. Run dev server
npm run dev
# → http://localhost:3000
```

---

## ☁️ AWS Setup

### 1. Create S3 bucket for images

```bash
aws s3 mb s3://my-coffee-bucket --region ap-southeast-1
```

You can keep the bucket private. The app uses the AWS SDK on the Next.js server
to create presigned image URLs. Upload images keeping the folder structure:

```bash
aws s3 cp ./my-images/espresso.jpg     s3://my-coffee-bucket/menu/espresso.jpg
aws s3 cp ./my-images/latte-rose.jpg   s3://my-coffee-bucket/menu/latte-rose.jpg
# ... (see lib/menu-data.js for all keys)
aws s3 cp ./my-images/shop.jpg         s3://my-coffee-bucket/gallery/shop-interior.jpg
```

Set `S3_BUCKET_NAME` in `.env.local` when you want to serve the images from
your bucket. Leave it blank to keep using the built-in Unsplash demo images.

```
S3_BUCKET_NAME=my-coffee-bucket
S3_PRESIGNED_URL_TTL_SECONDS=3600
```

Optional: if you want a public bucket or CloudFront URL instead of presigned
URLs, set `NEXT_PUBLIC_S3_BASE_URL`:

```
NEXT_PUBLIC_S3_BASE_URL=https://my-coffee-bucket.s3.ap-southeast-1.amazonaws.com
```

For a public learning bucket, untick **Block all public access** and add this
bucket policy (replace bucket name):

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicRead",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::my-coffee-bucket/*"
  }]
}
```

### 2. Create DynamoDB table

```bash
aws dynamodb create-table \
  --table-name CoffeeOrders \
  --attribute-definitions AttributeName=orderId,AttributeType=S \
  --key-schema AttributeName=orderId,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region ap-southeast-1
```

Single partition key `orderId` (string) — simplest possible schema for a
learning project.

### 3. Launch EC2 instance

1. **AMI:** Amazon Linux 2023
2. **Type:** `t3.micro` (free tier eligible)
3. **Security group:** open inbound TCP **22** (SSH), **80** (HTTP), **3000** (Node)
4. **IAM role:** create a role with these policies and attach to the instance:
   - `AmazonDynamoDBFullAccess` (or scope down to just `PutItem` on the table)
   - `AmazonS3ReadOnlyAccess` (needed for presigned image URLs)

Then SSH in and set things up:

```bash
# Install Node.js 20
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs git

# Clone your repo
git clone https://github.com/<your-username>/brew-and-bean.git
cd brew-and-bean

# Install + build
npm install
npm run build

# Create production env file
cat > .env.local <<EOF
AWS_REGION=ap-southeast-1
DYNAMODB_ORDERS_TABLE=CoffeeOrders
S3_BUCKET_NAME=my-coffee-bucket
S3_PRESIGNED_URL_TTL_SECONDS=3600
# NEXT_PUBLIC_S3_BASE_URL=https://my-coffee-bucket.s3.ap-southeast-1.amazonaws.com
EOF

# Run with PM2 so it survives reboots
sudo npm install -g pm2
pm2 start "npm start" --name brew-and-bean
pm2 save
pm2 startup    # follow the printed command
```

Visit `http://<ec2-public-ip>:3000` 🎉

> **Tip:** put nginx in front to serve on port 80, or use an Application Load
> Balancer if you want HTTPS via ACM.

---

## 📂 Project Structure

```
brew-and-bean/
├── app/
│   ├── layout.js              # Root layout + fonts
│   ├── page.js                # Home
│   ├── globals.css            # Design system
│   ├── menu/page.js           # Menu (server component, reads S3 URLs)
│   ├── gallery/page.js        # Gallery
│   ├── order/page.js          # Order form (client component)
│   └── api/orders/route.js    # POST → DynamoDB
├── components/
│   └── Navbar.js
├── lib/
│   ├── menu-data.js           # Menu items + price formatter
│   ├── s3.js                  # S3 SDK client + image URL helpers
│   └── dynamodb.js            # DynamoDB DocumentClient + putOrder()
├── .env.local.example
├── next.config.js
├── jsconfig.json              # @ path alias
└── package.json
```

---

## 🧪 Testing the order flow

1. Open `/order`
2. Fill in name, phone, pick a drink, submit
3. Check DynamoDB:

```bash
aws dynamodb scan --table-name CoffeeOrders --region ap-southeast-1
```

You should see your order item.

---

## 🐙 Push to GitHub

```bash
# from project root
git init
git add .
git commit -m "Initial commit: Brew & Bean Next.js coffee shop"
git branch -M main

# create a new empty repo on github.com first (no README, no .gitignore)
git remote add origin https://github.com/<your-username>/brew-and-bean.git
git push -u origin main
```

---

## 📚 What I learned

Building this taught me how the three core AWS service categories connect in a
real app:

- **Compute (EC2)** runs the Next.js server — both the static pages and the
  `/api/orders` route handler. The IAM role attached to the instance is what
  lets the app call AWS APIs without hardcoded credentials.
- **Database (DynamoDB)** stores customer orders. Using the high-level
  `DocumentClient` from the v3 SDK keeps the code simple — just `PutCommand`
  with a JS object, no manual type marshalling.
- **Storage (S3)** holds product images. The Next.js server creates presigned
  URLs with the AWS SDK for private buckets, or uses `NEXT_PUBLIC_S3_BASE_URL`
  directly when you put S3/CloudFront in front of the images.

The key insight: each service has one clear responsibility, and they're glued
together by the IAM role on EC2 plus environment variables pointing to the
right table/bucket.

---

## 📝 License

MIT — free to fork and learn from.
