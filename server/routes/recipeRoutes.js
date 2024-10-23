const express = require('express');
const { getCategories, getRecipesByCategory, addFavoriteRecipe, getFavoriteRecipes, removeFavoriteRecipe } = require('../controllers/recipeController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/categories', getCategories);
router.get('/category/:category', getRecipesByCategory);

router.post('/favorites', protect, addFavoriteRecipe);
router.get('/favorites', protect, getFavoriteRecipes);
router.delete('/favorites/:idMeal', protect, removeFavoriteRecipe);

module.exports = router;
