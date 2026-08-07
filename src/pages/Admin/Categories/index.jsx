import React, { useState, useEffect } from 'react';
import mockDb from '../mockDb';

// Components
import CategoryHeader from './components/CategoryHeader';
import CategoryCard from './components/CategoryCard';
import CategoryModal from '../modal/CategoryModal';

export default function AdminCategories() {
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const loadCategories = () => {
        setCategories(mockDb.getCategories());
    };

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            loadCategories();
            setIsLoading(false);
        }, 200);

        return () => clearTimeout(timer);
    }, []);

    const handleAddClick = () => {
        setSelectedCategory(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (cat) => {
        setSelectedCategory(cat);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id) => {
        if (window.confirm('Are you sure you want to delete this category? Subcategories will become orphaned.')) {
            mockDb.deleteCategory(id);
            loadCategories();
        }
    };

    const handleModalSubmit = (formData) => {
        if (selectedCategory) {
            mockDb.updateCategory(selectedCategory.id, formData);
        } else {
            mockDb.addCategory(formData);
        }
        loadCategories();
        setIsModalOpen(false);
    };

    // Filter categories
    const filteredCategories = categories.filter(c => {
        const query = searchQuery.toLowerCase();
        return (
            c.name.toLowerCase().includes(query) ||
            (c.description || '').toLowerCase().includes(query)
        );
    });

    const getParentName = (parentId) => {
        if (!parentId) return null;
        const parent = categories.find(c => c.id === parentId);
        return parent ? parent.name : null;
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[55vh] gap-3">
                <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Loading collections...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 animate-fadeIn pb-12">
            {/* Header + Search bar controls */}
            <CategoryHeader
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onAddClick={handleAddClick}
            />

            {/* Vertical List Ledger Display */}
            {filteredCategories.length > 0 ? (
                <div className="flex flex-col border-t border-slate-150/60 mt-1">
                    {filteredCategories.map((cat) => (
                        <CategoryCard
                            key={cat.id}
                            category={cat}
                            parentName={getParentName(cat.parent_id)}
                            onEdit={handleEditClick}
                            onDelete={handleDeleteClick}
                        />
                    ))}
                </div>
            ) : (
                <div className="bg-white border border-slate-100 rounded-3xl p-16 text-center shadow-[0_2px_8px_rgba(15,23,42,0.01)] select-none">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">No categories match your filter criteria.</p>
                </div>
            )}

            {/* Modal */}
            <CategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                category={selectedCategory}
            />
        </div>
    );
}
