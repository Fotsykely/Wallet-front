import { CallMade } from '@mui/icons-material';
import { StatCard } from '../ui/StatCard';

export const OutcomeCard = ({ amount, percentage, trend = 'down', className }) => {
  return (
    <StatCard
      title="Outcome"
      amount={`-$${amount.toLocaleString()}`}
      percentage={percentage}
      trend={trend}
      icon={<CallMade sx={{ fontSize: 24, color: '#dc2626' }} />}
      iconBgColor="#fde8e8"
      className={className}
    />
  );
};