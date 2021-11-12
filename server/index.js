const Express = require('express');
const router = require('./router');
const cors = require('cors');
const db = require('./model/dbaccess.js');
const corsConfig = {origin: ['http://localhost:3000']};

const app = Express();
const PORT = 8889;

app
	.use(cors(corsConfig))
	.use(Express.json())
	.use(router)

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});