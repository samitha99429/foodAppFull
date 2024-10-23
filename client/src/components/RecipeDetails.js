import React from 'react';
import Modal from 'react-modal';
import '../styles/recipeDetails.css';

Modal.setAppElement('#root');

const RecipeDetailsModal = ({ isOpen, onRequestClose, recipe }) => {
  console.log("Modal Open: ", isOpen, "Recipe: ", recipe); 
  console.log(recipe); 

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      className="modal" 
      overlayClassName="modal-overlay"
    >
      <h2>{recipe?.strMeal || 'No Title Available'}</h2>
      <p>{recipe?.strInstructions || 'Instructions not available.'}</p>
      <img src={recipe?.strMealThumb} alt={recipe?.strMeal || 'No Image'} className="modal-image" />
      
      <button onClick={onRequestClose} className="close-modal-button">Close</button>
    </Modal>

  );
};

export default RecipeDetailsModal;

