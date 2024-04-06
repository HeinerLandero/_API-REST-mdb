const {Router} = require('express');
const multer = require('multer');
const router = Router();
const ArticleController = require('../controllers/Article')


const customStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './images/article/')
    },
    filename: function(req, file, cb){
        cb(null, 'article' + Date.now() + file.originalname)
    }

});
const uploaded = multer({storage:customStorage});


//routes
router.get('/route-test', ArticleController.test);
router.post('/create-article', ArticleController.createArticle);
router.get('/get-articles', ArticleController.getArticles);
router.get('/get-articles/:id', ArticleController.one);
router.delete('/get-articles/:id', ArticleController.erased);
router.put('/get-articles/:id', ArticleController.edit);
router.post('/upload_img/:id',[uploaded.single('file0')], ArticleController.upload_img);
router.get('/image/:file', ArticleController.image);
router.get('/search/:string', ArticleController.search_artic);


module.exports = router;