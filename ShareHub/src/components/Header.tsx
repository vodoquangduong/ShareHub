import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white text-black border-b border-gray-300 px-6 py-5 flex justify-between items-center fixed top-0 left-0 right-0 z-10 w-full">
      <h1 className="text-3xl font-bold tracking-tight">
        <Link to="/" className="text-black hover:text-gray-800">Travelity</Link>
      </h1>      <nav className="space-x-10 text-lg font-semibold">
        <Link to="/nguoi-thue" className="text-black hover:text-gray-800 hover:underline visited:text-black active:text-black focus:text-black">Người thuê</Link>
        <Link to="/nguoi-cho-thue" className="text-black hover:text-gray-800 hover:underline visited:text-black active:text-black focus:text-black">Người cho thuê</Link>
        <Link to="/gop-y" className="text-black hover:text-gray-800 hover:underline visited:text-black active:text-black focus:text-black">Góp ý</Link>
      </nav>
    </header>
  );
};

export default Header;