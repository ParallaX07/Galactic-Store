# Galactic Store: Intergalactic Marketplace

**Explore the Galaxy with a Universe of Products!**

The Galactic Store is a university project designed to showcase the capabilities of MySQL through a user-friendly frontend. It allows customers to browse a cosmic collection of products, while admins can manage the store's inventory and operations.

---

## Table of Contents

- [Features](#features)
  - [For Customers](#for-customers)
  - [For Admins](#for-admins)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Demo & Login Credentials](#demo--login-credentials)
- [Database Tables](#database-tables)
- [DBML Visualization](#dbml-visualization)
- [Known Limitations (Future Improvements)](#known-limitations-future-improvements)
- [Running Locally with XAMPP](#running-locally-with-xampp)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)

---

## Features

### For Customers

- **Browse Products:** Explore a vast selection of intergalactic goods with advanced search and filtering options.
- **Cart Management:** Add your favorite items to your cart for easy checkout.
- **Review & Rate:** Leave reviews and ratings to help fellow space explorers make informed decisions.
- **Order History & Profile Management:** Keep track of your past purchases and update your profile information with ease.

### For Admins

- **Product Management:** Add, update, or remove products from the catalog, including detailed descriptions and images.
- **Site Statistics & Sales Data:** Access insightful reports on user activity, sales performance, and inventory levels.
- **Order Management:** Process and update the status of customer orders efficiently.
- **Real-time Store Overview:** Get a comprehensive view of active users, pending orders, and stock levels at a glance.

---

## Demo

https://github.com/user-attachments/assets/11916a3f-e38a-406a-a185-efa4bdd9240f
#### Customer View

https://github.com/user-attachments/assets/cfc2135c-63d6-4e68-a33c-677db5712a46
#### Admin View

---

## Technologies Used

- **Frontend:** React.js with Tailwind CSS
- **Frontend Hosting:** Firebase
- **Backend:** Node.js (Express) with MySQL
- **Backend Hosting:** Vercel
- **Authentication:** Firebase

---

## Demo & Login Credentials

- **Website:** https://galactic-store.web.app/
- **Admin View (Limited Access):**
  - Email: viewadmin@gmail.com
  - Password: Admin@pass1
- **Customer View:**
  - Email: john.doe@gmail.com
  - Password: Test1234

---

## Database Tables

- **User:** Stores user information.
  - Email_ID (Primary Key)
  - User_Type (Customer or Admin)
  - F_Name
  - L_Name
  - Contact_Cell
  - Profile_Image (URL)
- **Product:** Stores product information.
  - Product_ID (Primary Key)
  - Name
  - Description
  - Price
  - Galaxy_Source
  - Planet_Source
  - Quantity_inStock
  - Image_Url (URL)
- **Cart:** Stores cart information.
  - Email (Primary Key) (Foreign Key to User)
  - OrderID (Primary Key)
  - Status (Open/Closed)
- **OrderDetails:** Stores order details.
  - OrderID (Primary Key) (Foreign Key to Cart)
  - ProductID (Primary Key) (Foreign Key to Product)
  - Email (Foreign Key to User)
  - Quantity
  - Status (Pending/Shipped/Delivered)
- **Review:** Stores customer reviews.
  - product_ID (Primary Key) (Foreign Key to Product)
  - Email_ID (Primary Key) (Foreign Key to User)
  - reviewDesc
  - rating
  - Post_date

---

## DBML Visualization

![DBML](https://i.ibb.co/S7m81hc/Galactic-Store.png)

---

## Known Limitations (Future Improvements)

- **Security:** API requests are currently unencrypted. Implementing encryption (e.g., HTTPS) is crucial for protecting user data.
- **User Management:** Admin and customer portals are not fully separated. Additionally, advanced user management features like role-based access control can be implemented for enhanced security.
- **Database Optimization:** Queries might benefit from optimization to reduce space complexity and improve performance.

This project demonstrates the foundational aspects of building an e-commerce platform with a MySQL database. Future development can focus on implementing the mentioned improvements and expanding functionalities based on project goals.

---

## Running Locally with XAMPP

### Prerequisites

- Install [XAMPP](https://www.apachefriends.org/download.html) on your local machine.
- Install [Node.js](https://nodejs.org/en/download/) (LTS version recommended).

### Backend Setup

1. Start the Apache and MySQL servers in XAMPP.
2. Import the `galacticStore.sql` file into your MySQL database using the XAMPP phpMyAdmin interface.
3. Navigate to the `backend` directory in your project.
4. Create a `.env` file in the `backend` directory with the following content:
    ```
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=
    DB_NAME=galacticstore
    DB_PORT=3306
    ```
5. Open [`server.js`](backend/server.js) and **comment out** the first connection block, then **uncomment** the XAMPP connection block:
    ```javascript
    // Create connection to database
    // const db = mysql.createConnection({
    //   host: process.env.DB_HOST,
    //   user: process.env.DB_USER,
    //   password: process.env.DB_PASS,
    //   database: process.env.DB_NAME,
    //   port: process.env.DB_PORT,
    //   multipleStatements: true,
    // });

    // XAMPP connection
    const db = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "galacticstore",
    });
    ```
6. Run `npm install` to install the backend dependencies.
7. Start the backend server with:
    ```sh
    nodemon server.js
    ```
    or
    ```sh
    node server.js
    ```

### Frontend Setup

1. Navigate to the `frontend` directory in your project.
2. Open `src/hooks/axiosSecure.jsx` and comment out the first `baseURL`, then uncomment the XAMPP `baseURL`:
    ```javascript
    const axiosSecure = axios.create({
      // baseURL: 'https://backend-navy-delta.vercel.app',
      baseURL: 'http://localhost:8801',
    });
    ```
3. Run `npm install` to install the frontend dependencies.
4. Start the frontend development server with:
    ```sh
    npm run dev
    ```

The application should now be running locally on [http://localhost:5173](http://localhost:5173), with the backend connected to the XAMPP MySQL database on [http://localhost:8801](http://localhost:8801).

**Note:** If you encounter any issues, make sure that the Apache and MySQL servers are running in XAMPP, and that the `galacticStore` database has been imported correctly.
