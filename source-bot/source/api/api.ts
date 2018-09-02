import * as express from 'express';
var router = express.Router();
import * as client from '../discord/discordapp';

const server = process.env.TEST_SERVER;

router.get('/guilds', (req, res, next) => {
    let jsonRes = client.default.guilds.map((g) => ({name: g.name, id: g.id}));
    res.json(jsonRes);
});

router.get('commands', (req, res, next) => {

})

export default router;
