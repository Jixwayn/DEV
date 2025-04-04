import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // คอมโพเนนต์หลักที่คุณสร้างใน App.js
import reportWebVitals from './reportWebVitals';

// สร้าง root และ render คอมโพเนนต์ของคุณ
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// เรียกใช้งานฟังก์ชัน reportWebVitals เพื่อบันทึกข้อมูลการวัด
reportWebVitals();
