import { useSelector } from "react-redux";
import { selectCartItems } from "../ItemSlice";
import { remove, increase, decrease, reset } from "../ItemSlice";
import { useDispatch } from "react-redux";
import styles from "../styles/Home.module.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";





function ShoppingCartPage() {

const [hasBought, setHasBought] = useState(false);

  const dispatch = useDispatch();

  function buyItems(){
    setHasBought(true)
    dispatch(reset())
  }


  function removeItem(index) {
    dispatch(remove(index));
  }

  function increaseNumber(index) {
    dispatch(increase(index));
  }

  function decreaseNumber(index) {
    dispatch(decrease(index));
  }
  let selectedCartItems = useSelector(selectCartItems);

  useEffect(() => {
    // console.log(selectedCartItems, "selected");
  }, []);



  return (
    <div className={styles.shoppingCartPageWrapper}>
      {hasBought ? (
        <div className={styles.boughtWrapper}>
          <p>Thank you for your purchase!</p>
          <Link to="/">Home</Link>
        </div>
      ) : (
        <>
          {selectedCartItems.length ? (
            <div className={styles.shoppingPageWithItems}>
              <div className={styles.shoppingCartPageItemWrapper}>
                {selectedCartItems.map((item, index) => (
                  <div
                    className={[
                      styles.shoppingCartItem,
                      styles.shoppingCartPageItem,
                    ].join(" ")}
                    key={index}
                  >
                    <img src={item.image} />

                    <div className={styles.shoppingCartPageTitleWrapper}>
                      <p className={styles.shoppingCartPageTitle}>
                        {" "}
                        {item.title}
                      </p>
                      <div className={styles.shoppingCartPageNumber}>
                        <button onClick={() => increaseNumber(index)}>
                          <AddIcon sx={{ fontSize: "30px" }} />
                        </button>
                        <span>{item.number}</span>
                        <button onClick={() => decreaseNumber(index)}>
                          <RemoveIcon sx={{ fontSize: "30px" }} />
                        </button>
                      </div>
                    </div>


                    <span className={styles.shoppingCartPagePrice}>
                   
                      <p>${item.price * item.number}</p>
                    
                    <div className={styles.shoppingPageButtonWrapper}>
                      <button
                        onClick={() => removeItem(index)}
                        className={styles.closeButton}
                      >
                        <CloseIcon sx={{ fontSize: "40px" }} />
                      </button>
                    </div>
                    </span>

                  </div>
                ))}
              </div>
              <div
                className={[
                  styles.shoppingButtonWrapper,
                  styles.shoppingPageBuyButtonWrapper,
                ].join(" ")}
              >
                <div className={styles.shoppingPageTotalInfo}>
                  <p>
                    <span>Number of items: </span>{" "}
                    {selectedCartItems.reduce(
                      (sum, product) => product.number + sum,
                      0
                    )}
                  </p>
                  <p>
                    <span>Total price: </span>$
                    {Math.trunc(
                      selectedCartItems.reduce(
                        (sum, product) => product.number * product.price + sum,
                        0
                      ) * 100
                    ) / 100}
                  </p>
                </div>
                <button onClick={() => buyItems()}>Buy</button>
              </div>
            </div>
          ) : (
            <div className={styles.noItemsShoppingCart}>
              No items added to ur cart.
            </div>
          )}
        </>
      )}
    </div>
  );

}

export default ShoppingCartPage;
