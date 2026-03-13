export interface Meal {
  id: number;
  name: string;
  calories: number;
  price: number;
}

export interface Order {
  id: number;
  meals: Meal[];
  total: number;
}

export type MealDraft = Partial<Meal>;
export type OrderWithoutId = Omit<Order, "id">;
