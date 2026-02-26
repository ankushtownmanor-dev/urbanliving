
// import React, { useState, useEffect, useMemo } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { FiSearch, FiMapPin, FiHeart, FiPlus, FiStar, FiX } from 'react-icons/fi';
// import { BiBed, BiBath, BiArea } from 'react-icons/bi';

// const API_BASE_URL = 'https://townmanor.ai/api/ovika';

// const CATEGORIES = [
//   { id: 'PG', title: 'PG', icon: '🏠', minPrice: 0, maxPrice: 1499 },
//   { id: 'Economy Stay', title: 'Economy Stay', icon: '🏢', minPrice: 1500, maxPrice: 2499 },
//   { id: 'Premium Stay', title: 'Premium Stay', icon: '✨', minPrice: 2500, maxPrice: Infinity },
// ];

// /* ─── Property Card ─────────────────────────────── */
// const PropertyCard = ({ property, rentalType }) => {
//   const navigate = useNavigate();
//   const [fav, setFav] = useState(false);

//   const randomRating = useMemo(() => {
//     return (Math.random() * (4.9 - 4.1) + 4.1).toFixed(1);
//   }, [property.id]);

//   const getCount = (val) => {
//     if (typeof val === 'number') return val;
//     if (Array.isArray(val)) return val.reduce((a, c) => a + (Number(c.count) || 0), 0);
//     if (typeof val === 'string') {
//       try {
//         const p = JSON.parse(val);
//         if (Array.isArray(p)) return p.reduce((a, c) => a + (Number(c.count) || 0), 0);
//       } catch { return parseInt(val) || 0; }
//     }
//     return 0;
//   };

//   const formatPrice = (price) => {
//     const n = Number(price);
//     if (!price || isNaN(n)) return 'Price on Request';
//     return `₹${n.toLocaleString('en-IN')}`;
//   };

//   const getMeta = () => {
//     if (!property.meta) return {};
//     if (typeof property.meta === 'object') return property.meta;
//     try { return JSON.parse(property.meta); } catch { return {}; }
//   };

//   const meta = getMeta();

//   // ── Price Logic ──
//   const isMonthly = rentalType === 'long';

//   const getDisplayPrice = () => {
//     if (property.property_category === 'PG') {
//       if (isMonthly) {
//         const monthly = Number(meta?.perMonthPrice) || Number(meta?.monthlyPrice) || Number(property.monthly_price) || 0;
//         return { price: monthly, label: '/ month' };
//       } else {
//         const nightly = Number(meta?.perNightPrice) || Number(property.price) || 0;
//         return { price: nightly, label: '/ night' };
//       }
//     }
//     // Non-PG properties
//     if (isMonthly) {
//       const monthly = Number(meta?.perMonthPrice) || Number(meta?.monthlyPrice) || Number(property.monthly_price) || Number(property.price) || 0;
//       return { price: monthly, label: '/ month' };
//     }
//     return { price: Number(property.price) || 0, label: '/ night' };
//   };

//   const { price: displayPrice, label: priceLabel } = getDisplayPrice();

//   const coverPhoto =
//     property.cover_photo ||
//     (Array.isArray(property.photos) && property.photos[0]) ||
//     'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';

//   return (
//     <div
//       onClick={(e) => { if (!e.target.closest('[data-action]')) navigate(`/property/${property.id}`); }}
//       onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.13)'}
//       onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.08)'}
//       style={{
//         background: '#fff', borderRadius: 14, overflow: 'hidden',
//         cursor: 'pointer', border: '1px solid #e8e8e8',
//         boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
//         transition: 'box-shadow 0.25s ease',
//         display: 'flex', flexDirection: 'column',
//       }}
//     >
//       {/* Image */}
//       <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', background: '#f0f0f0' }}>
//         <img
//           src={coverPhoto}
//           alt={property.property_name}
//           onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'; }}
//           onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
//           onMouseLeave={e => e.target.style.transform = 'scale(1)'}
//           style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
//         />
//         <button
//           data-action="fav"
//           onClick={e => { e.stopPropagation(); setFav(!fav); }}
//           style={{
//             position: 'absolute', top: 10, right: 10,
//             width: 32, height: 32, background: 'rgba(255,255,255,0.88)',
//             border: 'none', borderRadius: '50%',
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             cursor: 'pointer', backdropFilter: 'blur(4px)',
//             color: fav ? '#e84040' : '#555', fontSize: 15,
//           }}
//         >
//           <FiHeart style={{ fill: fav ? '#e84040' : 'none' }} />
//         </button>

//         {/* Category Badge */}
//         {property.property_category && (
//           <span style={{
//             position: 'absolute', bottom: 10, left: 10,
//             background: 'rgba(255,255,255,0.92)', color: '#222',
//             padding: '3px 10px', borderRadius: 6, fontSize: 11,
//             fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em',
//           }}>
//             {property.property_category}
//           </span>
//         )}

//         {/* Rental Type Badge */}
//         <span style={{
//           position: 'absolute', bottom: 10, right: 10,
//           background: isMonthly ? 'rgba(201,139,62,0.92)' : 'rgba(30,30,30,0.82)',
//           color: '#fff',
//           padding: '3px 10px', borderRadius: 6, fontSize: 11,
//           fontWeight: 700, letterSpacing: '0.04em',
//         }}>
//           {isMonthly ? 'Monthly' : 'Nightly'}
//         </span>
//       </div>

//       {/* Card Body */}
//       <div style={{ padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
//         {/* Title + Rating */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
//           <h3 style={{
//             fontSize: 15, fontWeight: 600, color: '#222', lineHeight: 1.3,
//             flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0,
//           }}>
//             {property.property_name || 'Untitled Property'}
//           </h3>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0 }}>
//             <FiStar style={{ fontSize: 13, color: '#222', fill: '#222' }} />
//             <span style={{ fontSize: 13, fontWeight: 600, color: '#222' }}>{randomRating}</span>
//           </div>
//         </div>

//         {/* Location */}
//         <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#717171', fontSize: 13 }}>
//           <FiMapPin style={{ fontSize: 13, flexShrink: 0 }} />
//           <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//             {property.city || 'City not specified'}{property.address ? `, ${property.address}` : ''}
//           </span>
//         </div>

//         {/* Specs */}
//         <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#717171', fontSize: 13 }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
//             <BiBed style={{ fontSize: 15 }} /><span>{getCount(property.bedrooms)} Beds</span>
//           </div>
//           <span style={{ color: '#ddd' }}>•</span>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
//             <BiBath style={{ fontSize: 15 }} /><span>{getCount(property.bathrooms)} Baths</span>
//           </div>
//           <span style={{ color: '#ddd' }}>•</span>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
//             <BiArea style={{ fontSize: 15 }} /><span>{property.area || 0} sqft</span>
//           </div>
//         </div>

//         {/* Amenities */}
//         {Array.isArray(property.amenities) && property.amenities.length > 0 && (
//           <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 2 }}>
//             {property.amenities.slice(0, 3).map((a, i) => (
//               <span key={i} style={{
//                 padding: '3px 9px', background: '#f5f5f5', color: '#717171',
//                 borderRadius: 6, fontSize: 12, fontWeight: 500,
//               }}>{a}</span>
//             ))}
//             {property.amenities.length > 3 && (
//               <span style={{
//                 padding: '3px 9px', background: '#C98B3E', color: '#fff',
//                 borderRadius: 6, fontSize: 12, fontWeight: 500,
//               }}>+{property.amenities.length - 3} more</span>
//             )}
//           </div>
//         )}

//         {/* Price */}
//         <div style={{ marginTop: 'auto', paddingTop: 10, borderTop: '1px solid #f0f0f0' }}>
//           <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
//             <span style={{ fontSize: 17, fontWeight: 700, color: '#222' }}>
//               {formatPrice(displayPrice)}
//             </span>
//             {displayPrice > 0 && (
//               <span style={{ fontSize: 13, color: '#717171' }}>{priceLabel}</span>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ─── Main Page ─────────────────────────────────── */
// const PropertyListPage = () => {
//   const [properties, setProperties] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [search, setSearch] = useState('');
//   const [activeCat, setActiveCat] = useState(null);
//   const [rentalType, setRentalType] = useState(null); // 'short' | 'long' | null
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Long-term form ki pehchaan:
//   // Short-term form (Tmx9) property_type bhejta hai: "Entire place" ya "Private room"
//   // Long-term form (PGListingForm) property_type bhejta hai: "Apartment" ya kuch aur
//   const isLongTermProperty = (p) => {
//     const shortTermTypes = ['Entire place', 'Private room'];
//     return !shortTermTypes.includes(p.property_type);
//   };

//   const applyFilter = (list, cat, q, rental) => {
//     let result = list;

//     // ── ONLY CHANGE: nightly view mein rental_type==='long' wali properties hide karo ──
//     if (rental !== 'long') {
//       result = result.filter(p => !isLongTermProperty(p));
//     }

//     if (cat) {
//       result = result.filter(p => {
//         // PG tab: hamesha sirf PG category
//         if (cat.id === 'PG') return p.property_category === 'PG';
//         if (p.property_category === 'PG') return false;

//         if (rental === 'long') {
//           // Monthly view: Economy = 8000-25000, Premium = 25000+
//           const price = Number(p.price) || 0;
//           if (cat.id === 'Economy Stay') return price >= 8000 && price <= 25000;
//           if (cat.id === 'Premium Stay') return price > 25000;
//         } else {
//           // Nightly view: original minPrice/maxPrice ranges
//           const price = Number(p.price) || 0;
//           return price >= cat.minPrice && price <= cat.maxPrice;
//         }
//         return false;
//       });
//     }
//     if (q.trim()) {
//       const qL = q.toLowerCase();
//       result = result.filter(p =>
//         p.property_name?.toLowerCase().includes(qL) ||
//         p.address?.toLowerCase().includes(qL) ||
//         p.city?.toLowerCase().includes(qL)
//       );
//     }
//     return result;
//   };

//   const fetchProperties = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(`${API_BASE_URL}/properties`);
//       if (!res.ok) throw new Error('Failed to fetch');
//       const data = await res.json();
//       const list = data?.data || [];
//       setProperties(list);
//       setFiltered(list);
//     } catch (e) { setError(e.message); }
//     finally { setLoading(false); }
//   };

//   useEffect(() => { fetchProperties(); }, []);
//   useEffect(() => { setFiltered(applyFilter(properties, activeCat, search, rentalType)); }, [search, activeCat, properties, rentalType]);

//   // Read category AND rentalType from URL params
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);

//     // Category
//     const cId = params.get('category');
//     if (cId && properties.length > 0) {
//       const match = CATEGORIES.find(c =>
//         c.id.toLowerCase() === cId.toLowerCase() || c.title.toLowerCase() === cId.toLowerCase()
//       );
//       if (match) setActiveCat(match);
//     }

//     // Rental type from URL — overrides sessionStorage if present
//     const rt = params.get('rentalType');
//     if (rt) {
//       setRentalType(rt);
//     } else {
//       // Fallback to sessionStorage
//       const stored = sessionStorage.getItem('ovika_rental_type');
//       if (stored) setRentalType(stored);
//     }
//   }, [location.search, properties]);

//   const isMonthly = rentalType === 'long';

//   if (loading) return (
//     <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//       <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//       <div style={{
//         width: 44, height: 44, border: '3px solid #eee',
//         borderTopColor: '#C98B3E', borderRadius: '50%',
//         animation: 'spin 0.8s linear infinite',
//       }} />
//     </div>
//   );

//   if (error) return (
//     <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
//       <h2 style={{ margin: 0 }}>Error</h2><p style={{ margin: 0, color: '#999' }}>{error}</p>
//     </div>
//   );

//   return (
//     <div style={{ minHeight: '100vh', background: '#f7f7f7', fontFamily: "'Inter', -apple-system, sans-serif" }}>

//       {/* ── HERO HEADER ── */}
//       <div style={{
//         background: 'linear-gradient(135deg, #b8762e 0%, #C98B3E 40%, #d4a055 100%)',
//         padding: '52px 24px 44px',
//         display: 'flex', justifyContent: 'center',
//         position: 'relative', overflow: 'hidden',
//       }}>
//         <div style={{
//           position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.06,
//           backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
//         }} />

//         <div style={{ maxWidth: 760, width: '100%', position: 'relative', zIndex: 1, textAlign: 'center' }}>
//           <h1 style={{
//             fontSize: 44, fontWeight: 800, color: '#fff',
//             margin: '0 0 10px', letterSpacing: '-0.025em', lineHeight: 1.1,
//           }}>
//             Book your Stay
//           </h1>

//           {/* Rental type indicator badge */}
//           {rentalType && (
//             <div style={{
//               display: 'inline-flex', alignItems: 'center', gap: 6,
//               background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.4)',
//               borderRadius: 50, padding: '4px 14px', marginBottom: 14,
//             }}>
//               <span style={{ fontSize: 13, color: '#fff', fontWeight: 600 }}>
//                 {isMonthly ? '🗓 Monthly Rates' : '🌙 Nightly Rates'}
//               </span>
//             </div>
//           )}

//           <p style={{
//             fontSize: 16, color: 'rgba(255,255,255,0.88)',
//             margin: '0 0 30px', lineHeight: 1.65, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto',
//           }}>
//             Luxury studios, homestays, and serviced apartments — curated for comfortable short and extended stays
//           </p>

//           {/* Search Bar */}
//           <div style={{
//             background: '#fff', borderRadius: 16,
//             display: 'flex', alignItems: 'center',
//             padding: '14px 16px', gap: 12,
//             boxShadow: '0 10px 36px rgba(0,0,0,0.2)',
//           }}>
//             <FiSearch style={{ fontSize: 20, color: '#aaa', flexShrink: 0 }} />
//             <input
//               type="text"
//               placeholder="Search by city, locality, or property name..."
//               value={search}
//               onChange={e => setSearch(e.target.value)}
//               style={{
//                 flex: 1, border: 'none', outline: 'none',
//                 fontSize: 15, color: '#222', background: 'transparent',
//                 fontFamily: 'inherit',
//               }}
//             />
//             {search && (
//               <button
//                 onClick={() => setSearch('')}
//                 style={{
//                   width: 28, height: 28, borderRadius: '50%', border: 'none',
//                   background: '#f0f0f0', color: '#777', cursor: 'pointer',
//                   display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
//                 }}
//               >
//                 <FiX style={{ fontSize: 13 }} />
//               </button>
//             )}
//           </div>

//           {/* Category Tabs */}
//           <div style={{
//             display: 'flex', justifyContent: 'center', alignItems: 'center',
//             gap: 8, marginTop: 14, flexWrap: 'nowrap', width: '100%',
//           }}>
//             {CATEGORIES.map(cat => {
//               const isActive = activeCat?.id === cat.id;
//               return (
//                 <button
//                   key={cat.id}
//                   onClick={() => setActiveCat(isActive ? null : cat)}
//                   style={{
//                     display: 'inline-flex', alignItems: 'center', gap: 5,
//                     padding: '7px 14px',
//                     background: isActive ? '#fff' : 'rgba(255,255,255,0.15)',
//                     border: `2px solid ${isActive ? '#fff' : 'rgba(255,255,255,0.4)'}`,
//                     borderRadius: 50,
//                     color: isActive ? '#C98B3E' : '#fff',
//                     fontWeight: isActive ? 700 : 500,
//                     fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
//                     transition: 'all 0.2s ease',
//                     boxShadow: isActive ? '0 4px 14px rgba(0,0,0,0.14)' : 'none',
//                     whiteSpace: 'nowrap', flex: '1 1 0', justifyContent: 'center',
//                     minWidth: 0,
//                   }}
//                   onMouseEnter={e => {
//                     if (!isActive) {
//                       e.currentTarget.style.background = 'rgba(255,255,255,0.26)';
//                       e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)';
//                     }
//                   }}
//                   onMouseLeave={e => {
//                     if (!isActive) {
//                       e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
//                       e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
//                     }
//                   }}
//                 >
//                   <span style={{ fontSize: 14 }}>{cat.icon}</span>
//                   <span>{cat.title}</span>
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* ── MAIN CONTENT ── */}
//       <div style={{ maxWidth: 1440, margin: '0 auto', padding: '32px 24px 60px' }}>

//         {/* Section Header */}
//         <div style={{
//           display: 'flex', justifyContent: 'space-between',
//           alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12,
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
//             <h2 style={{ fontSize: 20, fontWeight: 700, color: '#222', margin: 0 }}>
//               {activeCat ? activeCat.title : 'All Properties'}
//               <span style={{ fontWeight: 400, color: '#aaa', fontSize: 17, marginLeft: 8 }}>
//                 ({filtered.length})
//               </span>
//             </h2>
//             {activeCat && (
//               <button
//                 onClick={() => setActiveCat(null)}
//                 style={{
//                   display: 'inline-flex', alignItems: 'center', gap: 5,
//                   padding: '5px 14px',
//                   background: '#FFF6EE', border: '1px solid rgba(201,139,62,0.3)',
//                   borderRadius: 50, color: '#C98B3E', fontSize: 13,
//                   fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
//                 }}
//               >
//                 <FiX style={{ fontSize: 12 }} /> Clear filter
//               </button>
//             )}
//           </div>

//           <button
//             onClick={() => navigate('/listed1')}
//             onMouseEnter={e => e.currentTarget.style.background = '#AF7834'}
//             onMouseLeave={e => e.currentTarget.style.background = '#C98B3E'}
//             style={{
//               display: 'flex', alignItems: 'center', gap: 6,
//               padding: '10px 20px', background: '#C98B3E', color: '#fff',
//               border: 'none', borderRadius: 10, fontWeight: 600, fontSize: 14,
//               cursor: 'pointer', fontFamily: 'inherit',
//               boxShadow: '0 2px 8px rgba(201,139,62,0.3)',
//               transition: 'background 0.2s ease',
//             }}
//           >
//             <FiPlus /> List Property
//           </button>
//         </div>

//         {/* Properties Grid */}
//         {filtered.length > 0 ? (
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fill, minmax(268px, 1fr))',
//             gap: 20,
//           }}>
//             {filtered.map(p => (
//               <PropertyCard key={p.id} property={p} rentalType={rentalType} />
//             ))}
//           </div>
//         ) : (
//           <div style={{
//             textAlign: 'center', padding: '80px 24px',
//             background: '#fff', borderRadius: 16,
//             border: '2px dashed #e8e8e8',
//           }}>
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/6028/6028565.png"
//               alt="No results"
//               style={{ width: 68, height: 68, opacity: 0.35, marginBottom: 18, display: 'block', margin: '0 auto 18px' }}
//             />
//             <h3 style={{ fontSize: 20, fontWeight: 700, color: '#222', margin: '0 0 8px' }}>No Properties Found</h3>
//             <p style={{ color: '#aaa', fontSize: 15, margin: '0 0 24px' }}>
//               {rentalType === 'long' && activeCat && activeCat.id !== 'PG'
//                 ? `No properties available currently for monthly ${activeCat.title} stays.`
//                 : search
//                   ? `No matches for "${search}"`
//                   : activeCat
//                     ? `No properties in ${activeCat.title} category`
//                     : 'No properties available at the moment.'}
//             </p>
//             <button
//               onClick={() => { setSearch(''); setActiveCat(null); }}
//               style={{
//                 padding: '10px 28px', background: '#222', color: '#fff',
//                 border: 'none', borderRadius: 10, fontWeight: 600,
//                 fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
//               }}
//             >
//               Clear All Filters
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PropertyListPage;


import React, { useState, useEffect, useMemo } from 'react';
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
const PropertyCard = ({ property, rentalType }) => {
  const navigate = useNavigate();
  const [fav, setFav] = useState(false);

  const randomRating = useMemo(() => {
    return (Math.random() * (4.9 - 4.1) + 4.1).toFixed(1);
  }, [property.id]);

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

  // ── Price Logic ──
  const isMonthly = rentalType === 'long';

  // PG bedrooms array se minimum price nikalna
  const getPgMinPrice = () => {
    try {
      const beds = typeof property.bedrooms === 'string'
        ? JSON.parse(property.bedrooms)
        : (property.bedrooms || []);
      const prices = beds
        .map(b => Number(b.price) || Number(b.monthly_price) || 0)
        .filter(p => p > 0);
      if (prices.length > 0) return Math.min(...prices);
    } catch {}
    return 0;
  };

  const getDisplayPrice = () => {
    if (property.property_category === 'PG') {
      const minRoomPrice = getPgMinPrice();
      if (isMonthly) {
        const monthly = minRoomPrice || Number(meta?.perMonthPrice) || Number(meta?.monthlyPrice) || Number(property.monthly_price) || Number(property.base_rate) || 0;
        return { price: monthly, label: '/ month', prefix: 'Starts at' };
      } else {
        const nightly = minRoomPrice || Number(meta?.perNightPrice) || Number(property.price) || Number(property.base_rate) || 0;
        return { price: nightly, label: '/ night', prefix: 'Starts at' };
      }
    }
    // Non-PG properties
    if (isMonthly) {
      const monthly = Number(meta?.perMonthPrice) || Number(meta?.monthlyPrice) || Number(property.monthly_price) || Number(property.price) || 0;
      return { price: monthly, label: '/ month', prefix: null };
    }
    return { price: Number(property.price) || 0, label: '/ night', prefix: null };
  };

  const { price: displayPrice, label: priceLabel, prefix: pricePrefix } = getDisplayPrice();

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

        {/* Category Badge */}
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

        {/* Rental Type Badge */}
        <span style={{
          position: 'absolute', bottom: 10, right: 10,
          background: isMonthly ? 'rgba(201,139,62,0.92)' : 'rgba(30,30,30,0.82)',
          color: '#fff',
          padding: '3px 10px', borderRadius: 6, fontSize: 11,
          fontWeight: 700, letterSpacing: '0.04em',
        }}>
          {isMonthly ? 'Monthly' : 'Nightly'}
        </span>
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
            <span style={{ fontSize: 13, fontWeight: 600, color: '#222' }}>{randomRating}</span>
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
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, flexWrap: 'wrap' }}>
            {pricePrefix && (
              <span style={{ fontSize: 12, color: '#999', fontWeight: 500 }}>{pricePrefix}</span>
            )}
            <span style={{ fontSize: 17, fontWeight: 700, color: '#222' }}>
              {formatPrice(displayPrice)}
            </span>
            {displayPrice > 0 && (
              <span style={{ fontSize: 13, color: '#717171' }}>{priceLabel}</span>
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
  const [rentalType, setRentalType] = useState(null); // 'short' | 'long' | null
  const navigate = useNavigate();
  const location = useLocation();

  // Long-term form ki pehchaan:
  // Short-term form (Tmx9) property_type bhejta hai: "Entire place" ya "Private room"
  // Long-term form (PGListingForm) property_type bhejta hai: "Apartment" ya kuch aur
  const isLongTermProperty = (p) => {
    const shortTermTypes = ['Entire place', 'Private room'];
    return !shortTermTypes.includes(p.property_type);
  };

  const applyFilter = (list, cat, q, rental) => {
    let result = list;

    // Nightly view: long-term properties hide karo, BUT PG hamesha dikhao dono views mein
    if (rental !== 'long') {
      result = result.filter(p => p.property_category === 'PG' || !isLongTermProperty(p));
    }

    if (cat) {
      result = result.filter(p => {
        // PG tab: hamesha sirf PG category
        if (cat.id === 'PG') return p.property_category === 'PG';
        if (p.property_category === 'PG') return false;

        if (rental === 'long') {
          // Monthly view: Economy = 8000-25000, Premium = 25000+
          const price = Number(p.price) || 0;
          if (cat.id === 'Economy Stay') return price >= 8000 && price <= 25000;
          if (cat.id === 'Premium Stay') return price > 25000;
        } else {
          // Nightly view: original minPrice/maxPrice ranges
          const price = Number(p.price) || 0;
          return price >= cat.minPrice && price <= cat.maxPrice;
        }
        return false;
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
  useEffect(() => { setFiltered(applyFilter(properties, activeCat, search, rentalType)); }, [search, activeCat, properties, rentalType]);

  // Read category AND rentalType from URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    // Category
    const cId = params.get('category');
    if (cId && properties.length > 0) {
      const match = CATEGORIES.find(c =>
        c.id.toLowerCase() === cId.toLowerCase() || c.title.toLowerCase() === cId.toLowerCase()
      );
      if (match) setActiveCat(match);
    }

    // Rental type from URL — overrides sessionStorage if present
    const rt = params.get('rentalType');
    if (rt) {
      setRentalType(rt);
    } else {
      // Fallback to sessionStorage
      const stored = sessionStorage.getItem('ovika_rental_type');
      if (stored) setRentalType(stored);
    }
  }, [location.search, properties]);

  const isMonthly = rentalType === 'long';

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
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.06,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <div style={{ maxWidth: 760, width: '100%', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 style={{
            fontSize: 44, fontWeight: 800, color: '#fff',
            margin: '0 0 10px', letterSpacing: '-0.025em', lineHeight: 1.1,
          }}>
            Book your Stay
          </h1>

          {/* Rental type indicator badge */}
          {rentalType && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.4)',
              borderRadius: 50, padding: '4px 14px', marginBottom: 14,
            }}>
              <span style={{ fontSize: 13, color: '#fff', fontWeight: 600 }}>
                {isMonthly ? '🗓 Monthly Rates' : '🌙 Nightly Rates'}
              </span>
            </div>
          )}

          <p style={{
            fontSize: 16, color: 'rgba(255,255,255,0.88)',
            margin: '0 0 30px', lineHeight: 1.65, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto',
          }}>
            Luxury studios, homestays, and serviced apartments — curated for comfortable short and extended stays
          </p>

          {/* Search Bar */}
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

          {/* Category Tabs */}
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
            {filtered.map(p => (
              <PropertyCard key={p.id} property={p} rentalType={rentalType} />
            ))}
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
              {rentalType === 'long' && activeCat && activeCat.id !== 'PG'
                ? `No properties available currently for monthly ${activeCat.title} stays.`
                : search
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