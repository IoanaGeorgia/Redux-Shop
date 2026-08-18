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
import RetourPolicy from "./components/RetourPolicy"
import PrivacyPolicy from "./components/PrivacyPolicy"
import TermsandConditions from "./components/TermsandConditions"

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
      { path: '/terms-and-conditions', element: <TermsandConditions /> }
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