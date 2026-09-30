import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/index.css";

import store from './store'
import { Provider } from "react-redux";
import LandingPage from "./views/LandingPage";
import Items from "./views/Items";
import Contact from "./views/Contact";
import LogIn from "./views/LogIn";
import ShoppingCartPage from "./views/ShoppingCartPage";
import RetourPolicy from "./views/RetourPolicy";
import PrivacyPolicy from "./views/PrivacyPolicy";
import TermsandConditions from "./views/TermsandConditions";
import ProductPage from "./views/ProductPage";
import Home from "./views/Home";


const router = createBrowserRouter([
  {
    element: <Home />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/items", element: <Items /> },
      { path: "/contact", element: <Contact /> },
      { path: "/logIn", element: <LogIn /> },
      { path: '/cart', element: <ShoppingCartPage /> },
      { path: '/retour-policy', element: <RetourPolicy /> },
      { path: '/privacy-policy', element: <PrivacyPolicy /> },
      { path: '/terms-and-conditions', element: <TermsandConditions /> },
      { path: '/products/:id', element: <ProductPage /> }
      
    ],
  },
], {
  basename: import.meta.env.DEV ? "/" : "/Redux-Shop"
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);