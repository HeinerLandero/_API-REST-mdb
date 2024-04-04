const {validateArticle} = require('../helpers/validate');
const Article = require('../models/Article');
const validator = require('validator');
const { json } = require('express');

const test = (req, res) => {
  return res.status(200).json({
    message: 'this is a test msj'
  });
};

// Create data

const createArticle = async (req, res) => {
  let params = req.body;

  try {
    let titleValidated = !validator.isEmpty(params.title);
    let contentValidated = !validator.isEmpty(params.content);

    if (!titleValidated || !contentValidated) {
      throw new Error('Error, data no is validated');
    }

    const article = new Article(params);
    const articleSaved = await article.save();

    if (!articleSaved) {
      throw new Error('Error, article no saved');
    }

    return res.status(200).json({
      status: 'success',
      article: articleSaved,
      message: 'Article saved'
    });

  } catch (error) {
      return res.status(400).json({
        status: 'Error',
        message: 'Error, incomplete data',
      });
  }

  
};
// Get articles 
const getArticles = async (req, res) => {
  try {
    const articles = await Article.find({})
                                  .sort({date:-1});

    if (!articles) {
      return res.status(404).json({
        status: 'Error',
        message: 'Error, article no find'
      });
    }

    return res.status(200).send({
      status: 'Success',
      articles
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: 'Error while fetching articles'
    });
  }
};
// Select a article for ID
const one = async (req, res) => {
  try {
    let id = req.params.id;
    let article = await Article.findById(id).exec();

    if (!article) {
      return res.status(404).json({
        status: "error",
        message: 'Error while fetching article'
      });
    }

    return res.status(200).json({
      status: "success",
      article
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: 'An error occurred'
    });
  }
};

//Delete a Article
const erased = async (req, res)=>{
  try{
    let id = req.params.id;
    let article = await Article.findByIdAndDelete(id).exec();

    if(!article){
      return res.status(404).json({
        status: "error",
        message: 'error, item not found for deletion'
      });
    }
      return res.status(200).json({
        status: "success",
        article
      });
  }
  catch(error){
    return res.status(500).json({
      status: "error",
      message: 'An error occurred'
    });
  }
};

// Edit articles
const edit = async (req, res) => {
  let id = req.params.id;
  let params = req.body;
  try {
    const result = await validateArticle(id, params);
    if (result.status === 'Error') {
      return res.status(400).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: 'An error occurred'
    });
  }
};


module.exports = {
  test,
  createArticle,
  getArticles,
  one,
  erased,
  edit
};
