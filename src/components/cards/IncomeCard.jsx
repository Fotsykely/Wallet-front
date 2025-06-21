import { CallReceived } from '@mui/icons-material';
import { StatCard } from '../ui/StatCard';

export const IncomeCard = ({ amount, percentage, trend = 'up' }) => {
  return (
    <StatCard
      title="Income"
      amount={`+$${amount.toLocaleString()}`}
      percentage={percentage}
      trend={trend}
      icon={<CallReceived sx={{ fontSize: 24, color: '#16a34a' }} />}
      iconBgColor="#e6f7e6"
    />
  );
};