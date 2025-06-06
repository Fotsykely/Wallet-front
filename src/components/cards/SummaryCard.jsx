import PropTypes from 'prop-types';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { Card } from '../ui/card';

export const SummaryCard = ({ title, value, trend }) => {
  return (
    <Card>
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="flex items-end justify-between">
          <span className="text-2xl font-bold">{value}</span>
          {trend && (
            <span className={`flex items-center text-sm ${
              trend.direction === 'up' ? 'text-green-500' : 'text-red-500'
            }`}>
              {trend.direction === 'up' ? (
                <ArrowUpward className="!h-4 !w-4" />
              ) : (
                <ArrowDownward className="!h-4 !w-4" />
              )}
              {trend.value}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};

SummaryCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  trend: PropTypes.shape({
    value: PropTypes.string,
    direction: PropTypes.oneOf(['up', 'down']),
  }),
};