import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PropertyListPage.css';

const API_BASE_URL = 'http://localhost:3030/api/ovika';

// Single PropertyCard Component
const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/property/${property.id}`);
  };

  // Debug log for image loading
  console.log('Property data:', {
    id: property.id,
    photos: property.photos,
    firstPhoto: property.photos?.[0],
    imageUrl: property.photos?.[0] 
      ? `http://localhost:3030/api/ovika/uploads/${property.photos[0]}`
      : 'No image'
  });

  return (
    <div className="property-card" onClick={handleClick}>
      <div className="property-image">
        <img 
          src={
            property.photos?.[0] 
              ? `http://localhost:3030/api/ovika/uploads/${property.photos[0]}`
              : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
          } 
          alt={property.property_name || 'Property'} 
          onError={(e) => {
            console.error('Error loading image:', e.target.src);
            e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
          }}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '8px 8px 0 0'
          }}
        />
        <div className="property-price">₹{property.base_rate ? property.base_rate.toLocaleString() : 'N/A'}/month</div>
      </div>
      <div className="property-details">
        <h3>{property.property_name || 'Untitled Property'}</h3>
        <p className="property-location">{property.address}, {property.city}</p>
        <div className="property-features">
          <span>{property.bedrooms || 0} Beds</span>
          <span>{property.bathrooms || 0} Baths</span>
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
      const response = await fetch(`${API_BASE_URL}/properties`);
      if (!response.ok) {
        throw new Error('Failed to fetch properties');
      }
      const data = await response.json();
      const propertiesData = data.data || [];
      setProperties(propertiesData);
      setFilteredProperties(propertiesData);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter properties based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProperties(properties);
    } else {
      const filtered = properties.filter(property => 
        property.property_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.city?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProperties(filtered);
    }
  }, [searchTerm, properties]);

  useEffect(() => {
    fetchProperties();
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
          />
          <button className="search-button">
            <i className="fas fa-search"></i>
          </button>
        </div>
        <button 
          className="btn-add-property"
          onClick={() => navigate('/listed1')}
        >
          <i className="fas fa-plus"></i> List New Property
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
              <i className="fas fa-search-location"></i>
              <h3>No properties found</h3>
              <p>We couldn't find any properties matching your search. Try different keywords or add a new property.</p>
              <button 
                className="btn-add-property"
                onClick={() => navigate('/listed1')}
              >
                <i className="fas fa-plus"></i> Add Your First Property
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyListPage;