import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { month: "Jan", value: 2 },
  { month: "Feb", value: 3 },
  { month: "Mar", value: 4 },
  { month: "Apr", value: 5 },
  { month: "May", value: 6 },
  { month: "Jun", value: 7 },
];

export default function MonthlyEarningChart() {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h3 className="text-sm text-gray-600">Monthly Earning</h3>
      <p className="text-sm text-red-500">(-2.4%)</p>
      <BarChart width={300} height={150} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  );
}
