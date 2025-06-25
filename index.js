const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Configure multer for file upload (in memory)
const upload = multer({ storage: multer.memoryStorage() });

// Serve homepage with upload form (optional)
app.get('/', (req, res) => {
  res.send(`
    <h1>File Metadata Microservice</h1>
    <form action="/api/fileanalyse" method="post" enctype="multipart/form-data">
      <input type="file" name="upfile" />
      <button type="submit">Upload</button>
    </form>
  `);
});

// API endpoint to handle file upload
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Extract metadata
  const { originalname, mimetype, size } = req.file;

  // Return JSON response
  res.json({
    name: originalname,
    type: mimetype,
    size: size
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
