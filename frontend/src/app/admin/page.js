// app/admin/page.js
"use client";

import { useState, useMemo } from "react";
import Link from "next/link"; // Add this import
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
} from "recharts";
import {
  Users,
  Settings,
  Shield,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Filter,
  UserPlus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  PieChart as PieChartIcon,
  Calendar,
  Database, // Add this import
  Server,
  Cpu,
  HardDrive,
  Network,
} from "lucide-react";

// Sample data for admin dashboard
const systemStats = {
  totalUsers: 24,
  activeUsers: 18,
  systemUptime: 99.8,
  storageUsed: 76,
  cpuUsage: 45,
  memoryUsage: 62,
  networkLoad: 28,
};

const userActivity = [
  { time: "09:00", logins: 12, actions: 45, errors: 2 },
  { time: "10:00", logins: 18, actions: 67, errors: 1 },
  { time: "11:00", logins: 22, actions: 89, errors: 0 },
  { time: "12:00", logins: 15, actions: 56, errors: 1 },
  { time: "13:00", logins: 20, actions: 78, errors: 3 },
  { time: "14:00", logins: 25, actions: 92, errors: 1 },
  { time: "15:00", logins: 19, actions: 71, errors: 0 },
];

const userRoles = [
  { role: "Administrator", count: 3, color: "#ef4444" },
  { role: "Production Manager", count: 5, color: "#3b82f6" },
  { role: "Section Supervisor", count: 8, color: "#10b981" },
  { role: "Operator", count: 6, color: "#f59e0b" },
  { role: "Viewer", count: 2, color: "#8b5cf6" },
];

const usersData = [
  {
    id: 1,
    name: "Ahmed Raza",
    email: "ahmed.raza@pof.gov.pk",
    role: "Administrator",
    lastActive: "2 minutes ago",
    status: "online",
    department: "IT",
    loginCount: 142,
  },
  {
    id: 2,
    name: "Sarah Khan",
    email: "sarah.khan@pof.gov.pk",
    role: "Production Manager",
    lastActive: "15 minutes ago",
    status: "online",
    department: "Production",
    loginCount: 89,
  },
  {
    id: 3,
    name: "Bilal Ahmed",
    email: "bilal.ahmed@pof.gov.pk",
    role: "Section Supervisor",
    lastActive: "1 hour ago",
    status: "away",
    department: "Propellants I",
    loginCount: 67,
  },
  {
    id: 4,
    name: "Fatima Noor",
    email: "fatima.noor@pof.gov.pk",
    role: "Operator",
    lastActive: "30 minutes ago",
    status: "online",
    department: "Acids Production",
    loginCount: 45,
  },
  {
    id: 5,
    name: "Usman Ali",
    email: "usman.ali@pof.gov.pk",
    role: "Viewer",
    lastActive: "2 hours ago",
    status: "offline",
    department: "Quality Control",
    loginCount: 23,
  },
];

const systemAlerts = [
  {
    id: 1,
    type: "warning",
    message: "Database backup pending",
    timestamp: "2024-01-15 14:30",
    priority: "medium",
  },
  {
    id: 2,
    type: "info",
    message: "System update available",
    timestamp: "2024-01-15 13:15",
    priority: "low",
  },
  {
    id: 3,
    type: "error",
    message: "High memory usage detected",
    timestamp: "2024-01-15 12:45",
    priority: "high",
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedUser, setSelectedUser] = useState(null);
  const [timeRange, setTimeRange] = useState("24h");

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "text-green-400";
      case "away":
        return "text-yellow-400";
      case "offline":
        return "text-gray-400";
      default:
        return "text-gray-400";
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case "online":
        return "bg-green-500/20";
      case "away":
        return "bg-yellow-500/20";
      case "offline":
        return "bg-gray-500/20";
      default:
        return "bg-gray-500/20";
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case "error":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      case "warning":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      case "info":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/95 backdrop-blur-sm p-3 rounded-xl border border-gray-700 shadow-2xl text-white">
          <p className="font-bold text-sm mb-2">{label}</p>
          <div className="space-y-1">
            {payload.map((entry, index) => (
              <p
                key={index}
                className="flex items-center gap-2 text-xs"
                style={{ color: entry.color }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                {entry.name}: {entry.value}
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4">
      <div className="max-w-8xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl font-black text-white bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
              Admin Dashboard
            </h1>
            <p className="text-gray-300 text-sm">
              System administration and user management
            </p>
          </div>
          <div className="flex gap-2">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm">
              <Download className="w-4 h-4" />
              Export Report
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm">
              <UserPlus className="w-4 h-4" />
              Add User
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-1 bg-gray-800/50 rounded-xl p-1">
          {[
            { id: "overview", name: "Overview", icon: BarChart3 },
            { id: "data", name: "Data Management", icon: Database }, // Added Data Management tab
            { id: "users", name: "Users", icon: Users },
            { id: "system", name: "System", icon: Settings },
            { id: "security", name: "Security", icon: Shield },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-500 text-white shadow-lg"
                    : "text-gray-300 hover:bg-gray-700/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            {/* System Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-gray-800/80 rounded-xl p-4 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-black text-white">
                      {systemStats.totalUsers}
                    </div>
                    <div className="text-gray-400 text-xs">Total Users</div>
                  </div>
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-green-400 text-xs mt-1">
                  +{systemStats.activeUsers} active
                </div>
              </div>

              <div className="bg-gray-800/80 rounded-xl p-4 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-black text-white">
                      {systemStats.systemUptime}%
                    </div>
                    <div className="text-gray-400 text-xs">System Uptime</div>
                  </div>
                  <Activity className="w-5 h-5 text-green-400" />
                </div>
                <div className="text-green-400 text-xs mt-1">No downtime</div>
              </div>

              <div className="bg-gray-800/80 rounded-xl p-4 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-black text-white">
                      {systemStats.storageUsed}%
                    </div>
                    <div className="text-gray-400 text-xs">Storage Used</div>
                  </div>
                  <HardDrive className="w-5 h-5 text-orange-400" />
                </div>
                <div className="text-yellow-400 text-xs mt-1">2.3TB of 3TB</div>
              </div>

              <div className="bg-gray-800/80 rounded-xl p-4 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-black text-white">
                      {systemStats.cpuUsage}%
                    </div>
                    <div className="text-gray-400 text-xs">CPU Usage</div>
                  </div>
                  <Cpu className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-green-400 text-xs mt-1">Optimal</div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {/* User Activity */}
              <div className="bg-gray-800/80 rounded-xl p-4 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  User Activity (24h)
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={userActivity}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis
                        dataKey="time"
                        tick={{ fill: "#9CA3AF", fontSize: 12 }}
                      />
                      <YAxis tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="logins"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        name="User Logins"
                      />
                      <Line
                        type="monotone"
                        dataKey="actions"
                        stroke="#10b981"
                        strokeWidth={2}
                        name="User Actions"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* User Roles */}
              <div className="bg-gray-800/80 rounded-xl p-4 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5 text-green-400" />
                  User Roles Distribution
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={userRoles}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ role, percent }) =>
                          `${role} (${(percent * 100).toFixed(0)}%)`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {userRoles.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* System Alerts */}
            <div className="bg-gray-800/80 rounded-xl p-4 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
                System Alerts
              </h3>
              <div className="space-y-2">
                {systemAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-lg border ${getAlertColor(
                      alert.type
                    )}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {alert.type === "error" && (
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                        )}
                        {alert.type === "warning" && (
                          <AlertTriangle className="w-4 h-4 text-orange-400" />
                        )}
                        {alert.type === "info" && (
                          <CheckCircle className="w-4 h-4 text-blue-400" />
                        )}
                        <span className="text-sm">{alert.message}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="capitalize">
                          {alert.priority} priority
                        </span>
                        <span>{alert.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Data Management Tab - ADD THIS SECTION */}
        {activeTab === "data" && (
          <div className="text-center py-8">
            <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Data Management
            </h3>
            <p className="text-gray-400 mb-4">
              Manage production data and configurations
            </p>
            <Link href="/admin/data">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
                Open Data Manager
              </button>
            </Link>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="space-y-4">
            {/* Users Table */}
            <div className="bg-gray-800/80 rounded-xl border border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-bold text-white">
                  User Management
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-700/50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Last Active
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {usersData.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-700/30 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white">
                                {user.name}
                              </div>
                              <div className="text-xs text-gray-400">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.role === "Administrator"
                                ? "bg-red-500/20 text-red-300"
                                : user.role === "Production Manager"
                                ? "bg-blue-500/20 text-blue-300"
                                : user.role === "Section Supervisor"
                                ? "bg-green-500/20 text-green-300"
                                : user.role === "Operator"
                                ? "bg-yellow-500/20 text-yellow-300"
                                : "bg-purple-500/20 text-purple-300"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-300">
                          {user.department}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBg(
                              user.status
                            )} ${getStatusColor(user.status)}`}
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full mr-1 ${
                                user.status === "online"
                                  ? "bg-green-400"
                                  : user.status === "away"
                                  ? "bg-yellow-400"
                                  : "bg-gray-400"
                              }`}
                            />
                            {user.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-300">
                          {user.lastActive}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button className="p-1.5 text-gray-400 hover:text-blue-400 transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-gray-400 hover:text-yellow-400 transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-gray-400 hover:text-red-400 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* User Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-800/80 rounded-xl p-4 border border-gray-700">
                <div className="text-2xl font-black text-blue-400">
                  {systemStats.activeUsers}
                </div>
                <div className="text-gray-400 text-sm">Active Users</div>
              </div>
              <div className="bg-gray-800/80 rounded-xl p-4 border border-gray-700">
                <div className="text-2xl font-black text-green-400">142</div>
                <div className="text-gray-400 text-sm">
                  Total Logins (Today)
                </div>
              </div>
              <div className="bg-gray-800/80 rounded-xl p-4 border border-gray-700">
                <div className="text-2xl font-black text-purple-400">89%</div>
                <div className="text-gray-400 text-sm">Active Session Rate</div>
              </div>
            </div>
          </div>
        )}

        {/* System Tab */}
        {activeTab === "system" && (
          <div className="space-y-4">
            {/* System Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-gray-800/80 rounded-xl p-4 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Server className="w-5 h-5 text-blue-400" />
                  Server Performance
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      label: "CPU Usage",
                      value: systemStats.cpuUsage,
                      color: "bg-purple-500",
                      icon: Cpu,
                    },
                    {
                      label: "Memory Usage",
                      value: systemStats.memoryUsage,
                      color: "bg-blue-500",
                      icon: Database,
                    },
                    {
                      label: "Storage Used",
                      value: systemStats.storageUsed,
                      color: "bg-orange-500",
                      icon: HardDrive,
                    },
                    {
                      label: "Network Load",
                      value: systemStats.networkLoad,
                      color: "bg-green-500",
                      icon: Network,
                    },
                  ].map((metric, index) => {
                    const Icon = metric.icon;
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-gray-300">
                            <Icon className="w-4 h-4" />
                            {metric.label}
                          </div>
                          <span className="text-white font-semibold">
                            {metric.value}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${metric.color}`}
                            style={{ width: `${metric.value}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-gray-800/80 rounded-xl p-4 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-400" />
                  System Information
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      label: "System Uptime",
                      value: `${systemStats.systemUptime}%`,
                      status: "success",
                    },
                    {
                      label: "Database Status",
                      value: "Connected",
                      status: "success",
                    },
                    {
                      label: "API Response Time",
                      value: "124ms",
                      status: "warning",
                    },
                    {
                      label: "Last Backup",
                      value: "2 hours ago",
                      status: "success",
                    },
                    {
                      label: "Security Scan",
                      value: "Completed",
                      status: "success",
                    },
                  ].map((info, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="text-gray-300">{info.label}</span>
                      <span
                        className={`font-semibold ${
                          info.status === "success"
                            ? "text-green-400"
                            : info.status === "warning"
                            ? "text-yellow-400"
                            : "text-red-400"
                        }`}
                      >
                        {info.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800/80 rounded-xl p-4 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  {
                    label: "Backup Database",
                    icon: Database,
                    color: "bg-blue-500 hover:bg-blue-600",
                  },
                  {
                    label: "Clear Cache",
                    icon: Cpu,
                    color: "bg-orange-500 hover:bg-orange-600",
                  },
                  {
                    label: "Run Diagnostics",
                    icon: Activity,
                    color: "bg-green-500 hover:bg-green-600",
                  },
                  {
                    label: "Update System",
                    icon: Download,
                    color: "bg-purple-500 hover:bg-purple-600",
                  },
                ].map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      className={`${action.color} text-white p-3 rounded-lg flex flex-col items-center gap-2 transition-colors text-sm`}
                    >
                      <Icon className="w-5 h-5" />
                      {action.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div className="space-y-4">
            {/* Security Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-800/80 rounded-xl p-4 border border-gray-700">
                <div className="text-2xl font-black text-green-400">98%</div>
                <div className="text-gray-400 text-sm">Security Score</div>
              </div>
              <div className="bg-gray-800/80 rounded-xl p-4 border border-gray-700">
                <div className="text-2xl font-black text-blue-400">0</div>
                <div className="text-gray-400 text-sm">Active Threats</div>
              </div>
              <div className="bg-gray-800/80 rounded-xl p-4 border border-gray-700">
                <div className="text-2xl font-black text-yellow-400">3</div>
                <div className="text-gray-400 text-sm">Pending Updates</div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-gray-800/80 rounded-xl p-4 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">
                  Access Control
                </h3>
                <div className="space-y-3">
                  {[
                    { setting: "Two-Factor Authentication", enabled: true },
                    { setting: "IP Whitelisting", enabled: false },
                    { setting: "Session Timeout", enabled: true },
                    { setting: "Password Policy", enabled: true },
                    { setting: "API Rate Limiting", enabled: true },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-300 text-sm">
                        {item.setting}
                      </span>
                      <div
                        className={`w-10 h-5 rounded-full transition-colors ${
                          item.enabled ? "bg-green-500" : "bg-gray-600"
                        } relative`}
                      >
                        <div
                          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                            item.enabled ? "transform translate-x-5" : ""
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800/80 rounded-xl p-4 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">
                  Recent Security Events
                </h3>
                <div className="space-y-2">
                  {[
                    {
                      event: "User login from new device",
                      time: "2 min ago",
                      type: "info",
                    },
                    {
                      event: "Password changed successfully",
                      time: "1 hour ago",
                      type: "success",
                    },
                    {
                      event: "Failed login attempt",
                      time: "3 hours ago",
                      type: "warning",
                    },
                    {
                      event: "Security policy updated",
                      time: "5 hours ago",
                      type: "info",
                    },
                  ].map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 rounded-lg bg-gray-700/30"
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          event.type === "success"
                            ? "bg-green-400"
                            : event.type === "warning"
                            ? "bg-yellow-400"
                            : "bg-blue-400"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="text-sm text-white">{event.event}</div>
                        <div className="text-xs text-gray-400">
                          {event.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
