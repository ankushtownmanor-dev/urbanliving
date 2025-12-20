import React from 'react';
import './PropertyFlowDiagram.css';

const PropertyFlowDiagram = () => {
  const steps = [
    {
      title: "Owner/Host Registration",
      content: [
        "The owner/host creates an account on the platform by entering basic details such as:",
        "Name, Email, Phone number, Password",
        "After registration, the owner/host gets access to the Owner/Host Dashboard."
      ]
    },
    {
      title: "KYC & Property Verification",
      content: [
        "Before listing a property, the owner/host must complete verification:",
        "Upload ID proof",
        "Upload property ownership document",
        "Submit address proof",
        "Once documents are approved, the owner/host becomes eligible to list a property."
      ]
    },
    {
      title: "Add New Property",
      content: [
        "The owner/host clicks on 'Add Property' and fills the main information:",
        "Property type (Room / Apartment / Villa / House)",
        "Number of rooms",
        "Occupancy",
        "Exact location",
        "Amenities (Wi-Fi, AC, Parking, etc.)"
      ]
    },
    {
      title: "Upload Photos & Videos",
      content: [
        "The owner/host uploads high-quality images of:",
        "Bedroom",
        "Bathroom",
        "Kitchen",
        "Living area",
        "Outside view",
        "Good photos help attract more guests."
      ]
    },
    {
      title: "Set Pricing & Availability",
      content: [
        "The owner/host sets:",
        "Per-night price",
        "Cleaning fee (if any)",
        "Security deposit",
        "Available dates (calendar)",
        "Minimum / maximum stay rules",
        "This works exactly like the Airbnb pricing model."
      ]
    },
    {
      title: "House Rule & Policies",
      content: [
        "Owner/Host adds important rules:",
        "Check-in and check-out time",
        "Smoking allowed or not",
        "Pets allowed or not",
        "Party rules",
        "These rules are visible to guests."
      ]
    },
    {
      title: "Publish Listing",
      content: [
        "Once everything is filled, the owner/host clicks 'Publish'.",
        "Our team reviews it and approves the property for live listing."
      ]
    },
    {
      title: "Booking Management",
      content: [
        "After the property becomes live, the owner/host can:",
        "Receive booking requests",
        "Accept or decline bookings",
        "Chat with guests",
        "View upcoming stays",
        "The owner/host gets notifications on the app/website."
      ]
    },
    {
      title: "Payments & Earning",
      content: [
        "After 24 hours of guest check-out:",
        "The booking amount is processed securely",
        "Owner/Host receives payout directly into their bank account within 24-48 hours",
        "Real-time tracking of earnings in the dashboard"
      ]
    },
    {
      title: "Review & Ratings",
      content: [
        "After every stay:",
        "Guests can rate the property",
        "Good ratings increase visibility and bookings"
      ]
    }
  ];

  const chunkArray = (arr, size) => {
    const chunked = [];
    for (let i = 0; i < arr.length; i += size) {
      chunked.push(arr.slice(i, i + size));
    }
    return chunked;
  };

  const rows = chunkArray(steps, 2);

  return (
    <div className="flow-wrapper">
      <div className="main-header">
        <h1>How We <span className="highlight">Manage Hosting</span></h1>
        <p>A complete step-by-step guide for property owners/hosts.</p>
      </div>

      <div className="diagram-container">
        {rows.map((rowItems, rowIndex) => {
          const isReverse = rowIndex % 2 !== 0;
          
          return (
            <div key={rowIndex} className={`process-row ${isReverse ? 'row-reverse' : 'row-normal'}`}>
              
              {/* --- 1. Upper Card --- */}
              <div className="card-box upper-pos">
                <div className="card-content">
                  <div className="card-header">
                    <h3>{rowItems[0].title}</h3>
                  </div>
                  <div className="card-body">
                    <ul>{rowItems[0].content.map((t, i) => <li key={i}>{t}</li>)}</ul>
                  </div>
                </div>
              </div>

              {/* --- 2. The Step Connector (Z-Shape) --- */}
              {rowItems[1] && (
                <div className="connector-step">
                  <div className="step-line-top"></div>
                  <div className="step-line-vertical"></div>
                  <div className="step-line-bottom"></div>
                  <div className="connector-circle"></div>
                </div>
              )}

              {/* --- 3. Lower Card --- */}
              {rowItems[1] && (
                <div className="card-box lower-pos">
                  <div className="card-content">
                    <div className="card-header">
                      <h3>{rowItems[1].title}</h3>
                    </div>
                    <div className="card-body">
                      <ul>{rowItems[1].content.map((t, i) => <li key={i}>{t}</li>)}</ul>
                    </div>
                  </div>

                  {/* Vertical Drop to Next Row */}
                  {rowIndex < rows.length - 1 && (
                    <div className="vertical-drop-line">
                      <div className="line-v"></div>
                      <div className="circle-v"></div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyFlowDiagram;