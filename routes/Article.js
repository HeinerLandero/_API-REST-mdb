const {Router} = require('express');
const router = Router();

const ArticleController = require('../controllers/Article')

//routes
router.get('/route-test', ArticleController.test);
router.get('/personal-data', ArticleController.personal_data);
router.post('/create', ArticleController.create);
router.get('/get-articles', ArticleController.getArticle);
router.get('/get-articles/:id', ArticleController.one);
router.delete('/get-articles/:id', ArticleController.erased);
router.put('/get-articles/:id', ArticleController.edit);


module.exports = router;