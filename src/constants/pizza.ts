export const mapPizzaSize = {
    20: 'Аппарат',
    30: 'C маской Ywell',
    40: 'С маской Resmed',
  } as const;
  
  export const mapPizzaType = {
    1: 'аппарат',
    2: 'комплект',
  } as const;
  
  export const pizzaSizes = Object.entries(mapPizzaSize).map(([value, name]) => ({
    name,
    value,
  }));
  
  export const pizzaTypes = Object.entries(mapPizzaType).map(([value, name]) => ({
    name,
    value,
  }));
  
  export type PizzaSize = keyof typeof mapPizzaSize;
  export type PizzaType = keyof typeof mapPizzaType;
  