import { useState, useEffect, useRef } from "react";
import styles from "../styles/Home.module.css";
import { api } from "../services/apiService";
import Loading from "./Loading";
import ItemCard from "./ItemCard";

function TopProductsCarousel() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const carouselRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchTopProducts() {
      setHasError(false);
      setIsLoading(true);

      try {
        const response = await api.get('/api/products/topProducts', { signal: controller.signal });
        const computedData = response.data?.data || response.data || response;

        const itemsWithQuantity = computedData.map((item) => ({
          ...item,
          number: 0,
        }));

        setItems(itemsWithQuantity);
      } catch (e) {
        if (e.name !== 'AbortError') {
          setHasError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchTopProducts();

    return () => {
      controller.abort();
    };
  }, []);

  const handleScroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 320; 
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const isCarousel = items.length > 4;

  return (
    <div className={styles.topContainer}>
      <p className={styles.title}>Top Products</p>

      {hasError ? (
        <div className={styles.error}>
          An error has occurred. Please try again later.
        </div>
      ) : isLoading ? (
        <Loading />
      ) : (
        <div className={styles.carouselWrapper}>
          {isCarousel && (
            <button
              className={`${styles.arrow} ${styles.leftArrow}`}
              onClick={() => handleScroll("left")}
              aria-label="Previous Products"
            >
              &#10094;
            </button>
          )}

          <div
            className={`${styles.track} ${isCarousel ? styles.scrollable : ""}`}
            ref={carouselRef}
          >
            {items.map((item, index) => (
              <div key={item.id || index} className={styles.cardContainer}>
                <ItemCard
                  item={item}
                  index={index}
                  scrollContainer={carouselRef.current}
                />
              </div>
            ))}
          </div>

          {isCarousel && (
            <button
              className={`${styles.arrow} ${styles.rightArrow}`}
              onClick={() => handleScroll("right")}
              aria-label="Next Products"
            >
              &#10095;
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default TopProductsCarousel;