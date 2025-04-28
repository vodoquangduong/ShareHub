import { useState } from 'react';

const Feedback = () => {
  const [form, setForm] = useState({
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.message) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (!window.confirm("Bạn có chắc muốn gửi góp ý này?")) return;

    const formData = new FormData();
    formData.append("sheetName", "Góp ý");
    formData.append("email", form.email);
    formData.append("message", form.message);

    try {
      await fetch("https://script.google.com/macros/s/AKfycbzjdt-TGC6pI3cXrZ-80ii2VkVtp5bwnTQELgYkIoitXUu-kHu0mQkCykcrXyTw-r-pFA/exec", {
        method: "POST",
        mode: "no-cors",
        body: formData
      });
      alert("Đã gửi góp ý!");
      setForm({ email: '', message: '' });
    } catch {
      alert("Gửi thất bại!");
    }
  };

  return (
    <div className="bg-white/80 text-black px-6 py-10 max-w-3xl mx-auto mt-20 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Góp ý & Phản hồi</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Email của bạn</label>
          <input name="email" value={form.email} onChange={handleChange} className="w-full border border-black p-3 rounded-md bg-white" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Nội dung góp ý</label>
          <textarea name="message" value={form.message} onChange={handleChange} rows={4} className="w-full border border-black p-3 rounded-md bg-white" placeholder="Góp ý của bạn về dịch vụ hoặc trải nghiệm..." required></textarea>
        </div>
        <div className="col-span-1 md:col-span-2 text-white">
          <button type="submit" className="w-full  py-3 px-6 rounded-md bg-blue-600 hover:bg-blue-700 transition">Gửi thông tin</button>
        </div>
      </form>
    </div>
  );
};

export default Feedback;
