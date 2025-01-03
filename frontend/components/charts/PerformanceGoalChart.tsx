import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Goal", value: 60 },
  { name: "Remaining", value: 40 },
];
const COLORS = ["#3498db", "#f3f4f6"];

export default function PerformanceGoalChart() {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h3 className="text-sm text-gray-600">Performance Goal</h3>
      <p className="text-gray-500 text-xs">Monthly performance reports</p>
      <div className="flex items-center justify-center mt-4">
        <PieChart width={120} height={120}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={50}
            startAngle={90}
            endAngle={-270}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
        <div className="absolute">
          <span className="text-2xl font-bold text-blue-500">60%</span>
        </div>
      </div>
      <div className="mt-2 text-gray-700 font-bold">Sales: $5.65K</div>
      <button className="text-sm text-blue-500 hover:underline">
        View Reports
      </button>
    </div>
  );
}
