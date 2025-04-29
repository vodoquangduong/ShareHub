import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const MainLayout = () => {
  const location = useLocation();

  const isHome = location.pathname === '/';
  const backgroundImage = isHome ? '/new_bg.jpg' : '/new_bg_2.webp';
  const isMain = location.pathname === '/nguoi-thue' || location.pathname === '/nguoi-cho-thue';
  return (
    <div
      className="flex flex-col min-h-screen w-screen"
      style={{
        backgroundImage: `url("${backgroundImage}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Header />
      <main
        className={`flex-1 px-4 md:px-8 w-full max-w-screen-xl mx-auto bg-white/0 rounded-xl
          ${!isMain ? 'pt-20 md:pt-20' : 'pt-200 md:pt-20'}
        `}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
