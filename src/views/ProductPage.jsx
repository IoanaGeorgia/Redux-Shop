import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/ProductPage.module.css";
import { api } from "../services/apiService";
import { useDispatch, useSelector } from "react-redux"; 
import { add, selectCartItems } from "../ItemSlice"; 
import Loading from "../components/Loading";

function ProductPage() {
  const [product, setProduct] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);

  useEffect(() => {
    const controller = new AbortController();

    async function callForItems() {
      setIsError(false);
      setIsLoading(true);

      try {
        const response = await api.get(`/api/products/${id}`, { signal: controller.signal });
        const computedData = response.data || response;

        setProduct(computedData);

        if (computedData?.variants?.[0]?.combinations) {
          setSelectedOptions(computedData.variants[0].combinations);
        }
      } catch (e) {
        if (e.name !== 'AbortError') {
          setIsError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    callForItems();

    return () => {
      controller.abort();
    };
  }, [id]);

  const activeVariant = product?.variants?.find((variant) =>
    Object.entries(selectedOptions).every(
      ([key, value]) => variant.combinations[key] === value
    )
  );

  const handleOptionChange = (optionName, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: value,
    }));
  };

  // Căutăm în coș produsul potrivit (atât după id cât și după variantId)
  const activeVariantId = activeVariant ? activeVariant.id : null;
  const currentCartItem = cartItems.find((item) => {
    const itemVariantId = item.variantId || null;
    return String(item.id) === String(id) && itemVariantId === activeVariantId;
  });

  const cartCount = currentCartItem ? (currentCartItem.number || currentCartItem.quantity || 0) : 0;

  function addToCart() {
    if (product) {
      const productToAdd = {
        ...product,
        price: activeVariant ? activeVariant.price : product.price,
        variantId: activeVariantId, 
        selectedOptions: { ...selectedOptions },
        number: 1 // 👈 Setăm numărul inițial la 1 ca să evităm NaN în Redux
      };

      dispatch(add(productToAdd));
    }
  }

  return (
    <div className={styles.mainWrapper}>
      {isError ? (
        <div className={styles.error}>
          An error has occurred. Please try again later.
        </div>
      ) : (
        <>
          {isLoading || !product ? (
            <Loading />
          ) : (
            <div className={styles.wrapper}>
              <div className={styles.productWrapper}>
                <div className={styles.imageWrapper}>
                  <img src={product.image} alt={product.name} />
                </div>
                <div className={styles.info}>
                  <p className={styles.title}>{product.name}</p>

                  <h3>
                    Price: ${activeVariant ? activeVariant.price : product.price}
                  </h3>

                  {product.options?.map((option) => (
                    <div key={option.id} className={styles.optionGroup}>
                      <label htmlFor={`select-${option.id}`}>
                        <strong>{option.name}: </strong>
                      </label>
                      <select
                        id={`select-${option.id}`}
                        value={selectedOptions[option.name] || ""}
                        onChange={(e) => handleOptionChange(option.name, e.target.value)}
                      >
                        {option.values.map((val) => (
                          <option key={val.id} value={val.value}>
                            {val.value}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}

                  <div className={styles.stockButtonWrapper}>
                    {activeVariant ? (
                      <>
                        <p className={styles.stockInfo}>
                          {activeVariant.stock > 0
                            ? `In Stock (${activeVariant.stock} available)`
                            : "Out of Stock"}
                        </p>
                        <button 
                          className={styles.addButton} 
                          disabled={activeVariant.stock <= 0} 
                          onClick={addToCart}
                        >
                          {cartCount > 0 ? `${cartCount} items added` : 'Add to Cart'}
                        </button>
                      </>
                    ) : (
                      <p style={{ color: "red" }}>This combination is currently unavailable.</p>
                    )}
                  </div>

                </div>
              </div>

              <div className={styles.productDescription}>{product.description}</div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProductPage;