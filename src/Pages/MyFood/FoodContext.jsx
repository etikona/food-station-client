import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const FoodContext = createContext();

export const useFoodContext = () => useContext(FoodContext);

export const FoodProvider = ({ children }) => {
  const [foods, setFoods] = useState([]);
  const userId = localStorage.getItem("userId"); // Assuming userId is stored

  useEffect(() => {
    // Fetch foods when component mounts
    const fetchFoods = async () => {
      try {
        const response = await axios.get(`/api/foods?userId=${userId}`);
        setFoods(response.data);
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    };
    fetchFoods();
  }, [userId]);

  const updateFood = (updatedFood) => {
    setFoods(
      foods.map((food) => (food.id === updatedFood.id ? updatedFood : food))
    );
  };

  const deleteFood = (foodId) => {
    setFoods(foods.filter((food) => food.id !== foodId));
  };

  return (
    <FoodContext.Provider value={{ foods, updateFood, deleteFood }}>
      {children}
    </FoodContext.Provider>
  );
};
