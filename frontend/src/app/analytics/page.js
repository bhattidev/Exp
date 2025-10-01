// app/analytics/page.js
"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  BarChart3,
  PieChart as PieChartIcon,
  Calendar,
  Download,
  Filter,
  Target,
  Factory,
  Users,
  Clock,
} from "lucide-react";

// Enhanced historical data
const historicalData = [
  {
    month: "Jan",
    production: 315500,
    targets: 340000,
    efficiency: 88,
    safety: 94,
    quality: 97.8,
    downtime: 2.1,
  },
  {
    month: "Feb",
    production: 332960,
    targets: 356000,
    efficiency: 89,
    safety: 95,
    quality: 98.2,
    downtime: 1.8,
  },
  {
    month: "Mar",
    production: 334300,
    targets: 352000,
    efficiency: 90,
    safety: 93,
    quality: 97.5,
    downtime: 2.3,
  },
  {
    month: "Apr",
    production: 347700,
    targets: 365000,
    efficiency: 92,
    safety: 96,
    quality: 98.8,
    downtime: 1.5,
  },
  {
    month: "May",
    production: 362400,
    targets: 375000,
    efficiency: 93,
    safety: 95,
    quality: 99.1,
    downtime: 1.2,
  },
  {
    month: "Jun",
    production: 378700,
    targets: 385000,
    efficiency: 95,
    safety: 97,
    quality: 99.4,
    downtime: 0.8,
  },
];

const sectionPerformance = [
  {
    section: "Acids",
    production: 31850,
    targets: 35000,
    efficiency: 91,
    safety: 96,
    color: "#6366f1",
  },
  {
    section: "Prop-I",
    production: 60110,
    targets: 65000,
    efficiency: 92.5,
    safety: 97,
    color: "#ef4444",
  },
  {
    section: "Prop-II",
    production: 54000,
    targets: 60000,
    efficiency: 90,
    safety: 95,
    color: "#84cc16",
  },
  {
    section: "NG",
    production: 104200,
    targets: 113000,
    efficiency: 92.2,
    safety: 98,
    color: "#3b82f6",
  },
  {
    section: "NCP",
    production: 32300,
    targets: 38000,
    efficiency: 85,
    safety: 92,
    color: "#eab308",
  },
  {
    section: "GC",
    production: 49500,
    targets: 55000,
    efficiency: 90,
    safety: 96,
    color: "#16a34a",
  },
];

const kpiData = [
  {
    name: "Production Target",
    current: 95.2,
    previous: 92.8,
    change: "+2.4",
    trend: "up",
  },
  {
    name: "Operational Efficiency",
    current: 91.8,
    previous: 89.3,
    change: "+2.5",
    trend: "up",
  },
  {
    name: "Safety Compliance",
    current: 96.3,
    previous: 94.7,
    change: "+1.6",
    trend: "up",
  },
  {
    name: "Quality Rate",
    current: 98.7,
    previous: 97.9,
    change: "+0.8",
    trend: "up",
  },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6months");
  const [activeMetric, setActiveMetric] = useState("production");

  const overallStats = useMemo(() => {
    const totalProduction = historicalData.reduce(
      (sum, month) => sum + month.production,
      0
    );
    const totalTargets = historicalData.reduce(
      (sum, month) => sum + month.targets,
      0
    );
    const avgEfficiency =
      historicalData.reduce((sum, month) => sum + month.efficiency, 0) /
      historicalData.length;
    const avgSafety =
      historicalData.reduce((sum, month) => sum + month.safety, 0) /
      historicalData.length;
    const avgQuality =
      historicalData.reduce((sum, month) => sum + month.quality, 0) /
      historicalData.length;

    return {
      totalProduction,
      totalTargets,
      achievement: ((totalProduction / totalTargets) * 100).toFixed(1),
      avgEfficiency: avgEfficiency.toFixed(1),
      avgSafety: avgSafety.toFixed(1),
      avgQuality: avgQuality.toFixed(1),
    };
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/95 backdrop-blur-sm p-4 rounded-xl border border-gray-700 shadow-2xl text-white">
          <p className="font-bold text-lg mb-2">{label}</p>
          <div className="space-y-1">
            {payload.map((entry, index) => (
              <p
                key={index}
                className="flex items-center gap-2 text-sm"
                style={{ color: entry.color }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                {entry.name}: {entry.value}
                {entry.dataKey?.includes("efficiency") ||
                entry.dataKey?.includes("safety") ||
                entry.dataKey?.includes("quality")
                  ? "%"
                  : " tons"}
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-8xl mx-auto space-y-6 sm:space-y-8">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-4xl font-black text-white bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-4">
            Production Analytics
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Historical performance analysis, trends, and comprehensive
            operational insights.
          </p>
        </div>

        {/* KPI Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-800/80 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-8 h-8 text-blue-400" />
              <span className="text-green-400 text-sm font-semibold">
                +2.4%
              </span>
            </div>
            <div className="text-2xl font-black text-white">
              {overallStats.achievement}%
            </div>
            <div className="text-gray-400 text-sm">Target Achievement</div>
          </div>
          <div className="bg-gray-800/80 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <span className="text-green-400 text-sm font-semibold">
                +2.5%
              </span>
            </div>
            <div className="text-2xl font-black text-white">
              {overallStats.avgEfficiency}%
            </div>
            <div className="text-gray-400 text-sm">Avg Efficiency</div>
          </div>
          <div className="bg-gray-800/80 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-yellow-400" />
              <span className="text-green-400 text-sm font-semibold">
                +1.6%
              </span>
            </div>
            <div className="text-2xl font-black text-white">
              {overallStats.avgSafety}%
            </div>
            <div className="text-gray-400 text-sm">Avg Safety</div>
          </div>
          <div className="bg-gray-800/80 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-purple-400" />
              <span className="text-green-400 text-sm font-semibold">
                +0.8%
              </span>
            </div>
            <div className="text-2xl font-black text-white">
              {overallStats.avgQuality}%
            </div>
            <div className="text-gray-400 text-sm">Avg Quality</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
          <div className="flex gap-2">
            {["production", "efficiency", "safety", "quality"].map((metric) => (
              <button
                key={metric}
                onClick={() => setActiveMetric(metric)}
                className={`px-4 py-2 rounded-lg font-semibold capitalize transition-all ${
                  activeMetric === metric
                    ? "bg-purple-500 text-white shadow-lg"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {metric}
              </button>
            ))}
          </div>
          <div className="flex gap-4">
            <div className="flex gap-2 bg-gray-700/50 rounded-lg p-1">
              {["3months", "6months", "1year", "all"].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                    timeRange === range
                      ? "bg-blue-500 text-white shadow-lg"
                      : "text-gray-300 hover:bg-gray-600/50"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Production Trend */}
          <div className="bg-gray-800/80 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-green-400" />
              Monthly Production Trend
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" tick={{ fill: "#9CA3AF" }} />
                  <YAxis tick={{ fill: "#9CA3AF" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="production"
                    name="Actual Production"
                    stroke="#10b981"
                    fill="url(#colorProduction)"
                  />
                  <Area
                    type="monotone"
                    dataKey="targets"
                    name="Production Targets"
                    stroke="#6366f1"
                    fill="url(#colorTargets)"
                  />
                  <defs>
                    <linearGradient
                      id="colorProduction"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#10b981"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient
                      id="colorTargets"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#6366f1"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Section Performance */}
          <div className="bg-gray-800/80 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <PieChartIcon className="w-6 h-6 text-blue-400" />
              Section Performance
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sectionPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="section" tick={{ fill: "#9CA3AF" }} />
                  <YAxis tick={{ fill: "#9CA3AF" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar
                    dataKey="efficiency"
                    name="Efficiency (%)"
                    radius={[4, 4, 0, 0]}
                  >
                    {sectionPerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* KPI Trends */}
        <div className="bg-gray-800/80 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-6">
            Key Performance Indicators
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiData.map((kpi, index) => (
              <div key={index} className="bg-gray-700/50 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-gray-300 text-sm">{kpi.name}</div>
                  <div
                    className={`text-xs font-semibold ${
                      kpi.trend === "up" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {kpi.change}
                  </div>
                </div>
                <div className="text-2xl font-black text-white mb-1">
                  {kpi.current}%
                </div>
                <div className="text-gray-400 text-xs">
                  Previous: {kpi.previous}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-gray-800/50 rounded-2xl p-4">
            <div className="text-xl font-black text-white">
              {overallStats.totalProduction.toLocaleString()}t
            </div>
            <div className="text-gray-400 text-sm">Total Production</div>
          </div>
          <div className="bg-gray-800/50 rounded-2xl p-4">
            <div className="text-xl font-black text-green-400">+12.5%</div>
            <div className="text-gray-400 text-sm">Growth Rate</div>
          </div>
          <div className="bg-gray-800/50 rounded-2xl p-4">
            <div className="text-xl font-black text-blue-400">98.2%</div>
            <div className="text-gray-400 text-sm">On-Time Delivery</div>
          </div>
          <div className="bg-gray-800/50 rounded-2xl p-4">
            <div className="text-xl font-black text-purple-400">1.2%</div>
            <div className="text-gray-400 text-sm">Avg Downtime</div>
          </div>
        </div>
      </div>
    </div>
  );
}
