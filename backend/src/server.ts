import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.json({
  message: 'Hello World',
}));

app.use('/', routes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`✨ Server start on port ${PORT}`);
});
