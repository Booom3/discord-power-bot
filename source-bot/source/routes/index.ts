import * as express from 'express';
var router = express.Router();
import * as path from 'path';
import * as Proxy from 'http-proxy-middleware';
import Api from '../api/api';
import * as Debug from 'debug';
const debug = Debug('bot');

/* GET home page. */
router.use('/api', Api);

// Dev server
const proxyTarget = process.env.DEVPROXYTARGET || '://localhost:3000';
debug(`Using ${proxyTarget} to proxy requests to`);
const proxy = Proxy({
    target: 'http' + proxyTarget,
});
const wsproxy = Proxy({
    target: 'ws' + proxyTarget,
    ws: true,
    changeOrigin: true
})
router.use('**', proxy);
router.use('**', wsproxy);


export default router;
