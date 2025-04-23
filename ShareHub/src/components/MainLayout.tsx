import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <div
    className="flex flex-col min-h-screen w-screen"
    style={{
      backgroundImage: 'url("/bg2.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
  >
    <Header />
    <main className="flex-1 pt-24 px-4 md:px-8 w-full max-w-screen-xl mx-auto  bg-opacity-50 rounded-xl">
      <Outlet />
    </main>
    <Footer />
  </div>
  
  );
};

export default MainLayout;