import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PropertyDetailPage.css';

const API_BASE_URL = 'http://localhost:3030/api/ovika';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [error, setError] = useState(null);

  const fetchProperty = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/properties/${id}`);
      if (!response.ok) {
        throw new Error('Property not found');
      }
      const data = await response.json();
      setProperty(data.data || data); // Handle both {data: {...}} and direct property object
    } catch (err) {
      setError(err.message);
      console.error('Error fetching property:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProperty();
    }
  }, [id]);

  const nextImage = () => {
    if (!property?.photos?.length) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === property.photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    if (!property?.photos?.length) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? property.photos.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return <div className="loading">Loading property details...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!property) {
    return <div className="not-found">Property not found</div>;
  }

  return (
    <div className="property-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to Properties
      </button>
      
      <div className="property-header">
        <h1>{property.property_name || 'Untitled Property'}</h1>
        <div className="property-location">
          {property.address && <span>{property.address}</span>}
          {property.city && <span>, {property.city}</span>}
        </div>
      </div>

      <div className="property-gallery">
        {property.photos && property.photos.length > 0 ? (
          <>
            <div className="main-image">
              <img 
                src={`${API_BASE_URL}/uploads/${property.photos[currentImageIndex]}`} 
                alt={property.property_name || 'Property image'} 
              />
              <button className="nav-button prev" onClick={prevImage}>‹</button>
              <button className="nav-button next" onClick={nextImage}>›</button>
              <div className="image-counter">
                {currentImageIndex + 1} / {property.photos.length}
              </div>
            </div>
            <div className="thumbnail-container">
              {property.photos.map((img, index) => (
                <div 
                  key={index} 
                  className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img 
                    src={`${API_BASE_URL}/uploads/${img}`} 
                    alt={`${property.property_name || 'Property'} ${index + 1}`} 
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="no-images">No images available</div>
        )}
      </div>

      <div className="property-content">
        <div className="property-details">
          <div className="property-highlights">
            <div className="highlight">
              <span className="highlight-value">{property.bedrooms || 0}</span>
              <span className="highlight-label">Beds</span>
            </div>
            <div className="highlight">
              <span className="highlight-value">{property.bathrooms || 0}</span>
              <span className="highlight-label">Baths</span>
            </div>
            <div className="highlight">
              <span className="highlight-value">{property.area || 'N/A'}</span>
              <span className="highlight-label">Sq.ft</span>
            </div>
          </div>

          <div className="property-description">
            <h2>About this place</h2>
            <p>{property.description || 'No description available.'}</p>
          </div>

          {property.amenities && property.amenities.length > 0 && (
            <div className="property-amenities">
              <h2>What this place offers</h2>
              <div className="amenities-grid">
                {Array.isArray(property.amenities) ? (
                  property.amenities.map((amenity, index) => (
                    <div key={index} className="amenity-item">
                      <span>✓</span> {amenity}
                    </div>
                  ))
                ) : (
                  <p>No amenities listed</p>
                )}
              </div>
            </div>
          )}

          {property.host && (
            <div className="property-host">
              <h2>Hosted by {property.host.name || 'Property Owner'}</h2>
              {property.host.avatar && (
                <div className="host-details">
                  <img 
                    src={property.host.avatar} 
                    alt={property.host.name || 'Host'} 
                    className="host-avatar" 
                  />
                  <div>
                    {property.host.joined && (
                      <p>Host since {property.host.joined}</p>
                    )}
                    {property.host.verified && (
                      <span className="verified-badge">✓ Verified</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="booking-widget">
          <div className="price-box">
            <span className="price">₹{property.base_rate ? property.base_rate.toLocaleString() : 'N/A'}</span>
            <span className="price-period">per month</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;