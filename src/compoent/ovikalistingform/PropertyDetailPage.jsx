import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PropertyDetailPage.css';

// Using production server
const API_BASE_URL = 'https://townmanor.ai/api/ovika';

const getPhotoUrl = (photo) => {
  if (!photo) return null;
  if (typeof photo !== 'string') return null;

  if (photo.startsWith('http://') || photo.startsWith('https://')) {
    return photo;
  }

  // If photo already contains /uploads/ path, attach to API_BASE_URL appropriately
  if (photo.includes('/uploads/')) {
    return `${API_BASE_URL}${photo.startsWith('/') ? '' : '/'}${photo}`;
  }

  return `${API_BASE_URL}/uploads/${photo.startsWith('/') ? photo.substring(1) : photo}`;
};

const formatCurrency = (num) => {
  if (num === null || num === undefined) return 'N/A';
  return Number(num).toLocaleString('en-IN');
};

const transformPropertyData = (data) => {
  if (!data) return null;

  // Preserve values from API. For numeric fee fields, keep null if not provided (no hard defaults).
  const base_rate = data.hasOwnProperty('base_rate') ? data.base_rate : null;
  const cleaning_fee = data.hasOwnProperty('cleaning_fee') ? data.cleaning_fee : null;
  const service_fee = data.hasOwnProperty('service_fee') ? data.service_fee : null;
  const security_deposit = data.hasOwnProperty('security_deposit') ? data.security_deposit : null;

  return {
    ...data,
    property_name: data.property_name || 'Untitled Property',
    description: data.description || 'No description available.',
    city: data.city || '',
    address: data.address || '',
    bedrooms: data.bedrooms ?? null,
    bathrooms: data.bathrooms ?? null,
    area: data.area ?? null,
    property_type: data.property_type || '',
    amenities: Array.isArray(data.amenities) ? data.amenities : (typeof data.amenities === 'string' ? (() => { try { return JSON.parse(data.amenities); } catch(e) { return [data.amenities]; } })() : []),
    rules: data.rules || null,
    policies: data.policies || (data.cancellation_policy ? `Cancellation Policy: ${data.cancellation_policy}` : null),
    available_from: data.available_from || null,
    available_to: data.available_to || null,
    check_in_time: data.check_in_time || null,
    check_out_time: data.check_out_time || null,
    max_guests: data.guests ?? data.max_guests ?? null,
    base_rate,
    cleaning_fee,
    service_fee,
    security_deposit,
    photos: Array.isArray(data.photos) ? data.photos : (data.photos ? [data.photos] : []),
    min_stay: data.min_stay ?? data.min_stay_nights ?? null,
    smoking: data.hasOwnProperty('smoking') ? data.smoking : null,
    pets: data.hasOwnProperty('pets') ? data.pets : null,
    events: data.hasOwnProperty('events') ? data.events : null,
    quiet_hours: data.quiet_hours ?? null,
    number_of_nights: data.number_of_nights ?? data.rental_nights ?? null,
    included_utilities: data.included_utilities ?? null,
    contact: data.contact ?? null,
    host: data.host ?? null,
    meta: data.meta ?? null,
    nearby: data.nearby ?? null,
    features: data.features ?? null,
    floor: data.floor ?? null,
    year_built: data.year_built ?? null,
    parking: data.parking ?? null,
    pet_friendly: data.pet_friendly ?? null,
    furnishing: data.furnishing ?? null,
  };
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
        if (!res.ok) throw new Error(`Property not found (status ${res.status})`);
        const data = await res.json();
        // API might return { success: true, data: {...} } or { property: {...} } or raw object
        const raw = data?.data ?? data?.property ?? data;
        setProperty(transformPropertyData(raw));
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

  // Pricing calculations only when base_rate and nights are provided by API (no defaults)
  const nights = property.number_of_nights ?? null;
  const baseRate = property.base_rate ?? null;
  const cleaningFee = property.cleaning_fee ?? null;
  const serviceFee = property.service_fee ?? null;
  const securityDeposit = property.security_deposit ?? null;

  const totalBeforeFees = (baseRate !== null && nights !== null) ? baseRate * nights : null;
  const totalAmount = totalBeforeFees !== null ? totalBeforeFees + (cleaningFee || 0) + (serviceFee || 0) + (securityDeposit || 0) : null;

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
        <h1>{property.property_name}</h1>
        <div className="property-location">
          {property.address && <span>{property.address}</span>}
          {property.city && <span>{property.city}</span>}
        </div>
      </div>

      <div className="property-gallery">
        {photos.length > 0 ? (
          <>
            <div className="main-image">
              <img
                src={getPhotoUrl(photos[currentImageIndex])}
                alt={`${property.property_name} image ${currentImageIndex + 1}`}
                className={fade ? 'fade-out' : ''}
                onError={(e) => {
                  console.error('Failed to load image:', photos[currentImageIndex]);
                  e.target.src = 'https://via.placeholder.com/800x500?text=Image+Not+Available';
                  e.target.onerror = null;
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
              <span className="highlight-value">{property.bedrooms ?? 'N/A'}</span>
              <span className="highlight-label">Beds</span>
            </div>
            <div className="highlight">
              <span className="highlight-value">{property.bathrooms ?? 'N/A'}</span>
              <span className="highlight-label">Baths</span>
            </div>
            <div className="highlight">
              <span className="highlight-value">{property.area ?? 'N/A'}</span>
              <span className="highlight-label">Area</span>
            </div>
            <div className="highlight">
              <span className="highlight-value">{property.max_guests ?? 'N/A'}</span>
              <span className="highlight-label">Max Guests</span>
            </div>
          </div>

          <div className="section">
            <div className="section-header">About this place</div>
            <div className="section-body">
              <p>{property.description}</p>
              <div style={{ marginTop: '1rem' }}>
                {property.check_in_time && <p><strong>Check-in:</strong> {property.check_in_time}</p>}
                {property.check_out_time && <p><strong>Check-out:</strong> {property.check_out_time}</p>}
                {property.max_guests !== null && <p><strong>Max Guests:</strong> {property.max_guests}</p>}
                {property.min_stay !== null && <p><strong>Minimum Stay:</strong> {property.min_stay} night{property.min_stay > 1 ? 's' : ''}</p>}
              </div>
            </div>
          </div>

          {property.amenities && property.amenities.length > 0 && (
            <div className="section">
              <div className="section-header">Amenities</div>
              <div className="tags">
                {property.amenities.map((amenity, index) => (
                  <span key={index} className="tag">{amenity}</span>
                ))}
              </div>
            </div>
          )}

          {property.rules && (
            <div className="section">
              <div className="section-header">House Rules</div>
              <div className="section-body">{property.rules}</div>
            </div>
          )}

          {property.policies && (
            <div className="section">
              <div className="section-header">Policies</div>
              <div className="section-body">{property.policies}</div>
            </div>
          )}

          {(property.available_from || property.available_to || property.booking_status) && (
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

          {property.nearby && (
            <div className="section">
              <div className="section-header">Nearby</div>
              <div className="section-body">{Array.isArray(property.nearby) ? property.nearby.join(', ') : property.nearby}</div>
            </div>
          )}

          {property.meta && (
            <div className="section">
              <div className="section-header">Additional details</div>
              <div className="section-body">{renderObjectDetails(property.meta)}</div>
            </div>
          )}
        </div>

        <aside className="booking-widget" aria-live="polite">
          <div className="price-box">
            <div className="price">{baseRate !== null ? `₹${formatCurrency(baseRate)}` : 'N/A'}</div>
            <div className="price-period">{property.billing_cycle || 'per month'}</div>
          </div>

          <div className="section">
            <div className="section-header">Booking Info</div>
            <div className="section-body">
              {property.check_in_time && (
                <div className="date-display">
                  <label>Check-in</label>
                  <div className="display-value">{property.check_in_time}</div>
                </div>
              )}

              {property.check_out_time && (
                <div className="date-display">
                  <label>Check-out</label>
                  <div className="display-value">{property.check_out_time}</div>
                </div>
              )}

              {property.max_guests !== null && (
                <div className="guests-display">
                  <label>Guests</label>
                  <div className="display-value">{property.max_guests} {property.max_guests > 1 ? 'Guests' : 'Guest'}</div>
                </div>
              )}

              {nights !== null && (
                <div style={{ marginTop: 8 }}>
                  <div className="info-key">Nights</div>
                  <div className="info-value">{nights}</div>
                </div>
              )}
            </div>
          </div>

          <div className="price-breakdown" aria-hidden={totalBeforeFees === null && cleaningFee === null && serviceFee === null && securityDeposit === null}>
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

            {securityDeposit !== null && securityDeposit > 0 && (
              <div className="price-row">
                <span>Security deposit</span>
                <span>₹{formatCurrency(securityDeposit)}</span>
              </div>
            )}

            {property.included_utilities && (
              <div style={{ marginTop: 8 }}>
                <div className="info-key">Included utilities</div>
                <div className="info-value">{Array.isArray(property.included_utilities) ? property.included_utilities.join(', ') : property.included_utilities}</div>
              </div>
            )}

            {totalAmount !== null && (
              <div className="price-total">
                <span>Total</span>
                <span>₹{formatCurrency(totalAmount)}</span>
              </div>
            )}
          </div>

          {(property.contact || (property.host && (property.host.phone || property.host.email))) && (
            <div className="contact-card">
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Contact</div>
              {property.contact?.phone && <div className="contact-row"><span>Phone</span><span>{property.contact.phone}</span></div>}
              {property.contact?.email && <div className="contact-row"><span>Email</span><span>{property.contact.email}</span></div>}
              {property.host?.phone && <div className="contact-row"><span>Host phone</span><span>{property.host.phone}</span></div>}
              {property.host?.email && <div className="contact-row"><span>Host email</span><span>{property.host.email}</span></div>}
            </div>
          )}

          <div style={{ marginTop: 12 }}>
            <div className="info-grid">
              {property.floor && <div className="info-item"><div className="info-key">Floor</div><div className="info-value">{property.floor}</div></div>}
              {property.year_built && <div className="info-item"><div className="info-key">Year built</div><div className="info-value">{property.year_built}</div></div>}
              {property.parking && <div className="info-item"><div className="info-key">Parking</div><div className="info-value">{property.parking}</div></div>}
              {property.pet_friendly !== null && property.pet_friendly !== undefined && <div className="info-item"><div className="info-key">Pet friendly</div><div className="info-value">{property.pet_friendly ? 'Yes' : 'No'}</div></div>}
              {property.furnishing && <div className="info-item"><div className="info-key">Furnishing</div><div className="info-value">{property.furnishing}</div></div>}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PropertyDetailPage;