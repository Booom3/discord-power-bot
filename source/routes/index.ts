import * as express from 'express';
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.send(`<html><body>https://discordapp.com/api/oauth2/authorize?client_id=<strong>&lt;YOUR ID HERE&gt;</strong>&scope=bot&permissions=0</body></html>`); 
});

export default router;