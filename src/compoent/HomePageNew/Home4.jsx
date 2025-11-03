import React from "react";
import "./Home4.css";

const Home4 = () => {
  const properties = [
    {
      img: "/image 199.png", // replace with your real image
      city: "Noida",
      title: "Urban Nest Co-Living",
      text: "Urban Nest Co-Living offers thoughtfully designed shared spaces that blend privacy with social connection. Perfect for students and young professionals, each room comes fully furnished with modern amenities, high-speed Wi-Fi, and access to vibrant community zones.",
      rating: "4.8 ( 120 reviews )",
      price: "₹15,000 / Month",
    },
    {
      img: "/image 291.png", // replace with your real image
      city: "Bengaluru",
      title: "Silicon Valley Stays",
      text: "Located in the heart of the tech district, Silicon Valley Stays redefines urban living for working professionals and digital creators. With dedicated co-working spaces, contemporary interiors, and 24/7 access to facilities, it's designed for productivity and comfort.",
      rating: "4.9 ( 250 reviews )",
      price: "₹22,000 / Month",
    },
    {
      img: "/image 203.png", // replace with your real image
      city: "Hyderabad",
      title: "Hitech Homes",
      text: "Hitech Homes brings elegance and sophistication to everyday living. Each residence features premium furnishings, smart home technology, and exclusive amenities like fitness studios and rooftop lounges. Ideal for executives and families seeking refined living.",
      rating: "4.5 ( 95 reviews )",
      price: "₹18,000 / Month",
    },
  ];

  return (
    <div className="featured-container">
      <h2 className="featured-heading">
        Featured <span className="highlight">Ovika</span> Properties
      </h2>

      <div className="featured-card-container">
        {properties.map((item, index) => (
          <div key={index} className="featured-card">
            <img src={item.img} alt={item.title} className="featured-img" />
            <div className="featured-content">
              <p className="featured-city">{item.city}</p>
              <h3 className="featured-title">{item.title}</h3>
              <p className="featured-text">{item.text}</p>
              <div className="featured-bottom">
                <p className="featured-rating">{item.rating}</p>
                <h4 className="featured-price">{item.price}</h4>
                <button className="featured-btn">View Property</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home4;
