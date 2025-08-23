import React, { useState, useEffect } from "react";
import "./Home.css";
import {
  faClock,
  faUserShield,
  faShoppingBag,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import image1 from "/images/Hero/Slider/slider1.jpg";
import image2 from "/images/Hero/Slider/slider2.jpg";
import image3 from "/images/Hero/Slider/slider3.jpg";
import kids1 from "./../../../public/images/Cartoon/kids1.jpg";
import kids2 from "./../../../public/images/Cartoon/Kids2.jpg";
import kids3 from "./../../../public/images/Cartoon/profile1.jpg";
import SliderBtn from "../../Components/Home/SliderBtn/SliderBtn";
import FeaturesCard from "../../Components/Home/FeaturesCard/FeaturesCard";
import HomeCard from "../../Components/Home/HomeCard/HomeCard";
import { useTranslation } from "react-i18next"; // Import useTranslation
import KidsProducts from "../../Components/Home/KidsProduct/KidsProducts";
import getProducts from "../../services/products/products.service.js";
import trackingService from "../../services/tracking/tracking.service.js";
import axios from "axios";
const images = [image1, image2, image3];
const kidsImages = [kids1, kids2, kids3];

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [trackingStatus, setTrackingStatus] = useState("not_started");
  const { t } = useTranslation(); // Initialize translation

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };
  // const getUserIP = async () => {
  //   try {
  //     const response = await axios.get("https://api.ipify.org?format=json");
  //     console.log("User IP:", response.data.ip);
  //     return response.data.ip;
  //   } catch (error) {
  //     console.error("Error getting IP:", error);
  //     return null;
  //   }
  // };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    // (async () => {
    //   await getUserIP();
    // })();
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getProducts((products) => {
      setProducts(products);
      console.log(products);
    });
  }, []);
   useEffect(() => {
    console.log("🏠 Home component mounted, starting tracking...");
    setTrackingStatus("starting");
    
    const trackUser = async () => {
      try {
        setTrackingStatus("getting_ip");
        console.log("🟡 Starting tracking process...");
        
        // Test if service is working
        console.log("🟡 Tracking service instance:", trackingService);
        
        // Add a small delay to ensure component is fully mounted
        setTimeout(() => {
          trackingService.trackWithDelay(500);
          setTrackingStatus("tracking_started");
        }, 100);
        
      } catch (error) {
        console.error("🔴 Error in tracking:", error);
        setTrackingStatus("error");
      }
    };

    trackUser();
  }, []);


  return (
    <>
      <div className="hero-section">
        <div className="slider">
          <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
          <div className="slider-controls">
            <SliderBtn direction={"prev"} onClick={prevSlide} />
            <SliderBtn direction={"next"} onClick={nextSlide} />
          </div>
        </div>
      </div>

      <div className="features-container">
        <FeaturesCard
          icon={faClock}
          headKey={"FastExecution"}
          descriptionKey={"FastExecutionDesc"}
        />
        <FeaturesCard
          icon={faUserShield}
          headKey={"QualityAssurance"}
          descriptionKey={"QualityAssuranceDesc"}
        />
        <FeaturesCard
          icon={faShoppingBag}
          headKey={"ProductRange"}
          descriptionKey={"ProductRangeDesc"}
        />
        <FeaturesCard
          icon={faPhone}
          headKey={"Support"}
          descriptionKey={"SupportDesc"}
        />
      </div>

      <div className="home-card">
        <h2 className="home-card-header">{t("ShopNow")}</h2>
        <ul className="cards">
          {products.slice(0, 4).map((product) => (
            <HomeCard key={product.id} product={product} />
          ))}
        </ul>
      </div>

     {/* <div className="container" id="spin-container">
        <h1>{t("OurProductsWheel")}</h1>
        <h5>{t("PressAnywhereToFindMore")}</h5>
        <a href="/products">
          <img src="/images/Spinner/Nav_Logo.png" alt="" id="rotate-logo" />
          <img
            className="image1"
            id="rotatingImage"
            src="/images/Spinner/1.png"
            alt="Image 1"
          />
        </a>
      </div>*/}

      <div className="cartoon-container">
        <div className="cartoon-card">
          <img src="/images/Cartoon/kids1.jpg" className="cartoon-img" />
          <div
            className="cartoon-card-content"
            style={{
              backgroundColor: "#d1242a",
            }}
          >
            <h5>Spidey Coco Babuchi</h5>
            <p>20 %</p>
          </div>
        </div>
        <div className="cartoon-card">
          <img src={"/images/Cartoon/Kids2.jpg"} className="cartoon-img" />
          <div
            className="cartoon-card-content"
            style={{
              backgroundColor: "#f58f20",
            }}
          >
            <h5>Batey Coco Babuchi</h5>
            <p>20 %</p>
          </div>
        </div>
        <div className="cartoon-card">
          <img src={"/images/Cartoon/profile1.jpg"} className="cartoon-img" />
          <div
            className="cartoon-card-content"
            style={{
              backgroundColor: "#809096",
            }}
          >
            <h5>Classic Coco Babuchi</h5>
            <p>20 %</p>
          </div>
        </div>
      </div>
      <KidsProducts />
    </>
  );
}

export default Home;
