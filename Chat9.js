const searchInput = document.getElementById('search');
const queryresultslisting = document.getElementById('cocktailList');
const shoppingList = document.getElementById('shoppingList');
const printButton = document.querySelector('button');

function searchCocktail() {
  const searchValue = searchInput.value.trim().toLowerCase();
  queryresultslisting.innerHTML = '';
  shoppingList.innerHTML = '';
  printButton.style.display = 'none';
  
  if (searchValue !== '') {
    queryresultslisting.innerHTML = 'Buscando...';
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`)
      .then(response => response.json())
      .then(data => {
        if (data.drinks !== null) {
          displayCocktails(data.drinks);
        } else {
          queryresultslisting.innerHTML = 'No se han encontrado resultados';
        }
      });
  }
}

function displayCocktails(drinks) {
  queryresultslisting.innerHTML = '';
  drinks.forEach(drink => {
    const drinkCard = document.createElement('div');
    drinkCard.classList.add('drink-card');
    const drinkImg = document.createElement('img');
    drinkImg.src = drink.strDrinkThumb;
    drinkImg.alt = drink.strDrink;
    const drinkName = document.createElement('h3');
    drinkName.textContent = drink.strDrink;
    const drinkInstructions = document.createElement('p');
    drinkInstructions.textContent = drink.strInstructions;
    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Agregar a la Lista de Compra';
    addToCartButton.addEventListener('click', () => {
      addIngredientsToShoppingList(drink);
    });
    drinkCard.append(drinkImg, drinkName, drinkInstructions, addToCartButton);
    queryresultslisting.appendChild(drinkCard);
  });
}

// Función para agregar ingredientes a la lista de compra
function addIngredientsToShoppingList(drink) {
  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];
    if (ingredient !== null && ingredient !== '') {
      const ingredientString = `${ingredient} - ${measure}`;
      ingredients.push(ingredientString);
    }
  }
  ingredients.forEach(ingredient => {
    const shoppingListItem = document.createElement('li');
    shoppingListItem.textContent = ingredient;
    shoppingList.appendChild(shoppingListItem);
  });
  shoppingList.scrollIntoView({ behavior: 'smooth' });
  printButton.style.display = 'block';
}

// Función para imprimir lista de compra
function printShoppingList() {
  window.print();
}
