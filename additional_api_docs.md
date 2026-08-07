# Additional API Endpoints Documentation

This document contains the API definitions, parameters, and cURL examples for the endpoints not previously documented in detail (Orders, Addresses, Payment Cards, Wishlist, and Settings).

---

## 1. Orders

### Get Orders
**GET** `/orders`

#### Request
*   **Headers**:
    *   `Authorization: Bearer <token>` (Required)

#### Responses
*   **🟢 200 Success**
    *   **Content-Type**: `application/json`
    *   **Body**:
        ```json
        {
          "error": false,
          "message": "Orders retrieved successfully",
          "data": {
            "orders": [
              {
                "id": "019f5c2b-2394-73e2-8b43-9824de92a7fb",
                "status": "Processing",
                "delivery_method": "standard",
                "payment_method": "pay_on_delivery",
                "subtotal": 120.00,
                "delivery_fee": 50.00,
                "tax": 5.00,
                "total": 175.00,
                "created_at": "2026-07-26T16:00:00Z",
                "items": [
                  {
                    "product": {
                      "id": "019f5846-39c4-73da-aab1-21fc868299fb",
                      "name": "Wireless Bluetooth Headphones",
                      "image": "https://nemvol-swift-api.onrender.com/images/headphones.jpg",
                      "price": 120.00
                    },
                    "quantity": 1,
                    "size": "M"
                  }
                ]
              }
            ]
          }
        }
        ```

#### Request Example
```bash
curl --location 'https://nemvol-swift-api.onrender.com/api/orders' \
--header 'Authorization: Bearer <token>'
```

---

### Place Order
**POST** `/orders`

#### Request
*   **Headers**:
    *   `Authorization: Bearer <token>` (Required)
    *   `Content-Type: application/json`
*   **Body Params (JSON)**:
    *   `items` (array, required): Array of cart items.
    *   `shippingAddress` (object, required): Shipping address details.
    *   `paymentMethod` (string, required): e.g. `"pay_on_delivery"`, `"card"`, `"split"`.
    *   `deliveryMethod` (string, required): e.g. `"standard"`, `"express"`.
    *   `subtotal` (number, required)
    *   `deliveryFee` (number, required)
    *   `tax` (number, required)
    *   `total` (number, required)

#### Responses
*   **🟢 200 Success**
    *   **Content-Type**: `application/json`
    *   **Body**:
        ```json
        {
          "error": false,
          "message": "Order placed successfully",
          "data": {
            "order": {
              "id": "019f5c2b-2394-73e2-8b43-9824de92a7fb",
              "status": "Processing",
              "delivery_method": "standard",
              "payment_method": "pay_on_delivery",
              "total": 175.00,
              "created_at": "2026-07-26T16:30:00Z"
            }
          }
        }
        ```

#### Request Example
```bash
curl --location 'https://nemvol-swift-api.onrender.com/api/orders' \
--header 'Authorization: Bearer <token>' \
--header 'Content-Type: application/json' \
--data '{
    "items": [
        {
            "product": {
                "id": "019f5846-39c4-73da-aab1-21fc868299fb"
            },
            "quantity": 1,
            "size": "M"
        }
    ],
    "shippingAddress": {
        "name": "Home",
        "phone": "+2349000000000",
        "street": "123 Main Street",
        "city": "Ikeja",
        "state": "Lagos",
        "country": "Nigeria"
    },
    "paymentMethod": "pay_on_delivery",
    "deliveryMethod": "standard",
    "subtotal": 120.00,
    "deliveryFee": 50.00,
    "tax": 5.00,
    "total": 175.00
}'
```

---

### Update Order Status (Admin)
**PATCH** `/admin/orders/:orderId/status`

#### Request
*   **Headers**:
    *   `Authorization: Bearer <token>` (Required, Admin Token)
    *   `Content-Type: application/json`
*   **Body Params (JSON)**:
    *   `status` (string, required): Options: `"Processing"`, `"Shipped"`, `"Delivered"`, `"Cancelled"`.

#### Responses
*   **🟢 200 Success**
    *   **Content-Type**: `application/json`
    *   **Body**:
        ```json
        {
          "error": false,
          "message": "Order status updated successfully",
          "data": {
            "order_id": "019f5c2b-2394-73e2-8b43-9824de92a7fb",
            "status": "Shipped"
          }
        }
        ```

#### Request Example
```bash
curl --location --request PATCH 'https://nemvol-swift-api.onrender.com/api/admin/orders/019f5c2b-2394-73e2-8b43-9824de92a7fb/status' \
--header 'Authorization: Bearer <admin_token>' \
--header 'Content-Type: application/json' \
--data '{
    "status": "Shipped"
}'
```

---

## 2. Shipping Addresses

### Get Addresses
**GET** `/addresses`

#### Request
*   **Headers**:
    *   `Authorization: Bearer <token>` (Required)

#### Responses
*   **🟢 200 Success**
    *   **Body**:
        ```json
        {
          "error": false,
          "data": {
            "addresses": [
              {
                "id": "019f5c2b-23a1-738b-821f-8273645e712a",
                "name": "Home",
                "phone": "+2349000000000",
                "street": "123 Main Street",
                "city": "Ikeja",
                "state": "Lagos",
                "country": "Nigeria",
                "isDefault": true
              }
            ]
          }
        }
        ```

#### Request Example
```bash
curl --location 'https://nemvol-swift-api.onrender.com/api/addresses' \
--header 'Authorization: Bearer <token>'
```

---

### Add Address
**POST** `/addresses`

#### Request
*   **Headers**:
    *   `Authorization: Bearer <token>` (Required)
    *   `Content-Type: application/json`
*   **Body Params (JSON)**:
    *   `name` (string, required): Label, e.g. `"Home"`, `"Office"`.
    *   `phone` (string, required)
    *   `street` (string, required)
    *   `city` (string, required)
    *   `state` (string, required)
    *   `country` (string, required)
    *   `isDefault` (boolean, optional)

#### Request Example
```bash
curl --location 'https://nemvol-swift-api.onrender.com/api/addresses' \
--header 'Authorization: Bearer <token>' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Office",
    "phone": "+2348012345678",
    "street": "456 Corporate Avenue",
    "city": "Lekki",
    "state": "Lagos",
    "country": "Nigeria",
    "isDefault": false
}'
```

---

### Update Address
**PUT** `/addresses/:addressId`

#### Request Example
```bash
curl --location --request PUT 'https://nemvol-swift-api.onrender.com/api/addresses/019f5c2b-23a1-738b-821f-8273645e712a' \
--header 'Authorization: Bearer <token>' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Home Sweet Home",
    "phone": "+2349000000000",
    "street": "123 Main Street, Phase II",
    "city": "Ikeja",
    "state": "Lagos",
    "country": "Nigeria",
    "isDefault": true
}'
```

---

### Delete Address
**DELETE** `/addresses/:addressId`

#### Request Example
```bash
curl --location --request DELETE 'https://nemvol-swift-api.onrender.com/api/addresses/019f5c2b-23a1-738b-821f-8273645e712a' \
--header 'Authorization: Bearer <token>'
```

---

## 3. Saved Payment Cards

### Get Cards
**GET** `/payment-cards`

#### Request Example
```bash
curl --location 'https://nemvol-swift-api.onrender.com/api/payment-cards' \
--header 'Authorization: Bearer <token>'
```

---

### Add Card
**POST** `/payment-cards`

#### Request
*   **Headers**:
    *   `Authorization: Bearer <token>`
    *   `Content-Type: application/json`
*   **Body Params**:
    *   `number` (string, required): e.g. `"4321432143214321"`
    *   `name` (string, required): e.g. `"Jane Doe"`
    *   `expiry` (string, required): e.g. `"12/28"`
    *   `cvc` (string, required): e.g. `"123"`
    *   `isDefault` (boolean, optional)

#### Request Example
```bash
curl --location 'https://nemvol-swift-api.onrender.com/api/payment-cards' \
--header 'Authorization: Bearer <token>' \
--header 'Content-Type: application/json' \
--data '{
    "number": "4321432143214321",
    "name": "Jane Doe",
    "expiry": "12/28",
    "cvc": "123",
    "isDefault": true
}'
```

---

### Delete Card
**DELETE** `/payment-cards/:cardId`

#### Request Example
```bash
curl --location --request DELETE 'https://nemvol-swift-api.onrender.com/api/payment-cards/019f5c2b-23a1-738b-821f-8273645e712a' \
--header 'Authorization: Bearer <token>'
```

---

### Set Default Card
**PATCH** `/payment-cards/:cardId/default`

#### Request Example
```bash
curl --location --request PATCH 'https://nemvol-swift-api.onrender.com/api/payment-cards/019f5c2b-23a1-738b-821f-8273645e712a/default' \
--header 'Authorization: Bearer <token>'
```

---

## 4. Wishlist

### Get Wishlist
**GET** `/wishlist`

#### Request Example
```bash
curl --location 'https://nemvol-swift-api.onrender.com/api/wishlist' \
--header 'Authorization: Bearer <token>'
```

---

### Toggle Wishlist
**POST** `/wishlist/toggle`

#### Request Payload
*   `productId` (string, required)

#### Request Example
```bash
curl --location 'https://nemvol-swift-api.onrender.com/api/wishlist/toggle' \
--header 'Authorization: Bearer <token>' \
--header 'Content-Type: application/json' \
--data '{
    "productId": "019f5846-39c4-73da-aab1-21fc868299fb"
}'
```

---

## 5. Settings & Preferences

### Get Notification Settings
**GET** `/settings/notifications`

#### Request Example
```bash
curl --location 'https://nemvol-swift-api.onrender.com/api/settings/notifications' \
--header 'Authorization: Bearer <token>'
```

---

### Update Notification Settings
**PUT** `/settings/notifications`

#### Request Example
```bash
curl --location --request PUT 'https://nemvol-swift-api.onrender.com/api/settings/notifications' \
--header 'Authorization: Bearer <token>' \
--header 'Content-Type: application/json' \
--data '{
    "emailNotifications": true,
    "orderUpdates": true,
    "promotions": false
}'
```

---

### Update Contact Info
**PUT** `/settings/contact`

#### Request Params
*   `firstName` (string, required)
*   `lastName` (string, required)
*   `email` (string, required)
*   `phone` (string, required)

#### Request Example
```bash
curl --location --request PUT 'https://nemvol-swift-api.onrender.com/api/settings/contact' \
--header 'Authorization: Bearer <token>' \
--header 'Content-Type: application/json' \
--data '{
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@email.com",
    "phone": "+2349000000000"
}'
```
