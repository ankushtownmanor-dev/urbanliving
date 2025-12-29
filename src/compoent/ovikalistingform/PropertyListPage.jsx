import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiMapPin, FiHeart, FiFilter, FiPlus } from 'react-icons/fi';
import { BiBed, BiBath, BiArea } from 'react-icons/bi';
import './PropertyListPage.css';

// Using production server
const API_BASE_URL = 'https://townmanor.ai/api/ovika';

// --- Single PropertyCard Component ---
const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleClick = (e) => {
    if (e.target.closest('.action-btn')) return;
    navigate(`/property/${property.id}`);
  };

  // Helper to get total count from JSON or number
  const getCount = (val) => {
    if (typeof val === 'number') return val;
    if (Array.isArray(val)) {
      return val.reduce((acc, curr) => acc + (Number(curr.count) || 0), 0);
    }
    // Try parsing if string
    if (typeof val === 'string') {
      try {
        const parsed = JSON.parse(val);
        if (Array.isArray(parsed)) {
          return parsed.reduce((acc, curr) => acc + (Number(curr.count) || 0), 0);
        }
      } catch (e) {
        return parseInt(val) || 0;
      }
    }
    return 0;
  };
  
  // Helper to generate a summary string (e.g. "2 Master, 1 Guest")
  const getSummary = (val) => {
    let arr = [];
    if (Array.isArray(val)) arr = val;
    else if (typeof val === 'string') {
      try { arr = JSON.parse(val); } catch(e) {}
    }
    if (!Array.isArray(arr) || arr.length === 0) return null;
    return arr.map(i => `${i.count} ${i.type}`).join(', ');
  };

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const formatPrice = (price) => {
    if (!price) return 'Price on Request';
    const num = Number(price);
    if (Number.isNaN(num)) return 'Price on Request';
    return `₹${num.toLocaleString('en-IN')}`;
  };

  // Safe Image Handling
  const getCoverPhoto = () => {
    if (property.cover_photo) return property.cover_photo;
    if (Array.isArray(property.photos) && property.photos.length > 0) return property.photos[0];
    return null;
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
  };

  return (
    <div className="modern-card" onClick={handleClick}>
      <div className="card-image-container">
        <img
          src={getCoverPhoto() || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'}
          alt={property.property_name}
          onError={handleImageError}
        />
        <div className="card-badge">{property.property_category || 'For Rent'}</div>
        <button 
          className={`favorite-btn action-btn ${isFavorite ? 'active' : ''}`} 
          onClick={toggleFavorite}
        >
          <FiHeart fill={isFavorite ? "#ff4757" : "none"} />
        </button>
        <div className="price-tag">
          {formatPrice(property.base_rate)}
          <span className="period">{property.base_rate ? '/night' : ''}</span>
        </div>
      </div>

      <div className="card-content-main">
        <h3 className="card-title" title={property.property_name}>
          {property.property_name || 'Untitled Property'}
        </h3>
        
        <p className="card-location">
          <FiMapPin className="icon" />
          {property.address ? `${property.address}, ` : ''}{property.city || 'City not specified'}
        </p>

        <div className="card-features">
          <div className="feature-item">
            <BiBed /> 
            <span>{getCount(property.bedrooms)} Beds</span>
            {/* Optional: Tooltip or small text for breakdown? for now just total */}
          </div>
          <div className="feature-item">
            <BiBath /> 
            <span>{getCount(property.bathrooms)} Baths</span>
          </div>
          <div className="feature-item">
            <BiArea /> <span>{property.area || 0} sqft</span>
          </div>
        </div>

        <div className="card-footer">
          <div className="amenities-preview">
            {Array.isArray(property.amenities) && property.amenities.slice(0, 2).map((am, i) => (
              <span key={i} className="mini-tag">{am}</span>
            ))}
            {Array.isArray(property.amenities) && property.amenities.length > 2 && (
              <span className="mini-tag count">+{property.amenities.length - 2}</span>
            )}
          </div>
          <button className="view-btn">View Details</button>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
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
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      const list = data?.data || [];
      setProperties(list);
      setFilteredProperties(list);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProperties(properties);
      return;
    }
    const q = searchTerm.toLowerCase();
    const filtered = properties.filter((p) =>
      (p.property_name?.toLowerCase().includes(q)) ||
      (p.address?.toLowerCase().includes(q)) ||
      (p.city?.toLowerCase().includes(q))
    );
    setFilteredProperties(filtered);
  }, [searchTerm, properties]);

  useEffect(() => {
    fetchProperties();
  }, []);

  if (loading) return <div className="loader-container"><div className="spinner"></div></div>;
  if (error) return <div className="error-container"><h2>Error</h2><p>{error}</p></div>;

  return (
    <div className="page-wrapper">
      {/* Hero / Header Section */}
      <header className="page-header">
        <div className="header-content">
          <h1>Book your Stay</h1>
          <p>Luxury studios,homestays,and serviced apartments - curated for comfortable short and extended stays</p>
          
          <div className="search-bar-wrapper">
            <FiSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by city, locality, or project name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="filter-btn">
              <FiFilter /> <span>Filters</span>
            </button>
          </div>
        </div>
        
        <button className="fab-add" onClick={() => navigate('/listed1')} title="List New Property">
          <FiPlus />
        </button>
      </header>

      {/* Grid Section */}
      <main className="main-content">
        <div className="content-header">
          <h2>Available Properties <span className="count">({filteredProperties.length})</span></h2>
          <button className="add-btn-desktop" onClick={() => navigate('/listed1')}>
            <FiPlus /> List Property
          </button>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="properties-grid">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <img src="https://cdn-icons-png.flaticon.com/512/6028/6028565.png" alt="No results" />
            <h3>No Properties Found</h3>
            <p>We couldn't find any matches for "{searchTerm}".</p>
            <button onClick={() => {setSearchTerm(''); setFilteredProperties(properties)}}>Clear Search</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default PropertyListPage;