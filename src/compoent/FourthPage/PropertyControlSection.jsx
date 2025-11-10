import React from "react";
import "./PropertyControlSection.css";
import propertyHouseImg from "/image219.png"; // Apna image path yaha update karo

const PropertyControlSection = () => {
  return (
    <section className="prop-ctrl-wrapper">
      <div className="prop-ctrl-image-container">
        {/* Background Property Image */}
        <img 
          src={propertyHouseImg} 
          alt="Modern Luxury Property" 
          className="prop-ctrl-bg-img"
        />
        
        {/* Text Overlay with Light Background */}
        <div className="prop-ctrl-text-overlay">
          <h2 className="prop-ctrl-heading">
            Complete Control at Your Fingertips
          </h2>
          <p className="prop-ctrl-description">
            Want full control over your property listing? Ovika gives you the freedom to upload and managers property on your own terms. Easily add photos, set rent details, write descriptions and published properly instantly on our platform with our simple and user friendly interface you can reach potential tenants and directly track enquiry and update the details anytime you want, it is the Perfect choice for property owner so proper independent and hands on management while benefiting from Ovika trusted platform and audience reach
          </p>
        </div>
      </div>
    </section>
  );
};

export default PropertyControlSection;