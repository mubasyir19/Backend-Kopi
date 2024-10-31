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
  "message": "Success login",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwM2ZiOWMwLTE5ZTctNGMzMi05N2Q5LTQ1ZDY1YzIwNzlhOCIsImZ1bGxuYW1lIjoiTWFoZHkgTXViYXN5aXIiLCJ1c2VybmFtZSI6Im1haGR5Iiwicm9sZSI6IlN1cGVyQWRtaW4iLCJpYXQiOjE3Mjk5NjMxODV9.I1OV6y7-ZXopEBDUY8NH7Lz6ipLRKsKszKYCQeNZOyQ"
}
```
