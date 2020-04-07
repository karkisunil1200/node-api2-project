const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.json({server: 'up'});
});

const PORT = 5000;
server.listen(PORT, () => console.log(`running on port:${PORT}`));
