# Auth API Spec

## Login

Endpoint : POST /api/auth/login

Request Body :

```json
{
  "username": "mahdy",
  "password": "#mahdyganteng"
}
```

Response Body :

```json
{
  "status": 201,
  "message": "login successfully",
  "data": {
    "id": "1f1b5f38-59ca-42ca-9a3b-51b96c7bb89f",
    "role": "SuperAdmin",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFmMWI1ZjM4LTU5Y2EtNDJjYS05YTNiLTUxYjk2YzdiYjg5ZiIsIm5hbWUiOiJNYWhkeSBNdWJhc3lpciIsInVzZXJuYW1lIjoibWFoZHkiLCJyb2xlIjoiU3VwZXJBZG1pbiIsImlhdCI6MTczMDM5MTgxN30.FAnL2NR-2mFS6GMw9xQeGQ-QGj1UEXhMVEFCFA2kF_o"
  }
}
```

## Register

Endpoint : POST /api/auth/register

Request Body :

```json
{
  "name": "Mahdy Mubasyir",
  "username": "mahdy",
  "password": "#mahdyganteng",
  "role": "Customer"
}
```

Response Body :

```json
{
  "status": 201,
  "message": "an account successfully register",
  "data": {
    "id": "cf1c3ea8-ebbe-4ee7-8389-57952ef4e838",
    "name": "Maher",
    "username": "maher",
    "password": "$2a$10$mR4ARXE9f.iY9Ul6G.NSFefEGL7gU3i0xREKHpoTmOi5EofTJ6.R2",
    "role": "Customer",
    "createdAt": "2024-10-31T16:23:12.011Z",
    "updatedAt": "2024-10-31T16:23:12.011Z"
  }
}
```
