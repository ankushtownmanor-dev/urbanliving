import React from 'react';
import './ListPropertyPage.css';
import { IoArrowForward } from 'react-icons/io5';
import { FaUser, FaCamera, FaCheckCircle, FaPlay, FaShieldAlt, FaCreditCard, FaUsers, FaGlobe } from 'react-icons/fa';

const ListPropertyPage = () => {
  return (
    <div className="list-property-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
        </div>
      </div>

      {/* How It Works Section */}
      {/* Title and Subtitle Section */}
      <div className="how-it-works-header-section">
        <div className="container">
          <h2 className="how-it-works-title">How It Works</h2>
          <p className="how-it-works-subtitle">
            Listing your property on Ovika is a simple and straightforward process. Follow
            these four easy steps to get started.
          </p>
        </div>
      </div>
      
      {/* Steps Section */}
      <div className="how-it-works-steps-section">
        <div className="container">
          <div className="steps-grid">
            <div className="step-card step-register">
              <div className="step-icon">
                <FaUser />
              </div>
              <h3 className="step-title">1. Register your property</h3>
              <p className="step-description">Create your account and list details about your property</p>
            </div>
            
            <div className="step-card step-photos">
              <div className="step-icon">
                <FaCamera />
              </div>
              <h3 className="step-title">2. Add photos & info</h3>
              <p className="step-description">Upload high quality images and provide detailed description</p>
            </div>
            
            <div className="step-card step-verified">
              <div className="step-icon">
                <FaCheckCircle />
              </div>
              <h3 className="step-title">3. Get verified</h3>
              <p className="step-description">Our team will review and verify your listing for authenticity</p>
            </div>
            
            <div className="step-card step-earn">
              <div className="step-icon">
                <FaPlay />
              </div>
              <h3 className="step-title">4. Go Live & Earn</h3>
              <p className="step-description">Thousands of potential renters and buyers instantly</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="benefits-section">
        <div className="container">
          <h2>Benefit of Listing with Ovika</h2>
          <p className="section-subtitle">
            Experience the advantage of listing your property with Ovika and unlock world of opportunity
          </p>
          
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaGlobe />
              </div>
              <h3>Wide Reach</h3>
              <p>Connect with a bath network of potential tenants and buyers across the country</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaUsers />
              </div>
              <h3>Trusted tenants</h3>
              <p>Access pool of verified and reliable tenants and sharing secure rental experience</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaShieldAlt />
              </div>
              <h3>Easy management</h3>
              <p>manager listings in acquire and agreements spotlessly from one dashboard</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaCreditCard />
              </div>
              <h3>Secure payments</h3>
              <p>Ensure safe and secure for your piece of mind with integrity payment data</p>
            </div>
          </div>
        </div>
      </div>

      {/* Property Types Section */}
      <div className="property-types-section">
        <div className="container">
          <h2>List any Property type</h2>
          <p className="section-subtitle">
            From cozy PGs to luxurious Villas, Ovika is a perfect platform to showcase your property
          </p>
          
          <div className="property-types-grid">
            <div className="property-type-card">
              <div className="property-image">
                <img src="/image 189.png" alt="PG" />
              </div>
              <div className="property-overlay">
                <h3>PG</h3>
                <p>Affordable share leaving spaces</p>
              </div>
            </div>
            
            <div className="property-type-card">
              <div className="property-image">
                <img src="/image 190.png" alt="Co-living" />
              </div>
              <div className="property-overlay">
                <h3>Co-living</h3>
                <p>community-focused shared residences</p>
              </div>
            </div>
            
            <div className="property-type-card">
              <div className="property-image">
                <img src="/image 191.png" alt="Apartments" />
              </div>
              <div className="property-overlay">
                <h3>Apartments</h3>
                <p>Affordable share leaving spaces</p>
              </div>
            </div>
            
            <div className="property-type-card">
              <div className="property-image">
                <img src="/image 192.png" alt="Villa" />
              </div>
              <div className="property-overlay">
                <h3>Villa</h3>
                <p>Independent living units spacious</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section (commented out) */}
      {false && (
      <div className="testimonials-section">
        <div className="container">
          <h2>Join our happy clients</h2>
          <p className="section-subtitle">
            See what property area are saying about their experience with Ovika
          </p>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-header">
                <div className="user-avatar">
                  <img src="/image 124.png" alt="Riya Tanwar" />
                </div>
                <div className="user-info">
                  <h4>Riya Tanwar</h4>
                  <p>1 month ago</p>
                  <div className="rating">★★★★★</div>
                </div>
              </div>
              <p className="testimonial-text">
                We had a really nice time staying at Noida. The location was very nice and in a good locality. Easily accessible to all places and It felt like home and the room was kept very neat and clean.
              </p>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-header">
                <div className="user-avatar">
                  <img src="/image 123.png" alt="Parvesh Verma" />
                </div>
                <div className="user-info">
                  <h4>Parvesh Verma</h4>
                  <p>2 months ago</p>
                  <div className="rating">★★★★★</div>
                </div>
              </div>
              <p className="testimonial-text">
                my stay was fantastic, good sir if you are looking for luxury in this price this is the best deal at all, the place was great, and most importantly the place was neat and well maintained.
              </p>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-header">
                <div className="user-avatar">
                  <img src="/image 122.png" alt="Anil Kumar" />
                </div>
                <div className="user-info">
                  <h4>Anil Kumar</h4>
                  <p>1 month ago</p>
                  <div className="rating">★★★★★</div>
                </div>
              </div>
              <p className="testimonial-text">
                I had a wonderful stay at this Townmore! The place was clean, comfortable, and exactly as described. It felt like a home away from home. Vijay, the host, is an amazing person.
              </p>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default ListPropertyPage;
