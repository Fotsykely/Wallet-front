import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import TransactionPage from '@/pages/transactions/TransactionPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        {/* Routes imbriquées */}
        <Route index element={<DashboardPage />} /> 
        <Route path="Transactions" element={<TransactionPage />} />
        {/* Ajoutez d'autres routes ici si nécessaire */}
      </Route>
    </Routes>
  );
}

export default App;