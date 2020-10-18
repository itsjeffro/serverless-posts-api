import express, { Response } from "express";
import PostController from "./controllers/PostController";
import VersionController from "./controllers/VersionController";
const bodyParser = require('body-parser');
const cors = require('cors');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

const app = express();
const router = express.Router();

router.use(cors());
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
router.use(awsServerlessExpressMiddleware.eventContext());

const postController = new PostController;
const versionController = new VersionController;

router.get('/', versionController.show);
router.get('/posts', postController.list);
router.get('/posts/:post', postController.show);
router.delete('/posts/:post', postController.delete);
router.put('/posts/:post', postController.update);
router.post('/posts', postController.create);

app.use('/', router);

module.exports = app
