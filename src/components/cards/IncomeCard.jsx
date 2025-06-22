import { CallReceived } from '@mui/icons-material';
import { StatCard } from '../ui/StatCard';
import { money } from '@/resources/content';

export const IncomeCard = ({ amount, percentage, trend = 'up', className }) => {
  return (
    <StatCard
      title="Income"
      amount={`${amount.toLocaleString()} ${money.abréviation}`}
      percentage={percentage}
      trend={trend}
      icon={<CallReceived sx={{ fontSize: 24, color: '#16a34a' }} />}
      iconBgColor="#e6f7e6"
      className={className}
    />
  );
};