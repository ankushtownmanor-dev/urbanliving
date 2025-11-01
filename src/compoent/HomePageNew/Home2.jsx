import React from "react";
import "./Home2.css";

const Home2 = () => {
  const cards = [
    {
      img: "https://i.ibb.co/mTjbRzM/pg-living.jpg", // replace with your image URL
      title: "PG Living Spaces",
      text: "TM Stay offers fully managed and affordable PG rentals tailored for students and working professionals. With clean, secure, precious and comfortable living spaces, we ensure a hassle-free stay that feels just like home – only better.",
      btn: "Know more",
    },
    {
      img: "https://i.ibb.co/N7ZmnsK/co-living.jpg", // replace with your image URL
      title: "Co- Living Spaces",
      text: "TM Hive brings together vibrant communities in thoughtfully designed shared spaces. Whether you’re a young professional, a remote worker, or a creative soul, our co-living homes offer the perfect blend of privacy, social, and flexibility – so you can live, work, and grow together.",
      btn: "Know more",
    },
    {
      img: "https://i.ibb.co/Ms2KmTw/luxury-living.jpg", // replace with your image URL
      title: "Luxury Living Spaces",
      text: "TM Luxe offers high-end, fully serviced apartments for those who value elegance, comfort, and privacy. With sophisticated interiors, modern amenities, and prime locations, TM Luxe is crafted for families, celeb business travelers, and individuals seeking a luxurious living experience.",
      btn: "Know more",
    },
  ];

  return (
    <div className="living-container">
      <h2 className="living-heading">
        Explore <span className="highlight">Living</span> Options
      </h2>
      <p className="living-subtext">
        Avika offers range of living options to suit your lifestyle from cosy PG
        rentals to luxurious service apartment. <br /> Discover the perfect fit for you
      </p>
      <div className="living-card-container">
        {cards.map((card, index) => (
          <div key={index} className="living-card">
            <img src={card.img} alt={card.title} className="living-img" />
            <div className="living-content">
              <h3 className="living-title">{card.title}</h3>
              <p className="living-text">{card.text}</p>
              <button className="living-btn">
                {card.btn} <span className="arrow">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home2;
