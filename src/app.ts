import express, { Response } from "express";
import PostController from "./controllers/PostController";
const bodyParser = require('body-parser');
const cors = require('cors');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

/**
 * Route configuration.
 */
const app = express();
const router = express.Router();

router.use(cors());
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
router.use(awsServerlessExpressMiddleware.eventContext());

/**
 * Instantiated controllers.
 */
const postController = new PostController;

/**
 * registered routes.
 */
router.get('/v1/posts', postController.list);
router.get('/v1/posts/:post', postController.show);
router.delete('/v1/posts/:post', postController.delete);
router.put('/v1/posts/:post', postController.update);
router.post('/v1/posts', postController.create);

app.use('/', router);

module.exports = app
