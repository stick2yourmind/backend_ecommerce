.env Example:

```
# SERVER
PORT = < port >
HOST = < host, '0.0.0.0' has to be setted is severals online platforms to be able to run the server >
# NODE_ENV = 
NODE_ENV = < development | production >
# CORS
ALLOWED_ORIGINS = < URL frontend >
ALLOWED_ORIGINS_ALTER =  < URL frontend, alternative>
ALLOWED_ORIGIN_WS =  < URL frontend, websockets >
# DB URI
MONGO_URI = < mongodb URI >
# EMAIL SERVICE
EMAIL_CFG_ACCOUNT = < email account >
EMAIL_CFG_PASS = < email password or access token >
EMAIL_CFG_PORT = < email port, 465 usually >
EMAIL_CFG_SERVICE = < email domain, gmail | hotmail | yahoo | etc >
EMAIL_SYSTEM_HOST = < email account >
EMAIL_SYSTEM_DOMAIN = < email domain  >
# EMAIL REPORTING
EMAIL_REPORTS = < admin's email, this email will receive notification when users are registered or new orders are gerenerated >
# USER TYPES
TYPE_USER= < user role >
TYPE_SYSTEM = < system role >
# JWT
ACCESS_TOKEN_SECRET = < access token secret >
EXPIRES_ACCESS_TOKEN = < access token expiration, 30m, 60, 1h, 2d, etc >
EXPIRES_ACCESS_TOKEN_MILISECONDS = < access token expiration, 300000, 800000, etc >
REFRESH_TOKEN_SECRET = < refresh token secret >
EXPIRES_REFRESH_TOKEN = < refresh token expiration, 30m, 60, 1h, 2d, etc >
EXPIRES_REFRESH_TOKEN_MILISECONDS = < refresh token expiration, 300000, 800000, etc >
# USER COOKIE
EXPIRES_USER_COOKIE_MILISECONDS = < cookie's expiration time in milliseconds >
# Roles
USER_ROLE = < user role, 444, 645, 012, etc >
ADMIN_ROLE = < admin role, 777, 555, 666, 781, etc >
```