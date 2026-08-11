import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { add } from "../ItemSlice";
import LazyLoad from "react-lazyload";
import styles from "../styles/Items.module.css";

function Items() {
  const [items, setItems] = useState([]);
  const [areItemsLoading, setLoadingItems] = useState(false);
  const [itemsError, setItemsError] = useState(false);
  let [imagesLoaded, setImagesLoaded] = useState(new Array(20).fill(false));
  let imageRefs = useRef([]);

  function addToCart(item, index) {
    const updatedItems = [...items];
    const currentItem = { ...updatedItems[index] };

    if (currentItem.number === 0) {
      currentItem.number = 1;
    } else {
      currentItem.number += 1;
    }
    updatedItems[index] = currentItem;
    setItems(updatedItems);

    dispatch(add({ ...currentItem, index: index }));
  }

  const setImageLoaded = (index) => {
    setImagesLoaded((prevLoading) => {
      const newLoading = [...prevLoading];
      newLoading[index] = false;
      return newLoading;
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function callForItems() {
      setItemsError(false);
      setLoadingItems(true);
      try {
        const data = await fetch("https://fakestoreapi.com/products", {
          signal,
        });

        if (!signal.aborted) {
          if (data.ok) {
            const computedData = await data.json();

            for (let i of computedData) {
              i.number = 0;
            }
            setItems(computedData);
          } else {
            setItemsError(true);
          }
          setLoadingItems(false);
        }
      } catch (e) {
        if (!signal.aborted) {
          setItemsError(true);
        }
      }
    }
    callForItems();

    return () => {
      controller.abort();

      imageRefs.current.forEach((ref) => {
        if (ref) {
          ref.onload = null;
        }
      });
    };
  }, []);

  const itemsContainer = "#root";

  const dispatch = useDispatch();

  return (
    <div className={styles.mainWrapper}>
      {itemsError ? (
        <div className={styles.error}>
          An error has occured. Please try again later.
        </div>
      ) : (
        <>
          {areItemsLoading ? (
            <div className={styles.loading}> Loading items... </div>
          ) : (
            <div className={styles.wrapper}>
              {items.map((item, index) => (
                <LazyLoad
                  height={300}
                  offset={100}
                  scrollContainer={itemsContainer}
                  className={styles.item}
                  key={index}
                >
                  <div className={styles.itemImage}>
                    {imagesLoaded[index] && (
                      <div className={styles.loadingImage}>...loading</div>
                    )}
                    <img
                      ref={(el) => (imageRefs.current[index] = el)}
                      onLoad={() => setImageLoaded(index)}
                      src={item.image}
                    />
                  </div>

                  <div className="info">
                    {" "}
                    <span>{item.title}</span> <span>${item.price}</span>
                  </div>
                  <button
                    className={styles.addButton}
                    onClick={() => addToCart(item, index)}
                  >
                    {item.number === 0 ? "Add to Cart" : `${item.number} Added to Cart`}
                  </button>
                </LazyLoad>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Items;