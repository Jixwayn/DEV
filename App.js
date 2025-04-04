import React, { useState } from 'react';

function App() {
  const [quote, setQuote] = useState('คลิกปุ่มด้านบนเพื่อรับคำคม');

  async function getQuote() {
    const res = await fetch('/api/quote');
    const data = await res.json();
    setQuote(data.quote); // อัพเดทค่า quote ที่แสดงใน UI
  }

  return (
    <div>
      <h1>📜 คำคมจาก Node.js API</h1>
      <button onClick={getQuote}>สุ่มคำคม</button>
      <p>{quote}</p>
    </div>
  );
}

export default App;
