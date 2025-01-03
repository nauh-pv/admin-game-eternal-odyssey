import MonthlyEarningChart from "@/components/charts/MonthlyEarningChart";
import PerformanceGoalChart from "@/components/charts/PerformanceGoalChart";
import SalesReportChart from "@/components/charts/SalesReportChart";
import StoreGrowthChart from "@/components/charts/StoreGrowthChart";
import StoreOverview from "@/components/charts/StoreOverview";

const PageManager = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <PerformanceGoalChart />
        <StoreGrowthChart />
        <MonthlyEarningChart />
        <div className="md:col-span-2">
          <SalesReportChart />
        </div>
        <StoreOverview />
      </div>
      <div>Dashboard</div>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-md col-span-1 p-4"></div>
        <div className="bg-white rounded-md col-span-1"></div>
        <div className="bg-white rounded-md col-span-1"></div>
      </div>
    </div>
  );
};

PageManager.layout = "Contentlayout";
export default PageManager;
