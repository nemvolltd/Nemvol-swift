import React, { useState, useRef, useEffect } from 'react';
import { Search, Eye, ChevronDown, Check, Download } from 'lucide-react';
import AdminOrderDetailsModal from './AdminOrderDetailsModal';

function StatusDropdown({ status, onChange, onOpen, onClose }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const statuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                if (onClose) onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isOpen]);

    const getStatusTheme = (s) => {
        switch (s) {
            case 'Processing':
                return {
                    button: 'bg-amber-50/70 border-amber-100/80 text-amber-700 hover:bg-amber-100/50 hover:border-amber-200',
                    dot: 'bg-amber-500'
                };
            case 'Shipped':
                return {
                    button: 'bg-blue-50/70 border-blue-100/80 text-blue-700 hover:bg-blue-100/50 hover:border-blue-200',
                    dot: 'bg-blue-500'
                };
            case 'Delivered':
                return {
                    button: 'bg-emerald-50/70 border-emerald-100/80 text-emerald-700 hover:bg-emerald-100/50 hover:border-emerald-200',
                    dot: 'bg-emerald-500'
                };
            case 'Cancelled':
                return {
                    button: 'bg-red-50/70 border-red-100/80 text-red-700 hover:bg-red-100/50 hover:border-red-200',
                    dot: 'bg-red-500'
                };
            default:
                return {
                    button: 'bg-slate-50/70 border-slate-200/80 text-slate-700 hover:bg-slate-100',
                    dot: 'bg-slate-400'
                };
        }
    };

    const currentTheme = getStatusTheme(status);

    return (
        <div ref={dropdownRef} className="relative inline-block text-left">
            <button
                type="button"
                onClick={() => {
                    const nextOpen = !isOpen;
                    setIsOpen(nextOpen);
                    if (nextOpen && onOpen) onOpen();
                    if (!nextOpen && onClose) onClose();
                }}
                className={`text-[10px] md:text-xs font-bold border px-3 py-1.5 rounded-full cursor-pointer transition-all flex items-center justify-between gap-2 shadow-sm ${currentTheme.button}`}
            >
                <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${currentTheme.dot}`}></span>
                    {status}
                </div>
                <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-2xl bg-white border border-slate-100 shadow-xl py-1.5 z-50 focus:outline-none animate-fadeIn">
                    {statuses.map((s) => {
                        const theme = getStatusTheme(s);
                        const isSelected = s === status;
                        return (
                            <button
                                type="button"
                                key={s}
                                onClick={() => {
                                    onChange(s);
                                    setIsOpen(false);
                                    if (onClose) onClose();
                                }}
                                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-bold transition-colors hover:bg-slate-50 ${
                                    isSelected ? 'text-blue-600 bg-blue-50/20' : 'text-slate-600'
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`}></span>
                                    {s}
                                </div>
                                {isSelected && <Check className="w-3.5 h-3.5 text-blue-600" />}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default function OrdersTab({ orders, onUpdateOrderStatus, isLoading }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [activeDropdownOrderId, setActiveDropdownOrderId] = useState(null);

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setIsDetailsOpen(true);
    };

    const handleStatusChange = (orderId, newStatus) => {
        onUpdateOrderStatus(orderId, newStatus);
    };

    // Filter orders
    const filteredOrders = orders.filter(order =>
        order.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // CSV Exporter
    const handleCSVExport = () => {
        const headers = ['Order ID', 'Date', 'Customer Name', 'Total Amount', 'Status', 'Items Count'];
        const rows = filteredOrders.map(o => [
            o.id,
            o.date,
            `"${(o.shippingAddress?.name || 'Guest User').replace(/"/g, '""')}"`,
            o.total,
            o.status,
            o.items?.length || 0
        ]);

        const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `orders_export_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex flex-col gap-6 animate-fadeIn">
            {/* Tab Header */}
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-1">Orders Registry</h2>
                    <p className="text-slate-500 text-xs md:text-sm">View purchase logs and manage dispatch statuses.</p>
                </div>
                <button
                    onClick={handleCSVExport}
                    className="h-11 px-4 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-xl border border-slate-200 transition-all flex items-center gap-2"
                    title="Download CSV report"
                >
                    <Download className="w-4 h-4 text-slate-500" />
                    <span className="hidden sm:inline">Export CSV</span>
                </button>
            </div>

            {/* Filter controls */}
            <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by Order ID..."
                    className="w-full h-11 pl-11 pr-4 border border-slate-200/80 bg-slate-50/50 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50/50 transition-all duration-300"
                />
            </div>

            {/* Orders list (Desktop) / Cards (Mobile) */}
            {filteredOrders.length > 0 ? (
                <>
                    {/* Desktop View */}
                    <div className="hidden md:block bg-white border border-slate-100 rounded-2xl shadow-sm relative">
                        <div className="overflow-visible">
                            <table className="w-full border-collapse text-left">
                                <thead>
                                    <tr className="border-b border-slate-100 bg-slate-50/50">
                                        <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID</th>
                                        <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                                        <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Items</th>
                                        <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Total</th>
                                        <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Status</th>
                                        <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Details</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {filteredOrders.map((order) => {
                                        const itemCount = order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
                                        const isDropdownOpen = activeDropdownOrderId === order.id;
                                        return (
                                            <tr key={order.id} className={`hover:bg-slate-50/30 transition-colors relative ${isDropdownOpen ? 'z-30' : 'z-10'}`}>
                                                <td className="p-4">
                                                    <span className="text-xs font-black text-slate-900">{order.id}</span>
                                                </td>
                                                <td className="p-4 text-slate-500 text-xs font-medium">
                                                    {order.date}
                                                </td>
                                                <td className="p-4 text-slate-700 text-xs font-bold">
                                                    {itemCount} {itemCount === 1 ? 'item' : 'items'}
                                                </td>
                                                <td className="p-4 text-sm font-black text-blue-600">
                                                    {order.total}
                                                </td>
                                                <td className={`p-4 relative overflow-visible text-right ${isDropdownOpen ? 'z-30' : 'z-10'}`}>
                                                    <StatusDropdown
                                                        status={order.status}
                                                        onChange={(newStatus) => handleStatusChange(order.id, newStatus)}
                                                        onOpen={() => setActiveDropdownOrderId(order.id)}
                                                        onClose={() => setActiveDropdownOrderId(null)}
                                                    />
                                                </td>
                                                <td className="p-4 text-right">
                                                    <button
                                                        onClick={() => handleViewDetails(order)}
                                                        className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors ml-auto"
                                                        title="View Full details"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Mobile View */}
                    <div className="flex flex-col gap-4 md:hidden">
                        {filteredOrders.map((order) => {
                            const itemCount = order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
                            const isDropdownOpen = activeDropdownOrderId === order.id;
                            return (
                                <div key={order.id} className={`bg-white border border-slate-100 rounded-2xl p-4 flex flex-col gap-3 shadow-sm relative ${isDropdownOpen ? 'z-30' : 'z-10'}`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-slate-900">{order.id}</span>
                                            <span className="text-[10px] text-slate-400 font-medium">{order.date}</span>
                                        </div>
                                        <button
                                            onClick={() => handleViewDetails(order)}
                                            className="h-8 px-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-1.5 text-slate-600 hover:bg-slate-100 text-[10px] font-bold uppercase tracking-wider transition-colors"
                                        >
                                            <Eye className="w-3.5 h-3.5" />
                                            Details
                                        </button>
                                    </div>
                                    <div className="h-px bg-slate-50"></div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Purchase</span>
                                            <span className="text-xs font-bold text-slate-800">
                                                {itemCount} {itemCount === 1 ? 'item' : 'items'} &bull;{' '}
                                                <span className="text-blue-600 font-extrabold">{order.total}</span>
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Status</span>
                                            <StatusDropdown
                                                status={order.status}
                                                onChange={(newStatus) => handleStatusChange(order.id, newStatus)}
                                                onOpen={() => setActiveDropdownOrderId(order.id)}
                                                onClose={() => setActiveDropdownOrderId(null)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            ) : (
                <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-100 text-slate-400 text-xs">
                    No orders matching search.
                </div>
            )}

            {/* Order Details Modal */}
            <AdminOrderDetailsModal
                isOpen={isDetailsOpen}
                onClose={() => {
                    setIsDetailsOpen(false);
                    setSelectedOrder(null);
                }}
                order={selectedOrder}
            />
        </div>
    );
}
