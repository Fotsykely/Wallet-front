import { AccountBalanceWallet } from '@mui/icons-material';
import { StatCard } from '../ui/StatCard';
import { money } from '@/resources/content';

export const SummaryCard = ({ amount, budget, remaining, percentUsed, className }) => {
  return (
    <StatCard
      title="Balance"
      amount={`${amount.toLocaleString()} ${money.abréviation}`}
      percentage={''}
      trend={''}
      icon={<AccountBalanceWallet sx={{ fontSize: 24, color: '#2563eb' }} />}
      iconBgColor="#e0e7ff"
      className={`${className} h-full`} // Ajout de h-full ici
    >
      {budget !== undefined && budget > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          {/* Infos sur une seule ligne avec Flexbox */}
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span>Budget: {budget.toLocaleString()}</span>
            <span>Reste: <span className="font-medium text-gray-700 dark:text-gray-200">{remaining.toLocaleString()}</span></span>
          </div>
          
          {/* Barre de progression */}
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 mb-1">
            <div
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: `${percentUsed}%`,
                backgroundColor: percentUsed < 80 ? '#4caf50' : percentUsed < 100 ? '#ff9800' : '#f44336'
              }}
            ></div>
          </div>
          
          {/* Pourcentage aligné à droite */}
          <div className="text-right text-[10px] text-gray-400">
            {percentUsed.toFixed(1)}% utilisé
          </div>
        </div>
      )}
    </StatCard>
  );
};