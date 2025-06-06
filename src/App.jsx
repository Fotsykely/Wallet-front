import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardPage } from './pages/Dashboard/DashboardPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        {/* <Route index element={<DashboardPage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;