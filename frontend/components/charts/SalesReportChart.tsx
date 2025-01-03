import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", sales: 20 },
  { month: "Feb", sales: 30 },
  { month: "Mar", sales: 40 },
  { month: "Apr", sales: 50 },
  { month: "May", sales: 60 },
];

export default function SalesReportChart() {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h3 className="text-sm text-gray-600">Sales Report</h3>
      <AreaChart width={500} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="sales" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </div>
  );
}
