// app/page.js - Corrected Home Page
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

export default function HomePage() {
  const [productData, setProductData] = useState(initialData);
  const [isMarqueeHovered, setIsMarqueeHovered] = useState(false);
  const [activeSection, setActiveSection] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [alerts, setAlerts] = useState(3);

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
          };
        });

        const warningCount = updated.filter(
          (item) => item.status === "warning"
        ).length;
        setAlerts(warningCount);

        const copy = [...updated];
        const first = copy.shift();
        return [...copy, first];
      });

      setTimeout(() => setIsLoading(false), 300);
    };

    const id = setInterval(rotateAndUpdate, 6000);
    return () => clearInterval(id);
  }, [isMarqueeHovered]);

  const filteredData = useMemo(() => {
    if (activeSection === "all") return productData;
    return productData.filter((item) => item.section === activeSection);
  }, [productData, activeSection]);

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
          bg: "bg-green-100",
          icon: CheckCircle,
        };
      case "good":
        return {
          text: "Good",
          color: "text-blue-600",
          bg: "bg-blue-100",
          icon: CheckCircle,
        };
      case "warning":
        return {
          text: "Attention",
          color: "text-orange-600",
          bg: "bg-orange-100",
          icon: AlertTriangle,
        };
      default:
        return {
          text: "Unknown",
          color: "text-gray-600",
          bg: "bg-gray-100",
          icon: AlertTriangle,
        };
    }
  };

  const sectionButtons = [
    {
      id: "all",
      name: "All",
      color: "from-indigo-500 to-purple-600",
      icon: Factory,
    },
    {
      id: "Acids",
      name: "Acids",
      color: "from-blue-500 to-indigo-600",
      icon: Beaker,
    },
    {
      id: "Prop-I",
      name: "Prop-I",
      color: "from-red-500 to-pink-600",
      icon: Flame,
    },
    {
      id: "Prop-II",
      name: "Prop-II",
      color: "from-green-500 to-lime-600",
      icon: TestTube,
    },
    { id: "NG", name: "NG", color: "from-cyan-500 to-blue-600", icon: Truck },
    {
      id: "NCP",
      name: "NCP",
      color: "from-yellow-500 to-amber-600",
      icon: Activity,
    },
    {
      id: "GC",
      name: "GC",
      color: "from-emerald-500 to-teal-600",
      icon: Shield,
    },
  ];

  return (
    <div className="p-3">
      <div className="max-w-8xl mx-auto space-y-4">
        {/* Page Title - At the top */}
        <div className="text-center">
          <h1 className="text-2xl font-black text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
            Live Production Dashboard
          </h1>
        </div>

        {/* Alert Banner */}
        {alerts > 0 && (
          <div className="bg-orange-500/20 border border-orange-500/30 rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400" />
                <span className="text-orange-300 font-medium text-sm">
                  {alerts} product{alerts > 1 ? "s" : ""} need attention
                </span>
              </div>
              <a
                href="/alerts"
                className="text-orange-300 hover:text-orange-200 text-xs font-medium"
              >
                View →
              </a>
            </div>
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-black">
                  {statistics.totalTargets.toLocaleString()}
                </div>
                <div className="text-indigo-100 text-xs">Targets (tons)</div>
              </div>
              <Target className="w-5 h-5 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-black">
                  {statistics.totalProduction.toLocaleString()}
                </div>
                <div className="text-green-100 text-xs">Production (tons)</div>
              </div>
              <Factory className="w-5 h-5 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-black">
                  {statistics.overallPct}%
                </div>
                <div className="text-orange-100 text-xs">Achievement</div>
              </div>
              <TrendingUp className="w-5 h-5 opacity-80" />
            </div>
            <div className="text-xs text-orange-100 mt-1">
              Eff: {statistics.avgEfficiency}% • Safe: {statistics.avgSafety}%
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-black">
                  {statistics.needsAttention}
                </div>
                <div className="text-blue-100 text-xs">Attention</div>
              </div>
              <RefreshCw
                className={`w-5 h-5 opacity-80 ${
                  isLoading ? "animate-spin" : ""
                }`}
              />
            </div>
          </div>
        </div>

        {/* Section Filters */}
        <div className="flex flex-wrap gap-1 justify-center">
          {sectionButtons.map((section) => {
            const IconComponent = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-2 py-1.5 rounded-lg text-white transition-all duration-200 flex items-center gap-1 text-xs ${
                  activeSection === section.id
                    ? "ring-2 ring-white ring-opacity-20 shadow-lg"
                    : "opacity-90 hover:opacity-100 shadow bg-gradient-to-r"
                } bg-gradient-to-r ${section.color}`}
              >
                <IconComponent className="w-3 h-3" />
                {section.name}
              </button>
            );
          })}
        </div>

        {/* Live Metrics Section - Below the dashboard title */}
        <section className="bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-gray-700 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Live Metrics
              <span className="text-xs font-normal text-gray-300 bg-gray-700 px-2 py-0.5 rounded-full">
                {filteredData.length} products
              </span>
            </h2>
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <Filter className="w-3 h-3" />
              <span>Real-time</span>
            </div>
          </div>

          <div
            className="overflow-hidden rounded-lg"
            onMouseEnter={() => setIsMarqueeHovered(true)}
            onMouseLeave={() => setIsMarqueeHovered(false)}
          >
            <div
              className={`flex gap-4 animate-marquee whitespace-nowrap will-change-transform ${
                isMarqueeHovered ? "animation-paused" : ""
              }`}
            >
              {filteredData.map((product, index) => {
                const statusInfo = getStatusInfo(product.status);
                const StatusIcon = statusInfo.icon;
                const SectionIcon = SECTION_ICONS[product.section];

                return (
                  <article
                    key={`${product.id}-${index}`}
                    className="flex-shrink-0 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg shadow p-4 min-w-[280px] border-l-4 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group relative overflow-hidden"
                    style={{ borderLeftColor: product.color }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <SectionIcon
                          className="w-3 h-3"
                          style={{ color: SECTION_COLORS[product.section] }}
                        />
                        <span
                          className="text-xs font-semibold px-1.5 py-0.5 rounded-full text-white"
                          style={{
                            backgroundColor: SECTION_COLORS[product.section],
                          }}
                        >
                          {product.section}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <StatusIcon className={`w-3 h-3 ${statusInfo.color}`} />
                        <span
                          className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.color}`}
                        >
                          {statusInfo.text}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base font-black text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                      {product.name}
                    </h3>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center bg-gray-600/50 rounded-lg p-2 text-xs">
                        <span className="text-gray-300">Target</span>
                        <span className="font-black text-blue-300">
                          {product.targets.toLocaleString()}t
                        </span>
                      </div>

                      <div className="flex justify-between items-center bg-gray-600/50 rounded-lg p-2 text-xs">
                        <span className="text-gray-300">Production</span>
                        <span className="font-black text-green-300">
                          {product.production.toLocaleString()}t
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5 text-xs">
                        <div className="bg-gray-600/50 rounded-lg p-1.5 text-center">
                          <div className="text-gray-300">Eff</div>
                          <div className="font-black text-yellow-300">
                            {product.efficiency}%
                          </div>
                        </div>
                        <div className="bg-gray-600/50 rounded-lg p-1.5 text-center">
                          <div className="text-gray-300">Safety</div>
                          <div className="font-black text-green-300">
                            {product.safety}%
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-gray-600/50 to-gray-700/50 rounded-lg p-2">
                        <div className="flex justify-between items-center mb-1.5 text-xs">
                          <span className="text-gray-300">Achievement</span>
                          <span
                            className="font-black text-lg"
                            style={{ color: product.color }}
                          >
                            {product.achieved}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-1.5 rounded-full transition-all duration-1000 bg-gradient-to-r ${getAchievementColor(
                              product.achieved
                            )}`}
                            style={{
                              width: `${Math.min(product.achieved, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-gray-800/50 rounded-lg p-2 border border-gray-700">
            <div className="text-base font-black text-green-400">
              {statistics.avgAchievement}%
            </div>
            <div className="text-gray-400 text-xs">Avg Achievement</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-2 border border-gray-700">
            <div className="text-base font-black text-yellow-400">
              {statistics.avgEfficiency}%
            </div>
            <div className="text-gray-400 text-xs">Avg Efficiency</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-2 border border-gray-700">
            <div className="text-base font-black text-blue-400">
              {statistics.avgSafety}%
            </div>
            <div className="text-gray-400 text-xs">Avg Safety</div>
          </div>
        </div>
      </div>
    </div>
  );
}
