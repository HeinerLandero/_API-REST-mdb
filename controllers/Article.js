const {validateArticle} = require('../helpers/validate');
const fs = require('fs');
const path = require('path');
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
//upload images
const upload_img = async (req, res) =>{
  if (!req.file && !req.files){
    return res.status(400).json({
      status: "error",
      message: "No file uploaded"
    });
  }

  let file_name = req.file.originalname;
  let file_split = file_name.split(".");
  let extension = file_split[file_split.length - 1];

   // check file extension

   const allowed_extensions = ["jpg", "jpeg", "png", "gif"];
    if (!allowed_extensions.includes(extension)) {
      fs.unlink(req.file.path, (error) => {
        if (error) {
          console.error(error);
        }
      });
      return res.status(400).json({
        status: "error",
        message: "Invalid file extension"
      });
    }else{
       let articleId = req.params.id;

        // find and updated article
        const articleUpdated = await Article.findOneAndUpdate({_id: articleId}, {image: file_name}, {new: true});
          if (!articleUpdated) {
            return res.status(404).json({
              status: "error",
              message: "Article not found"
            });
          }
          
          return res.status(200).json({
            status: "success",
            article: articleUpdated,
            file:req.file
          });
  }
};

// Get img

const image = async(req, res) => {
  let file = req.params.file;
  let rute = "./images/article/" + file;

  fs.stat(rute,(error, exist) => {
    if(exist){
      return res.sendFile(path.resolve(rute))
    }else{
      return res.status(404).json({
        status: "error",
        message: "Image not found",
        exist,
        file,
        rute,
      })
    }
  })
};

// Search 
const search_artic = async (req, res) => {
  let string = req.params.string;

  try {
    const articlesFinded = await Article.find({
      "$or": [
        {"title": {"$regex": string, "$options": "i"}},
        {"content": {"$regex": string, "$options": "i"}}
      ]
    })
    .sort({date: -1})
    .exec();

    if (!articlesFinded || ( articlesFinded.length === 0)) {
      return res.status(404).json({
        status: "error",
        message: "Article not found"
      });
    }

    return res.status(200).json({
      status: "success",
      articles: articlesFinded
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "An error occurred"
    });
  }
};

module.exports = {
  test,
  createArticle,
  getArticles,
  one,
  erased,
  edit,
  upload_img,
  image,
  search_artic
};
