import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, FiMapPin, FiShare, FiHeart, FiCheck, 
  FiUser, FiCalendar, FiShield, FiStar 
} from 'react-icons/fi';
import { BiBed, BiBath, BiArea, BiBuildingHouse } from 'react-icons/bi';
import './PropertyDetailPage.css';

// Using production server
const API_BASE_URL = 'https://townmanor.ai/api/ovika';

const getPhotoUrl = (photo) => {
  if (!photo) return null;
  if (photo.startsWith('http')) return photo;
  if (photo.includes('/uploads/')) {
    return `${API_BASE_URL}${photo.startsWith('/') ? '' : '/'}${photo}`;
  }
  return `${API_BASE_URL}/uploads/${photo.startsWith('/') ? photo.substring(1) : photo}`;
};

const formatCurrency = (num) => {
  if (!num && num !== 0) return 'N/A';
  return Number(num).toLocaleString('en-IN');
};

// Data Helper
const transformPropertyData = (data) => {
  if (!data) return null;
  return {
    ...data,
    amenities: Array.isArray(data.amenities) 
      ? data.amenities 
      : (typeof data.amenities === 'string' ? JSON.parse(data.amenities) : []),
    photos: Array.isArray(data.photos) ? data.photos : (data.photos ? [data.photos] : [])
  };
};

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/properties/${id}`);
        if (!res.ok) throw new Error('Failed to load');
        const data = await res.json();
        setProperty(transformPropertyData(data?.data || data));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProperty();
  }, [id]);

  if (loading) return <div className="loader-screen"><div className="spinner"></div></div>;
  if (!property) return <div className="error-screen">Property not found</div>;

  const photos = property.photos || [];
  
  // Pricing logic
  const baseRate = Number(property.base_rate) || 0;
  const nights = Number(property.number_of_nights) || 1;
  const fees = (Number(property.cleaning_fee)||0) + (Number(property.service_fee)||0);
  const total = (baseRate * nights) + fees;

  return (
    <div className="detail-page-wrapper">
      {/* --- Header Section --- */}
      <div className="detail-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft /> Back
        </button>
        <div className="header-actions">
          <button className="action-btn"><FiShare /> Share</button>
          <button className="action-btn"><FiHeart /> Save</button>
        </div>
      </div>

      {/* --- Title & Location --- */}
      <section className="title-section">
        <h1>{property.property_name}</h1>
        <div className="location-row">
          <FiMapPin className="icon" />
          <span>{property.address}, {property.city}</span>
          <span className="dot">•</span>
          <span className="rating"><FiStar className="star" /> New Listing</span>
        </div>
      </section>

      {/* --- Modern Image Grid --- */}
      <section className="image-gallery">
        <div className="main-frame">
          <img 
            src={getPhotoUrl(photos[activeImg]) || 'https://via.placeholder.com/800x500'} 
            alt="Main Property" 
          />
        </div>
        <div className="thumbnail-strip">
          {photos.map((p, idx) => (
            <div 
              key={idx} 
              className={`thumb-item ${activeImg === idx ? 'active' : ''}`}
              onClick={() => setActiveImg(idx)}
            >
              <img src={getPhotoUrl(p)} alt={`Thumb ${idx}`} />
            </div>
          ))}
        </div>
      </section>

      <div className="content-grid">
        {/* --- Left Column: Details --- */}
        <div className="details-column">
          
          {/* Key Features Bar */}
          <div className="features-bar">
            <div className="feature-box">
              <BiBed className="f-icon"/>
              <div>
                <strong>{property.bedrooms || 0}</strong>
                <span>Bedrooms</span>
              </div>
            </div>
            <div className="feature-box">
              <BiBath className="f-icon"/>
              <div>
                <strong>{property.bathrooms || 0}</strong>
                <span>Bathrooms</span>
              </div>
            </div>
            <div className="feature-box">
              <BiArea className="f-icon"/>
              <div>
                <strong>{property.area || 'N/A'}</strong>
                <span>Sq Ft</span>
              </div>
            </div>
            <div className="feature-box">
              <FiUser className="f-icon"/>
              <div>
                <strong>{property.max_guests || 2}</strong>
                <span>Guests</span>
              </div>
            </div>
          </div>

          <div className="divider"></div>

          {/* Description */}
          <div className="text-section">
            <h3>About this space</h3>
            <p>{property.description || "No description provided."}</p>
          </div>

          <div className="divider"></div>

          {/* Amenities */}
          <div className="text-section">
            <h3>What this place offers</h3>
            <div className="amenities-grid">
              {property.amenities.length > 0 ? property.amenities.map((am, i) => (
                <div key={i} className="amenity-item">
                  <FiCheck className="check-icon" /> {am}
                </div>
              )) : <p>No specific amenities listed.</p>}
            </div>
          </div>

          <div className="divider"></div>

          {/* Host Info */}
          <div className="host-card">
            <div className="host-avatar">
              <FiUser />
            </div>
            <div className="host-info">
              <h4>Hosted by {property.host?.name || 'Townmanor'}</h4>
              <p>Joined in 2024 • Responsive Host</p>
              {property.contact?.phone && <p className="contact-link">📞 {property.contact.phone}</p>}
            </div>
          </div>

        </div>

        {/* --- Right Column: Sticky Booking Card --- */}
        <div className="sidebar-column">
          <div className="booking-card">
            <div className="card-header">
              <div className="price-area">
                <span className="amount">₹{formatCurrency(baseRate)}</span>
                <span className="unit">/{property.billing_cycle || 'month'}</span>
              </div>
              <div className="review-badge">
                <FiStar /> <span>New</span>
              </div>
            </div>

            <div className="booking-details">
              <div className="date-picker-mock">
                <div className="date-box">
                  <label>CHECK-IN</label>
                  <span>{property.check_in_time || '12:00 PM'}</span>
                </div>
                <div className="date-box">
                  <label>CHECK-OUT</label>
                  <span>{property.check_out_time || '11:00 AM'}</span>
                </div>
              </div>
              
              <button className="reserve-btn">Reserve Now</button>
              <p className="hint">You won't be charged yet</p>

              <div className="price-breakdown">
                <div className="row">
                  <span>Base Fare</span>
                  <span>₹{formatCurrency(baseRate * nights)}</span>
                </div>
                {(property.cleaning_fee > 0) && (
                  <div className="row">
                    <span>Cleaning Fee</span>
                    <span>₹{formatCurrency(property.cleaning_fee)}</span>
                  </div>
                )}
                <div className="row total">
                  <span>Total before taxes</span>
                  <span>₹{formatCurrency(total)}</span>
                </div>
              </div>
            </div>

            <div className="card-footer">
              <FiShield className="shield-icon"/>
              <span>Secure Booking Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;