import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import './PropertyListPage.css';

// Using production server
const API_BASE_URL = 'https://townmanor.ai/api/ovika';

// Single PropertyCard Component
const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleClick = (e) => {
    // Don't navigate if clicking on favorite button
    if (e.target.closest && e.target.closest('.favorite-btn')) return;
    navigate(`/property/${property.id}`);
  };

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  // Format price with commas, handle strings/numbers
  const formatPrice = (price) => {
    if (price === null || price === undefined || price === '') return 'Price on request';
    const num = Number(price);
    if (Number.isNaN(num)) return 'Price on request';
    return `₹${num.toLocaleString('en-IN')}`;
  };

  // Get the property's cover photo URL
  const getCoverPhoto = () => {
    // Check for cover_photo in the property
    if (property.cover_photo) {
      return property.cover_photo;
    }
    // If no cover_photo, try to get the first photo from the photos array
    if (Array.isArray(property.photos) && property.photos.length > 0) {
      return property.photos[0];
    }
    // If no photos at all, return null (will be handled by onError)
    return null;
  };

  // Handle image loading errors
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
    e.target.style.borderRadius = '8px 8px 0 0';
    e.target.alt = 'Property image not available';
  };

  const propertyType = property.property_type || 'Property';
  const propertyCategory = property.property_category || 'For Rent';

  return (
    <div className="property-card" onClick={handleClick} role="button" tabIndex={0}>
      <div className="property-image">
        <img
          src={getCoverPhoto() || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'}
          alt={property.property_name || 'Property'}
          onError={handleImageError}
          style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
        />
        <div className="property-price">
          {formatPrice(property.base_rate)}{property.base_rate ? '/month' : ''}
        </div>
      </div>

      <div className="property-details">
        <h3>{property.property_name || 'Untitled Property'}</h3>
        <p className="property-location">
          {property.address || 'Address not provided'}
          {property.city ? `, ${property.city}` : ''}
        </p>

        <div className="property-features">
          <span>{property.bedrooms ?? 0} Beds</span>
          <span>{property.bathrooms ?? 0} Baths</span>
          <span>{property.area || 'N/A'} sq.ft</span>
        </div>

        <div className="property-amenities">
          {Array.isArray(property.amenities) && property.amenities.slice(0, 3).map((amenity, i) => (
            <span key={i} className="amenity-tag">{amenity}</span>
          ))}

          {Array.isArray(property.amenities) && property.amenities.length > 3 && (
            <span className="amenity-more">+{property.amenities.length - 3} more</span>
          )}
        </div>
      </div>
    </div>
  );
};

const PropertyListPage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/properties`);
      if (!response.ok) {
        const text = await response.text().catch(() => null);
        throw new Error(text || 'Failed to fetch properties');
      }
      const data = await response.json();
      const propertiesData = data?.data || [];
      setProperties(propertiesData);
      setFilteredProperties(propertiesData);
    } catch (err) {
      setError(err.message || 'Error fetching properties');
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter properties based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProperties(properties);
      return;
    }
    const q = searchTerm.toLowerCase();
    const filtered = properties.filter((property) =>
      (property.property_name && property.property_name.toLowerCase().includes(q)) ||
      (property.address && property.address.toLowerCase().includes(q)) ||
      (property.city && property.city.toLowerCase().includes(q))
    );
    setFilteredProperties(filtered);
  }, [searchTerm, properties]);

  useEffect(() => {
    fetchProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div className="loading">Loading properties...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="property-list-container">
      <div className="property-list-header">
        <h1>Find Your Dream Property</h1>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name, location, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            aria-label="Search properties"
          />
          <button
            className="search-button"
            type="button"
            onClick={() => { /* no-op: live search */ }}
            aria-label="Search"
          >
            <FiSearch />
          </button>
        </div>

        <button
          className="btn-add-property"
          onClick={() => navigate('/listed1')}
          type="button"
        >
          <i className="fas fa-plus" /> List New Property
        </button>
      </div>

      <div className="property-grid">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <div key={property.id} className="property-card-wrapper">
              <PropertyCard property={property} />
            </div>
          ))
        ) : (
          <div className="no-properties">
            <div className="no-results">
              <i className="fas fa-search-location" />
              <h3>No properties found</h3>
              <p>We couldn't find any properties matching your search. Try different keywords or add a new property.</p>
              <button
                className="btn-add-property"
                onClick={() => navigate('/listed1')}
                type="button"
              >
                <i className="fas fa-plus" /> Add Your First Property
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyListPage;