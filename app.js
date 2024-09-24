const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const licenseRoutes = require('./routes/license');

const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, 'public')));

// License routes
app.use('/license', licenseRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
