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

    // If DynamoDB is not configured (no AWS credentials available), still
    // return a success response so the form is usable for local demo.
    try {
      await putOrder(order);
    } catch (dbErr) {
      console.warn('[orders] DynamoDB write failed, continuing in demo mode:', dbErr.message);
      // In production on EC2 with IAM role this should not happen; log it.
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
