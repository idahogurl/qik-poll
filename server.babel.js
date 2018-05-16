import express from 'express';
import path from 'path';

const app = express();

const port = 3000;

app.use('/', express.static('public'));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log('Server Started at port 3000');
});
