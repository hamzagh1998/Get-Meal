const form = document.querySelector('form');
const result = document.getElementById('result');
const randomBtn = document.getElementById('random-btn');
const info = document.getElementById('info');
const ingredients = document.getElementById('ingredients');


// Display the result interface
function showResultUi(data) {
  result.innerHTML = '';
  data === null ? result.innerHTML = `
    <div class="col-md-12 text-center">
      <p>There is no search result, try agin!</p>
    </div>
  ` :
  data.forEach(meal => {
    result.innerHTML += `
      <div class="col-md-2 m-0 p-1">
        <div class="meal">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <div id="${meal.idMeal}" class="meal-info">
            <p id="${meal.idMeal}">${meal.strMeal}</p>
          </div>
        </div>
      </div>
    `;
  });
};

// Search meal by name could be many meals
function fecthMeals(meal) {
  result.innerHTML = `<p>Searching...</p>`;
  ingredients.innerHTML = ""
  info.innerHTML = ""
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    .then(response => response.json())
    .then(data => showResultUi(data.meals));
};

function showInfoUi(data) {
  data.forEach(meal => {
    info.innerHTML = `
      <div class="container">
        <hr color="#f2f2f2">
        <div class="row">
          <div class="col-md-4 text-center">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          </div>
          <div class="col-md-8">
            <h2 class="text-warning">${meal.strMeal}</h2>
            <p>${meal.strInstructions}</p>
            <p><a href="${meal.strYoutube}" target="_blank">Chek YouTube Video</a></p>
          </div>
        </div>
      </div>
    `;
  });

  // Add the ingredients to UI
  const ul = document.createElement('ul');
  for (let i=1; i<=20; i++) {
    ingredients.innerHTML = '<h3>ingredients</h3>';
    if (data[0][`strIngredient${i}`]) {
      ul.innerHTML += `<li>${data[0][`strIngredient${i}`]}</li>`;
    } else {
      ingredients.appendChild(ul);
      break;
    }
  };
};

// Search meal by id
function fecthMeal(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(response => response.json())
    .then(data => showInfoUi(data.meals));
};

/* ========= ========= ========== ========== */
function onClick(event) {
  const id = event.target.id;
  fecthMeal(id);
};

function onSubmit(event) {
  event.preventDefault();
  const text = event.target.querySelector('input').value;
  event.target.querySelector('input').value = '';
  fecthMeals(text);
};

form.addEventListener('submit', onSubmit);
result.addEventListener('click', onClick);
randomBtn.addEventListener('click', () => {
  result.innerHTML = "";
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(response => response.json())
    .then(data => showInfoUi(data.meals));
})
