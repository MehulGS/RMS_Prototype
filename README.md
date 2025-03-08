# Restaurant Management System

## Project Overview
This is a Restaurant Management System built using the MERN stack. The system allows restaurant managers to manage reservations, menu items, and user authentication. Customers can make reservations, and managers have the ability to update the reservation status.

## Technologies Used
- **Frontend**: React (Vite), Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT (JSON Web Token)
- **File Upload**: Multer (for image uploads)
- **Email Handling**: Nodemailer (for OTP verification and notifications)
- **Cloud Storage**: Cloudinary (for storing images)

---

## Installation & Setup
### Backend Setup
1. Clone the repository:
   ```sh
   git clone <repository_url>
   ```
2. Navigate to the backend directory:
   ```sh
   cd backend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file in the backend root and add the following:
   ```env
   MONGO_URI=mongodb+srv://mehulguptarw453:uNm6YVt7raqQe3ot@cluster0.mfp8x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   FRONTEND_URL=http://localhost:5173/
   PORT=5000
   JWT_SECRET=ITS_A_SECRET
   CLOUDINARY_CLOUD_NAME=dwegyfmkt
   CLOUDINARY_API_KEY=316859717136728
   CLOUDINARY_API_SECRET=JwKAoLwM_vTFqIgfhyUhmiBMbW4
   EMAIL=mehulguptar.w453@gmail.com
   EMAIL_PASSWORD=host cokw yyzd ftaa
   ```
5. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend server:
   ```sh
   npm run dev
   ```

---

## API Endpoints
### User Authentication
- **Register User:** `POST /api/v1/user/register`
- **Login User:** `POST /api/v1/user/login`
- **Send OTP:** `POST /api/v1/user/send-otp`
- **Verify OTP:** `POST /api/v1/user/verify-otp`
- **Change Password:** `POST /api/v1/user/change-password`

### Menu Management (Manager Access Only)
- **Add Menu Item:** `POST /api/v1/menu/add-item` (with image upload)
- **Edit Menu Item:** `PUT /api/v1/menu/edit-item/:id`
- **Delete Menu Item:** `DELETE /api/v1/menu/delete-item/:id`
- **Get Menu Items:** `GET /api/v1/menu/menu-items`

### Reservation Management
- **Make a Reservation:** `POST /api/v1/reservation/send`
- **Get Guest List:** `GET /api/v1/reservation/guestList`
- **Cancel Reservation:** `PUT /api/v1/reservation/cancel/:reservationId`
- **Mark as Arrived:** `PUT /api/v1/reservation/arrived/:reservationId`

### Type Management
- **Add Type:** `POST /api/v1/type/add-type`
- **Get Types:** `GET /api/v1/type/get-type`

---

## Features
- User Authentication (Signup, Login, Password Reset with OTP)
- Role-Based Access (Manager & Guest)
- Menu Management (CRUD operations on food items)
- Reservation System (Booking, Tracking, and Status Updates by Manager)
- Cloudinary Integration for Image Uploads
- Email Notifications for Reservations
- Secure API with JWT Authentication

---

## Routes Integration
In `app.js`, the following routes are used:
```js
const userRouter = require("./routes/userRoute.js");
const menuRouter = require("./routes/menuRoutes.js");
const addtypeRouter = require("./routes/addtypeRoutes.js");
const reservationRouter = require("./routes/reservation.js");

app.use("/api/v1/user", userRouter);
app.use("/api/v1/menu", menuRouter);
app.use("/api/v1/type", addtypeRouter);
app.use("/api/v1/reservation", reservationRouter);
```

---

## Postman API Collection
A Postman API collection has been created for testing all the endpoints. You can import it into Postman for easier testing.

---

## To-Do List
- [x] Manager can add menu items
- [ ] Integrate Edit & Delete API for Menu Management
- [ ] Improve Reservation Dashboard for Managers
- [ ] Deploy Frontend and Backend

---

## Contact
For any issues or queries, contact **Mehul Gupta** at [mehulguptar.w453@gmail.com](mailto:mehulguptar.w453@gmail.com).

