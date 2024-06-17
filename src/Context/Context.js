import { createContext, useReducer, useEffect } from "react";
// import { useFetch } from "../Hooks/useFetch";

export const UserContext = createContext("");

// ==================Counter Cart====================
export const CounterCartContext = createContext();

const initialState = { count: 0 };
const reduser = (state, action) => {
  switch (action.type) {
    case "InitializeCart":
      return { count: action.payload };
    case "Increase":
      return { count: state.count + 1 };
    case "Decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

export const CountProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reduser, initialState);

  useEffect(() => {
    const tokenUser = JSON.parse(localStorage.getItem("token"));
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${tokenUser}`,
      },
    };
    fetch(`http://localhost:8000/users/cart/products`, options)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch({ type: "InitializeCart", payload: data.length });
      });
  }, []);
  return (
    <CounterCartContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterCartContext.Provider>
  );
};
export default CountProvider;
