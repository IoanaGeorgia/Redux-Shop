import { useState, useLayoutEffect } from "react";
import styles from '../styles/Home.module.css'
import { Outlet, ScrollRestoration} from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from './Footer';
function Home(){
       const { pathname } = useLocation();

       useLayoutEffect(() => {
          const header = document.getElementById("header");
         header.scrollIntoView() //magic code to scroll into view
       }, [pathname]);

    return (
      <div className={styles.mainWrapper}>
        <Header/>
          <div className={styles.outletWrapper}>
        <Outlet /> 
        </div>
        {/* component whose role is to fill in the void for smaller components that move */}
        <Footer />
        <ScrollRestoration />
      </div>
    );
}

export default Home;