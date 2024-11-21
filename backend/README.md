# Backend - API for Virtual Scrolling Table

This is the backend for the virtual scrolling table application. It uses **Node.js** and **Sequelize ORM** with a **MySQL** database to implement a RESTful API supporting cursor-based pagination and sorting.

---

## **Features**

- **Cursor-Based Pagination**: Efficiently fetches data for infinite scrolling.
- **Sorting**: Supports sorting on any field with ascending or descending order.
- **Data Validation**: Validates incoming requests.
- **Error Handling**: Handles errors gracefully with proper responses.
- **Request Logging**: Logs API requests for debugging and monitoring.
- **Swagger Documentation**: Provides API documentation at `/api-docs`.


## **Environment Variables**
Create a `.env` file in the project root:

```bash
PORT=3002

# Database Configuration
DB_NAME="shopping"
DB_USER="root" # your mysql user
DB_PASSWORD="password" # mysql password
DB_HOST="localhost"

# Log File Path
LOG_DIRECTORY="./logs/"
LOG_LEVEL="debug"
LOG_ROTATION_INTERVAL="daily"    # Can be 'daily', 'weekly', or 'monthly'
LOG_MAX_FILES="30d"              # Set how long to keep old log files
```

---

## **API Documentation**

The backend API documentation is available at:  
[http://localhost:3002/api-docs](http://localhost:3002/api-docs)

---

## **Contributors**

- Your Name ([Your GitHub Profile](https://github.com/your-profile))

---

## **Tech Stack**

- **Node.js** (Backend runtime)
- **Express.js** (Web framework)
- **Sequelize ORM** (Database interaction)
- **MySQL** (Database)
- **Swagger** (API documentation)

---

## **Setup and Installation**

### **1. Prerequisites**
- Node.js (>= 16.x)
- MySQL (>= 8.x)
- npm or yarn

### **2. Clone the Repository**
```bash
git clone https://github.com/your-repo/backend.git
cd backend
```

### **3. Install Dependencies**
```bash
npm install
# or
yarn install
```

### **5. Run Database Migrations**
```bash
npx sequelize-cli db:migrate
```

### **6. Start the Server**
```bash
node app.js
# or
npm start
```

The API will be available at: [http://localhost:3002](http://localhost:3002)

---

## **Folder Structure**

```
/src
├── /controllers         # Request handlers
├── /models              # Sequelize models
├── /routes              # API route definitions
├── /services            # Business logic
├── /utils               # Utility functions
├── /config              # Configuration (e.g., DB setup)
└── /swagger             # Swagger documentation file
```

---

## **Endpoints**

### **GET /api/orders**
- **Query Parameters**:
  - `cursor` (string): Pagination cursor.
  - `limit` (number): Number of records to fetch (default: 50).
  - `sort` (string): Field to sort by.
  - `sortDirection` (`asc` or `desc`): Sort direction.

- **Response**:
```json
{
  "data": [
    { "id": 1, "name": "Order 1", "createdAt": "2024-11-01T12:00:00Z" }
  ],
  "nextCursor": "cursor_value",
  "totalCount": 10000
}
```

```bash
curl "http://localhost:3002/api/orders?cursor=123&limit=50&sort=createdAt&sortDirection=asc"
```
---

## **Swagger API Documentation**

The Swagger documentation is available at:  
[http://localhost:3002/api-docs](http://localhost:5000/api-docs)


## Code credit

Code credits for this code go to [Aman Khandelwal](https://github.com/wolfblunt)