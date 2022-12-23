(() => {
  let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

  const createRecipe = (recipe) => {
    const recipeHTML = document.createElement("div");
    recipeHTML.id = `recipe-${recipe.id}`;

    recipeHTML.innerHTML = `<h3>${recipe.name}</h3>

      <ul>
        <li>${recipe.people} personnes</li>
        <li>${recipe.time} min.</li>
      </ul>

      <h5>Ingrédients</h5>
      <p>${recipe.ingredients}</p>

      <h5>Préparation</h5>
      <p>${recipe.preparation}</p>

      <a href="#" data-recipe-id="${recipe.id}" class="delete"><i>Supprimer</i></a>`;

    document.querySelector("#recipes").append(recipeHTML);

    document.querySelector(".delete").addEventListener("click", (e) => {
      e.preventDefault();

      const id = e.currentTarget.dataset.recipeId;

      recipes = recipes.filter((r) => {
        return r.id != id;
      });

      document.querySelector(`#recipe-${id}`).remove();

      localStorage.setItem("recipes", JSON.stringify(recipes));
    });
  };

  for (recipe of recipes) {
    createRecipe(recipe);
  }

  document.querySelector("#recipeForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("#name");
    const preparation = document.querySelector("#preparation");
    const ingredients = document.querySelector("#ingredients");
    const time = document.querySelector("#time");
    const people = document.querySelector("#people");

    const notification = document.querySelector(".notification");

    if (
      !name.value ||
      !preparation.value ||
      !ingredients.value ||
      !time.value ||
      !people.value
    ) {
      notification.innerHTML = "Vous devez remplir tous les champs";
      notification.style.display = "block";

      return;
    }

    notification.style.display = "none";

    let recipe = {
      id: Date.now(),
      name: name.value,
      preparation: preparation.value,
      ingredients: ingredients.value,
      time: time.value,
      people: people.value,
    };

    recipes.push(recipe);

    localStorage.setItem("recipes", JSON.stringify(recipes));

    createRecipe(recipe);

    name.value = "";
    preparation.value = "";
    ingredients.value = "";
    time.value = "";
    people.value = "";
  });
})();