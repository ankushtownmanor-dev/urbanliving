import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, FiMapPin, FiShare, FiHeart, FiCheck, FiXCircle,
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
  
  // Helper to parse JSON fields safely
  const parseJsonField = (field) => {
    if (!field) return [];
    if (Array.isArray(field)) return field;
    if (typeof field === 'string') {
      try { return JSON.parse(field); } catch (e) { return []; }
    }
    return [];
  };

  return {
    ...data,
    amenities: parseJsonField(data.amenities),
    photos: Array.isArray(data.photos) ? data.photos : (data.photos ? [data.photos] : []),
    parsedBedrooms: parseJsonField(data.bedrooms),
    parsedBathrooms: parseJsonField(data.bathrooms),
  };
};

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);

  // Helper to calculate totals
  const getTotal = (arr) => {
    if (!Array.isArray(arr)) return 0;
    // Handle case where arr might be legacy number wrapped in array or just the new objects
    return arr.reduce((acc, curr) => acc + (Number(curr.count) || (typeof curr === 'number' ? curr : 0)), 0);
  };
  
  // Try to handle legacy simple numbers if the backend returns them instead of JSON for old properties
  const getDisplayCount = (raw, parsed) => {
    const t = getTotal(parsed);
    if (t > 0) return t;
    return Number(raw) || 0;
  };

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
                <strong>{getDisplayCount(property.bedrooms, property.parsedBedrooms)}</strong>
                <span>Bedrooms</span>
              </div>
            </div>
            <div className="feature-box">
              <BiBath className="f-icon"/>
              <div>
                <strong>{getDisplayCount(property.bathrooms, property.parsedBathrooms)}</strong>
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

          {/* Bedroom/Bathroom Breakdown */}
          {(property.parsedBedrooms?.length > 0 || property.parsedBathrooms?.length > 0) && (
            <>
              <div className="divider"></div>
              <div className="text-section">
                <h3>Room Arrangements</h3>
                <div className="room-breakdown-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  {property.parsedBedrooms?.length > 0 && (
                    <div className="room-group">
                      <h4>Bedrooms</h4>
                      <ul style={{ listStyle: 'none', padding: 0, color: '#555' }}>
                        {property.parsedBedrooms.map((curr, i) => (
                           <li key={i} style={{ marginBottom: '4px' }}>
                             <strong>{curr.count}</strong> × {curr.type}
                           </li>
                        ))}
                      </ul>
                    </div>
                  )}
                   {property.parsedBathrooms?.length > 0 && (
                    <div className="room-group">
                      <h4>Bathrooms</h4>
                      <ul style={{ listStyle: 'none', padding: 0, color: '#555' }}>
                        {property.parsedBathrooms.map((curr, i) => (
                           <li key={i} style={{ marginBottom: '4px' }}>
                             <strong>{curr.count}</strong> × {curr.type}
                           </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

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

          {/* House Rules & Policies */}
          <div className="text-section">
            <h3>House Rules & Policies</h3>
            <div className="amenities-grid">
              <div className="amenity-card rule-card">
                 <div className="rule-icon">
                    {property.smoking_allowed 
                      ? <FiCheck className="text-green" /> 
                      : <FiXCircle className="text-red" />}
                 </div>
                 <div className="rule-info">
                   <span className="rule-label">Smoking</span>
                   <strong className={property.smoking_allowed ? "text-green" : "text-gray"}>
                     {property.smoking_allowed ? 'Allowed' : 'Not allowed'}
                   </strong>
                 </div>
              </div>

              <div className="amenity-card rule-card">
                 <div className="rule-icon">
                    {property.pets_allowed 
                      ? <FiCheck className="text-green" /> 
                      : <FiXCircle className="text-red" />}
                 </div>
                 <div className="rule-info">
                   <span className="rule-label">Pets</span>
                   <strong className={property.pets_allowed ? "text-green" : "text-gray"}>
                     {property.pets_allowed ? 'Allowed' : 'Not allowed'}
                   </strong>
                 </div>
              </div>

              <div className="amenity-card rule-card">
                 <div className="rule-icon">
                    {property.events_allowed 
                      ? <FiCheck className="text-green" /> 
                      : <FiXCircle className="text-red" />}
                 </div>
                 <div className="rule-info">
                   <span className="rule-label">Events</span>
                   <strong className={property.events_allowed ? "text-green" : "text-gray"}>
                     {property.events_allowed ? 'Allowed' : 'Not allowed'}
                   </strong>
                 </div>
              </div>

              <div className="amenity-card rule-card">
                 <div className="rule-icon">
                    {property.drinking_allowed 
                      ? <FiCheck className="text-green" /> 
                      : <FiXCircle className="text-red" />}
                 </div>
                 <div className="rule-info">
                   <span className="rule-label">Alcohol</span>
                   <strong className={property.drinking_allowed ? "text-green" : "text-gray"}>
                     {property.drinking_allowed ? 'Allowed' : 'Not allowed'}
                   </strong>
                 </div>
              </div>

              <div className="amenity-card rule-card">
                 <div className="rule-icon">
                    {property.outside_guests_allowed 
                      ? <FiCheck className="text-green" /> 
                      : <FiXCircle className="text-red" />}
                 </div>
                 <div className="rule-info">
                   <span className="rule-label">Outside Guests</span>
                   <strong className={property.outside_guests_allowed ? "text-green" : "text-gray"}>
                     {property.outside_guests_allowed ? 'Allowed' : 'Not allowed'}
                   </strong>
                 </div>
              </div>
            </div>
            
            {(property.cancellation_policy && property.cancellation_policy !== 'undefined') && (
              <div style={{ marginTop: '1rem', padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ display: 'block', marginBottom: '4px', fontSize: '0.9rem' }}>Cancellation Policy</strong>
                <span style={{ color: '#475569' }}>{property.cancellation_policy}</span>
              </div>
            )}
          </div>

          <div className="divider"></div>

            {/* Booking Card Section (Moved here) */}
          <div style={{ margin: '2rem 0' }}>
            <div className="booking-card" style={{ position: 'static', maxWidth: 'none', boxShadow: 'none', border: '1px solid #e2e8f0', background: '#f8fafc' }}>
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

                <div style={{ margin: '1.5rem 0' }}>
                   <button className="reserve-btn">Reserve Now</button>
                   <p className="hint" style={{ marginBottom: 0 }}>You won't be charged yet</p>
                </div>
              </div>

              <div className="card-footer">
                <FiShield className="shield-icon"/>
                <span>Secure Booking Guaranteed</span>
              </div>
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
      </div>
    </div>
  );
};

export default PropertyDetailPage;