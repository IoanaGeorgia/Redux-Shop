import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { Link } from "react-router-dom";
import background from "../assets/background.png"
import bg1 from "../assets/reduxBG-1.png"
import bg2 from "../assets/reduxBG-2.png"
import bg3 from "../assets/reduxBG-3.png"
import bg4 from "../assets/reduxBG-4.png"
import LazyLoad from "react-lazyload";
import { memo } from "react";
import { LineWeight } from "@mui/icons-material";



function LandingPage() {

  let scrollParent = "#root"

  const xValues = [2000, 2005, 2008, 2015, 2018, 2021, 2024];
  const yValues = [5, 6, 5, 9, 7, 9, 10];


  useEffect(()=>{
  new Chart("mainChart", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [
        {
          fill: false,
          lineTension: 0.5,
          borderColor: "#fc6f42",
          backgroundColor: "#fc6f42",
          data: yValues,
          borderWidth: 6,
        },
      ],
    },

    options: {
      responsive: true,
      legend: { display: false },
      scales: {
        yAxes: [
          {
            gridLines: {
              color: "#cca3ff",
              lineWidth: 3,
            },
            ticks: {
              fontColor: "#fc6f42",
              fontSize: 18,
              stepSize: 1,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              color: "#cca3ff",
              lineWidth: 3,
            },
            ticks: {
              fontColor: "#fc6f42",
              fontSize: 18,
            },
          },
        ],
      },
    },
  });

  },[])




  
  return (
    <div className={styles.mainLandingWrapper}>
      <main className={styles.main}>
        <div className={styles.flexWrapper}>
          <div>
            <img src={bg1}></img>
          </div>
          <div>
            <p>Get ready for something new</p>
          </div>
        </div>

        <div className={styles.flexWrapper}>
          <div>
            <p>Buy quality products at low prices!</p>

            <p>Check out our products below</p>

            <Link to="/items">
              <button>See items</button>
            </Link>
          </div>

          <div>
            <div>
              <p>25k+</p>
              <p>Categories</p>
            </div>
            <div>
              <p>300k+</p>
              <p>Products</p>
            </div>

            <div>
              <p>90+</p>
              <p>Countries</p>
            </div>
          </div>
        </div>

        <div className={styles.flexWrapper}>
          <div>
            <p>20M+</p>
            <p>Clients from all over the world</p>
          </div>
          <div>
            <img src={bg2}></img>
          </div>{" "}
          <div>
            <img src={bg1}></img>
          </div>
        </div>
      </main>

      <div className={styles.mainContact}>
        <div>
          <p>Stay in touch!</p>
          <p>Contact us, it's just a click away</p>
        </div>
        <Link to="/contact">
          <button>Contact us</button>
        </Link>
      </div>

      <LazyLoad
        scrollContainer={scrollParent}
        offset={400}
        className={styles.advertisement}
      >
        <div>
          <img src={background}></img>
          <div className={styles.adOverlay}>
            <div>
              <p>Check out more of our products</p>
              <Link to="/items">
                <button>See items</button>
              </Link>
            </div>
          </div>
        </div>
      </LazyLoad>

      <div className={styles.reviewArea}>
        <p>What they say about us</p>
        <div className={styles.reviewsWrapper}>
          <div className={styles.reviewDiv}>
            <p>
              The shipping was very fast. CasaFashion sells quality products. I
              love my new silver bracelet.
            </p>
            <p>- Jane from Paris</p>
          </div>

          <div className={styles.reviewDiv}>
            <p>
              The prices are insane and the quality is amazing. I am very
              satisfied with my order. I recommend this site to everyone.
            </p>
            <p>- Romeo from Spain</p>
          </div>

          <div className={styles.reviewDiv}>
            <p>
              This is only site that was willing to ship where I live. My
              girlfriend loves her new red dress. I rate this website 10/10.
            </p>
            <p>- Juliet from Italy</p>
          </div>
        </div>
      </div>

      <div className={styles.chart}>
        <p>Our clients are always happy!</p>

      <div className={styles.chartWrapper}>
      <canvas id="mainChart" className={styles.mainChart}></canvas>
      </div>
      </div>

      <div className={styles.preFooterWrapper}>
        <p>Find your style and you will shine every day!</p>

        <LazyLoad
          scrollContainer={scrollParent}
          offset={200}
          className={styles.preFooter}
        >
          <div>
            <img src={bg3}></img>
          </div>

          <div>
            <p className={styles.logo}>CasaFashion</p>

            <Link to="/logIn">
              <button>Sign up</button>
            </Link>
          </div>

          <div>
            <img src={bg4}></img>
            <div className="preFooterHiddenButton">
              <Link to="/logIn">
                <button>Sign up</button>
              </Link>
            </div>
          </div>
        </LazyLoad>
      </div>
    </div>
  );
}

export default memo(LandingPage);
