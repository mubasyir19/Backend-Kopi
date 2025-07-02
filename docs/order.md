# Order API Spec

## Get List Order

Endpoint : GET /api/order

Response Body :

```json
{
  "status": 200,
  "message": "Success get list order",
  "data": [
    {
      "id": "aa9d06ab-d720-46fd-b5c5-9aa61da76ce5",
      "invoice": "KBB-452886",
      "userId": "1f1b5f38-59ca-42ca-9a3b-51b96c7bb89f",
      "date": "2024-10-31T07:45:46.765Z",
      "OrderItem": [
        {
          "id": "954b3fbe-d0f1-4a7c-920e-d8859dae994c",
          "orderId": "aa9d06ab-d720-46fd-b5c5-9aa61da76ce5",
          "productId": "a29cc64b-8d53-4cb5-92e1-1df52d27b032",
          "quantity": 2,
          "price": 30000,
          "product": {
            "id": "a29cc64b-8d53-4cb5-92e1-1df52d27b032",
            "name": "Taro Milk",
            "price": 15000,
            "category": {
              "name": "Non-Coffee"
            }
          }
        }
      ],
      "user": {
        "id": "1f1b5f38-59ca-42ca-9a3b-51b96c7bb89f",
        "name": "Mahdy Mubasyir",
        "username": "mahdy"
      }
    }
  ]
}
```
