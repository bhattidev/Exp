// app/admin/data/page.js
"use client";

import { useState, useEffect } from "react";
import {
  Database,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  RefreshCw,
  Clock,
  Eye,
  BarChart3,
  Factory,
  Beaker,
  Flame,
  TestTube,
  Truck,
  Activity,
  Shield,
} from "lucide-react";

// Initial data structure
const initialSectionsData = {
  Acids: [
    {
      id: 1,
      name: "Nitric Acid",
      targets: 15000,
      production: 14250,
      achieved: 95,
      efficiency: 92,
      safety: 98,
      status: "optimal",
    },
    {
      id: 2,
      name: "Sulfuric Acid",
      targets: 12000,
      production: 10800,
      achieved: 90,
      efficiency: 88,
      safety: 95,
      status: "good",
    },
    {
      id: 3,
      name: "Hydrochloric Acid",
      targets: 8000,
      production: 6800,
      achieved: 85,
      efficiency: 82,
      safety: 92,
      status: "warning",
    },
  ],
  "Prop-I": [
    {
      id: 4,
      name: "Ammonium Nitrate",
      targets: 25000,
      production: 23750,
      achieved: 95,
      efficiency: 94,
      safety: 96,
      status: "optimal",
    },
    {
      id: 5,
      name: "RDX",
      targets: 18000,
      production: 16560,
      achieved: 92,
      efficiency: 90,
      safety: 99,
      status: "good",
    },
    {
      id: 6,
      name: "TNT",
      targets: 22000,
      production: 19800,
      achieved: 90,
      efficiency: 87,
      safety: 97,
      status: "good",
    },
  ],
  "Prop-II": [
    {
      id: 7,
      name: "Composition B",
      targets: 16000,
      production: 13600,
      achieved: 85,
      efficiency: 83,
      safety: 94,
      status: "warning",
    },
    {
      id: 8,
      name: "PETN",
      targets: 14000,
      production: 11900,
      achieved: 85,
      efficiency: 81,
      safety: 93,
      status: "warning",
    },
    {
      id: 9,
      name: "Propellant Grains",
      targets: 30000,
      production: 28500,
      achieved: 95,
      efficiency: 93,
      safety: 98,
      status: "optimal",
    },
  ],
  NG: [
    {
      id: 10,
      name: "Natural Gas",
      targets: 50000,
      production: 47500,
      achieved: 95,
      efficiency: 95,
      safety: 99,
      status: "optimal",
    },
    {
      id: 11,
      name: "LPG",
      targets: 28000,
      production: 25200,
      achieved: 90,
      efficiency: 89,
      safety: 96,
      status: "good",
    },
    {
      id: 12,
      name: "CNG",
      targets: 35000,
      production: 31500,
      achieved: 90,
      efficiency: 88,
      safety: 95,
      status: "good",
    },
  ],
  NCP: [
    {
      id: 13,
      name: "Nitrocellulose",
      targets: 20000,
      production: 17000,
      achieved: 85,
      efficiency: 84,
      safety: 91,
      status: "warning",
    },
    {
      id: 14,
      name: "Smokeless Powder",
      targets: 18000,
      production: 15300,
      achieved: 85,
      efficiency: 82,
      safety: 92,
      status: "warning",
    },
  ],
  GC: [
    {
      id: 15,
      name: "Industrial Explosives",
      targets: 40000,
      production: 36000,
      achieved: 90,
      efficiency: 86,
      safety: 94,
      status: "good",
    },
    {
      id: 16,
      name: "Detonators",
      targets: 15000,
      production: 13500,
      achieved: 90,
      efficiency: 87,
      safety: 98,
      status: "good",
    },
  ],
};

const sectionIcons = {
  Acids: Beaker,
  "Prop-I": Flame,
  "Prop-II": TestTube,
  NG: Truck,
  NCP: Activity,
  GC: Shield,
};

export default function DataManagementPage() {
  const [sectionsData, setSectionsData] = useState(initialSectionsData);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeSection, setActiveSection] = useState("Acids");
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isSaving, setIsSaving] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    targets: "",
    production: "",
    efficiency: "",
    safety: "",
  });

  // Update last updated time when data changes
  useEffect(() => {
    setLastUpdated(new Date());
  }, [sectionsData]);

  const handleEdit = (product, section) => {
    setEditingProduct({ ...product, section });
  };

  const handleSave = () => {
    if (!editingProduct) return;

    setIsSaving(true);
    setSectionsData((prev) => ({
      ...prev,
      [editingProduct.section]: prev[editingProduct.section].map((product) =>
        product.id === editingProduct.id
          ? {
              ...editingProduct,
              achieved: Math.min(
                100,
                Math.floor(
                  (editingProduct.production / editingProduct.targets) * 10000
                ) / 100
              ),
              status: getStatus(
                editingProduct.achieved,
                editingProduct.efficiency
              ),
            }
          : product
      ),
    }));

    setTimeout(() => {
      setIsSaving(false);
      setEditingProduct(null);
    }, 500);
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.targets || !newProduct.production)
      return;

    const product = {
      id: Date.now(),
      name: newProduct.name,
      targets: parseInt(newProduct.targets),
      production: parseInt(newProduct.production),
      efficiency: parseInt(newProduct.efficiency) || 85,
      safety: parseInt(newProduct.safety) || 95,
      achieved: Math.min(
        100,
        Math.floor(
          (parseInt(newProduct.production) / parseInt(newProduct.targets)) *
            10000
        ) / 100
      ),
      status: getStatus(
        Math.min(
          100,
          Math.floor(
            (parseInt(newProduct.production) / parseInt(newProduct.targets)) *
              10000
          ) / 100
        ),
        parseInt(newProduct.efficiency) || 85
      ),
    };

    setSectionsData((prev) => ({
      ...prev,
      [activeSection]: [...prev[activeSection], product],
    }));

    setNewProduct({
      name: "",
      targets: "",
      production: "",
      efficiency: "",
      safety: "",
    });
  };

  const handleDelete = (productId, section) => {
    setSectionsData((prev) => ({
      ...prev,
      [section]: prev[section].filter((product) => product.id !== productId),
    }));
  };

  const getStatus = (achieved, efficiency) => {
    if (achieved >= 95 && efficiency >= 90) return "optimal";
    if (achieved >= 85 && efficiency >= 80) return "good";
    return "warning";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "optimal":
        return "text-green-400 bg-green-500/20";
      case "good":
        return "text-blue-400 bg-blue-500/20";
      case "warning":
        return "text-orange-400 bg-orange-500/20";
      default:
        return "text-gray-400 bg-gray-500/20";
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(sectionsData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `production-data-${
      new Date().toISOString().split("T")[0]
    }.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        setSectionsData(importedData);
      } catch (error) {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  const calculateSectionStats = (section) => {
    const products = sectionsData[section];
    const totalTargets = products.reduce((sum, p) => sum + p.targets, 0);
    const totalProduction = products.reduce((sum, p) => sum + p.production, 0);
    const avgEfficiency =
      products.reduce((sum, p) => sum + p.efficiency, 0) / products.length;
    const avgSafety =
      products.reduce((sum, p) => sum + p.safety, 0) / products.length;

    return {
      totalTargets,
      totalProduction,
      achievement: ((totalProduction / totalTargets) * 100).toFixed(1),
      avgEfficiency: avgEfficiency.toFixed(1),
      avgSafety: avgSafety.toFixed(1),
      productCount: products.length,
    };
  };

  return (
    <div className="p-4">
      <div className="max-w-8xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl font-black text-white bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
              Data Management
            </h1>
            <p className="text-gray-300 text-sm">
              Manage production data for all sections
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock className="w-4 h-4" />
              Last updated: {lastUpdated.toLocaleString()}
            </div>
            <div className="flex gap-2">
              <button
                onClick={exportData}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm"
              >
                <Database className="w-4 h-4" />
                Export Data
              </button>
              <label className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm cursor-pointer">
                <RefreshCw className="w-4 h-4" />
                Import Data
                <input
                  type="file"
                  accept=".json"
                  onChange={importData}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="flex flex-wrap gap-2">
          {Object.keys(sectionsData).map((section) => {
            const Icon = sectionIcons[section];
            const stats = calculateSectionStats(section);
            return (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeSection === section
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{section}</span>
                <span className="text-xs opacity-75">
                  ({stats.productCount})
                </span>
              </button>
            );
          })}
        </div>

        {/* Section Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(() => {
            const stats = calculateSectionStats(activeSection);
            return (
              <>
                <div className="bg-gray-800/80 rounded-xl p-4 border border-gray-700">
                  <div className="text-lg font-black text-white">
                    {stats.totalTargets.toLocaleString()}
                  </div>
                  <div className="text-gray-400 text-xs">Total Targets</div>
                </div>
                <div className="bg-gray-800/80 rounded-xl p-4 border border-gray-700">
                  <div className="text-lg font-black text-green-400">
                    {stats.totalProduction.toLocaleString()}
                  </div>
                  <div className="text-gray-400 text-xs">Total Production</div>
                </div>
                <div className="bg-gray-800/80 rounded-xl p-4 border border-gray-700">
                  <div className="text-lg font-black text-blue-400">
                    {stats.achievement}%
                  </div>
                  <div className="text-gray-400 text-xs">Achievement</div>
                </div>
                <div className="bg-gray-800/80 rounded-xl p-4 border border-gray-700">
                  <div className="text-lg font-black text-yellow-400">
                    {stats.avgEfficiency}%
                  </div>
                  <div className="text-gray-400 text-xs">Avg Efficiency</div>
                </div>
              </>
            );
          })()}
        </div>

        {/* Add New Product */}
        <div className="bg-gray-800/80 rounded-xl p-4 border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-green-400" />
            Add New Product
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct((prev) => ({ ...prev, name: e.target.value }))
              }
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Targets"
              value={newProduct.targets}
              onChange={(e) =>
                setNewProduct((prev) => ({ ...prev, targets: e.target.value }))
              }
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Production"
              value={newProduct.production}
              onChange={(e) =>
                setNewProduct((prev) => ({
                  ...prev,
                  production: e.target.value,
                }))
              }
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Efficiency %"
              value={newProduct.efficiency}
              onChange={(e) =>
                setNewProduct((prev) => ({
                  ...prev,
                  efficiency: e.target.value,
                }))
              }
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Safety %"
              value={newProduct.safety}
              onChange={(e) =>
                setNewProduct((prev) => ({ ...prev, safety: e.target.value }))
              }
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleAddProduct}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 justify-center transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-gray-800/80 rounded-xl border border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Factory className="w-5 h-5 text-blue-400" />
              {activeSection} Products
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-700/50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Targets
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Production
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Achievement
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Efficiency
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Safety
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {sectionsData[activeSection].map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-700/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      {editingProduct?.id === product.id ? (
                        <input
                          type="text"
                          value={editingProduct.name}
                          onChange={(e) =>
                            setEditingProduct((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          className="bg-gray-600 border border-gray-500 rounded px-2 py-1 text-white text-sm w-full"
                        />
                      ) : (
                        <div className="text-sm font-medium text-white">
                          {product.name}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editingProduct?.id === product.id ? (
                        <input
                          type="number"
                          value={editingProduct.targets}
                          onChange={(e) =>
                            setEditingProduct((prev) => ({
                              ...prev,
                              targets: parseInt(e.target.value) || 0,
                            }))
                          }
                          className="bg-gray-600 border border-gray-500 rounded px-2 py-1 text-white text-sm w-20"
                        />
                      ) : (
                        <div className="text-sm text-gray-300">
                          {product.targets.toLocaleString()}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editingProduct?.id === product.id ? (
                        <input
                          type="number"
                          value={editingProduct.production}
                          onChange={(e) =>
                            setEditingProduct((prev) => ({
                              ...prev,
                              production: parseInt(e.target.value) || 0,
                            }))
                          }
                          className="bg-gray-600 border border-gray-500 rounded px-2 py-1 text-white text-sm w-20"
                        />
                      ) : (
                        <div className="text-sm text-gray-300">
                          {product.production.toLocaleString()}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-semibold text-green-400">
                        {editingProduct?.id === product.id ? (
                          <span>
                            {Math.min(
                              100,
                              Math.floor(
                                (editingProduct.production /
                                  editingProduct.targets) *
                                  10000
                              ) / 100
                            )}
                            %
                          </span>
                        ) : (
                          <span>{product.achieved}%</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {editingProduct?.id === product.id ? (
                        <input
                          type="number"
                          value={editingProduct.efficiency}
                          onChange={(e) =>
                            setEditingProduct((prev) => ({
                              ...prev,
                              efficiency: parseInt(e.target.value) || 0,
                            }))
                          }
                          className="bg-gray-600 border border-gray-500 rounded px-2 py-1 text-white text-sm w-16"
                        />
                      ) : (
                        <div className="text-sm text-gray-300">
                          {product.efficiency}%
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editingProduct?.id === product.id ? (
                        <input
                          type="number"
                          value={editingProduct.safety}
                          onChange={(e) =>
                            setEditingProduct((prev) => ({
                              ...prev,
                              safety: parseInt(e.target.value) || 0,
                            }))
                          }
                          className="bg-gray-600 border border-gray-500 rounded px-2 py-1 text-white text-sm w-16"
                        />
                      ) : (
                        <div className="text-sm text-gray-300">
                          {product.safety}%
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          product.status
                        )}`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {editingProduct?.id === product.id ? (
                          <>
                            <button
                              onClick={handleSave}
                              disabled={isSaving}
                              className="p-1.5 text-green-400 hover:text-green-300 transition-colors disabled:opacity-50"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingProduct(null)}
                              className="p-1.5 text-red-400 hover:text-red-300 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEdit(product, activeSection)}
                              className="p-1.5 text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleDelete(product.id, activeSection)
                              }
                              className="p-1.5 text-red-400 hover:text-red-300 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Data Summary */}
        <div className="bg-gray-800/80 rounded-xl p-4 border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-400" />
            Data Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {(() => {
              const allProducts = Object.values(sectionsData).flat();
              const totalTargets = allProducts.reduce(
                (sum, p) => sum + p.targets,
                0
              );
              const totalProduction = allProducts.reduce(
                (sum, p) => sum + p.production,
                0
              );
              const totalProducts = allProducts.length;
              const optimalProducts = allProducts.filter(
                (p) => p.status === "optimal"
              ).length;

              return (
                <>
                  <div>
                    <div className="text-xl font-black text-white">
                      {totalProducts}
                    </div>
                    <div className="text-gray-400 text-xs">Total Products</div>
                  </div>
                  <div>
                    <div className="text-xl font-black text-green-400">
                      {((totalProduction / totalTargets) * 100).toFixed(1)}%
                    </div>
                    <div className="text-gray-400 text-xs">
                      Overall Achievement
                    </div>
                  </div>
                  <div>
                    <div className="text-xl font-black text-blue-400">
                      {optimalProducts}
                    </div>
                    <div className="text-gray-400 text-xs">
                      Optimal Products
                    </div>
                  </div>
                  <div>
                    <div className="text-xl font-black text-yellow-400">
                      {Object.keys(sectionsData).length}
                    </div>
                    <div className="text-gray-400 text-xs">Active Sections</div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
