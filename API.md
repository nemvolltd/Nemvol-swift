# Nemvol Swift Storefront & Admin Dashboard API Catalog

This document lists all the API endpoints and payloads used in the Nemvol Swift frontend client.

---

## 1. Authentication & Profile (`/auth`, `/admin`)

### Authenticate Customer
*   **Method**: `POST`
*   **Endpoint**: `/auth/login`
*   **Payload**:
    ```json
    {
      "email": "customer@email.com",
      "password": "password"
    }
    ```
*   **Response**: Returns `access_token`, `refresh_token`, and `user` object.

### Register Customer
*   **Method**: `POST`
*   **Endpoint**: `/auth/sign-up`
*   **Content-Type**: `multipart/form-data`
*   **Fields**:
    *   `first_name` (string, required)
    *   `last_name` (string, required)
    *   `email` (string, required)
    *   `password` (string, required)
    *   `image` (file, optional)
*   **Response**: Returns session tokens and user profile object.

### Discard Session (Logout)
*   **Method**: `POST`
*   **Endpoint**: `/auth/logout`
*   **Payload**:
    ```json
    {
      "access_token": "...",
      "refresh_token": "..."
    }
    ```

### Get Customer Profile
*   **Method**: `GET`
*   **Endpoint**: `/auth/me`
*   **Headers**: `Authorization: Bearer <token>`

### Authenticate Admin
*   **Method**: `POST`
*   **Endpoint**: `/admin/login`
*   **Payload**:
    ```json
    {
      "email": "admin@email.com",
      "password": "password"
    }
    ```

### Get Registered Customers List
*   **Method**: `GET`
*   **Endpoint**: `/admin/users`
*   **Headers**: `Authorization: Bearer <token>` (Admin token)

---

## 2. Products (`/products`)

### Fetch All Products
*   **Method**: `GET`
*   **Endpoint**: `/products`

### Fetch Single Product Detail
*   **Method**: `GET`
*   **Endpoint**: `/products/:productId`

### Create New Product
*   **Method**: `POST`
*   **Endpoint**: `/products`
*   **Headers**: `Authorization: Bearer <token>` (Admin token)
*   **Content-Type**: `multipart/form-data`
*   **Fields**:
    *   `name` (string, required)
    *   `description` (string, optional)
    *   `base_price` (number, required)
    *   `is_active` (boolean string, e.g. `"true"`)
    *   `category_ids[0]` (string, optional category ID)
    *   `image` (file, optional main image)
    *   `images[index]` (files, optional additional images)

### Update Existing Product
*   **Method**: `POST`
*   **Endpoint**: `/products/:productId`
*   **Headers**: `Authorization: Bearer <token>` (Admin token)
*   **Content-Type**: `multipart/form-data`
*   **Fields**:
    *   `_method` (string, value must be `"PUT"` to emulate PUT request)
    *   `name` (string, required)
    *   `description` (string, optional)
    *   `base_price` (number, required)
    *   `is_active` (boolean string)
    *   `category_ids[0]` (string, optional category ID)
    *   `image` (file, optional main image)
    *   `images[index]` (files, optional additional images)

### Delete Product
*   **Method**: `DELETE`
*   **Endpoint**: `/products/:productId`
*   **Headers**: `Authorization: Bearer <token>` (Admin token)

---

## 3. Product Variants (`/variants`)

### Get All Variants of a Product
*   **Method**: `GET`
*   **Endpoint**: `/variants/:productId`

### Get Specific Variant
*   **Method**: `GET`
*   **Endpoint**: `/variants/:productId/:variantId`

### Create Variant
*   **Method**: `POST`
*   **Endpoint**: `/variants/:productId`
*   **Headers**: `Authorization: Bearer <token>` (Admin token)
*   **Payload**:
    ```json
    {
      "sku": "WBH-BLK-001",
      "attributes": {
        "color": "black",
        "size": "M"
      },
      "price": 45000.00
    }
    ```

### Update Variant
*   **Method**: `PUT`
*   **Endpoint**: `/variants/:productId/:variantId`
*   **Headers**: `Authorization: Bearer <token>` (Admin token)
*   **Payload**: Similar to Create Variant.

### Delete Variant
*   **Method**: `DELETE`
*   **Endpoint**: `/variants/:productId/:variantId`
*   **Headers**: `Authorization: Bearer <token>` (Admin token)

---

## 4. Categories (`/categories`)

### Fetch All Categories
*   **Method**: `GET`
*   **Endpoint**: `/categories`

### Fetch Specific Category
*   **Method**: `GET`
*   **Endpoint**: `/categories/:categoryId`

### Create Category
*   **Method**: `POST`
*   **Endpoint**: `/categories`
*   **Headers**: `Authorization: Bearer <token>` (Admin token)
*   **Content-Type**: `multipart/form-data`
*   **Fields**:
    *   `name` (string, required)
    *   `description` (string, required)
    *   `image` (file, optional)
    *   `parent_id` (string, optional parent category ID)

### Update Category
*   **Method**: `POST`
*   **Endpoint**: `/categories/:categoryId`
*   **Headers**: `Authorization: Bearer <token>` (Admin token)
*   **Content-Type**: `multipart/form-data`
*   **Fields**: Same as Create Category.

### Delete Category
*   **Method**: `DELETE`
*   **Endpoint**: `/categories/:categoryId`
*   **Headers**: `Authorization: Bearer <token>` (Admin token)

---

## 5. Cart Operations (`/cart`)

### Fetch Active Cart
*   **Method**: `GET`
*   **Endpoint**: `/cart`
*   **Headers**: `Authorization: Bearer <token>`

### Add Product/Variant to Cart
*   **Method**: `POST`
*   **Endpoint**: `/cart/items`
*   **Headers**: `Authorization: Bearer <token>`
*   **Payload**:
    ```json
    {
      "product": { "id": "..." },
      "size": "M",
      "quantity": 1
    }
    ```

### Remove Item from Cart
*   **Method**: `DELETE`
*   **Endpoint**: `/cart/items`
*   **Headers**: `Authorization: Bearer <token>`
*   **Payload**:
    ```json
    {
      "productId": "...",
      "size": "M"
    }
    ```

### Update Item Quantity
*   **Method**: `PATCH`
*   **Endpoint**: `/cart/items`
*   **Headers**: `Authorization: Bearer <token>`
*   **Payload**:
    ```json
    {
      "productId": "...",
      "size": "M",
      "delta": 1
    }
    ```

### Toggle Item Selection for Checkout
*   **Method**: `PATCH`
*   **Endpoint**: `/cart/items/select`
*   **Headers**: `Authorization: Bearer <token>`
*   **Payload**:
    ```json
    {
      "productId": "...",
      "size": "M"
    }
    ```

### Select or Deselect All Cart Items
*   **Method**: `PATCH`
*   **Endpoint**: `/cart/select-all`
*   **Headers**: `Authorization: Bearer <token>`
*   **Payload**:
    ```json
    {
      "selectAllVal": true
    }
    ```

### Clear Checked-out Items
*   **Method**: `DELETE`
*   **Endpoint**: `/cart/selected`
*   **Headers**: `Authorization: Bearer <token>`

---

## 6. Orders (`/orders`)

### Fetch Orders History
*   **Method**: `GET`
*   **Endpoint**: `/orders`
*   **Headers**: `Authorization: Bearer <token>`

### Place a Checkout Order
*   **Method**: `POST`
*   **Endpoint**: `/orders`
*   **Headers**: `Authorization: Bearer <token>`
*   **Payload**:
    ```json
    {
      "items": [ ... ],
      "shippingAddress": { "street": "...", "city": "...", "state": "...", "country": "..." },
      "paymentMethod": "pay_on_delivery",
      "deliveryMethod": "standard",
      "subtotal": 120.00,
      "deliveryFee": 50.00,
      "tax": 5.00,
      "total": 175.00
    }
    ```

### Update Order Dispatch/Delivery Status
*   **Method**: `PATCH`
*   **Endpoint**: `/admin/orders/:orderId/status`
*   **Headers**: `Authorization: Bearer <token>` (Admin token)
*   **Payload**:
    ```json
    {
      "status": "Shipped"
    }
    ```

---

## 7. Shipping Addresses (`/addresses`)

### Fetch Saved Addresses
*   **Method**: `GET`
*   **Endpoint**: `/addresses`
*   **Headers**: `Authorization: Bearer <token>`

### Save New Address
*   **Method**: `POST`
*   **Endpoint**: `/addresses`
*   **Headers**: `Authorization: Bearer <token>`
*   **Payload**:
    ```json
    {
      "name": "Home",
      "phone": "+2349000000000",
      "street": "123 Main Street",
      "city": "Ikeja",
      "state": "Lagos",
      "country": "Nigeria",
      "isDefault": true
    }
    ```

### Update Address
*   **Method**: `PUT`
*   **Endpoint**: `/addresses/:addressId`
*   **Headers**: `Authorization: Bearer <token>`
*   **Payload**: Same as Save Address.

### Delete Address
*   **Method**: `DELETE`
*   **Endpoint**: `/addresses/:addressId`
*   **Headers**: `Authorization: Bearer <token>`

---

## 8. Saved Payment Cards (`/payment-cards`)

### Fetch Saved Cards
*   **Method**: `GET`
*   **Endpoint**: `/payment-cards`
*   **Headers**: `Authorization: Bearer <token>`

### Save New Card
*   **Method**: `POST`
*   **Endpoint**: `/payment-cards`
*   **Headers**: `Authorization: Bearer <token>`
*   **Payload**:
    ```json
    {
      "number": "4321432143214321",
      "name": "Jane Doe",
      "expiry": "12/28",
      "cvc": "123",
      "isDefault": true
    }
    ```

### Delete Saved Card
*   **Method**: `DELETE`
*   **Endpoint**: `/payment-cards/:cardId`
*   **Headers**: `Authorization: Bearer <token>`

### Set Card as Default
*   **Method**: `PATCH`
*   **Endpoint**: `/payment-cards/:cardId/default`
*   **Headers**: `Authorization: Bearer <token>`

---

## 9. Wishlist (`/wishlist`)

### Fetch Wishlist
*   **Method**: `GET`
*   **Endpoint**: `/wishlist`
*   **Headers**: `Authorization: Bearer <token>`

### Toggle Wishlist Item
*   **Method**: `POST`
*   **Endpoint**: `/wishlist/toggle`
*   **Headers**: `Authorization: Bearer <token>`
*   **Payload**:
    ```json
    {
      "productId": "019f5846-39c4-73da-aab1-21fc868299fb"
    }
    ```

---

## 10. Settings & Preferences (`/settings`)

### Fetch Notification Preferences
*   **Method**: `GET`
*   **Endpoint**: `/settings/notifications`
*   **Headers**: `Authorization: Bearer <token>`

### Save Notification Preferences
*   **Method**: `PUT`
*   **Endpoint**: `/settings/notifications`
*   **Headers**: `Authorization: Bearer <token>`
*   **Payload**:
    ```json
    {
      "emailNotifications": true,
      "orderUpdates": true,
      "promotions": false
    }
    ```

### Update Contact Information
*   **Method**: `PUT`
*   **Endpoint**: `/settings/contact`
*   **Headers**: `Authorization: Bearer <token>`
*   **Payload**:
    ```json
    {
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "jane@email.com",
      "phone": "+2349000000000"
    }
    ```
