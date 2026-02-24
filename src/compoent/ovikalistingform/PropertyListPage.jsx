

// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { FiSearch, FiMapPin, FiHeart, FiFilter, FiPlus, FiStar, FiX } from 'react-icons/fi';
// import { BiBed, BiBath, BiArea } from 'react-icons/bi';
// import { MdClose } from 'react-icons/md';
// import './PropertyListPage.css';

// const API_BASE_URL = 'https://townmanor.ai/api/ovika';

// // Define categories outside so both components can access them
// const CATEGORIES = [
//   {
//     id: 'PG',
//     title: 'PG',
//     subTitle: "Affordable stays per night",
//     description: 'Ideal for students & professionals',
//     icon: '🏠',
//     color: '#C98B3E',
//     minPrice: 0,
//     maxPrice: 1499,
//   },
//   {
//     id: 'Economy Stay',
//     title: 'Economy Stay',
//     subTitle: "Comfort at great value",
//     description: 'Well-furnished homes with modern amenities',
//     icon: '🏢',
//     color: '#C98B3E',
//     minPrice: 1500,
//     maxPrice: 2499
//   },
//   {
//     id: 'Premium Stay',
//     title: 'Premium Stay',
//     subTitle: "Refined living experience",
//     description: 'Enhanced comfort with premium facilities',
//     icon: '✨',
//     color: '#C98B3E',
//     minPrice: 2500,
//     maxPrice: Infinity
//   }
// ];

// const CategoryModal = ({ isOpen, onClose, onSelectCategory }) => {
//   if (!isOpen) return null;

// // Categories array removed from here as it is now defined globally as CATEGORIES

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-container" onClick={(e) => e.stopPropagation()}>
//         <button className="modal-close-btn" onClick={onClose}>
//           <MdClose />
//         </button>

//         <div className="modal-header">
//           <h2 className="modal-title">Choose Your Stay Category</h2>
//         </div>

//         <div className="category-cards-grid">
//           {CATEGORIES.map((category) => (
//             <div 
//               key={category.id} 
//               className="category-card"
//               onClick={() => onSelectCategory(category)}
//             >
//               <div className="category-icon-wrapper" style={{ backgroundColor: `${category.color}15` }}>
//                 <span className="category-icon">{category.icon}</span>
//               </div>
              
//               <div className="category-content">
//                 <h3 className="category-title">{category.title}</h3>
//                 <h5 className="category-subtitle">{category.subTitle}</h5>
//                 <p className="category-description">{category.description}</p>
//               </div>
              
//               <button 
//                 className="category-select-btn"
//                 style={{ 
//                   backgroundColor: category.color,
//                   borderColor: category.color
//                 }}
//               >
//                 View Properties
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const PropertyCard = ({ property }) => {
//   const navigate = useNavigate();
//   const [isFavorite, setIsFavorite] = useState(false);

//   const handleClick = (e) => {
//     if (e.target.closest('.action-btn')) return;
//     navigate(`/property/${property.id}`);
//   };

//   const getCount = (val) => {
//     if (typeof val === 'number') return val;
//     if (Array.isArray(val)) {
//       return val.reduce((acc, curr) => acc + (Number(curr.count) || 0), 0);
//     }
//     if (typeof val === 'string') {
//       try {
//         const parsed = JSON.parse(val);
//         if (Array.isArray(parsed)) {
//           return parsed.reduce((acc, curr) => acc + (Number(curr.count) || 0), 0);
//         }
//       } catch (e) {
//         return parseInt(val) || 0;
//       }
//     }
//     return 0;
//   };

//   const toggleFavorite = (e) => {
//     e.stopPropagation();
//     setIsFavorite(!isFavorite);
//   };

//   const formatPrice = (price) => {
//     if (!price) return 'Price on Request';
//     const num = Number(price);
//     if (Number.isNaN(num)) return 'Price on Request';
//     return `₹${num.toLocaleString('en-IN')}`;
//   };

//   const getCoverPhoto = () => {
//     if (property.cover_photo) return property.cover_photo;
//     if (Array.isArray(property.photos) && property.photos.length > 0) return property.photos[0];
//     return null;
//   };

//   const handleImageError = (e) => {
//     e.target.onerror = null;
//     e.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
//   };

//   const getMeta = () => {
//     if (!property.meta) return {};
//     if (typeof property.meta === 'object') return property.meta;
//     try {
//       return JSON.parse(property.meta);
//     } catch {
//       return {};
//     }
//   };

//   const meta = getMeta();

//   return (
//     <div className="property-card" onClick={handleClick}>
//       <div className="card-image-wrapper">
//         <img
//           src={getCoverPhoto() || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'}
//           alt={property.property_name}
//           onError={handleImageError}
//           className="card-image"
//         />
        
//         <button className="action-btn favorite-btn" onClick={toggleFavorite}>
//           <FiHeart className={isFavorite ? 'filled' : ''} />
//         </button>
      
//         {property.property_category && (
//           <span className="category-badge">{property.property_category}</span>
//         )}
//       </div>

//       <div className="card-body">
//         <div className="card-header-row">
//           <h3 className="property-title">{property.property_name || 'Untitled Property'}</h3>
//           <div className="rating-badge">
//             <FiStar className="star-icon" />
//             <span>{property.rating || '4.8'}</span>
//           </div>
//         </div>

//         <p className="property-location">
//           <FiMapPin className="location-icon" />
//           <span>{property.city || 'City not specified'}{property.address ? `, ${property.address}` : ''}</span>
//         </p>

//         <div className="property-specs">
//           <div className="spec-item">
//             <BiBed className="spec-icon" />
//             <span>{getCount(property.bedrooms)} Beds</span>
//           </div>
//           <span className="spec-divider">•</span>
//           <div className="spec-item">
//             <BiBath className="spec-icon" />
//             <span>{getCount(property.bathrooms)} Baths</span>
//           </div>
//           <span className="spec-divider">•</span>
//           <div className="spec-item">
//             <BiArea className="spec-icon" />
//             <span>{property.area || 0} sqft</span>
//           </div>
//         </div>

//         {Array.isArray(property.amenities) && property.amenities.length > 0 && (
//           <div className="amenities-row">
//             {property.amenities.slice(0, 3).map((amenity, idx) => (
//               <span key={idx} className="amenity-tag">{amenity}</span>
//             ))}
//             {property.amenities.length > 3 && (
//               <span className="amenity-tag more">+{property.amenities.length - 3} more</span>
//             )}
//           </div>
//         )}

//         <div className="card-footer-row">
//           <div className="price-section" style={property.property_category === 'PG' ? { flexDirection: 'column', alignItems: 'flex-start', gap: '4px' } : {}}>
//             {property.property_category === 'PG' ? (
//               <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
//                 <span className="price-amount">
//                   {formatPrice(Number(meta?.perNightPrice) || Number(property.price || property.price) || 0)}
//                 </span>
//                 <span className="price-period"> / night</span>
//               </div>
//             ) : (
//               <>
//                 <span className="price-amount">{formatPrice(property.price || property.price)}</span>
//                 {(property.price || property.price) && ( 
//                   <span className="price-period"> / night</span>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const PropertyListPage = () => {
//   const [properties, setProperties] = useState([]);
//   const [filteredProperties, setFilteredProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showCategoryModal, setShowCategoryModal] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const fetchProperties = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${API_BASE_URL}/properties`);
//       if (!response.ok) throw new Error('Failed to fetch data');
//       const data = await response.json();
//       const list = data?.data || [];
//       setProperties(list);
//       setFilteredProperties(list);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper function to get property price for Economy/Premium filtering
//   const getPropertyPrice = (property) => {
//     const price = Number(property.price || property.price);
//     return isNaN(price) ? 0 : price;
//   };

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//     setShowCategoryModal(false);
    
//     // Filter properties based on category
//     const filtered = properties.filter((p) => {
//       // For PG category - ONLY match by property_category field (naam se filter)
//       if (category.id === 'PG') {
//         return p.property_category === 'PG';
//       }
      
//       // For Economy Stay and Premium Stay - filter by price range
//       // BUT exclude PG properties
//       if (p.property_category === 'PG') {
//         return false; // PG ko exclude karo Economy aur Premium se
//       }
      
//       const propertyPrice = getPropertyPrice(p);
      
//       // Check if price falls within category range
//       return propertyPrice >= category.minPrice && propertyPrice <= category.maxPrice;
//     });
    
//     setFilteredProperties(filtered);
//   };

//   const handleBookStayClick = () => {
//     setShowCategoryModal(true);
//   };

//   useEffect(() => {
//     if (!searchTerm.trim()) {
//       if (selectedCategory) {
//         const filtered = properties.filter((p) => {
//           // For PG category - ONLY match by property_category field
//           if (selectedCategory.id === 'PG') {
//             return p.property_category === 'PG';
//           }
          
//           // For Economy Stay and Premium Stay - filter by price range
//           // BUT exclude PG properties
//           if (p.property_category === 'PG') {
//             return false; // PG ko exclude karo
//           }
          
//           const propertyPrice = getPropertyPrice(p);
          
//           // Check if price falls within category range
//           return propertyPrice >= selectedCategory.minPrice && propertyPrice <= selectedCategory.maxPrice;
//         });
//         setFilteredProperties(filtered);
//       } else {
//         setFilteredProperties(properties);
//       }
//       return;
//     }
    
//     const q = searchTerm.toLowerCase();
//     let baseFilter = selectedCategory 
//       ? properties.filter((p) => {
//           // For PG category - ONLY match by property_category field
//           if (selectedCategory.id === 'PG') {
//             return p.property_category === 'PG';
//           }
          
//           // For Economy Stay and Premium Stay - filter by price range
//           // BUT exclude PG properties
//           if (p.property_category === 'PG') {
//             return false; // PG ko exclude karo
//           }
          
//           const propertyPrice = getPropertyPrice(p);
          
//           // Check if price falls within category range
//           return propertyPrice >= selectedCategory.minPrice && propertyPrice <= selectedCategory.maxPrice;
//         })
//       : properties;
    
//     const filtered = baseFilter.filter((p) =>
//       (p.property_name?.toLowerCase().includes(q)) ||
//       (p.address?.toLowerCase().includes(q)) ||
//       (p.city?.toLowerCase().includes(q))
//     );
//     setFilteredProperties(filtered);
//   }, [searchTerm, properties, selectedCategory]);

//   useEffect(() => {
//     fetchProperties();
//   }, []);

//   // Handle URL query parameters for category filtering
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const categoryId = params.get('category'); // e.g., ?category=PG
    
//     // Only proceed if we have properties and a category param
//     if (categoryId && properties.length > 0) {
//       // Find the matching category object
//       const matchedCategory = CATEGORIES.find(
//         (c) => c.id.toLowerCase() === categoryId.toLowerCase() || 
//                c.title.toLowerCase() === categoryId.toLowerCase()
//       );
      
//       if (matchedCategory) {
//         // Automatically select the category and close the modal
//         setSelectedCategory(matchedCategory);
//         setShowCategoryModal(false);
//       }
//     }
//   }, [location.search, properties]); // Re-run when URL changes or properties are loaded

//   if (loading) return <div className="loader-container"><div className="spinner"></div></div>;
//   if (error) return <div className="error-container"><h2>Error</h2><p>{error}</p></div>;

//   return (
//     <div className="page-container">
//       <CategoryModal 
//         isOpen={showCategoryModal} 
//         onClose={() => setShowCategoryModal(false)}
//         onSelectCategory={handleCategorySelect}
//       />

//       <header className="hero-header">
//         <div className="hero-content">
//           <h1 className="hero-title">Book your Stay</h1>
//           <p className="hero-subtitle">Luxury studios, homestays, and serviced apartments - curated for comfortable short and extended stays</p>
          
//           <div className="search-container">
//             <div className="search-input-wrapper">
//               <FiSearch className="search-input-icon" />
//               <input 
//                 type="text" 
//                 className="search-input"
//                 placeholder="Search by city, locality, or property name..." 
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <button className="filter-button" onClick={handleBookStayClick}>
//               <FiFilter />
//               <span className="filter-text">Categories</span>
//             </button>
//           </div>

//           {selectedCategory && (
//             <div className="active-filter-chip">
//               <div className="filter-chip-content">
//                 <span className="filter-chip-icon">{selectedCategory.icon}</span>
//                 <span className="filter-chip-label">{selectedCategory.title}</span>
//               </div>
//               <button 
//                 className="filter-chip-remove"
//                 onClick={() => {
//                   setSelectedCategory(null);
//                   setFilteredProperties(properties);
//                 }}
//                 aria-label="Remove filter"
//               >
//                 <FiX />
//               </button>
//             </div>
//           )}
//         </div>
        
//         <button className="fab-button" onClick={() => navigate('/listed1')} title="List New Property">
//           <FiPlus />
//         </button>
//       </header>

//       <main className="main-section">
//         <div className="section-header">
//           <h2 className="section-title">
//             Available Properties 
//             <span className="properties-count">({filteredProperties.length})</span>
//           </h2>
//           <button className="list-property-btn" onClick={() => navigate('/listed1')}>
//             <FiPlus /> List Property
//           </button>
//         </div>

//         {filteredProperties.length > 0 ? (
//           <div className="properties-grid">
//             {filteredProperties.map((property) => (
//               <PropertyCard key={property.id} property={property} />
//             ))}
//           </div>
//         ) : (
//           <div className="empty-state-container">
//             <img src="https://cdn-icons-png.flaticon.com/512/6028/6028565.png" alt="No results" className="empty-icon" />
//             <h3 className="empty-title">No Properties Found</h3>
//             <p className="empty-text">
//               {searchTerm 
//                 ? `We couldn't find any matches for "${searchTerm}".`
//                 : selectedCategory
//                   ? `No properties available in ${selectedCategory.title} category.`
//                   : 'No properties available at the moment.'}
//             </p>
//             <button className="clear-search-btn" onClick={() => {
//               setSearchTerm(''); 
//               setSelectedCategory(null);
//               setFilteredProperties(properties);
//             }}>
//               Clear All Filters
//             </button>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default PropertyListPage;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiSearch, FiMapPin, FiHeart, FiPlus, FiStar, FiX } from 'react-icons/fi';
import { BiBed, BiBath, BiArea } from 'react-icons/bi';

const API_BASE_URL = 'https://townmanor.ai/api/ovika';

const CATEGORIES = [
  { id: 'PG', title: 'PG', icon: '🏠', minPrice: 0, maxPrice: 1499 },
  { id: 'Economy Stay', title: 'Economy Stay', icon: '🏢', minPrice: 1500, maxPrice: 2499 },
  { id: 'Premium Stay', title: 'Premium Stay', icon: '✨', minPrice: 2500, maxPrice: Infinity },
];

/* ─── Property Card ─────────────────────────────── */
const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const [fav, setFav] = useState(false);

  const getCount = (val) => {
    if (typeof val === 'number') return val;
    if (Array.isArray(val)) return val.reduce((a, c) => a + (Number(c.count) || 0), 0);
    if (typeof val === 'string') {
      try {
        const p = JSON.parse(val);
        if (Array.isArray(p)) return p.reduce((a, c) => a + (Number(c.count) || 0), 0);
      } catch { return parseInt(val) || 0; }
    }
    return 0;
  };

  const formatPrice = (price) => {
    const n = Number(price);
    if (!price || isNaN(n)) return 'Price on Request';
    return `₹${n.toLocaleString('en-IN')}`;
  };

  const getMeta = () => {
    if (!property.meta) return {};
    if (typeof property.meta === 'object') return property.meta;
    try { return JSON.parse(property.meta); } catch { return {}; }
  };

  const meta = getMeta();
  const coverPhoto =
    property.cover_photo ||
    (Array.isArray(property.photos) && property.photos[0]) ||
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';

  return (
    <div
      onClick={(e) => { if (!e.target.closest('[data-action]')) navigate(`/property/${property.id}`); }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.13)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.08)'}
      style={{
        background: '#fff', borderRadius: 14, overflow: 'hidden',
        cursor: 'pointer', border: '1px solid #e8e8e8',
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        transition: 'box-shadow 0.25s ease',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', background: '#f0f0f0' }}>
        <img
          src={coverPhoto}
          alt={property.property_name}
          onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'; }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
        />
        <button
          data-action="fav"
          onClick={e => { e.stopPropagation(); setFav(!fav); }}
          style={{
            position: 'absolute', top: 10, right: 10,
            width: 32, height: 32, background: 'rgba(255,255,255,0.88)',
            border: 'none', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', backdropFilter: 'blur(4px)',
            color: fav ? '#e84040' : '#555', fontSize: 15,
          }}
        >
          <FiHeart style={{ fill: fav ? '#e84040' : 'none' }} />
        </button>
        {property.property_category && (
          <span style={{
            position: 'absolute', bottom: 10, left: 10,
            background: 'rgba(255,255,255,0.92)', color: '#222',
            padding: '3px 10px', borderRadius: 6, fontSize: 11,
            fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em',
          }}>
            {property.property_category}
          </span>
        )}
      </div>

      {/* Card Body */}
      <div style={{ padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
        {/* Title + Rating */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
          <h3 style={{
            fontSize: 15, fontWeight: 600, color: '#222', lineHeight: 1.3,
            flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0,
          }}>
            {property.property_name || 'Untitled Property'}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0 }}>
            <FiStar style={{ fontSize: 13, color: '#222', fill: '#222' }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#222' }}>{property.rating || '4.8'}</span>
          </div>
        </div>

        {/* Location */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#717171', fontSize: 13 }}>
          <FiMapPin style={{ fontSize: 13, flexShrink: 0 }} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {property.city || 'City not specified'}{property.address ? `, ${property.address}` : ''}
          </span>
        </div>

        {/* Specs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#717171', fontSize: 13 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <BiBed style={{ fontSize: 15 }} /><span>{getCount(property.bedrooms)} Beds</span>
          </div>
          <span style={{ color: '#ddd' }}>•</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <BiBath style={{ fontSize: 15 }} /><span>{getCount(property.bathrooms)} Baths</span>
          </div>
          <span style={{ color: '#ddd' }}>•</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <BiArea style={{ fontSize: 15 }} /><span>{property.area || 0} sqft</span>
          </div>
        </div>

        {/* Amenities */}
        {Array.isArray(property.amenities) && property.amenities.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 2 }}>
            {property.amenities.slice(0, 3).map((a, i) => (
              <span key={i} style={{
                padding: '3px 9px', background: '#f5f5f5', color: '#717171',
                borderRadius: 6, fontSize: 12, fontWeight: 500,
              }}>{a}</span>
            ))}
            {property.amenities.length > 3 && (
              <span style={{
                padding: '3px 9px', background: '#C98B3E', color: '#fff',
                borderRadius: 6, fontSize: 12, fontWeight: 500,
              }}>+{property.amenities.length - 3} more</span>
            )}
          </div>
        )}

        {/* Price */}
        <div style={{ marginTop: 'auto', paddingTop: 10, borderTop: '1px solid #f0f0f0' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: '#222' }}>
              {property.property_category === 'PG'
                ? formatPrice(Number(meta?.perNightPrice) || Number(property.price) || 0)
                : formatPrice(property.price)
              }
            </span>
            {(property.property_category === 'PG' || property.price) && (
              <span style={{ fontSize: 13, color: '#717171' }}> / night</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Page ─────────────────────────────────── */
const PropertyListPage = () => {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const applyFilter = (list, cat, q) => {
    let result = list;
    if (cat) {
      result = result.filter(p => {
        if (cat.id === 'PG') return p.property_category === 'PG';
        if (p.property_category === 'PG') return false;
        const price = Number(p.price) || 0;
        return price >= cat.minPrice && price <= cat.maxPrice;
      });
    }
    if (q.trim()) {
      const qL = q.toLowerCase();
      result = result.filter(p =>
        p.property_name?.toLowerCase().includes(qL) ||
        p.address?.toLowerCase().includes(qL) ||
        p.city?.toLowerCase().includes(qL)
      );
    }
    return result;
  };

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/properties`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      const list = data?.data || [];
      setProperties(list);
      setFiltered(list);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchProperties(); }, []);
  useEffect(() => { setFiltered(applyFilter(properties, activeCat, search)); }, [search, activeCat, properties]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cId = params.get('category');
    if (cId && properties.length > 0) {
      const match = CATEGORIES.find(c =>
        c.id.toLowerCase() === cId.toLowerCase() || c.title.toLowerCase() === cId.toLowerCase()
      );
      if (match) setActiveCat(match);
    }
  }, [location.search, properties]);

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{
        width: 44, height: 44, border: '3px solid #eee',
        borderTopColor: '#C98B3E', borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
    </div>
  );

  if (error) return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
      <h2 style={{ margin: 0 }}>Error</h2><p style={{ margin: 0, color: '#999' }}>{error}</p>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f7f7f7', fontFamily: "'Inter', -apple-system, sans-serif" }}>

      {/* ── HERO HEADER ── */}
      <div style={{
        background: 'linear-gradient(135deg, #b8762e 0%, #C98B3E 40%, #d4a055 100%)',
        padding: '52px 24px 44px',
        display: 'flex', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Texture overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.06,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <div style={{ maxWidth: 760, width: '100%', position: 'relative', zIndex: 1, textAlign: 'center' }}>

          {/* Heading */}
          <h1 style={{
            fontSize: 44, fontWeight: 800, color: '#fff',
            margin: '0 0 10px', letterSpacing: '-0.025em', lineHeight: 1.1,
          }}>
            Book your Stay
          </h1>
          <p style={{
            fontSize: 16, color: 'rgba(255,255,255,0.88)',
            margin: '0 0 30px', lineHeight: 1.65, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto',
          }}>
            Luxury studios, homestays, and serviced apartments — curated for comfortable short and extended stays
          </p>

          {/* ── SEARCH BAR ── */}
          <div style={{
            background: '#fff', borderRadius: 16,
            display: 'flex', alignItems: 'center',
            padding: '14px 16px', gap: 12,
            boxShadow: '0 10px 36px rgba(0,0,0,0.2)',
          }}>
            <FiSearch style={{ fontSize: 20, color: '#aaa', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search by city, locality, or property name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                flex: 1, border: 'none', outline: 'none',
                fontSize: 15, color: '#222', background: 'transparent',
                fontFamily: 'inherit',
              }}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                style={{
                  width: 28, height: 28, borderRadius: '50%', border: 'none',
                  background: '#f0f0f0', color: '#777', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}
              >
                <FiX style={{ fontSize: 13 }} />
              </button>
            )}
          </div>

          {/* ── CATEGORY TABS (below search bar) ── */}
          <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            gap: 8, marginTop: 14, flexWrap: 'nowrap', width: '100%',
          }}>
            {CATEGORIES.map(cat => {
              const isActive = activeCat?.id === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCat(isActive ? null : cat)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    padding: '7px 14px',
                    background: isActive ? '#fff' : 'rgba(255,255,255,0.15)',
                    border: `2px solid ${isActive ? '#fff' : 'rgba(255,255,255,0.4)'}`,
                    borderRadius: 50,
                    color: isActive ? '#C98B3E' : '#fff',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 4px 14px rgba(0,0,0,0.14)' : 'none',
                    whiteSpace: 'nowrap', flex: '1 1 0', justifyContent: 'center',
                    minWidth: 0,
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.26)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                    }
                  }}
                >
                  <span style={{ fontSize: 14 }}>{cat.icon}</span>
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '32px 24px 60px' }}>

        {/* Section Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#222', margin: 0 }}>
              {activeCat ? activeCat.title : 'All Properties'}
              <span style={{ fontWeight: 400, color: '#aaa', fontSize: 17, marginLeft: 8 }}>
                ({filtered.length})
              </span>
            </h2>
            {activeCat && (
              <button
                onClick={() => setActiveCat(null)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  padding: '5px 14px',
                  background: '#FFF6EE', border: '1px solid rgba(201,139,62,0.3)',
                  borderRadius: 50, color: '#C98B3E', fontSize: 13,
                  fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                <FiX style={{ fontSize: 12 }} /> Clear filter
              </button>
            )}
          </div>

          <button
            onClick={() => navigate('/listed1')}
            onMouseEnter={e => e.currentTarget.style.background = '#AF7834'}
            onMouseLeave={e => e.currentTarget.style.background = '#C98B3E'}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '10px 20px', background: '#C98B3E', color: '#fff',
              border: 'none', borderRadius: 10, fontWeight: 600, fontSize: 14,
              cursor: 'pointer', fontFamily: 'inherit',
              boxShadow: '0 2px 8px rgba(201,139,62,0.3)',
              transition: 'background 0.2s ease',
            }}
          >
            <FiPlus /> List Property
          </button>
        </div>

        {/* Properties Grid */}
        {filtered.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(268px, 1fr))',
            gap: 20,
          }}>
            {filtered.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        ) : (
          <div style={{
            textAlign: 'center', padding: '80px 24px',
            background: '#fff', borderRadius: 16,
            border: '2px dashed #e8e8e8',
          }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/6028/6028565.png"
              alt="No results"
              style={{ width: 68, height: 68, opacity: 0.35, marginBottom: 18, display: 'block', margin: '0 auto 18px' }}
            />
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#222', margin: '0 0 8px' }}>No Properties Found</h3>
            <p style={{ color: '#aaa', fontSize: 15, margin: '0 0 24px' }}>
              {search
                ? `No matches for "${search}"`
                : activeCat
                  ? `No properties in ${activeCat.title} category`
                  : 'No properties available at the moment.'}
            </p>
            <button
              onClick={() => { setSearch(''); setActiveCat(null); }}
              style={{
                padding: '10px 28px', background: '#222', color: '#fff',
                border: 'none', borderRadius: 10, fontWeight: 600,
                fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyListPage;