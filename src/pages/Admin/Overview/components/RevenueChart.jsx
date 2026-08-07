import React, { useState } from 'react';

export default function RevenueChart({ orders = [] }) {
    const [filter, setFilter] = useState('weekly');
    const [hoveredBar, setHoveredBar] = useState(null);

    // Precise dataset matching the image's layout and values
    const chartData = {
        today: [
            { label: '08:00', sales: 6000, orders: 12000, visitors: 8500 },
            { label: '12:00', sales: 9000, orders: 16000, visitors: 11000 },
            { label: '16:00', sales: 7500, orders: 13500, visitors: 9800 },
            { label: '20:00', sales: 8500, orders: 15000, visitors: 10500 },
        ],
        weekly: [
            { label: 'Jun 24', sales: 8300, orders: 14700, visitors: 10400 },
            { label: 'Jun 25', sales: 8400, orders: 14750, visitors: 10450 },
            { label: 'Jun 26', sales: 8350, orders: 14720, visitors: 10420 },
            { label: 'Jul 27', sales: 8450, orders: 14800, visitors: 10480 },
        ],
        monthly: [
            { label: 'Week 1', sales: 9500, orders: 15500, visitors: 11000 },
            { label: 'Week 2', sales: 11000, orders: 17500, visitors: 12500 },
            { label: 'Week 3', sales: 8800, orders: 14900, visitors: 10600 },
            { label: 'Week 4', sales: 12000, orders: 19000, visitors: 14000 },
        ]
    };

    const currentData = chartData[filter] || chartData.weekly;

    // SVG Layout Dimensions
    const width = 600;
    const height = 250;
    const paddingLeft = 52;
    const paddingRight = 15;
    const paddingTop = 25;
    const paddingBottom = 35;

    const chartWidth = width - paddingLeft - paddingRight;
    const chartHeight = height - paddingTop - paddingBottom;

    // Fixed scale as shown in the design image (max 20k)
    const maxValue = 20000;
    const yTicks = [20000, 15000, 10000, 0];

    const getBarHeight = (val) => {
        return (val / maxValue) * chartHeight;
    };

    const fmt = (n) => new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 }).format(n);

    return (
        <div className="bg-white border border-slate-100 rounded-3xl p-5 md:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex flex-col gap-6">
            {/* Header / Selector Row */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-black tracking-tight text-slate-900">
                    Orders
                </h3>

                {/* Filter Selector tabs matching the black pill design */}
                <div className="flex items-center gap-1 select-none">
                    {['monthly', 'weekly', 'today'].map((tab) => {
                        const isActive = filter === tab;
                        return (
                            <button
                                key={tab}
                                onClick={() => setFilter(tab)}
                                className={`px-3 py-1.5 text-xs font-bold capitalize transition-all duration-200 rounded-lg cursor-pointer ${
                                    isActive
                                        ? 'bg-black text-white'
                                        : 'text-slate-400 hover:text-slate-600'
                                }`}
                            >
                                {tab}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* SVG Grouped Bar Chart */}
            <div className="relative w-full h-[250px] overflow-visible">
                <svg
                    viewBox={`0 0 ${width} ${height}`}
                    className="w-full h-full overflow-visible select-none"
                    preserveAspectRatio="xMidYMid meet"
                >
                    {/* Vertical Guidelines separating or identifying columns */}
                    {currentData.map((group, groupIdx) => {
                        const groupWidth = chartWidth / currentData.length;
                        const groupX = paddingLeft + groupIdx * groupWidth + groupWidth / 2;
                        return (
                            <line
                                key={groupIdx}
                                x1={groupX}
                                y1={paddingTop}
                                x2={groupX}
                                y2={height - paddingBottom}
                                stroke="#f8fafc"
                                strokeWidth="1.5"
                            />
                        );
                    })}

                    {/* Y Axis Tick Labels */}
                    {yTicks.map((tick) => {
                        const y = height - paddingBottom - (tick / maxValue) * chartHeight;
                        return (
                            <text
                                key={tick}
                                x={paddingLeft - 14}
                                y={y + 4}
                                textAnchor="end"
                                className="text-[12px] font-bold fill-slate-500"
                            >
                                {tick === 0 ? '0' : `${tick / 1000}k`}
                            </text>
                        );
                    })}

                    {/* Bar Columns */}
                    {currentData.map((group, groupIdx) => {
                        const groupWidth = chartWidth / currentData.length;
                        const groupX = paddingLeft + groupIdx * groupWidth;

                        const barWidth = 20;
                        const spacing = 5;
                        const totalBarsWidth = barWidth * 3 + spacing * 2;
                        const startX = groupX + (groupWidth - totalBarsWidth) / 2;

                        const bars = [
                            { value: group.sales, height: getBarHeight(group.sales), fill: '#111111', label: 'Sales' },
                            { value: group.orders, height: getBarHeight(group.orders), fill: '#e2e8f0', label: 'Orders' },
                            { value: group.visitors, height: getBarHeight(group.visitors), fill: '#c7d2fe', label: 'Visitors' }
                        ];

                        return (
                            <g key={group.label}>
                                {bars.map((bar, barIdx) => {
                                    const x = startX + barIdx * (barWidth + spacing);
                                    const y = height - paddingBottom - bar.height;
                                    const isHovered = hoveredBar && hoveredBar.groupIdx === groupIdx && hoveredBar.barIdx === barIdx;

                                    return (
                                        <g key={barIdx}>
                                            <rect
                                                x={x}
                                                y={y}
                                                width={barWidth}
                                                height={Math.max(bar.height, 4)}
                                                rx="4"
                                                fill={bar.fill}
                                                className="transition-all duration-200 cursor-pointer"
                                                opacity={hoveredBar ? (isHovered ? 1 : 0.65) : 1}
                                                onMouseEnter={() => setHoveredBar({ groupIdx, barIdx, x, y, value: bar.value, label: bar.label })}
                                                onMouseLeave={() => setHoveredBar(null)}
                                            />
                                        </g>
                                    );
                                })}

                                {/* Group X Labels */}
                                <text
                                    x={groupX + groupWidth / 2}
                                    y={height - paddingBottom + 20}
                                    textAnchor="middle"
                                    className="text-[12px] font-bold fill-slate-500"
                                >
                                    {group.label}
                                </text>
                            </g>
                        );
                    })}

                    {/* Bottom horizontal axis line */}
                    <line
                        x1={paddingLeft}
                        y1={height - paddingBottom}
                        x2={width - paddingRight}
                        y2={height - paddingBottom}
                        stroke="#f1f5f9"
                        strokeWidth="1.5"
                    />
                </svg>

                {/* Hover Tooltip */}
                {hoveredBar && (
                    <div
                        style={{
                            left: `${(hoveredBar.x / width) * 100}%`,
                            top: `${(hoveredBar.y / height) * 100 - 8}%`,
                        }}
                        className="absolute -translate-x-1/2 -translate-y-full bg-slate-900 text-white rounded-xl px-3 py-2 shadow-xl border border-slate-800 pointer-events-none z-10 flex flex-col items-center gap-0.5 animate-fadeIn min-w-[100px]"
                    >
                        <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">
                            {hoveredBar.label}
                        </span>
                        <span className="text-xs font-bold">
                            {hoveredBar.label === 'Sales' ? `₦${fmt(hoveredBar.value)}` : hoveredBar.value.toLocaleString()}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
