# Frontend - Virtual Scrolling Table with Cursor-Based Pagination

This is the frontend application for a high-performance virtual scrolling table with infinite scrolling using React Query. It is built using **Next.js** with **TypeScript** and implements efficient data fetching and state management for large datasets.

---

## **Features**

- **Virtual Scrolling**: Efficiently renders only visible rows for smooth scrolling.
- **Infinite Scrolling**: Fetches additional data as the user scrolls.
- **Column Sorting**: Supports client-side sorting of loaded data.
- **Error Boundaries**: Graceful handling of runtime errors.
- **Loading Indicators**: Displays loaders during data fetching.
- **Responsive Design**: Adapts seamlessly across devices.

---

## **Tech Stack**

- **Next.js** (React Framework)
- **TypeScript** (Static typing)
- **React Query** (Data fetching and caching)
- **Axios** (HTTP client)
- **CSS** (or TailwindCSS for styling)

---

## **Setup and Installation**

### **1. Prerequisites**
- Node.js (>= 16.x)
- npm or yarn

### **2. Clone the Repository**
```bash
git clone https://github.com/your-repo/frontend.git
cd frontend
```

### **3. Install Dependencies**
```bash
npm install --legacy-peer-deps
```

### **4. Start Development Server**
```bash
npm run dev
```

### **5. Build for Production**
```bash
npm run build
npm start
```

---

## **Folder Structure**

```
/src
├── /components
│   ├── VirtualTable.tsx          
│   ├── /Loader.tsx        
│   └── /Row.tsx          
├── /hooks  
|   ├── useOrders.ts         
├── /pages  
|   ├── index.tsx            
├── /styles
|   ├── table.css          
└── /utils
|   ├── sorting.ts            
```

## Code credit

Code credits for this code go to [Aman Khandelwal](https://github.com/wolfblunt)