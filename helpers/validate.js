const validator = require('validator');
const Article = require('../models/Article');


//Validate Arcticles
const validateArticle = async (id, params) => {
    try {
      let titleValidated = !validator.isEmpty(params.title) &&
        validator.isLength(params.title, { min: 5, max: undefined });
      let contentValidated = !validator.isEmpty(params.content);
  
      if (!titleValidated || !contentValidated) {
        throw new Error('Error, data no is validated');
      }
  
      const article = await Article.findById(id);
      if (!article) {
        throw new Error('Error, article not found');
      }
      article.title = params.title;
      article.content = params.content;
      const articleSaved = await article.save();
  
      if (!articleSaved) {
        throw new Error('Error, article no saved');
      }
  
      return {
        status: 'success',
        article: articleSaved,
        message: 'Article edited'
      };
  
    } catch (error) {
      return {
        status: 'Error',
        message: 'Error, incomplete data'
      };
    }
  };

  module.exports = {
    validateArticle
  };