import * as express from 'express';
var router = express.Router();
import * as path from 'path';

/* GET home page. */
router.get('/', function(req, res, next) {
	res.sendFile(path.resolve(__dirname, '../../views/index.html'));
});

export default router;