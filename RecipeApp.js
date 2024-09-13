const searchBtn = document.querySelector('.search-btn');
const searchDish = document.querySelector('#search-dish');
const recipeContainer = document.querySelector('.Recipe-container');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');
const recipeDetailContent = document.querySelector('.recipe-details-content');

const forRecipeFetch = async(query) => {
    recipeContainer.innerHTML = '<h2>Fetching Recipe<h2>';

    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
        recipeContainer.innerHTML = '';
        response.meals.forEach(meal => {
            console.log(meal);
            const recipeDiv = document.createElement('div');
    
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
                <img src="${meal.strMealThumb}">
                <h3>${meal.strMeal}</h3>
                <p><span>${meal.strArea}</span>Dish</p>
                <p>Belongs to <span>${meal.strCategory}<span></p>
            `
            const button = document.createElement('button');
            button.textContent = 'View Recipe';
            //adding event on button
            button.addEventListener('click', () => {
                openRecipePopUp(meal);
            });
    
            recipeDiv.appendChild(button);
            recipeContainer.appendChild(recipeDiv);
        })
    } catch (error) {
        recipeContainer.innerHTML = "<h2>Error in fetching recipe...</h2>"
    }
   
}

//fetch ingredient method
const fetchIngredient = (meal) => {
    let ingredientsList = "";
    for(let i=1; i<=20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientsList +=` <li>${measure} ${ingredient}</li>`
        }
        else {
            break;
        }
    }
    return ingredientsList;
}

const openRecipePopUp = (meal) => {
    recipeDetailContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingrgedients:</3>
    <ul class="recipeIngredient">${fetchIngredient(meal)}</ul>
    <div>
        <h3>Instrucitons:</h3>
        <p class="recipeInstructions">${meal.strInstructions}</p>
    </div>
    `
    recipeDetailContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener('click', () => {
    recipeDetailContent.parentElement.style.display = "none";
});

searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const searchInput = searchDish.value.trim();
    if(!searchInput) {
        recipeContainer.innerHTML =" <h2>Type the dish in input box</h2>"
        return;
    }
    forRecipeFetch(searchInput);
});