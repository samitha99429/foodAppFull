import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/dashboard.css';
import RecipeDetailsModal from './RecipeDetails'; 


const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Beef');
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('https://foo-recipe-api.onrender.com/api/recipes/categories');
        setCategories(data.slice(0, 5)); 
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);
  

  useEffect(() => {
    if (selectedCategory) {
      const fetchRecipes = async () => {
        try {
          const { data } = await axios.get(`https://foo-recipe-api.onrender.com/api/recipes/category/${selectedCategory}`);
          setRecipes(data); 
          
        } catch (error) {
          console.error("Failed to fetch recipes:", error);
        }
      };

      fetchRecipes();
    }
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleRecipeClick = (recipe) => {
    console.log("Recipe clicked:", recipe);  
    setSelectedRecipe(recipe);
    setIsModalOpen(true); 
    console.log("Modal open state:", isModalOpen);  
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null); 
  };


  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('https://foo-recipe-api.onrender.com/api/recipes/favorites', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFavorites(data);
    };

    fetchFavorites();
  }, []);
  
  const handleFavoriteClick = async (recipe) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error("User is not authenticated.");
      return;
    }
  
    try {
    const isFavorite = favorites.some(fav => fav.idMeal === recipe.idMeal);

    if (isFavorite) {
      await axios.delete(`https://foo-recipe-api.onrender.com/api/recipes/favorites/${recipe.idMeal}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(favorites.filter(fav => fav.idMeal !== recipe.idMeal));
      console.log('Removed from favorites:', recipe.strMeal);
      } else {
        await axios.post('https://foo-recipe-api.onrender.com/api/recipes/favorites', {
          idMeal: recipe.idMeal,
          strMeal: recipe.strMeal,
          strMealThumb: recipe.strMealThumb,
        
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        setFavorites([...favorites, recipe.idMeal]);
        console.log('Added to favorites:', recipe.strMeal);
      }
    } catch (error) {
      console.error('Failed to update favorite recipes:', error);
    }
  };
  

  return (
    <>
      <div className="dashboardcontainer">
        <h2>Recipe Categories</h2>
        <div className="categorybuttons">
          {categories.map((category) => (
            <button
              key={category.idCategory}
              className={selectedCategory === category.strCategory ? 'selected' : '' }
              onClick={() => handleCategoryClick(category.strCategory)}
            >
            
              {category.strCategory}
            </button>
          ))}
        </div>
      </div>


      <div className="recipeGrid">
        {recipes.map((recipe) => (
          <div key={recipe.idMeal} className="recipe-card" >
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="recipe-image"
              onClick={() => handleRecipeClick(recipe)}
            />
           <div className='mt-2'>
              <span
                className={`recipe-favorite ${favorites.includes(recipe.idMeal) ? 'favorite-active' : ''}`}
                onClick={() => handleFavoriteClick(recipe)}
              >
                {favorites.includes(recipe.idMeal) ? '♥' : '♡'}
              </span>
            </div>
            <h3 className="recipe-title">{recipe.strMeal}</h3>
          </div>
        ))}
      </div>

      
      {selectedRecipe && (
        <RecipeDetailsModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          recipe={selectedRecipe}
        />
      )}
    </>
  );
};

export default Dashboard;
