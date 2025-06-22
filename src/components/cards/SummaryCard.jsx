import { AccountBalanceWallet } from '@mui/icons-material';
import { StatCard } from '../ui/StatCard';
import { money } from '@/resources/content';

export const SummaryCard = ({ amount, className}) => {
  return (
    <StatCard
      title="Balance"
      amount={`${amount.toLocaleString()} ${money.abréviation}`}
      percentage={''}
      trend={''}
      icon={<AccountBalanceWallet sx={{ fontSize: 24, color: '#2563eb' }} />}
      iconBgColor="#e0e7ff"
      className={className}
    />
  );
};