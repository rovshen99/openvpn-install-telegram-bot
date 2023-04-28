const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const { filename } = req.query;

  // Construct the file path based on the filename
  const filePath = path.join(__dirname, 'files', filename);

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    res.status(404).send(`File not found: ${filename}`);
    return;
  }

  // Set the appropriate headers for the download
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.setHeader('Content-Type', 'application/octet-stream');

  // Read the file contents and return them in the response body
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
};