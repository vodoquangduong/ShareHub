import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout.tsx';
import ForRenter from './pages/ForRenter';
import ForOwner from './pages/ForOwner';
import Feedback from './pages/Feedback.tsx';
import LandingPage from './pages/Landingpage.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="nguoi-thue" element={<ForRenter />} />
        <Route path="nguoi-cho-thue" element={<ForOwner />} />
        <Route path="gop-y" element={<Feedback />} />
      </Route>
    </Routes>
  );
}
export default App;
