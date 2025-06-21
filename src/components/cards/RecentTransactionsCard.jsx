import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const TransactionItem = ({ icon, category, date, amount, isPositive }) => (
  <div className="flex items-center justify-between py-3">
    <div className="flex items-center gap-4">
      <div className={`p-2 rounded-full ${isPositive ? 'bg-green-100' : 'bg-red-100'}`}>
        {icon}
      </div>
      <div>
        <p className="font-semibold">{category}</p>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
    </div>
    <p className={`font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
      {isPositive ? '+' : '-'}${amount.toLocaleString()}
    </p>
  </div>
);

TransactionItem.propTypes = {
  icon: PropTypes.node.isRequired,
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  isPositive: PropTypes.bool.isRequired,
};

export const RecentTransactionsCard = ({ transactions, className }) => {
  return (
    <motion.div 
      className={`p-6 rounded-2xl shadow-lg ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Recent Transactions</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizIcon />
        </button>
      </div>
      <div>
        {transactions.map((t, index) => (
          <TransactionItem 
            key={index}
            icon={t.isPositive ? <ArrowUpwardIcon className="text-green-500" /> : <ArrowDownwardIcon className="text-red-500" />}
            category={t.category}
            date={t.date}
            amount={t.amount}
            isPositive={t.isPositive}
          />
        ))}
      </div>
    </motion.div>
  );
};

RecentTransactionsCard.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    isPositive: PropTypes.bool.isRequired,
  })).isRequired,
  className: PropTypes.string,
};

RecentTransactionsCard.defaultProps = {
  className: 'bg-white text-gray-900',
}; 