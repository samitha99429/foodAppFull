const mongoose = require('mongoose');

const favoriteRecipeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  idMeal: {
    type: String,
    required: true,
  },
  strMeal: {
    type: String,
    required: true,
  },
  strMealThumb: {
    type: String,
    required: true,
  },
  recipeCategory: {
    type: String,
  },
});

const FavoriteRecipe = mongoose.model('FavoriteRecipe', favoriteRecipeSchema);

module.exports = FavoriteRecipe;
