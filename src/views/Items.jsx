import { useState, useEffect } from "react";
import styles from "../styles/Items.module.css";
import { api } from "../services/apiService";
import Loading from "../components/Loading";
import ItemCard from "../components/ItemCard";
import TopProductsCarousel from "../components/TopProductsCarousel";


function Items() {
  const [items, setItems] = useState([]);
  const [areItemsLoading, setLoadingItems] = useState(false);
  const [itemsError, setItemsError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function callForItems() {
      setItemsError(false);
      setLoadingItems(true);

      try {
        const response = await api.get('/api/products/gallery', { signal: controller.signal });
        const computedData = response.data?.data || response.data || response;

        const itemsWithQuantity = computedData.map((item) => ({
          ...item,
          number: 0,
        }));

        setItems(itemsWithQuantity);
      } catch (e) {
        if (e.name !== 'AbortError') {
          setItemsError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingItems(false);
        }
      }
    }

    callForItems();

    return () => {
      controller.abort();
    };
  }, []);

  const itemsContainer = "#root";

  return (
    <div className={styles.mainWrapper}>
      {itemsError ? (
        <div className={styles.error}>
          An error has occurred. Please try again later.
        </div>
      ) : (
        <>
          {areItemsLoading ? (
            <Loading />
          ) : (
            <div className={styles.wrapper}>
              <TopProductsCarousel />
              {items.map((item, index) => (
                <ItemCard
                  key={item.id || index}
                  item={item}
                  index={index}
                  scrollContainer={itemsContainer}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Items;