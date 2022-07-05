# MERN-ZapShop
e-Commerce shop using MongoDB, Express, React and Nodejs. 

### Env Variables

In backend/utils/sendEmail.js setup configuration for Mailtrap.

Create a .env file in root and add the following:

```
PORT = 5000
MONGO_URL = your mongo db url
JWT_SECRET = your super secret jwt key
JWT_LIFETIME = your jwt life time


SMTP_HOST = Add smtp host from mail trap after you successfully registered
SMTP_PORT = Add smtp port from mail trap
SMTP_EMAIL = Add smtp email
SMTP_PASSWORD = Add smtp password
SMTP_FROM_EMAIL = Add smtp from email
SMTP_FROM_NAME = Add smtp from name

CLOUDINARY_NAME =  cloudinary name
CLOUDINARY_API_KEY = cloudinary api key
CLOUDINARY_API_SECRET = cloudinary api secret

STRIPE_API_KEY = stripe public key
STRIPE_SECRET_KEY = stripe secret key
STRIPE_WEBHOOK = webhook signing secret

STRIPE_WEBHOOK2  = webhook signing secret

CLIENT_URL = client url 
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm start

# Run backend only
npm run server
```
