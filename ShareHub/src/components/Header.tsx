import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Header = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        // Scroll xuống ➔ Ẩn header
        setShow(false);
      } else {
        // Scroll lên ➔ Hiện header
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [lastScrollY]);

  return (
    <header
      className={`bg-white text-black border-b border-gray-300 shadow-sm fixed top-0 left-0 right-0 z-50 w-full h-16 md:h-20 flex items-center justify-between px-4 md:px-8 transition-transform duration-300 ${
        show ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
        <Link to="/" className="text-black hover:text-gray-800">Travelity</Link>
      </h1>
      <nav className="space-x-6 md:space-x-10 text-base md:text-lg font-semibold">
        <Link to="/nguoi-thue" className="text-black hover:text-gray-800 hover:underline">Người thuê</Link>
        <Link to="/nguoi-cho-thue" className="text-black hover:text-gray-800 hover:underline">Người cho thuê</Link>
        <Link to="/gop-y" className="text-black hover:text-gray-800 hover:underline">Góp ý</Link>
      </nav>
    </header>
  );
};

export default Header;
