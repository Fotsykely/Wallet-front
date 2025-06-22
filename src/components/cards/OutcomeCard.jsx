import { CallMade } from '@mui/icons-material';
import { StatCard } from '../ui/StatCard';
import { money } from '@/resources/content';

export const OutcomeCard = ({ amount, percentage, trend = 'down', className }) => {
  return (
    <StatCard
      title="Outcome"
      amount={`${amount.toLocaleString()} ${money.abréviation}`}
      percentage={percentage}
      trend={trend}
      icon={<CallMade sx={{ fontSize: 24, color: '#dc2626' }} />}
      iconBgColor="#fde8e8"
      className={className}
    />
  );
};