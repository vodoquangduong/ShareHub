// src/pages/ForRenter.tsx
import { useState } from 'react';
import { DatePicker } from 'antd';
import 'antd/dist/reset.css';
import dayjs from 'dayjs';

const PRODUCTS = [
  'Kính chống nắng', 'Vali', 'Mũ', 'Sạc dự phòng', 'Sạc', 'Cặp',
  'Túi xách', 'Gối cổ', 'Tai nghe', 'Dù', 'Camera', 'Loa kéo', 'Quạt cầm tay', 'Khác'
];

const ForRenter = () => {
  const [form, setForm] = useState({
    renterName: '',
    contact: '',
    location: '',
    product: '',
    customProduct: '',
    rentStart: '',
    rentEnd: '',
    request: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleDateChange = (dates: (dayjs.Dayjs | null)[] | null, dateStrings: [string, string]) => {
    if (dates) {
      setForm({ ...form, rentStart: dateStrings[0], rentEnd: dateStrings[1] });
    } else {
      setForm({ ...form, rentStart: '', rentEnd: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.contact) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (!window.confirm("Bạn có chắc muốn gửi yêu cầu này?")) return;

    const formData = new FormData();
    formData.append("sheetName", "Thuê");
    formData.append("renterName", form.renterName);
    formData.append("contact", form.contact);
    formData.append("location", form.location);
    formData.append("product", form.product === 'Khác' ? form.customProduct : form.product);
    formData.append("rentTime", `${form.rentStart} - ${form.rentEnd}`);
    formData.append("request", form.request);

    try {
      await fetch("https://script.google.com/macros/s/AKfycbzjdt-TGC6pI3cXrZ-80ii2VkVtp5bwnTQELgYkIoitXUu-kHu0mQkCykcrXyTw-r-pFA/exec", {
        method: "POST",
        mode: "no-cors",
        body: formData
      });
      alert("Yêu cầu đã được gửi!");
      setForm({ renterName: '', contact: '', location: '', product: '', customProduct: '', rentStart: '', rentEnd: '', request: '' });
    } catch {
      alert("Gửi thất bại!");
    }
  };

  return (
    <div className="bg-white/95 text-black px-6 py-10 max-w-6xl mx-auto mt-20 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Yêu cầu thuê đồ</h2>
      <p className="text-xl text-center text-gray-700 max-w-4xl mx-auto">
      Bạn có bao giờ cảm thấy thiếu thiếu món đồ gì đó khi đi du lịch? Mà mua thì chỉ dùng ít lần.
      <div>
      Đừng để chuyến du lịch của bạn bị ảnh hưởng bởi những bất tiện nhỏ này. Điền những thông tin dưới đây và Travelity sẽ tìm món đồ đó cho bạn ngay!
      </div>
      </p>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <h3 className="text-xl font-semibold border-b pb-2">Thông tin người thuê</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Tên bạn</label>
            <input name="renterName" value={form.renterName} onChange={handleChange} placeholder="Họ và tên"  className="w-full border border-black p-3 rounded-md bg-white" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Thông tin liên hệ <span className='text-red-500 italic'>(*)</span></label>
            <input name="contact" value={form.contact} onChange={handleChange}  placeholder="Email, SĐT, Zalo..." className="w-full border border-black p-3 rounded-md bg-white" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nơi thuê</label>
            <input name="location" value={form.location} onChange={handleChange} placeholder="Tỉnh/Thành phố" className="w-full border border-black p-3 rounded-md bg-white" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 underline"><span className='text-red-500 italic'>(*)</span> Điều khoản và bảo mật</label>
            <label className="block text-sm font-medium mb-1 italic"> Chúng tôi thu thập thông tin để thông báo và kết nối bạn với người đang có sản phẩm bạn cần thuê, ở nơi bạn muốn thuê!</label>
            </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold border-b pb-2">Thông tin yêu cầu thuê</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Chọn sản phẩm</label>
            <select name="product" value={form.product} onChange={handleChange} className="w-full border border-black p-3 rounded-md bg-white" required>
              <option value="">-- Chọn sản phẩm --</option>
              {PRODUCTS.map((item, idx) => <option key={idx} value={item}>{item}</option>)}
            </select>
          </div>
          {form.product === 'Khác' && (
            <div>
              <label className="block text-sm font-medium mb-1">Tên sản phẩm khác</label>
              <input name="customProduct" value={form.customProduct} onChange={handleChange} placeholder="Tên sản phẩm khác" className="w-full border border-black p-3 rounded-md bg-white" required />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">Thời gian thuê dự kiến</label>
            <DatePicker.RangePicker
              className="w-full border border-black p-2 rounded-md bg-white"
              format="DD/MM/YYYY"
              onChange={handleDateChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ghi chú thêm</label>
            <textarea name="request" value={form.request} onChange={handleChange} rows={4} className="w-full border border-black p-3 rounded-md bg-white" placeholder="Bạn muốn thuê gì? Ghi rõ thêm yêu cầu nếu có..." />
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 text-white">
          <button type="submit" className="w-full py-3 px-6 rounded-md bg-blue-600 hover:bg-blue-700 transition">Gửi thông tin</button>
        </div>
      </form>
    </div>
  );
};

export default ForRenter;