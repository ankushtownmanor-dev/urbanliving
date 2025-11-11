import React from 'react';
import './ListingSteps.css';

const ListingSteps = () => {
  return (
    <section className="listing-steps-section">
      <h2 className="listing-steps-title">
        Listings is <span className="highlight-text">Easy</span> as taking Steps
      </h2>

      <div className="listing-steps-container">
        {/* Step 1 */}
        <div className="listing-step-card">
          <div className="step-image-wrapper">
            <img src="/Create your Listing.png" alt="Create your Listing" className="step-image" />
          </div>
          <h3 className="step-heading">Create your Listing</h3>
          <p className="step-text">
            Upload stunning photos, complete the description, and all the necessary details and amenities your property offers.
          </p>
        </div>

        {/* Step 2 */}
        <div className="listing-step-card">
          <div className="step-image-wrapper">
            <img src="/Publish Instantly.png" alt="Publish Instantly" className="step-image" />
          </div>
          <h3 className="step-heading">Publish Instantly</h3>
          <p className="step-text">
            Set your rent and terms, and publish your listing instantly. Your property will be live and visible to thousands of potential tenants across our platform.
          </p>
        </div>

        {/* Step 3 */}
        <div className="listing-step-card">
          <div className="step-image-wrapper">
            <img src="/Manage Enquiries.png" alt="Manage Enquiries" className="step-image" />
          </div>
          <h3 className="step-heading">Manage Enquiries</h3>
          <p className="step-text">
            Receive and track enquiries from your dashboard, communicate with potential tenants, and schedule viewings on your terms.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ListingSteps;