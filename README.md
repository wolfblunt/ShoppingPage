# Virtual Scrolling Table Application

This repository contains a complete solution for a virtual scrolling table with infinite scrolling, including backend, frontend, and a seeding script to populate the database.

---

## **Contents**

1. **Seeding Script**: Populates the database with 10,000 realistic order records using Node.js and MySQL.
2. **Backend**: Provides a RESTful API with cursor-based pagination and sorting for efficient data fetching.
3. **Frontend**: Implements a high-performance virtual scrolling table with infinite scrolling using React and Next.js.

---

## **Setup**

### **1. Prerequisites**
- **Node.js**: Ensure Node.js is installed (>= 16.x).
- **MySQL**: Set up MySQL for the backend and seeding script.
- **npm/yarn**: For dependency management.

---

### **2. Folder Structure**

```
/seedScript         # Script to populate the database
/backend                # Backend API for data fetching
/frontend               # Frontend application for the virtual table
```

---

## **Quick Start**

### **1. Seeding the Database**
Navigate to `/seedScript`, update database credentials, and run:
```bash
npm install
node seedingScript.js
```

### **2. Backend Setup**
Navigate to `/backend`, configure `.env` with database details, and run:
```bash
npm install
npm start
```
API available at [http://localhost:3002](http://localhost:3002).

### **3. Frontend Setup**
Navigate to `/frontend` and start the app:
```bash
npm install --legacy-peer-deps
npm run dev
```
Frontend available at [http://localhost:3000](http://localhost:3000).

---

## **Documentation**
- **Seeding Script**: Refer to `/seeding-script/README.md`
- **Backend API**: Refer to `/backend/README.md`
- **Frontend App**: Refer to `/frontend/README.md`

---

## Code credit

Code credits for this code go to [Aman Khandelwal](https://github.com/wolfblunt)