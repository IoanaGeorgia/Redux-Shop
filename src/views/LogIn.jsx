import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authGlobalVals, setAuthVals } from "../AuthSlice";
import styles from "../styles/LogIn.module.css";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Loading from "../components/Loading";
import { api } from "../services/apiService";

export default function LogIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userVals = useSelector(authGlobalVals);

  const [isLogIn, setIsLogIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisiblePass, setIsVisiblePass] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState("");

  const [ordersHistory, setOrdersHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [historyError, setHistoryError] = useState("");

  const [loginVals, setLoginVals] = useState({
    email: "",
    password: "",
  });

  const [registerVals, setRegisterVals] = useState({
    username: "",
    email: "",
    password: "",
    termsAccepted: false,
  });

  useEffect(() => {
    if (userVals?.username || userVals?.email) {
      console.log('aaahhh')
      fetchOrderHistory();
    }
  }, [userVals]);

  const fetchOrderHistory = async () => {
    try {
      setIsLoadingHistory(true);
      setHistoryError(""); 

      const response = await api.get("/api/user/history", {}, true);
      const resData = response.data;

      if (resData?.userHistory) {
        setOrdersHistory(resData.userHistory);
      } else{
        setOrdersHistory([]);
      }
    } catch (e) {
      console.error("Eroare la preluarea istoricului:", e);
      setHistoryError(
        e.message || "Failed to load order history. Please try again later."
      );
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginVals((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterVals((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginVals.email || !loginVals.password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }
    setErrorMessage("");
    loginCall();
  };

  const loginCall = async () => {
    try {
      setIsLoading(true);
      const response = await api.post(`/api/auth/login`, loginVals, {}, true);
      const computedData = response.data || response;

      if (computedData) {
        const userData = computedData.user || computedData;
        dispatch(setAuthVals(userData));
      }
      setIsLoading(false);
      setIsSuccess("You have successfully logged in");
    } catch (e) {
      setIsLoading(false);
      setErrorMessage(e.message || "An unexpected error occurred. Please try again.");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setIsSuccess("");

    if (!registerVals.username || !registerVals.email || !registerVals.password) {
      setErrorMessage("Please complete all fields.");
      return;
    }

    if (!registerVals.termsAccepted) {
      setErrorMessage("You must accept the Terms and Conditions to proceed.");
      return;
    }

    setErrorMessage("");
    registerCall();
  };

  const registerCall = async () => {
    try {
      setIsLoading(true);
      const response = await api.post(`/api/auth/register`, registerVals, {}, true);
      const computedData = response.data || response;

      if (computedData) {
        const userData = computedData.user || computedData;
        dispatch(setAuthVals(userData));
      }
      setIsLoading(false);
      setIsSuccess("You have successfully registered");
    } catch (e) {
      setIsLoading(false);
      setErrorMessage(e.message || "An unexpected error occurred. Please try again.");
    }
  };

  const handleLogOut = async () => {
    try {
      setIsLoading(true);
      await api.post(`/api/auth/logout`, {}, {}, true);
      dispatch(setAuthVals({}));
      setOrdersHistory([]);
      setHistoryError("");
      setIsLoading(false);
      navigate("/");
    } catch (e) {
      setIsLoading(false);
      setErrorMessage(e.message || "An unexpected error occurred. Please try again.");
    }
  };

  const capitalise = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("ro-RO", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className={styles.wrapper}>
      {userVals.username || userVals.email ? (
        <div className={styles.loggedInWrapper}>
          <div className={styles.loggedInWrapperInfo}>
            <p className={styles.welcomeTitle}>
              Welcome back, {capitalise(userVals.username || userVals.email)}!
            </p>

            <div className={styles.navLinks}>
              <div>
                <p>Check out our newest products here:</p>
                <Link to="/items">Items</Link>
              </div>

              <div>
                <p>If you have a message for us, you can send it here:</p>
                <Link to="/contact">Contact</Link>
              </div>

              <div>
                <p>If you want to check your shopping cart, click here:</p>
                <Link to="/cart">Shopping Cart</Link>
              </div>

              <div>
                <p>If you want to log out from your account, you can do it here:</p>
                <button className={styles.logoutButton} onClick={handleLogOut}>
                  Log out
                </button>
              </div>
            </div>

            <div className={styles.ordersSection}>
              <h3>Order History</h3>

              {isLoadingHistory ? (
                <Loading size="sm" />
              ) : historyError ? (
                <div className={styles.historyErrorContainer}>
                  <p className={styles.formError}>{historyError}</p>
                  <button 
                    type="button" 
                    className={styles.retryButton} 
                    onClick={fetchOrderHistory}
                  >
                    Try Again
                  </button>
                </div>
              ) : ordersHistory.length === 0 ? (
                <p className={styles.noOrders}>You haven't placed any orders yet.</p>
              ) : (
                <div className={styles.ordersList}>
                  {ordersHistory.map((order) => (
                    <div key={order.id} className={styles.orderCard}>
                      <div className={styles.orderHeader}>
                        <div>
                          <span className={styles.orderId}>Order #{order.id}</span>
                          {order.createdAt && (
                            <span className={styles.orderDate}>
                              {" "}• {formatDate(order.createdAt)}
                            </span>
                          )}
                        </div>
                        <span className={`${styles.orderStatus} ${styles[order.status]}`}>
                          {order.status}
                        </span>
                      </div>

                      <div className={styles.orderItems}>
                        {order.items &&
                          order.items.map((item) => (
                            <div key={item.id} className={styles.orderItem}>
                              <img
                                src={
                                  item.ProductVariant?.image
                                }
                                alt={item.Product?.name || "Product"}
                                className={styles.productThumb}
                              />
                              <div className={styles.itemDetails}>
                                <p className={styles.productName}>
                                  {item.Product?.name ||
                                    `Product #${item.productId}`}
                                </p>
                                <p className={styles.productQtyPrice}>
                                  {item.quantity} x {item.price} RON
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>

                      <div className={styles.orderFooter}>
                        <span>Total:</span>
                        <strong className={styles.orderTotal}>
                          {order.totalSum} RON
                        </strong>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={styles.imageWrapper}></div>
        </div>
      ) : (
        <div className={styles.formWrapper}>
          {isLogIn ? (
            <form onSubmit={handleLogin}>
              <h2>Log In</h2>

              <p>Email:</p>
              <input
                type="email"
                placeholder="Enter email"
                name="email"
                value={loginVals.email}
                onChange={handleLoginChange}
              />

              <p>Password:</p>
              <div className={styles.inputSpan}>
                <input
                  type={isVisiblePass ? "text" : "password"}
                  placeholder="Enter password"
                  name="password"
                  value={loginVals.password}
                  onChange={handleLoginChange}
                />
                {isVisiblePass ? (
                  <VisibilityOffIcon onClick={() => setIsVisiblePass(false)} />
                ) : (
                  <VisibilityIcon onClick={() => setIsVisiblePass(true)} />
                )}
              </div>

              {errorMessage && <p className={styles.formError}>{errorMessage}</p>}
              {isSuccess && <p className={styles.formSuccess}>{isSuccess}</p>}

              {isLoading && <Loading size="sm" />}
              <button type="submit">Log In</button>

              <div className={styles.logInChange}>
                or{" "}
                <button
                  type="button"
                  className={styles.linkButton}
                  onClick={() => {
                    setErrorMessage("");
                    setIsLogIn(false);
                  }}
                >
                  Create Account
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <h2>Create Account</h2>

              <p>Username:</p>
              <input
                type="text"
                maxLength="15"
                placeholder="Pick a username"
                name="username"
                value={registerVals.username}
                onChange={handleRegisterChange}
              />

              <p>Email:</p>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={registerVals.email}
                onChange={handleRegisterChange}
              />

              <p>Password:</p>
              <div className={styles.inputSpan}>
                <input
                  type={isVisiblePass ? "text" : "password"}
                  placeholder="Pick a password"
                  name="password"
                  value={registerVals.password}
                  onChange={handleRegisterChange}
                />
                {isVisiblePass ? (
                  <VisibilityOffIcon onClick={() => setIsVisiblePass(false)} />
                ) : (
                  <VisibilityIcon onClick={() => setIsVisiblePass(true)} />
                )}
              </div>

              <div className={styles.termsWrapper}>
                <input
                  type="checkbox"
                  id="termsAccepted"
                  name="termsAccepted"
                  checked={registerVals.termsAccepted}
                  onChange={handleRegisterChange}
                />
                <label htmlFor="termsAccepted">
                  <p>
                    I agree to the Terms of Service: I will use this store for personal,
                    lawful purposes only and refrain from unauthorized reselling or fraudulent
                    activities.
                  </p>
                </label>
              </div>

              {errorMessage && <p className={styles.formError}>{errorMessage}</p>}
              {isSuccess && <p className={styles.formSuccess}>{isSuccess}</p>}

              {isLoading && <Loading size="sm" />}
              <button type="submit">Create Account</button>

              <div className={styles.logInChange}>
                or{" "}
                <button
                  type="button"
                  className={styles.linkButton}
                  onClick={() => {
                    setErrorMessage("");
                    setIsLogIn(true);
                  }}
                >
                  Log In
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}