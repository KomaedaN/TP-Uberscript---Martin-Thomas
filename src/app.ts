import { Meal, OrderWithoutId } from "./meals";
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
    myUser.orderMeal(meal);
    setOrdersHistory();
    setUserWallet();
  } else {
    console.log("Mauvais repas selectionné");
  }
}

function setUserWallet() {
  const wallet = localStorage.getItem("currentWallet");
  const idWallet = document.getElementById("userWallet");
  if (!idWallet) {
    console.log("idWallet n'existe pas");
  } else {
    if (wallet) {
      idWallet.innerHTML = "Mon Wallet: " + wallet;
    } else {
      idWallet.innerHTML = `Mon Wallet: ${String(myUser.wallet)}`;
    }
  }
}

function setOrdersHistory() {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  const historyId = document.getElementById(
    "ordersHistory",
  ) as HTMLDataListElement;
  historyId.innerHTML = "";
  orders.forEach((order: OrderWithoutId) => {
    const div = document.createElement("div");
    div.innerHTML += `<div class="m-2 bg-secondary"><li class="list-unstyled">Repas: ${order.meals[0].name}</li><li class="list-unstyled" >Calories: ${order.meals[0].calories}</li>
        <li class="list-unstyled">Prix: ${order.total}€</li></div>`;
    historyId.appendChild(div);
  });
}

const wallet = localStorage.getItem("currentWallet");
const myUser = new User(0, "Thomas", wallet ? Number(wallet) : 5000);
setMeals();
setUserWallet();
setOrdersHistory();
