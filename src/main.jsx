import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/index.css";
import Home from "./components/Home";
import Items from "./components/Items";
import LandingPage from "./components/LandingPage";
import ShoppingCartPage from "./components/ShoppingCartPage";
import store from './store'
import { Provider } from "react-redux";
import Contact from "./components/Contact";
import LogIn from "./components/LogIn";
import App from "./App";
const router = createBrowserRouter([
  {
    element: <Home />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
        
      },
      {
        path: "/items",
        element: <Items />,
      },
      {
        path:"/contact",
        element: <Contact />
      },
      {
        path:"/logIn",
        element: < LogIn />
      },
      {
        path: '/cart',
        element: <ShoppingCartPage/>
      }
    ],
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
          <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
