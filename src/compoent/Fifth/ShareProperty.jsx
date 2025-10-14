import React from "react";
import "./ShareProperty.css";

const ShareProperty = () => {
  return (
    <section
      className="property-share"
      style={{
        width: "100%",
        height: "100vh",
        background: 'url("/image 999.png") center/cover no-repeat',
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        fontFamily: '"Poppins", sans-serif',
      }}
    >
      <div className="overlay">
        <div className="content-box">
          <h1>
            Share your property - <br /> we renovate & share profit
          </h1>
          <p>
            Turn your unused property into a profitable rental. We handle
            renovation and management so you can earn hassle-free.
          </p>
          <button className="cta-btn">Check Out Process</button>
        </div>
      </div>
    </section>
  );
};

export default ShareProperty;
