import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", value: 1 },
  { month: "Feb", value: 2 },
  { month: "Mar", value: 3 },
  { month: "Apr", value: 4 },
  { month: "May", value: 5 },
  { month: "Jun", value: 6 },
];

export default function StoreGrowthChart() {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h3 className="text-sm text-gray-600">Store Growth</h3>
      <p className="text-sm text-green-500">(+3.6%)</p>
      <LineChart width={300} height={150} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          strokeWidth={2}
        />
      </LineChart>
    </div>
  );
}
