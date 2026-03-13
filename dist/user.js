import { notEnougthMoneyError } from "./errors.js";
export class User {
    constructor(id, name, wallet) {
        this.orders = [];
        this.id = id;
        this.name = name;
        this.wallet = wallet;
    }
    orderMeal(meal) {
        try {
            if (this.wallet < meal.price) {
                throw new notEnougthMoneyError(`pas assez d'argent sur le compte: il reste ${this.wallet} euros sur votre compte et le prix du plat est de ${meal.price} euros`);
            }
            this.wallet -= meal.price;
            this.addOrder(meal);
            console.log("commande validé solde restant: " + this.wallet);
        }
        catch (error) {
            console.log(error);
        }
    }
    addOrder(meal) {
        const order = {
            id: meal.id,
            meals: [meal],
            total: meal.price,
        };
        this.orders.push(order);
        const mealDraft = {
            name: meal.name,
            price: meal.price,
            calories: meal.calories,
        };
        const orderWithoutId = {
            meals: [mealDraft],
            total: meal.price,
        };
        const orderHistory = JSON.parse(localStorage.getItem("orders") || "[]");
        orderHistory.push(orderWithoutId);
        localStorage.setItem("orders", JSON.stringify(orderHistory));
        localStorage.setItem("currentWallet", String(this.wallet));
        localStorage.setItem("totalPrice", String(this.displayTotalOrdresCost()));
    }
    displayTotalOrdresCost() {
        let orders = JSON.parse(localStorage.getItem("orders") || "[]");
        let cost = 0;
        orders.forEach((order) => {
            cost += order.total;
        });
        return cost;
    }
}
