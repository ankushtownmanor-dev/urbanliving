import React from "react";
import "./PropertyControl.css";
 // Replace with your actual image path

const PropertyControl = () => {
  return (
    <div className="property-control-container">
      <div className="property-text-section">
        <h2>Complete Control at Your Figertips</h2>
        <p>
          Want full control over your property listing? Ovika gives you the
          freedom to upload and manage property on your own terms. Easily add
          photos, set rent details, write descriptions, and publish property
          instantly on our platform. With our simple and user-friendly
          interface, you can reach potential tenants, directly track enquiries,
          and update details anytime you want. It is the perfect choice for
          property owners who prefer independent and hands-on management while
          benefiting from Ovika’s trusted platform and audience reach.
        </p>
      </div>
      <div className="property-image-section">
        <img src='/public/image 219.png' alt="Property" />
      </div>
    </div>
  );
};

export default PropertyControl;
