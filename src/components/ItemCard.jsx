import React, { useState, useRef } from "react";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";
import styles from "../styles/Items.module.css";

function ItemCard({ item, index, scrollContainer }) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const imageRef = useRef(null);

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  return (
    <LazyLoad
      height={300}
      offset={100}
      scrollContainer={scrollContainer}
      className={styles.item}
    >
      {item.topProduct && <div className={styles.badge}>Top!</div>}

      <div className={styles.itemImage}>
        {isImageLoading && (
          <div className={styles.loadingImage}>...loading</div>
        )}
        <img
          ref={imageRef}
          onLoad={handleImageLoad}
          src={item.image}
          alt={item.name}
        />
      </div>

      <div className={styles.info}>
        <span>{item.name}</span>
        <br />
        <span>${item.price}</span>
      </div>

      <Link to={`/products/${item.id}`}>
        <button className={styles.addButton}>See more</button>
      </Link>
    </LazyLoad>
  );
}

export default ItemCard;