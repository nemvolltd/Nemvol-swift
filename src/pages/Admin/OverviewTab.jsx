import React, { useState } from 'react';
import { DollarSign, ShoppingBag, Package, TrendingUp } from 'lucide-react';

export default function OverviewTab({ products, orders, onSwitchTab }) {
    const [hoveredIdx, setHoveredIdx] = useState(null);

    // Weekly sales trend data
    const chartData = [
        { day: 'Mon', sales: 120, x: 40, y: 143.5 },
        { day: 'Tue', sales: 240, x: 113.3, y: 104.5 },
        { day: 'Wed', sales: 180, x: 186.6, y: 124 },
        { day: 'Thu', sales: 320, x: 260.0, y: 78.5 },
        { day: 'Fri', sales: 280, x: 333.3, y: 91.5 },
        { day: 'Sat', sales: 420, x: 406.6, y: 46 },
        { day: 'Sun', sales: 380, x: 480.0, y: 59 }
    ];

    // Stat Calculations
    const totalSales = orders.reduce((sum, order) => {
        const value = parseFloat(order.total.replace(/[^0-9.]/g, '')) || 0;
        return sum + value;
    }, 0);

    const activeOrdersCount = orders.filter(o => o.status === 'Processing' || o.status === 'Shipped').length;
    const catalogCount = products.length;
    const averageOrderValue = orders.length > 0 ? totalSales / orders.length : 0;

    // Grab recent 4 orders
    const recentOrders = orders.slice(0, 4);

    return (
        <div className="flex flex-col gap-8 animate-fadeIn">
            {/* Page Title & Welcome */}
            <div>
                <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-1">Dashboard Overview</h2>
                <p className="text-slate-500 text-xs md:text-sm">Real-time performance summary and active indicators.</p>
            </div>

            {/* Stat Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {/* Card 1 */}
                <div className="bg-slate-50 border border-slate-100/80 rounded-2xl p-5 hover:shadow-md hover:shadow-slate-100/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Sales</span>
                        <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                            <DollarSign className="w-4 h-4" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">${totalSales.toFixed(2)}</h3>
                    <p className="text-[11px] text-green-600 font-bold mt-1">+12.5% vs last month</p>
                </div>

                {/* Card 2 */}
                <div className="bg-slate-50 border border-slate-100/80 rounded-2xl p-5 hover:shadow-md hover:shadow-slate-100/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Orders</span>
                        <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                            <ShoppingBag className="w-4 h-4" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">{activeOrdersCount}</h3>
                    <p className="text-[11px] text-slate-500 font-medium mt-1">Pending dispatch</p>
                </div>

                {/* Card 3 */}
                <div className="bg-slate-50 border border-slate-100/80 rounded-2xl p-5 hover:shadow-md hover:shadow-slate-100/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Catalog Size</span>
                        <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                            <Package className="w-4 h-4" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">{catalogCount}</h3>
                    <p className="text-[11px] text-slate-500 font-medium mt-1">Live active items</p>
                </div>

                {/* Card 4 */}
                <div className="bg-slate-50 border border-slate-100/80 rounded-2xl p-5 hover:shadow-md hover:shadow-slate-100/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg. Ticket</span>
                        <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                            <TrendingUp className="w-4 h-4" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">${averageOrderValue.toFixed(2)}</h3>
                    <p className="text-[11px] text-green-600 font-bold mt-1">+4.2% AOV increase</p>
                </div>
            </div>

            {/* Sales Volume Analytics Chart */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 md:p-6 shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">Weekly Revenue Analytics</h4>
                        <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Sales performance trends across the current week cycle.</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                            <span>Sales Volume ($)</span>
                        </div>
                    </div>
                </div>

                {/* SVG Line Chart */}
                <div className="relative w-full h-[200px] mt-2">
                    <svg viewBox="0 0 520 180" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.15" />
                                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                            </linearGradient>
                        </defs>

                        {/* Grid lines */}
                        <line x1="40" y1="20" x2="480" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="40" y1="52.5" x2="480" y2="52.5" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="40" y1="85" x2="480" y2="85" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="40" y1="117.5" x2="480" y2="117.5" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="40" y1="150" x2="480" y2="150" stroke="#e2e8f0" strokeWidth="1.5" />

                        {/* Chart Area Fill */}
                        <path
                            d="M 40,143.5 L 113.3,104.5 L 186.6,124 L 260.0,78.5 L 333.3,91.5 L 406.6,46 L 480,59 L 480,150 L 40,150 Z"
                            fill="url(#salesGrad)"
                        />

                        {/* Chart Line Path */}
                        <path
                            d="M 40,143.5 L 113.3,104.5 L 186.6,124 L 260.0,78.5 L 333.3,91.5 L 406.6,46 L 480,59"
                            fill="none"
                            stroke="#2563eb"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        {/* Interactive Nodes */}
                        {chartData.map((pt, idx) => (
                            <g key={idx}>
                                {/* Interaction target zone */}
                                <circle
                                    cx={pt.x}
                                    cy={pt.y}
                                    r="15"
                                    fill="transparent"
                                    className="cursor-pointer"
                                    onMouseEnter={() => setHoveredIdx(idx)}
                                    onMouseLeave={() => setHoveredIdx(null)}
                                />
                                {/* Node dot */}
                                <circle
                                    cx={pt.x}
                                    cy={pt.y}
                                    r={hoveredIdx === idx ? "6" : "4.5"}
                                    fill={hoveredIdx === idx ? "#2563eb" : "#ffffff"}
                                    stroke="#2563eb"
                                    strokeWidth="3"
                                    className="pointer-events-none transition-all duration-200"
                                />
                            </g>
                        ))}

                        {/* X-Axis labels */}
                        {chartData.map((pt, idx) => (
                            <text
                                key={idx}
                                x={pt.x}
                                y="170"
                                textAnchor="middle"
                                className="text-[10px] fill-slate-400 font-bold uppercase tracking-wider"
                            >
                                {pt.day}
                            </text>
                        ))}
                    </svg>

                    {/* Interactive Tooltip Card */}
                    {hoveredIdx !== null && (
                        <div 
                            style={{ 
                                left: `${(chartData[hoveredIdx].x / 520) * 100}%`,
                                top: `${(chartData[hoveredIdx].y / 180) * 100 - 30}%`
                            }}
                            className="absolute -translate-x-1/2 -translate-y-full bg-slate-900 text-white rounded-xl px-2.5 py-1.5 shadow-xl text-[10px] font-black tracking-wide pointer-events-none z-10 flex flex-col items-center gap-0.5 animate-fadeIn min-w-[70px]"
                        >
                            <span className="text-[8px] text-slate-400 font-bold uppercase">{chartData[hoveredIdx].day} Revenue</span>
                            <span>${chartData[hoveredIdx].sales.toFixed(2)}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Row Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Side: Recent Orders Table */}
                <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-5 md:p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Recent Transactions</h4>
                        <button
                            onClick={() => onSwitchTab('orders')}
                            className="text-xs font-extrabold text-blue-600 uppercase tracking-wider hover:opacity-75"
                        >
                            View All
                        </button>
                    </div>

                    {recentOrders.length > 0 ? (
                        <div className="flex flex-col gap-4">
                            {recentOrders.map((order) => {
                                const statusColors = {
                                    Processing: 'bg-amber-50 text-amber-700 border-amber-100',
                                    Shipped: 'bg-blue-50 text-blue-700 border-blue-100',
                                    Delivered: 'bg-emerald-50 text-emerald-700 border-emerald-100',
                                    Cancelled: 'bg-red-50 text-red-700 border-red-100',
                                };
                                return (
                                    <div
                                        key={order.id}
                                        className="flex items-center justify-between p-4 border border-slate-50 rounded-xl hover:bg-slate-50/50 transition-colors"
                                    >
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs font-black text-slate-900">{order.id}</span>
                                            <span className="text-[11px] text-slate-400 font-medium">{order.date}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColors[order.status] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                                                {order.status}
                                            </span>
                                            <span className="text-sm font-black text-slate-900">{order.total}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-slate-400 text-xs">
                            No orders placed yet.
                        </div>
                    )}
                </div>

                {/* Right Side: Quick Admin Actions */}
                <div className="bg-slate-50 border border-slate-100/85 rounded-2xl p-5 md:p-6 flex flex-col gap-4">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Quick Shortcuts</h4>
                    <button
                        onClick={() => onSwitchTab('products')}
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-600/10 flex items-center justify-center gap-2"
                    >
                        Manage Inventory
                    </button>
                    <button
                        onClick={() => onSwitchTab('orders')}
                        className="w-full h-12 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider border border-slate-200 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        Pending Shipments
                    </button>
                    <div className="mt-auto pt-4 border-t border-slate-200/50">
                        <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Live Support</h5>
                        <p className="text-xs text-slate-500 leading-relaxed">Need help configuring payment routes? Contact our system engineer.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
