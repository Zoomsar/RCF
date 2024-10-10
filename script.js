// Fetch a random cocktail when the page loads
window.onload = function () {
    fetchRandomCocktail();
};

async function fetchRandomCocktail() {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const response = await fetch(url);
    const data = await response.json();
    displayCocktail(data);
}

function displayCocktail(data) {
    const resultDiv = document.getElementById('cocktailResult');
    resultDiv.innerHTML = ''; // Clear previous results

    if (data.drinks) {
        const cocktail = data.drinks[0];

        // Set random color and font for the cocktail name
        const randomColor = getRandomColor();
        const randomFont = getRandomFont();

        // Create the cocktail name with styles
        const cocktailNameElement = document.createElement('h2');
        cocktailNameElement.innerText = cocktail.strDrink;
        cocktailNameElement.style.color = randomColor;
        cocktailNameElement.style.fontFamily = randomFont;

        resultDiv.appendChild(cocktailNameElement);
        resultDiv.innerHTML += `
            <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
            <h3>Ingredients:</h3>
            <ul>
                ${getIngredients(cocktail).map(ingredient => `
                    <li>
                        <img src="${getIngredientImage(ingredient.name)}" alt="${ingredient.name}" style="width: 30px; height: 30px; margin-right: 10px;">
                        ${ingredient.name} - ${ingredient.measure}
                    </li>`).join('')}
            </ul>
            <h3>Instructions:</h3>
            <p>${cocktail.strInstructions}</p>
        `;
    } else {
        resultDiv.innerHTML = '<p>No cocktail found.</p>';
    }
}

function getIngredients(cocktail) {
    let ingredients = [];
    for (let i = 1; i <= 15; i++) {
        const ingredient = cocktail[`strIngredient${i}`];
        if (ingredient) {
            const measure = cocktail[`strMeasure${i}`] || '';
            ingredients.push({ name: ingredient, measure: measure });
        }
    }
    return ingredients;
}

// Get the ingredient image from the API
function getIngredientImage(ingredient) {
    return `https://www.thecocktaildb.com/images/ingredients/${encodeURIComponent(ingredient)}.png`;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomFont() {
    const fonts = ['Arial', 'Verdana', 'Courier New', 'Georgia', 'Times New Roman', 'Trebuchet MS', 'Lucida Console'];
    return fonts[Math.floor(Math.random() * fonts.length)];
}
