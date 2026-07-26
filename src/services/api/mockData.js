// Centralized Mock Database for E-commerce Application

export const db = {
    products: [
        {
            id: 1,
            name: 'Plain Black Shirt',
            category: 'Men',
            price: 67.00,
            originalPrice: 107.00,
            image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800',
            images: [
                'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&q=80&w=800',
            ],
            description: 'Introducing our sleek black shirt, perfect for any occasion! Made from soft, breathable fabric, this shirt offers both comfort and style. Its classic design features a tailored fit, making it versatile enough to dress up for a night out or keep casual for a weekend brunch.',
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            stock: 45
        },
        {
            id: 2,
            name: 'Stitch Trouser',
            category: 'Women',
            price: 65.00,
            originalPrice: 95.00,
            image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800',
            images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800'],
            description: 'Tailored high-waisted trouser with crisp pleats and side pockets, offering both comfort and elegance.',
            sizes: ['S', 'M', 'L', 'XL'],
            stock: 8
        },
        {
            id: 3,
            name: 'Linen Blazer',
            category: 'Men',
            price: 120.00,
            originalPrice: 150.00,
            image: 'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&q=80&w=800',
            images: ['https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&q=80&w=800'],
            description: 'Unstructured blazer in organic lightweight linen, ideal for warm weather layering.',
            sizes: ['M', 'L', 'XL', 'XXL'],
            stock: 14
        },
        {
            id: 4,
            name: 'Pink Long Dress',
            category: 'Women',
            price: 17.00,
            originalPrice: 57.00,
            image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800',
            images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800'],
            description: 'Elegant floor-sweeping pink long dress, perfect for weddings, dinners, and events.',
            sizes: ['S', 'M', 'L'],
            stock: 0
        },
        {
            id: 5,
            name: 'Classic White Tee',
            category: 'Unisex',
            price: 30.00,
            originalPrice: 40.00,
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
            images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800'],
            description: 'Essential crewneck tee in soft organic cotton. Durable structure and clean finish.',
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            stock: 120
        },
        {
            id: 6,
            name: 'Denim Jacket',
            category: 'Women',
            price: 95.00,
            originalPrice: 140.00,
            image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800',
            images: ['https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800'],
            description: 'Washed denim jacket with chest flap pockets and adjustable button tabs for a vintage look.',
            sizes: ['S', 'M', 'L'],
            stock: 5
        },
        {
            id: 7,
            name: 'Tailored Suit Pants',
            category: 'Men',
            price: 110.00,
            originalPrice: 160.00,
            image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800',
            images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800'],
            description: 'Polished trousers tailored in a premium wool blend with a classic straight leg.',
            sizes: ['30', '32', '34', '36'],
            stock: 32
        },
        {
            id: 8,
            name: 'Silk Blouse',
            category: 'Women',
            price: 75.00,
            originalPrice: 110.00,
            image: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&q=80&w=800',
            images: ['https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&q=80&w=800'],
            description: 'Fluid silk georgette blouse with standard collar and delicate button placket detail.',
            sizes: ['S', 'M', 'L'],
            stock: 12
        },
        {
            id: 9,
            name: 'Blue Maxi Dress',
            category: 'Women',
            price: 30.00,
            originalPrice: 100.00,
            image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800',
            images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800'],
            description: 'Elegant floor-length blue maxi dress, suitable for resort style or casual evening outings.',
            sizes: ['S', 'M', 'L', 'XL'],
            stock: 0
        },
        {
            id: 10,
            name: 'White Summer Dress',
            category: 'Women',
            price: 45.00,
            originalPrice: 75.00,
            image: 'https://images.unsplash.com/photo-1515347619362-6734f7117541?auto=format&fit=crop&q=80&w=800',
            images: ['https://images.unsplash.com/photo-1515347619362-6734f7117541?auto=format&fit=crop&q=80&w=800'],
            description: 'Romantic sleeveless cotton dress with delicate lace-trims and a beautiful lightweight hem.',
            sizes: ['S', 'M', 'L'],
            stock: 19
        }
    ],

    cart: [], // Handled dynamically in next init

    wishlist: [2, 1, 5, 10],

    addresses: [
        {
            id: 1,
            name: 'Home',
            street: '57th Spring Avenue',
            city: 'Ikeja',
            state: 'Lagos',
            country: 'Nigeria',
            phone: '+234 903 382 7682',
            isDefault: true,
        },
        {
            id: 2,
            name: 'Office',
            street: '12 Business District',
            city: 'Victoria Island',
            state: 'Lagos',
            country: 'Nigeria',
            phone: '+234 801 234 5678',
            isDefault: false,
        }
    ],

    user: {
        isLoggedIn: false,
        contactInfo: {
            name: 'Lana Johnson',
            email: 'lanajohnson@gmail.com',
            phone: '+234 903 382 7682',
            countryCode: 'NGN'
        }
    },

    cards: [
        {
            id: 'card-1',
            number: '3334 9803 7682',
            holder: 'Lana Johnson',
            expiry: '06/27',
            cvv: '200',
            brand: 'Mastercard',
            isDefault: true
        },
        {
            id: 'card-2',
            number: '4242 5555 7654 4321',
            holder: 'Lana Johnson',
            expiry: '11/28',
            cvv: '902',
            brand: 'Visa',
            isDefault: false
        }
    ],

    notificationSettings: {
        orderUpdates: true,
        promotions: false,
        newsletters: true,
        smsAlerts: false
    },

    orders: [],
    users: []
};

// Initialize Cart references after database object is built
db.cart = [
    {
        product: db.products.find(p => p.id === 4),
        size: 'M',
        quantity: 1,
        selected: false,
    },
    {
        product: db.products.find(p => p.id === 1),
        size: 'XL',
        quantity: 3,
        selected: true,
    },
    {
        product: db.products.find(p => p.id === 9),
        size: 'L',
        quantity: 5,
        selected: false,
    }
];

// Initialize Orders references after database object is built
db.orders = [
    {
        id: 'ORD-8932-7682',
        userId: 'usr-1',
        date: 'Oct 24, 2023',
        status: 'Processing',
        total: '$256.00',
        items: [
            {
                product: db.products.find(p => p.id === 4),
                quantity: 1,
                size: 'M'
            },
            {
                product: db.products.find(p => p.id === 1),
                quantity: 2,
                size: 'XL'
            }
        ],
        shippingAddress: '57th Spring Avenue, Ikeja, Lagos.',
        paymentMethod: 'Debit Card (**** 7682)'
    },
    {
        id: 'ORD-4491-2290',
        userId: 'usr-1',
        date: 'Sep 12, 2023',
        status: 'Delivered',
        total: '$120.00',
        items: [
            {
                product: db.products.find(p => p.id === 10),
                quantity: 1,
                size: 'S'
            }
        ],
        shippingAddress: '57th Spring Avenue, Ikeja, Lagos.',
        paymentMethod: 'Pay on Delivery'
    },
    {
        id: 'ORD-3329-8712',
        userId: 'usr-2',
        date: 'Oct 02, 2023',
        status: 'Shipped',
        total: '$65.00',
        items: [
            {
                product: db.products.find(p => p.id === 2),
                quantity: 1,
                size: 'M'
            }
        ],
        shippingAddress: '12 Business District, Victoria Island, Lagos.',
        paymentMethod: 'Debit Card (**** 7654)'
    },
    {
        id: 'ORD-1209-7731',
        userId: 'usr-3',
        date: 'Sep 28, 2023',
        status: 'Delivered',
        total: '$120.00',
        items: [
            {
                product: db.products.find(p => p.id === 3),
                quantity: 1,
                size: 'L'
            }
        ],
        shippingAddress: '15, Calle Mayor, Madrid, Spain',
        paymentMethod: 'Debit Card (**** 1234)'
    }
];

// Initialize mock Users
db.users = [
    {
        id: 'usr-1',
        name: 'Lana Johnson',
        email: 'lanajohnson@gmail.com',
        phone: '+234 903 382 7682',
        joinedDate: 'Jun 12, 2023',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    },
    {
        id: 'usr-2',
        name: 'Marcus Chen',
        email: 'marcus.chen@outlook.com',
        phone: '+1 415 555 2671',
        joinedDate: 'Aug 22, 2023',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    },
    {
        id: 'usr-3',
        name: 'Sophia Martinez',
        email: 'sophia.mtz@gmail.com',
        phone: '+34 612 345 678',
        joinedDate: 'Sep 05, 2023',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    },
    {
        id: 'usr-4',
        name: 'David Kim',
        email: 'david.kim@k-tech.io',
        phone: '+82 10 1234 5678',
        joinedDate: 'Oct 01, 2023',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    }
];
