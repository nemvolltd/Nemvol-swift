// Mock Database for Admin Studio
// Persisted in localStorage to provide a fully functional, zero-API prototype experience.

const DEFAULT_CATEGORIES = [
    { id: 'cat-1', name: 'Men', description: 'Menswear collection including tailoring and casuals.' },
    { id: 'cat-2', name: 'Women', description: 'Womens apparel, dresses, knitwear and accessories.' },
    { id: 'cat-3', name: 'Unisex', description: 'Gender-neutral essentials and loungewear.' },
    { id: 'cat-4', name: 'Accessories', description: 'Premium leather goods, bags, belts and sunglasses.' }
];

const DEFAULT_PRODUCTS = [
    {
        id: 'prod-101',
        name: 'Minimalist Linen Blazer',
        description: 'A lightweight blazer crafted from organic Belgian linen. Features a relaxed silhouette, unstructured shoulders, and horn buttons. Perfect for warm-weather layering.',
        price: 185.00,
        originalPrice: 220.00,
        category: 'Men',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&auto=format&fit=crop'
        ],
        stock: 12,
        sizes: ['S', 'M', 'L', 'XL']
    },
    {
        id: 'prod-102',
        name: 'Silk Utility Shirt',
        description: 'Woven from premium mulberry silk, this utility-inspired shirt offers a subtle luster and fluid drape. Features dual chest pockets and a clean button placket.',
        price: 135.00,
        originalPrice: 135.00,
        category: 'Women',
        image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=800&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=800&auto=format&fit=crop'
        ],
        stock: 24,
        sizes: ['XS', 'S', 'M', 'L']
    },
    {
        id: 'prod-103',
        name: 'Raw Denim Jacket',
        description: 'Constructed from 14oz Japanese selvedge denim. This jacket is unwashed and will break in uniquely to your body over time. Finished with classic copper hardware.',
        price: 160.00,
        originalPrice: 195.00,
        category: 'Unisex',
        image: 'https://images.unsplash.com/photo-1576871337622-98d48d4aa53e?q=80&w=800&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1576871337622-98d48d4aa53e?q=80&w=800&auto=format&fit=crop'
        ],
        stock: 8,
        sizes: ['S', 'M', 'L']
    },
    {
        id: 'prod-104',
        name: 'Classic Chelsea Boots',
        description: 'Handcrafted in Italy from buttery soft calfskin suede. Built on a durable leather sole with elasticated side panels and pull tabs for easy entry.',
        price: 245.00,
        originalPrice: 245.00,
        category: 'Men',
        image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=800&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=800&auto=format&fit=crop'
        ],
        stock: 5,
        sizes: ['M', 'L', 'XL']
    },
    {
        id: 'prod-105',
        name: 'Cashmere Knit Sweater',
        description: 'Knit from pure Mongolian cashmere for unmatched softness and warmth. Classic crew neck profile with ribbed cuffs and hem.',
        price: 210.00,
        originalPrice: 280.00,
        category: 'Women',
        image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=800&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=800&auto=format&fit=crop'
        ],
        stock: 18,
        sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
        id: 'prod-106',
        name: 'Japanese Selvedge Jeans',
        description: 'Slim straight fit denim woven on vintage shuttle looms in Kojima. Rich indigo dye with classic five-pocket details.',
        price: 150.00,
        originalPrice: 150.00,
        category: 'Men',
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop'
        ],
        stock: 0, // Out of stock to test UI badges
        sizes: ['S', 'M', 'L']
    }
];

const DEFAULT_USERS = [
    { id: 'usr-1', name: 'Albert Yoga', email: 'albert.yoga@gmail.com', ordersCount: 4, totalSpent: 620.00, joinedAt: '2026-01-15' },
    { id: 'usr-2', name: 'Dicky Carlo', email: 'dicky.carlo@outlook.com', ordersCount: 2, totalSpent: 350.00, joinedAt: '2026-02-10' },
    { id: 'usr-3', name: 'Marlo Ahmad', email: 'marlo.ahmad@yahoo.com', ordersCount: 1, totalSpent: 135.00, joinedAt: '2026-03-24' },
    { id: 'usr-4', name: 'Roberto Khoir', email: 'roberto.k@nemvol.com', ordersCount: 3, totalSpent: 480.00, joinedAt: '2026-05-02' },
    { id: 'usr-5', name: 'Clarissa Jane', email: 'clarissa.j@gmail.com', ordersCount: 6, totalSpent: 1240.00, joinedAt: '2026-05-18' }
];

const DEFAULT_ORDERS = [
    {
        id: 'ORD-9024',
        status: 'Processing',
        delivery_method: 'standard',
        payment_method: 'pay_on_delivery',
        subtotal: 135.00,
        delivery_fee: 10.00,
        tax: 5.00,
        total: 150.00,
        created_at: '2026-08-06T14:32:00Z',
        shippingAddress: {
            name: 'Albert Yoga',
            phone: '+1 (555) 382-9012',
            street: '742 Evergreen Terrace',
            city: 'Springfield',
            state: 'IL',
            country: 'United States'
        },
        items: [
            {
                product: {
                    id: 'prod-102',
                    name: 'Silk Utility Shirt',
                    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=800&auto=format&fit=crop',
                    price: 135.00
                },
                quantity: 1,
                size: 'M'
            }
        ]
    },
    {
        id: 'ORD-9023',
        status: 'Shipped',
        delivery_method: 'express',
        payment_method: 'card',
        subtotal: 320.00,
        delivery_fee: 25.00,
        tax: 15.00,
        total: 360.00,
        created_at: '2026-08-05T10:15:00Z',
        shippingAddress: {
            name: 'Dicky Carlo',
            phone: '+1 (555) 902-1432',
            street: '456 Oak Avenue',
            city: 'Portland',
            state: 'OR',
            country: 'United States'
        },
        items: [
            {
                product: {
                    id: 'prod-103',
                    name: 'Raw Denim Jacket',
                    image: 'https://images.unsplash.com/photo-1576871337622-98d48d4aa53e?q=80&w=800&auto=format&fit=crop',
                    price: 160.00
                },
                quantity: 2,
                size: 'L'
            }
        ]
    },
    {
        id: 'ORD-9022',
        status: 'Delivered',
        delivery_method: 'standard',
        payment_method: 'split',
        subtotal: 185.00,
        delivery_fee: 10.00,
        tax: 9.25,
        total: 204.25,
        created_at: '2026-08-03T16:45:00Z',
        shippingAddress: {
            name: 'Roberto Khoir',
            phone: '+1 (555) 483-2094',
            street: '12 Pinewood Drive',
            city: 'Austin',
            state: 'TX',
            country: 'United States'
        },
        items: [
            {
                product: {
                    id: 'prod-101',
                    name: 'Minimalist Linen Blazer',
                    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
                    price: 185.00
                },
                quantity: 1,
                size: 'S'
            }
        ]
    },
    {
        id: 'ORD-9021',
        status: 'Cancelled',
        delivery_method: 'standard',
        payment_method: 'card',
        subtotal: 245.00,
        delivery_fee: 10.00,
        tax: 12.25,
        total: 267.25,
        created_at: '2026-08-02T09:00:00Z',
        shippingAddress: {
            name: 'Marlo Ahmad',
            phone: '+1 (555) 728-1093',
            street: '88 Hilltop Crescent',
            city: 'Seattle',
            state: 'WA',
            country: 'United States'
        },
        items: [
            {
                product: {
                    id: 'prod-104',
                    name: 'Classic Chelsea Boots',
                    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=800&auto=format&fit=crop',
                    price: 245.00
                },
                quantity: 1,
                size: 'M'
            }
        ]
    }
];

const DEFAULT_SETTINGS = {
    storeName: "Frank's Studio",
    supportEmail: "support@ecom.studio",
    currency: "NGN (₦)",
    lowStockThreshold: 5,
    taxRate: 7.5,
    shippingFee: 2000,
    adminName: "Salung",
    adminRole: "Super Administrator",
    bankName: "Guaranty Trust Bank",
    accountNumber: "0123456789",
    accountName: "Frank Ecom Studio",
    whatsappEnabled: true,
    whatsappNumber: "+2348012345678",
    maintenanceMode: false
};

// Helper to initialize local storage
const initializeDB = () => {
    if (!localStorage.getItem('admin_categories')) {
        localStorage.setItem('admin_categories', JSON.stringify(DEFAULT_CATEGORIES));
    }
    if (!localStorage.getItem('admin_products')) {
        localStorage.setItem('admin_products', JSON.stringify(DEFAULT_PRODUCTS));
    }
    if (!localStorage.getItem('admin_users')) {
        localStorage.setItem('admin_users', JSON.stringify(DEFAULT_USERS));
    }
    if (!localStorage.getItem('admin_orders')) {
        localStorage.setItem('admin_orders', JSON.stringify(DEFAULT_ORDERS));
    }
    if (!localStorage.getItem('admin_settings')) {
        localStorage.setItem('admin_settings', JSON.stringify(DEFAULT_SETTINGS));
    }
};

initializeDB();

export const mockDb = {
    // Categories
    getCategories: () => {
        return JSON.parse(localStorage.getItem('admin_categories')) || DEFAULT_CATEGORIES;
    },
    saveCategories: (categories) => {
        localStorage.setItem('admin_categories', JSON.stringify(categories));
    },
    addCategory: (category) => {
        const categories = mockDb.getCategories();
        const newCat = { id: `cat-${Date.now()}`, ...category };
        categories.push(newCat);
        mockDb.saveCategories(categories);
        return newCat;
    },
    updateCategory: (id, categoryData) => {
        const categories = mockDb.getCategories();
        const idx = categories.findIndex(c => c.id === id);
        if (idx !== -1) {
            categories[idx] = { ...categories[idx], ...categoryData };
            mockDb.saveCategories(categories);
            return categories[idx];
        }
        return null;
    },
    deleteCategory: (id) => {
        const categories = mockDb.getCategories();
        const filtered = categories.filter(c => c.id !== id);
        mockDb.saveCategories(filtered);
    },

    // Products
    getProducts: () => {
        return JSON.parse(localStorage.getItem('admin_products')) || DEFAULT_PRODUCTS;
    },
    saveProducts: (products) => {
        localStorage.setItem('admin_products', JSON.stringify(products));
    },
    addProduct: (product) => {
        const products = mockDb.getProducts();
        const newProd = { id: `prod-${Date.now()}`, ...product };
        products.push(newProd);
        mockDb.saveProducts(products);
        return newProd;
    },
    updateProduct: (id, productData) => {
        const products = mockDb.getProducts();
        const idx = products.findIndex(p => p.id === id);
        if (idx !== -1) {
            products[idx] = { ...products[idx], ...productData };
            mockDb.saveProducts(products);
            return products[idx];
        }
        return null;
    },
    deleteProduct: (id) => {
        const products = mockDb.getProducts();
        const filtered = products.filter(p => p.id !== id);
        mockDb.saveProducts(filtered);
    },

    // Users
    getUsers: () => {
        return JSON.parse(localStorage.getItem('admin_users')) || DEFAULT_USERS;
    },
    saveUsers: (users) => {
        localStorage.setItem('admin_users', JSON.stringify(users));
    },
    addUser: (user) => {
        const users = mockDb.getUsers();
        const newUser = { id: `usr-${Date.now()}`, ...user };
        users.push(newUser);
        mockDb.saveUsers(users);
        return newUser;
    },

    // Orders
    getOrders: () => {
        return JSON.parse(localStorage.getItem('admin_orders')) || DEFAULT_ORDERS;
    },
    saveOrders: (orders) => {
        localStorage.setItem('admin_orders', JSON.stringify(orders));
    },
    updateOrderStatus: (id, status) => {
        const orders = mockDb.getOrders();
        const idx = orders.findIndex(o => o.id === id);
        if (idx !== -1) {
            orders[idx].status = status;
            mockDb.saveOrders(orders);
            return orders[idx];
        }
        return null;
    },
    getSettings: () => {
        return JSON.parse(localStorage.getItem('admin_settings')) || DEFAULT_SETTINGS;
    },
    saveSettings: (settings) => {
        localStorage.setItem('admin_settings', JSON.stringify(settings));
    }
};

export default mockDb;
