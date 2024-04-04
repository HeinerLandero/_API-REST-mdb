const {Router} = require('express');
const router = Router();

const ArticleController = require('../controllers/Article')

//routes
router.get('/route-test', ArticleController.test);
router.post('/create-article', ArticleController.createArticle);
router.get('/get-articles', ArticleController.getArticles);
router.get('/get-articles/:id', ArticleController.one);
router.delete('/get-articles/:id', ArticleController.erased);
router.put('/get-articles/:id', ArticleController.edit);


module.exports = router;