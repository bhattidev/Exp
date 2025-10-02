// app/page.js - Updated with 30-second auto-refresh
"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Target,
  Factory,
  TrendingUp,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Activity,
  Shield,
  Flame,
  Beaker,
  TestTube,
  Truck,
  Filter,
  Zap,
  Clock,
  BarChart3,
  Users,
  Eye,
} from "lucide-react";

const initialData = [
  {
    id: 1,
    name: "Nitric Acid",
    targets: 15000,
    production: 14250,
    achieved: 95,
    section: "Acids",
    color: "#6366f1",
    status: "optimal",
    efficiency: 92,
    safety: 98,
    trend: "up",
  },
  {
    id: 2,
    name: "Sulfuric Acid",
    targets: 12000,
    production: 10800,
    achieved: 90,
    section: "Acids",
    color: "#10b981",
    status: "good",
    efficiency: 88,
    safety: 95,
    trend: "stable",
  },
  {
    id: 3,
    name: "Hydrochloric Acid",
    targets: 8000,
    production: 6800,
    achieved: 85,
    section: "Acids",
    color: "#f59e0b",
    status: "warning",
    efficiency: 82,
    safety: 92,
    trend: "down",
  },
  {
    id: 4,
    name: "Ammonium Nitrate",
    targets: 25000,
    production: 23750,
    achieved: 95,
    section: "Prop-I",
    color: "#ef4444",
    status: "optimal",
    efficiency: 94,
    safety: 96,
    trend: "up",
  },
  {
    id: 5,
    name: "RDX",
    targets: 18000,
    production: 16560,
    achieved: 92,
    section: "Prop-I",
    color: "#8b5cf6",
    status: "good",
    efficiency: 90,
    safety: 99,
    trend: "stable",
  },
  {
    id: 6,
    name: "TNT",
    targets: 22000,
    production: 19800,
    achieved: 90,
    section: "Prop-I",
    color: "#06b6d4",
    status: "good",
    efficiency: 87,
    safety: 97,
    trend: "up",
  },
  {
    id: 7,
    name: "Composition B",
    targets: 16000,
    production: 13600,
    achieved: 85,
    section: "Prop-II",
    color: "#84cc16",
    status: "warning",
    efficiency: 83,
    safety: 94,
    trend: "down",
  },
  {
    id: 8,
    name: "PETN",
    targets: 14000,
    production: 11900,
    achieved: 85,
    section: "Prop-II",
    color: "#f97316",
    status: "warning",
    efficiency: 81,
    safety: 93,
    trend: "stable",
  },
  {
    id: 9,
    name: "Propellant Grains",
    targets: 30000,
    production: 28500,
    achieved: 95,
    section: "Prop-II",
    color: "#ec4899",
    status: "optimal",
    efficiency: 93,
    safety: 98,
    trend: "up",
  },
  {
    id: 10,
    name: "Natural Gas",
    targets: 50000,
    production: 47500,
    achieved: 95,
    section: "NG",
    color: "#14b8a6",
    status: "optimal",
    efficiency: 95,
    safety: 99,
    trend: "up",
  },
  {
    id: 11,
    name: "LPG",
    targets: 28000,
    production: 25200,
    achieved: 90,
    section: "NG",
    color: "#3b82f6",
    status: "good",
    efficiency: 89,
    safety: 96,
    trend: "stable",
  },
  {
    id: 12,
    name: "CNG",
    targets: 35000,
    production: 31500,
    achieved: 90,
    section: "NG",
    color: "#a855f7",
    status: "good",
    efficiency: 88,
    safety: 95,
    trend: "up",
  },
];

const SECTION_COLORS = {
  Acids: "#6366f1",
  "Prop-I": "#ef4444",
  "Prop-II": "#84cc16",
  NG: "#3b82f6",
  NCP: "#eab308",
  GC: "#16a34a",
};

const SECTION_ICONS = {
  Acids: Beaker,
  "Prop-I": Flame,
  "Prop-II": TestTube,
  NG: Truck,
  NCP: Activity,
  GC: Shield,
};

const SECTION_NAMES = {
  Acids: "Acids Production",
  "Prop-I": "Propellants I",
  "Prop-II": "Propellants II",
  NG: "Natural Gas Processing",
  NCP: "Nitrocellulose Products",
  GC: "General Chemicals",
};

export default function HomePage() {
  const [productData, setProductData] = useState(initialData);
  const [isMarqueeHovered, setIsMarqueeHovered] = useState(false);
  const [activeSection, setActiveSection] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [alerts, setAlerts] = useState(3);
  const [viewMode, setViewMode] = useState("cards");
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [refreshCount, setRefreshCount] = useState(0);

  // Enhanced data rotation with 30-second auto-refresh
  useEffect(() => {
    if (isMarqueeHovered) return;

    const rotateAndUpdate = () => {
      setIsLoading(true);
      setProductData((prev) => {
        const updated = prev.map((item) => {
          const fluctuation = 0.96 + Math.random() * 0.08;
          const newProduction = Math.floor(item.production * fluctuation);
          const newAchieved = Math.min(
            100,
            Math.floor((newProduction / item.targets) * 100 * 100) / 100
          );
          const newEfficiency = Math.min(
            100,
            Math.max(75, item.efficiency + (Math.random() * 6 - 3))
          );
          const newSafety = Math.min(
            100,
            Math.max(85, item.safety + (Math.random() * 4 - 2))
          );

          // Determine trend
          const trendChange = Math.random();
          let newTrend = item.trend;
          if (trendChange > 0.7) newTrend = "up";
          else if (trendChange > 0.4) newTrend = "stable";
          else newTrend = "down";

          let newStatus = item.status;
          if (newAchieved >= 95 && newEfficiency >= 90) newStatus = "optimal";
          else if (newAchieved >= 85 && newEfficiency >= 80) newStatus = "good";
          else newStatus = "warning";

          return {
            ...item,
            production: newProduction,
            achieved: newAchieved,
            efficiency: Math.round(newEfficiency),
            safety: Math.round(newSafety),
            status: newStatus,
            trend: newTrend,
          };
        });

        const warningCount = updated.filter(
          (item) => item.status === "warning"
        ).length;
        setAlerts(warningCount);
        setLastUpdate(new Date());
        setRefreshCount((prev) => prev + 1);

        // Rotate array for marquee effect
        const copy = [...updated];
        const first = copy.shift();
        return [...copy, first];
      });

      setTimeout(() => setIsLoading(false), 300);
    };

    const id = setInterval(rotateAndUpdate, 30000); // Changed from 5000 to 30000 (30 seconds)
    return () => clearInterval(id);
  }, [isMarqueeHovered]);

  // Filter data based on active section
  const filteredData = useMemo(() => {
    if (activeSection === "all") return productData;
    return productData.filter((item) => item.section === activeSection);
  }, [productData, activeSection]);

  // Enhanced statistics with trend analysis
  const statistics = useMemo(() => {
    const totalTargets = filteredData.reduce((s, p) => s + p.targets, 0);
    const totalProduction = filteredData.reduce((s, p) => s + p.production, 0);
    const overallPct = ((totalProduction / totalTargets) * 100).toFixed(1);
    const needsAttention = filteredData.filter(
      (item) => item.status === "warning"
    );
    const avgEfficiency = (
      filteredData.reduce((sum, item) => sum + item.efficiency, 0) /
      filteredData.length
    ).toFixed(1);
    const avgSafety = (
      filteredData.reduce((sum, item) => sum + item.safety, 0) /
      filteredData.length
    ).toFixed(1);

    // Trend analysis
    const optimalProducts = filteredData.filter(
      (item) => item.status === "optimal"
    ).length;
    const improvingProducts = filteredData.filter(
      (item) => item.trend === "up"
    ).length;

    return {
      totalTargets,
      totalProduction,
      overallPct,
      needsAttention: needsAttention.length,
      avgAchievement: (
        filteredData.reduce((sum, item) => sum + item.achieved, 0) /
        filteredData.length
      ).toFixed(1),
      avgEfficiency,
      avgSafety,
      optimalProducts,
      improvingProducts,
      totalProducts: filteredData.length,
    };
  }, [filteredData]);

  const getAchievementColor = (achieved) => {
    if (achieved >= 95) return "from-green-500 to-emerald-400";
    if (achieved >= 90) return "from-green-400 to-yellow-400";
    if (achieved >= 85) return "from-yellow-500 to-amber-400";
    return "from-red-500 to-orange-400";
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case "optimal":
        return {
          text: "Optimal",
          color: "text-green-600",
          bg: "bg-green-500/20",
          icon: CheckCircle,
        };
      case "good":
        return {
          text: "Good",
          color: "text-blue-600",
          bg: "bg-blue-500/20",
          icon: CheckCircle,
        };
      case "warning":
        return {
          text: "Attention",
          color: "text-orange-600",
          bg: "bg-orange-500/20",
          icon: AlertTriangle,
        };
      default:
        return {
          text: "Unknown",
          color: "text-gray-600",
          bg: "bg-gray-500/20",
          icon: AlertTriangle,
        };
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-3 h-3 text-green-400" />;
      case "down":
        return <TrendingUp className="w-3 h-3 text-red-400 rotate-180" />;
      default:
        return <div className="w-3 h-3 bg-gray-400 rounded-full" />;
    }
  };

  const sectionButtons = [
    {
      id: "all",
      name: "All Sections",
      color: "from-indigo-500 to-purple-600",
      icon: BarChart3,
    },
    {
      id: "Acids",
      name: "Acids",
      color: "from-blue-500 to-indigo-600",
      icon: Beaker,
    },
    {
      id: "Prop-I",
      name: "Propellants I",
      color: "from-red-500 to-pink-600",
      icon: Flame,
    },
    {
      id: "Prop-II",
      name: "Propellants II",
      color: "from-green-500 to-lime-600",
      icon: TestTube,
    },
    {
      id: "NG",
      name: "Natural Gas",
      color: "from-cyan-500 to-blue-600",
      icon: Truck,
    },
    {
      id: "NCP",
      name: "Nitrocellulose",
      color: "from-yellow-500 to-amber-600",
      icon: Activity,
    },
    {
      id: "GC",
      name: "General Chemicals",
      color: "from-emerald-500 to-teal-600",
      icon: Shield,
    },
  ];

  return (
    <div className="p-4">
      <div className="max-w-8xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <div className="text-center mb-2">
          <h1 className="text-3xl font-black text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-3">
            Live Production Dashboard
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Real-time monitoring of industrial production across all
            manufacturing sections
          </p>
          <div className="flex items-center justify-center gap-4 mt-3 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
              <span>Live Updates</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>Last update: {lastUpdate.toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-green-400" />
              <span>{statistics.totalProducts} Active Products</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-purple-400" />
              <span>Refresh #{refreshCount}</span>
            </div>
          </div>
        </div>

        {/* Enhanced Alert Banner */}
        {alerts > 0 && (
          <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-400 animate-pulse" />
                <div>
                  <span className="text-orange-300 font-semibold">
                    {alerts} product{alerts > 1 ? "s" : ""} need attention
                  </span>
                  <p className="text-orange-200 text-sm mt-1">
                    Immediate review recommended for optimal performance
                  </p>
                </div>
              </div>
              <a
                href="/alerts"
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm"
              >
                <Eye className="w-4 h-4" />
                View Details
              </a>
            </div>
          </div>
        )}

        {/* Enhanced KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-5 text-white shadow-2xl transform hover:scale-105 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <div className="text-2xl font-black">
                  {statistics.totalTargets.toLocaleString()}
                </div>
                <div className="text-indigo-100 text-sm mt-1">
                  Total Targets
                </div>
              </div>
              <Target className="w-6 h-6 opacity-80" />
            </div>
            <div className="text-xs text-indigo-200 mt-2 relative z-10">
              Monthly Production Goals
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-5 text-white shadow-2xl transform hover:scale-105 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <div className="text-2xl font-black">
                  {statistics.totalProduction.toLocaleString()}
                </div>
                <div className="text-green-100 text-sm mt-1">
                  Total Production
                </div>
              </div>
              <Factory className="w-6 h-6 opacity-80" />
            </div>
            <div className="text-xs text-green-200 mt-2 relative z-10">
              Actual Output (tons)
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-5 text-white shadow-2xl transform hover:scale-105 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <div className="text-2xl font-black">
                  {statistics.overallPct}%
                </div>
                <div className="text-orange-100 text-sm mt-1">
                  Achievement Rate
                </div>
              </div>
              <TrendingUp className="w-6 h-6 opacity-80" />
            </div>
            <div className="text-xs text-orange-200 mt-2 relative z-10">
              Efficiency: {statistics.avgEfficiency}% • Safety:{" "}
              {statistics.avgSafety}%
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-5 text-white shadow-2xl transform hover:scale-105 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <div className="text-2xl font-black">
                  {statistics.needsAttention}
                </div>
                <div className="text-blue-100 text-sm mt-1">Need Attention</div>
              </div>
              <RefreshCw
                className={`w-6 h-6 opacity-80 ${
                  isLoading ? "animate-spin" : ""
                }`}
              />
            </div>
            <div className="text-xs text-blue-200 mt-2 relative z-10">
              {statistics.optimalProducts} products at optimal level
            </div>
          </div>
        </div>

        {/* Enhanced Section Filters with View Toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {sectionButtons.map((section) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-4 py-2.5 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-sm ${
                    activeSection === section.id
                      ? "ring-2 ring-white ring-opacity-30 shadow-2xl"
                      : "opacity-90 hover:opacity-100 shadow-lg bg-gradient-to-r"
                  } bg-gradient-to-r ${section.color}`}
                >
                  <IconComponent className="w-4 h-4" />
                  {section.name}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg p-1">
            <button
              onClick={() => setViewMode("cards")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "cards"
                  ? "bg-blue-500 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("compact")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "compact"
                  ? "bg-blue-500 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Enhanced Live Production Metrics */}
        {/* Enhanced Live Production Metrics */}
        <section className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-gray-700 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                🏭 Live Production Metrics
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-sm font-normal text-gray-300 bg-gray-700 px-3 py-1.5 rounded-full">
                  {filteredData.length} products
                </span>
                <span className="text-sm font-normal text-gray-300 bg-gray-700 px-3 py-1.5 rounded-full">
                  {activeSection === "all"
                    ? "All Sections"
                    : SECTION_NAMES[activeSection]}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">Live Updates</span>
              </div>
              <div className="w-px h-4 bg-gray-600"></div>
              <div className="flex items-center gap-2 text-sm">
                <RefreshCw className="w-4 h-4" />
                <span>Auto-refresh: 30s</span>
              </div>
            </div>
          </div>

          <div
            className="overflow-hidden rounded-xl"
            onMouseEnter={() => setIsMarqueeHovered(true)}
            onMouseLeave={() => setIsMarqueeHovered(false)}
          >
            <div className="relative">
              {/* First set of cards */}
              <div
                className={`flex gap-6 animate-marquee whitespace-nowrap will-change-transform ${
                  isMarqueeHovered ? "animation-paused" : ""
                }`}
              >
                {filteredData.map((product, index) => {
                  const statusInfo = getStatusInfo(product.status);
                  const StatusIcon = statusInfo.icon;
                  const SectionIcon = SECTION_ICONS[product.section];

                  return (
                    <article
                      key={`first-${product.id}-${index}`}
                      className="flex-shrink-0 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl shadow-lg p-6 min-w-[320px] border-l-4 hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer group relative overflow-hidden"
                      style={{ borderLeftColor: product.color }}
                    >
                      {/* Background glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Header with section and status */}
                      <div className="flex items-center justify-between mb-4 relative z-10">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <SectionIcon
                              className="w-4 h-4"
                              style={{ color: SECTION_COLORS[product.section] }}
                            />
                            <span
                              className="text-xs font-semibold px-2 py-1 rounded-full text-white"
                              style={{
                                backgroundColor:
                                  SECTION_COLORS[product.section],
                              }}
                            >
                              {product.section}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {getTrendIcon(product.trend)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <StatusIcon
                            className={`w-4 h-4 ${statusInfo.color}`}
                          />
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${statusInfo.bg} ${statusInfo.color}`}
                          >
                            {statusInfo.text}
                          </span>
                        </div>
                      </div>

                      {/* Product Name */}
                      <h3 className="text-xl font-black text-white mb-4 group-hover:text-blue-300 transition-colors duration-300 relative z-10">
                        {product.name}
                      </h3>

                      {/* Metrics Grid */}
                      <div className="space-y-4 relative z-10">
                        {/* Production vs Target */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-gray-600/50 rounded-xl p-3 shadow-sm backdrop-blur-sm">
                            <div className="text-gray-300 text-xs mb-1">
                              🎯 Target
                            </div>
                            <div className="font-black text-blue-300 text-lg">
                              {product.targets.toLocaleString()}t
                            </div>
                          </div>
                          <div className="bg-gray-600/50 rounded-xl p-3 shadow-sm backdrop-blur-sm">
                            <div className="text-gray-300 text-xs mb-1">
                              🏭 Production
                            </div>
                            <div className="font-black text-green-300 text-lg">
                              {product.production.toLocaleString()}t
                            </div>
                          </div>
                        </div>

                        {/* Efficiency & Safety */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl p-3 text-center backdrop-blur-sm border border-yellow-500/20">
                            <div className="text-gray-300 text-xs mb-1">
                              ⚡ Efficiency
                            </div>
                            <div className="font-black text-yellow-300 text-lg">
                              {product.efficiency}%
                            </div>
                          </div>
                          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-3 text-center backdrop-blur-sm border border-green-500/20">
                            <div className="text-gray-300 text-xs mb-1">
                              🛡️ Safety
                            </div>
                            <div className="font-black text-green-300 text-lg">
                              {product.safety}%
                            </div>
                          </div>
                        </div>

                        {/* Achievement Progress */}
                        <div className="bg-gradient-to-r from-gray-600/50 to-gray-700/50 rounded-xl p-4 shadow-sm backdrop-blur-sm">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-gray-300 font-medium text-sm">
                              📈 Achievement
                            </span>
                            <span
                              className="font-black text-2xl"
                              style={{ color: product.color }}
                            >
                              {product.achieved}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-600 rounded-full h-3 overflow-hidden shadow-inner">
                            <div
                              className={`h-3 rounded-full transition-all duration-1000 bg-gradient-to-r ${getAchievementColor(
                                product.achieved
                              )} shadow-lg`}
                              style={{
                                width: `${Math.min(product.achieved, 100)}%`,
                              }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-gray-400 mt-2">
                            <span>0%</span>
                            <span>100%</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Duplicate set of cards for seamless loop */}
              <div
                className={`flex gap-6 animate-marquee2 whitespace-nowrap will-change-transform absolute top-0 left-full ${
                  isMarqueeHovered ? "animation-paused" : ""
                }`}
              >
                {filteredData.map((product, index) => {
                  const statusInfo = getStatusInfo(product.status);
                  const StatusIcon = statusInfo.icon;
                  const SectionIcon = SECTION_ICONS[product.section];

                  return (
                    <article
                      key={`second-${product.id}-${index}`}
                      className="flex-shrink-0 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl shadow-lg p-6 min-w-[320px] border-l-4 hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer group relative overflow-hidden"
                      style={{ borderLeftColor: product.color }}
                    >
                      {/* Background glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Header with section and status */}
                      <div className="flex items-center justify-between mb-4 relative z-10">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <SectionIcon
                              className="w-4 h-4"
                              style={{ color: SECTION_COLORS[product.section] }}
                            />
                            <span
                              className="text-xs font-semibold px-2 py-1 rounded-full text-white"
                              style={{
                                backgroundColor:
                                  SECTION_COLORS[product.section],
                              }}
                            >
                              {product.section}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {getTrendIcon(product.trend)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <StatusIcon
                            className={`w-4 h-4 ${statusInfo.color}`}
                          />
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${statusInfo.bg} ${statusInfo.color}`}
                          >
                            {statusInfo.text}
                          </span>
                        </div>
                      </div>

                      {/* Product Name */}
                      <h3 className="text-xl font-black text-white mb-4 group-hover:text-blue-300 transition-colors duration-300 relative z-10">
                        {product.name}
                      </h3>

                      {/* Metrics Grid */}
                      <div className="space-y-4 relative z-10">
                        {/* Production vs Target */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-gray-600/50 rounded-xl p-3 shadow-sm backdrop-blur-sm">
                            <div className="text-gray-300 text-xs mb-1">
                              🎯 Target
                            </div>
                            <div className="font-black text-blue-300 text-lg">
                              {product.targets.toLocaleString()}t
                            </div>
                          </div>
                          <div className="bg-gray-600/50 rounded-xl p-3 shadow-sm backdrop-blur-sm">
                            <div className="text-gray-300 text-xs mb-1">
                              🏭 Production
                            </div>
                            <div className="font-black text-green-300 text-lg">
                              {product.production.toLocaleString()}t
                            </div>
                          </div>
                        </div>

                        {/* Efficiency & Safety */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl p-3 text-center backdrop-blur-sm border border-yellow-500/20">
                            <div className="text-gray-300 text-xs mb-1">
                              ⚡ Efficiency
                            </div>
                            <div className="font-black text-yellow-300 text-lg">
                              {product.efficiency}%
                            </div>
                          </div>
                          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-3 text-center backdrop-blur-sm border border-green-500/20">
                            <div className="text-gray-300 text-xs mb-1">
                              🛡️ Safety
                            </div>
                            <div className="font-black text-green-300 text-lg">
                              {product.safety}%
                            </div>
                          </div>
                        </div>

                        {/* Achievement Progress */}
                        <div className="bg-gradient-to-r from-gray-600/50 to-gray-700/50 rounded-xl p-4 shadow-sm backdrop-blur-sm">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-gray-300 font-medium text-sm">
                              📈 Achievement
                            </span>
                            <span
                              className="font-black text-2xl"
                              style={{ color: product.color }}
                            >
                              {product.achieved}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-600 rounded-full h-3 overflow-hidden shadow-inner">
                            <div
                              className={`h-3 rounded-full transition-all duration-1000 bg-gradient-to-r ${getAchievementColor(
                                product.achieved
                              )} shadow-lg`}
                              style={{
                                width: `${Math.min(product.achieved, 100)}%`,
                              }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-gray-400 mt-2">
                            <span>0%</span>
                            <span>100%</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 border border-gray-700 text-center group hover:border-blue-500/50 transition-all duration-300">
            <div className="text-2xl font-black text-green-400 group-hover:scale-110 transition-transform duration-300">
              {statistics.avgAchievement}%
            </div>
            <div className="text-gray-400 text-sm mt-1">Avg Achievement</div>
            <div className="text-green-400 text-xs mt-2">
              +{statistics.improvingProducts} improving
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 border border-gray-700 text-center group hover:border-yellow-500/50 transition-all duration-300">
            <div className="text-2xl font-black text-yellow-400 group-hover:scale-110 transition-transform duration-300">
              {statistics.avgEfficiency}%
            </div>
            <div className="text-gray-400 text-sm mt-1">Avg Efficiency</div>
            <div className="text-yellow-400 text-xs mt-2">
              Operational excellence
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 border border-gray-700 text-center group hover:border-blue-500/50 transition-all duration-300">
            <div className="text-2xl font-black text-blue-400 group-hover:scale-110 transition-transform duration-300">
              {statistics.avgSafety}%
            </div>
            <div className="text-gray-400 text-sm mt-1">Avg Safety</div>
            <div className="text-blue-400 text-xs mt-2">
              Compliance maintained
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 border border-gray-700 text-center group hover:border-purple-500/50 transition-all duration-300">
            <div className="text-2xl font-black text-purple-400 group-hover:scale-110 transition-transform duration-300">
              {statistics.optimalProducts}
            </div>
            <div className="text-gray-400 text-sm mt-1">Optimal Products</div>
            <div className="text-purple-400 text-xs mt-2">Peak performance</div>
          </div>
        </div>

        {/* System Status Footer */}
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>All Systems Operational</span>
              </div>
              <div className="text-gray-400">
                Last data refresh: {lastUpdate.toLocaleString()}
              </div>
              <div className="text-gray-400">
                Auto-refresh count: #{refreshCount}
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <RefreshCw
                className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
              />
              <span>Next update in 30s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
