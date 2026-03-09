
// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { MapPin, Calendar, Users, Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
// // // import './Home1.css';

// // // /* ── Custom Mini Calendar ── */
// // // function MiniCalendar({ value, onChange, minDate, onClose, title }) {
// // //   const today = new Date();
// // //   const initDate = value ? new Date(value) : today;
// // //   const [viewYear, setViewYear] = useState(initDate.getFullYear());
// // //   const [viewMonth, setViewMonth] = useState(initDate.getMonth());

// // //   const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
// // //   const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// // //   const firstDay = new Date(viewYear, viewMonth, 1).getDay();
// // //   const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

// // //   const cells = [];
// // //   for (let i = 0; i < firstDay; i++) cells.push(null);
// // //   for (let d = 1; d <= daysInMonth; d++) cells.push(d);

// // //   const selectedDay = value ? new Date(value).getDate() : null;
// // //   const selectedMonth = value ? new Date(value).getMonth() : null;
// // //   const selectedYear = value ? new Date(value).getFullYear() : null;

// // //   const isSelected = (d) => d && d === selectedDay && viewMonth === selectedMonth && viewYear === selectedYear;

// // //   const isPast = (d) => {
// // //     if (!d || !minDate) return false;
// // //     const cell = new Date(viewYear, viewMonth, d);
// // //     const min = new Date(minDate);
// // //     min.setHours(0,0,0,0);
// // //     return cell < min;
// // //   };

// // //   const handleDay = (d) => {
// // //     if (!d || isPast(d)) return;
// // //     const month = String(viewMonth + 1).padStart(2, '0');
// // //     const day = String(d).padStart(2, '0');
// // //     onChange(`${viewYear}-${month}-${day}`);
// // //     onClose();
// // //   };

// // //   const prevMonth = () => {
// // //     if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
// // //     else setViewMonth(m => m - 1);
// // //   };
// // //   const nextMonth = () => {
// // //     if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
// // //     else setViewMonth(m => m + 1);
// // //   };

// // //   return (
// // //     <div className="ovika-cal-popup" onClick={e => e.stopPropagation()}>
// // //       {/* Header */}
// // //       <div className="ovika-cal-header">
// // //         <span className="ovika-cal-title">{title}</span>
// // //         <button className="ovika-cal-close" onClick={onClose}><X size={13} /></button>
// // //       </div>
// // //       {/* Nav */}
// // //       <div className="ovika-cal-nav">
// // //         <button className="ovika-cal-nav-btn" onClick={prevMonth}><ChevronLeft size={15} /></button>
// // //         <span className="ovika-cal-month-label">{MONTHS[viewMonth]} {viewYear}</span>
// // //         <button className="ovika-cal-nav-btn" onClick={nextMonth}><ChevronRight size={15} /></button>
// // //       </div>
// // //       {/* Day headers */}
// // //       <div className="ovika-cal-grid">
// // //         {DAYS.map(d => <div key={d} className="ovika-cal-day-name">{d}</div>)}
// // //         {cells.map((d, i) => (
// // //           <div
// // //             key={i}
// // //             className={[
// // //               'ovika-cal-cell',
// // //               d ? 'ovika-cal-cell--active' : '',
// // //               isSelected(d) ? 'ovika-cal-cell--selected' : '',
// // //               isPast(d) ? 'ovika-cal-cell--past' : '',
// // //             ].join(' ')}
// // //             onClick={() => handleDay(d)}
// // //           >
// // //             {d || ''}
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // /* ── Main Component ── */
// // // export default function Home1() {
// // //   const navigate = useNavigate();
// // //   const [rentalType, setRentalType] = useState(null);
// // //   const [city, setCity] = useState('Noida');
// // //   const [checkIn, setCheckIn] = useState('');
// // //   const [checkOut, setCheckOut] = useState('');
// // //   const [guests, setGuests] = useState(1);
// // //   const [showCityDropdown, setShowCityDropdown] = useState(false);
// // //   const [showGuestPopup, setShowGuestPopup] = useState(false);
// // //   const [showCheckInCal, setShowCheckInCal] = useState(false);
// // //   const [showCheckOutCal, setShowCheckOutCal] = useState(false);
// // //   const [cities, setCities] = useState(['Noida', 'Gurugram', 'Delhi', 'Mumbai', 'Bengaluru']);
// // //   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

// // //   const guestPopupRef = useRef(null);

// // //   useEffect(() => {
// // //     const handleResize = () => setIsMobile(window.innerWidth <= 768);
// // //     window.addEventListener('resize', handleResize);
// // //     return () => window.removeEventListener('resize', handleResize);
// // //   }, []);

// // //   useEffect(() => {
// // //     const handleOutside = (e) => {
// // //       if (guestPopupRef.current && !guestPopupRef.current.contains(e.target)) {
// // //         setShowGuestPopup(false);
// // //       }
// // //     };
// // //     document.addEventListener('mousedown', handleOutside);
// // //     document.addEventListener('touchstart', handleOutside);
// // //     return () => {
// // //       document.removeEventListener('mousedown', handleOutside);
// // //       document.removeEventListener('touchstart', handleOutside);
// // //     };
// // //   }, []);

// // //   useEffect(() => {
// // //     const fetchCities = async () => {
// // //       try {
// // //         const res = await fetch('https://townmanor.ai/api/ovika/properties');
// // //         if (!res.ok) throw new Error('Fetch failed');
// // //         const data = await res.json();
// // //         const list = data?.data || [];
// // //         let uniqueCities = [...new Set(list.map(p => p.city).filter(Boolean))].sort();
// // //         if (uniqueCities.length > 0) {
// // //           setCities(uniqueCities);
// // //           if (!uniqueCities.includes('Noida')) setCity(uniqueCities[0]);
// // //         }
// // //       } catch (err) {
// // //         console.error('Error fetching cities:', err);
// // //       }
// // //     };
// // //     fetchCities();

// // //     const type = sessionStorage.getItem('ovika_rental_type');
// // //     setRentalType(type);
// // //     const interval = setInterval(() => {
// // //       setRentalType(sessionStorage.getItem('ovika_rental_type'));
// // //     }, 300);
// // //     return () => clearInterval(interval);
// // //   }, []);

// // //   const pricingLabel = rentalType === 'short' ? ' — Per Night' : rentalType === 'long' ? ' — Per Month' : '';

// // //   const cards = [
// // //     { icon: '🏠', title: 'PG', subtitle: `Affordable stays${pricingLabel}`, desc: 'Ideal for students & professionals.', category: 'PG' },
// // //     { icon: '🏢', title: 'Economy Stay', subtitle: `Comfort at great value${pricingLabel}`, desc: 'Well-furnished homes with modern amenities.', category: 'Economy Stay' },
// // //     { icon: '✨', title: 'Premium Stay', subtitle: `Refined living experience${pricingLabel}`, desc: 'Enhanced comfort with premium facilities.', category: 'Premium Stay' },
// // //   ];

// // //   const buildHref = (category) => {
// // //     const params = new URLSearchParams();
// // //     params.set('category', category);
// // //     if (rentalType) params.set('rentalType', rentalType);
// // //     return `/properties?${params.toString()}`;
// // //   };

// // //   const handleSearch = () => {
// // //     const params = new URLSearchParams();
// // //     if (city) { params.set('city', city); params.set('search', city); }
// // //     if (rentalType) params.set('rentalType', rentalType);
// // //     if (checkIn) params.set('checkIn', checkIn);
// // //     if (checkOut) params.set('checkOut', checkOut);
// // //     if (guests) params.set('guests', guests.toString());
// // //     navigate(`/properties?${params.toString()}`);
// // //   };

// // //   const formatDate = (val) => {
// // //     if (!val) return null;
// // //     const d = new Date(val);
// // //     return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
// // //   };

// // //   const todayStr = new Date().toISOString().split('T')[0];

// // //   return (
// // //     <div className="ovika-urban-hero-container">

// // //       <div className="ovika-urban-hero-bg">
// // //         <img
// // //           src={isMobile ? '/home1mobile.png' : '/home2desktop.png'}
// // //           alt=""
// // //           className="ovika-bg-img"
// // //         />
// // //         {isMobile && <div className="ovika-mobile-overlay" />}
// // //       </div>

// // //       <div className="ovika-urban-hero-wrapper">

// // //         <div className="ovika-hero-left">
// // //           <h1 className="ovika-urban-hero-heading">
// // //             <span className="ovika-brand-name">OvikaLiving.com</span> – India's Smart Stay Marketplace
// // //           </h1>
// // //         </div>

// // //         <div className="ovika-hero-cards">
// // //           {cards.map((card, i) => (
// // //             <a key={i} href={buildHref(card.category)} className="ovika-hero-card"
// // //               style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}>
// // //               <div className="ovika-card-icon">{card.icon}</div>
// // //               <div className="ovika-card-body">
// // //                 <h3 className="ovika-card-title">{card.title}</h3>
// // //                 <p className="ovika-card-subtitle">{card.subtitle}</p>
// // //                 <p className="ovika-card-desc">{card.desc}</p>
// // //               </div>
// // //             </a>
// // //           ))}
// // //         </div>

// // //         <div className="ovika-search-section">
// // //           <div className="ovika-search-title">
// // //             <MapPin className="pin-icon" size={16} />
// // //             <span style={{color:"#fff"}}>Where are you going?</span>
// // //           </div>

// // //           <div className="ovika-search-bar-container">

// // //             {/* ── CITY ── */}
// // //             <div className="ovika-search-field city-field"
// // //               onClick={() => { setShowCityDropdown(!showCityDropdown); setShowCheckInCal(false); setShowCheckOutCal(false); setShowGuestPopup(false); }}>
// // //               <div className="field-icon-box"><MapPin size={15} style={{ color: '#f5a623' }} /></div>
// // //               <div className="field-text">
// // //                 <span className="field-label">Location</span>
// // //                 <span className="field-value">{city}</span>
// // //               </div>
// // //               {showCityDropdown && (
// // //                 <div className="city-dropdown">
// // //                   {cities.map(c => (
// // //                     <div key={c} className="city-option"
// // //                       onClick={(e) => { e.stopPropagation(); setCity(c); setShowCityDropdown(false); }}>
// // //                       {c}
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               )}
// // //             </div>

// // //             <div className="field-divider" />

// // //             {/* ── CHECK-IN ── */}
// // //             <div className="ovika-search-field" style={{ position: 'relative' }}
// // //               onClick={() => { if (isMobile) { setShowCheckInCal(!showCheckInCal); setShowCheckOutCal(false); setShowCityDropdown(false); setShowGuestPopup(false); } }}>
// // //               <div className="field-icon-box"><Calendar size={15} /></div>
// // //               <div className="field-text">
// // //                 <span className="field-label">Check-in</span>
// // //                 {isMobile
// // //                   ? <span className="field-value" style={{ color: checkIn ? '#1a1a1a' : '#aaa' }}>{formatDate(checkIn) || 'Add date'}</span>
// // //                   : <input type="date" className="date-input" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
// // //                 }
// // //               </div>
// // //               {isMobile && showCheckInCal && (
// // //                 <MiniCalendar
// // //                   title="Check-in"
// // //                   value={checkIn}
// // //                   onChange={setCheckIn}
// // //                   minDate={todayStr}
// // //                   onClose={() => setShowCheckInCal(false)}
// // //                 />
// // //               )}
// // //             </div>

// // //             <div className="field-divider" />

// // //             {/* ── CHECK-OUT ── */}
// // //             <div className="ovika-search-field" style={{ position: 'relative' }}
// // //               onClick={() => { if (isMobile) { setShowCheckOutCal(!showCheckOutCal); setShowCheckInCal(false); setShowCityDropdown(false); setShowGuestPopup(false); } }}>
// // //               <div className="field-icon-box"><Calendar size={15} /></div>
// // //               <div className="field-text">
// // //                 <span className="field-label">Check-out</span>
// // //                 {isMobile
// // //                   ? <span className="field-value" style={{ color: checkOut ? '#1a1a1a' : '#aaa' }}>{formatDate(checkOut) || 'Add date'}</span>
// // //                   : <input type="date" className="date-input" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
// // //                 }
// // //               </div>
// // //               {isMobile && showCheckOutCal && (
// // //                 <MiniCalendar
// // //                   title="Check-out"
// // //                   value={checkOut}
// // //                   onChange={setCheckOut}
// // //                   minDate={checkIn || todayStr}
// // //                   onClose={() => setShowCheckOutCal(false)}
// // //                 />
// // //               )}
// // //             </div>

// // //             <div className="field-divider" />

// // //             {/* ── GUESTS ── */}
// // //             {isMobile ? (
// // //               <div className="ovika-search-field guests-field" ref={guestPopupRef}
// // //                 onClick={() => { setShowGuestPopup(!showGuestPopup); setShowCheckInCal(false); setShowCheckOutCal(false); setShowCityDropdown(false); }}>
// // //                 <div className="field-icon-box"><Users size={15} /></div>
// // //                 <div className="field-text">
// // //                   <span className="field-label">Guests</span>
// // //                   <span className="field-value">{guests} Guest{guests > 1 ? 's' : ''}</span>
// // //                 </div>
// // //                 {showGuestPopup && (
// // //                   <div className="guest-popup" onClick={(e) => e.stopPropagation()}>
// // //                     <div className="guest-popup-header">
// // //                       <span className="guest-popup-title">Guests</span>
// // //                       <button className="guest-popup-close" onClick={() => setShowGuestPopup(false)}><X size={14} /></button>
// // //                     </div>
// // //                     <div className="guest-popup-row">
// // //                       <button className="guest-popup-btn" onClick={(e) => { e.stopPropagation(); setGuests(Math.max(1, guests - 1)); }}>−</button>
// // //                       <span className="guest-popup-count">{guests}</span>
// // //                       <button className="guest-popup-btn" onClick={(e) => { e.stopPropagation(); setGuests(guests + 1); }}>+</button>
// // //                     </div>
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             ) : (
// // //               <div className="ovika-search-field guests-field">
// // //                 <div className="field-icon-box"><Users size={15} /></div>
// // //                 <div className="field-text">
// // //                   <span className="field-label">Guests</span>
// // //                   <span className="field-value">{guests} Guest{guests > 1 ? 's' : ''}</span>
// // //                 </div>
// // //                 <div className="guest-controls">
// // //                   <button onClick={(e) => { e.stopPropagation(); setGuests(Math.max(1, guests - 1)); }}>−</button>
// // //                   <button onClick={(e) => { e.stopPropagation(); setGuests(guests + 1); }}>+</button>
// // //                 </div>
// // //               </div>
// // //             )}

// // //             <button className="ovika-search-btn" onClick={handleSearch}>
// // //               <Search size={15} />
// // //               <span>Search</span>
// // //             </button>

// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import React, { useState, useEffect, useRef } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { MapPin, Calendar, Users, Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
// // import './Home1.css';

// // /* ── Custom Mini Calendar ── */
// // function MiniCalendar({ value, onChange, minDate, onClose, title }) {
// //   const today = new Date();
// //   const initDate = value ? new Date(value) : today;
// //   const [viewYear, setViewYear] = useState(initDate.getFullYear());
// //   const [viewMonth, setViewMonth] = useState(initDate.getMonth());

// //   const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
// //   const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// //   const firstDay = new Date(viewYear, viewMonth, 1).getDay();
// //   const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

// //   const cells = [];
// //   for (let i = 0; i < firstDay; i++) cells.push(null);
// //   for (let d = 1; d <= daysInMonth; d++) cells.push(d);

// //   const selectedDay = value ? new Date(value).getDate() : null;
// //   const selectedMonth = value ? new Date(value).getMonth() : null;
// //   const selectedYear = value ? new Date(value).getFullYear() : null;

// //   const isSelected = (d) => d && d === selectedDay && viewMonth === selectedMonth && viewYear === selectedYear;

// //   const isPast = (d) => {
// //     if (!d || !minDate) return false;
// //     const cell = new Date(viewYear, viewMonth, d);
// //     const min = new Date(minDate);
// //     min.setHours(0,0,0,0);
// //     return cell < min;
// //   };

// //   const handleDay = (d) => {
// //     if (!d || isPast(d)) return;
// //     const month = String(viewMonth + 1).padStart(2, '0');
// //     const day = String(d).padStart(2, '0');
// //     onChange(`${viewYear}-${month}-${day}`);
// //     onClose();
// //   };

// //   const prevMonth = () => {
// //     if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
// //     else setViewMonth(m => m - 1);
// //   };
// //   const nextMonth = () => {
// //     if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
// //     else setViewMonth(m => m + 1);
// //   };

// //   return (
// //     <div className="ovika-cal-popup" onClick={e => e.stopPropagation()}>
// //       <div className="ovika-cal-header">
// //         <span className="ovika-cal-title">{title}</span>
// //         <button className="ovika-cal-close" onClick={onClose}><X size={13} /></button>
// //       </div>
// //       <div className="ovika-cal-nav">
// //         <button className="ovika-cal-nav-btn" onClick={prevMonth}><ChevronLeft size={15} /></button>
// //         <span className="ovika-cal-month-label">{MONTHS[viewMonth]} {viewYear}</span>
// //         <button className="ovika-cal-nav-btn" onClick={nextMonth}><ChevronRight size={15} /></button>
// //       </div>
// //       <div className="ovika-cal-grid">
// //         {DAYS.map(d => <div key={d} className="ovika-cal-day-name">{d}</div>)}
// //         {cells.map((d, i) => (
// //           <div
// //             key={i}
// //             className={[
// //               'ovika-cal-cell',
// //               d ? 'ovika-cal-cell--active' : '',
// //               isSelected(d) ? 'ovika-cal-cell--selected' : '',
// //               isPast(d) ? 'ovika-cal-cell--past' : '',
// //             ].join(' ')}
// //             onClick={() => handleDay(d)}
// //           >
// //             {d || ''}
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // /* ── Main Component ── */
// // export default function Home1() {
// //   const navigate = useNavigate();
// //   const [rentalType, setRentalType] = useState(null);
// //   const [city, setCity] = useState('Noida');
// //   const [checkIn, setCheckIn] = useState('');
// //   const [checkOut, setCheckOut] = useState('');
// //   const [guests, setGuests] = useState(1);
// //   const [showCityDropdown, setShowCityDropdown] = useState(false);
// //   const [showGuestPopup, setShowGuestPopup] = useState(false);
// //   const [showCheckInCal, setShowCheckInCal] = useState(false);
// //   const [showCheckOutCal, setShowCheckOutCal] = useState(false);
// //   const [cities, setCities] = useState(['Noida', 'Gurugram', 'Delhi', 'Mumbai', 'Bengaluru']);
// //   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

// //   const guestPopupRef = useRef(null);

// //   useEffect(() => {
// //     const handleResize = () => setIsMobile(window.innerWidth <= 768);
// //     window.addEventListener('resize', handleResize);
// //     return () => window.removeEventListener('resize', handleResize);
// //   }, []);

// //   useEffect(() => {
// //     const handleOutside = (e) => {
// //       if (guestPopupRef.current && !guestPopupRef.current.contains(e.target)) {
// //         setShowGuestPopup(false);
// //       }
// //     };
// //     document.addEventListener('mousedown', handleOutside);
// //     document.addEventListener('touchstart', handleOutside);
// //     return () => {
// //       document.removeEventListener('mousedown', handleOutside);
// //       document.removeEventListener('touchstart', handleOutside);
// //     };
// //   }, []);

// //   useEffect(() => {
// //     const fetchCities = async () => {
// //       try {
// //         const res = await fetch('https://townmanor.ai/api/ovika/properties');
// //         if (!res.ok) throw new Error('Fetch failed');
// //         const data = await res.json();
// //         const list = data?.data || [];
// //         let uniqueCities = [...new Set(list.map(p => p.city).filter(Boolean))].sort();
// //         if (uniqueCities.length > 0) {
// //           setCities(uniqueCities);
// //           if (!uniqueCities.includes('Noida')) setCity(uniqueCities[0]);
// //         }
// //       } catch (err) {
// //         console.error('Error fetching cities:', err);
// //       }
// //     };
// //     fetchCities();

// //     const type = sessionStorage.getItem('ovika_rental_type');
// //     setRentalType(type);
// //     const interval = setInterval(() => {
// //       setRentalType(sessionStorage.getItem('ovika_rental_type'));
// //     }, 300);
// //     return () => clearInterval(interval);
// //   }, []);

// //   const pricingLabel = rentalType === 'short' ? ' — Per Night' : rentalType === 'long' ? ' — Per Month' : '';

// //   const cards = [
// //     { icon: '🏠', title: 'PG', subtitle: `Affordable stays${pricingLabel}`, desc: 'Ideal for students & professionals.', category: 'PG' },
// //     { icon: '🏢', title: 'Economy Stay', subtitle: `Comfort at great value${pricingLabel}`, desc: 'Well-furnished homes with modern amenities.', category: 'Economy Stay' },
// //     { icon: '✨', title: 'Premium Stay', subtitle: `Refined living experience${pricingLabel}`, desc: 'Enhanced comfort with premium facilities.', category: 'Premium Stay' },
// //   ];

// //   const buildHref = (category) => {
// //     const params = new URLSearchParams();
// //     params.set('category', category);
// //     if (rentalType) params.set('rentalType', rentalType);
// //     return `/properties?${params.toString()}`;
// //   };

// //   const handleSearch = () => {
// //     const params = new URLSearchParams();
// //     if (city) { params.set('city', city); params.set('search', city); }
// //     if (rentalType) params.set('rentalType', rentalType);
// //     if (checkIn) params.set('checkIn', checkIn);
// //     if (checkOut) params.set('checkOut', checkOut);
// //     if (guests) params.set('guests', guests.toString());
// //     navigate(`/properties?${params.toString()}`);
// //   };

// //   const formatDate = (val) => {
// //     if (!val) return null;
// //     const d = new Date(val);
// //     return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
// //   };

// //   const todayStr = new Date().toISOString().split('T')[0];

// //   return (
// //     <div className="ovika-urban-hero-container">

// //       <div className="ovika-urban-hero-bg">
// //         <img
// //           src={isMobile ? '/home1mobile.png' : '/home2desktop.png'}
// //           alt=""
// //           className="ovika-bg-img"
// //         />
// //         {isMobile && <div className="ovika-mobile-overlay" />}
// //       </div>

// //       <div className="ovika-urban-hero-wrapper">

// //         <div className="ovika-hero-right-block">
// //           <div className="ovika-hero-left">
// //             <h1 className="ovika-urban-hero-heading">
// //               <span className="ovika-brand-name">OvikaLiving.com</span> – India's Smart Stay Marketplace
// //             </h1>
// //             {/* Subtitle — h1 ke bahar, alag p tag */}
// //             <p className="ovika-hero-subtitle">
// //               Book Verified PG's, Apartments and Premium Homes across India — Nightly or Monthly
// //             </p>
// //           </div>

// //           <div className="ovika-hero-cards">
// //             {cards.map((card, i) => (
// //               <a key={i} href={buildHref(card.category)} className="ovika-hero-card"
// //                 style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}>
// //                 <div className="ovika-card-icon">{card.icon}</div>
// //                 <div className="ovika-card-body">
// //                   <h3 className="ovika-card-title">{card.title}</h3>
// //                   <p className="ovika-card-subtitle">{card.subtitle}</p>
// //                   <p className="ovika-card-desc">{card.desc}</p>
// //                 </div>
// //               </a>
// //             ))}
// //           </div>
// //         </div>

// //         <div className="ovika-search-section">
// //           <div className="ovika-search-title">
// //             <MapPin className="pin-icon" size={16} />
// //             <span style={{color:"#fff"}}>Where are you going?</span>
// //           </div>

// //           <div className="ovika-search-bar-container">

// //             {/* ── CITY ── */}
// //             <div className="ovika-search-field city-field"
// //               onClick={() => { setShowCityDropdown(!showCityDropdown); setShowCheckInCal(false); setShowCheckOutCal(false); setShowGuestPopup(false); }}>
// //               <div className="field-icon-box"><MapPin size={15} style={{ color: '#f5a623' }} /></div>
// //               <div className="field-text">
// //                 <span className="field-label">Location</span>
// //                 <span className="field-value">{city}</span>
// //               </div>
// //               {showCityDropdown && (
// //                 <div className="city-dropdown">
// //                   {cities.map(c => (
// //                     <div key={c} className="city-option"
// //                       onClick={(e) => { e.stopPropagation(); setCity(c); setShowCityDropdown(false); }}>
// //                       {c}
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>

// //             <div className="field-divider" />

// //             {/* ── CHECK-IN ── */}
// //             <div className="ovika-search-field" style={{ position: 'relative' }}
// //               onClick={() => { if (isMobile) { setShowCheckInCal(!showCheckInCal); setShowCheckOutCal(false); setShowCityDropdown(false); setShowGuestPopup(false); } }}>
// //               <div className="field-icon-box"><Calendar size={15} /></div>
// //               <div className="field-text">
// //                 <span className="field-label">Check-in</span>
// //                 {isMobile
// //                   ? <span className="field-value" style={{ color: checkIn ? '#1a1a1a' : '#aaa' }}>{formatDate(checkIn) || 'Add date'}</span>
// //                   : <input type="date" className="date-input" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
// //                 }
// //               </div>
// //               {isMobile && showCheckInCal && (
// //                 <MiniCalendar
// //                   title="Check-in"
// //                   value={checkIn}
// //                   onChange={setCheckIn}
// //                   minDate={todayStr}
// //                   onClose={() => setShowCheckInCal(false)}
// //                 />
// //               )}
// //             </div>

// //             <div className="field-divider" />

// //             {/* ── CHECK-OUT ── */}
// //             <div className="ovika-search-field" style={{ position: 'relative' }}
// //               onClick={() => { if (isMobile) { setShowCheckOutCal(!showCheckOutCal); setShowCheckInCal(false); setShowCityDropdown(false); setShowGuestPopup(false); } }}>
// //               <div className="field-icon-box"><Calendar size={15} /></div>
// //               <div className="field-text">
// //                 <span className="field-label">Check-out</span>
// //                 {isMobile
// //                   ? <span className="field-value" style={{ color: checkOut ? '#1a1a1a' : '#aaa' }}>{formatDate(checkOut) || 'Add date'}</span>
// //                   : <input type="date" className="date-input" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
// //                 }
// //               </div>
// //               {isMobile && showCheckOutCal && (
// //                 <MiniCalendar
// //                   title="Check-out"
// //                   value={checkOut}
// //                   onChange={setCheckOut}
// //                   minDate={checkIn || todayStr}
// //                   onClose={() => setShowCheckOutCal(false)}
// //                 />
// //               )}
// //             </div>

// //             <div className="field-divider" />

// //             {/* ── GUESTS ── */}
// //             {isMobile ? (
// //               <div className="ovika-search-field guests-field" ref={guestPopupRef}
// //                 onClick={() => { setShowGuestPopup(!showGuestPopup); setShowCheckInCal(false); setShowCheckOutCal(false); setShowCityDropdown(false); }}>
// //                 <div className="field-icon-box"><Users size={15} /></div>
// //                 <div className="field-text">
// //                   <span className="field-label">Guests</span>
// //                   <span className="field-value">{guests} Guest{guests > 1 ? 's' : ''}</span>
// //                 </div>
// //                 {showGuestPopup && (
// //                   <div className="guest-popup" onClick={(e) => e.stopPropagation()}>
// //                     <div className="guest-popup-header">
// //                       <span className="guest-popup-title">Guests</span>
// //                       <button className="guest-popup-close" onClick={() => setShowGuestPopup(false)}><X size={14} /></button>
// //                     </div>
// //                     <div className="guest-popup-row">
// //                       <button className="guest-popup-btn" onClick={(e) => { e.stopPropagation(); setGuests(Math.max(1, guests - 1)); }}>−</button>
// //                       <span className="guest-popup-count">{guests}</span>
// //                       <button className="guest-popup-btn" onClick={(e) => { e.stopPropagation(); setGuests(guests + 1); }}>+</button>
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             ) : (
// //               <div className="ovika-search-field guests-field">
// //                 <div className="field-icon-box"><Users size={15} /></div>
// //                 <div className="field-text">
// //                   <span className="field-label">Guests</span>
// //                   <span className="field-value">{guests} Guest{guests > 1 ? 's' : ''}</span>
// //                 </div>
// //                 <div className="guest-controls">
// //                   <button onClick={(e) => { e.stopPropagation(); setGuests(Math.max(1, guests - 1)); }}>−</button>
// //                   <button onClick={(e) => { e.stopPropagation(); setGuests(guests + 1); }}>+</button>
// //                 </div>
// //               </div>
// //             )}

// //             <button className="ovika-search-btn" onClick={handleSearch}>
// //               <Search size={15} />
// //               <span>Search</span>
// //             </button>

// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // import React, { useState, useEffect, useRef } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { MapPin, Calendar, Users, Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
// // import './Home1.css';

// // /* ── Custom Mini Calendar ── */
// // function MiniCalendar({ value, onChange, minDate, onClose, title }) {
// //   const today = new Date();
// //   const initDate = value ? new Date(value) : today;
// //   const [viewYear, setViewYear] = useState(initDate.getFullYear());
// //   const [viewMonth, setViewMonth] = useState(initDate.getMonth());

// //   const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
// //   const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// //   const firstDay = new Date(viewYear, viewMonth, 1).getDay();
// //   const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

// //   const cells = [];
// //   for (let i = 0; i < firstDay; i++) cells.push(null);
// //   for (let d = 1; d <= daysInMonth; d++) cells.push(d);

// //   const selectedDay = value ? new Date(value).getDate() : null;
// //   const selectedMonth = value ? new Date(value).getMonth() : null;
// //   const selectedYear = value ? new Date(value).getFullYear() : null;

// //   const isSelected = (d) => d && d === selectedDay && viewMonth === selectedMonth && viewYear === selectedYear;

// //   const isPast = (d) => {
// //     if (!d || !minDate) return false;
// //     const cell = new Date(viewYear, viewMonth, d);
// //     const min = new Date(minDate);
// //     min.setHours(0,0,0,0);
// //     return cell < min;
// //   };

// //   const handleDay = (d) => {
// //     if (!d || isPast(d)) return;
// //     const month = String(viewMonth + 1).padStart(2, '0');
// //     const day = String(d).padStart(2, '0');
// //     onChange(`${viewYear}-${month}-${day}`);
// //     onClose();
// //   };

// //   const prevMonth = () => {
// //     if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
// //     else setViewMonth(m => m - 1);
// //   };
// //   const nextMonth = () => {
// //     if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
// //     else setViewMonth(m => m + 1);
// //   };

// //   return (
// //     <div className="ovika-cal-popup" onClick={e => e.stopPropagation()}>
// //       <div className="ovika-cal-header">
// //         <span className="ovika-cal-title">{title}</span>
// //         <button className="ovika-cal-close" onClick={onClose}><X size={13} /></button>
// //       </div>
// //       <div className="ovika-cal-nav">
// //         <button className="ovika-cal-nav-btn" onClick={prevMonth}><ChevronLeft size={15} /></button>
// //         <span className="ovika-cal-month-label">{MONTHS[viewMonth]} {viewYear}</span>
// //         <button className="ovika-cal-nav-btn" onClick={nextMonth}><ChevronRight size={15} /></button>
// //       </div>
// //       <div className="ovika-cal-grid">
// //         {DAYS.map(d => <div key={d} className="ovika-cal-day-name">{d}</div>)}
// //         {cells.map((d, i) => (
// //           <div
// //             key={i}
// //             className={[
// //               'ovika-cal-cell',
// //               d ? 'ovika-cal-cell--active' : '',
// //               isSelected(d) ? 'ovika-cal-cell--selected' : '',
// //               isPast(d) ? 'ovika-cal-cell--past' : '',
// //             ].join(' ')}
// //             onClick={() => handleDay(d)}
// //           >
// //             {d || ''}
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // /* ── Main Component ── */
// // export default function Home1() {
// //   const navigate = useNavigate();
// //   const [rentalType, setRentalType] = useState(null);
// //   const [city, setCity] = useState('Noida');
// //   const [checkIn, setCheckIn] = useState('');
// //   const [checkOut, setCheckOut] = useState('');
// //   const [guests, setGuests] = useState(1);
// //   const [showCityDropdown, setShowCityDropdown] = useState(false);
// //   const [showGuestPopup, setShowGuestPopup] = useState(false);
// //   const [showCheckInCal, setShowCheckInCal] = useState(false);
// //   const [showCheckOutCal, setShowCheckOutCal] = useState(false);
// //   const [cities, setCities] = useState(['Noida', 'Gurugram', 'Delhi', 'Mumbai', 'Bengaluru']);
// //   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

// //   const guestPopupRef = useRef(null);

// //   useEffect(() => {
// //     const handleResize = () => setIsMobile(window.innerWidth <= 768);
// //     window.addEventListener('resize', handleResize);
// //     return () => window.removeEventListener('resize', handleResize);
// //   }, []);

// //   useEffect(() => {
// //     const handleOutside = (e) => {
// //       if (guestPopupRef.current && !guestPopupRef.current.contains(e.target)) {
// //         setShowGuestPopup(false);
// //       }
// //     };
// //     document.addEventListener('mousedown', handleOutside);
// //     document.addEventListener('touchstart', handleOutside);
// //     return () => {
// //       document.removeEventListener('mousedown', handleOutside);
// //       document.removeEventListener('touchstart', handleOutside);
// //     };
// //   }, []);

// //   useEffect(() => {
// //     const fetchCities = async () => {
// //       try {
// //         const res = await fetch('https://townmanor.ai/api/ovika/properties');
// //         if (!res.ok) throw new Error('Fetch failed');
// //         const data = await res.json();
// //         const list = data?.data || [];
// //         let uniqueCities = [...new Set(list.map(p => p.city).filter(Boolean))].sort();
// //         if (uniqueCities.length > 0) {
// //           setCities(uniqueCities);
// //           if (!uniqueCities.includes('Noida')) setCity(uniqueCities[0]);
// //         }
// //       } catch (err) {
// //         console.error('Error fetching cities:', err);
// //       }
// //     };
// //     fetchCities();

// //     const type = sessionStorage.getItem('ovika_rental_type');
// //     setRentalType(type);
// //     const interval = setInterval(() => {
// //       setRentalType(sessionStorage.getItem('ovika_rental_type'));
// //     }, 300);
// //     return () => clearInterval(interval);
// //   }, []);

// //   const pricingLabel = rentalType === 'short' ? ' — Per Night' : rentalType === 'long' ? ' — Per Month' : '';

// //   const cards = [
// //     { icon: '🏠', title: 'PG', subtitle: `Affordable stays${pricingLabel}`, desc: 'Ideal for students & professionals.', category: 'PG' },
// //     { icon: '🏢', title: 'Economy Stay', subtitle: `Comfort at great value${pricingLabel}`, desc: 'Well-furnished homes with modern amenities.', category: 'Economy Stay' },
// //     { icon: '✨', title: 'Premium Stay', subtitle: `Refined living experience${pricingLabel}`, desc: 'Enhanced comfort with premium facilities.', category: 'Premium Stay' },
// //   ];

// //   const buildHref = (category) => {
// //     const params = new URLSearchParams();
// //     params.set('category', category);
// //     if (rentalType) params.set('rentalType', rentalType);
// //     return `/properties?${params.toString()}`;
// //   };

// //   const handleSearch = () => {
// //     const params = new URLSearchParams();
// //     if (city) { params.set('city', city); params.set('search', city); }
// //     if (rentalType) params.set('rentalType', rentalType);
// //     if (checkIn) params.set('checkIn', checkIn);
// //     if (checkOut) params.set('checkOut', checkOut);
// //     if (guests) params.set('guests', guests.toString());
// //     navigate(`/properties?${params.toString()}`);
// //   };

// //   const formatDate = (val) => {
// //     if (!val) return null;
// //     const d = new Date(val);
// //     return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
// //   };

// //   const todayStr = new Date().toISOString().split('T')[0];

// //   return (
// //     <div className="ovika-urban-hero-container">

// //       <div className="ovika-urban-hero-bg">
// //         <img
// //           src={isMobile ? '/home1mobile.png' : '/home2desktop.png'}
// //           alt=""
// //           className="ovika-bg-img"
// //         />
// //         {isMobile && <div className="ovika-mobile-overlay" />}
// //       </div>

// //       <div className="ovika-urban-hero-wrapper">

// //         <div className="ovika-hero-right-block">

// //           <div className="ovika-hero-left">
// //             <h1 className="ovika-urban-hero-heading">
// //               <span className="ovika-brand-name">OvikaLiving.com</span> – India's Smart Stay Marketplace
// //             </h1>
// //             <p className="ovika-hero-subtitle">
// //               Book Verified PG's, Apartments and Premium Homes across India — Nightly or Monthly
// //             </p>
// //           </div>

// //           <div className="ovika-hero-cards">
// //             {cards.map((card, i) => (
// //               <a key={i} href={buildHref(card.category)} className="ovika-hero-card"
// //                 style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}>
// //                 <div className="ovika-card-icon">{card.icon}</div>
// //                 <div className="ovika-card-body">
// //                   <h3 className="ovika-card-title">{card.title}</h3>
// //                   <p className="ovika-card-subtitle">{card.subtitle}</p>
// //                   <p className="ovika-card-desc">{card.desc}</p>
// //                 </div>
// //               </a>
// //             ))}
// //           </div>

// //         </div>

// //         <div className="ovika-search-section">
// //           <div className="ovika-search-title">
// //             <MapPin className="pin-icon" size={16} />
// //             <span style={{color:"#fff"}}>Where are you going?</span>
// //           </div>

// //           <div className="ovika-search-bar-container">

// //             <div className="ovika-search-field city-field"
// //               onClick={() => { setShowCityDropdown(!showCityDropdown); setShowCheckInCal(false); setShowCheckOutCal(false); setShowGuestPopup(false); }}>
// //               <div className="field-icon-box"><MapPin size={15} style={{ color: '#f5a623' }} /></div>
// //               <div className="field-text">
// //                 <span className="field-label">Location</span>
// //                 <span className="field-value">{city}</span>
// //               </div>
// //               {showCityDropdown && (
// //                 <div className="city-dropdown">
// //                   {cities.map(c => (
// //                     <div key={c} className="city-option"
// //                       onClick={(e) => { e.stopPropagation(); setCity(c); setShowCityDropdown(false); }}>
// //                       {c}
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>

// //             <div className="field-divider" />

// //             <div className="ovika-search-field" style={{ position: 'relative' }}
// //               onClick={() => { if (isMobile) { setShowCheckInCal(!showCheckInCal); setShowCheckOutCal(false); setShowCityDropdown(false); setShowGuestPopup(false); } }}>
// //               <div className="field-icon-box"><Calendar size={15} /></div>
// //               <div className="field-text">
// //                 <span className="field-label">Check-in</span>
// //                 {isMobile
// //                   ? <span className="field-value" style={{ color: checkIn ? '#1a1a1a' : '#aaa' }}>{formatDate(checkIn) || 'Add date'}</span>
// //                   : <input type="date" className="date-input" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
// //                 }
// //               </div>
// //               {isMobile && showCheckInCal && (
// //                 <MiniCalendar title="Check-in" value={checkIn} onChange={setCheckIn} minDate={todayStr} onClose={() => setShowCheckInCal(false)} />
// //               )}
// //             </div>

// //             <div className="field-divider" />

// //             <div className="ovika-search-field" style={{ position: 'relative' }}
// //               onClick={() => { if (isMobile) { setShowCheckOutCal(!showCheckOutCal); setShowCheckInCal(false); setShowCityDropdown(false); setShowGuestPopup(false); } }}>
// //               <div className="field-icon-box"><Calendar size={15} /></div>
// //               <div className="field-text">
// //                 <span className="field-label">Check-out</span>
// //                 {isMobile
// //                   ? <span className="field-value" style={{ color: checkOut ? '#1a1a1a' : '#aaa' }}>{formatDate(checkOut) || 'Add date'}</span>
// //                   : <input type="date" className="date-input" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
// //                 }
// //               </div>
// //               {isMobile && showCheckOutCal && (
// //                 <MiniCalendar title="Check-out" value={checkOut} onChange={setCheckOut} minDate={checkIn || todayStr} onClose={() => setShowCheckOutCal(false)} />
// //               )}
// //             </div>

// //             <div className="field-divider" />

// //             {isMobile ? (
// //               <div className="ovika-search-field guests-field" ref={guestPopupRef}
// //                 onClick={() => { setShowGuestPopup(!showGuestPopup); setShowCheckInCal(false); setShowCheckOutCal(false); setShowCityDropdown(false); }}>
// //                 <div className="field-icon-box"><Users size={15} /></div>
// //                 <div className="field-text">
// //                   <span className="field-label">Guests</span>
// //                   <span className="field-value">{guests} Guest{guests > 1 ? 's' : ''}</span>
// //                 </div>
// //                 {showGuestPopup && (
// //                   <div className="guest-popup" onClick={(e) => e.stopPropagation()}>
// //                     <div className="guest-popup-header">
// //                       <span className="guest-popup-title">Guests</span>
// //                       <button className="guest-popup-close" onClick={() => setShowGuestPopup(false)}><X size={14} /></button>
// //                     </div>
// //                     <div className="guest-popup-row">
// //                       <button className="guest-popup-btn" onClick={(e) => { e.stopPropagation(); setGuests(Math.max(1, guests - 1)); }}>−</button>
// //                       <span className="guest-popup-count">{guests}</span>
// //                       <button className="guest-popup-btn" onClick={(e) => { e.stopPropagation(); setGuests(guests + 1); }}>+</button>
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             ) : (
// //               <div className="ovika-search-field guests-field">
// //                 <div className="field-icon-box"><Users size={15} /></div>
// //                 <div className="field-text">
// //                   <span className="field-label">Guests</span>
// //                   <span className="field-value">{guests} Guest{guests > 1 ? 's' : ''}</span>
// //                 </div>
// //                 <div className="guest-controls">
// //                   <button onClick={(e) => { e.stopPropagation(); setGuests(Math.max(1, guests - 1)); }}>−</button>
// //                   <button onClick={(e) => { e.stopPropagation(); setGuests(guests + 1); }}>+</button>
// //                 </div>
// //               </div>
// //             )}

// //             <button className="ovika-search-btn" onClick={handleSearch}>
// //               <Search size={15} />
// //               <span>Search</span>
// //             </button>

// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MapPin, Calendar, Users, Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
// import './Home1.css';

// /* ─── Mini Calendar ─── */
// function MiniCalendar({ value, onChange, minDate, onClose, title }) {
//   const today = new Date();
//   const initDate = value ? new Date(value) : today;
//   const [viewYear, setViewYear] = useState(initDate.getFullYear());
//   const [viewMonth, setViewMonth] = useState(initDate.getMonth());
//   const DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];
//   const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
//   const firstDay = new Date(viewYear, viewMonth, 1).getDay();
//   const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
//   const cells = [];
//   for (let i = 0; i < firstDay; i++) cells.push(null);
//   for (let d = 1; d <= daysInMonth; d++) cells.push(d);
//   const sel = value ? new Date(value) : null;
//   const isSelected = d => sel && d === sel.getDate() && viewMonth === sel.getMonth() && viewYear === sel.getFullYear();
//   const isPast = d => {
//     if (!d || !minDate) return false;
//     const cell = new Date(viewYear, viewMonth, d);
//     const min = new Date(minDate); min.setHours(0,0,0,0);
//     return cell < min;
//   };
//   const handleDay = d => {
//     if (!d || isPast(d)) return;
//     onChange(`${viewYear}-${String(viewMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`);
//     onClose();
//   };
//   const prevMonth = () => viewMonth === 0 ? (setViewMonth(11), setViewYear(y=>y-1)) : setViewMonth(m=>m-1);
//   const nextMonth = () => viewMonth === 11 ? (setViewMonth(0), setViewYear(y=>y+1)) : setViewMonth(m=>m+1);

//   return (
//     <div className="ovika-cal-popup" onClick={e => e.stopPropagation()}>
//       <div className="ovika-cal-header">
//         <span className="ovika-cal-title">{title}</span>
//         <button className="ovika-cal-close" onClick={onClose}><X size={13}/></button>
//       </div>
//       <div className="ovika-cal-nav">
//         <button className="ovika-cal-nav-btn" onClick={prevMonth}><ChevronLeft size={15}/></button>
//         <span className="ovika-cal-month-label">{MONTHS[viewMonth]} {viewYear}</span>
//         <button className="ovika-cal-nav-btn" onClick={nextMonth}><ChevronRight size={15}/></button>
//       </div>
//       <div className="ovika-cal-grid">
//         {DAYS.map(d => <div key={d} className="ovika-cal-day-name">{d}</div>)}
//         {cells.map((d,i) => (
//           <div key={i}
//             className={['ovika-cal-cell', d?'ovika-cal-cell--active':'', isSelected(d)?'ovika-cal-cell--selected':'', isPast(d)?'ovika-cal-cell--past':''].join(' ')}
//             onClick={() => handleDay(d)}>{d||''}</div>
//         ))}
//       </div>
//     </div>
//   );
// }

// /* ─── Main Component ─── */
// export default function Home1() {
//   const navigate = useNavigate();
//   const [rentalType, setRentalType] = useState(null);
//   const [city, setCity] = useState('Noida');
//   const [checkIn, setCheckIn] = useState('');
//   const [checkOut, setCheckOut] = useState('');
//   const [guests, setGuests] = useState(1);
//   const [showCity, setShowCity] = useState(false);
//   const [showGuests, setShowGuests] = useState(false);
//   const [showCheckInCal, setShowCheckInCal] = useState(false);
//   const [showCheckOutCal, setShowCheckOutCal] = useState(false);
//   const [cities, setCities] = useState(['Noida','Gurugram','Delhi','Mumbai','Bengaluru']);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//   const guestRef = useRef(null);

//   useEffect(() => {
//     const onResize = () => setIsMobile(window.innerWidth <= 768);
//     window.addEventListener('resize', onResize);
//     return () => window.removeEventListener('resize', onResize);
//   }, []);

//   useEffect(() => {
//     const onOutside = e => {
//       if (guestRef.current && !guestRef.current.contains(e.target)) setShowGuests(false);
//     };
//     document.addEventListener('mousedown', onOutside);
//     document.addEventListener('touchstart', onOutside);
//     return () => {
//       document.removeEventListener('mousedown', onOutside);
//       document.removeEventListener('touchstart', onOutside);
//     };
//   }, []);

//   useEffect(() => {
//     fetch('https://townmanor.ai/api/ovika/properties')
//       .then(r => r.json())
//       .then(data => {
//         const list = data?.data || [];
//         const uniq = [...new Set(list.map(p => p.city).filter(Boolean))].sort();
//         if (uniq.length) { setCities(uniq); if (!uniq.includes('Noida')) setCity(uniq[0]); }
//       }).catch(() => {});
//     setRentalType(sessionStorage.getItem('ovika_rental_type'));
//     const iv = setInterval(() => setRentalType(sessionStorage.getItem('ovika_rental_type')), 300);
//     return () => clearInterval(iv);
//   }, []);

//   const pricingLabel = rentalType === 'short' ? ' — Per Night' : rentalType === 'long' ? ' — Per Month' : '';
//   const cards = [
//     { icon: '🏠', title: 'PG', subtitle: `Affordable stays${pricingLabel}`, desc: 'Ideal for students & professionals.', category: 'PG' },
//     { icon: '🏢', title: 'Economy Stay', subtitle: `Comfort at great value${pricingLabel}`, desc: 'Well-furnished homes with modern amenities.', category: 'Economy Stay' },
//     { icon: '✨', title: 'Premium Stay', subtitle: `Refined living experience${pricingLabel}`, desc: 'Enhanced comfort with premium facilities.', category: 'Premium Stay' },
//   ];

//   const buildHref = cat => {
//     const p = new URLSearchParams();
//     p.set('category', cat);
//     if (rentalType) p.set('rentalType', rentalType);
//     return `/properties?${p}`;
//   };

//   const handleSearch = () => {
//     const p = new URLSearchParams();
//     if (city) { p.set('city', city); p.set('search', city); }
//     if (rentalType) p.set('rentalType', rentalType);
//     if (checkIn) p.set('checkIn', checkIn);
//     if (checkOut) p.set('checkOut', checkOut);
//     if (guests) p.set('guests', String(guests));
//     navigate(`/properties?${p}`);
//   };

//   const fmtDate = v => v ? new Date(v).toLocaleDateString('en-IN', { day:'numeric', month:'short' }) : null;
//   const todayStr = new Date().toISOString().split('T')[0];
//   const closeAll = () => { setShowCity(false); setShowCheckInCal(false); setShowCheckOutCal(false); setShowGuests(false); };

//   /* ═══════════════════════════════════════════
//      RENDER
//   ═══════════════════════════════════════════ */
//   return (
//     <div style={{
//       position: 'relative',
//       width: '100%',
//       height: isMobile ? '100vh' : '95vh',
//       minHeight: isMobile ? '100vh' : '540px',
//       padding: isMobile ? 0 : '1rem',
//       marginTop: isMobile ? '-2px' : '-80px',
//       boxSizing: 'border-box',
//       overflow: 'visible',
//     }}>

//       {/* ── Background ── */}
//       <div style={{
//         position: 'absolute',
//         top: isMobile ? 0 : '1rem',
//         left: isMobile ? 0 : '1rem',
//         right: isMobile ? 0 : '1rem',
//         bottom: isMobile ? 0 : '1rem',
//         width: isMobile ? '100%' : 'calc(100% - 2rem)',
//         height: isMobile ? '75%' : 'calc(100% - 2rem)',
//         borderRadius: isMobile ? 0 : '1.5rem',
//         overflow: 'hidden',
//       }}>
//         <img
//           src={isMobile ? '/home1mobile.png' : '/home2desktop.png'}
//           alt=""
//           style={{
//             width: '100%', height: '100%',
//             objectFit: 'cover',
//             objectPosition: isMobile ? 'center 15%' : 'center 30%',
//             display: 'block',
//             borderRadius: isMobile ? 0 : '1.5rem',
//           }}
//         />
//         {isMobile && (
//           <div style={{
//             position: 'absolute', inset: 0,
//             background: 'linear-gradient(to top, rgba(8,4,0,0.82) 0%, rgba(8,4,0,0.18) 52%, transparent 100%)',
//           }}/>
//         )}
//       </div>

//       {/* ── Content Wrapper ── */}
//       <div style={{
//         position: 'relative',
//         zIndex: 10,
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: isMobile ? 'flex-end' : 'center',
//         alignItems: isMobile ? 'flex-start' : 'flex-end',
//         height: '100%',
//         padding: isMobile ? '0 1rem 2rem' : '80px 3rem',
//         maxWidth: isMobile ? '100%' : '1400px',
//         width: '100%',
//         margin: '0 auto',
//         boxSizing: 'border-box',
//       }}>

//         {isMobile ? (
//           /* ══════════════════════════════════════
//              MOBILE — 100% inline styles
//           ══════════════════════════════════════ */
//           <>
//             {/* HEADING BLOCK — absolute, top-left, width 48% */}
//             <div style={{
//               position: 'absolute',
//               top: '88px',
//               left: '1rem',
//               width: 'calc(70% - 1rem)',
//               zIndex: 25,
//               display: 'flex',
//               flexDirection: 'column',
//               gap: '0.25rem',
//             }}>
//               <h1 style={{
//                 color: '#fff',
//                 fontSize: '16px',
//                 fontWeight: 500,
//                 lineHeight: 1.3,
//                 margin: 0,
//                 textAlign: 'left',
//                 whiteSpace: 'normal',
//                 textShadow: '0 2px 12px rgba(0,0,0,0.95)',
//               }}>
//                 <span style={{ color: '#f5a623' }}>OvikaLiving.com</span>
//                 {' '}– India's Smart Stay Marketplace
//               </h1>
//               <p style={{
//                 color: 'rgba(255,255,255,0.82)',
//                 fontSize: '0.56rem',
//                 margin: 0,
//                 textAlign: 'left',
//                 whiteSpace: 'normal',
//                 lineHeight: 1.4,
//                 textShadow: '0 1px 6px rgba(0,0,0,0.75)',
//               }}>
//                 Book Verified PG's, Apartments and Premium Homes across India — Nightly or Monthly
//               </p>
//             </div>

//             {/* CARDS — absolute, right side, width 44%, max 148px */}
//             <div style={{
//               position: 'absolute',
//               right: 0,
//               top: '32%',
//               transform: 'translateY(-50%)',
//               zIndex: 20,
//               display: 'flex',
//               flexDirection: 'column',
//               gap: '0.3rem',
//               width: '44%',
//               maxWidth: '148px',
//             }}>
//               {cards.map((card, i) => (
//                 <a key={i} href={buildHref(card.category)} style={{
//                   display: 'flex',
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   gap: '0.28rem',
//                   padding: '0.28rem 0.35rem',
//                   borderRadius: '0.4rem 0 0 0.4rem',
//                   borderLeft: '2px solid #d97706',
//                   borderTop: '1px solid rgba(217,119,6,0.3)',
//                   borderBottom: '1px solid rgba(217,119,6,0.15)',
//                   borderRight: 'none',
//                   background: 'rgba(10,5,0,0.82)',
//                   backdropFilter: 'blur(14px)',
//                   WebkitBackdropFilter: 'blur(14px)',
//                   textDecoration: 'none',
//                   color: 'inherit',
//                 }}>
//                   <span style={{ fontSize: '0.7rem', flexShrink: 0 }}>{card.icon}</span>
//                   <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
//                     <span style={{ color: '#fff', fontSize: '0.56rem', fontWeight: 400, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{card.title}</span>
//                     <span style={{ color: '#f5c97a', fontSize: '0.48rem', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{card.subtitle}</span>
//                     <span style={{ color: 'rgba(220,210,195,0.9)', fontSize: '0.46rem', lineHeight: 1.3, margin: 0 }}>{card.desc}</span>
//                   </div>
//                 </a>
//               ))}
//             </div>

//             {/* SEARCH BAR — bottom of wrapper */}
//             <div style={{
//               width: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               gap: '0.2rem',
//               marginBottom: '174px',
//               marginTop: '0.5rem',
//             }}>
//               {/* Label */}
//               <div style={{
//                 display: 'flex', alignItems: 'center', gap: '0.35rem',
//                 color: 'white', fontSize: '0.76rem', paddingLeft: '4px',
//                 textShadow: '0 1px 4px rgba(0,0,0,0.6)', marginBottom: '0.15rem',
//               }}>
//                 <MapPin size={14} style={{ color: '#f5a623' }}/>
//                 <span>Where are you going?</span>
//               </div>

//               {/* Search pill */}
//               <div style={{
//                 display: 'flex', flexDirection: 'row', alignItems: 'center',
//                 height: '48px', borderRadius: '14px', padding: '4px',
//                 background: 'rgba(255,255,255,0.97)',
//                 backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
//                 boxShadow: '0 8px 32px rgba(0,0,0,0.22)',
//                 width: '100%', boxSizing: 'border-box',
//               }}>

//                 {/* City */}
//                 <div
//                   style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '4px', padding: '0 6px', height: '100%', borderRight: '1px solid rgba(0,0,0,0.08)', position: 'relative', cursor: 'pointer', minWidth: 0 }}
//                   onClick={() => { const v = !showCity; closeAll(); setShowCity(v); }}
//                 >
//                   <MapPin size={13} style={{ color: '#f5a623', flexShrink: 0 }}/>
//                   <span style={{ fontSize: '0.76rem', color: '#333', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{city}</span>
//                   {showCity && (
//                     <div style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, width: '170px', background: 'white', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.14)', zIndex: 200, maxHeight: '200px', overflowY: 'auto' }}>
//                       {cities.map(c => (
//                         <div key={c}
//                           style={{ padding: '9px 14px', fontSize: '0.82rem', color: '#444', cursor: 'pointer' }}
//                           onClick={e => { e.stopPropagation(); setCity(c); setShowCity(false); }}
//                         >{c}</div>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 {/* Check-in */}
//                 <div
//                   style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '4px', padding: '0 6px', height: '100%', borderRight: '1px solid rgba(0,0,0,0.08)', position: 'relative', cursor: 'pointer', minWidth: 0 }}
//                   onClick={() => { const v = !showCheckInCal; closeAll(); setShowCheckInCal(v); }}
//                 >
//                   <Calendar size={13} style={{ color: '#888', flexShrink: 0 }}/>
//                   <span style={{ fontSize: '0.7rem', color: checkIn ? '#333' : '#aaa', fontWeight: 500 }}>{fmtDate(checkIn) || 'Check-in'}</span>
//                   {showCheckInCal && <MiniCalendar title="Check-in" value={checkIn} onChange={setCheckIn} minDate={todayStr} onClose={() => setShowCheckInCal(false)}/>}
//                 </div>

//                 {/* Check-out */}
//                 <div
//                   style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '4px', padding: '0 6px', height: '100%', borderRight: '1px solid rgba(0,0,0,0.08)', position: 'relative', cursor: 'pointer', minWidth: 0 }}
//                   onClick={() => { const v = !showCheckOutCal; closeAll(); setShowCheckOutCal(v); }}
//                 >
//                   <Calendar size={13} style={{ color: '#888', flexShrink: 0 }}/>
//                   <span style={{ fontSize: '0.7rem', color: checkOut ? '#333' : '#aaa', fontWeight: 500 }}>{fmtDate(checkOut) || 'Check-out'}</span>
//                   {showCheckOutCal && <MiniCalendar title="Check-out" value={checkOut} onChange={setCheckOut} minDate={checkIn || todayStr} onClose={() => setShowCheckOutCal(false)}/>}
//                 </div>

//                 {/* Guests */}
//                 <div
//                   ref={guestRef}
//                   style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '4px', padding: '0 6px', height: '100%', position: 'relative', cursor: 'pointer', minWidth: 0 }}
//                   onClick={() => { const v = !showGuests; closeAll(); setShowGuests(v); }}
//                 >
//                   <Users size={13} style={{ color: '#888', flexShrink: 0 }}/>
//                   <span style={{ fontSize: '0.7rem', color: '#333', fontWeight: 500 }}>{guests} Gu.</span>
//                   {showGuests && (
//                     <div
//                       style={{ position: 'absolute', bottom: 'calc(100% + 8px)', right: 0, background: 'white', borderRadius: '14px', boxShadow: '0 8px 28px rgba(0,0,0,0.18)', padding: '12px 16px', zIndex: 300, minWidth: '150px' }}
//                       onClick={e => e.stopPropagation()}
//                     >
//                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
//                         <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#333' }}>Guests</span>
//                         <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }} onClick={() => setShowGuests(false)}><X size={14}/></button>
//                       </div>
//                       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
//                         <button style={{ width: 32, height: 32, borderRadius: '50%', border: '1.5px solid #e0c07a', background: 'white', color: '#c8851a', cursor: 'pointer', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
//                           onClick={e => { e.stopPropagation(); setGuests(Math.max(1,guests-1)); }}>−</button>
//                         <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1a1a1a', minWidth: 24, textAlign: 'center' }}>{guests}</span>
//                         <button style={{ width: 32, height: 32, borderRadius: '50%', border: '1.5px solid #e0c07a', background: 'white', color: '#c8851a', cursor: 'pointer', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
//                           onClick={e => { e.stopPropagation(); setGuests(guests+1); }}>+</button>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Search button */}
//                 <button
//                   style={{ flexShrink: 0, height: '40px', borderRadius: '10px', padding: '0 12px', background: 'linear-gradient(135deg, #f5a623 0%, #e08c10 100%)', color: '#fff', border: 'none', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', boxShadow: '0 4px 16px rgba(245,166,35,0.45)' }}
//                   onClick={handleSearch}
//                 >
//                   <Search size={14}/><span>Search</span>
//                 </button>

//               </div>
//             </div>
//           </>
//         ) : (
//           /* ══════════════════════════════════════
//              DESKTOP
//           ══════════════════════════════════════ */
//           <>
//             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem', marginBottom: '2rem' }}>
//               <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
//                 <h1 style={{ color: 'white', fontSize: 'clamp(1.2rem,1.6vw,2rem)', fontWeight: 400, lineHeight: 1.25, margin: 0, textAlign: 'right', whiteSpace: 'nowrap', marginRight: '40px' }}>
//                   <span style={{ color: '#f5a623' }}>OvikaLiving.com</span> – India's Smart Stay Marketplace
//                 </h1>
//                 <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.78rem', margin: '0.4rem 40px 0 0', textAlign: 'right', lineHeight: 1.4, whiteSpace: 'nowrap' }}>
//                   Book Verified PG's, Apartments and Premium Homes across India — Nightly or Monthly
//                 </p>
//               </div>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', width: '260px', alignSelf: 'flex-end', marginRight: '40px' }}>
//                 {cards.map((card, i) => (
//                   <a key={i} href={buildHref(card.category)} style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', background: '#1a100699', borderLeft: '3px solid #d97706', borderTop: '1px solid rgba(217,119,6,0.25)', borderRight: '1px solid rgba(217,119,6,0.15)', borderBottom: '1px solid rgba(217,119,6,0.15)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderRadius: '0.55rem', padding: '0.5rem 0.75rem', textDecoration: 'none', color: 'inherit' }}>
//                     <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{card.icon}</span>
//                     <div style={{ display: 'flex', flexDirection: 'column' }}>
//                       <span style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 300, margin: 0 }}>{card.title}</span>
//                       <span style={{ color: '#f5c97a', fontSize: '0.68rem', fontWeight: 300, margin: 0 }}>{card.subtitle}</span>
//                       <span style={{ color: 'rgba(220,210,195,0.9)', fontSize: '0.64rem', lineHeight: 1.35, margin: 0 }}>{card.desc}</span>
//                     </div>
//                   </a>
//                 ))}
//               </div>
//             </div>

//             {/* Desktop search — CSS classes */}
//             <div className="ovika-search-section">
//               <div className="ovika-search-title">
//                 <MapPin className="pin-icon" size={16}/>
//                 <span style={{ color: '#fff' }}>Where are you going?</span>
//               </div>
//               <div className="ovika-search-bar-container">
//                 <div className="ovika-search-field city-field"
//                   onClick={() => { setShowCity(!showCity); setShowCheckInCal(false); setShowCheckOutCal(false); setShowGuests(false); }}>
//                   <div className="field-icon-box"><MapPin size={15} style={{ color: '#f5a623' }}/></div>
//                   <div className="field-text">
//                     <span className="field-label">Location</span>
//                     <span className="field-value">{city}</span>
//                   </div>
//                   {showCity && (
//                     <div className="city-dropdown">
//                       {cities.map(c => <div key={c} className="city-option" onClick={e => { e.stopPropagation(); setCity(c); setShowCity(false); }}>{c}</div>)}
//                     </div>
//                   )}
//                 </div>
//                 <div className="field-divider"/>
//                 <div className="ovika-search-field" style={{ position: 'relative' }}>
//                   <div className="field-icon-box"><Calendar size={15}/></div>
//                   <div className="field-text">
//                     <span className="field-label">Check-in</span>
//                     <input type="date" className="date-input" value={checkIn} onChange={e => setCheckIn(e.target.value)}/>
//                   </div>
//                 </div>
//                 <div className="field-divider"/>
//                 <div className="ovika-search-field" style={{ position: 'relative' }}>
//                   <div className="field-icon-box"><Calendar size={15}/></div>
//                   <div className="field-text">
//                     <span className="field-label">Check-out</span>
//                     <input type="date" className="date-input" value={checkOut} onChange={e => setCheckOut(e.target.value)}/>
//                   </div>
//                 </div>
//                 <div className="field-divider"/>
//                 <div className="ovika-search-field guests-field">
//                   <div className="field-icon-box"><Users size={15}/></div>
//                   <div className="field-text">
//                     <span className="field-label">Guests</span>
//                     <span className="field-value">{guests} Guest{guests > 1 ? 's' : ''}</span>
//                   </div>
//                   <div className="guest-controls">
//                     <button onClick={e => { e.stopPropagation(); setGuests(Math.max(1,guests-1)); }}>−</button>
//                     <button onClick={e => { e.stopPropagation(); setGuests(guests+1); }}>+</button>
//                   </div>
//                 </div>
//                 <button className="ovika-search-btn" onClick={handleSearch}>
//                   <Search size={15}/><span>Search</span>
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import './Home1.css';

/* ─── Curated 30 Cities (UP + Haryana heavy, major metros) ─── */
const CITIES = [
  // NCR / UP
  'Delhi',
  'Noida',
  'Greater Noida',
  'Ghaziabad',
  'Gurugram',
  'Faridabad',
  'Agra',
  'Lucknow',
  'Kanpur',
  'Prayagraj',
  'Varanasi',
  'Mathura',
  'Vrindavan',
  'Meerut',
  'Bareilly',
  'Aligarh',
  'Moradabad',
  'Hapur',
  'Bulandshahr',
  // Haryana
  'Haridwar',
  'Rishikesh',
  'Dehradun',
  'Sonipat',
  'Panipat',
  'Ambala',
  'Karnal',
  'Rohtak',
  // Major metros
  'Mumbai',
  'Bengaluru',
  'Hyderabad',
];

/* ─── Mini Calendar ─── */
function MiniCalendar({ value, onChange, minDate, onClose, title }) {
  const today = new Date();
  const initDate = value ? new Date(value) : today;
  const [viewYear, setViewYear] = useState(initDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initDate.getMonth());
  const DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  const sel = value ? new Date(value) : null;
  const isSelected = d => sel && d === sel.getDate() && viewMonth === sel.getMonth() && viewYear === sel.getFullYear();
  const isPast = d => {
    if (!d || !minDate) return false;
    const cell = new Date(viewYear, viewMonth, d);
    const min = new Date(minDate); min.setHours(0,0,0,0);
    return cell < min;
  };
  const handleDay = d => {
    if (!d || isPast(d)) return;
    onChange(`${viewYear}-${String(viewMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`);
    onClose();
  };
  const prevMonth = () => viewMonth === 0 ? (setViewMonth(11), setViewYear(y=>y-1)) : setViewMonth(m=>m-1);
  const nextMonth = () => viewMonth === 11 ? (setViewMonth(0), setViewYear(y=>y+1)) : setViewMonth(m=>m+1);

  return (
    <div className="ovika-cal-popup" onClick={e => e.stopPropagation()}>
      <div className="ovika-cal-header">
        <span className="ovika-cal-title">{title}</span>
        <button className="ovika-cal-close" onClick={onClose}><X size={13}/></button>
      </div>
      <div className="ovika-cal-nav">
        <button className="ovika-cal-nav-btn" onClick={prevMonth}><ChevronLeft size={15}/></button>
        <span className="ovika-cal-month-label">{MONTHS[viewMonth]} {viewYear}</span>
        <button className="ovika-cal-nav-btn" onClick={nextMonth}><ChevronRight size={15}/></button>
      </div>
      <div className="ovika-cal-grid">
        {DAYS.map(d => <div key={d} className="ovika-cal-day-name">{d}</div>)}
        {cells.map((d,i) => (
          <div key={i}
            className={['ovika-cal-cell', d?'ovika-cal-cell--active':'', isSelected(d)?'ovika-cal-cell--selected':'', isPast(d)?'ovika-cal-cell--past':''].join(' ')}
            onClick={() => handleDay(d)}>{d||''}</div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function Home1() {
  const navigate = useNavigate();
  const [rentalType, setRentalType] = useState(null);
  const [city, setCity] = useState('Noida');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [showCity, setShowCity] = useState(false);
  const [showGuests, setShowGuests] = useState(false);
  const [showCheckInCal, setShowCheckInCal] = useState(false);
  const [showCheckOutCal, setShowCheckOutCal] = useState(false);
  const [citySearch, setCitySearch] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const guestRef = useRef(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const onOutside = e => {
      if (guestRef.current && !guestRef.current.contains(e.target)) setShowGuests(false);
    };
    document.addEventListener('mousedown', onOutside);
    document.addEventListener('touchstart', onOutside);
    return () => {
      document.removeEventListener('mousedown', onOutside);
      document.removeEventListener('touchstart', onOutside);
    };
  }, []);

  useEffect(() => {
    setRentalType(sessionStorage.getItem('ovika_rental_type'));
    const iv = setInterval(() => setRentalType(sessionStorage.getItem('ovika_rental_type')), 300);
    return () => clearInterval(iv);
  }, []);

  // Filtered cities based on search input
  const filteredCities = citySearch.trim()
    ? CITIES.filter(c => c.toLowerCase().includes(citySearch.toLowerCase()))
    : CITIES;

  const pricingLabel = rentalType === 'short' ? ' — Per Night' : rentalType === 'long' ? ' — Per Month' : '';
  const cards = [
    { icon: '🏠', title: 'PG', subtitle: `Affordable stays${pricingLabel}`, desc: 'Ideal for students & professionals.', category: 'PG' },
    { icon: '🏢', title: 'Economy Stay', subtitle: `Comfort at great value${pricingLabel}`, desc: 'Well-furnished homes with modern amenities.', category: 'Economy Stay' },
    { icon: '✨', title: 'Premium Stay', subtitle: `Refined living experience${pricingLabel}`, desc: 'Enhanced comfort with premium facilities.', category: 'Premium Stay' },
  ];

  const buildHref = cat => {
    const p = new URLSearchParams();
    p.set('category', cat);
    if (rentalType) p.set('rentalType', rentalType);
    return `/properties?${p}`;
  };

  const handleSearch = () => {
    const p = new URLSearchParams();
    if (city) { p.set('city', city); p.set('search', city); }
    if (rentalType) p.set('rentalType', rentalType);
    if (checkIn) p.set('checkIn', checkIn);
    if (checkOut) p.set('checkOut', checkOut);
    if (guests) p.set('guests', String(guests));
    navigate(`/properties?${p}`);
  };

  const fmtDate = v => v ? new Date(v).toLocaleDateString('en-IN', { day:'numeric', month:'short' }) : null;
  const todayStr = new Date().toISOString().split('T')[0];
  const closeAll = () => { setShowCity(false); setShowCheckInCal(false); setShowCheckOutCal(false); setShowGuests(false); setCitySearch(''); };

  /* ═══════════════════════════════════════════
     RENDER
  ═══════════════════════════════════════════ */
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: isMobile ? '100vh' : '95vh',
      minHeight: isMobile ? '100vh' : '540px',
      padding: isMobile ? 0 : '1rem',
      marginTop: isMobile ? '-2px' : '-80px',
      boxSizing: 'border-box',
      overflow: 'visible',
    }}>

      {/* ── Background ── */}
      <div style={{
        position: 'absolute',
        top: isMobile ? 0 : '1rem',
        left: isMobile ? 0 : '1rem',
        right: isMobile ? 0 : '1rem',
        bottom: isMobile ? 0 : '1rem',
        width: isMobile ? '100%' : 'calc(100% - 2rem)',
        height: isMobile ? '75%' : 'calc(100% - 2rem)',
        borderRadius: isMobile ? 0 : '1.5rem',
        overflow: 'hidden',
      }}>
        <img
          src={isMobile ? '/home1mobile.png' : '/home2desktop.png'}
          alt=""
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: isMobile ? 'center 15%' : 'center 30%',
            display: 'block',
            borderRadius: isMobile ? 0 : '1.5rem',
          }}
        />
        {isMobile && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(8,4,0,0.82) 0%, rgba(8,4,0,0.18) 52%, transparent 100%)',
          }}/>
        )}
      </div>

      {/* ── Content Wrapper ── */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: isMobile ? 'flex-end' : 'center',
        alignItems: isMobile ? 'flex-start' : 'flex-end',
        height: '100%',
        padding: isMobile ? '0 1rem 2rem' : '80px 3rem',
        maxWidth: isMobile ? '100%' : '1400px',
        width: '100%',
        margin: '0 auto',
        boxSizing: 'border-box',
      }}>

        {isMobile ? (
          /* ══════════════════════════════════════
             MOBILE
          ══════════════════════════════════════ */
          <>
            {/* HEADING BLOCK */}
            <div style={{
              position: 'absolute',
              top: '88px',
              left: '1rem',
              width: 'calc(70% - 1rem)',
              zIndex: 25,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
            }}>
              <h1 style={{
                color: '#fff',
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: 1.3,
                margin: 0,
                textAlign: 'left',
                whiteSpace: 'normal',
                textShadow: '0 2px 12px rgba(0,0,0,0.95)',
              }}>
                <span style={{ color: '#f5a623' }}>OvikaLiving.com</span>
                {' '}– India's Smart Stay Marketplace
              </h1>
              <p style={{
                color: 'rgba(255,255,255,0.82)',
                fontSize: '0.56rem',
                margin: 0,
                textAlign: 'left',
                whiteSpace: 'normal',
                lineHeight: 1.4,
                textShadow: '0 1px 6px rgba(0,0,0,0.75)',
              }}>
                Book Verified PG's, Apartments and Premium Homes across India — Nightly or Monthly
              </p>
            </div>

            {/* CARDS */}
            <div style={{
              position: 'absolute',
              right: 0,
              top: '32%',
              transform: 'translateY(-50%)',
              zIndex: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.3rem',
              width: '44%',
              maxWidth: '148px',
            }}>
              {cards.map((card, i) => (
                <a key={i} href={buildHref(card.category)} style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '0.28rem',
                  padding: '0.28rem 0.35rem',
                  borderRadius: '0.4rem 0 0 0.4rem',
                  borderLeft: '2px solid #d97706',
                  borderTop: '1px solid rgba(217,119,6,0.3)',
                  borderBottom: '1px solid rgba(217,119,6,0.15)',
                  borderRight: 'none',
                  background: 'rgba(10,5,0,0.82)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  textDecoration: 'none',
                  color: 'inherit',
                }}>
                  <span style={{ fontSize: '0.7rem', flexShrink: 0 }}>{card.icon}</span>
                  <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                    <span style={{ color: '#fff', fontSize: '0.56rem', fontWeight: 400, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{card.title}</span>
                    <span style={{ color: '#f5c97a', fontSize: '0.48rem', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{card.subtitle}</span>
                    <span style={{ color: 'rgba(220,210,195,0.9)', fontSize: '0.46rem', lineHeight: 1.3, margin: 0 }}>{card.desc}</span>
                  </div>
                </a>
              ))}
            </div>

            {/* SEARCH BAR */}
            <div style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.2rem',
              marginBottom: '165px',
              marginTop: '0.5rem',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.35rem',
                color: 'white', fontSize: '0.76rem', paddingLeft: '4px',
                textShadow: '0 1px 4px rgba(0,0,0,0.6)', marginBottom: '0.15rem',
              }}>
                <MapPin size={14} style={{ color: '#f5a623' }}/>
                <span>Where are you going?</span>
              </div>

              {/* Search pill */}
              <div style={{
                display: 'flex', flexDirection: 'row', alignItems: 'center',
                height: '48px', borderRadius: '14px', padding: '4px',
                background: 'rgba(255,255,255,0.97)',
                backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.22)',
                width: '100%', boxSizing: 'border-box',
              }}>

                {/* City */}
                <div
                  style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '4px', padding: '0 6px', height: '100%', borderRight: '1px solid rgba(0,0,0,0.08)', position: 'relative', cursor: 'pointer', minWidth: 0 }}
                  onClick={() => { const v = !showCity; closeAll(); setShowCity(v); }}
                >
                  <MapPin size={13} style={{ color: '#f5a623', flexShrink: 0 }}/>
                  <span style={{ fontSize: '0.76rem', color: '#333', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{city}</span>

                  {showCity && (
                    <div
                      style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, width: '200px', background: 'white', borderRadius: '14px', boxShadow: '0 10px 30px rgba(0,0,0,0.16)', zIndex: 200, overflow: 'hidden' }}
                      onClick={e => e.stopPropagation()}
                    >
                      {/* Search input inside dropdown */}
                      <div style={{ padding: '8px 10px', borderBottom: '1px solid #f0e8d8' }}>
                        <input
                          autoFocus
                          placeholder="Search city..."
                          value={citySearch}
                          onChange={e => setCitySearch(e.target.value)}
                          style={{ width: '100%', border: '1px solid #e0d0b8', borderRadius: 8, padding: '5px 8px', fontSize: '0.78rem', outline: 'none', color: '#333', boxSizing: 'border-box' }}
                        />
                      </div>
                      <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {filteredCities.length > 0 ? filteredCities.map(c => (
                          <div key={c}
                            style={{ padding: '9px 14px', fontSize: '0.82rem', color: c === city ? '#c2772b' : '#444', fontWeight: c === city ? 600 : 400, cursor: 'pointer', background: c === city ? '#fef9f2' : 'transparent', display: 'flex', alignItems: 'center', gap: 6 }}
                            onMouseEnter={e => { if (c !== city) e.currentTarget.style.background = '#fef9f2'; }}
                            onMouseLeave={e => { if (c !== city) e.currentTarget.style.background = 'transparent'; }}
                            onClick={() => { setCity(c); setShowCity(false); setCitySearch(''); }}
                          >
                            <MapPin size={11} style={{ color: '#c2772b', flexShrink: 0 }}/>{c}
                          </div>
                        )) : (
                          <div style={{ padding: '12px 14px', fontSize: '0.78rem', color: '#aaa', textAlign: 'center' }}>No cities found</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Check-in */}
                <div
                  style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '4px', padding: '0 6px', height: '100%', borderRight: '1px solid rgba(0,0,0,0.08)', position: 'relative', cursor: 'pointer', minWidth: 0 }}
                  onClick={() => { const v = !showCheckInCal; closeAll(); setShowCheckInCal(v); }}
                >
                  <Calendar size={13} style={{ color: '#888', flexShrink: 0 }}/>
                  <span style={{ fontSize: '0.7rem', color: checkIn ? '#333' : '#aaa', fontWeight: 500 }}>{fmtDate(checkIn) || 'Check-in'}</span>
                  {showCheckInCal && <MiniCalendar title="Check-in" value={checkIn} onChange={setCheckIn} minDate={todayStr} onClose={() => setShowCheckInCal(false)}/>}
                </div>

                {/* Check-out */}
                <div
                  style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '4px', padding: '0 6px', height: '100%', borderRight: '1px solid rgba(0,0,0,0.08)', position: 'relative', cursor: 'pointer', minWidth: 0 }}
                  onClick={() => { const v = !showCheckOutCal; closeAll(); setShowCheckOutCal(v); }}
                >
                  <Calendar size={13} style={{ color: '#888', flexShrink: 0 }}/>
                  <span style={{ fontSize: '0.7rem', color: checkOut ? '#333' : '#aaa', fontWeight: 500 }}>{fmtDate(checkOut) || 'Check-out'}</span>
                  {showCheckOutCal && <MiniCalendar title="Check-out" value={checkOut} onChange={setCheckOut} minDate={checkIn || todayStr} onClose={() => setShowCheckOutCal(false)}/>}
                </div>

                {/* Guests */}
                <div
                  ref={guestRef}
                  style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '4px', padding: '0 6px', height: '100%', position: 'relative', cursor: 'pointer', minWidth: 0 }}
                  onClick={() => { const v = !showGuests; closeAll(); setShowGuests(v); }}
                >
                  <Users size={13} style={{ color: '#888', flexShrink: 0 }}/>
                  <span style={{ fontSize: '0.7rem', color: '#333', fontWeight: 500 }}>{guests} Gu.</span>
                  {showGuests && (
                    <div
                      style={{ position: 'absolute', bottom: 'calc(100% + 8px)', right: 0, background: 'white', borderRadius: '14px', boxShadow: '0 8px 28px rgba(0,0,0,0.18)', padding: '12px 16px', zIndex: 300, minWidth: '150px' }}
                      onClick={e => e.stopPropagation()}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#333' }}>Guests</span>
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }} onClick={() => setShowGuests(false)}><X size={14}/></button>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                        <button style={{ width: 32, height: 32, borderRadius: '50%', border: '1.5px solid #e0c07a', background: 'white', color: '#c8851a', cursor: 'pointer', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          onClick={e => { e.stopPropagation(); setGuests(Math.max(1,guests-1)); }}>−</button>
                        <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1a1a1a', minWidth: 24, textAlign: 'center' }}>{guests}</span>
                        <button style={{ width: 32, height: 32, borderRadius: '50%', border: '1.5px solid #e0c07a', background: 'white', color: '#c8851a', cursor: 'pointer', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          onClick={e => { e.stopPropagation(); setGuests(guests+1); }}>+</button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Search button */}
                <button
                  style={{ flexShrink: 0, height: '40px', borderRadius: '10px', padding: '0 12px', background: 'linear-gradient(135deg, #f5a623 0%, #e08c10 100%)', color: '#fff', border: 'none', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', boxShadow: '0 4px 16px rgba(245,166,35,0.45)' }}
                  onClick={handleSearch}
                >
                  <Search size={14}/><span>Search</span>
                </button>

              </div>
            </div>
          </>
        ) : (
          /* ══════════════════════════════════════
             DESKTOP
          ══════════════════════════════════════ */
          <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <h1 style={{ color: 'white', fontSize: 'clamp(1.2rem,1.6vw,2rem)', fontWeight: 400, lineHeight: 1.25, margin: 0, textAlign: 'right', whiteSpace: 'nowrap', marginRight: '40px' }}>
                  <span style={{ color: '#f5a623' }}>OvikaLiving.com</span> – India's Smart Stay Marketplace
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.78rem', margin: '0.4rem 40px 0 0', textAlign: 'right', lineHeight: 1.4, whiteSpace: 'nowrap' }}>
                  Book Verified PG's, Apartments and Premium Homes across India — Nightly or Monthly
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', width: '260px', alignSelf: 'flex-end', marginRight: '40px' }}>
                {cards.map((card, i) => (
                  <a key={i} href={buildHref(card.category)} style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', background: '#1a100699', borderLeft: '3px solid #d97706', borderTop: '1px solid rgba(217,119,6,0.25)', borderRight: '1px solid rgba(217,119,6,0.15)', borderBottom: '1px solid rgba(217,119,6,0.15)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderRadius: '0.55rem', padding: '0.5rem 0.75rem', textDecoration: 'none', color: 'inherit' }}>
                    <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{card.icon}</span>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 300, margin: 0 }}>{card.title}</span>
                      <span style={{ color: '#f5c97a', fontSize: '0.68rem', fontWeight: 300, margin: 0 }}>{card.subtitle}</span>
                      <span style={{ color: 'rgba(220,210,195,0.9)', fontSize: '0.64rem', lineHeight: 1.35, margin: 0 }}>{card.desc}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Desktop search — CSS classes */}
            <div className="ovika-search-section">
              <div className="ovika-search-title">
                <MapPin className="pin-icon" size={16}/>
                <span style={{ color: '#fff' }}>Where are you going?</span>
              </div>
              <div className="ovika-search-bar-container">

                {/* City field with searchable dropdown */}
                <div className="ovika-search-field city-field" style={{ position: 'relative' }}
                  onClick={() => { setShowCity(!showCity); setShowCheckInCal(false); setShowCheckOutCal(false); setShowGuests(false); }}>
                  <div className="field-icon-box"><MapPin size={15} style={{ color: '#f5a623' }}/></div>
                  <div className="field-text">
                    <span className="field-label">Location</span>
                    <span className="field-value">{city}</span>
                  </div>
                  {showCity && (
                    <div
                      style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, width: '220px', background: 'white', borderRadius: '16px', boxShadow: '0 12px 36px rgba(0,0,0,0.16)', zIndex: 500, overflow: 'hidden' }}
                      onClick={e => e.stopPropagation()}
                    >
                      {/* Search box */}
                      <div style={{ padding: '10px 12px', borderBottom: '1px solid #f0e8d8' }}>
                        <input
                          autoFocus
                          placeholder="Search city..."
                          value={citySearch}
                          onChange={e => setCitySearch(e.target.value)}
                          style={{ width: '100%', border: '1px solid #e0d0b8', borderRadius: 10, padding: '6px 10px', fontSize: '0.82rem', outline: 'none', color: '#333', boxSizing: 'border-box', fontFamily: 'Poppins, sans-serif' }}
                        />
                      </div>
                      <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
                        {filteredCities.length > 0 ? filteredCities.map(c => (
                          <div key={c}
                            className="city-option"
                            style={{ color: c === city ? '#c2772b' : '#444', fontWeight: c === city ? 600 : 400, background: c === city ? '#fef9f2' : 'transparent', display: 'flex', alignItems: 'center', gap: 7 }}
                            onMouseEnter={e => { if (c !== city) e.currentTarget.style.background = '#fef9f2'; }}
                            onMouseLeave={e => { if (c !== city) e.currentTarget.style.background = 'transparent'; }}
                            onClick={() => { setCity(c); setShowCity(false); setCitySearch(''); }}
                          >
                            <MapPin size={12} style={{ color: '#c2772b', flexShrink: 0 }}/>{c}
                          </div>
                        )) : (
                          <div style={{ padding: '14px', fontSize: '0.8rem', color: '#aaa', textAlign: 'center' }}>No cities found</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="field-divider"/>
                <div className="ovika-search-field" style={{ position: 'relative' }}>
                  <div className="field-icon-box"><Calendar size={15}/></div>
                  <div className="field-text">
                    <span className="field-label">Check-in</span>
                    <input type="date" className="date-input" value={checkIn} onChange={e => setCheckIn(e.target.value)}/>
                  </div>
                </div>
                <div className="field-divider"/>
                <div className="ovika-search-field" style={{ position: 'relative' }}>
                  <div className="field-icon-box"><Calendar size={15}/></div>
                  <div className="field-text">
                    <span className="field-label">Check-out</span>
                    <input type="date" className="date-input" value={checkOut} onChange={e => setCheckOut(e.target.value)}/>
                  </div>
                </div>
                <div className="field-divider"/>
                <div className="ovika-search-field guests-field">
                  <div className="field-icon-box"><Users size={15}/></div>
                  <div className="field-text">
                    <span className="field-label">Guests</span>
                    <span className="field-value">{guests} Guest{guests > 1 ? 's' : ''}</span>
                  </div>
                  <div className="guest-controls">
                    <button onClick={e => { e.stopPropagation(); setGuests(Math.max(1,guests-1)); }}>−</button>
                    <button onClick={e => { e.stopPropagation(); setGuests(guests+1); }}>+</button>
                  </div>
                </div>
                <button className="ovika-search-btn" onClick={handleSearch}>
                  <Search size={15}/><span>Search</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}