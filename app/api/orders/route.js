import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { putOrder } from '@/lib/dynamodb';
import { menuItems } from '@/lib/menu-data';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const body = await request.json();
    const { customerName, phone, itemId, quantity, notes } = body;

    // Basic validation
    if (!customerName || !phone || !itemId || !quantity) {
      return NextResponse.json(
        { error: 'Thiếu thông tin bắt buộc' },
        { status: 400 }
      );
    }

    const item = menuItems.find((m) => m.id === itemId);
    if (!item) {
      return NextResponse.json(
        { error: 'Món không tồn tại' },
        { status: 400 }
      );
    }

    const qty = Math.max(1, Math.min(20, parseInt(quantity) || 1));
    const order = {
      orderId: randomUUID(),
      createdAt: new Date().toISOString(),
      customerName: String(customerName).slice(0, 100),
      phone: String(phone).slice(0, 20),
      itemId,
      itemName: item.name,
      unitPrice: item.price,
      quantity: qty,
      total: item.price * qty,
      notes: String(notes || '').slice(0, 500),
      status: 'pending',
    };

    try {
      await putOrder(order);
    } catch (dbErr) {
      if (process.env.NODE_ENV === 'production') {
        console.error('[orders] DynamoDB write failed:', dbErr);
        return NextResponse.json(
          { error: 'Không lưu được đơn hàng' },
          { status: 500 }
        );
      }

      console.warn('[orders] DynamoDB write failed, continuing in local demo mode:', dbErr.message);
    }

    return NextResponse.json({ ok: true, orderId: order.orderId });
  } catch (err) {
    console.error('[orders] error:', err);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
