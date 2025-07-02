# Category API Spec

## Get List Categories

Endpoint : GET /api/category

Response Body :

```json
{
  "status": 200,
  "message": "Success get all categories",
  "data": [
    {
      "id": "36963f32-36ab-4197-93ce-3fd0d619d13c",
      "name": "Non-Coffee",
      "Product": [
        {
          "name": "Taro Milk",
          "description": "",
          "price": 15000
        },
        {
          "name": "Chocolate Milk",
          "description": "",
          "price": 15000
        }
      ]
    },
    {
      "id": "fd1b4bea-c7c2-4fd1-be37-e003f05ae1ba",
      "name": "Coffee",
      "Product": [
        {
          "name": "Kopi Susu Gula Aren",
          "description": "",
          "price": 16000
        }
      ]
    }
  ]
}
```

## Get Category

Endpoint : GET /api/category/:id

Response Body :

```json
{
  "status": 200,
  "message": "Success get category",
  "data": {
    "id": "fd1b4bea-c7c2-4fd1-be37-e003f05ae1ba",
    "name": "Coffee",
    "Product": [
      {
        "name": "Kopi Susu Gula Aren",
        "description": "",
        "price": 16000
      }
    ]
  }
}
```

## Add Category

Endpoint : POST /api/category/add

Request Body :

```json
{
  "name": "Non-Coffee"
}
```

Response Body :

```json
{
  "status": 201,
  "message": "Success add category",
  "data": {
    "id": "22a0b0b7-07f4-4df6-89be-ba96c6b5b64f",
    "name": "Non-Coffee",
    "createdAt": "2024-10-31T16:46:53.361Z",
    "updatedAt": "2024-10-31T16:46:53.361Z"
  }
}
```
