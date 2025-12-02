import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PropertyDetailPage.css';

const API_BASE_URL = 'http://localhost:3030/api/ovika'; // update if needed

const getPhotoUrl = (photo) => {
  if (!photo) return null;
  if (typeof photo !== 'string') return null;
  
  // If it's already a full URL, return as is
  if (photo.startsWith('http://') || photo.startsWith('https://')) {
    return photo;
  }
  
  // If it already includes the full path with /uploads/, return as is
  if (photo.includes('/uploads/')) {
    return `${API_BASE_URL}${photo.startsWith('/') ? '' : '/'}${photo}`;
  }
  
  // Otherwise, construct the full URL
  return `${API_BASE_URL}/uploads/${photo.startsWith('/') ? photo.substring(1) : photo}`;
};

const formatCurrency = (num) => {
  if (num === null || num === undefined) return 'N/A';
  return Number(num).toLocaleString('en-IN');
};

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/properties/${id}`);
        if (!res.ok) throw new Error('Property not found');
        const data = await res.json();
        setProperty(data.data || data);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Error fetching property');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProperty();
  }, [id]);

  if (loading) return <div className="loading">Loading property details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!property) return <div className="not-found">Property not found</div>;

  const photos = Array.isArray(property.photos) ? property.photos : [];

  const changeImage = (index) => {
    if (index === currentImageIndex) return;
    setFade(true);
    setTimeout(() => {
      setCurrentImageIndex(index);
      setFade(false);
    }, 250);
  };

  const nextImage = () => {
    if (!photos.length) return;
    changeImage((currentImageIndex + 1) % photos.length);
  };
  const prevImage = () => {
    if (!photos.length) return;
    changeImage((currentImageIndex - 1 + photos.length) % photos.length);
  };

  // Use backend-provided nights if available
  const nights = property.number_of_nights ?? property.rental_nights ?? null;

  // Fees only from API
  const baseRate = property.base_rate ?? null;
  const cleaningFee = property.cleaning_fee ?? null;
  const serviceFee = property.service_fee ?? null;
  const refundableDeposit = property.refundable_deposit ?? null;
  const includedUtilities = property.included_utilities ?? null;

  // Totals only if baseRate and nights available
  const totalBeforeFees = (baseRate !== null && nights) ? baseRate * nights : null;
  const totalAmount = totalBeforeFees !== null ? totalBeforeFees + (cleaningFee || 0) + (serviceFee || 0) + (refundableDeposit || 0) : null;

  // Helper to render object fields generically
  const renderObjectDetails = (obj) => {
    if (!obj || typeof obj !== 'object') return null;
    return (
      <div className="info-grid">
        {Object.entries(obj).map(([k, v]) => (
          <div key={k} className="info-item">
            <div className="info-key">{k.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</div>
            <div className="info-value">{(v === null || v === undefined || v === '') ? 'N/A' : String(v)}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="property-detail-container">
      <button className="back-button" onClick={() => navigate(-1)} aria-label="Back to list">← Back to Properties</button>

      <div className="property-header">
        <h1>{property.property_name || 'Untitled Property'}</h1>
        <div className="property-location">
          {property.address && <span>{property.address}</span>}
          {property.city && <span>{property.city}</span>}
          {property.state && <span>{property.state}</span>}
        </div>
      </div>

      <div className="property-gallery">
        {photos.length > 0 ? (
          <>
            <div className="main-image">
              <img
                src={getPhotoUrl(photos[currentImageIndex])}
                alt={`${property.property_name || 'Property'} image ${currentImageIndex + 1}`}
                className={fade ? 'fade-out' : ''}
                onError={(e) => {
                  console.error('Failed to load image:', photos[currentImageIndex]);
                  e.target.src = 'https://via.placeholder.com/800x500?text=Image+Not+Available';
                  e.target.onerror = null; // Prevent infinite loop if placeholder also fails
                }}
              />
              {photos.length > 1 && (
                <>
                  <button className="nav-button prev" onClick={prevImage} aria-label="Previous image">‹</button>
                  <button className="nav-button next" onClick={nextImage} aria-label="Next image">›</button>
                </>
              )}
              <div className="image-counter">{currentImageIndex + 1} / {photos.length}</div>
            </div>

            <div className="thumbnail-container" aria-hidden={photos.length === 0}>
              {photos.map((p, idx) => {
                const photoUrl = getPhotoUrl(p);
                return (
                  <div
                    key={idx}
                    className={`thumbnail ${idx === currentImageIndex ? 'active' : ''}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => changeImage(idx)}
                    onKeyDown={(e) => { if (e.key === 'Enter') changeImage(idx); }}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img 
                      src={photoUrl} 
                      alt={`Thumbnail ${idx + 1}`}
                      onError={(e) => {
                        console.error('Failed to load thumbnail:', p);
                        e.target.src = 'https://via.placeholder.com/100x75?text=Image';
                        e.target.onerror = null;
                      }}
                    />
                  </div>
                );
              })}
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
              <span className="highlight-value">{property.bedrooms ?? '0'}</span>
              <span className="highlight-label">Beds</span>
            </div>
            <div className="highlight">
              <span className="highlight-value">{property.bathrooms ?? '0'}</span>
              <span className="highlight-label">Baths</span>
            </div>
            <div className="highlight">
              <span className="highlight-value">{property.area ? `${property.area}` : 'N/A'}</span>
              <span className="highlight-label">Area</span>
            </div>
            <div className="highlight">
              <span className="highlight-value">{property.property_type || 'N/A'}</span>
              <span className="highlight-label">Type</span>
            </div>
          </div>

          <div className="section">
            <div className="section-header">About this place</div>
            <div className="section-body">{property.description || 'No description available.'}</div>
          </div>

          {/* Amenities */}
          {Array.isArray(property.amenities) && property.amenities.length > 0 && (
            <div className="section">
              <div className="section-header">What this place offers</div>
              <div className="tags">
                {property.amenities.map((a, i) => <div key={i} className="tag">{a}</div>)}
              </div>
            </div>
          )}

          {/* Rules */}
          {property.rules && (
            <div className="section">
              <div className="section-header">House Rules</div>
              <div className="section-body">{property.rules}</div>
            </div>
          )}

          {/* Policies */}
          {property.policies && (
            <div className="section">
              <div className="section-header">Policies</div>
              <div className="section-body">{property.policies}</div>
            </div>
          )}

          {/* Availability */}
          {(property.available_from || property.available_to) && (
            <div className="section">
              <div className="section-header">Availability</div>
              <div className="info-grid">
                {property.available_from && (
                  <div className="info-item">
                    <div className="info-key">Available from</div>
                    <div className="info-value">{property.available_from}</div>
                  </div>
                )}
                {property.available_to && (
                  <div className="info-item">
                    <div className="info-key">Available to</div>
                    <div className="info-value">{property.available_to}</div>
                  </div>
                )}
                {property.booking_status && (
                  <div className="info-item">
                    <div className="info-key">Booking status</div>
                    <div className="info-value">{property.booking_status}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Features / extras */}
          {property.features && (
            <div className="section">
              <div className="section-header">Features</div>
              {Array.isArray(property.features) ? (
                <div className="tags">{property.features.map((f, i) => <div key={i} className="tag">{f}</div>)}</div>
              ) : (
                <div className="section-body">{property.features}</div>
              )}
            </div>
          )}

          {/* Nearby / location info */}
          {property.nearby && (
            <div className="section">
              <div className="section-header">Nearby</div>
              <div className="section-body">{Array.isArray(property.nearby) ? property.nearby.join(', ') : property.nearby}</div>
            </div>
          )}

          {/* Custom metadata / object */}
          {property.meta && (
            <div className="section">
              <div className="section-header">Additional details</div>
              <div className="section-body">{renderObjectDetails(property.meta)}</div>
            </div>
          )}

          {/* Host */}
          {property.host && (
            <div className="section">
              <div className="section-header">Hosted by {property.host.name || 'Owner'}</div>
              <div className="host-details" style={{ marginTop: '0.6rem' }}>
                {property.host.avatar && <img src={property.host.avatar} alt={property.host.name || 'Host'} className="host-avatar" />}
                <div>
                  {property.host.joined && <div style={{ marginBottom: 6 }}>Host since {property.host.joined}</div>}
                  {property.host.verified && <div className="verified-badge">✓ Verified</div>}
                  {property.host.about && <div style={{ marginTop: 8 }}>{property.host.about}</div>}
                </div>
              </div>
            </div>
          )}
        </div>

        <aside className="booking-widget" aria-live="polite">
          <div className="price-box">
            <div className="price">{baseRate !== null ? `₹${formatCurrency(baseRate)}` : 'N/A'}</div>
            <div className="price-period">{property.billing_cycle || 'per month'}</div>
          </div>

          {/* Display-only date/guest values coming from API only */}
          <div className="section">
            <div className="section-header">Booking Info</div>
            <div className="section-body">
              {/* Check-in / Check-out if provided by API */}
              {property.check_in_date ? (
                <div className="date-display">
                  <label>Check-in</label>
                  <div className="display-value">{property.check_in_date}</div>
                </div>
              ) : null}

              {property.check_out_date ? (
                <div className="date-display">
                  <label>Check-out</label>
                  <div className="display-value">{property.check_out_date}</div>
                </div>
              ) : null}

              {property.guests ? (
                <div className="guests-display">
                  <label>Guests</label>
                  <div className="display-value">{property.guests} {property.guests > 1 ? 'Guests' : 'Guest'}</div>
                </div>
              ) : null}

              {/* Nights from backend if present */}
              {nights !== null && (
                <div style={{ marginTop: 8 }}>
                  <div className="info-key">Nights</div>
                  <div className="info-value">{nights}</div>
                </div>
              )}
            </div>
          </div>

          {/* Price breakdown (only from API fields) */}
          <div className="price-breakdown" aria-hidden={totalBeforeFees === null && cleaningFee === null && serviceFee === null && refundableDeposit === null}>
            {baseRate !== null && nights !== null && (
              <div className="price-row">
                <span>₹{formatCurrency(baseRate)} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
                <span>₹{formatCurrency(totalBeforeFees)}</span>
              </div>
            )}

            {cleaningFee !== null && cleaningFee > 0 && (
              <div className="price-row">
                <span>Cleaning fee</span>
                <span>₹{formatCurrency(cleaningFee)}</span>
              </div>
            )}

            {serviceFee !== null && serviceFee > 0 && (
              <div className="price-row">
                <span>Service fee</span>
                <span>₹{formatCurrency(serviceFee)}</span>
              </div>
            )}

            {refundableDeposit !== null && refundableDeposit > 0 && (
              <div className="price-row">
                <span>Refundable deposit</span>
                <span>₹{formatCurrency(refundableDeposit)}</span>
              </div>
            )}

            {/* Included utilities list */}
            {includedUtilities && (
              <div style={{ marginTop: 8 }}>
                <div className="info-key">Included utilities</div>
                <div className="info-value">{Array.isArray(includedUtilities) ? includedUtilities.join(', ') : includedUtilities}</div>
              </div>
            )}

            {totalAmount !== null && (
              <div className="price-total">
                <span>Total</span>
                <span>₹{formatCurrency(totalAmount)}</span>
              </div>
            )}
          </div>

          {/* Contact / host contact if provided */}
          {(property.contact || (property.host && (property.host.phone || property.host.email))) && (
            <div className="contact-card">
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Contact</div>
              {property.contact && property.contact.phone && <div className="contact-row"><span>Phone</span><span>{property.contact.phone}</span></div>}
              {property.contact && property.contact.email && <div className="contact-row"><span>Email</span><span>{property.contact.email}</span></div>}
              {property.host && property.host.phone && <div className="contact-row"><span>Host phone</span><span>{property.host.phone}</span></div>}
              {property.host && property.host.email && <div className="contact-row"><span>Host email</span><span>{property.host.email}</span></div>}
            </div>
          )}

          {/* Additional quick info grid */}
          <div style={{ marginTop: 12 }}>
            <div className="info-grid">
              {property.floor && <div className="info-item"><div className="info-key">Floor</div><div className="info-value">{property.floor}</div></div>}
              {property.year_built && <div className="info-item"><div className="info-key">Year built</div><div className="info-value">{property.year_built}</div></div>}
              {property.parking && <div className="info-item"><div className="info-key">Parking</div><div className="info-value">{property.parking}</div></div>}
              {property.pet_friendly !== undefined && <div className="info-item"><div className="info-key">Pet friendly</div><div className="info-value">{property.pet_friendly ? 'Yes' : 'No'}</div></div>}
              {property.furnishing && <div className="info-item"><div className="info-key">Furnishing</div><div className="info-value">{property.furnishing}</div></div>}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PropertyDetailPage;