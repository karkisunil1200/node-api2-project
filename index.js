const express = require('express');
const cors = require('cors');
const postRouter = require('./posts/router');

const server = express();

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.json({server: 'up'});
});

server.use('/api/posts', postRouter);

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port:${PORT}`));
