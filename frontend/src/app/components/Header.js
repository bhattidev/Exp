// app/components/Header.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ChartBar,
  Bell,
  BarChart3,
  Factory,
  Zap,
  Clock,
  Menu,
  X,
  Shield, // Added missing import
} from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [alerts, setAlerts] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getCurrentShift = () => {
    const hour = currentTime.getHours();
    if (hour >= 6 && hour < 14) return "Shift A";
    if (hour >= 14 && hour < 22) return "Shift B";
    return "Shift C";
  };

  const lastUpdated = currentTime.toLocaleString("en-GB", {
    timeZone: "Asia/Karachi",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const navigation = [
    {
      name: "Live",
      href: "/",
      icon: Home,
      description: "Real-time production",
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: ChartBar,
      description: "Historical data",
    },
    {
      name: "Sections",
      href: "/sections",
      icon: Factory,
      description: "Section details",
    },
    {
      name: "Graphs",
      href: "/graphs",
      icon: BarChart3,
      description: "Detailed charts",
    },
    {
      name: "Alerts",
      href: "/alerts",
      icon: Bell,
      description: "Notifications",
      badge: alerts,
    },
    {
      name: "Admin",
      href: "/admin",
      icon: Shield,
      description: "System administration",
    },
  ];

  return (
    <>
      <header className="bg-gray-800/80 backdrop-blur-lg border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-8xl mx-auto">
          {/* Compact Header */}
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14">
              {/* Logo and Brand */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    alt="POF Logo"
                    src="/pof.png"
                    className="h-8 w-8 drop-shadow-lg"
                  />
                  <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-green-500 rounded-full animate-ping z-20"></div>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg font-black text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                    JBH COMPLEX
                  </h1>
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-0">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link key={item.name} href={item.href}>
                      <div
                        className={`
                        relative px-3 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 group
                        ${
                          isActive
                            ? "bg-blue-500 text-white shadow-lg"
                            : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                        }
                      `}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{item.name}</span>
                        {item.badge && item.badge > 0 && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </nav>

              {/* Time Display */}
              <div className="hidden md:flex items-center gap-2 text-sm">
                <Clock className="w-3 h-3 text-blue-400" />
                <span className="font-mono text-white">{lastUpdated}</span>
                <span className="text-blue-400 bg-blue-500/20 px-2 py-1 rounded text-xs">
                  {getCurrentShift()}
                </span>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 rounded-lg text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gray-800/95 backdrop-blur-lg border-b border-gray-700">
          <div className="px-3 py-2 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link key={item.name} href={item.href}>
                  <div
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${
                        isActive
                          ? "bg-blue-500 text-white shadow-lg"
                          : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                    {item.badge && item.badge > 0 && (
                      <span className="ml-auto w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
