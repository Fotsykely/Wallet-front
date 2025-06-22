import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

const AnimatedLine = props => {
    const { points, stroke, strokeWidth, animationBegin } = props;
    const d = points.reduce((acc, point, i) => {
        if (i === 0) return `M${point.x},${point.y}`;
        const prev = points[i - 1];
        const cp1x = prev.x + (point.x - prev.x) / 2;
        const cp1y = prev.y;
        const cp2x = prev.x + (point.x - prev.x) / 2;
        const cp2y = point.y;
        return `${acc} C${cp1x},${cp1y} ${cp2x},${cp2y} ${point.x},${point.y}`;
    }, '');


    return (
        <motion.path
            d={d}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: animationBegin / 1000 || 0 }}
            inherit={false}
        />
    );
};

AnimatedLine.propTypes = {
    points: PropTypes.array,
    animationBegin: PropTypes.number,
    stroke: PropTypes.string,
    strokeWidth: PropTypes.number
};

const data = [
  { day: '24 Mar', Revenus: 15000, Dépenses: 5000, Balance: 10000 },
  { day: '25 Mar', Revenus: 18000, Dépenses: 8000, Balance: 10000 },
  { day: '26 Mar', Revenus: 16000, Dépenses: 7000, Balance: 9000 },
  { day: '27 Mar', Revenus: 20000, Dépenses: 9000, Balance: 11000 },
  { day: '28 Mar', Revenus: 22000, Dépenses: 12000, Balance: 10000 },
  { day: '29 Mar', Revenus: 19000, Dépenses: 10000, Balance: 9000 },
  { day: '30 Mar', Revenus: 25000, Dépenses: 13000, Balance: 12000 },
];

const CustomTooltip = ({ active, payload, label, isDark }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`p-3 rounded-md shadow-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border'}`}>
        <p className="font-bold label">{label}</p>
        {payload.map(pld => (
          <div key={pld.dataKey} style={{ color: pld.color }}>
            {`${pld.dataKey}: ${pld.value.toLocaleString()} €`}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  label: PropTypes.string,
  isDark: PropTypes.bool,
};

export const WeeklyAnalysisChart = ({ isDark }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"} />
        <XAxis dataKey="day" tick={{ fill: isDark ? '#A1A1A1' : '#333' }} axisLine={{ stroke: isDark ? '#444' : '#CCC' }} />
        <YAxis tick={{ fill: isDark ? '#A1A1A1' : '#333' }} axisLine={{ stroke: isDark ? '#444' : '#CCC' }} tickFormatter={(value) => `${value / 1000}k`} />
        <Tooltip content={<CustomTooltip isDark={isDark} />} cursor={{ stroke: 'rgba(128, 128, 128, 0.4)', strokeWidth: 1 }} />
        <Legend />
        <Line
          type="monotone"
          dataKey="Revenus"
          stroke="#22c55e"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6 }}
          isAnimationActive={true}
          animationBegin={0}
        />
        <Line
          type="monotone"
          dataKey="Dépenses"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6 }}
          isAnimationActive={true}
          component={AnimatedLine}
          animationBegin={0}
        />
        <Line
          type="monotone"
          dataKey="Balance"
          stroke="#8b5cf6"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6 }}
          isAnimationActive={true}
          component={AnimatedLine}
          animationBegin={0}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

WeeklyAnalysisChart.propTypes = {
    isDark: PropTypes.bool,
}; 