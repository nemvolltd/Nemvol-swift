import { authApi } from './auth';
import { productsApi } from './products';
import { cartApi } from './cart';
import { wishlistApi } from './wishlist';
import { addressesApi } from './addresses';
import { cardsApi } from './cards';
import { settingsApi } from './settings';
import { ordersApi } from './orders';

export const api = {
    ...authApi,
    ...productsApi,
    ...cartApi,
    ...wishlistApi,
    ...addressesApi,
    ...cardsApi,
    ...settingsApi,
    ...ordersApi
};
export default api;
