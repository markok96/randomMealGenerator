const form = document.querySelector('.form-section');
const list = document.querySelector('.list');

const apiKey = 1;

form.addEventListener('click', (e) => {
    const url = `https://www.themealdb.com/api/json/v1/${apiKey}/random.php`

    fetch(url)
    .then(response => response.json())
    .then(data => {
        makeMeal(data.meals[0])
    });

    e.preventDefault();
});

function makeMeal(meal){
    const li = document.createElement('li');
    li.classList.add('meal');
    const name = meal.strMeal;
    const instructions = meal.strInstructions;
    const image = meal.strMealThumb;
    const video = meal.strYoutube;
    console.log(video.slice(-11));

    const ingredients = [];

    for(let i = 1; i <= 20; i++) {
        if(meal[`strIngredient${i}`]) {
            ingredients.push(` ${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        } else {
            break;
        }
    }

    const markup = `
        <h2 class="heading">${name}</h2>
        <p class="description">
            ${instructions}
        <p>
        <div class="row">
            <ul class="ingredients-list">
            <h2>Ingredients: </h2>
            ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <img src="${image}" alt="" class="meal-img">
            <iframe width="420" height="315" src="https://www.youtube.com/embed/${video.slice(-11)}" class="video"></iframe>
        </div>
    `
    li.innerHTML = markup;
    list.appendChild(li);
}