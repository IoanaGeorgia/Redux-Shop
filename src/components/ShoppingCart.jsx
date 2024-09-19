

import { useSelector } from "react-redux";
import { selectCartItems } from "../ItemSlice";
import { remove, increase, decrease } from "../ItemSlice";
import { useDispatch } from "react-redux";
import styles from '../styles/Home.module.css'
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link } from "react-router-dom";


function ShoppingCart(){





const dispatch = useDispatch();

  function removeItem(index){
    dispatch(remove(index))
  }

  
  function increaseNumber(index) {
    dispatch(increase(index));
  }

  
  function decreaseNumber(index) {
    dispatch(decrease(index));
  }
let selectedCartItems =useSelector(selectCartItems)

    return (
      <div className={styles.shoppingCartWrapper}>
        {selectedCartItems.length ? (
          <>
            <div className={styles.shoppingCartItemWrapper}>
              {selectedCartItems.map((item, index) => (
                <div className={styles.shoppingCartItem} key={index}>
                  <div className={styles.cartImageArea}>
                    <img src={item.image} />
                    <div>
                      <button
                        onClick={() => removeItem(index)}
                        className={styles.closeButton}
                      >
                        +
                      </button>
                      <p>${item.price * item.number}</p>
                    </div>
                  </div>
                  <div>
                    <p className={styles.shoppingCartTitle}> {item.title}</p>
                  </div>
                  <div className={styles.shoppingCartNumber}>
                    <button onClick={() => increaseNumber(index)}>
                      <AddIcon />
                    </button>
                    <span>{item.number}</span>
                    <button onClick={() => decreaseNumber(index)}>
                      <RemoveIcon/>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.shoppingButtonWrapper}>
              <button>
                <Link to="/contact">Contact</Link></button>

              <Link to="/cart">
              <button><ArrowOutwardIcon /></button>
              </Link>


            </div>
          </>
        ) : (
          <div className={styles.noItemsShoppingCart}>
          No items added to ur cart.
          </div>
        )}
      </div>
    );
}

export default ShoppingCart;