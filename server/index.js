const Express = require('express');
const router = require('./router');
const cors = require('cors');

const app = Express();
const PORT = 8889;

const client_id = '8804a75f7e7b47aea04216646cbd5612';
const client_secret = '1d15a0a679b44546aff8de6e09ae09fa';
const redirect_uri = 'http://localhost:8889/callback/';

app
	.use(cors())
	.use(Express.json())
	.use(router)

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});