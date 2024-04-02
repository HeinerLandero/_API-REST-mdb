const {Router} = require('express');
const router = Router();

const ArticleController = require('../controllers/Article')

//routes
router.get('/route-test', ArticleController.test);
router.get('/personal-data', ArticleController.personal_data);
router.post('/create', ArticleController.create);
router.get('/get-article', ArticleController.getArticle);
router.get('/get-article/:id', ArticleController.one);


module.exports = router;