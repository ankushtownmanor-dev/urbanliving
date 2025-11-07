// import React from "react";
// import "./Home4.css";

// const Home4 = () => {
//   const properties = [
//     {
//       img: "/image 199.png", // replace with your real image
//       city: "Greater Noida Knowledge Park",
//       title: "TM Lux - 1",
//       text: "Urban Nest Co-Living offers thoughtfully designed shared spaces that blend privacy with social connection. Perfect for students and young professionals, each room comes fully furnished with modern amenities, high-speed Wi-Fi, and access to vibrant community zones.",
//       rating: "4.8 ( 5 reviews )",
//       price: "₹4500 / per night",
//       btn: "View Property",
//     },
//     {
//       img: "/image 291.png", // replace with your real image
//       city: "Noida Sector 137",
//       title: "TM Lux - 2",
//       text: "Located in the heart of the tech district, Silicon Valley Stays redefines urban living for working professionals and digital creators. With dedicated co-working spaces, contemporary interiors, and 24/7 access to facilities, it's designed for productivity and comfort.",
//       rating: "4.9 ( 8 reviews )",
//       price: "₹3300 / per night",
//           btn: "View Property",
//     },
//     {
//       img: "/image 203.png", // replace with your real image
//       city: "Greater Noida Sector 27",
//       title: "TM Lux - 3",
//       text: "Hitech Homes brings elegance and sophistication to everyday living. Each residence features premium furnishings, smart home technology, and exclusive amenities like fitness studios and rooftop lounges. Ideal for executives and families seeking refined living.",
//       rating: "Comming Soon",
//       price: "Comming Soon",
//           btn: "Comming Soon",
//     },
//   ];

//   return (
//     <div className="featured-container">
//       <h2 className="featured-heading">
//         Featured <span className="highlight">Ovika</span> Properties
//       </h2>

//       <div className="featured-card-container">
//         {properties.map((item, index) => (
//           <div key={index} className="featured-card">
//             <img src={item.img} alt={item.title} className="featured-img" />
//             <div className="featured-content">
//               <p className="featured-city">{item.city}</p>
//               <h3 className="featured-title">{item.title}</h3>
//               <p className="featured-text">{item.text}</p>
//               <div className="featured-bottom">
//                 <p className="featured-rating">{item.rating}</p>
//                 <h4 className="featured-price">{item.price}</h4>
//                 <button className="featured-btn">{item.btn}</button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home4;
// import React, { useEffect, useState } from "react";
// import "./Home4.css";

// const Home4 = () => {
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // 👇 Replace this with your actual API endpoint
//     fetch("https://townmanor.in/api/properties")
//       .then((res) => res.json())
//       .then((data) => {
//         setProperties(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching properties:", err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <div className="featured-container">
//         <h2 className="featured-heading">
//           Featured <span className="highlight">Ovika</span> Properties
//         </h2>
//         <p style={{ textAlign: "center", marginTop: "20px" }}>Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="featured-container">
//       <h2 className="featured-heading">
//         Featured <span className="highlight">Ovika</span> Properties
//       </h2>

//       <div className="featured-card-container">
//         {properties.map((item, index) => (
//           <div key={index} className="featured-card">
//             <img src={item.img} alt={item.title} className="featured-img" />
//             <div className="featured-content">
//               <p className="featured-city">{item.city}</p>
//               <h3 className="featured-title">{item.title}</h3>
//               <p className="featured-text">{item.text}</p>
//               <div className="featured-bottom">
//                 <p className="featured-rating">{item.rating}</p>
//                 <h4 className="featured-price">{item.price}</h4>
//                 <button
//                   className="featured-btn"
//                   onClick={() => window.location.href = item.link || "#"}
//                 >
//                   {item.btn || "View Property"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home4;



// import React, { useEffect, useState } from "react";
// import "./Home4.css";
// import { useNavigate } from "react-router";

// function EliteProperties() {
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const res = await fetch("https://townmanor.ai/api/properties/all");
//         if (!res.ok) throw new Error("Failed to load properties");
//         const data = await res.json();

//         let fetchedProps = [];
//         if (Array.isArray(data)) {
//           fetchedProps = data;
//         } else if (data && Array.isArray(data.properties)) {
//           fetchedProps = data.properties;
//         } else {
//           setError("Invalid response format");
//         }

//         setProperties(fetchedProps);
//       } catch (err) {
//         setError(err.message || "Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProperties();
//   }, []);

//   return (
//     <section className="tmxelite-prop">
//       <div className="tmxelite-prop-container">
//         <h2 className="tmxelite-prop-title">
//           Featured <span>Ovika</span> Properties
//         </h2>

//         {loading && <p className="tmx-loading">Loading properties...</p>}
//         {error && !loading && <p className="tmx-error">{error}</p>}

//         {!loading && !error && (
//           <div className="tmx-prop-grid">
//             {properties.map((prop) => {
//               const id = prop.id ?? prop.ID;
//               const name = prop.name ?? prop.NAME;
//               const imageArray = Array.isArray(prop.images)
//                 ? prop.images
//                 : Array.isArray(prop.IMAGES)
//                 ? prop.IMAGES
//                 : [];
//               const imageSrc = imageArray.length > 0 ? imageArray[0] : "/p1.png";

//               const city = prop.city ?? prop.CITY ?? "—";
//               const description =
//                 prop.description ??
//                 prop.DESCRIPTION ??
//                 "Discover contemporary living with premium amenities and prime location.";

//               const rawPrice = prop.monthly_price ?? prop.MONTHLY_PRICE;
//               const priceNumber =
//                 typeof rawPrice === "string"
//                   ? parseFloat(rawPrice)
//                   : rawPrice || 0;

//               const priceText = priceNumber
//                 ? `₹${priceNumber.toLocaleString("en-IN")} / Month`
//                 : "Price on Request";

//               return (
//                 <div
//                   key={id}
//                   className="tmx-prop-card"
//                   onClick={() =>
//                     navigate(`/tmluxespecific/${id}`, { state: { propertyId: id } })
//                   }
//                 >
//                   <img src={imageSrc} alt={name} className="tmx-prop-img" />

//                   <div className="tmx-prop-body">
//                     <p className="tmx-prop-city">{city}</p>
//                     <h3 className="tmx-prop-name">{name}</h3>
//                     <p className="tmx-prop-desc">{description}</p>

//                     <div className="tmx-prop-rating">
//                       <span>⭐ 4.8 (120 reviews)</span>
//                     </div>

//                     <p className="tmx-prop-price">{priceText}</p>

//                     <button className="tmx-prop-btn">View Property</button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

// export default EliteProperties;
import React, { useEffect, useState } from "react";
import "./Home4.css";
import { useNavigate } from "react-router";

const Home4 = () => {
  const navigate = useNavigate();

  // ✅ 1. Dummy data defined first
  const dummyData = [
    {
      id: 999,
      img: "/image 199.png",
      city: "Noida ",
      title: "TM Lux - 3",
      text: "Urban Nest Co-Living offers thoughtfully designed shared spaces that blend privacy with social connection. Perfect for students and young professionals, each room comes fully furnished with modern amenities, high-speed Wi-Fi, and access to vibrant community zones.",
      rating: "Comming Soon",
      price: "Comming Soon",
      btn: "Comming Soon",
    },
  ];

  const [properties, setProperties] = useState(dummyData); // ✅ show dummy first
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
          setProperties(dummyData);
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

        // ✅ Always keep dummy property visible at the top
        setProperties([dummyData[0], ...formatted]);
      } catch (err) {
        console.error("❌ Error fetching properties:", err);
        setError("Unable to load properties.");
        setProperties(dummyData);
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
              <p className="featured-city">{item.city}</p>
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
