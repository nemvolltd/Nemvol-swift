import React, { useState, useEffect } from 'react';
import mockDb from '../mockDb';

// Modular Subcomponents
import ProductsHeader from './components/ProductsHeader';
import ProductCard from './components/ProductCard';
import SkuModal from '../modal/SkuModal';
import DeleteConfirmModal from '../modal/DeleteConfirmModal';
import ProductModal from '../modal/ProductModal';

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // Filter selections matching the dropdown pills
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [selectedStatus, setSelectedStatus] = useState('All Status');

    // Modal state managers
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isVariantsModalOpen, setIsVariantsModalOpen] = useState(false);
    const [variantsProduct, setVariantsProduct] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const loadProducts = () => {
        setProducts(mockDb.getProducts());
        setCategories(mockDb.getCategories().map(c => c.name));
    };

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            loadProducts();
            setIsLoading(false);
        }, 200);

        return () => clearTimeout(timer);
    }, []);

    // Create / Update product callback
    const handleProductSubmit = (formData) => {
        if (selectedProduct) {
            mockDb.updateProduct(selectedProduct.id, formData);
        } else {
            mockDb.addProduct(formData);
        }
        loadProducts();
        setIsProductModalOpen(false);
    };

    // Delete product callback
    const handleDeleteClick = (product) => {
        setProductToDelete(product);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (productToDelete) {
            mockDb.deleteProduct(productToDelete.id);
            loadProducts();
        }
        setIsDeleteModalOpen(false);
        setProductToDelete(null);
    };

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setIsProductModalOpen(true);
    };

    const handleAddClick = () => {
        setSelectedProduct(null);
        setIsProductModalOpen(true);
    };

    const handleVariantsClick = (product) => {
        setVariantsProduct(product);
        setIsVariantsModalOpen(true);
    };

    // CSV Exporter utilizing local NGN formatting
    const handleCSVExport = () => {
        const headers = ['ID', 'Name', 'Category', 'Price (NGN)', 'Original Price (NGN)', 'Stock Level'];
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

    // Filter products list based on search, category dropdown, and status dropdown
    const filteredProducts = products.filter(product => {
        const matchesSearch = searchQuery === '' || 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (product.category || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.id.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;

        const matchesStatus = selectedStatus === 'All Status' || 
            (selectedStatus === 'Active' && product.stock > 0) || 
            (selectedStatus === 'Out of Stock' && product.stock === 0);

        return matchesSearch && matchesCategory && matchesStatus;
    });

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[55vh] gap-3">
                <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Loading catalog database...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 animate-fadeIn pb-12">
            {/* Header + Search bar row */}
            <ProductsHeader
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onAddClick={handleAddClick}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
                categories={categories}
            />

            {/* Vertical List Display matching ledger list exactly */}
            {filteredProducts.length > 0 ? (
                <div className="flex flex-col border-t border-slate-150/60 mt-1">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onEdit={handleEditClick}
                            onDelete={handleDeleteClick}
                            onVariants={handleVariantsClick}
                        />
                    ))}
                </div>
            ) : (
                <div className="bg-white border border-slate-100 rounded-3xl p-16 text-center shadow-[0_2px_8px_rgba(15,23,42,0.01)] select-none">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">No items match your catalog filter criteria.</p>
                </div>
            )}

            {/* Modals & Forms */}
            <ProductModal
                isOpen={isProductModalOpen}
                onClose={() => setIsProductModalOpen(false)}
                onSubmit={handleProductSubmit}
                product={selectedProduct}
            />

            <SkuModal
                isOpen={isVariantsModalOpen}
                onClose={() => setIsVariantsModalOpen(false)}
                product={variantsProduct}
            />

            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                itemName={productToDelete?.name || ''}
                title="Delete Product"
            />
        </div>
    );
}
