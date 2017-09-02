import * as express from 'express';
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.send('<a href="https://discordapp.com/api/oauth2/authorize?client_id=352730127479865354&scope=bot&permissions=0">Add this bot</a>'); 
});

export default router;