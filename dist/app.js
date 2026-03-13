var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import { User } from "./user.js";
let meals = [];
let selectedMeals = [];
function getMeals() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = "https://keligmartin.github.io/api/meals.json";
        try {
            const response = yield fetch(apiUrl);
            if (!response.ok) {
                throw new Error("Erreur l'api de répond pas");
            }
            const data = yield response.json();
            return data;
        }
        catch (erreur) {
            return erreur.message;
        }
    });
}
function setMeals() {
    getMeals()
        .then((data) => {
        meals = data;
        const id = document.getElementById("mealList");
        data.forEach((meal) => {
            var _a, _b;
            const div = document.createElement("div");
            div.innerHTML = `<div class="m-2 bg-primary"><li class="list-unstyled">Repas: ${meal.name}</li><li class="list-unstyled" >Calories: ${meal.calories}</li>
        <li class="list-unstyled">Prix: ${meal.price}€</li><button class="orderMeal">Commander</button><button class="addToMenu">Ajouter au panier</button></div>`;
            (_a = div.querySelector(".orderMeal")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
                orderMeal(meal.id);
            });
            (_b = div.querySelector(".addToMenu")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
                addToMenu(meal);
            });
            id.appendChild(div);
        });
    })
        .catch((erreur) => {
        console.log("Erreur lors de l'attente de la promise");
    });
}
function orderMeal(id) {
    const currentMeal = meals.find((meal) => meal.id === id);
    if (currentMeal) {
        const meal = {
            id: currentMeal.id,
            name: currentMeal.name,
            price: currentMeal.price,
            calories: currentMeal.calories,
        };
        myUser.orderMeal(meal);
        setOrdersHistory();
        setUserWallet();
        setTotalOrdersCost();
    }
    else {
        console.log("Mauvais repas selectionné");
    }
}
function setUserWallet() {
    const wallet = localStorage.getItem("currentWallet");
    const idWallet = document.getElementById("userWallet");
    if (!idWallet) {
        console.log("idWallet n'existe pas");
    }
    else {
        if (wallet) {
            idWallet.innerHTML = "Mon Wallet: " + wallet;
        }
        else {
            idWallet.innerHTML = `Mon Wallet: ${String(myUser.wallet)}`;
        }
    }
}
function setOrdersHistory() {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const historyId = document.getElementById("ordersHistory");
    historyId.innerHTML = "";
    orders.forEach((order) => {
        const div = document.createElement("div");
        div.innerHTML += `<div class="m-2 bg-secondary"><li class="list-unstyled">Repas: ${order.meals[0].name}</li><li class="list-unstyled" >Calories: ${order.meals[0].calories}</li>
        <li class="list-unstyled">Prix: ${order.total}€</li></div>`;
        historyId.appendChild(div);
    });
}
function setTotalOrdersCost() {
    const costsOrders = document.getElementById("ordersTotal");
    const totalPrice = localStorage.getItem("totalPrice");
    if (costsOrders) {
        costsOrders.innerHTML = `Total du prix commandes: ${totalPrice} euros`;
    }
}
function addToMenu(meal) {
    selectedMeals.push(meal);
    const allOrder = document.getElementById("allOrder");
    allOrder.innerHTML += `${meal.name} + ${meal.price}euros <br>`;
    setTotalPriceForAllMenu();
    console.log(selectedMeals);
}
function setTotalPriceForAllMenu() {
    let totalPriceHT = 0;
    let totalPriceTTC = 0;
    selectedMeals.forEach((meal) => {
        totalPriceHT += meal.price;
        totalPriceTTC += meal.price * 2;
    });
    const ht = document.getElementById("menuTotalHT");
    const ttc = document.getElementById("menuTotalTTC");
    ht.innerHTML = `${totalPriceHT} euros`;
    ttc.innerHTML = `${totalPriceTTC} euros`;
}
function addMultipleOrders() {
    selectedMeals.forEach((meal) => {
        orderMeal(meal.id);
    });
    selectedMeals = [];
}
const wallet = localStorage.getItem("currentWallet");
const myUser = new User(0, "Thomas", wallet ? Number(wallet) : 5000);
(_a = document.getElementById("calculateMenuBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    addMultipleOrders();
});
setMeals();
setUserWallet();
setOrdersHistory();
setTotalOrdersCost();
