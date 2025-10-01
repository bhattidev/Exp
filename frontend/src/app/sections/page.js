// app/sections/page.js
"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import {
  Beaker,
  Flame,
  TestTube,
  Truck,
  Activity,
  Shield,
  Factory,
  Users,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Target,
} from "lucide-react";

const sectionsData = [
  {
    id: "acids",
    name: "Acids Production",
    shortName: "Acids",
    icon: Beaker,
    color: "#6366f1",
    description:
      "Production of industrial acids including Nitric, Sulfuric, and Hydrochloric acids",
    manager: "Dr. Ahmed Raza",
    employees: 45,
    status: "optimal",
    efficiency: 91,
    safety: 96,
    products: [
      { name: "Nitric Acid", production: 14250, targets: 15000, achieved: 95 },
      {
        name: "Sulfuric Acid",
        production: 10800,
        targets: 12000,
        achieved: 90,
      },
      {
        name: "Hydrochloric Acid",
        production: 6800,
        targets: 8000,
        achieved: 85,
      },
    ],
    equipment: [
      "Reactor Vessels",
      "Distillation Columns",
      "Cooling Systems",
      "Storage Tanks",
    ],
    metrics: {
      monthlyProduction: 31850,
      monthlyTarget: 35000,
      uptime: 98.5,
      qualityRate: 99.2,
      incidents: 0,
    },
  },
  {
    id: "prop-i",
    name: "Propellants I",
    shortName: "Prop-I",
    icon: Flame,
    color: "#ef4444",
    description: "High-energy propellants and explosives manufacturing",
    manager: "Eng. Sarah Khan",
    employees: 68,
    status: "optimal",
    efficiency: 92.5,
    safety: 97,
    products: [
      {
        name: "Ammonium Nitrate",
        production: 23750,
        targets: 25000,
        achieved: 95,
      },
      { name: "RDX", production: 16560, targets: 18000, achieved: 92 },
      { name: "TNT", production: 19800, targets: 22000, achieved: 90 },
    ],
    equipment: ["Mixers", "Crystallizers", "Dryers", "Quality Control Labs"],
    metrics: {
      monthlyProduction: 60110,
      monthlyTarget: 65000,
      uptime: 97.8,
      qualityRate: 98.8,
      incidents: 1,
    },
  },
  {
    id: "prop-ii",
    name: "Propellants II",
    shortName: "Prop-II",
    icon: TestTube,
    color: "#84cc16",
    description: "Specialized propellants and advanced compositions",
    manager: "Dr. Bilal Ahmed",
    employees: 52,
    status: "good",
    efficiency: 90,
    safety: 95,
    products: [
      {
        name: "Composition B",
        production: 13600,
        targets: 16000,
        achieved: 85,
      },
      { name: "PETN", production: 11900, targets: 14000, achieved: 85 },
      {
        name: "Propellant Grains",
        production: 28500,
        targets: 30000,
        achieved: 95,
      },
    ],
    equipment: ["Extruders", "Presses", "Cutting Machines", "Testing Chambers"],
    metrics: {
      monthlyProduction: 54000,
      monthlyTarget: 60000,
      uptime: 96.2,
      qualityRate: 97.5,
      incidents: 2,
    },
  },
  {
    id: "ng",
    name: "Natural Gas Processing",
    shortName: "NG",
    icon: Truck,
    color: "#3b82f6",
    description: "Processing and distribution of natural gas and derivatives",
    manager: "Eng. Usman Ali",
    employees: 38,
    status: "optimal",
    efficiency: 92.2,
    safety: 98,
    products: [
      { name: "Natural Gas", production: 47500, targets: 50000, achieved: 95 },
      { name: "LPG", production: 25200, targets: 28000, achieved: 90 },
      { name: "CNG", production: 31500, targets: 35000, achieved: 90 },
    ],
    equipment: [
      "Compressors",
      "Separators",
      "Purification Units",
      "Storage Facilities",
    ],
    metrics: {
      monthlyProduction: 104200,
      monthlyTarget: 113000,
      uptime: 99.1,
      qualityRate: 99.5,
      incidents: 0,
    },
  },
  {
    id: "ncp",
    name: "Nitrocellulose Products",
    shortName: "NCP",
    icon: Activity,
    color: "#eab308",
    description:
      "Manufacturing of nitrocellulose-based products and smokeless powders",
    manager: "Dr. Fatima Noor",
    employees: 41,
    status: "warning",
    efficiency: 85,
    safety: 92,
    products: [
      {
        name: "Nitrocellulose",
        production: 17000,
        targets: 20000,
        achieved: 85,
      },
      {
        name: "Smokeless Powder",
        production: 15300,
        targets: 18000,
        achieved: 85,
      },
    ],
    equipment: [
      "Nitration Reactors",
      "Washing Systems",
      "Stabilizers",
      "Packaging Lines",
    ],
    metrics: {
      monthlyProduction: 32300,
      monthlyTarget: 38000,
      uptime: 94.5,
      qualityRate: 96.8,
      incidents: 3,
    },
  },
  {
    id: "gc",
    name: "General Chemicals",
    shortName: "GC",
    icon: Shield,
    color: "#16a34a",
    description: "Production of industrial chemicals and specialized compounds",
    manager: "Eng. Hassan Mahmood",
    employees: 56,
    status: "good",
    efficiency: 90,
    safety: 96,
    products: [
      {
        name: "Industrial Explosives",
        production: 36000,
        targets: 40000,
        achieved: 90,
      },
      { name: "Detonators", production: 13500, targets: 15000, achieved: 90 },
    ],
    equipment: ["Reactors", "Blenders", "Quality Assurance", "Safety Systems"],
    metrics: {
      monthlyProduction: 49500,
      monthlyTarget: 55000,
      uptime: 97.2,
      qualityRate: 98.3,
      incidents: 1,
    },
  },
];

export default function SectionsPage() {
  const [selectedSection, setSelectedSection] = useState(sectionsData[0]);

  const overallStats = useMemo(() => {
    const totalProduction = sectionsData.reduce(
      (sum, section) => sum + section.metrics.monthlyProduction,
      0
    );
    const totalTarget = sectionsData.reduce(
      (sum, section) => sum + section.metrics.monthlyTarget,
      0
    );
    const totalEmployees = sectionsData.reduce(
      (sum, section) => sum + section.employees,
      0
    );
    const avgEfficiency =
      sectionsData.reduce((sum, section) => sum + section.efficiency, 0) /
      sectionsData.length;
    const avgSafety =
      sectionsData.reduce((sum, section) => sum + section.safety, 0) /
      sectionsData.length;

    return {
      totalProduction,
      totalTarget,
      achievement: ((totalProduction / totalTarget) * 100).toFixed(1),
      totalEmployees,
      avgEfficiency: avgEfficiency.toFixed(1),
      avgSafety: avgSafety.toFixed(1),
    };
  }, []);

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
          text: "Needs Attention",
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

  const sectionPerformanceData = sectionsData.map((section) => ({
    name: section.shortName,
    efficiency: section.efficiency,
    safety: section.safety,
    production: section.metrics.monthlyProduction / 1000, // Convert to thousands
    color: section.color,
  }));

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-8xl mx-auto space-y-6 sm:space-y-8">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-4xl font-black text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text  mb-4">
            Production Sections
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Detailed overview of all production sections, their performance
            metrics, and operational details.
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-800/80 rounded-2xl p-6 border border-gray-700">
            <div className="text-2xl font-black text-white">
              {sectionsData.length}
            </div>
            <div className="text-gray-400 text-sm">Total Sections</div>
          </div>
          <div className="bg-gray-800/80 rounded-2xl p-6 border border-gray-700">
            <div className="text-2xl font-black text-green-400">
              {overallStats.achievement}%
            </div>
            <div className="text-gray-400 text-sm">Overall Achievement</div>
          </div>
          <div className="bg-gray-800/80 rounded-2xl p-6 border border-gray-700">
            <div className="text-2xl font-black text-yellow-400">
              {overallStats.avgEfficiency}%
            </div>
            <div className="text-gray-400 text-sm">Average Efficiency</div>
          </div>
          <div className="bg-gray-800/80 rounded-2xl p-6 border border-gray-700">
            <div className="text-2xl font-black text-blue-400">
              {overallStats.totalEmployees}
            </div>
            <div className="text-gray-400 text-sm">Total Employees</div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Sections List */}
          <div className="xl:col-span-1 space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">All Sections</h2>
            {sectionsData.map((section) => {
              const Icon = section.icon;
              const statusInfo = getStatusInfo(section.status);
              const StatusIcon = statusInfo.icon;
              const isSelected = selectedSection.id === section.id;

              return (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                    isSelected
                      ? "border-blue-500 bg-blue-500/10 shadow-lg"
                      : "border-gray-700 bg-gray-800/50 hover:bg-gray-700/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: section.color + "20" }}
                      >
                        <Icon
                          className="w-5 h-5"
                          style={{ color: section.color }}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">
                          {section.shortName}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {section.employees} employees
                        </p>
                      </div>
                    </div>
                    <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Efficiency</span>
                    <span className="font-semibold text-white">
                      {section.efficiency}%
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Section Details */}
          <div className="xl:col-span-2">
            <div className="bg-gray-800/80 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: selectedSection.color + "20" }}
                  >
                    <selectedSection.icon
                      className="w-8 h-8"
                      style={{ color: selectedSection.color }}
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedSection.name}
                    </h2>
                    <p className="text-gray-400">
                      {selectedSection.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">
                      {selectedSection.employees} Employees
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">
                    Managed by {selectedSection.manager}
                  </div>
                </div>
              </div>

              {/* Section Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-700/50 rounded-xl p-4 text-center">
                  <Target className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-lg font-black text-white">
                    {(
                      (selectedSection.metrics.monthlyProduction /
                        selectedSection.metrics.monthlyTarget) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                  <div className="text-gray-400 text-sm">Achievement</div>
                </div>
                <div className="bg-gray-700/50 rounded-xl p-4 text-center">
                  <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <div className="text-lg font-black text-white">
                    {selectedSection.efficiency}%
                  </div>
                  <div className="text-gray-400 text-sm">Efficiency</div>
                </div>
                <div className="bg-gray-700/50 rounded-xl p-4 text-center">
                  <Shield className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <div className="text-lg font-black text-white">
                    {selectedSection.safety}%
                  </div>
                  <div className="text-gray-400 text-sm">Safety</div>
                </div>
                <div className="bg-gray-700/50 rounded-xl p-4 text-center">
                  <Clock className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-lg font-black text-white">
                    {selectedSection.metrics.uptime}%
                  </div>
                  <div className="text-gray-400 text-sm">Uptime</div>
                </div>
              </div>

              {/* Products and Equipment */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Products
                  </h3>
                  <div className="space-y-3">
                    {selectedSection.products.map((product, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg"
                      >
                        <span className="text-gray-300">{product.name}</span>
                        <div className="text-right">
                          <div className="text-white font-semibold">
                            {product.achieved}%
                          </div>
                          <div className="text-gray-400 text-sm">
                            {product.production.toLocaleString()} /{" "}
                            {product.targets.toLocaleString()} tons
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Key Equipment
                  </h3>
                  <div className="space-y-2">
                    {selectedSection.equipment.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg"
                      >
                        <Factory className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Comparison Chart */}
        <div className="bg-gray-800/80 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-6">
            Section Performance Comparison
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectionPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" tick={{ fill: "#9CA3AF" }} />
                <YAxis tick={{ fill: "#9CA3AF" }} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="efficiency"
                  name="Efficiency (%)"
                  radius={[4, 4, 0, 0]}
                >
                  {sectionPerformanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
                <Bar dataKey="safety" name="Safety (%)" radius={[4, 4, 0, 0]}>
                  {sectionPerformanceData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      opacity={0.7}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
