
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(bodyParser.json()); 
app.get('/message', (req, res) => {
  res.json({ message: 'Welcome to our API!' });
});

app.post('/submit', (req, res) => {
  const data = req.body;
  console.log('Received data:', data);
  
  res.json({ 
    success: true, 
    message: 'Data received successfully!',
    receivedData: data
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});