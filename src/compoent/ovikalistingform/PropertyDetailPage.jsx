

import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { UserCircle } from "lucide-react";

import { 
  FiArrowLeft, FiMapPin, FiShare, FiHeart, FiCheck, FiXCircle,
  FiUser, FiCalendar, FiShield, FiStar, FiX, FiZoomIn, FiZoomOut,
  FiInfo, FiLock, FiZap
} from 'react-icons/fi';
import { BiBed, BiBath, BiArea } from 'react-icons/bi';
import { 
  CheckCircle, 
  XCircle, 
  UploadCloud, 
  Loader, 
  ChevronLeft, 
  ChevronRight,
  Car, 
  ParkingCircle,
  Bus,
  UtensilsCrossed,
  Landmark,
  ShoppingBasket,
  HeartPulse,
  Lightbulb,
  Clock,
  MapPin as MapPinIcon
} from 'lucide-react';
import { MdCurrencyRupee, MdOutlineCurrencyRupee } from 'react-icons/md';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { format } from 'date-fns';
import './PropertyDetailPage.css';
import { AuthContext } from '../Login/AuthContext';

const getValidPropertyId = (frontendId) => {
  const id = Number(frontendId);
  if (id === 1 || id === 2) return String(id);
  return id % 2 === 0 ? '2' : '1';
};

const API_BASE_URL = 'https://townmanor.ai/api/ovika';
const CALENDAR_API_BASE = 'https://townmanor.ai/api/calendar';
const BOOKING_REQUEST_API = 'https://townmanor.ai/api/booking-request';

const getPhotoUrl = (photo) => {
  if (!photo) return null;
  if (photo.startsWith('http')) return photo;
  if (photo.includes('/uploads/')) {
    return `${API_BASE_URL}${photo.startsWith('/') ? '' : '/'}${photo}`;
  }
  return `${API_BASE_URL}/uploads/${photo.startsWith('/') ? photo.substring(1) : photo}`;
};

const formatCurrency = (num) => {
  if (!num && num !== 0) return 'N/A';
  return Number(num).toLocaleString('en-IN');
};

const transformPropertyData = (data) => {
  if (!data) return null;
  const parseJsonField = (field) => {
    if (!field) return [];
    if (Array.isArray(field)) return field;
    if (typeof field === 'string') {
      try { return JSON.parse(field); } catch (e) { return []; }
    }
    return [];
  };

  const parseMeta = (meta) => {
      if (!meta) return {};
      if (typeof meta === 'object') return meta;
      try { return JSON.parse(meta); } catch (e) { return {}; }
  };

  return {
    ...data,
    meta: parseMeta(data.meta),
    amenities: parseJsonField(data.amenities),
    photos: Array.isArray(data.photos) ? data.photos : (data.photos ? [data.photos] : []),
    parsedBedrooms: parseJsonField(data.bedrooms),
    parsedBathrooms: parseJsonField(data.bathrooms),
  };
};

const toYMD = (date) => {
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

const addDays = (date, n) => {
  const d = new Date(date);
  d.setDate(d.getDate() + 1);
  return d;
};

function buildDisabledDates(blockedRanges = []) {
  const set = new Set();
  blockedRanges.forEach((r) => {
    const start = new Date(r.start);
    const end = new Date(r.end);
    for (let d = new Date(start); toYMD(d) < toYMD(end); d = addDays(d, 1)) {
      set.add(toYMD(d));
    }
  });
  return set;
}

async function getCalendar(propertyKey) {
  try {
    const res = await fetch(`${CALENDAR_API_BASE}/${propertyKey}`);
    if (!res.ok) {
      console.warn('Calendar API failed, continuing without blocked dates');
      return { blocked: [] };
    }
    return await res.json();
  } catch (error) {
    console.warn('Calendar API error:', error);
    return { blocked: [] };
  }
}

// IMAGE VIEWER COMPONENT
// const ImageViewer = ({ images, initialIndex, onClose }) => {
//   const [currentIndex, setCurrentIndex] = useState(initialIndex);
//   const [scale, setScale] = useState(1);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
//   const imageRef = useRef(null);

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === 'Escape') onClose();
//       if (e.key === 'ArrowLeft') handlePrevImage();
//       if (e.key === 'ArrowRight') handleNextImage();
//     };
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [currentIndex]);

//   useEffect(() => {
//     setScale(1);
//     setPosition({ x: 0, y: 0 });
//   }, [currentIndex]);

//   const handleNextImage = () => {
//     if (currentIndex < images.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   const handlePrevImage = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   const handleZoomIn = () => {
//     setScale(prev => Math.min(prev + 0.5, 4));
//   };

//   const handleZoomOut = () => {
//     setScale(prev => {
//       const newScale = Math.max(prev - 0.5, 1);
//       if (newScale === 1) {
//         setPosition({ x: 0, y: 0 });
//       }
//       return newScale;
//     });
//   };

//   const handleMouseDown = (e) => {
//     if (scale > 1) {
//       setIsDragging(true);
//       setDragStart({
//         x: e.clientX - position.x,
//         y: e.clientY - position.y
//       });
//     }
//   };

//   const handleMouseMove = (e) => {
//     if (isDragging && scale > 1) {
//       setPosition({
//         x: e.clientX - dragStart.x,
//         y: e.clientY - dragStart.y
//       });
//     }
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   const handleTouchStart = (e) => {
//     if (scale > 1 && e.touches.length === 1) {
//       setIsDragging(true);
//       setDragStart({
//         x: e.touches[0].clientX - position.x,
//         y: e.touches[0].clientY - position.y
//       });
//     }
//   };

//   const handleTouchMove = (e) => {
//     if (isDragging && scale > 1 && e.touches.length === 1) {
//       setPosition({
//         x: e.touches[0].clientX - dragStart.x,
//         y: e.touches[0].clientY - dragStart.y
//       });
//     }
//   };

//   const handleTouchEnd = () => {
//     setIsDragging(false);
//   };

//   return (
//     <div 
//       style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         background: 'rgba(0, 0, 0, 0.95)',
//         zIndex: 10000,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         flexDirection: 'column'
//       }}
//       onMouseMove={handleMouseMove}
//       onMouseUp={handleMouseUp}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//     >
//       <div style={{
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         padding: '1rem 1.5rem',
//         background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)',
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         zIndex: 10001
//       }}>
//         <span style={{ color: 'white', fontSize: '1rem', fontWeight: '500' }}>
//           {currentIndex + 1} / {images.length}
//         </span>
//         <button 
//           onClick={onClose}
//           style={{
//             background: 'rgba(255,255,255,0.2)',
//             border: 'none',
//             borderRadius: '50%',
//             width: '40px',
//             height: '40px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             cursor: 'pointer',
//             color: 'white',
//             fontSize: '1.5rem'
//           }}
//         >
//           <FiX />
//         </button>
//       </div>

//       <div 
//         style={{
//           flex: 1,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           width: '100%',
//           overflow: 'hidden',
//           cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
//         }}
//         onMouseDown={handleMouseDown}
//         onTouchStart={handleTouchStart}
//       >
//         <img
//           ref={imageRef}
//           src={getPhotoUrl(images[currentIndex])}
//           alt={`Property ${currentIndex + 1}`}
//           style={{
//             maxWidth: scale === 1 ? '90%' : 'none',
//             maxHeight: scale === 1 ? '90%' : 'none',
//             width: scale > 1 ? `${scale * 100}%` : 'auto',
//             height: 'auto',
//             objectFit: 'contain',
//             transform: `translate(${position.x}px, ${position.y}px)`,
//             transition: isDragging ? 'none' : 'transform 0.3s ease',
//             userSelect: 'none',
//             pointerEvents: scale > 1 ? 'auto' : 'none'
//           }}
//           draggable={false}
//         />
//       </div>

//       <div style={{
//         position: 'absolute',
//         bottom: '2rem',
//         left: '50%',
//         transform: 'translateX(-50%)',
//         display: 'flex',
//         gap: '1rem',
//         alignItems: 'center',
//         background: 'rgba(0,0,0,0.7)',
//         padding: '1rem 1.5rem',
//         borderRadius: '50px',
//         backdropFilter: 'blur(10px)'
//       }}>
//         <button
//           onClick={handleZoomOut}
//           disabled={scale <= 1}
//           style={{
//             background: scale <= 1 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)',
//             border: 'none',
//             borderRadius: '50%',
//             width: '44px',
//             height: '44px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             cursor: scale <= 1 ? 'not-allowed' : 'pointer',
//             color: 'white',
//             fontSize: '1.2rem',
//             transition: 'background 0.2s'
//           }}
//         >
//           <FiZoomOut />
//         </button>

//         <span style={{
//           color: 'white',
//           fontSize: '0.9rem',
//           fontWeight: '500',
//           minWidth: '60px',
//           textAlign: 'center'
//         }}>
//           {Math.round(scale * 100)}%
//         </span>

//         <button
//           onClick={handleZoomIn}
//           disabled={scale >= 4}
//           style={{
//             background: scale >= 4 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)',
//             border: 'none',
//             borderRadius: '50%',
//             width: '44px',
//             height: '44px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             cursor: scale >= 4 ? 'not-allowed' : 'pointer',
//             color: 'white',
//             fontSize: '1.2rem',
//             transition: 'background 0.2s'
//           }}
//         >
//           <FiZoomIn />
//         </button>
//       </div>

//       {currentIndex > 0 && (
//         <button
//           onClick={handlePrevImage}
//           style={{
//             position: 'absolute',
//             left: '1rem',
//             top: '50%',
//             transform: 'translateY(-50%)',
//             background: 'rgba(0,0,0,0.5)',
//             border: 'none',
//             borderRadius: '50%',
//             width: '50px',
//             height: '50px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             cursor: 'pointer',
//             color: 'white',
//             fontSize: '1.5rem',
//             backdropFilter: 'blur(10px)'
//           }}
//         >
//           <ChevronLeft size={28} />
//         </button>
//       )}

//       {currentIndex < images.length - 1 && (
//         <button
//           onClick={handleNextImage}
//           style={{
//             position: 'absolute',
//             right: '1rem',
//             top: '50%',
//             transform: 'translateY(-50%)',
//             background: 'rgba(0,0,0,0.5)',
//             border: 'none',
//             borderRadius: '50%',
//             width: '50px',
//             height: '50px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             cursor: 'pointer',
//             color: 'white',
//             fontSize: '1.5rem',
//             backdropFilter: 'blur(10px)'
//           }}
//         >
//           <ChevronRight size={28} />
//         </button>
//       )}

//       <div style={{
//         position: 'absolute',
//         bottom: '6rem',
//         left: '50%',
//         transform: 'translateX(-50%)',
//         display: 'flex',
//         gap: '0.5rem',
//         padding: '0.75rem',
//         background: 'rgba(0,0,0,0.7)',
//         borderRadius: '12px',
//         maxWidth: '90%',
//         overflowX: 'auto',
//         backdropFilter: 'blur(10px)'
//       }}>
//         {images.map((img, idx) => (
//           <img
//             key={idx}
//             src={getPhotoUrl(img)}
//             alt={`Thumbnail ${idx + 1}`}
//             onClick={() => setCurrentIndex(idx)}
//             style={{
//               width: '60px',
//               height: '60px',
//               objectFit: 'cover',
//               borderRadius: '6px',
//               cursor: 'pointer',
//               border: currentIndex === idx ? '3px solid #8b0000' : '3px solid transparent',
//               opacity: currentIndex === idx ? 1 : 0.6,
//               transition: 'all 0.2s'
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };
// IMAGE VIEWER COMPONENT (responsive — no overflow on mobile)
const ImageViewer = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [currentIndex]);

  const handleNextImage = () => {
    if (currentIndex < images.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrevImage = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.5, 4));

  const handleZoomOut = () => {
    setScale((prev) => {
      const newScale = Math.max(prev - 0.5, 1);
      if (newScale === 1) setPosition({ x: 0, y: 0 });
      return newScale;
    });
  };

  const handleMouseDown = (e) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e) => {
    if (scale > 1 && e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      });
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging && scale > 1 && e.touches.length === 1) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      });
    }
  };

  const handleTouchEnd = () => setIsDragging(false);

  return (
    <div
      className="ivOverlay"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="ivTopbar">
        <span className="ivCounter">
          {currentIndex + 1} / {images.length}
        </span>

        <button className="ivCloseBtn" onClick={onClose} aria-label="Close viewer">
          <FiX />
        </button>
      </div>

      <div
        className="ivMain"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{ cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
      >
        <img
          className="ivImg"
          src={getPhotoUrl(images[currentIndex])}
          alt={`Property ${currentIndex + 1}`}
          draggable={false}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.2s ease'
          }}
        />
      </div>

      <div className="ivControls">
        <button className="ivCtrlBtn" onClick={handleZoomOut} disabled={scale <= 1} aria-label="Zoom out">
          <FiZoomOut />
        </button>

        <span className="ivZoomText">{Math.round(scale * 100)}%</span>

        <button className="ivCtrlBtn" onClick={handleZoomIn} disabled={scale >= 4} aria-label="Zoom in">
          <FiZoomIn />
        </button>
      </div>

      {currentIndex > 0 && (
        <button className="ivNavBtn ivPrev" onClick={handlePrevImage} aria-label="Previous image">
          <ChevronLeft size={24} />
        </button>
      )}

      {currentIndex < images.length - 1 && (
        <button className="ivNavBtn ivNext" onClick={handleNextImage} aria-label="Next image">
          <ChevronRight size={24} />
        </button>
      )}

      <div className="ivThumbs">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={getPhotoUrl(img)}
            alt={`Thumbnail ${idx + 1}`}
            onClick={() => setCurrentIndex(idx)}
            className={`ivThumb ${currentIndex === idx ? 'ivThumbActive' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

// CALENDAR COMPONENT
const Calendar = ({ selectedDates, onDateSelect, minDate = new Date(), disabledDateSet = new Set(), onInvalidRange }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [checkInDate, setCheckInDate] = useState(selectedDates.checkInDate ? new Date(selectedDates.checkInDate) : null);
  const [checkOutDate, setCheckOutDate] = useState(selectedDates.checkOutDate ? new Date(selectedDates.checkOutDate) : null);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    const days = [];
    for (let i = 0; i < startingDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
    return days;
  };

  const isDateDisabled = (date) => {
    if (!date) return true;
    const dateStr = date.toISOString().split('T')[0];
    return date < minDate || disabledDateSet.has(dateStr);
  };

  const isDateSelected = (date) => {
    if (!date) return false;
    const dateStr = date.toISOString().split('T')[0];
    return (checkInDate && dateStr === checkInDate.toISOString().split('T')[0]) ||
           (checkOutDate && dateStr === checkOutDate.toISOString().split('T')[0]);
  };

  const isDateInRange = (date) => {
    if (!date || !checkInDate || !checkOutDate) return false;
    const dateStr = date.toISOString().split('T')[0];
    const checkInStr = checkInDate.toISOString().split('T')[0];
    const checkOutStr = checkOutDate.toISOString().split('T')[0];
    return dateStr > checkInStr && dateStr < checkOutStr;
  };

  const handleDateClick = (date) => {
    if (!date || isDateDisabled(date)) return;

    const hasBlockedDateInRange = (start, end) => {
      if (!start || !end) return false;
      const s = new Date(start.getFullYear(), start.getMonth(), start.getDate());
      const e = new Date(end.getFullYear(), end.getMonth(), end.getDate());
      for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
        const dStr = d.toISOString().split('T')[0];
        if (disabledDateSet.has(dStr)) return true;
      }
      return false;
    };

    if (!checkInDate || (checkInDate && checkOutDate)) {
      setCheckInDate(date);
      setCheckOutDate(null);
    } else {
      if (date > checkInDate) {
        if (hasBlockedDateInRange(checkInDate, date)) {
          onInvalidRange && onInvalidRange('Selected range includes unavailable dates. Please choose different dates.');
          return;
        }
        setCheckOutDate(date);
        onDateSelect({
          checkInDate: checkInDate.toISOString().split('T')[0],
          checkOutDate: date.toISOString().split('T')[0]
        });
      } else {
        if (hasBlockedDateInRange(date, checkInDate)) {
          onInvalidRange && onInvalidRange('Selected range includes unavailable dates. Please choose different dates.');
          return;
        }
        setCheckInDate(date);
        setCheckOutDate(checkInDate);
        onDateSelect({
          checkInDate: date.toISOString().split('T')[0],
          checkOutDate: checkInDate.toISOString().split('T')[0]
        });
      }
    }
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div style={{ padding: '1rem', background: 'white', borderRadius: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))} style={{ padding: '8px', border: 'none', background: 'transparent', cursor: 'pointer' }}>
          <ChevronLeft size={20} />
        </button>
        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>
          {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} style={{ padding: '8px', border: 'none', background: 'transparent', cursor: 'pointer' }}>
          <ChevronRight size={20} />
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '1rem' }}>
        {daysOfWeek.map(day => (
          <div key={day} style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#666', padding: '8px 0' }}>
            {day}
          </div>
        ))}
        {days.map((date, index) => (
          <button
            key={index}
            onClick={() => handleDateClick(date)}
            disabled={!date || isDateDisabled(date)}
            style={{
              padding: '8px',
              border: 'none',
              borderRadius: '4px',
              cursor: date && !isDateDisabled(date) ? 'pointer' : 'not-allowed',
              background: !date ? 'transparent' : isDateDisabled(date) ? '#f1f1f1' : isDateSelected(date) ? '#8b0000' : isDateInRange(date) ? '#ffe5e5' : 'white',
              color: !date ? 'transparent' : isDateDisabled(date) ? '#ccc' : isDateSelected(date) ? 'white' : '#333',
              fontWeight: isDateSelected(date) ? '600' : 'normal'
            }}
          >
            {date ? date.getDate() : ''}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
        <div>
          <span style={{ fontSize: '0.85rem', color: '#666' }}>Check-in: </span>
          <span style={{ fontWeight: '600' }}>{checkInDate ? checkInDate.toLocaleDateString() : 'Not selected'}</span>
        </div>
        <div>
          <span style={{ fontSize: '0.85rem', color: '#666' }}>Check-out: </span>
          <span style={{ fontWeight: '600' }}>{checkOutDate ? checkOutDate.toLocaleDateString() : 'Not selected'}</span>
        </div>
      </div>
    </div>
  );
};

// MAIN COMPONENT
const PropertyDetailPage = () => {
  const [hostUser, setHostUser] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [viewerImageIndex, setViewerImageIndex] = useState(0);
  
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    checkInDate: '',
    checkOutDate: '',
    aadhaarVerified: false,
    passportVerified: false,
    uploadedPhoto: null,
    termsAgreed: false,
  });
  const [availabilityRequested, setAvailabilityRequested] = useState(false);

  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [isAadhaarLoading, setIsAadhaarLoading] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState('aadhaar');
  const [pricing, setPricing] = useState({ subtotal: 0, gst: 0, total: 0 });
  const [isPayNowEnabled, setIsPayNowEnabled] = useState(false);
  const [isPhotoUploading, setIsPhotoUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const [disabledDateSet, setDisabledDateSet] = useState(new Set());
  const [alertMessage, setAlertMessage] = useState(null);
  const [showRequestSentPopup, setShowRequestSentPopup] = useState(false);
  const [hostImage, setHostImage] = useState(null);


  const [passportFile, setPassportFile] = useState(null);
  const [isPassportLoading, setIsPassportLoading] = useState(false);
  const [passportError, setPassportError] = useState('');
  const [passportInput, setPassportInput] = useState('');

  const [bookingType, setBookingType] = useState(0);
  const [ownerApprovalStatus, setOwnerApprovalStatus] = useState(null);
  const [pricingMode, setPricingMode] = useState('monthly'); // 'monthly' | 'daily'

  const token = Cookies.get('jwttoken');
  let username = '';
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      username = decodedToken.username;
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  const steps = [
    'Property',
    'Terms',
    'Dates & Pricing',
    'Verification',
    'Photo Upload',
    'Payment',
  ];

  const getTotal = (arr) => {
    if (!Array.isArray(arr)) return 0;
    return arr.reduce((acc, curr) => acc + (Number(curr.count) || (typeof curr === 'number' ? curr : 0)), 0);
  };
  
  const getDisplayCount = (raw, parsed) => {
    const t = getTotal(parsed);
    if (t > 0) return t;
    return Number(raw) || 0;
  };

  const showAlert = (message) => setAlertMessage(message);
  const closeAlert = () => setAlertMessage(null);

  const CustomAlert = ({ message, onClose }) => (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', maxWidth: '400px', width: '90%' }}>
        <p style={{ marginBottom: '1.5rem' }}>{message}</p>
        <button onClick={onClose} style={{ width: '100%', padding: '12px', background: '#8b0000', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>OK</button>
      </div>
    </div>
  );

  const handleMainImageClick = () => {
    setViewerImageIndex(activeImg);
    setShowImageViewer(true);
  };

  const handleThumbnailClick = (index) => {
    setViewerImageIndex(index);
    setShowImageViewer(true);
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/properties/${id}`);
        const data = await res.json();
        const transformed = transformPropertyData(data?.data || data);
        setProperty(transformed);
        setBookingType(Number(transformed.booking_type || 0));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  useEffect(() => {
    if (formData.checkInDate && formData.checkOutDate && property) {
      const checkIn = new Date(formData.checkInDate);
      const checkOut = new Date(formData.checkOutDate);
      const diffTime = Math.abs(checkOut - checkIn);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      let subtotal = 0;
      if (property.property_category === 'PG') {
          if (pricingMode === 'daily') {
             // Daily Rent * Days
             const nightly = Number(property.meta?.perNightPrice) || 0;
             subtotal = nightly * diffDays;
          } else {
             // Monthly Rent (usually 1 month advance/token to book)
             // We can treat it as 1 Month Rent fixed, or calculate pro-rata?
             // Usually for PG booking, we just show 1 Month Rent.
             subtotal = Number(property.base_rate) || 0;
          }
      } else {
          // Standard Hotel/Stay logic (base_rate is usually per night)
          const pricePerNight = Number(property.base_rate) || 0;
          subtotal = diffDays * pricePerNight;
      }
      
      const gst = subtotal * 0.05;
      const total = subtotal + gst;
      setPricing({ subtotal, gst, total });
    } else {
      setPricing({ subtotal: 0, gst: 0, total: 0 });
    }
  }, [formData.checkInDate, formData.checkOutDate, property, pricingMode]);

  useEffect(() => {
    const allStepsComplete =
      (formData.checkInDate && formData.checkOutDate && pricing.total > 0) &&
      (formData.aadhaarVerified || formData.passportVerified) &&
      formData.uploadedPhoto;
    setIsPayNowEnabled(allStepsComplete);
  }, [formData, pricing]);

  useEffect(() => {
    if (showPaymentModal && step === 3) {
      const fetchCalendarBlockedDates = async () => {
        try {
          const validPropertyId = getValidPropertyId(id);
          const propertyKeyMap = { '2': 'tm-luxe-1', '1': 'tm-luxe-2' };
          const propertyKey = propertyKeyMap[validPropertyId] || 'tm-luxe-1';
          const { blocked } = await getCalendar(propertyKey);
          const disabledSet = buildDisabledDates(blocked || []);
          setDisabledDateSet(disabledSet);
        } catch (e) {
          console.error('Failed to load calendar blocked dates', e);
        }
      };
      fetchCalendarBlockedDates();
    }
  }, [showPaymentModal, step, id]);

  useEffect(() => {
    const fetchHostUser = async () => {
      if (!property?.owner_id) return;
      try {
        const res = await axios.get("https://townmanor.ai/api/users-list");
        const users = Array.isArray(res.data) ? res.data : [];
        const matchedUser = users.find((u) => String(u.id) === String(property.owner_id));
        if (matchedUser) {
          setHostUser({ name: matchedUser.username });
        }
      } catch (err) {
        console.error("Failed to fetch host user", err);
      }
    };
    fetchHostUser();
  }, [property]);
useEffect(() => {
  const fetchHostImage = async () => {
    if (!property?.owner_id) return;

    try {
      const res = await axios.get(
        `https://townmanor.ai/api/user-details?user_id=${property.owner_id}`
      );

      if (res.data?.profile_photo) {
        setHostImage(res.data.profile_photo);
      }
    } catch (error) {
      console.error("Failed to fetch host image", error);
    }
  };

  fetchHostImage();
}, [property?.owner_id]);

  const handleReserveClick = () => {
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }
    setAvailabilityRequested(false);
    setOwnerApprovalStatus(null);
    setShowPaymentModal(true);
    setStep(1);
  };

  const sendAvailabilityRequest = async ({ checkInDate, checkOutDate }) => {
    try {
      setOwnerApprovalStatus('pending');

      const payload = {
        property_id: property.id,
        username: username,
        start_date: checkInDate,
        end_date: checkOutDate
      };

      await axios.post(
        'https://townmanor.ai/api/booking-request',
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      showAlert('Request sent to owner for date confirmation.');
      setShowRequestSentPopup(true);

    } catch (err) {
      console.error(err);
      showAlert('Failed to send availability request');
      setOwnerApprovalStatus(null);
    }
  };

  const handleNext = () => {
    if (step === 3) {
      if (!formData.checkInDate || !formData.checkOutDate) return;
      if (bookingType === 1 && ownerApprovalStatus !== 'accepted') {
        showAlert('Please wait for owner approval before continuing.');
        return;
      }
    }

    if (step === 2 && !formData.termsAgreed) return;
    if (step === 3 && (!formData.checkInDate || !formData.checkOutDate || pricing.total <= 0)) return;
    if (step === 4 && !(formData.aadhaarVerified || formData.passportVerified)) return;
    if (step === 5 && !formData.uploadedPhoto) return;
    if (step < steps.length) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) handleFile(files[0]);
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) handleFile(files[0]);
  };

  const handleFile = async (file) => {
    if (file.type.startsWith('image/')) {
      setIsPhotoUploading(true);
      const formDataLocal = new FormData();
      formDataLocal.append('images', file);
      
      try {
        const response = await fetch('https://www.townmanor.ai/api/image/aws-upload-owner-images', {
          method: 'POST',
          body: formDataLocal,
        });
        const data = await response.json();
        if (!data || !data.fileUrls || data.fileUrls.length === 0) {
          throw new Error('Image URL not found in upload response.');
        }
        const imageUrl = data.fileUrls[0];
        setFormData(prev => ({ ...prev, uploadedPhoto: imageUrl }));
        showAlert('Photo uploaded successfully!');
      } catch (error) {
        console.error('Error uploading photo:', error);
        showAlert('Failed to upload photo. ' + (error.message || 'An unknown error occurred.'));
      } finally {
        setIsPhotoUploading(false);
      }
    } else {
      showAlert('Please upload a valid image file.');
    }
  };

  const handleVerifyAadhaar = async () => {
    setFormData(prev => ({ ...prev, aadhaarVerified: false }));
    if (!aadhaarNumber || !/^\d{12}$/.test(aadhaarNumber)) {
      showAlert('Please enter a valid 12-digit Aadhaar number (digits only, no spaces or dashes).');
      return;
    }
    if (/^[0-1]{12}$/.test(aadhaarNumber) || /^(\d)\1{11}$/.test(aadhaarNumber)) {
      showAlert('The Aadhaar number appears to be invalid. Please check and try again.');
      return;
    }
    setIsAadhaarLoading(true);
    showAlert('Verifying Aadhaar number. This may take a moment...');
    try {
      const response = await axios.post(
        'https://kyc-api.surepass.app/api/v1/aadhaar-validation/aadhaar-validation',
        { id_number: aadhaarNumber },
        {
          headers: {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMDE0NjA5NiwianRpIjoiNmM0YWMxNTMtNDE2MS00YzliLWI4N2EtZWIxYjhmNDRiOTU5IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnVzZXJuYW1lXzJ5MTV1OWk0MW10bjR3eWpsaTh6b2p6eXZiZEBzdXJlcGFzcy5pbyIsIm5iZiI6MTcxMDE0NjA5NiwiZXhwIjoyMzQwODY2MDk2LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsidXNlciJdfX0.DfipEQt4RqFBQbOK29jbQju3slpn0wF9aoccdmtIsPg',
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.data && response.data.success) {
        setFormData(prev => ({ ...prev, aadhaarVerified: true }));
        showAlert('Aadhaar verified successfully!');
      } else {
        const errorMessage = response.data?.message || 'Verification failed';
        showAlert(`Aadhaar verification failed: ${errorMessage}. Please ensure the number is correct and try again.`);
      }
    } catch (error) {
      console.error('Aadhaar verification error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Verification failed';
      showAlert(`Aadhaar verification failed: ${errorMessage}. Please try again later.`);
    } finally {
      setIsAadhaarLoading(false);
    }
  };
const guestPolicy = property?.guest_policy || {};


  const handlePassportFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPassportFile(file);
      setPassportError('');
    }
  };

  const handleVerifyPassport = async () => {
    setFormData(prev => ({ ...prev, passportVerified: false }));
    setPassportError('');
    if (!passportFile) {
      showAlert('Please upload an image or scan of the international passport to verify.');
      return;
    }
    setIsPassportLoading(true);
    showAlert('Verifying passport. Please wait...');
    try {
      const fd = new FormData();
      fd.append('file', passportFile);
      const response = await axios.post(
        'https://kyc-api.surepass.app/api/v1/ocr/international-passport-v2',
        fd,
        {
          headers: {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMDE0NjA5NiwianRpIjoiNmM0YWMxNTMtNDE2MS00YzliLWI4N2EtZWIxYjhmNDRiOTU5IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnVzZXJuYW1lXzJ5MTV1OWk0MW10bjR3eWpsaTh6b2p6eXZiZEBzdXJlcGFzcy5pbyIsIm5iZiI6MTcxMDE0NjA5NiwiZXhwIjoyMzQwODY2MDk2LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsidXNlciJdfX0.DfipEQt4RqFBQbOK29jbQju3slpn0wF9aoccdmtIsPg',
            'Accept': 'application/json'
          },
          timeout: 60000,
        }
      );
      if (response.data && (response.data.success || response.status === 200)) {
        const verificationData = response.data.data || response.data;
        setFormData(prev => ({ ...prev, passportVerified: true, verificationData }));
        showAlert('Passport verified successfully!');
      } else {
        const msg = response.data?.message || 'Verification failed';
        setPassportError(msg);
        showAlert(`Passport verification failed: ${msg}`);
      }
    } catch (error) {
      console.error('Passport verification error:', error);
      let errorMessage = 'Failed to verify passport. Please try again.';
      if (error.response) {
        errorMessage = error.response.data?.message || error.response.statusText || `Server error (${error.response.status})`;
      } else if (error.request) {
        errorMessage = 'No response from verification service. Please check your connection.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      setPassportError(errorMessage);
      showAlert(`Verification failed: ${errorMessage}`);
    } finally {
      setIsPassportLoading(false);
    }
  };

  const handlePayNow = async () => {
    if (!isPayNowEnabled || isSubmitting) return;
    setIsSubmitting(true);

    try {
      if (!(formData.aadhaarVerified || formData.passportVerified)) {
        showAlert('Please verify your Aadhaar or Passport before proceeding.');
        setIsSubmitting(false);
        return;
      }

      let userLocal = {};
      try {
        userLocal = JSON.parse(localStorage.getItem('user')) || {};
      } catch {}

      let userEmail = userLocal.email || 'guest@townmanor.ai';
      let userPhone = '9999999999';
      let finalUsername = userLocal.username || username || 'guest';

      if (username) {
        try {
          const userRes = await fetch(`https://townmanor.ai/api/user/${username}`);
          if (userRes.ok) {
            const userData = await userRes.json();
            userEmail = userData.email || userEmail;
            userPhone = userData.phone || userPhone;
          }
        } catch {}
      }

      const validPropertyId = getValidPropertyId(id);

      const bookingDetails = {
        property_id: validPropertyId,
        start_date: format(new Date(formData.checkInDate), 'yyyy-MM-dd'),
        end_date: format(new Date(formData.checkOutDate), 'yyyy-MM-dd'),
        username: finalUsername,
        phone_number: userPhone,
        aadhar_number: aadhaarNumber || passportInput || 'NOT_PROVIDED',
        user_photo: formData.uploadedPhoto || '',
        terms_verified: true,
        email: userEmail,
      };

      const { data } = await axios.post(
        'https://townmanor.ai/api/booking',
        bookingDetails,
        { headers: { 'Content-Type': 'application/json' } }
      );

      const newBookingId = data?.booking?.id || data?.booking_id || data?.id || data?.bookingId || null;

      if (!newBookingId) {
        throw new Error('Booking created but booking ID not returned');
      }

      if (data?.success && data?.booking) {
        const b = data.booking;
        showAlert(`Booking created successfully! Total: ₹${b.total_price}, Nights: ${b.nights}`);
      }

      localStorage.setItem('bookingId', String(newBookingId));
      await handleProceedToPayment(newBookingId);

    } catch (error) {
      console.error('Booking error:', error);
      const errorMsg = error.response?.data?.message || error.response?.data?.error || error.message || 'Booking failed';
      showAlert(`Booking failed: ${errorMsg}`);
      setIsSubmitting(false);
    }
  };

  const handleProceedToPayment = async (bookingIdParam) => {
    if (!bookingIdParam) {
      showAlert('Booking ID missing. Cannot proceed to payment.');
      setIsSubmitting(false);
      return;
    }
    
    try {
      localStorage.setItem('paymentType', 'coliving');
      localStorage.setItem('bookingId', String(bookingIdParam));
      
      const userResponse = await fetch(`https://www.townmanor.ai/api/user/${username}`);
      if (!userResponse.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await userResponse.json();

      const txnid = 'OID' + Date.now();

      const paymentData = {
        key: 'UvTrjC',
        txnid: txnid,
        amount: pricing.total.toFixed(2),
        productinfo: 'Room Booking',
        firstname: userData.name || username || 'Guest',
        email: userData.email || 'guest@townmanor.ai',
        phone: userData.phone || '9999999999',
        surl: `https://townmanor.ai/api/boster/payu/success?redirectUrl=https://www.ovika.co.in/success`,
        furl: `https://townmanor.ai/api/boster/payu/failure?redirectUrl=https://www.ovika.co.in/failure`,
        udf1: String(bookingIdParam),
        service_provider: 'payu_paisa'
      };

      const response = await axios.post('https://townmanor.ai/api/payu/payment', paymentData);

      if (!response.data || !response.data.paymentUrl || !response.data.params) {
        throw new Error('Invalid payment response received');
      }

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = response.data.paymentUrl;

      Object.entries(response.data.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = value.toString();
          form.appendChild(input);
        }
      });

      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);

    } catch (error) {
      console.error('Payment initiation failed:', error);
      showAlert(error.response?.data?.message || error.message || 'Failed to initiate payment. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="loader-screen"><div className="spinner"></div></div>;
  if (!property) return <div className="error-screen">Property not found</div>;

  const photos = property.photos || [];
  const baseRate = Number(property.base_rate) || 0;
  const nights = Number(property.number_of_nights) || 1;
  const fees = (Number(property.cleaning_fee)||0) + (Number(property.service_fee)||0);
  const total = (baseRate * nights) + fees;

  return (
    <div className="detail-page-wrapper">
      {alertMessage && <CustomAlert message={alertMessage} onClose={closeAlert} />}
      
      {showRequestSentPopup && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10001 }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '10px', maxWidth: '400px', width: '90%', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '1rem', color: '#8b0000' }}>Request Sent</h3>
            <p style={{ marginBottom: '1.5rem', color: '#555' }}>
              Your request has been sent to the owner for date confirmation. You will be notified once it is approved.
            </p>
            <button onClick={() => navigate('/')} style={{ width: '100%', padding: '12px', background: '#8b0000', color: 'white', border: 'none', borderRadius: '6px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer' }}>
              Go to Home
            </button>
          </div>
        </div>
      )}

      {showImageViewer && (
        <ImageViewer
          images={photos}
          initialIndex={viewerImageIndex}
          onClose={() => setShowImageViewer(false)}
        />
      )}

      {showPaymentModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 9999, overflow: 'auto', padding: '2rem 0' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', background: 'white', borderRadius: '12px', padding: '2rem', position: 'relative' }}>
            <button onClick={() => setShowPaymentModal(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem' }}>
              <FiX />
            </button>

            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
                {steps.map((stepName, index) => (
                  <div key={index} style={{ flex: 1, position: 'relative' }}>
                    {index < steps.length - 1 && (
                      <div style={{ position: 'absolute', top: '15px', left: '50%', right: '-50%', height: '3px', background: index < step ? '#8b0000' : '#e5e5e5', zIndex: 0 }}></div>
                    )}
                    <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                      <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: index + 1 <= step ? '#8b0000' : '#e5e5e5', color: index + 1 <= step ? 'white' : '#999', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.5rem', fontSize: '0.85rem', fontWeight: '600' }}>
                        {index + 1}
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: index + 1 === step ? '600' : 'normal', color: index + 1 === step ? '#8b0000' : '#666', display: 'block' }}>
                        {stepName}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ minHeight: '450px' }}>
              {step === 1 && (
                <div>
                  <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Property Details</h2>
                  <div style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '8px' }}>
                    <img src={getPhotoUrl(property.photos?.[0]) || 'https://via.placeholder.com/300x200'} alt="Property" style={{ width: '300px', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{property.property_name}</h3>
                      <p style={{ color: '#666', marginBottom: '0.5rem' }}>{property.address}, {property.city}</p>
                      <p style={{ color: '#555', marginBottom: '1rem', fontSize: '0.95rem' }}>{property.description}</p>
                      <p style={{ fontSize: '1.5rem', fontWeight: '600', color: '#8b0000' }}>
                        <MdCurrencyRupee style={{ display: 'inline', verticalAlign: 'middle' }} />
                        {formatCurrency(property.base_rate)}<span style={{ fontSize: '1rem', color: '#666' }}>/{property.property_category === 'PG' ? 'month' : 'night'}</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Terms & Conditions</h2>
                  <div style={{ maxHeight: '400px', overflow: 'auto', padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', marginBottom: '1.5rem' }}>
                    <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>1. Booking Agreement</p>
                    <p style={{ marginBottom: '1rem' }}>By confirming this booking, you agree to abide by all house rules, including check-in/check-out times, noise restrictions, and guest limits.</p>
                    <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>2. Cancellation Policy</p>
                    <p style={{ marginBottom: '1rem' }}>A full refund will be provided for cancellations made within 48 hours of booking, if the check-in date is at least 14 days away.</p>
                    <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>3. Damage & Liability</p>
                    <p style={{ marginBottom: '1rem' }}>Guests are responsible for any damage caused to the property and its contents during their stay.</p>
                    <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>4. Payment & Pricing</p>
                    <p style={{ marginBottom: '1rem' }}>All prices are final and non-negotiable. Payment must be completed in full before the reservation is confirmed.</p>
                    <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>5. Privacy</p>
                    <p style={{ marginBottom: '1rem' }}>Your personal information will be used solely for the purpose of this booking.</p>
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
                    <input type="checkbox" checked={formData.termsAgreed} onChange={(e) => setFormData({ ...formData, termsAgreed: e.target.checked })} style={{ marginRight: '0.75rem', width: '20px', height: '20px', cursor: 'pointer' }} />
                    <span style={{ fontSize: '1rem' }}>I have read and agree to the Terms & Conditions.</span>
                  </label>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Dates & Pricing</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                    <div>
                      {bookingType === 1 && ownerApprovalStatus === 'pending' && (
                        <div style={{ marginBottom: '1rem', padding: '12px', background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '6px', color: '#92400e', fontSize: '0.9rem', fontWeight: '500' }}>
                          ⏳ Request sent for date confirmation. Please wait for owner approval.
                        </div>
                      )}
                      <Calendar
                        selectedDates={{ checkInDate: formData.checkInDate, checkOutDate: formData.checkOutDate }}
                        onDateSelect={async (dates) => {
                          setFormData({ ...formData, ...dates });
                          if (bookingType === 1 && dates.checkInDate && dates.checkOutDate && !availabilityRequested) {
                            setAvailabilityRequested(true);
                            await sendAvailabilityRequest(dates);
                          }
                        }}
                        minDate={new Date()}
                        disabledDateSet={disabledDateSet}
                        onInvalidRange={showAlert}
                      />
                    </div>
                    <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', height: 'fit-content' }}>
                      <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Pricing Summary</h3>
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid #e5e5e5' }}>
                          <span>Subtotal</span>
                          <span><MdCurrencyRupee style={{ display: 'inline' }} />{pricing.subtotal.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid #e5e5e5' }}>
                          <span>Taxes & GST (5%)</span>
                          <span><MdCurrencyRupee style={{ display: 'inline' }} />{pricing.gst.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', fontSize: '1.2rem', color: '#8b0000' }}>
                          <span>Total Price</span>
                          <span><MdCurrencyRupee style={{ display: 'inline' }} />{pricing.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Verification</h2>
                  <div style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
                    <label style={{ marginRight: '1.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="verif-method" value="aadhaar" checked={verificationMethod === 'aadhaar'} onChange={() => setVerificationMethod('aadhaar')} style={{ marginRight: '0.5rem' }} />
                      <strong>Aadhaar Verification</strong>
                    </label>
                    <label style={{ cursor: 'pointer' }}>
                      <input type="radio" name="verif-method" value="passport" checked={verificationMethod === 'passport'} onChange={() => setVerificationMethod('passport')} style={{ marginRight: '0.5rem' }} />
                      <strong>International Passport</strong>
                    </label>
                  </div>

                  {verificationMethod === 'aadhaar' ? (
                    <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '8px' }}>
                      <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Aadhaar Verification</h3>
                      <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Enter Aadhaar Number</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          maxLength={12}
                          value={aadhaarNumber}
                          onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, ''))}
                          placeholder="12-digit Aadhaar number"
                          disabled={formData.aadhaarVerified}
                          style={{ width: '100%', padding: '14px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '1rem', background: formData.aadhaarVerified ? '#e8f5e9' : 'white' }}
                        />
                      </div>
                      <button
                        onClick={handleVerifyAadhaar}
                        disabled={formData.aadhaarVerified || !aadhaarNumber || isAadhaarLoading}
                        style={{ width: '100%', padding: '14px', background: formData.aadhaarVerified ? '#22c55e' : '#8b0000', color: 'white', border: 'none', borderRadius: '6px', cursor: formData.aadhaarVerified || !aadhaarNumber || isAadhaarLoading ? 'not-allowed' : 'pointer', fontSize: '1rem', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                      >
                        {formData.aadhaarVerified ? <><CheckCircle size={20} /> Verified</> : isAadhaarLoading ? <><Loader size={20} className="animate-spin" /> Verifying...</> : 'Verify Aadhaar'}
                      </button>
                    </div>
                  ) : (
                    <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '8px' }}>
                      <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>International Passport Verification</h3>
                      <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Upload Passport (photo/scan)</label>
                        <input
                          type="file"
                          accept="image/*,application/pdf"
                          onChange={handlePassportFileSelect}
                          disabled={formData.passportVerified || isPassportLoading}
                          style={{ width: '100%', padding: '14px', borderRadius: '6px', border: '1px solid #ddd', background: formData.passportVerified ? '#e8f5e9' : 'white', cursor: formData.passportVerified || isPassportLoading ? 'not-allowed' : 'pointer' }}
                        />
                        {passportFile && (
                          <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                            <strong>Selected:</strong> {passportFile.name} ({Math.round(passportFile.size / 1024)} KB)
                          </p>
                        )}
                      </div>
                      <button
                        onClick={handleVerifyPassport}
                        disabled={formData.passportVerified || !passportFile || isPassportLoading}
                        style={{ width: '100%', padding: '14px', background: formData.passportVerified ? '#22c55e' : '#8b0000', color: 'white', border: 'none', borderRadius: '6px', cursor: formData.passportVerified || !passportFile || isPassportLoading ? 'not-allowed' : 'pointer', fontSize: '1rem', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                      >
                        {formData.passportVerified ? <><CheckCircle size={20} /> Verified</> : isPassportLoading ? <><Loader size={20} className="animate-spin" /> Verifying...</> : 'Verify Passport'}
                      </button>
                      {passportError && <p style={{ color: 'red', marginTop: '1rem', fontSize: '0.9rem' }}>{passportError}</p>}
                    </div>
                  )}
                </div>
              )}

              {step === 5 && (
                <div>
                  <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Photo Upload</h2>
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleFileDrop}
                    onClick={() => !isPhotoUploading && fileInputRef.current.click()}
                    style={{ padding: '4rem 2rem', border: '3px dashed #ddd', borderRadius: '12px', textAlign: 'center', cursor: isPhotoUploading ? 'not-allowed' : 'pointer', background: '#f8fafc', transition: 'all 0.3s' }}
                  >
                    {isPhotoUploading ? (
                      <div>
                        <Loader size={56} className="animate-spin" style={{ margin: '0 auto 1rem', color: '#8b0000' }} />
                        <p style={{ fontSize: '1.1rem', color: '#666' }}>Uploading your photo...</p>
                      </div>
                    ) : (
                      <>
                        <UploadCloud size={56} style={{ margin: '0 auto 1rem', color: '#8b0000' }} />
                        <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Drag and drop your photo here</p>
                        <p style={{ color: '#666' }}>or click to browse</p>
                      </>
                    )}
                  </div>
                  <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} accept="image/*" />
                  {formData.uploadedPhoto && (
                    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                      <h3 style={{ marginBottom: '1rem' }}>Preview</h3>
                      <div style={{ display: 'inline-block', position: 'relative' }}>
                        <img src={formData.uploadedPhoto} alt="Uploaded Preview" style={{ maxWidth: '300px', maxHeight: '300px', borderRadius: '12px', border: '2px solid #22c55e' }} />
                        <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#22c55e', color: 'white', padding: '8px', borderRadius: '50%' }}>
                          <CheckCircle size={24} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {step === 6 && (
                <div>
                  <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>Complete Payment</h2>
                  <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2.5rem', background: '#f8fafc', borderRadius: '12px', textAlign: 'center' }}>
                    <div style={{ marginBottom: '2rem' }}>
                      <p style={{ fontSize: '1rem', color: '#666', marginBottom: '0.5rem' }}>Final Amount</p>
                      <p style={{ fontSize: '2.5rem', fontWeight: '700', color: '#8b0000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <MdOutlineCurrencyRupee size={40} />
                        {pricing.total.toFixed(2)}
                      </p>
                    </div>
                    <div style={{ marginBottom: '2rem', padding: '1rem', background: 'white', borderRadius: '8px', textAlign: 'left' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span>Check-in:</span>
                        <strong>{formData.checkInDate ? new Date(formData.checkInDate).toLocaleDateString() : '-'}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span>Check-out:</span>
                        <strong>{formData.checkOutDate ? new Date(formData.checkOutDate).toLocaleDateString() : '-'}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid #e5e5e5' }}>
                        <span>Property:</span>
                        <strong>{property.property_name}</strong>
                      </div>
                    </div>
                    <button
                      onClick={handlePayNow}
                      disabled={!isPayNowEnabled || isSubmitting}
                      style={{ width: '100%', padding: '18px', background: isPayNowEnabled && !isSubmitting ? '#8b0000' : '#ccc', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.2rem', cursor: isPayNowEnabled && !isSubmitting ? 'pointer' : 'not-allowed', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}
                    >
                      {isSubmitting ? <><Loader size={24} className="animate-spin" /> Processing Payment...</> : <>Pay Now <FiShield size={24} /></>}
                    </button>
                    {!isPayNowEnabled && (
                      <p style={{ marginTop: '1rem', color: '#ef4444', fontSize: '0.9rem' }}>
                        Please complete all previous steps to enable payment
                      </p>
                    )}
                    <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: '#666' }}>
                      <FiShield style={{ display: 'inline', verticalAlign: 'middle' }} /> Secure payment powered by PayU
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '2px solid #eee' }}>
              <button onClick={handlePrev} disabled={step === 1} style={{ padding: '12px 32px', background: step === 1 ? '#eee' : '#f8fafc', border: '2px solid #ddd', borderRadius: '8px', cursor: step === 1 ? 'not-allowed' : 'pointer', fontSize: '1rem', fontWeight: '600', color: step === 1 ? '#999' : '#333' }}>
                ← Previous
              </button>
              {!(bookingType === 1 && ownerApprovalStatus === 'pending') && (
                <button onClick={handleNext} style={{ padding: '12px 32px', background: '#8b0000', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer' }}>
                  Next →
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="detail-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft /> Back
        </button>
        <div className="header-actions">
          <button className="action-btn"><FiShare /> Share</button>
          <button className="action-btn"><FiHeart /> Save</button>
        </div>
      </div>

      <section className="title-section">
        <h1>{property.property_name}</h1>
        <div className="location-row">
          {/* <FiMapPin className="icon" /> */}
          <span>{property.address}, {property.city}</span>
          <span className="dot">•</span>
          <span className="rating"><FiStar className="star" /> New Listing</span>
        </div>
      </section>

      <section className="image-gallery">
        <div className="main-frame" onClick={handleMainImageClick} style={{ cursor: 'pointer' }}>
          <img src={getPhotoUrl(photos[activeImg]) || 'https://via.placeholder.com/800x500'} alt="Main Property" />
        </div>
        <div className="thumbnail-strip">
          {photos.map((p, idx) => (
            <div key={idx} className={`thumb-item ${activeImg === idx ? 'active' : ''}`} onClick={() => { setActiveImg(idx); handleThumbnailClick(idx); }} style={{ cursor: 'pointer' }}>
              <img src={getPhotoUrl(p)} alt={`Thumb ${idx}`} />
            </div>
          ))}
        </div>
      </section>

      <div className="content-grid">
        <div className="details-column">
          <div className="features-bar">
            <div className="feature-box">
              <BiBed className="f-icon"/>
              <div>
                <strong>{getDisplayCount(property.bedrooms, property.parsedBedrooms)}</strong>
                <span>Bedrooms</span>
              </div>
            </div>
            <div className="feature-box">
              <BiBath className="f-icon"/>
              <div>
                <strong>{getDisplayCount(property.bathrooms, property.parsedBathrooms)}</strong>
                <span>Bathrooms</span>
              </div>
            </div>
            <div className="feature-box">
              <BiArea className="f-icon"/>
              <div>
                <strong>{property.area || 'N/A'}</strong>
                <span>Sq Ft</span>
              </div>
            </div>
            <div className="feature-box">
              <FiUser className="f-icon"/>
              <div>
                <strong>{property.max_guests || 2}</strong>
                <span>Guests</span>
              </div>
            </div>
          </div>

          <div className="divider"></div>

       <div className="text-section about-mobile-wrap">
  <h3>About this space</h3>

  <div className="about-mobile-card">
    <p>{property.description || "No description provided."}</p>
  </div>
</div>


          {(property.parsedBedrooms?.length > 0 || property.parsedBathrooms?.length > 0) && (
            <>
              <div className="divider"></div>
              <div className="text-section">
                <h3>Room Arrangements</h3>
                <div className="room-breakdown-grid" style={{ marginLeft: "6px", display: 'flex', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                  {property.parsedBedrooms?.length > 0 && (
                    <div className="room-group">
                      <h4>Bedrooms</h4>
                      <ul style={{ listStyle: 'none', padding: 0, color: '#555' }}>
                        {property.parsedBedrooms.map((curr, i) => (
                          <li key={i} style={{ marginBottom: '4px' }}>
                            <strong>{curr.count}</strong> × {curr.type}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {property.parsedBathrooms?.length > 0 && (
                    <div className="room-group">
                      <h4>Bathrooms</h4>
                      <ul style={{ listStyle: 'none', padding: 0, color: '#555' }}>
                        {property.parsedBathrooms.map((curr, i) => (
                          <li key={i} style={{ marginBottom: '4px' }}>
                            <strong>{curr.count}</strong> × {curr.type}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {property.parsedBedrooms?.length > 0 && property.property_category === 'PG' && (
            <>
              <div className="divider"></div>
              <div className="text-section">
                <h3>Room Rates & Sharing Options</h3>
                <div className="amenities-grid">
                  {property.parsedBedrooms.map((curr, i) => (
                    <div key={i} className="amenity-card rule-card" style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#f8fafc' }}>
                      <div className="rule-info" style={{ width: '100%' }}>
                        <span className="rule-label" style={{ fontSize: '1rem', fontWeight: '600', color: '#1e293b' }}>{curr.type}</span>
                         <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', alignItems: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: '0.9rem', color: '#64748b' }}>{curr.count} Rooms</span>
                                <span style={{ fontSize: '0.85rem', color: '#334155', marginTop: '2px' }}>
                                    <span style={{ fontWeight: 600 }}>Washroom:</span> {curr.washroomType || "Attached"}
                                </span>
                            </div>
                            {curr.price ? (
                              <strong style={{ fontSize: '1.rem', color: '#8b0000' }}>₹{formatCurrency(curr.price)}<span style={{ fontSize: '0.8rem', color: '#666', fontWeight: 'normal' }}>/month</span></strong>
                            ) : (
                               <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Price on Request</span>
                            )}
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="divider"></div>

          <div className="text-section">
            <h3>What this place offers</h3>
            <div className="amenities-grid">
              {property.amenities.length > 0 ? property.amenities.map((am, i) => (
                <div key={i} className="amenity-item">
                  <FiCheck className="check-icon" /> {am}
                </div>
              )) : <p>No specific amenities listed.</p>}
            </div>
          </div>

          <div className="divider"></div>

          <div className="text-section">
            
        <h3>House Rules & Policies</h3>

<div className="amenities-grid">

  {/* Smoking */}
  <div className="amenity-card rule-card">
    <div className="rule-icon">
      {property.smoking_allowed ? <FiCheck className="text-green" /> : <FiXCircle className="text-red" />}
    </div>
    <div className="rule-info">
      <span className="rule-label">Smoking</span>
      <strong className={property.smoking_allowed ? "text-green" : "text-gray"}>
        {property.smoking_allowed ? 'Allowed' : 'Not allowed'}
      </strong>
    </div>
  </div>

  {/* Pets */}
  <div className="amenity-card rule-card">
    <div className="rule-icon">
      {property.pets_allowed ? <FiCheck className="text-green" /> : <FiXCircle className="text-red" />}
    </div>
    <div className="rule-info">
      <span className="rule-label">Pets</span>
      <strong className={property.pets_allowed ? "text-green" : "text-gray"}>
        {property.pets_allowed ? 'Allowed' : 'Not allowed'}
      </strong>
    </div>
  </div>

  {/* Events */}
  <div className="amenity-card rule-card">
    <div className="rule-icon">
      {property.events_allowed ? <FiCheck className="text-green" /> : <FiXCircle className="text-red" />}
    </div>
    <div className="rule-info">
      <span className="rule-label">Events</span>
      <strong className={property.events_allowed ? "text-green" : "text-gray"}>
        {property.events_allowed ? 'Allowed' : 'Not allowed'}
      </strong>
    </div>
  </div>

  {/* Alcohol */}
  <div className="amenity-card rule-card">
    <div className="rule-icon">
      {property.drinking_allowed ? <FiCheck className="text-green" /> : <FiXCircle className="text-red" />}
    </div>
    <div className="rule-info">
      <span className="rule-label">Alcohol</span>
      <strong className={property.drinking_allowed ? "text-green" : "text-gray"}>
        {property.drinking_allowed ? 'Allowed' : 'Not allowed'}
      </strong>
    </div>
  </div>

  {/* Outside Guests */}
  <div className="amenity-card rule-card">
    <div className="rule-icon">
      {property.outside_guests_allowed ? <FiCheck className="text-green" /> : <FiXCircle className="text-red" />}
    </div>
    <div className="rule-info">
      <span className="rule-label">Outside Guests</span>
      <strong className={property.outside_guests_allowed ? "text-green" : "text-gray"}>
        {property.outside_guests_allowed ? 'Allowed' : 'Not allowed'}
      </strong>
    </div>
  </div>

  {/* Family Allowed */}
  <div className="amenity-card rule-card">
    <div className="rule-icon">
      {guestPolicy.family_allowed ? <FiCheck className="text-green" /> : <FiXCircle className="text-red" />}
    </div>
    <div className="rule-info">
      <span className="rule-label">Family</span>
      <strong className={guestPolicy.family_allowed ? "text-green" : "text-gray"}>
        {guestPolicy.family_allowed ? 'Allowed' : 'Not allowed'}
      </strong>
    </div>
  </div>

  {/* Unmarried Couples */}
  <div className="amenity-card rule-card">
    <div className="rule-icon">
      {guestPolicy.unmarried_couple_allowed ? <FiCheck className="text-green" /> : <FiXCircle className="text-red" />}
    </div>
    <div className="rule-info">
      <span className="rule-label">Unmarried Couples</span>
      <strong className={guestPolicy.unmarried_couple_allowed ? "text-green" : "text-gray"}>
        {guestPolicy.unmarried_couple_allowed ? 'Allowed' : 'Not allowed'}
      </strong>
    </div>
  </div>
  {/* Bachelor Allowed */}
<div className="amenity-card rule-card">
  <div className="rule-icon">
    {(guestPolicy.bachelors_allowed || guestPolicy.Bechelors) ? (
      <FiCheck className="text-green" />
    ) : (
      <FiXCircle className="text-red" />
    )}
  </div>
  <div className="rule-info">
    <span className="rule-label">Bachelor</span>
    <strong
      className={(guestPolicy.bachelors_allowed || guestPolicy.Bechelors)
        ? "text-green"
        : "text-gray"}
    >
      {(guestPolicy.bachelors_allowed || guestPolicy.Bechelors)
        ? "Allowed"
        : "Not allowed"}
    </strong>
  </div>
</div>

{/* NOTICE PERIOD */}
{(property.noticePeriod || property.meta?.noticePeriod) && (
  <div className="amenity-card rule-card">
    <div className="rule-icon">
      <FiInfo style={{ color: '#3b82f6' }} />
    </div>
    <div className="rule-info">
      <span className="rule-label">Notice Period</span>
      <strong>{property.noticePeriod || property.meta?.noticePeriod} Days</strong>
    </div>
  </div>
)}

{/* LOCK-IN PERIOD */}
{(property.lockInPeriod || property.meta?.lockInPeriod) && (
  <div className="amenity-card rule-card">
    <div className="rule-icon">
      <FiLock style={{ color: '#3b82f6' }} />
    </div>
    <div className="rule-info">
      <span className="rule-label">Lock-in Period</span>
      <strong>{property.lockInPeriod || property.meta?.lockInPeriod} Months</strong>
    </div>
  </div>
)}

{/* ELECTRICITY CHARGES */}
{(property.electricityCharges || property.meta?.electricityCharges) && (
  <div className="amenity-card rule-card">
    <div className="rule-icon">
      <FiZap style={{ color: '#eab308' }} />
    </div>
    <div className="rule-info">
      <span className="rule-label">Electricity</span>
      <strong>{property.electricityCharges || property.meta?.electricityCharges}</strong>
    </div>
  </div>
)}


</div>

            
         {(property.cancellation_policy && property.cancellation_policy !== 'undefined') && (
  <div
    style={{
      marginTop: '1rem',
      padding: '12px',
      background: '#f8fafc',
      borderRadius: '8px',
      border: '1px solid #e2e8f0'
    }}
  >
    <strong
      style={{
        display: 'block',
        marginBottom: '6px',
        fontSize: '0.9rem'
      }}
    >
      Cancellation Policy
    </strong>

    <span style={{ color: '#475569' }}>
      {property.cancellation_policy}{' '}
      <a
        href="/refund-cancellation-policy"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          marginLeft: '6px',
          color: '#8b0000',
          fontWeight: '600',
          textDecoration: 'underline'
        }}
      >
        Read full policy
      </a>
    </span>
  </div>
)}

          </div>

          {/* ✅ PROFESSIONAL GUIDEBOOK SECTION */}
         {/* ✅ PROFESSIONAL GUIDEBOOK SECTION */}
{property?.guidebook && (
  <>
    <div className="divider"></div>

    <section className="gbWrap">
      <div className="gbHeader">
        <div>
          <h3 className="gbTitle">Local Guide</h3>
          <p className="gbSubTitle">
            Helpful local information for your stay (transport, dining, essentials, places).
          </p>
        </div>
      </div>

      <div className="gbGrid">
        {/* Transport */}
        {property.guidebook?.transport_tips && (
          <div className="gbCard">
            <div className="gbCardHeader">
              <div className="gbIconWrap">
                <Car size={18} />
              </div>
              <div className="gbCardHeaderText">
                <div className="gbCardTitle">Transport</div>
                <div className="gbCardMeta">Getting around nearby</div>
              </div>
            </div>

            <div className="gbRows">
              {property.guidebook.transport_tips.taxi && (
                <div className="gbRow">
                  <div className="gbRowLeft">
                    <MapPinIcon size={16} className="gbRowIcon" />
                    <span className="gbRowLabel">Taxi / Cab</span>
                  </div>
                  <div className="gbRowValue">{property.guidebook.transport_tips.taxi}</div>
                </div>
              )}

              {property.guidebook.transport_tips.parking && (
                <div className="gbRow">
                  <div className="gbRowLeft">
                    <ParkingCircle size={16} className="gbRowIcon" />
                    <span className="gbRowLabel">Parking</span>
                  </div>
                  <div className="gbRowValue">{property.guidebook.transport_tips.parking}</div>
                </div>
              )}

              {property.guidebook.transport_tips.local_travel && (
                <div className="gbRow">
                  <div className="gbRowLeft">
                    <Bus size={16} className="gbRowIcon" />
                    <span className="gbRowLabel">Local Travel</span>
                  </div>
                  <div className="gbRowValue">{property.guidebook.transport_tips.local_travel}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Cafes & Restaurants */}
        {Array.isArray(property.guidebook?.cafes_restaurants) &&
          property.guidebook.cafes_restaurants.length > 0 && (
            <div className="gbCard gbCardWide">
              <div className="gbCardHeader">
                <div className="gbIconWrap">
                  <UtensilsCrossed size={18} />
                </div>
                <div className="gbCardHeaderText">
                  <div className="gbCardTitle">Cafes & Restaurants</div>
                  <div className="gbCardMeta">
                    {property.guidebook.cafes_restaurants.length} nearby options
                  </div>
                </div>
              </div>

              <div className="gbTableWrap">
                <table className="gbTable">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th className="gbThRight">Distance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {property.guidebook.cafes_restaurants.map((item, idx) => (
                      <tr key={idx}>
                        <td className="gbTdName">{item?.name || '-'}</td>
                        <td className="gbTdRight">
                          {typeof item?.distance_m === 'number'
                            ? `${item.distance_m} m`
                            : (item?.distance_m ?? '-')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        {/* Essentials */}
        {property.guidebook?.essentials_nearby && (
          <div className="gbCard">
            <div className="gbCardHeader">
              <div className="gbIconWrap">
                <ShoppingBasket size={18} />
              </div>
              <div className="gbCardHeaderText">
                <div className="gbCardTitle">Essentials Nearby</div>
                <div className="gbCardMeta">Daily needs & services</div>
              </div>
            </div>

            <div className="gbRows">
              {property.guidebook.essentials_nearby.atm && (
                <div className="gbRow">
                  <div className="gbRowLeft">
                    <Landmark size={16} className="gbRowIcon" />
                    <span className="gbRowLabel">ATM</span>
                  </div>
                  <div className="gbRowValue">{property.guidebook.essentials_nearby.atm}</div>
                </div>
              )}

              {property.guidebook.essentials_nearby.grocery && (
                <div className="gbRow">
                  <div className="gbRowLeft">
                    <ShoppingBasket size={16} className="gbRowIcon" />
                    <span className="gbRowLabel">Grocery</span>
                  </div>
                  <div className="gbRowValue">{property.guidebook.essentials_nearby.grocery}</div>
                </div>
              )}

              {property.guidebook.essentials_nearby.medical && (
                <div className="gbRow">
                  <div className="gbRowLeft">
                    <HeartPulse size={16} className="gbRowIcon" />
                    <span className="gbRowLabel">Medical</span>
                  </div>
                  <div className="gbRowValue">{property.guidebook.essentials_nearby.medical}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Must Visit */}
        {Array.isArray(property.guidebook?.must_visit_places) &&
          property.guidebook.must_visit_places.length > 0 && (
            <div className="gbCard">
              <div className="gbCardHeader">
                <div className="gbIconWrap">
                  <MapPinIcon size={18} />
                </div>
                <div className="gbCardHeaderText">
                  <div className="gbCardTitle">Must-Visit Places</div>
                  <div className="gbCardMeta">
                    {property.guidebook.must_visit_places.length} recommendations
                  </div>
                </div>
              </div>

              <div className="gbList">
                {property.guidebook.must_visit_places.map((p, idx) => (
                  <div className="gbListItem" key={idx}>
                    <div className="gbListItemTop">
                      <span className="gbListItemTitle">{p?.place || '-'}</span>
                    </div>
                    {p?.best_time && (
                      <div className="gbListItemMeta">
                        <Clock size={14} />
                        <span>Best time: {p.best_time}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* House Tips */}
        {Array.isArray(property.guidebook?.house_specific_tips) &&
          property.guidebook.house_specific_tips.length > 0 && (
            <div className="gbCard gbCardWide">
              <div className="gbCardHeader">
                <div className="gbIconWrap">
                  <Lightbulb size={18} />
                </div>
                <div className="gbCardHeaderText">
                  <div className="gbCardTitle">House Tips</div>
                  <div className="gbCardMeta">
                    {property.guidebook.house_specific_tips.length} tips from host
                  </div>
                </div>
              </div>

              <ul className="gbTips">
                {property.guidebook.house_specific_tips.map((tip, idx) => (
                  <li key={idx} className="gbTip">
                    <span className="gbTipDot" />
                    <span className="gbTipText">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    </section>
  </>
)}

          <div className="divider"></div>

          <div style={{ margin: '2rem 0' }}>
            <div className="booking-card" style={{ position: 'static', maxWidth: 'none', boxShadow: 'none', border: '1px solid #e2e8f0', background: '#f8fafc' }}>
              
              {property.property_category === 'PG' && property.meta?.perNightPrice && (
                  <div style={{ padding: '10px 16px 0' }}>
                    <div style={{ display: 'flex', background: '#e2e8f0', borderRadius: '8px', padding: '4px' }}>
                      <button 
                         type="button"
                         onClick={() => setPricingMode('monthly')}
                         style={{ flex: 1, padding: '8px', borderRadius: '6px', border: 'none', background: pricingMode === 'monthly' ? '#fff' : 'transparent', fontWeight: pricingMode !== 'monthly' ? 400 : 700, color: pricingMode === 'monthly' ? '#8b0000' : '#64748b', cursor: 'pointer', transition: 'all 0.2s' }}
                      >
                         Monthly Stay
                      </button>
                      <button 
                         type="button"
                         onClick={() => setPricingMode('daily')}
                         style={{ flex: 1, padding: '8px', borderRadius: '6px', border: 'none', background: pricingMode === 'daily' ? '#fff' : 'transparent', fontWeight: pricingMode !== 'daily' ? 400 : 700, color: pricingMode === 'daily' ? '#8b0000' : '#64748b', cursor: 'pointer', transition: 'all 0.2s' }}
                      >
                         Short Stay (Daily)
                      </button>
                    </div>
                  </div>
              )}

              <div className="card-header">
                <div className="price-area">
                  <span className="amount">
                    ₹{formatCurrency(
                        property.property_category === 'PG' 
                           ? (pricingMode === 'daily' ? (property.meta?.perNightPrice || 0) : baseRate) 
                           : baseRate
                    )}
                  </span>
                  <span className="unit">
                    /{property.property_category === 'PG' 
                        ? (pricingMode === 'daily' ? 'night' : 'month') 
                        : (property.billing_cycle || 'night')}
                  </span>
                </div>
                <div className="review-badge">
                  <FiStar /> <span>New</span>
                </div>
              </div>

              <div className="booking-details">
                <div className="date-picker-mock">
                  <div className="date-box">
                    <label>{property.property_category === 'PG' && pricingMode === 'monthly' ? 'MOVE-IN DATE' : 'CHECK-IN'}</label>
                    <span>{property.check_in_time || '12:00 PM'}</span>
                  </div>
                  <div className="date-box">
                    <label>{property.property_category === 'PG' && pricingMode === 'monthly' ? 'DURATION' : 'CHECK-OUT'}</label>
                    <span>{property.check_out_time || '11:00 AM'}</span>
                  </div>
                </div>
                
                <div className="price-breakdown">
                  <div className="row">
                    <span>{property.property_category === 'PG' ? (pricingMode === 'daily' ? 'Seat Rent x Nights' : 'Monthly Rent (Advance)') : 'Base Fare'}</span>
                    <span>₹{formatCurrency(pricing.subtotal || (property.property_category === 'PG' && pricingMode === 'monthly' ? baseRate : 0))}</span>
                  </div>
                  {(property.cleaning_fee > 0) && (
                    <div className="row">
                      <span>{property.property_category === 'PG' ? 'Maintenance' : 'Cleaning Fee'}</span>
                      <span>₹{formatCurrency(property.cleaning_fee)}</span>
                    </div>
                  )}
                  {(property.securityDeposit || property.security_deposit || (property.meta && property.meta.securityDeposit)) && (
                    <div className="row">
                      <span>Security Deposit</span>
                      <span>₹{formatCurrency(property.securityDeposit || property.security_deposit || property.meta.securityDeposit)}</span>
                    </div>
                  )}
                  <div className="row total">
                    <span>Total before taxes</span>
                    <span>₹{formatCurrency(total)}</span>
                  </div>
                </div>

                <div style={{ margin: '1.5rem 0' }}>
                  <button className="reserve-btn" onClick={handleReserveClick}>Reserve Now</button>
                  <p className="hint" style={{ marginBottom: 0 }}>You won't be charged yet</p>
                </div>

                {bookingType === 1 && (
                  <div style={{ marginTop: '8px', padding: '10px', background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '6px', fontSize: '0.8rem', color: '#92400e' }}>
                    ⚠️ <strong>Owner approval required</strong><br />
                    Please select your dates. The owner will confirm availability before you can book.
                  </div>
                )}
              </div>

              <div className="card-footer">
                <FiShield className="shield-icon"/>
                <span>Secure Booking Guaranteed</span>
              </div>
            </div>
          </div>

          <div className="divider"></div>

          <div className="host-card">
          <div className="host-avatar">
  {hostImage ? (
    <img
      src={hostImage}
      alt="Host"
      style={{
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
border: "1px solid #e5e5e5",

        objectFit: "cover"
      }}
    />
  ) : (
    // <FiUser style={{color:"black"}} />
 
 <div
  style={{
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    background: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #e5e5e5",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  }}
>
  <UserCircle size={92} color="#c2772b"  />
</div>




  )}
</div>

            <div className="host-info">
              <h4>Hosted by {hostUser?.name || "Loading..."}</h4>
              <p style={{ fontSize: "0.85rem", color: "#777" }}>
                Property Owner
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;

