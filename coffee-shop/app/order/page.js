'use client';

import { useState } from 'react';
import { menuItems, formatVND } from '@/lib/menu-data';

export default function OrderPage() {
  const [form, setForm] = useState({
    customerName: '',
    phone: '',
    itemId: menuItems[0].id,
    quantity: 1,
    notes: '',
  });
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'
  const [message, setMessage] = useState('');

  const selectedItem = menuItems.find((m) => m.id === form.itemId);
  const total = selectedItem ? selectedItem.price * form.quantity : 0;

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setMessage('');

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Order failed');

      setStatus('success');
      setMessage(`Đã ghi nhận đơn hàng #${data.orderId.slice(0, 8)}. Cảm ơn bạn!`);
      setForm({
        customerName: '',
        phone: '',
        itemId: menuItems[0].id,
        quantity: 1,
        notes: '',
      });
    } catch (err) {
      setStatus('error');
      setMessage(err.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
    }
  }

  return (
    <div className="container">
      <div className="page-title">
        <span className="eyebrow">Order</span>
        <h1>Đặt một ly</h1>
        <p>Điền thông tin bên dưới — chúng tôi sẽ pha ngay khi bạn đến.</p>
      </div>

      <div className="order-wrapper">
        <div className="order-info">
          <h2>Tóm tắt</h2>
          <p>Đơn hàng được lưu vào DynamoDB. Bạn có thể thanh toán khi đến quán.</p>
          <ul className="order-info-list">
            <li>
              <span>Món</span>
              <span>{selectedItem?.name}</span>
            </li>
            <li>
              <span>Số lượng</span>
              <span>{form.quantity}</span>
            </li>
            <li>
              <span>Đơn giá</span>
              <span>{selectedItem ? formatVND(selectedItem.price) : '—'}</span>
            </li>
            <li style={{ fontWeight: 600, color: 'var(--accent)' }}>
              <span>Tổng</span>
              <span>{formatVND(total)}</span>
            </li>
          </ul>
        </div>

        <form className="order-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="customerName">Họ tên</label>
            <input
              id="customerName"
              type="text"
              required
              value={form.customerName}
              onChange={(e) => update('customerName', e.target.value)}
              placeholder="Nguyễn Văn A"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Số điện thoại</label>
            <input
              id="phone"
              type="tel"
              required
              pattern="[0-9]{9,11}"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              placeholder="09xxxxxxxx"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="itemId">Chọn món</label>
              <select
                id="itemId"
                value={form.itemId}
                onChange={(e) => update('itemId', e.target.value)}
              >
                {menuItems.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} — {formatVND(m.price)}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Số lượng</label>
              <input
                id="quantity"
                type="number"
                min="1"
                max="20"
                value={form.quantity}
                onChange={(e) => update('quantity', parseInt(e.target.value) || 1)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Ghi chú</label>
            <textarea
              id="notes"
              value={form.notes}
              onChange={(e) => update('notes', e.target.value)}
              placeholder="Ít đá, ít đường..."
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Đang gửi...' : 'Đặt hàng'}
          </button>

          {message && (
            <div className={`form-message ${status}`}>{message}</div>
          )}
        </form>
      </div>
    </div>
  );
}
