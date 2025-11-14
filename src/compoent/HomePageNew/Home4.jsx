
import React, { useEffect, useState } from "react";
import "./Home4.css";
import { useNavigate } from "react-router";

const Home4 = () => {
  const navigate = useNavigate();

  // Define each property separately for better control
  const property1 = {
    id: 2,
    img: "/tmluxe1.jpeg",
    city: "Noida Sector 137",
    title: "TM Lux - 1",
    text: "Experience refined urban living at TM Luxe 1, where thoughtfully designed spaces combine comfort, style, and convenience. Ideal for business executives, professionals, families, and tourists, the accommodation is fully furnished and features a comfortable living area with sofa, Google TV, air-conditioning, and a private balcony. A fully loaded kitchen and laundry provisions with washing machine, iron, and ironing board ensure a homelike experience. Guests also enjoy the ease of self check-in and check-out for a seamless and independent stay.",
    rating: "⭐ 4.8 (120 reviews)",
    price: "₹4,500 / night",
    btn: "View Property"
  };

  const property2 = {
    id: 1,
    img: "/tmluxe22.jpg",
    city: "Greater Noida Knowledge Park",
    title: "TM Lux - 2",
    text: "TM Luxe 2 is a private luxury room within a premium apartment, offering comfort and privacy for modern travelers. The room features an attached toilet and a private balcony, providing a relaxing personal space. It is equipped with an air conditioner, sofa, Google TV, and a coffeemaker for added convenience. The metro station is just a five-minute walk away, and popular shopping and entertainment centers are located in close vicinity.",
    rating: "⭐ 4.9 (85 reviews)",
    price: "₹3,000 / night",
    btn: "View Property"
  };

  const property3 = {
    id: 3,
    img: "/tmluxe3.png",
    city: "Noida Extension",
    title: "TM Lux - 3",
    text: "TM Luxe 3 is a super-luxury studio overlooking the golf courses, stadium, and Jaypee Greens resorts. Spanning 710 sq. ft., the studio features a fitted kitchen, dining counter with high chairs, a modern toilet, and a private balcony. The space is elegantly furnished with sofas, Google TV, Wi-Fi, and other contemporary comforts. Guests can also enjoy the convenience of self check-in and check-out facilities.",
    rating: "Coming Soon",
    price: "₹5,000 / night",
    btn: "Coming Soon"
  };

  // Default properties that will always show
  const defaultProperties = [property1, property2, property3];

  const [properties, setProperties] = useState(defaultProperties); // Show default properties first
  const [loading, setLoading] = useState(false); // no delay
  const [error, setError] = useState("");

  // ✅ 2. Try fetching API but always keep dummy visible
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("https://townmanor.ai/api/properties/all");

        if (!res.ok) throw new Error("Failed to fetch properties");
        const data = await res.json();

        let fetchedProps = [];
        if (Array.isArray(data)) fetchedProps = data;
        else if (data?.properties && Array.isArray(data.properties))
          fetchedProps = data.properties;

        if (fetchedProps.length === 0) {
          console.warn("API empty, keeping dummy data");
          setProperties(defaultProperties);
          return;
        }

        const formatted = fetchedProps.map((prop) => {
          const id = prop.id ?? prop.ID;
          const name = prop.name ?? prop.NAME;
          const imageArray =
            Array.isArray(prop.images) && prop.images.length > 0
              ? prop.images
              : Array.isArray(prop.IMAGES)
              ? prop.IMAGES
              : [];
          const imageSrc = imageArray[0] || "/p1.png";
          const city = prop.city ?? prop.CITY ?? "Unknown Location";
          const description =
            prop.description ??
            prop.DESCRIPTION ??
            "Discover contemporary living with premium amenities.";
          const rawPrice = prop.monthly_price ?? prop.MONTHLY_PRICE;
          const priceText = rawPrice
            ? `₹${parseFloat(rawPrice).toLocaleString("en-IN")} / Month`
            : "Price on Request";

          return {
            id,
            img: imageSrc,
            city,
            title: name,
            text: description,
            rating: "⭐ 4.8 (120 reviews)",
            price: priceText,
            btn: "View Property",
          };
        });

        // Merge API properties with default properties, avoiding duplicates by ID
        const mergedProperties = [...defaultProperties];
        
        formatted.forEach(apiProp => {
          // Only add if not already in default properties
          if (!defaultProperties.some(p => p.id === apiProp.id)) {
            mergedProperties.push(apiProp);
          }
        });
        
        setProperties(mergedProperties);
      } catch (err) {
        console.error("❌ Error fetching properties:", err);
        setError("Unable to load properties.");
        setProperties(defaultProperties);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="featured-container">
      <h2 className="featured-heading">
        Featured <span className="highlight">Ovika</span> Properties
      </h2>

      <div className="featured-card-container">
        {properties.map((item, index) => (
          <div
            key={index}
            className="featured-card"
            onClick={() =>
              item.btn !== "Coming Soon" &&
              navigate(`/tmluxespecific/${item.id}`, {
                state: { propertyId: item.id },
              })
            }
            style={{
              cursor: item.btn !== "Coming Soon" ? "pointer" : "default",
            }}
          >
            <img src={item.img} alt={item.title} className="featured-img" />
            <div className="featured-content">
              {/* <p className="featured-city">{item.city}</p> */}
              <h3 className="featured-title">{item.title}</h3>
              <p className="featured-text">{item.text}</p>
              <div className="featured-bottom">
                <p className="featured-rating">{item.rating}</p>
                <h4 className="featured-price">{item.price}</h4>
                <button className="featured-btn">{item.btn}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home4;
