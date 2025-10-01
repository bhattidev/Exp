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
  Cell,
  PieChart,
  Pie,
  AreaChart,
  Area,
  ComposedChart,
} from "recharts";
import {
  BarChart3,
  TrendingUp,
  PieChart as PieChartIcon,
  Calendar,
  Download,
  Filter,
  Target,
  Factory,
} from "lucide-react";

// Sample data for graphs
const productionData = [
  {
    month: "Jan",
    acids: 30500,
    propI: 58000,
    propII: 52000,
    ng: 98000,
    ncp: 30000,
    gc: 47000,
  },
  {
    month: "Feb",
    acids: 31850,
    propI: 60110,
    propII: 54000,
    ng: 104200,
    ncp: 32300,
    gc: 49500,
  },
  {
    month: "Mar",
    acids: 33200,
    propI: 62200,
    propII: 55800,
    ng: 101500,
    ncp: 31500,
    gc: 51000,
  },
  {
    month: "Apr",
    acids: 34900,
    propI: 63800,
    propII: 57200,
    ng: 107800,
    ncp: 33500,
    gc: 52500,
  },
  {
    month: "May",
    acids: 36200,
    propI: 65500,
    propII: 58900,
    ng: 110200,
    ncp: 34800,
    gc: 53800,
  },
  {
    month: "Jun",
    acids: 37500,
    propI: 67200,
    propII: 60500,
    ng: 112500,
    ncp: 36000,
    gc: 55200,
  },
];

const efficiencyData = [
  {
    section: "Acids",
    efficiency: 91,
    safety: 96,
    quality: 99.2,
    color: "#6366f1",
  },
  {
    section: "Prop-I",
    efficiency: 92.5,
    safety: 97,
    quality: 98.8,
    color: "#ef4444",
  },
  {
    section: "Prop-II",
    efficiency: 90,
    safety: 95,
    quality: 97.5,
    color: "#84cc16",
  },
  {
    section: "NG",
    efficiency: 92.2,
    safety: 98,
    quality: 99.5,
    color: "#3b82f6",
  },
  {
    section: "NCP",
    efficiency: 85,
    safety: 92,
    quality: 96.8,
    color: "#eab308",
  },
  {
    section: "GC",
    efficiency: 90,
    safety: 96,
    quality: 98.3,
    color: "#16a34a",
  },
];

const monthlyTrend = [
  { month: "Jan", production: 315500, targets: 340000, efficiency: 88 },
  { month: "Feb", production: 332960, targets: 356000, efficiency: 89 },
  { month: "Mar", production: 334300, targets: 352000, efficiency: 90 },
  { month: "Apr", production: 347700, targets: 365000, efficiency: 92 },
  { month: "May", production: 362400, targets: 375000, efficiency: 93 },
  { month: "Jun", production: 378700, targets: 385000, efficiency: 95 },
];

const performanceDistribution = [
  { name: "Optimal (95%+)", value: 8, color: "#10b981" },
  { name: "Good (90-94%)", value: 5, color: "#3b82f6" },
  { name: "Fair (85-89%)", value: 2, color: "#f59e0b" },
  { name: "Needs Attention (<85%)", value: 1, color: "#ef4444" },
];

export default function GraphsPage() {
  const [timeRange, setTimeRange] = useState("6months");
  const [chartType, setChartType] = useState("production");

  const chartData = useMemo(() => {
    switch (chartType) {
      case "production":
        return productionData;
      case "efficiency":
        return efficiencyData;
      case "trend":
        return monthlyTrend;
      default:
        return productionData;
    }
  }, [chartType]);

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
                {entry.name}:{" "}
                {typeof entry.value === "number"
                  ? entry.value.toLocaleString() +
                    (entry.dataKey === "efficiency" ? "%" : " tons")
                  : entry.value}
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
          <h1 className="text-4xl font-black text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-4">
            Graphs & Analytics
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Comprehensive visual analytics and performance trends across all
            production sections.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
          <div className="flex gap-2">
            {["production", "efficiency", "trend"].map((type) => (
              <button
                key={type}
                onClick={() => setChartType(type)}
                className={`px-4 py-2 rounded-lg font-semibold capitalize transition-all ${
                  chartType === type
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {type === "production" && (
                  <Factory className="w-4 h-4 inline mr-2" />
                )}
                {type === "efficiency" && (
                  <TrendingUp className="w-4 h-4 inline mr-2" />
                )}
                {type === "trend" && (
                  <BarChart3 className="w-4 h-4 inline mr-2" />
                )}
                {type}
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
                      ? "bg-purple-500 text-white shadow-lg"
                      : "text-gray-300 hover:bg-gray-600/50"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Production Overview Chart */}
          <div className="bg-gray-800/80 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-blue-400" />
              Monthly Production by Section (tons)
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" tick={{ fill: "#9CA3AF" }} />
                  <YAxis tick={{ fill: "#9CA3AF" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar
                    dataKey="acids"
                    name="Acids"
                    fill="#6366f1"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="propI"
                    name="Propellants I"
                    fill="#ef4444"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="propII"
                    name="Propellants II"
                    fill="#84cc16"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="ng"
                    name="Natural Gas"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="ncp"
                    name="Nitrocellulose"
                    fill="#eab308"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="gc"
                    name="General Chemicals"
                    fill="#16a34a"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Efficiency & Safety Radar */}
          <div className="bg-gray-800/80 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-green-400" />
              Section Performance Metrics
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={efficiencyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="section" tick={{ fill: "#9CA3AF" }} />
                  <YAxis domain={[80, 100]} tick={{ fill: "#9CA3AF" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar
                    dataKey="efficiency"
                    name="Efficiency (%)"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                  />
                  <Line
                    type="monotone"
                    dataKey="safety"
                    name="Safety (%)"
                    stroke="#3b82f6"
                    strokeWidth={3}
                  />
                  <Line
                    type="monotone"
                    dataKey="quality"
                    name="Quality (%)"
                    stroke="#f59e0b"
                    strokeWidth={3}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Secondary Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Trend */}
          <div className="bg-gray-800/80 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-purple-400" />
              Monthly Production Trend
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrend}>
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

          {/* Performance Distribution */}
          <div className="bg-gray-800/80 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <PieChartIcon className="w-6 h-6 text-orange-400" />
              Performance Distribution
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={performanceDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {performanceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Statistics Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-800/50 rounded-2xl p-4 text-center">
            <div className="text-2xl font-black text-green-400">95.2%</div>
            <div className="text-gray-400 text-sm">Avg Achievement</div>
          </div>
          <div className="bg-gray-800/50 rounded-2xl p-4 text-center">
            <div className="text-2xl font-black text-blue-400">91.8%</div>
            <div className="text-gray-400 text-sm">Avg Efficiency</div>
          </div>
          <div className="bg-gray-800/50 rounded-2xl p-4 text-center">
            <div className="text-2xl font-black text-yellow-400">96.3%</div>
            <div className="text-gray-400 text-sm">Avg Safety</div>
          </div>
          <div className="bg-gray-800/50 rounded-2xl p-4 text-center">
            <div className="text-2xl font-black text-purple-400">97.5%</div>
            <div className="text-gray-400 text-sm">Avg Quality</div>
          </div>
        </div>
      </div>
    </div>
  );
}
