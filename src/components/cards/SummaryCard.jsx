import { AccountBalanceWallet } from '@mui/icons-material';
import { StatCard } from '../ui/StatCard';
import { money } from '@/resources/content';

export const SummaryCard = ({ amount, budget, spent, remaining, percentUsed, className }) => {
  return (
    <StatCard
      title="Balance"
      amount={`${amount.toLocaleString()} ${money.abréviation}`}
      percentage={''}
      trend={''}
      icon={<AccountBalanceWallet sx={{ fontSize: 24, color: '#2563eb' }} />}
      iconBgColor="#e0e7ff"
      className={className}
    >
      {budget !== undefined && budget > 0 && (
        <div className="mt-4 text-xs">
          <div>Budget : <b>{budget.toLocaleString()} {money.abréviation}</b></div>
          <div>Dépensé : {spent.toLocaleString()} {money.abréviation}</div>
          <div>Reste : {remaining.toLocaleString()} {money.abréviation}</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div
              className="h-2.5 rounded-full"
              style={{
                width: `${percentUsed}%`,
                backgroundColor: percentUsed < 80 ? '#4caf50' : percentUsed < 100 ? '#ff9800' : '#f44336'
              }}
            ></div>
          </div>
          <div className="text-right mt-1">{percentUsed.toFixed(1)}% utilisé</div>
        </div>
      )}
    </StatCard>
  );
};