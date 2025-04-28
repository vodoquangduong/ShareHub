import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white/90 text-black px-6 py-16 max-w-4xl mx-auto mt-24 rounded-xl shadow-lg text-center space-y-6">
      <h2 className="text-4xl font-bold">Chào mừng đến với Travelity</h2>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto">
      Travelity là nơi kết nối người cho thuê và người thuê với những món đồ cần thiết khi du lịch, để bạn đảm bảo một chuyến đi đầy đủ và mượt mà!
      </p>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto">
      Hãy bắt đầu bằng cách cho chúng tôi biết bạn là ai.
      </p>
      <h3 className="text-xl font-semibold mt-6">Bạn là?</h3>
      <div className="flex justify-center gap-6 mt-4 text-white">
        <button
          onClick={() => navigate('/nguoi-cho-thue')}
          className="bg-blue-600 hover:bg-blue-700  px-6 py-3 rounded-md  transition"
        >
          Người cho thuê
        </button>
        <button
          onClick={() => navigate('/nguoi-thue')}
          className="bg-blue-600 hover:bg-blue-700  px-6 py-3 rounded-md transition"
        >
          Người thuê
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
