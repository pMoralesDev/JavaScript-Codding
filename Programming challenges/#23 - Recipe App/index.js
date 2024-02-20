const resultContainer = document.getElementById('result'),
searchBtn = document.getElementById('search-button'),
searchInput = document.getElementById('search-input'),
searchContainer = document.querySelector('search-box')

/**API */
const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

function searchMeal(){
    const userInput = searchInput.value.trim()
    if(!userInput){
        resultContainer.innerHTML='<h3>Input Failed, this field cannot be empty</h3>'
        return
    }
    fetch(apiUrl + userInput).then((response) => 
        response.json()).then((data) => {
            const meal = data.meals[0]
            /**Cuando no se encuentra la comida buscada */
            if(!meal){
                resultContainer.innerHTML = "<h3>Your meal hasn't found, Please try with other meal</h3>"
                return
            }
            const ingredients = getingredientes(meal)
            /**Generamos un HTML para mostrar los datos de los ingredientes */
            const recipeHTML = `
                <div class="details">
                    <h2>${meal.strMeal}</h2>
                    <h4>${meal.strArea}</h4>
                </div>
                <img src=${meal.strMealThumb} alt)${meal.strMeal} />
                <div id="ingredients-container">
                    <h3>Ingredientes</h3>
                    <ul>${ingredients}</ul>
                </div>
                <div id"recipe">
                    <button id="hide-recipe">X</button>
                    <pre id="instructions">${meal.strInstructions}</pre>
                </div>
                <button id="show-recipe">View Recipe</button>
            `
            resultContainer.innerHTML = recipeHTML

            const hideRecipeBtn = document.getElementById('hide-recipe')
            const showRecipeBtn = document.getElementById('show-recipe')
            hideRecipeBtn.addEventListener('click', hideRecipe)
            showRecipeBtn.addEventListener('click',showRecipe)
            searchContainer.style.opacity = '0'
            searchContainer.style.display = 'none'

    }).catch(() => {
        searchContainer.style.opacity = '1' 
        searchContainer.style.display = 'grid'
        resultContainer.innerHTML = '<h3>Error fetching data!</h3>'
    })
}

function getIngredients(meal){
    let ingredientsHTML = ""
    for (let i=1; i <= 20; i++){
        const ingredient = meal[`strIngredient${i}`]
        if(ingredient){
            const measure = meal [`strMeasure${i}`]
            ingredientsHTML += `<li>${measure} ${ingredient}</li>`
        }else{
            break
        }
    }
    return ingredientsHTML
}

function hideRecipe() {
    const recipe = document.getElementById('recipe')
    recipe.style.display='none'
}

function showRecipe(){
    const recipe = document.getElementById('recipe')
    recipe.style.display='block'
}

searchBtn.addEventListener('click', searchMeal)
searchInput.addEventListener('keydown', function(e){
    if(e.keyCode === 13){
        e.preventDefault()
        searchMeal()
    }
})

