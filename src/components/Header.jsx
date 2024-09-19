import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { Link } from "react-router-dom";
import ShoppingCart from "./ShoppingCart";
import { setAuthVals } from "../AuthSlice";
import { useDispatch } from "react-redux";
import { memo } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CallIcon from "@mui/icons-material/Call";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
 import { isMobile } from 'react-device-detect';
 import MenuIcon from "@mui/icons-material/Menu";
 import { createPortal } from "react-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation } from "react-router-dom";



function Header() {

    const [isCartOpened, openCart] = useState(false)
    const [isLoggedIn, setLogIn]  = useState(false)
    const [logInVals, setLogInVals] = useState({username:"", password:""})
    const [authLoader, setAuthLoader] = useState(false)
    const [isMobileMenu, openMobileMenu] = useState(false)
    const dispatch = useDispatch()

  const parentComponent = document.getElementById('root')
  let currentPath = useLocation()
  let path = currentPath.pathname


  function openCartFunction(){

    if(path !=='/cart'){
      openCart(!isCartOpened);
    }
    else{
      openCart(false)
    }
  }
  useEffect(()=>{
    if(path  === '/cart'){
      openCart(false)
    }
  }, [path])

    useEffect(()=>{

      setAuthLoader(true)

      const tempToken = localStorage.getItem("authVals");
      const token = JSON.parse(tempToken);


      if(token && Object.values(token).every(x => x !=="")){
        setLogIn(true)
        setLogInVals(token)
        dispatch(setAuthVals(token))
      } 
      setAuthLoader(false)

    },[])


  return (
    <header className={styles.mainHeader} id="header">
      <div className={styles.logo}>CasaFashion</div>

      {isMobile ? (
        <div className={styles.headerMenu}>
          <p onClick={() => openMobileMenu(true)}>
            <MenuIcon />
          </p>

          {isMobileMenu &&
            createPortal(
              <div className={styles.headerMobileMenuWrapper}>
                <button
                  className={styles.headerMobileClose}
                  onTouchStart={() => openMobileMenu(false)}
                >
                  <CloseIcon sx={{ fontSize: "46px" }} />
                </button>
                <Link to="/" onTouchStart={() => openMobileMenu(false)}>
                  Home
                </Link>
                <Link to="/contact" onTouchStart={() => openMobileMenu(false)}>
                  Contact
                </Link>
                <Link to="/items" onTouchStart={() => openMobileMenu(false)}>
                  Items
                </Link>
                <a onClick={() => openCart(!isCartOpened)}>Shopping Cart</a>

                {authLoader ? (
                  <div>loading</div>
                ) : (
                  <Link to="/logIn" onTouchStart={() => openMobileMenu(false)}>
                    {isLoggedIn ? (
                      <>Welcome, {logInVals.username}</>
                    ) : (
                      <>Account</>
                    )}
                  </Link>
                )}

                {isCartOpened ? (
                  <>
                    <ShoppingCart />
                  </>
                ) : (
                  <></>
                )}
              </div>,
              parentComponent
            )}
        </div>
      ) : (
        <span>
          <Link
            to="/"
            className={
              path == "/"
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
              path == "/contact"
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
              path == "/items"
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
              path == "/cart"
                ? [styles.landingText, styles.headerHighlightLink].join(" ")
                : ""
            }
          >
            <span className={styles.landingText}>Shopping Cart</span>
            <span className={styles.landingIcons}>
              <ShoppingCartIcon />
            </span>
          </a>

          {authLoader ? (
            <div>loading</div>
          ) : (
            <Link
              to="/logIn"
              className={
                path == "/logIn"
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
                  Welcome, {logInVals.username}
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

          {isCartOpened ? (
            <>
              <ShoppingCart />
            </>
          ) : (
            <></>
          )}
        </span>
      )}
    </header>
  );
}

export default memo(Header);
