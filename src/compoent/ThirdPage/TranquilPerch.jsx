import React from "react";
import "./TranquilPerch.css";
import { MdOutlineContentCopy } from "react-icons/md";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function TranquilPerch({
  title,
  pricePerNight,
  mainImage,
  sideImages = [],
  id,
}) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const images = [mainImage, ...(sideImages || [])];

  const handleScroll = (event) => {
    const scrollLeft = event.target.scrollLeft;
    const width = event.target.clientWidth;
    const index = Math.round(scrollLeft / width);
    setCurrentIndex(index);
  };

  const handleBookNow = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login", { state: { from: `/tmluxespecific/${id}` } });
      return;
    }
    localStorage.setItem("property_id", id);
    navigate("/payment");
  };

  const handleShowMore = () => {
    console.log("Show more clicked! Property ID:", id);
    if (id === 1 || id === "1") {
      window.open("https://townmanor.ai/colivingsecond/10", "_blank");
    } else if (id === 2 || id === "2") {
      window.open("https://townmanor.ai/colivingsecond/9", "_blank");
    } else {
      console.log("Show more clicked for property ID:", id);
    }
  };

  const getPropertyLocation = () => {
    if (id === 2 || id === "2") return "Greater Noida";
    if (id === 1 || id === "1") return "Noida";

    if (title) {
      const titleLower = title.toLowerCase();
      if (
        titleLower.includes("tm luxe 1") ||
        titleLower.includes("tmluxe1") ||
        titleLower.includes("tm luxe-1") ||
        titleLower.includes("tm luxe - 1")
      )
        return "Greater Noida";
      else if (
        titleLower.includes("tm luxe 2") ||
        titleLower.includes("tmluxe2") ||
        titleLower.includes("tm luxe-2") ||
        titleLower.includes("tm luxe - 2") ||
        titleLower.includes("2suite")
      )
        return "Noida";
    }
    return "Taxes included • Free cancellation available";
  };

  return (
    <>
      <div className="tranquil-perch-container">
        {/* Header */}
        <div className="tranquil-perch-header">
          <h2 className="tranquil-perch-title">{title || "Property"}</h2>
          <div className="tranquil-perch-actions">
            <button className="tranquil-perch-action">
              <FaRegShareFromSquare size={20} className="luxeicon" />
              Share
            </button>
            <button className="tranquil-perch-action">
              <FaRegHeart size={20} className="luxeicon" />
              Save
            </button>
          </div>
        </div>

        {/* IMAGES SECTION */}
        {/* Desktop layout - unchanged */}
        <div className="tranquil-perch-images desktop-view">
          <div className="tranquil-perch-main-img">
            <img src={mainImage || "/image 71.png"} alt="Main room" />
          </div>

          <div className="tranquil-perch-side-imgs">
            <img src={sideImages[0] || "/image 120.png"} alt="Living space" />
            <div className="tranquil-perch-last-img">
              <img src={sideImages[1] || "/image 121.png"} alt="Workspace" />
              <div
                className="tranquil-perch-showmore"
                onClick={handleShowMore}
              >
                <MdOutlineContentCopy size={20} /> Show more
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE SLIDER */}
        <div className="tranquil-perch-images mobile-view" onScroll={handleScroll}>
          {images.map((img, index) => (
            <div className="tranquil-perch-slide" key={index}>
              <img src={img || "/image 71.png"} alt={`slide-${index}`} />
              {/* Show more visible only on last image */}
              {index === images.length - 1 && (
                <div
                  className="tranquil-perch-showmore-mobile"
                  onClick={handleShowMore}
                >
                  <MdOutlineContentCopy size={18} /> Show more
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Dots below slider */}
        <div className="tranquil-perch-dots mobile-view">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
            ></span>
          ))}
        </div>
      </div>

      {/* Price Section */}
      <div className="property-price-section">
        <div className="price-details">
          <h2>
            {pricePerNight ? `₹${pricePerNight}` : "₹4,999"}{" "}
            <span>/ per night</span>
          </h2>
          <p>{getPropertyLocation()}</p>
        </div>
        <div className="book-button">
          <button className="book-now-btn" onClick={handleBookNow}>
            Book Now
          </button>
        </div>
      </div>
    </>
  );
}