// app/alerts/page.js
"use client";

import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Bell,
  ArrowLeft,
  X,
  Eye,
  MessageCircle,
  Factory,
  TrendingUp,
  Shield,
  Settings,
} from "lucide-react";
import Link from "next/link";

const alertsData = [
  {
    id: 1,
    product: "Hydrochloric Acid",
    section: "Acids",
    type: "production",
    severity: "high",
    message: "Production below target by 15% for 3 consecutive hours",
    timestamp: "2024-01-15 14:30",
    status: "active",
    assigned: "Eng. Ahmed Raza",
    duration: "3h 15m",
  },
  {
    id: 2,
    product: "Composition B",
    section: "Prop-II",
    type: "efficiency",
    severity: "medium",
    message: "Efficiency dropped to 81% - below optimal range",
    timestamp: "2024-01-15 13:45",
    status: "active",
    assigned: "Dr. Sarah Khan",
    duration: "4h 30m",
  },
  {
    id: 3,
    product: "PETN",
    section: "Prop-II",
    type: "safety",
    severity: "medium",
    message: "Safety compliance at 93% - requires immediate attention",
    timestamp: "2024-01-15 12:15",
    status: "acknowledged",
    assigned: "Safety Team",
    duration: "5h 45m",
  },
  {
    id: 4,
    product: "Nitrocellulose",
    section: "NCP",
    type: "equipment",
    severity: "low",
    message: "Equipment maintenance delay affecting production schedule",
    timestamp: "2024-01-15 11:20",
    status: "resolved",
    assigned: "Maintenance Team",
    duration: "6h 10m",
  },
  {
    id: 5,
    product: "Smokeless Powder",
    section: "NCP",
    type: "quality",
    severity: "low",
    message: "Quality check required - batch #NP-2345",
    timestamp: "2024-01-15 10:45",
    status: "resolved",
    assigned: "Quality Control",
    duration: "7h 35m",
  },
];

export default function AlertsPage() {
  const [filter, setFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedAlert, setSelectedAlert] = useState(null);

  const filteredAlerts = alertsData.filter((alert) => {
    if (filter !== "all" && alert.status !== filter) return false;
    if (severityFilter !== "all" && alert.severity !== severityFilter)
      return false;
    if (typeFilter !== "all" && alert.type !== typeFilter) return false;
    return true;
  });

  const activeAlerts = alertsData.filter(
    (alert) => alert.status === "active"
  ).length;
  const highSeverityAlerts = alertsData.filter(
    (alert) => alert.severity === "high"
  ).length;

  const getSeverityColor = (severity) => {
    const colors = {
      high: "bg-red-500/20 text-red-300 border-red-500/30",
      medium: "bg-orange-500/20 text-orange-300 border-orange-500/30",
      low: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    };
    return (
      colors[severity] || "bg-gray-500/20 text-gray-300 border-gray-500/30"
    );
  };

  const getStatusColor = (status) => {
    const colors = {
      active: "bg-red-500/20 text-red-300",
      acknowledged: "bg-blue-500/20 text-blue-300",
      resolved: "bg-green-500/20 text-green-300",
    };
    return colors[status] || "bg-gray-500/20 text-gray-300";
  };

  const getTypeIcon = (type) => {
    const icons = {
      production: Factory,
      efficiency: TrendingUp,
      safety: Shield,
      equipment: Settings,
      quality: CheckCircle,
    };
    return icons[type] || AlertTriangle;
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell className="w-10 h-10 text-orange-400" />
              {activeAlerts > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-sm rounded-full flex items-center justify-center font-semibold">
                  {activeAlerts}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-black text-white bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text">
                Alert Center
              </h1>
              <p className="text-gray-300">
                Monitor and manage production alerts and notifications
              </p>
            </div>
          </div>
          <Link href="/">
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
          </Link>
        </div>

        {/* Alert Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800/80 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-black text-red-400">
                  {activeAlerts}
                </div>
                <div className="text-gray-400 text-sm">Active Alerts</div>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-400 opacity-60" />
            </div>
          </div>
          <div className="bg-gray-800/80 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-black text-orange-400">
                  {highSeverityAlerts}
                </div>
                <div className="text-gray-400 text-sm">High Severity</div>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-400 opacity-60" />
            </div>
          </div>
          <div className="bg-gray-800/80 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-black text-green-400">
                  {alertsData.filter((a) => a.status === "resolved").length}
                </div>
                <div className="text-gray-400 text-sm">Resolved Today</div>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400 opacity-60" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800/80 rounded-2xl p-6 border border-gray-700">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300 text-sm font-medium">
                Filter by:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {["all", "active", "acknowledged", "resolved"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                    filter === status
                      ? "bg-orange-500 text-white shadow-lg"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {["all", "high", "medium", "low"].map((severity) => (
                <button
                  key={severity}
                  onClick={() => setSeverityFilter(severity)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                    severityFilter === severity
                      ? getSeverityColor(severity)
                          .replace("bg-", "bg-")
                          .replace("text-", "text-white")
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {severity}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "all",
                "production",
                "efficiency",
                "safety",
                "equipment",
                "quality",
              ].map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                    typeFilter === type
                      ? "bg-blue-500 text-white shadow-lg"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert) => {
            const TypeIcon = getTypeIcon(alert.type);

            return (
              <div
                key={alert.id}
                className={`bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border-l-4 transition-all hover:shadow-xl cursor-pointer ${
                  alert.severity === "high"
                    ? "border-red-500"
                    : alert.severity === "medium"
                    ? "border-orange-500"
                    : "border-yellow-500"
                }`}
                onClick={() => setSelectedAlert(alert)}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div
                      className={`p-3 rounded-xl ${
                        alert.severity === "high"
                          ? "bg-red-500/20"
                          : alert.severity === "medium"
                          ? "bg-orange-500/20"
                          : "bg-yellow-500/20"
                      }`}
                    >
                      <TypeIcon
                        className="w-6 h-6"
                        style={{
                          color:
                            alert.severity === "high"
                              ? "#ef4444"
                              : alert.severity === "medium"
                              ? "#f97316"
                              : "#eab308",
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-white">
                          {alert.product}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(
                            alert.severity
                          )}`}
                        >
                          {alert.severity} severity
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            alert.status
                          )}`}
                        >
                          {alert.status}
                        </span>
                        <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded-full">
                          {alert.section}
                        </span>
                        <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded-full">
                          {alert.type}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-3">{alert.message}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {alert.timestamp}
                        </div>
                        <div>Duration: {alert.duration}</div>
                        <div>Assigned: {alert.assigned}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {alert.status === "active" && (
                      <button
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle acknowledge logic here
                        }}
                      >
                        <MessageCircle className="w-4 h-4" />
                        Acknowledge
                      </button>
                    )}
                    <button
                      className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAlert(alert);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                      Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredAlerts.length === 0 && (
          <div className="text-center py-16">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4 opacity-60" />
            <h3 className="text-2xl font-semibold text-white mb-2">
              No Alerts Found
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              All systems are operating normally. No active alerts match your
              current filters.
            </p>
          </div>
        )}

        {/* Alert Detail Modal */}
        {selectedAlert && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-white">Alert Details</h2>
                <button
                  onClick={() => setSelectedAlert(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm">Product</label>
                    <p className="text-white font-semibold">
                      {selectedAlert.product}
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Section</label>
                    <p className="text-white font-semibold">
                      {selectedAlert.section}
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Type</label>
                    <p className="text-white font-semibold capitalize">
                      {selectedAlert.type}
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Severity</label>
                    <p className="text-white font-semibold capitalize">
                      {selectedAlert.severity}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 text-sm">Message</label>
                  <p className="text-white mt-1">{selectedAlert.message}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm">Timestamp</label>
                    <p className="text-white">{selectedAlert.timestamp}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Duration</label>
                    <p className="text-white">{selectedAlert.duration}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Assigned To</label>
                    <p className="text-white">{selectedAlert.assigned}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Status</label>
                    <p className="text-white capitalize">
                      {selectedAlert.status}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-700">
                  {selectedAlert.status === "active" && (
                    <>
                      <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg flex-1 transition-colors">
                        Acknowledge Alert
                      </button>
                      <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex-1 transition-colors">
                        Mark Resolved
                      </button>
                    </>
                  )}
                  <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg flex-1 transition-colors">
                    View Product Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
