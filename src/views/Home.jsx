import { useLayoutEffect, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading"; 
import { userService } from "../services/userService";

function Home() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      await userService.fetchCurrentUser(dispatch);
      setIsCheckingAuth(false);
    };

    checkAuth();
  }, [dispatch]);

  useLayoutEffect(() => {
    const header = document.getElementById("header");
    if (header) {
      header.scrollIntoView();
    }
  }, [pathname]);

  if (isCheckingAuth) {
    return (
      <div className={styles.mainWrapper} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Loading size="lg" />
      </div>
    );
  }

  return (
    <div className={styles.mainWrapper}>
      <Header />
      <div className={styles.outletWrapper}>
        <Outlet />
      </div>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}

export default Home;