import React from 'react';
import { FaHouseChimney, FaHammer } from "react-icons/fa6";
import { FaRupeeSign } from "react-icons/fa";

function ListingSteps() {
  return (
    <section style={{
      width: '100%',
      padding: '60px 20px',
      textAlign: 'center',
      backgroundColor: '#fff',
      fontFamily: "'Poppins', sans-serif"
    }}>
      <h2 style={{
        fontSize: '2.8rem',
        fontWeight: '480',
        marginBottom: '50px',
        color: '#111'
      }}>
        Listings is Easy as taking Steps
      </h2>
      
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '50px'
      }}>
        <div style={{
          flex: '1 1 250px',
          maxWidth: '300px',
          textAlign: 'left'
        }}>
          <div style={{
            width: '55px',
            height: '55px',
            background: '#fff',
            borderRadius: '50%',
            border: '2px solid #c91f22',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            marginBottom: '15px'
          }}>
            <FaHouseChimney style={{
              fontSize: '24px',
              color: '#c91f22'
            }} />
          </div>
          <h3 style={{
            fontSize: '1.6rem',
            fontWeight: '460',
            marginBottom: '10px',
            color: '#000'
          }}>
            Create your Listing
          </h3>
          <p style={{
            fontSize: '1rem',
            color: '#555',
            lineHeight: '1.5',
            margin: '0'
          }}>
            Upload stunning photos, complete descriptions, and all the necessary details and amenities your property offers.
          </p>
        </div>

        <div style={{
          flex: '1 1 250px',
          maxWidth: '300px',
          textAlign: 'left'
        }}>
          <div style={{
            width: '55px',
            height: '55px',
            background: '#fff',
            borderRadius: '50%',
            border: '2px solid #c91f22',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            marginBottom: '15px'
          }}>
            <FaHammer style={{
              fontSize: '24px',
              color: '#c91f22'
            }} />
          </div>
          <h3 style={{
            fontSize: '1.6rem',
            fontWeight: '460',
            marginBottom: '10px',
            color: '#000'
          }}>
            Publish Instantly
          </h3>
          <p style={{
            fontSize: '1rem',
            color: '#555',
            lineHeight: '1.5',
            margin: '0'
          }}>
            Set your rent and terms, publish your listing instantly — your property will be live and visible to thousands of potential tenants.
          </p>
        </div>

        <div style={{
          flex: '1 1 250px',
          maxWidth: '300px',
          textAlign: 'left'
        }}>
          <div style={{
            width: '55px',
            height: '55px',
            background: '#fff',
            borderRadius: '50%',
            border: '2px solid #c91f22',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            marginBottom: '15px'
          }}>
            <FaRupeeSign style={{
              fontSize: '24px',
              color: '#c91f22'
            }} />
          </div>
          <h3 style={{
            fontSize: '1.6rem',
            fontWeight: '460',
            marginBottom: '10px',
            color: '#000'
          }}>
            Manage Enquiries
          </h3>
          <p style={{
            fontSize: '1rem',
            color: '#555',
            lineHeight: '1.5',
            margin: '0'
          }}>
            Receive and track enquiries from your dashboard, communicate with potential tenants, and schedule viewings with ease.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section h2 {
            font-size: 1.6rem !important;
            margin-bottom: 30px !important;
          }
          
          section > div {
            flex-direction: column !important;
            gap: 40px !important;
          }
          
          section > div > div {
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}

export default ListingSteps;