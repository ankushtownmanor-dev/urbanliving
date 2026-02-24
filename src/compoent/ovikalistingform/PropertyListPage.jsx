

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiSearch, FiMapPin, FiHeart, FiFilter, FiPlus, FiStar, FiX } from 'react-icons/fi';
import { BiBed, BiBath, BiArea } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
import './PropertyListPage.css';

const API_BASE_URL = 'https://townmanor.ai/api/ovika';

// Define categories outside so both components can access them
const CATEGORIES = [
  {
    id: 'PG',
    title: 'PG',
    subTitle: "Affordable stays per night",
    description: 'Ideal for students & professionals',
    icon: '🏠',
    color: '#C98B3E',
    minPrice: 0,
    maxPrice: 1499,
  },
  {
    id: 'Economy Stay',
    title: 'Economy Stay',
    subTitle: "Comfort at great value",
    description: 'Well-furnished homes with modern amenities',
    icon: '🏢',
    color: '#C98B3E',
    minPrice: 1500,
    maxPrice: 2499
  },
  {
    id: 'Premium Stay',
    title: 'Premium Stay',
    subTitle: "Refined living experience",
    description: 'Enhanced comfort with premium facilities',
    icon: '✨',
    color: '#C98B3E',
    minPrice: 2500,
    maxPrice: Infinity
  }
];

const CategoryModal = ({ isOpen, onClose, onSelectCategory }) => {
  if (!isOpen) return null;

// Categories array removed from here as it is now defined globally as CATEGORIES

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <MdClose />
        </button>

        <div className="modal-header">
          <h2 className="modal-title">Choose Your Stay Category</h2>
        </div>

        <div className="category-cards-grid">
          {CATEGORIES.map((category) => (
            <div 
              key={category.id} 
              className="category-card"
              onClick={() => onSelectCategory(category)}
            >
              <div className="category-icon-wrapper" style={{ backgroundColor: `${category.color}15` }}>
                <span className="category-icon">{category.icon}</span>
              </div>
              
              <div className="category-content">
                <h3 className="category-title">{category.title}</h3>
                <h5 className="category-subtitle">{category.subTitle}</h5>
                <p className="category-description">{category.description}</p>
              </div>
              
              <button 
                className="category-select-btn"
                style={{ 
                  backgroundColor: category.color,
                  borderColor: category.color
                }}
              >
                View Properties
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleClick = (e) => {
    if (e.target.closest('.action-btn')) return;
    navigate(`/property/${property.id}`);
  };

  const getCount = (val) => {
    if (typeof val === 'number') return val;
    if (Array.isArray(val)) {
      return val.reduce((acc, curr) => acc + (Number(curr.count) || 0), 0);
    }
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

  const getCoverPhoto = () => {
    if (property.cover_photo) return property.cover_photo;
    if (Array.isArray(property.photos) && property.photos.length > 0) return property.photos[0];
    return null;
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
  };

  const getMeta = () => {
    if (!property.meta) return {};
    if (typeof property.meta === 'object') return property.meta;
    try {
      return JSON.parse(property.meta);
    } catch {
      return {};
    }
  };

  const meta = getMeta();

  return (
    <div className="property-card" onClick={handleClick}>
      <div className="card-image-wrapper">
        <img
          src={getCoverPhoto() || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'}
          alt={property.property_name}
          onError={handleImageError}
          className="card-image"
        />
        
        <button className="action-btn favorite-btn" onClick={toggleFavorite}>
          <FiHeart className={isFavorite ? 'filled' : ''} />
        </button>
      
        {property.property_category && (
          <span className="category-badge">{property.property_category}</span>
        )}
      </div>

      <div className="card-body">
        <div className="card-header-row">
          <h3 className="property-title">{property.property_name || 'Untitled Property'}</h3>
          <div className="rating-badge">
            <FiStar className="star-icon" />
            <span>{property.rating || '4.8'}</span>
          </div>
        </div>

        <p className="property-location">
          <FiMapPin className="location-icon" />
          <span>{property.city || 'City not specified'}{property.address ? `, ${property.address}` : ''}</span>
        </p>

        <div className="property-specs">
          <div className="spec-item">
            <BiBed className="spec-icon" />
            <span>{getCount(property.bedrooms)} Beds</span>
          </div>
          <span className="spec-divider">•</span>
          <div className="spec-item">
            <BiBath className="spec-icon" />
            <span>{getCount(property.bathrooms)} Baths</span>
          </div>
          <span className="spec-divider">•</span>
          <div className="spec-item">
            <BiArea className="spec-icon" />
            <span>{property.area || 0} sqft</span>
          </div>
        </div>

        {Array.isArray(property.amenities) && property.amenities.length > 0 && (
          <div className="amenities-row">
            {property.amenities.slice(0, 3).map((amenity, idx) => (
              <span key={idx} className="amenity-tag">{amenity}</span>
            ))}
            {property.amenities.length > 3 && (
              <span className="amenity-tag more">+{property.amenities.length - 3} more</span>
            )}
          </div>
        )}

        <div className="card-footer-row">
          <div className="price-section" style={property.property_category === 'PG' ? { flexDirection: 'column', alignItems: 'flex-start', gap: '4px' } : {}}>
            {property.property_category === 'PG' ? (
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <span className="price-amount">
                  {formatPrice(Number(meta?.perNightPrice) || Number(property.price || property.price) || 0)}
                </span>
                <span className="price-period"> / night</span>
              </div>
            ) : (
              <>
                <span className="price-amount">{formatPrice(property.price || property.price)}</span>
                {(property.price || property.price) && ( 
                  <span className="price-period"> / night</span>
                )}
              </>
            )}
          </div>
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
  const [showCategoryModal, setShowCategoryModal] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

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

  // Helper function to get property price for Economy/Premium filtering
  const getPropertyPrice = (property) => {
    const price = Number(property.price || property.price);
    return isNaN(price) ? 0 : price;
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowCategoryModal(false);
    
    // Filter properties based on category
    const filtered = properties.filter((p) => {
      // For PG category - ONLY match by property_category field (naam se filter)
      if (category.id === 'PG') {
        return p.property_category === 'PG';
      }
      
      // For Economy Stay and Premium Stay - filter by price range
      // BUT exclude PG properties
      if (p.property_category === 'PG') {
        return false; // PG ko exclude karo Economy aur Premium se
      }
      
      const propertyPrice = getPropertyPrice(p);
      
      // Check if price falls within category range
      return propertyPrice >= category.minPrice && propertyPrice <= category.maxPrice;
    });
    
    setFilteredProperties(filtered);
  };

  const handleBookStayClick = () => {
    setShowCategoryModal(true);
  };

  useEffect(() => {
    if (!searchTerm.trim()) {
      if (selectedCategory) {
        const filtered = properties.filter((p) => {
          // For PG category - ONLY match by property_category field
          if (selectedCategory.id === 'PG') {
            return p.property_category === 'PG';
          }
          
          // For Economy Stay and Premium Stay - filter by price range
          // BUT exclude PG properties
          if (p.property_category === 'PG') {
            return false; // PG ko exclude karo
          }
          
          const propertyPrice = getPropertyPrice(p);
          
          // Check if price falls within category range
          return propertyPrice >= selectedCategory.minPrice && propertyPrice <= selectedCategory.maxPrice;
        });
        setFilteredProperties(filtered);
      } else {
        setFilteredProperties(properties);
      }
      return;
    }
    
    const q = searchTerm.toLowerCase();
    let baseFilter = selectedCategory 
      ? properties.filter((p) => {
          // For PG category - ONLY match by property_category field
          if (selectedCategory.id === 'PG') {
            return p.property_category === 'PG';
          }
          
          // For Economy Stay and Premium Stay - filter by price range
          // BUT exclude PG properties
          if (p.property_category === 'PG') {
            return false; // PG ko exclude karo
          }
          
          const propertyPrice = getPropertyPrice(p);
          
          // Check if price falls within category range
          return propertyPrice >= selectedCategory.minPrice && propertyPrice <= selectedCategory.maxPrice;
        })
      : properties;
    
    const filtered = baseFilter.filter((p) =>
      (p.property_name?.toLowerCase().includes(q)) ||
      (p.address?.toLowerCase().includes(q)) ||
      (p.city?.toLowerCase().includes(q))
    );
    setFilteredProperties(filtered);
  }, [searchTerm, properties, selectedCategory]);

  useEffect(() => {
    fetchProperties();
  }, []);

  // Handle URL query parameters for category filtering
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryId = params.get('category'); // e.g., ?category=PG
    
    // Only proceed if we have properties and a category param
    if (categoryId && properties.length > 0) {
      // Find the matching category object
      const matchedCategory = CATEGORIES.find(
        (c) => c.id.toLowerCase() === categoryId.toLowerCase() || 
               c.title.toLowerCase() === categoryId.toLowerCase()
      );
      
      if (matchedCategory) {
        // Automatically select the category and close the modal
        setSelectedCategory(matchedCategory);
        setShowCategoryModal(false);
      }
    }
  }, [location.search, properties]); // Re-run when URL changes or properties are loaded

  if (loading) return <div className="loader-container"><div className="spinner"></div></div>;
  if (error) return <div className="error-container"><h2>Error</h2><p>{error}</p></div>;

  return (
    <div className="page-container">
      <CategoryModal 
        isOpen={showCategoryModal} 
        onClose={() => setShowCategoryModal(false)}
        onSelectCategory={handleCategorySelect}
      />

      <header className="hero-header">
        <div className="hero-content">
          <h1 className="hero-title">Book your Stay</h1>
          <p className="hero-subtitle">Luxury studios, homestays, and serviced apartments - curated for comfortable short and extended stays</p>
          
          <div className="search-container">
            <div className="search-input-wrapper">
              <FiSearch className="search-input-icon" />
              <input 
                type="text" 
                className="search-input"
                placeholder="Search by city, locality, or property name..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="filter-button" onClick={handleBookStayClick}>
              <FiFilter />
              <span className="filter-text">Categories</span>
            </button>
          </div>

          {selectedCategory && (
            <div className="active-filter-chip">
              <div className="filter-chip-content">
                <span className="filter-chip-icon">{selectedCategory.icon}</span>
                <span className="filter-chip-label">{selectedCategory.title}</span>
              </div>
              <button 
                className="filter-chip-remove"
                onClick={() => {
                  setSelectedCategory(null);
                  setFilteredProperties(properties);
                }}
                aria-label="Remove filter"
              >
                <FiX />
              </button>
            </div>
          )}
        </div>
        
        <button className="fab-button" onClick={() => navigate('/listed1')} title="List New Property">
          <FiPlus />
        </button>
      </header>

      <main className="main-section">
        <div className="section-header">
          <h2 className="section-title">
            Available Properties 
            <span className="properties-count">({filteredProperties.length})</span>
          </h2>
          <button className="list-property-btn" onClick={() => navigate('/listed1')}>
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
          <div className="empty-state-container">
            <img src="https://cdn-icons-png.flaticon.com/512/6028/6028565.png" alt="No results" className="empty-icon" />
            <h3 className="empty-title">No Properties Found</h3>
            <p className="empty-text">
              {searchTerm 
                ? `We couldn't find any matches for "${searchTerm}".`
                : selectedCategory
                  ? `No properties available in ${selectedCategory.title} category.`
                  : 'No properties available at the moment.'}
            </p>
            <button className="clear-search-btn" onClick={() => {
              setSearchTerm(''); 
              setSelectedCategory(null);
              setFilteredProperties(properties);
            }}>
              Clear All Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default PropertyListPage;