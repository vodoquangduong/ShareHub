// src/pages/ForOwner.tsx
import { useState } from 'react';
import { DatePicker } from 'antd';
import 'antd/dist/reset.css';
import dayjs from 'dayjs';

const PRODUCTS = [
  'Kính chống nắng', 'Vali', 'Mũ', 'Sạc dự phòng', 'Sạc', 'Cặp',
  'Túi xách', 'Gối cổ', 'Tai nghe', 'Dù', 'Camera', 'Loa kéo', 'Quạt cầm tay', 'Khác'
];

const ForOwner = () => {
  const [form, setForm] = useState({
    ownerName: '', product: '', customProduct: '', location: '',
    note: '', contact: '', startDate: '', endDate: '', price: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleDateChange = (dates: (dayjs.Dayjs | null)[] | null, dateStrings: [string, string]) => {
    if (dates) {
      setForm({ ...form, startDate: dateStrings[0], endDate: dateStrings[1] });
    } else {
      setForm({ ...form, startDate: '', endDate: '' });
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!form.ownerName || !form.product || !form.location || !form.contact || !form.startDate || !form.endDate) {
  //     alert("Vui lòng điền đầy đủ các trường bắt buộc");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("ownerName", form.ownerName);
  //   formData.append("contact", form.contact);
  //   formData.append("location", form.location);
  //   formData.append("product", form.product === "Khác" ? form.customProduct : form.product);
  //   formData.append("time", `${form.startDate} - ${form.endDate}`);
  //   formData.append("price", form.price);
  //   formData.append("note", form.note);

  //   try {
  //     await fetch("https://script.google.com/macros/s/AKfycbzjdt-TGC6pI3cXrZ-80ii2VkVtp5bwnTQELgYkIoitXUu-kHu0mQkCykcrXyTw-r-pFA/exec", {
  //       method: "POST",
  //       body: formData,
  //       mode: "no-cors", // BẮT BUỘC khi dùng FormData với Google Apps Script
  //     });

  //     alert("Đã gửi thành công!");
  //     setForm({
  //       ownerName: '', product: '', customProduct: '', location: '',
  //       note: '', contact: '', startDate: '', endDate: '', price: ''
  //     });
  //   } catch (error) {
  //     alert("Gửi thất bại!");
  //     console.error("Submit error:", error);
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.ownerName || !form.product || !form.location || !form.contact || !form.startDate || !form.endDate) {
      alert("Vui lòng điền đầy đủ các trường bắt buộc");
      return;
    }

    const confirmSend = window.confirm("Bạn có chắc muốn gửi thông tin này?");
    if (!confirmSend) return;

    const formData = new FormData();
    formData.append("sheetName", "Cho thuê");
    formData.append("ownerName", form.ownerName);
    formData.append("contact", form.contact);
    formData.append("location", form.location);
    formData.append("product", form.product === "Khác" ? form.customProduct : form.product);
    formData.append("time", `${form.startDate} - ${form.endDate}`);
    formData.append("price", form.price);
    formData.append("note", form.note);

    try {
      await fetch("https://script.google.com/macros/s/AKfycbzjdt-TGC6pI3cXrZ-80ii2VkVtp5bwnTQELgYkIoitXUu-kHu0mQkCykcrXyTw-r-pFA/exec", {
        method: "POST",
        mode: "no-cors",
        body: formData
      });

      alert("Đã gửi thành công!");
      setForm({
        ownerName: '', product: '', customProduct: '', location: '',
        note: '', contact: '', startDate: '', endDate: '', price: ''
      });
    } catch (error) {
      alert("Gửi thất bại!");
      console.error("Submit error:", error);
    }
  };




  return (
    <div className="bg-white text-black rounded-2xl shadow-lg p-8 w-full max-w-6xl mx-auto my-20">
      <h2 className="text-3xl font-bold text-center mb-8">Đăng thông tin cho thuê</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <h3 className="text-xl font-semibold border-b pb-2">Thông tin người cho thuê</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Tên người cho thuê</label>
            <input name="ownerName" value={form.ownerName} onChange={handleChange} placeholder="Họ và tên" className="w-full border border-black p-2 rounded-md bg-white" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Thông tin liên hệ <span className='text-red-500 italic'>(*)</span></label>
            <input name="contact" value={form.contact} onChange={handleChange} placeholder="Email, SĐT, Zalo..." className="w-full border border-black p-2 rounded-md bg-white" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nơi cho thuê</label>
            <input name="location" value={form.location} onChange={handleChange} placeholder="Tỉnh/Thành phố" className="w-full border border-black p-2 rounded-md bg-white" required />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold border-b pb-2">Thông tin sản phẩm cho thuê</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Sản phẩm</label>
            <select name="product" value={form.product} onChange={handleChange} className="w-full border border-black p-2 rounded-md bg-white" required>
              <option value="">-- Chọn sản phẩm --</option>
              {PRODUCTS.map((p, i) => <option key={i} value={p}>{p}</option>)}
            </select>
          </div>
          {form.product === 'Khác' && (
            <div>
              <label className="block text-sm font-medium mb-1">Tên sản phẩm khác</label>
              <input name="customProduct" value={form.customProduct} onChange={handleChange} placeholder="Tên sản phẩm khác" className="w-full border border-black p-2 rounded-md bg-white" required />
            </div>
          )}
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Thời gian</label>
              <DatePicker.RangePicker
                className="w-full border border-black p-2 rounded-md bg-white"
                format="DD/MM/YYYY"
                onChange={handleDateChange}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Giá (VNĐ/ngày)</label>
              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                type="number"
                placeholder="50000"
                min={1000}
                step={1000}
                className="w-full border border-black p-2 rounded-md bg-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ghi chú</label>
            <textarea name="note" value={form.note} onChange={handleChange} placeholder="Tình trạng, yêu cầu thêm..." className="w-full border border-black p-2 rounded-md bg-white" rows={4}></textarea>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 text-white">
          <button type="submit" className="w-full bg-black py-3 px-6 rounded-md hover:bg-gray-800 transition">Gửi thông tin</button>
        </div>
      </form>
    </div>
  );
};

export default ForOwner;