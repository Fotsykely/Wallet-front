import { AccountBalanceWallet } from '@mui/icons-material';
import { StatCard } from '../ui/StatCard';

export const SummaryCard = ({ amount, className}) => {
  return (
    <StatCard
      title="Compte total"
      amount={`$${amount.toLocaleString()}`}
      percentage={''}
      trend={''}
      icon={<AccountBalanceWallet sx={{ fontSize: 24, color: '#2563eb' }} />}
      iconBgColor="#e0e7ff"
      className={className}
    />
  );
};