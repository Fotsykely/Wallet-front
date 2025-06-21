import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

export const IncomeChart = () => {
  return (
    <div className="h-[300px] w-[800px]">
      <h4 className="mb-4 font-medium">Financial Analytics</h4>
      <div className="bg-red-500 text-white p-4">
          Test Tailwind
        </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
        
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#6366f1" 
            fill="#6366f1" 
            fillOpacity={0.2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};