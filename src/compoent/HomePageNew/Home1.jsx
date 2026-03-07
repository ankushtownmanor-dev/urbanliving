
// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MapPin, Calendar, Users, Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
// import './Home1.css';

// /* ── Custom Mini Calendar ── */
// function MiniCalendar({ value, onChange, minDate, onClose, title }) {
//   const today = new Date();
//   const initDate = value ? new Date(value) : today;
//   const [viewYear, setViewYear] = useState(initDate.getFullYear());
//   const [viewMonth, setViewMonth] = useState(initDate.getMonth());

//   const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
//   const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

//   const firstDay = new Date(viewYear, viewMonth, 1).getDay();
//   const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

//   const cells = [];
//   for (let i = 0; i < firstDay; i++) cells.push(null);
//   for (let d = 1; d <= daysInMonth; d++) cells.push(d);

//   const selectedDay = value ? new Date(value).getDate() : null;
//   const selectedMonth = value ? new Date(value).getMonth() : null;
//   const selectedYear = value ? new Date(value).getFullYear() : null;

//   const isSelected = (d) => d && d === selectedDay && viewMonth === selectedMonth && viewYear === selectedYear;

//   const isPast = (d) => {
//     if (!d || !minDate) return false;
//     const cell = new Date(viewYear, viewMonth, d);
//     const min = new Date(minDate);
//     min.setHours(0,0,0,0);
//     return cell < min;
//   };

//   const handleDay = (d) => {
//     if (!d || isPast(d)) return;
//     const month = String(viewMonth + 1).padStart(2, '0');
//     const day = String(d).padStart(2, '0');
//     onChange(`${viewYear}-${month}-${day}`);
//     onClose();
//   };

//   const prevMonth = () => {
//     if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
//     else setViewMonth(m => m - 1);
//   };
//   const nextMonth = () => {
//     if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
//     else setViewMonth(m => m + 1);
//   };

//   return (
//     <div className="ovika-cal-popup" onClick={e => e.stopPropagation()}>
//       {/* Header */}
//       <div className="ovika-cal-header">
//         <span className="ovika-cal-title">{title}</span>
//         <button className="ovika-cal-close" onClick={onClose}><X size={13} /></button>
//       </div>
//       {/* Nav */}
//       <div className="ovika-cal-nav">
//         <button className="ovika-cal-nav-btn" onClick={prevMonth}><ChevronLeft size={15} /></button>
//         <span className="ovika-cal-month-label">{MONTHS[viewMonth]} {viewYear}</span>
//         <button className="ovika-cal-nav-btn" onClick={nextMonth}><ChevronRight size={15} /></button>
//       </div>
//       {/* Day headers */}
//       <div className="ovika-cal-grid">
//         {DAYS.map(d => <div key={d} className="ovika-cal-day-name">{d}</div>)}
//         {cells.map((d, i) => (
//           <div
//             key={i}
//             className={[
//               'ovika-cal-cell',
//               d ? 'ovika-cal-cell--active' : '',
//               isSelected(d) ? 'ovika-cal-cell--selected' : '',
//               isPast(d) ? 'ovika-cal-cell--past' : '',
//             ].join(' ')}
//             onClick={() => handleDay(d)}
//           >
//             {d || ''}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// /* ── Main Component ── */
// export default function Home1() {
//   const navigate = useNavigate();
//   const [rentalType, setRentalType] = useState(null);
//   const [city, setCity] = useState('Noida');
//   const [checkIn, setCheckIn] = useState('');
//   const [checkOut, setCheckOut] = useState('');
//   const [guests, setGuests] = useState(1);
//   const [showCityDropdown, setShowCityDropdown] = useState(false);
//   const [showGuestPopup, setShowGuestPopup] = useState(false);
//   const [showCheckInCal, setShowCheckInCal] = useState(false);
//   const [showCheckOutCal, setShowCheckOutCal] = useState(false);
//   const [cities, setCities] = useState(['Noida', 'Gurugram', 'Delhi', 'Mumbai', 'Bengaluru']);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

//   const guestPopupRef = useRef(null);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= 768);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     const handleOutside = (e) => {
//       if (guestPopupRef.current && !guestPopupRef.current.contains(e.target)) {
//         setShowGuestPopup(false);
//       }
//     };
//     document.addEventListener('mousedown', handleOutside);
//     document.addEventListener('touchstart', handleOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleOutside);
//       document.removeEventListener('touchstart', handleOutside);
//     };
//   }, []);

//   useEffect(() => {
//     const fetchCities = async () => {
//       try {
//         const res = await fetch('https://townmanor.ai/api/ovika/properties');
//         if (!res.ok) throw new Error('Fetch failed');
//         const data = await res.json();
//         const list = data?.data || [];
//         let uniqueCities = [...new Set(list.map(p => p.city).filter(Boolean))].sort();
//         if (uniqueCities.length > 0) {
//           setCities(uniqueCities);
//           if (!uniqueCities.includes('Noida')) setCity(uniqueCities[0]);
//         }
//       } catch (err) {
//         console.error('Error fetching cities:', err);
//       }
//     };
//     fetchCities();

//     const type = sessionStorage.getItem('ovika_rental_type');
//     setRentalType(type);
//     const interval = setInterval(() => {
//       setRentalType(sessionStorage.getItem('ovika_rental_type'));
//     }, 300);
//     return () => clearInterval(interval);
//   }, []);

//   const pricingLabel = rentalType === 'short' ? ' — Per Night' : rentalType === 'long' ? ' — Per Month' : '';

//   const cards = [
//     { icon: '🏠', title: 'PG', subtitle: `Affordable stays${pricingLabel}`, desc: 'Ideal for students & professionals.', category: 'PG' },
//     { icon: '🏢', title: 'Economy Stay', subtitle: `Comfort at great value${pricingLabel}`, desc: 'Well-furnished homes with modern amenities.', category: 'Economy Stay' },
//     { icon: '✨', title: 'Premium Stay', subtitle: `Refined living experience${pricingLabel}`, desc: 'Enhanced comfort with premium facilities.', category: 'Premium Stay' },
//   ];

//   const buildHref = (category) => {
//     const params = new URLSearchParams();
//     params.set('category', category);
//     if (rentalType) params.set('rentalType', rentalType);
//     return `/properties?${params.toString()}`;
//   };

//   const handleSearch = () => {
//     const params = new URLSearchParams();
//     if (city) { params.set('city', city); params.set('search', city); }
//     if (rentalType) params.set('rentalType', rentalType);
//     if (checkIn) params.set('checkIn', checkIn);
//     if (checkOut) params.set('checkOut', checkOut);
//     if (guests) params.set('guests', guests.toString());
//     navigate(`/properties?${params.toString()}`);
//   };

//   const formatDate = (val) => {
//     if (!val) return null;
//     const d = new Date(val);
//     return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
//   };

//   const todayStr = new Date().toISOString().split('T')[0];

//   return (
//     <div className="ovika-urban-hero-container">

//       <div className="ovika-urban-hero-bg">
//         <img
//           src={isMobile ? '/home1mobile.png' : '/home2desktop.png'}
//           alt=""
//           className="ovika-bg-img"
//         />
//         {isMobile && <div className="ovika-mobile-overlay" />}
//       </div>

//       <div className="ovika-urban-hero-wrapper">

//         <div className="ovika-hero-left">
//           <h1 className="ovika-urban-hero-heading">
//             <span className="ovika-brand-name">OvikaLiving.com</span> – India's Smart Stay Marketplace
//           </h1>
//         </div>

//         <div className="ovika-hero-cards">
//           {cards.map((card, i) => (
//             <a key={i} href={buildHref(card.category)} className="ovika-hero-card"
//               style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}>
//               <div className="ovika-card-icon">{card.icon}</div>
//               <div className="ovika-card-body">
//                 <h3 className="ovika-card-title">{card.title}</h3>
//                 <p className="ovika-card-subtitle">{card.subtitle}</p>
//                 <p className="ovika-card-desc">{card.desc}</p>
//               </div>
//             </a>
//           ))}
//         </div>

//         <div className="ovika-search-section">
//           <div className="ovika-search-title">
//             <MapPin className="pin-icon" size={16} />
//             <span style={{color:"#fff"}}>Where are you going?</span>
//           </div>

//           <div className="ovika-search-bar-container">

//             {/* ── CITY ── */}
//             <div className="ovika-search-field city-field"
//               onClick={() => { setShowCityDropdown(!showCityDropdown); setShowCheckInCal(false); setShowCheckOutCal(false); setShowGuestPopup(false); }}>
//               <div className="field-icon-box"><MapPin size={15} style={{ color: '#f5a623' }} /></div>
//               <div className="field-text">
//                 <span className="field-label">Location</span>
//                 <span className="field-value">{city}</span>
//               </div>
//               {showCityDropdown && (
//                 <div className="city-dropdown">
//                   {cities.map(c => (
//                     <div key={c} className="city-option"
//                       onClick={(e) => { e.stopPropagation(); setCity(c); setShowCityDropdown(false); }}>
//                       {c}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div className="field-divider" />

//             {/* ── CHECK-IN ── */}
//             <div className="ovika-search-field" style={{ position: 'relative' }}
//               onClick={() => { if (isMobile) { setShowCheckInCal(!showCheckInCal); setShowCheckOutCal(false); setShowCityDropdown(false); setShowGuestPopup(false); } }}>
//               <div className="field-icon-box"><Calendar size={15} /></div>
//               <div className="field-text">
//                 <span className="field-label">Check-in</span>
//                 {isMobile
//                   ? <span className="field-value" style={{ color: checkIn ? '#1a1a1a' : '#aaa' }}>{formatDate(checkIn) || 'Add date'}</span>
//                   : <input type="date" className="date-input" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
//                 }
//               </div>
//               {isMobile && showCheckInCal && (
//                 <MiniCalendar
//                   title="Check-in"
//                   value={checkIn}
//                   onChange={setCheckIn}
//                   minDate={todayStr}
//                   onClose={() => setShowCheckInCal(false)}
//                 />
//               )}
//             </div>

//             <div className="field-divider" />

//             {/* ── CHECK-OUT ── */}
//             <div className="ovika-search-field" style={{ position: 'relative' }}
//               onClick={() => { if (isMobile) { setShowCheckOutCal(!showCheckOutCal); setShowCheckInCal(false); setShowCityDropdown(false); setShowGuestPopup(false); } }}>
//               <div className="field-icon-box"><Calendar size={15} /></div>
//               <div className="field-text">
//                 <span className="field-label">Check-out</span>
//                 {isMobile
//                   ? <span className="field-value" style={{ color: checkOut ? '#1a1a1a' : '#aaa' }}>{formatDate(checkOut) || 'Add date'}</span>
//                   : <input type="date" className="date-input" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
//                 }
//               </div>
//               {isMobile && showCheckOutCal && (
//                 <MiniCalendar
//                   title="Check-out"
//                   value={checkOut}
//                   onChange={setCheckOut}
//                   minDate={checkIn || todayStr}
//                   onClose={() => setShowCheckOutCal(false)}
//                 />
//               )}
//             </div>

//             <div className="field-divider" />

//             {/* ── GUESTS ── */}
//             {isMobile ? (
//               <div className="ovika-search-field guests-field" ref={guestPopupRef}
//                 onClick={() => { setShowGuestPopup(!showGuestPopup); setShowCheckInCal(false); setShowCheckOutCal(false); setShowCityDropdown(false); }}>
//                 <div className="field-icon-box"><Users size={15} /></div>
//                 <div className="field-text">
//                   <span className="field-label">Guests</span>
//                   <span className="field-value">{guests} Guest{guests > 1 ? 's' : ''}</span>
//                 </div>
//                 {showGuestPopup && (
//                   <div className="guest-popup" onClick={(e) => e.stopPropagation()}>
//                     <div className="guest-popup-header">
//                       <span className="guest-popup-title">Guests</span>
//                       <button className="guest-popup-close" onClick={() => setShowGuestPopup(false)}><X size={14} /></button>
//                     </div>
//                     <div className="guest-popup-row">
//                       <button className="guest-popup-btn" onClick={(e) => { e.stopPropagation(); setGuests(Math.max(1, guests - 1)); }}>−</button>
//                       <span className="guest-popup-count">{guests}</span>
//                       <button className="guest-popup-btn" onClick={(e) => { e.stopPropagation(); setGuests(guests + 1); }}>+</button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="ovika-search-field guests-field">
//                 <div className="field-icon-box"><Users size={15} /></div>
//                 <div className="field-text">
//                   <span className="field-label">Guests</span>
//                   <span className="field-value">{guests} Guest{guests > 1 ? 's' : ''}</span>
//                 </div>
//                 <div className="guest-controls">
//                   <button onClick={(e) => { e.stopPropagation(); setGuests(Math.max(1, guests - 1)); }}>−</button>
//                   <button onClick={(e) => { e.stopPropagation(); setGuests(guests + 1); }}>+</button>
//                 </div>
//               </div>
//             )}

//             <button className="ovika-search-btn" onClick={handleSearch}>
//               <Search size={15} />
//               <span>Search</span>
//             </button>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import './Home1.css';

/* ── Custom Mini Calendar ── */
function MiniCalendar({ value, onChange, minDate, onClose, title }) {
  const today = new Date();
  const initDate = value ? new Date(value) : today;
  const [viewYear, setViewYear] = useState(initDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initDate.getMonth());

  const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const selectedDay = value ? new Date(value).getDate() : null;
  const selectedMonth = value ? new Date(value).getMonth() : null;
  const selectedYear = value ? new Date(value).getFullYear() : null;

  const isSelected = (d) => d && d === selectedDay && viewMonth === selectedMonth && viewYear === selectedYear;

  const isPast = (d) => {
    if (!d || !minDate) return false;
    const cell = new Date(viewYear, viewMonth, d);
    const min = new Date(minDate);
    min.setHours(0,0,0,0);
    return cell < min;
  };

  const handleDay = (d) => {
    if (!d || isPast(d)) return;
    const month = String(viewMonth + 1).padStart(2, '0');
    const day = String(d).padStart(2, '0');
    onChange(`${viewYear}-${month}-${day}`);
    onClose();
  };

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  return (
    <div className="ovika-cal-popup" onClick={e => e.stopPropagation()}>
      <div className="ovika-cal-header">
        <span className="ovika-cal-title">{title}</span>
        <button className="ovika-cal-close" onClick={onClose}><X size={13} /></button>
      </div>
      <div className="ovika-cal-nav">
        <button className="ovika-cal-nav-btn" onClick={prevMonth}><ChevronLeft size={15} /></button>
        <span className="ovika-cal-month-label">{MONTHS[viewMonth]} {viewYear}</span>
        <button className="ovika-cal-nav-btn" onClick={nextMonth}><ChevronRight size={15} /></button>
      </div>
      <div className="ovika-cal-grid">
        {DAYS.map(d => <div key={d} className="ovika-cal-day-name">{d}</div>)}
        {cells.map((d, i) => (
          <div
            key={i}
            className={[
              'ovika-cal-cell',
              d ? 'ovika-cal-cell--active' : '',
              isSelected(d) ? 'ovika-cal-cell--selected' : '',
              isPast(d) ? 'ovika-cal-cell--past' : '',
            ].join(' ')}
            onClick={() => handleDay(d)}
          >
            {d || ''}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main Component ── */
export default function Home1() {
  const navigate = useNavigate();
  const [rentalType, setRentalType] = useState(null);
  const [city, setCity] = useState('Noida');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showGuestPopup, setShowGuestPopup] = useState(false);
  const [showCheckInCal, setShowCheckInCal] = useState(false);
  const [showCheckOutCal, setShowCheckOutCal] = useState(false);
  const [cities, setCities] = useState(['Noida', 'Gurugram', 'Delhi', 'Mumbai', 'Bengaluru']);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const guestPopupRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleOutside = (e) => {
      if (guestPopupRef.current && !guestPopupRef.current.contains(e.target)) {
        setShowGuestPopup(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('touchstart', handleOutside);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
    };
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch('https://townmanor.ai/api/ovika/properties');
        if (!res.ok) throw new Error('Fetch failed');
        const data = await res.json();
        const list = data?.data || [];
        let uniqueCities = [...new Set(list.map(p => p.city).filter(Boolean))].sort();
        if (uniqueCities.length > 0) {
          setCities(uniqueCities);
          if (!uniqueCities.includes('Noida')) setCity(uniqueCities[0]);
        }
      } catch (err) {
        console.error('Error fetching cities:', err);
      }
    };
    fetchCities();

    const type = sessionStorage.getItem('ovika_rental_type');
    setRentalType(type);
    const interval = setInterval(() => {
      setRentalType(sessionStorage.getItem('ovika_rental_type'));
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const pricingLabel = rentalType === 'short' ? ' — Per Night' : rentalType === 'long' ? ' — Per Month' : '';

  const cards = [
    { icon: '🏠', title: 'PG', subtitle: `Affordable stays${pricingLabel}`, desc: 'Ideal for students & professionals.', category: 'PG' },
    { icon: '🏢', title: 'Economy Stay', subtitle: `Comfort at great value${pricingLabel}`, desc: 'Well-furnished homes with modern amenities.', category: 'Economy Stay' },
    { icon: '✨', title: 'Premium Stay', subtitle: `Refined living experience${pricingLabel}`, desc: 'Enhanced comfort with premium facilities.', category: 'Premium Stay' },
  ];

  const buildHref = (category) => {
    const params = new URLSearchParams();
    params.set('category', category);
    if (rentalType) params.set('rentalType', rentalType);
    return `/properties?${params.toString()}`;
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (city) { params.set('city', city); params.set('search', city); }
    if (rentalType) params.set('rentalType', rentalType);
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (guests) params.set('guests', guests.toString());
    navigate(`/properties?${params.toString()}`);
  };

  const formatDate = (val) => {
    if (!val) return null;
    const d = new Date(val);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="ovika-urban-hero-container">

      <div className="ovika-urban-hero-bg">
        <img
          src={isMobile ? '/home1mobile.png' : '/home2desktop.png'}
          alt=""
          className="ovika-bg-img"
        />
        {isMobile && <div className="ovika-mobile-overlay" />}
      </div>

      <div className="ovika-urban-hero-wrapper">

        {/* ── Desktop: heading + cards stacked on right ── */}
        <div className="ovika-hero-right-block">
          <div className="ovika-hero-left">
            <h1 className="ovika-urban-hero-heading">
              <span className="ovika-brand-name">OvikaLiving.com</span> – India's Smart Stay Marketplace
            </h1>
          </div>

          <div className="ovika-hero-cards">
            {cards.map((card, i) => (
              <a key={i} href={buildHref(card.category)} className="ovika-hero-card"
                style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}>
                <div className="ovika-card-icon">{card.icon}</div>
                <div className="ovika-card-body">
                  <h3 className="ovika-card-title">{card.title}</h3>
                  <p className="ovika-card-subtitle">{card.subtitle}</p>
                  <p className="ovika-card-desc">{card.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="ovika-search-section">
          <div className="ovika-search-title">
            <MapPin className="pin-icon" size={16} />
            <span style={{color:"#fff"}}>Where are you going?</span>
          </div>

          <div className="ovika-search-bar-container">

            {/* ── CITY ── */}
            <div className="ovika-search-field city-field"
              onClick={() => { setShowCityDropdown(!showCityDropdown); setShowCheckInCal(false); setShowCheckOutCal(false); setShowGuestPopup(false); }}>
              <div className="field-icon-box"><MapPin size={15} style={{ color: '#f5a623' }} /></div>
              <div className="field-text">
                <span className="field-label">Location</span>
                <span className="field-value">{city}</span>
              </div>
              {showCityDropdown && (
                <div className="city-dropdown">
                  {cities.map(c => (
                    <div key={c} className="city-option"
                      onClick={(e) => { e.stopPropagation(); setCity(c); setShowCityDropdown(false); }}>
                      {c}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="field-divider" />

            {/* ── CHECK-IN ── */}
            <div className="ovika-search-field" style={{ position: 'relative' }}
              onClick={() => { if (isMobile) { setShowCheckInCal(!showCheckInCal); setShowCheckOutCal(false); setShowCityDropdown(false); setShowGuestPopup(false); } }}>
              <div className="field-icon-box"><Calendar size={15} /></div>
              <div className="field-text">
                <span className="field-label">Check-in</span>
                {isMobile
                  ? <span className="field-value" style={{ color: checkIn ? '#1a1a1a' : '#aaa' }}>{formatDate(checkIn) || 'Add date'}</span>
                  : <input type="date" className="date-input" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                }
              </div>
              {isMobile && showCheckInCal && (
                <MiniCalendar
                  title="Check-in"
                  value={checkIn}
                  onChange={setCheckIn}
                  minDate={todayStr}
                  onClose={() => setShowCheckInCal(false)}
                />
              )}
            </div>

            <div className="field-divider" />

            {/* ── CHECK-OUT ── */}
            <div className="ovika-search-field" style={{ position: 'relative' }}
              onClick={() => { if (isMobile) { setShowCheckOutCal(!showCheckOutCal); setShowCheckInCal(false); setShowCityDropdown(false); setShowGuestPopup(false); } }}>
              <div className="field-icon-box"><Calendar size={15} /></div>
              <div className="field-text">
                <span className="field-label">Check-out</span>
                {isMobile
                  ? <span className="field-value" style={{ color: checkOut ? '#1a1a1a' : '#aaa' }}>{formatDate(checkOut) || 'Add date'}</span>
                  : <input type="date" className="date-input" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                }
              </div>
              {isMobile && showCheckOutCal && (
                <MiniCalendar
                  title="Check-out"
                  value={checkOut}
                  onChange={setCheckOut}
                  minDate={checkIn || todayStr}
                  onClose={() => setShowCheckOutCal(false)}
                />
              )}
            </div>

            <div className="field-divider" />

            {/* ── GUESTS ── */}
            {isMobile ? (
              <div className="ovika-search-field guests-field" ref={guestPopupRef}
                onClick={() => { setShowGuestPopup(!showGuestPopup); setShowCheckInCal(false); setShowCheckOutCal(false); setShowCityDropdown(false); }}>
                <div className="field-icon-box"><Users size={15} /></div>
                <div className="field-text">
                  <span className="field-label">Guests</span>
                  <span className="field-value">{guests} Guest{guests > 1 ? 's' : ''}</span>
                </div>
                {showGuestPopup && (
                  <div className="guest-popup" onClick={(e) => e.stopPropagation()}>
                    <div className="guest-popup-header">
                      <span className="guest-popup-title">Guests</span>
                      <button className="guest-popup-close" onClick={() => setShowGuestPopup(false)}><X size={14} /></button>
                    </div>
                    <div className="guest-popup-row">
                      <button className="guest-popup-btn" onClick={(e) => { e.stopPropagation(); setGuests(Math.max(1, guests - 1)); }}>−</button>
                      <span className="guest-popup-count">{guests}</span>
                      <button className="guest-popup-btn" onClick={(e) => { e.stopPropagation(); setGuests(guests + 1); }}>+</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="ovika-search-field guests-field">
                <div className="field-icon-box"><Users size={15} /></div>
                <div className="field-text">
                  <span className="field-label">Guests</span>
                  <span className="field-value">{guests} Guest{guests > 1 ? 's' : ''}</span>
                </div>
                <div className="guest-controls">
                  <button onClick={(e) => { e.stopPropagation(); setGuests(Math.max(1, guests - 1)); }}>−</button>
                  <button onClick={(e) => { e.stopPropagation(); setGuests(guests + 1); }}>+</button>
                </div>
              </div>
            )}

            <button className="ovika-search-btn" onClick={handleSearch}>
              <Search size={15} />
              <span>Search</span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}