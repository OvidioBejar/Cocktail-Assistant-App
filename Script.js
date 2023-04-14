// This code helps me to search for drinks
async function searchCocktail() {
  try {
    const searchInput = document.getElementById("search").value;
    document.getElementById("cocktail-container").innerHTML = "<p>Searching...</p>";
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`);
    const data = await response.json();
    const cocktailData = data.drinks[0];
    if (cocktailData) {
      const ingredients = [];
      // This code shows me the ingredients of drinks
      for (let i = 1; i <= 15; i++) {
        if (cocktailData[`strIngredient${i}`]) {
          ingredients.push(`${cocktailData[`strIngredient${i}`]} - ${cocktailData[`strMeasure${i}`]}`);
        } else {
          break;
        }
      }
      // This code shows me the drinks I searched for
      const cocktailContainer = document.getElementById("cocktail-container");
      cocktailContainer.innerHTML = `
        <h2>${cocktailData.strDrink}</h2>
        <img src="${cocktailData.strDrinkThumb}" alt="${cocktailData.strDrink}">
        <p>Ingredients:</p>
        <ul>
          ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
        </ul>
        <button type="button" onclick="addToCart('${cocktailData.strDrink}', '${ingredients}')">Add to Shopping List</button>
      `;
    } else {
      document.getElementById("cocktail-container").innerHTML = "<p>No results founds.</p>";
    }
  } catch (error) {
    console.log(error);
    document.getElementById("cocktail-container").innerHTML = "<p>No results found.</p>";
  }
}

// This code helps me to add the ingredients to the shopping list 
function addToCart(cocktailName, ingredients) {
  const shoppingList = document.getElementById("shopping-list");
  const listItem = document.createElement("li");
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete";
  deleteButton.onclick = function () {
    shoppingList.removeChild(listItem);
  };
  listItem.innerHTML = `<strong>${cocktailName}</strong> - ${ingredients}`;
  listItem.appendChild(deleteButton);
  shoppingList.appendChild(listItem);
}

// This code is for printing the shopping list
function printList() {
  window.print();
}
