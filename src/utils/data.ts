/* Currency symbols mapped to their respective currency codes */
export const currencies = {
    AED: 'AED',   // United Arab Emirates (commonly shown as AED or DH)
    AUD: 'A$',    // Australia
    BRL: 'R$',    // Brazil
    CAD: 'C$',    // Canada
    CHF: 'Fr',    // Switzerland
    CNY: '¥',     // China
    EUR: '€',     // European Union
    GBP: '£',     // United Kingdom
    HKD: 'HK$',   // Hong Kong
    INR: '₹',     // India
    JPY: '¥',     // Japan
    MXN: '$',     // Mexico
    PKR: '₨',     // Pakistan
    RUB: '₽',     // Russia
    SAR: 'SAR',   // Saudi Arabia (commonly shown as SAR or SR)
    SGD: 'S$',    // Singapore
    USD: '$',     // United States
    ZAR: 'R',     // South Africa
} as const

/*
 * Locale used to group/decimal-format each currency's numbers per its own
 * real-world convention (comma vs. period thousands separator, lakh/crore
 * grouping for INR/PKR, etc.) instead of hardcoding US formatting everywhere.
 */
export const currencyLocales = {
    AED: 'en-US',
    AUD: 'en-AU',
    BRL: 'pt-BR',
    CAD: 'en-CA',
    CHF: 'de-CH',
    CNY: 'zh-CN',
    EUR: 'de-DE',
    GBP: 'en-GB',
    HKD: 'en-HK',
    INR: 'en-IN',
    JPY: 'ja-JP',
    MXN: 'en-US',
    PKR: 'en-IN',
    RUB: 'ru-RU',
    SAR: 'en-US',
    SGD: 'en-SG',
    USD: 'en-US',
    ZAR: 'en-ZA',
} as const

/* Expense categories supported by the application */
export const categories = [
    'Housing',
    'Household Items',
    'Utilities',
    'Groceries',
    'Dining Out',
    'Transportation', 
    'Education',
    'Wellness & Fitness',
    'Beauty & Grooming',
    'Savings & Investments', 
    'Insurance & Protection',
    'Entertainment & Leisure', 
    'Travel & Vacation',
    'Clothing & Accessories',
    'Technology',
    'Gifts & Donations',
]

/* Color scheme for expense categories */
/* Color scheme for expense categories */
export const categoryColors = {
    housing: '#4A8FE7',              // Soft Blue - stability, shelter
    household_items: '#A0522D',      // Sienna Brown - home, earthiness
    utilities: '#7FCDBB',             // Mint Green - freshness, functionality
    groceries: '#2E8B57',            // Sea Green - natural, healthy
    dining_out: '#FFA07A',           // Light Salmon - warmth, social
    transportation: '#20B2AA',       // Light Sea Green - movement, travel
    education: '#9370DB',            // Medium Purple - learning, intellect
    wellness_fitness: '#FF6347',     // Tomato Red - energy, health
    beauty_grooming: '#FF69B4',      // Hot Pink - personal care, style
    savings_investments: '#32CD32',  // Lime Green - growth, prosperity
    insurance_protection: '#708090',  // Slate Gray - security, protection
    entertainment_leisure: '#FFD700', // Gold - fun, excitement
    travel_vacation: '#FF4500',      // Orange Red - adventure
    clothing_accessories: '#BA55D3', // Medium Orchid - fashion, personal style
    technology: '#48D1CC',           // Turquoise - innovation, modernity
    gifts_donations: '#008080',      // Teal - giving, compassion
} as const