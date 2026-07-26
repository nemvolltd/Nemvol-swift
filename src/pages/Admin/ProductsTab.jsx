import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Download } from 'lucide-react';
import ProductModal from './ProductModal';

export default function ProductsTab({ products, onCreateProduct, onUpdateProduct, onDeleteProduct, isLoading }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleAddClick = () => {
        setSelectedProduct(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            onDeleteProduct(productId);
        }
    };

    const handleModalSubmit = async (formData) => {
        try {
            if (selectedProduct) {
                await onUpdateProduct(selectedProduct.id, formData);
            } else {
                await onCreateProduct(formData);
            }
            setIsModalOpen(false);
        } catch (err) {
            console.error('Error submitting product form:', err);
        }
    };

    // CSV Exporter
    const handleCSVExport = () => {
        const headers = ['ID', 'Name', 'Category', 'Price', 'Original Price', 'Stock Level'];
        const rows = filteredProducts.map(p => [
            p.id,
            `"${p.name.replace(/"/g, '""')}"`,
            p.category,
            p.price.toFixed(2),
            p.originalPrice ? p.originalPrice.toFixed(2) : p.price.toFixed(2),
            p.stock !== undefined ? p.stock : 15
        ]);

        const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `products_export_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Filter products
    const filteredProducts = products.filter(product => {
        const query = searchQuery.toLowerCase();
        return (
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );
    });

    return (
        <div className="flex flex-col gap-6 animate-fadeIn">
            {/* Tab Header */}
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-1">Product Inventory</h2>
                    <p className="text-slate-500 text-xs md:text-sm">Manage products in the catalog.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleCSVExport}
                        className="h-11 px-4 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-xl border border-slate-200 transition-all flex items-center gap-2"
                        title="Download CSV report"
                    >
                        <Download className="w-4 h-4 text-slate-500" />
                        <span className="hidden sm:inline">Export CSV</span>
                    </button>
                    <button
                        onClick={handleAddClick}
                        className="h-11 px-4 sm:px-5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-600/10 flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">Add Product</span>
                    </button>
                </div>
            </div>

            {/* Filter controls */}
            <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or category..."
                    className="w-full h-11 pl-11 pr-4 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
                />
            </div>

            {/* Unified Admin Product Cards Grid */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {filteredProducts.map((product) => {
                        const hasDiscount = product.originalPrice && product.originalPrice > product.price;
                        return (
                            <div 
                                key={product.id} 
                                className="bg-white border border-slate-100 rounded-2xl p-3 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-slate-200/50 transition-all group"
                            >
                                <div className="flex flex-col">
                                    {/* Image Container */}
                                    <div className="relative aspect-[3/4] bg-slate-50 rounded-xl overflow-hidden mb-3 border border-slate-100/50">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                                        />
                                        <span className="absolute top-2 left-2 text-[9px] font-black text-slate-500 bg-white/90 backdrop-blur-sm px-2.5 py-0.5 rounded-lg shadow-sm uppercase tracking-wider">
                                            ID: {product.id}
                                        </span>
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex flex-col px-1">
                                        <div className="flex items-center justify-between gap-2 mb-0.5">
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                                {product.category}
                                            </span>
                                            {product.stock !== undefined && (
                                                product.stock === 0 ? (
                                                    <span className="text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-red-50 text-red-600 border border-red-100">Out of stock</span>
                                                ) : product.stock < 10 ? (
                                                    <span className="text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 border border-amber-100">Low: {product.stock}</span>
                                                ) : (
                                                    <span className="text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-100">Stock: {product.stock}</span>
                                                )
                                            )}
                                        </div>
                                        <h4 className="text-xs md:text-sm font-bold text-slate-800 line-clamp-1 mb-1" title={product.name}>
                                            {product.name}
                                        </h4>
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                            <span className="text-sm font-black text-blue-600">
                                                ${product.price.toFixed(2)}
                                            </span>
                                            {hasDiscount && (
                                                <span className="text-[10px] text-slate-400 line-through">
                                                    ${product.originalPrice.toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="grid grid-cols-2 gap-2 mt-4 px-1">
                                    <button
                                        onClick={() => handleEditClick(product)}
                                        className="h-9 rounded-xl bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1 border border-blue-100/30"
                                        title="Edit product"
                                    >
                                        <Edit2 className="w-3.5 h-3.5" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(product.id)}
                                        className="h-9 rounded-xl bg-red-50 hover:bg-red-600 hover:text-white text-red-600 text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1 border border-red-100/30"
                                        title="Delete product"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-100 text-slate-400 text-xs">
                    No products found in catalog.
                </div>
            )}

            {/* Add / Edit Product Modal */}
            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                product={selectedProduct}
                isLoading={isLoading}
            />
        </div>
    );
}
