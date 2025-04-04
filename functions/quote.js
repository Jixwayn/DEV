// ฟังก์ชัน API สุ่มคำคม
exports.handler = async function (event, context) {
  const quotes = [
    "Stay hungry, stay foolish. – Steve Jobs",
    "Code is like humor. When you have to explain it, it’s bad.",
    "Simplicity is the soul of efficiency.",
    "Talk is cheap. Show me the code. – Linus Torvalds",
    "First, solve the problem. Then, write the code."
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return {
    statusCode: 200,
    body: JSON.stringify({ quote: randomQuote })
  };
};
