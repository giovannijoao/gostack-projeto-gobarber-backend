import express from 'express';

const app = express();

app.get('/', (req, res) => res.json({
  message: 'Hello World',
}));

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`✨ Server start on port ${PORT}`);
});
