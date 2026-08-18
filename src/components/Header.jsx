import { useState, useEffect, memo } from "react";
import styles from "../styles/Home.module.css";
import { Link, useLocation } from "react-router-dom";
import ShoppingCart from "./ShoppingCart";
import { setAuthVals } from "../AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CallIcon from "@mui/icons-material/Call";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import { isMobile } from "react-device-detect";
import MenuIcon from "@mui/icons-material/Menu";
import { createPortal } from "react-dom";
import CloseIcon from "@mui/icons-material/Close";
import { selectCartItems } from "../ItemSlice";

function Header() {
  const [isCartOpened, openCart] = useState(false);
  const [isLoggedIn, setLogIn] = useState(false);
  const [logInVals, setLogInVals] = useState({ username: "", password: "" });
  const [authLoader, setAuthLoader] = useState(false);
  const [isMobileMenu, openMobileMenu] = useState(false);
  const dispatch = useDispatch();

  const parentComponent = document.getElementById("root");
  let currentPath = useLocation();
  let path = currentPath.pathname;

  const items = useSelector(selectCartItems);

  function openCartFunction() {
    if (path !== "/cart") {
      openCart(!isCartOpened);
    } else {
      openCart(false);
    }
  }

  useEffect(() => {
    if (path === "/cart") {
      openCart(false);
    }
  }, [path]);

  useEffect(() => {
    setAuthLoader(true);

    const tempToken = localStorage.getItem("authVals");
    if (tempToken) {
      try {
        const token = JSON.parse(tempToken);
        if (token && Object.values(token).every((x) => x !== "")) {
          setLogIn(true);
          setLogInVals(token);
          dispatch(setAuthVals(token));
        }
      } catch (e) {
        console.error("Failed to parse auth token", e);
      }
    }
    setAuthLoader(false);
  }, [dispatch]);

  const renderMenuPortal = () =>
    isMobileMenu &&
    parentComponent &&
    createPortal(
      <div className={styles.headerMobileMenuWrapper}>
        <button
          className={styles.headerMobileClose}
          onClick={() => openMobileMenu(false)}
        >
          <CloseIcon sx={{ fontSize: "46px" }} />
        </button>
        <Link
          to="/"
          onClick={() => openMobileMenu(false)}
        >
          Home
        </Link>
        <Link
          to="/contact"
          onClick={() => openMobileMenu(false)}
        >
          Contact
        </Link>
        <Link
          to="/items"
          onClick={() => openMobileMenu(false)}
        >
          Items
        </Link>
        
        <Link
          to="/cart"
          onClick={() => openMobileMenu(false)}
          className={styles.shoppingBtn}
        >
          Shopping Cart
          {items.length > 0 && (
            <span className={styles.itemsNumber}>{items.length}</span>
          )}
        </Link>

        {authLoader ? (
          <div>loading</div>
        ) : (
          <Link
            to="/logIn"
            onClick={() => openMobileMenu(false)}
          >
            {isLoggedIn ? (
              <>
                Welcome,{" "}
                <span className={styles.username}>{logInVals.username}</span>
              </>
            ) : (
              <>Account</>
            )}
          </Link>
        )}
      </div>,
      parentComponent
    );

  return (
    <header className={styles.mainHeader} id="header">
      <Link to="/" className={styles.logo}>
        <div>CasaFashion</div>
      </Link>

        <span>
          <Link
            to="/"
            className={
              path === "/"
                ? [styles.landingText, styles.headerHighlightLink].join(" ")
                : ""
            }
          >
            <span className={styles.landingText}>Home</span>
            <span className={styles.landingIcons}>
              <HomeIcon />
            </span>
          </Link>

          <Link
            to="/contact"
            className={
              path === "/contact"
                ? [styles.landingText, styles.headerHighlightLink].join(" ")
                : ""
            }
          >
            <span className={styles.landingText}>Contact</span>
            <span className={styles.landingIcons}>
              <CallIcon />
            </span>
          </Link>

          <Link
            to="/items"
            className={
              path === "/items"
                ? [styles.landingText, styles.headerHighlightLink].join(" ")
                : ""
            }
          >
            <span className={styles.landingText}>Items</span>
            <span className={styles.landingIcons}>
              <StoreIcon />
            </span>
          </Link>

          <a
            onClick={() => openCartFunction()}
            className={
              path === "/cart"
                ? [styles.landingText, styles.headerHighlightLink].join(" ")
                : ""
            }
          >
            <span className={styles.landingText}>
              <a
                onClick={(e) => {
                  e.stopPropagation();
                  openCart(!isCartOpened);
                }}
                className={styles.shoppingBtn}
              >
                Shopping Cart
                {items.length > 0 && (
                  <span className={styles.itemsNumber}>{items.length}</span>
                )}
              </a>
            </span>
            <span className={styles.landingIcons}>
              <ShoppingCartIcon />
              {items.length > 0 && (
                <span className={styles.itemsNumber}>{items.length}</span>
              )}
            </span>
          </a>

          {authLoader ? (
            <div>loading</div>
          ) : (
            <Link
              to="/logIn"
              className={
                path === "/logIn"
                  ? [
                      styles.landingText,
                      styles.headerHighlightLink,
                      styles.truncate,
                    ].join(" ")
                  : [styles.landingText]
              }
            >
              {isLoggedIn ? (
                <span className={styles.truncate}>
                  Welcome,{" "}
                  <span className={styles.username}>{logInVals.username}</span>
                </span>
              ) : (
                <>
                  <span className={styles.landingText}>Account</span>
                  <span className={styles.landingIcons}>
                    <AccountCircle />
                  </span>
                </>
              )}
            </Link>
          )}

          <button
            type="button"
            className={styles.desktopMenuBtn}
            onClick={() => openMobileMenu(true)}
          >
            <MenuIcon />
          </button>

          {isCartOpened && <ShoppingCart />}
          {renderMenuPortal()}
        </span>
  
    </header>
  );
}

export default memo(Header);