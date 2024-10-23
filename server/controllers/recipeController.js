const axios = require('axios');
const FavoriteRecipe = require('../models/FavoriteRecipe');

const getCategories = async (req, res) => {
  try {
    const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
    res.json(data.categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};

const getRecipesByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    res.json(data.meals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes', error });
  }
};


const addFavoriteRecipe = async (req, res) => {
    const { idMeal, strMeal, strMealThumb, recipeCategory } = req.body;
    const userId = req.user._id;
  
    try {
      const favoriteRecipe = new FavoriteRecipe({
        user: userId,
        idMeal,
        strMeal,
        strMealThumb,
        recipeCategory,
      });
  
      await favoriteRecipe.save();
      res.status(201).json(favoriteRecipe);
    } catch (error) {
      res.status(500).json({ message: 'Error adding favorite', error });
    }
  };
  


const getFavoriteRecipes = async (req, res) => {
    const userId = req.user._id;
  
    try {
      const favoriteRecipes = await FavoriteRecipe.find({ user: userId });
      res.json(favoriteRecipes);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching favorites', error });
    }
  };
  



const removeFavoriteRecipe = async (req, res) => {
    const { idMeal } = req.params; 
    const userId = req.user._id;
  
    try {
      await FavoriteRecipe.findOneAndDelete({ user: userId, idMeal });
      res.json({ message: 'Favorite removed' });
    } catch (error) {
      res.status(500).json({ message: 'Error removing favorite', error });
    }
  };
  

module.exports = {
  getCategories,
  getRecipesByCategory,
  addFavoriteRecipe,
  getFavoriteRecipes,
  removeFavoriteRecipe,
};
