/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

export const StatCard = ({ 
  title, 
  amount, 
  percentage, 
  trend, 
  icon, 
  iconBgColor,
  className = '',
  ...props 
}) => {
  const isPositive = trend === 'up';
  const isNegative = trend === 'down';
  
  return (
    <motion.div
      className={`rounded-2xl p-6 shadow-lg border  ${className}`}
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      {...props}
      style={{ minHeight: '140px' }}
    >
      <div className="flex flex-col h-full">
        {/* Header: Icone et Titre */}
        <div className="flex items-center mb-4">
          <div 
            className="p-3 rounded-xl mr-4"
            style={{ backgroundColor: iconBgColor }}
          >
            {icon}
          </div>
          <h3 className="text-sm font-medium uppercase tracking-wide">
            {title}
          </h3>
        </div>

        {/* Body: Montant et Pourcentage */}
        <div className="mt-auto flex items-end justify-between">
          <p className="text-3xl font-bold">
            {amount}
          </p>
          <div 
            className="px-3 py-1 rounded-lg flex items-center gap-1"
            style={{ 
              backgroundColor: isPositive ? 'rgba(22, 163, 74, 0.1)' : isNegative ? 'rgba(220, 38, 38, 0.1)'  : 'transparent'
            }}
          >
            {isPositive ? (
              <TrendingUp sx={{ fontSize: 14, color: '#16a34a' }} />
            ) : isNegative ?(
              <TrendingDown sx={{ fontSize: 14, color: '#dc2626' }} />
            ):
              null
            }
            <span 
              className="text-xs font-semibold"
              style={{ color: isPositive ? '#16a34a' : '#dc2626' }}
            >
              {percentage}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};