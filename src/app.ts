import { Meal } from "./meals";
import { User } from "./user.js";
import { Order } from "./meals";
import { fetchError } from "./errors.js";

let meals: Meal[] = [];

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
      meals = data;
      const id = document.getElementById("mealList") as HTMLDataListElement;
      data.forEach((meal) => {
        const div = document.createElement("div");
        div.innerHTML = `<div class="m-2 bg-primary"><li class="list-unstyled">Repas: ${meal.name}</li><li class="list-unstyled" >Calories: ${meal.calories}</li>
        <li class="list-unstyled">Prix: ${meal.price}€</li><button class="orderMeal">Commander</button></div>`;

        div.querySelector(".orderMeal")?.addEventListener("click", () => {
          orderMeal(meal.id);
        });
        id.appendChild(div);
      });
    })
    .catch((erreur) => {
      console.log("Erreur lors de l'attente de la promise");
    });
}

function orderMeal(id: number) {
  const currentMeal = meals.find((meal) => meal.id === id);
  if (currentMeal) {
    const meal: Meal = {
      id: currentMeal.id,
      name: currentMeal.name,
      price: currentMeal.price,
      calories: currentMeal.calories,
    };
    thomas.orderMeal(meal);
  } else {
    console.log("Mauvais repas selectionné");
  }
}

function setUserWallet() {
  try {
    const wallet = localStorage.getItem("currentWallet");
    if (wallet) {
      document.getElementById("userWallet");
    }
    const data: Meal[] = await response.json();
    return data;
  } catch (erreur: any) {
    return erreur.message;
  }
}
const thomas = new User(0, "Thomas", 5000);
setMeals();
setUserWallet();
