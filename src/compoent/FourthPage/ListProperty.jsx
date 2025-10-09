import React from 'react';
import './ListingSteps.css';
import { FaHouseUser } from 'react-icons/fa';
import { GiHammerNails } from 'react-icons/gi';
import { FaRupeeSign } from 'react-icons/fa';

function ListingSteps() {
  return (
    <section className="listing-steps-section">
      <h2 className="listing-steps-title">Listings is Easy as taking Steps</h2>

      <div className="listing-steps-container">
        <div className="listing-step-card">
          <div className="icon-wrapper">
            <FaHouseUser className="step-icon" />
          </div>
          <h2 className="step-heading">Create your Listing</h2>
          <p className="step-text">
            Upload stunning photos, complete descriptions, and all the necessary details and amenities your property offers.
          </p>
        </div>

        <div className="listing-step-card">
          <div className="icon-wrapper">
            <GiHammerNails className="step-icon" />
          </div>
          <h3 className="step-heading">Publish Instantly</h3>
          <p className="step-text">
            Set your rent and terms, publish your listing instantly — your property will be live and visible to thousands of potential tenants.
          </p>
        </div>

        <div className="listing-step-card">
          <div className="icon-wrapper">
            <FaRupeeSign className="step-icon" />
          </div>
          <h3 className="step-heading">Manage Enquiries</h3>
          <p className="step-text">
            Receive and track enquiries from your dashboard, communicate with potential tenants, and schedule viewings with ease.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ListingSteps;
