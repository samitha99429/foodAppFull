
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/favorite.css';
import Swal from 'sweetalert2';


const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
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

 
  const handleRemove = async (idMeal) => {
    const token = localStorage.getItem('token');
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to remove this recipe from favorites?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://foo-recipe-api.onrender.com/api/recipes/favorites/${idMeal}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setFavorites(favorites.filter(fav => fav.idMeal !== idMeal));
          Swal.fire('Removed!', 'The recipe has been removed from favorites.', 'success');
          window.location.reload();
          
        } catch (error) {
          console.error('Failed to remove favorite:', error);
          Swal.fire('Error!', 'Failed to remove the recipe. Try again later.', 'error');
        }
      }
    });
  };
  return (
    <>
    <h2 className='mt-2 '>Favorites</h2>
    <div className="favGrid">
      {favorites.map((recipe) => (
        <div key={recipe.idMeal} className="fav-card">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="fav-image"
          />
          {recipe.strMeal}
          <div className='mt-2'>
            <button className='remove-button' onClick={() => handleRemove(recipe.idMeal)}>Remove</button>
           
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Favorites;
