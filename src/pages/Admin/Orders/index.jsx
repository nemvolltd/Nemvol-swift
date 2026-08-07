import React, { useState, useEffect } from 'react';
import { Download, Eye, Search } from 'lucide-react';
import mockDb from '../mockDb';

// Components
import OrderDetailsModal from '../modal/OrderDetailsModal';
import StatusDropdown from './StatusDropdown';

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const fmt = (n) => new Intl.NumberFormat('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

    const loadOrders = () => {
        setOrders(mockDb.getOrders());
    };

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            loadOrders();
            setIsLoading(false);
        }, 200);

        return () => clearTimeout(timer);
    }, []);

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setIsDetailsOpen(true);
    };

    const handleStatusChange = (orderId, newStatus) => {
        mockDb.updateOrderStatus(orderId, newStatus);
        loadOrders();
        // Keep selected order state synchronized
        if (selectedOrder && selectedOrder.id === orderId) {
            setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
        }
    };

    // Filter orders
    const filteredOrders = orders.filter(order =>
        order.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Auto-select the first order on desktop if none selected
    const activeOrder = selectedOrder || (filteredOrders.length > 0 ? filteredOrders[0] : null);

    // CSV Exporter
    const handleCSVExport = () => {
        const headers = ['Order ID', 'Date', 'Customer Name', 'Total Amount (NGN)', 'Status', 'Items Count'];
        const rows = filteredOrders.map(o => {
            const customerName = typeof o.shippingAddress === 'object' 
                ? o.shippingAddress.name 
                : 'Guest Customer';
            const totalVal = typeof o.total === 'number' ? o.total.toFixed(2) : o.total;
            return [
                o.id,
                o.date,
                `"${customerName.replace(/"/g, '""')}"`,
                totalVal,
                o.status,
                o.items?.reduce((s, i) => s + i.quantity, 0) || 0
            ];
        });

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

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[55vh] gap-3">
                <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Loading orders registry...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 animate-fadeIn pb-12">
            
            {/* ── Search & Tools Bar ── */}
            <div className="flex items-center gap-2 select-none">
                <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search registry by Order ID..."
                        className="w-full h-11 pl-11 pr-4 bg-white/70 focus:bg-white text-slate-800 text-xs font-bold rounded-xl border border-slate-100/60 focus:border-slate-355 focus:outline-none transition-all placeholder:text-slate-400 placeholder:font-semibold"
                    />
                </div>
                <button
                    onClick={handleCSVExport}
                    className="h-11 px-4 rounded-xl bg-white border border-slate-100 flex items-center justify-center gap-2 text-slate-700 hover:bg-slate-50 transition-colors shadow-sm cursor-pointer shrink-0 text-xs font-bold uppercase tracking-wider"
                    title="Export CSV Report"
                >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Export CSV</span>
                </button>
            </div>

            {/* ── Split Layout Container (Left: Orders list, Right: Sticky details) ── */}
            {filteredOrders.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column: Orders List */}
                    <div className="lg:col-span-7 flex flex-col border-t border-slate-150/60 mt-1">
                        {filteredOrders.map((order) => {
                            const itemCount = order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
                            const isCurrentlyActive = activeOrder && activeOrder.id === order.id;

                            return (
                                <div
                                    key={order.id}
                                    onClick={() => setSelectedOrder(order)}
                                    className={`flex items-center justify-between py-4 border-b border-slate-100/65 px-3 transition-all group select-none cursor-pointer rounded-xl mt-1 ${
                                        isCurrentlyActive 
                                            ? 'bg-white border-slate-200/50 shadow-sm text-black' 
                                            : 'hover:bg-slate-50/10 text-slate-800'
                                    }`}
                                >
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-black text-slate-900">{order.id}</span>
                                            {isCurrentlyActive && (
                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                            <span>{order.date}</span>
                                            <span>·</span>
                                            <span>{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 shrink-0" onClick={(e) => e.stopPropagation()}>
                                        <span className="text-xs font-black text-slate-900 mr-1">
                                            ₦{fmt(typeof order.total === 'number' ? order.total : parseFloat(order.total) || 0)}
                                        </span>
                                        
                                        {/* Status dropdown */}
                                        <StatusDropdown
                                            status={order.status}
                                            onChange={(newStatus) => handleStatusChange(order.id, newStatus)}
                                        />

                                        {/* View Details Modal for Mobile */}
                                        <button
                                            onClick={() => handleViewDetails(order)}
                                            className="lg:hidden p-1.5 bg-transparent text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
                                            title="View Details"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Column: Sticky Interactive Details Pane (Desktop Only) */}
                    {activeOrder && (
                        <div className="hidden lg:flex lg:col-span-5 flex-col gap-6 sticky top-24 pl-8 border-l border-slate-150/60 animate-fadeIn">
                            <div>
                                <h2 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Active Order Details</h2>
                                <div className="flex items-center justify-between mt-1">
                                    <span className="text-lg font-black text-slate-900">{activeOrder.id}</span>
                                    <StatusDropdown
                                        status={activeOrder.status}
                                        onChange={(newStatus) => handleStatusChange(activeOrder.id, newStatus)}
                                    />
                                </div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Purchased on {activeOrder.date}</p>
                            </div>

                            <div className="h-px bg-slate-100" />

                            {/* Shipping & Payment details */}
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[9.5px] font-black uppercase text-slate-400 tracking-wider">Shipping Destination</span>
                                    <p className="text-xs text-slate-700 font-bold leading-relaxed">
                                        {typeof activeOrder.shippingAddress === 'object'
                                            ? `${activeOrder.shippingAddress.name}, ${activeOrder.shippingAddress.addressLine1}, ${activeOrder.shippingAddress.city}, ${activeOrder.shippingAddress.postalCode}`
                                            : activeOrder.shippingAddress}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[9.5px] font-black uppercase text-slate-400 tracking-wider">Payment Method</span>
                                    <p className="text-xs text-slate-600 font-bold uppercase tracking-wide">{activeOrder.paymentMethod || 'Credit Card'}</p>
                                </div>
                            </div>

                            <div className="h-px bg-slate-100" />

                            {/* Purchased Items */}
                            <div className="flex flex-col gap-3">
                                <span className="text-[9.5px] font-black uppercase text-slate-400 tracking-wider">Line Items</span>
                                <div className="flex flex-col gap-3 divide-y divide-slate-100">
                                    {activeOrder.items?.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between pt-3 first:pt-0">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={item.product?.image || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=200'}
                                                    alt={item.product?.name || 'Product'}
                                                    className="w-10 h-12 object-cover rounded-md border border-slate-100/50 bg-slate-50"
                                                />
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-slate-800 line-clamp-1">{item.product?.name || 'Item'}</span>
                                                    <span className="text-[9.5px] text-slate-400 font-bold uppercase">Size: {item.size || 'M'} · Qty: {item.quantity}</span>
                                                </div>
                                            </div>
                                            <span className="text-xs font-black text-slate-900">
                                                ₦{fmt((item.product?.price || item.price || 0) * item.quantity)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="h-px bg-slate-100" />

                            {/* Sum totals */}
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-[10px] font-bold text-slate-550 uppercase tracking-wider">Total Charge</span>
                                <span className="text-base font-black text-slate-950">
                                    ₦{fmt(typeof activeOrder.total === 'number' ? activeOrder.total : parseFloat(activeOrder.total) || 0)}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="bg-white border border-slate-100 rounded-3xl p-16 text-center shadow-[0_2px_8px_rgba(15,23,42,0.01)] select-none">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">No orders match your search criteria.</p>
                </div>
            )}

            {/* Order Details Modal (Mobile View Fallback) */}
            <OrderDetailsModal
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
