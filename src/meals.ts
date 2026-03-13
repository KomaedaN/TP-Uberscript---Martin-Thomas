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
