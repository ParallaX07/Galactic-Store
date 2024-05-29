## Galactic Store: Intergalactic Marketplace 

**Explore the Galaxy with a Universe of Products!**

The Galactic Store is a university project designed to showcase the capabilities of MySQL through a user-friendly frontend. It allows customers to browse a cosmic collection of products, while admins can manage the store's inventory and operations.

### Features

**For Customers:**

* **Browse Products:** Explore a vast selection of intergalactic goods with advanced search and filtering options.
* **Cart Management:** Add your favorite items to your cart for easy checkout.
* **Review & Rate:** Leave reviews and ratings to help fellow space explorers make informed decisions.
* **Order History & Profile Management:** Keep track of your past purchases and update your profile information with ease.

**For Admins:**

* **Product Management:** Add, update, or remove products from the catalog, including detailed descriptions and images.
* **Site Statistics & Sales Data:** Access insightful reports on user activity, sales performance, and inventory levels.
* **Order Management:** Process and update the status of customer orders efficiently.
* **Real-time Store Overview:** Get a comprehensive view of active users, pending orders, and stock levels at a glance.

### Technologies Used

* **Frontend:** React.js with Tailwind CSS
* **Frontend Hosting:** Firebase
* **Backend:** Self-hosted MySQL Server
* **Backend Hosting:** Vercel
* **Authentication:** Firebase

### Demo & Login Credentials

* **Website:** https://galactic-store.web.app/
* **Admin View (Limited Access):**
    * Email: viewadmin@gmail.com
    * Password: Admin@pass1
* **Customer View:**
    * Email: john.doe@gmail.com
    * Password: Test1234

### Database Tables

* **User:** Stores user information.
    * Email_ID (Primary Key)
    * User_Type (Customer or Admin)
    * F_Name
    * L_Name
    * Contact_Cell
    * Profile_Image (URL)
* **Product:** Stores product information.
    * Product_ID (Primary Key)
    * Name
    * Description
    * Price
    * Galaxy_Source
    * Planet_Source
    * Quantity_inStock
    * Image_Url (URL)
* **Cart:** Stores cart information.
    * Email (Primary Key) (Foreign Key to User)
    * OrderID (Primary Key)
    * Status (Open/Closed)
* **OrderDetails:** Stores order details.
    * OrderID (Primary Key) (Foreign Key to Cart)
    * ProductID (Primary Key) (Foreign Key to Product)
    * Email (Foreign Key to User)
    * Quantity
    * Status (Pending/Shipped/Delivered)
* **Review:** Stores customer reviews.
    * product_ID (Primary Key) (Foreign Key to Product)
    * Email_ID (Primary Key) (Foreign Key to User)
    * reviewDesc
    * rating
    * Post_date

### Known Limitations (Future Improvements)

* **Security:** API requests are currently unencrypted. Implementing encryption (e.g., HTTPS) is crucial for protecting user data.
* **User Management:** Admin and customer portals are not fully separated. Additionally, advanced user management features like role-based access control can be implemented for enhanced security.
* **Database Optimization:** Queries might benefit from optimization to reduce space complexity and improve performance.

This project demonstrates the foundational aspects of building an e-commerce platform with a MySQL database. Future development can focus on implementing the mentioned improvements and expanding functionalities  based on project goals.
