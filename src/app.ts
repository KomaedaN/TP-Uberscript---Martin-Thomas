import { Meal } from "./meals";

async function getMeals(): Promise<Meal[]> {
  const apiUrl = "https://keligmartin.github.io/api/meals.json";
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Erreur l'api de répond pas");
    }
    const data: Meal[] = await response.json();
    return data;
  } catch (erreur: any) {
    return erreur.message;
  }
}

function setMeals() {
  getMeals()
    .then((data) => {
      const id = document.getElementById("mealList") as HTMLDataListElement;
      data.forEach((meal) => {
        id.innerHTML += `<li>${meal.name}</li><li>${meal.calories}</li><li>${meal.price}</li>`;
      });
    })
    .catch((erreur) => {
      console.log("Erreur lors de l'attente de la promise");
    });
}

setMeals();

console.log("test");
