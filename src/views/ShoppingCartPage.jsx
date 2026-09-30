import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, remove, increase, decrease, reset } from "../ItemSlice";
import { Link } from "react-router-dom";
import styles from "../styles/Home.module.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import { api } from "../services/apiService";

function ShoppingCartPage() {
  const dispatch = useDispatch();
  const selectedCartItems = useSelector(selectCartItems);

  const [hasBought, setHasBought] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [shippingAddress, setShippingAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [voucherId, setVoucherId] = useState("");

  const rawTotal = selectedCartItems.reduce(
    (sum, item) => item.number * item.price + sum,
    0
  );
  const totalSum = Math.trunc(rawTotal * 100) / 100;

  const totalItemsCount = selectedCartItems.reduce(
    (sum, item) => item.number + sum,
    0
  );

  const removeItem = (index) => dispatch(remove(index));
  const increaseNumber = (index) => dispatch(increase(index));
  const decreaseNumber = (index) => dispatch(decrease(index));

  const handleCheckout = async (e) => {
    e.preventDefault();

    const finalBillingAddress = sameAsShipping ? shippingAddress : billingAddress;

    if (!shippingAddress || !finalBillingAddress) {
      setErrorMessage("Please complete all required address fields.");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    try {
      const payloadItems = selectedCartItems.map((item) => ({
        id: item.id,
        variantId: item.variantId || null, 
        quantity: item.number,
        price: item.price,
      }));

      console.log(payloadItems, 'pay');

      await api.post("/api/order", {
        totalSum,
        shippingAddress,
        billingAddress: finalBillingAddress,
        items: payloadItems,
        voucherId: voucherId || null,
      }, {}, true);

      setHasBought(true);
      dispatch(reset());
    } catch (err) {
      setErrorMessage(err.message || "Failed to process order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.shoppingCartPageWrapper}>
      {hasBought ? (
        <div className={styles.boughtWrapper}>
          <h2>Thank you for your purchase!</h2>
          <p>Your order has been placed successfully.</p>
          <Link to="/" className={styles.homeBtn}>
            Back to Home
          </Link>
        </div>
      ) : (
        <>
          {selectedCartItems.length ? (
            <div className={styles.shoppingPageWithItems}>
              <div className={styles.shoppingCartPageItemWrapper}>
                {selectedCartItems.map((item, index) => (
                  <div
                    className={`${styles.shoppingCartItem} ${styles.shoppingCartPageItem}`}
                    key={item.variantId ? `${item.id}-${item.variantId}` : item.id || index}
                  >
                    <img src={item.image} alt={item.title || item.name} />

                    <div className={styles.shoppingCartPageTitleWrapper}>
                      <p className={styles.shoppingCartPageTitle}>{item.title || item.name}</p>
                      <div className={styles.shoppingCartPageNumber}>
                        <button type="button" onClick={() => decreaseNumber(index)}>
                          <RemoveIcon sx={{ fontSize: "20px", fill:'#000' }} />
                        </button>
                        <span>{item.number}</span>
                        <button type="button" onClick={() => increaseNumber(index)}>
                          <AddIcon sx={{ fontSize: "20px", fill:"#000" }} />
                        </button>
                      </div>
                    </div>

                    <span className={styles.shoppingCartPagePrice}>
                      <p>${(item.price * item.number).toFixed(2)}</p>
                      <div className={styles.shoppingPageButtonWrapper}>
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className={styles.closeButton}
                        >
                          <CloseIcon sx={{ fontSize: "24px" }} />
                        </button>
                      </div>
                    </span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleCheckout} className={styles.checkoutFormWrapper}>
                <h3>Order Checkout</h3>

                <div className={styles.formGroup}>
                  <label htmlFor="shippingAddress">Shipping Address *</label>
                  <textarea
                    id="shippingAddress"
                    rows="3"
                    placeholder="Enter your street, city, state, and postal code"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.checkboxGroup}>
                  <input
                    type="checkbox"
                    id="sameAsShipping"
                    checked={sameAsShipping}
                    onChange={(e) => setSameAsShipping(e.target.checked)}
                  />
                  <label htmlFor="sameAsShipping">
                    Billing address is the same as shipping
                  </label>
                </div>

                {!sameAsShipping && (
                  <div className={styles.formGroup}>
                    <label htmlFor="billingAddress">Billing Address *</label>
                    <textarea
                      id="billingAddress"
                      rows="3"
                      placeholder="Enter billing address"
                      value={billingAddress}
                      onChange={(e) => setBillingAddress(e.target.value)}
                      required
                    />
                  </div>
                )}

                <div className={styles.formGroup}>
                  <label htmlFor="voucherId">Voucher / Discount Code</label>
                  <input
                    type="text"
                    id="voucherId"
                    placeholder="e.g. SUMMER10 (Optional)"
                    value={voucherId}
                    onChange={(e) => setVoucherId(e.target.value)}
                  />
                </div>

                <div className={styles.shoppingPageTotalInfo}>
                  <p>
                    <span>Total items:</span> {totalItemsCount}
                  </p>
                  <p className={styles.totalPriceText}>
                    <span>Total price:</span> ${totalSum.toFixed(2)}
                  </p>
                </div>

                {errorMessage && <p className={styles.formError}>{errorMessage}</p>}

                <button
                  type="submit"
                  className={styles.placeOrderBtn}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Place Order"}
                </button>
              </form>
            </div>
          ) : (
            <div className={styles.noItemsShoppingCart}>
              <h2>Your shopping cart is empty</h2>
              <Link to="/items" className={styles.homeBtn}>
                Browse Products
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ShoppingCartPage;