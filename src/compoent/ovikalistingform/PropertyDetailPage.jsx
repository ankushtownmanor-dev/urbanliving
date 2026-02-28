

import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { UserCircle } from "lucide-react";

import { 
  FiArrowLeft, FiMapPin, FiShare, FiHeart, FiCheck, FiXCircle,
  FiUser, FiCalendar, FiShield, FiStar, FiX, FiZoomIn, FiZoomOut,
  FiInfo, FiLock, FiZap, FiWind, FiCompass
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
  Building,
  CreditCard,
  ParkingCircle,
  Bus,
  UtensilsCrossed,
  Landmark,
  ShoppingBasket,
  HeartPulse,
  Lightbulb, 
  Clock, 
  Train, 
  ShoppingBag,
  Dumbbell,
  Pill,
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
      try { 
        const parsed = JSON.parse(field);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) { return []; }
    }
    return [];
  };

  const parseMeta = (meta) => {
      if (!meta) return {};
      if (typeof meta === 'object') return meta;
      try { return JSON.parse(meta); } catch (e) { return {}; }
  };

  const parsedMeta = parseMeta(data.meta);

  // Combine root and meta, preferring meta for nested fields
  const combined = {
    ...data,
    ...parsedMeta,
    meta: parsedMeta,
  };

  return {
    ...combined,
    amenities: parseJsonField(data.amenities || parsedMeta.amenities),
    photos: Array.isArray(data.photos) ? data.photos : (data.photos ? [data.photos] : []),
    parsedBedrooms: parseJsonField(data.bedrooms || parsedMeta.bedrooms),
    parsedBathrooms: parseJsonField(data.bathrooms || parsedMeta.bathrooms),
    guidebook: combined.guidebook || parsedMeta.guidebook || {},
    guest_policy: combined.guest_policy || parsedMeta.guest_policy || {}
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

const Calendar = ({ selectedDates, onDateSelect, minDate = new Date(), disabledDateSet = new Set(), onInvalidRange, currentMonth, setCurrentMonth }) => {
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
    const dateStr = toYMD(date);
    const minDateStr = toYMD(minDate);
    return dateStr < minDateStr || disabledDateSet.has(dateStr);
  };

  const isDateSelected = (date) => {
    if (!date) return false;
    const dateStr = toYMD(date);
    return (checkInDate && dateStr === toYMD(checkInDate)) ||
           (checkOutDate && dateStr === toYMD(checkOutDate));
  };

  const isDateInRange = (date) => {
    if (!date || !checkInDate || !checkOutDate) return false;
    const dateStr = toYMD(date);
    const checkInStr = toYMD(checkInDate);
    const checkOutStr = toYMD(checkOutDate);
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
          checkInDate: toYMD(checkInDate),
          checkOutDate: toYMD(date)
        });
      } else {
        if (hasBlockedDateInRange(date, checkInDate)) {
          onInvalidRange && onInvalidRange('Selected range includes unavailable dates. Please choose different dates.');
          return;
        }
        setCheckInDate(date);
        setCheckOutDate(checkInDate);
        onDateSelect({
          checkInDate: toYMD(date),
          checkOutDate: toYMD(checkInDate)
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

const LeadGenerationModal = ({ isOpen, onClose, propertyName, propertyId, user, roomType }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    message: ''
  });

  // Reset form when modal opens
  useEffect(() => {
    if(isOpen) {
        setForm(prev => ({
            ...prev,
            name: user?.name || prev.name,
            email: user?.email || prev.email,
            phone: user?.phone || prev.phone,
            message: roomType ? `I am interested in the ${roomType} option.` : ''
        }));
    }
  }, [isOpen, user, roomType]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const finalPropertyName = roomType 
        ? `${propertyName} - ${roomType}` 
        : propertyName;

      await axios.post('https://www.townmanor.ai/api/formlead/leads', {
        name: form.name,
        email: form.email,
        phone_number: form.phone, // Backend expects phone_number
        property_name: finalPropertyName,
        property_id: propertyId,
        purpose: form.message, // Mapping message to purpose
        city: 'N/A',
        source: 'Property Detail Page'
      });
      alert('Interest registered successfully! We will contact you soon.');
      onClose();
    } catch (error) {
      console.error(error);
      alert('Failed to submit request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.7)', zIndex: 10002,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backdropFilter: 'blur(5px)'
    }}>
      <div style={{
        background: 'white', padding: '2.5rem', borderRadius: '16px',
        width: '90%', maxWidth: '450px', position: 'relative',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '15px', right: '15px',
          background: '#f1f1f1', border: 'none', borderRadius: '50%', 
          width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.2rem', cursor: 'pointer', transition: 'background 0.2s'
        }}><FiX color="#333" /></button>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#1a1a1a', fontSize: '1.5rem', fontWeight: '700' }}>
               {roomType ? `Enquire for ${roomType}` : 'Interested in staying?'}
            </h3>
            <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.5' }}>
              Fill in your details below and our team will get back to you with the best personalized offer for <span style={{ fontWeight: '600', color: '#8b0000' }}>{propertyName}</span>.
            </p>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Full Name</label>
            <input 
              type="text" required
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
              placeholder="Enter your name"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s' }}
              onFocus={(e) => e.target.style.borderColor = '#8b0000'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Email Address</label>
            <input 
              type="email" required
              value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
              placeholder="Enter your email"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '1rem', outline: 'none' }}
              onFocus={(e) => e.target.style.borderColor = '#8b0000'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Phone Number</label>
            <input 
              type="tel" required
              value={form.phone}
              onChange={e => setForm({...form, phone: e.target.value})}
              placeholder="Enter your phone number"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '1rem', outline: 'none' }}
              onFocus={(e) => e.target.style.borderColor = '#8b0000'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <button type="submit" disabled={loading} style={{
            marginTop: '1rem', width: '100%', padding: '14px', background: 'linear-gradient(135deg, #8b0000 0%, #a50000 100%)', color: 'white',
            border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 6px -1px rgba(139, 0, 0, 0.2)', transition: 'transform 0.1s'
          }}>
            {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <Loader size={18} className="animate-spin" /> Sending...
                </span>
            ) : 'Request Callback'}
          </button>
        </form>
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
  const [pricing, setPricing] = useState({ subtotal: 0, discount: 0, discountPercentage: 0, gst: 0, total: 0, daysNeededForNextTier: 0, nextTierPercentage: 0 });
  const [isPayNowEnabled, setIsPayNowEnabled] = useState(false);
  const [isPhotoUploading, setIsPhotoUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const [disabledDateSet, setDisabledDateSet] = useState(new Set());
  const [alertMessage, setAlertMessage] = useState(null);
  const [showRequestSentPopup, setShowRequestSentPopup] = useState(false);
  const [hostImage, setHostImage] = useState(null);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [selectedRoomForLead, setSelectedRoomForLead] = useState(null);
  const [calendarViewMonth, setCalendarViewMonth] = useState(new Date());

  // Booking Request State
  const [bookingRequestStatus, setBookingRequestStatus] = useState(null); // 'pending', 'accepted', 'rejected', null
  const [userBookingRequests, setUserBookingRequests] = useState([]);


  const [passportFile, setPassportFile] = useState(null);
  const [isPassportLoading, setIsPassportLoading] = useState(false);
  const [passportError, setPassportError] = useState('');
  const [passportInput, setPassportInput] = useState('');

  const [bookingType, setBookingType] = useState(0);
  const [ownerApprovalStatus, setOwnerApprovalStatus] = useState(null);
  const [pricingMode, setPricingMode] = useState('daily'); // 'monthly' | 'daily'
  const [selectedPrice, setSelectedPrice] = useState(null);

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
    // Count objects with 'count' or 'bedCount', or use array length if it's a list of configurations
    const sum = arr.reduce((acc, curr) => acc + (Number(curr.count) || Number(curr.bedCount) || (typeof curr === 'number' ? curr : 0)), 0);
    return sum > 0 ? sum : arr.length;
  };
  
  const getDisplayCount = (raw, parsed) => {
    if (Array.isArray(parsed) && parsed.length > 0) {
        // If it's a configuration list, return the number of configurations (rooms)
        return parsed.length;
    }
    return Number(raw) || 0;
  };

  // AMENITIES MASTER FOR GROUPING RECOVERY
  const AMENITIES_GROUPS = {
    "Safety & Security": ["CCTV", "Security Guard", "Fire Extinguisher", "Intercom", "Biometric Entry", "Gated Community", "Fire Alarm", "Sprinklers", "Smoke Detectors", "Emergency Exit"],
    "Modern Living": ["Lift", "Power Backup", "Wi-Fi", "Swimming Pool", "Gym", "Clubhouse", "Modular Kitchen", "Chimney", "Central AC", "Smart Home Tech", "EV Charging Point"],
    "Basic Utilities": ["Water Supply 24/7", "Borewell", "Corporation Water", "Gas Pipeline", "Solar Water", "Reserved Parking", "Visitor Parking", "STP Plant", "Waste Management"],
    "Indoor Features": ["Air Conditioner", "Geyser", "RO Water", "Washing Machine", "Refrigerator", "Inverter", "Wardrobe", "Study Table", "Smart TV", "Gas Stove", "Dishwasher", "Microwave"],
    "Outer Spaces": ["Balcony", "Private Terrace", "Garden", "Park Area", "Pet Area", "Kids Play Area", "Club House", "Jogging Track"]
  };

  const getGroupedAmenities = (amenitiesArr) => {
    if (!Array.isArray(amenitiesArr)) return {};
    const grouped = {};
    Object.entries(AMENITIES_GROUPS).forEach(([group, list]) => {
      const found = amenitiesArr.filter(a => list.includes(a));
      if (found.length > 0) grouped[group] = found;
    });
    // Handle others
    const allCategorized = Object.values(AMENITIES_GROUPS).flat();
    const rest = amenitiesArr.filter(a => !allCategorized.includes(a));
    if (rest.length > 0) grouped["Others"] = rest;
    return grouped;
  };

  const groupedAmenities = getGroupedAmenities(property?.amenities);

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
    if (id) {
      const fetchProperty = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/properties/${id}`);
          const data = response.data;
          const transformed = transformPropertyData(data?.data || data);
          setProperty(transformed);
          setBookingType(Number(transformed.booking_type || 0));
          
          // Initial price setup
          const initialDaily = Number(transformed.meta?.perNightPrice) || 0;
          const initialMonthly = Number(transformed.price) || 0;
          
          if (transformed.property_category === 'PG') {
             // Always default to 'daily' mode so the Reserve button opens the Booking/Payment flow by default.
             // If perNightPrice is 0, it will show 0 but allow booking.
             setPricingMode('daily');
          }
        } catch (err) {
          console.error("Failed to fetch property", err);
        } finally {
          setLoading(false);
        }
      };
      fetchProperty();
    }
  }, [id]);

  useEffect(() => {
    // When switching modes, ensure selectedPrice is set appropriately
    if (property) {
        if (pricingMode === 'monthly' && !selectedPrice) {
            setSelectedPrice(Number(property.price));
        }
    }
  }, [pricingMode, property, selectedPrice]);

  useEffect(() => {
    let subtotal = 0;
    let discountAmount = 0;
    let discountPercentage = 0;
    let computedTotal = 0;
    let currentDays = 0;
    let nextTierDays = 0;
    let nextTierPercentage = 0;
    let daysNeededForNextTier = 0;

    const isPGMonthly = property?.property_category === 'PG' && pricingMode === 'monthly';
    const datesSelected = formData.checkInDate && formData.checkOutDate;

    if (property) {
      const isTMLuxe = property.property_name?.includes('TM Luxe');

      if (isPGMonthly) {
        // For PG Monthly, if selectedPrice is from a room config, it's already monthly.
        // If it's just from the top-level property.price (which is Nightly), we multiply by 30.
        const isFromRoom = property.parsedBedrooms?.some(r => Number(r.price) === selectedPrice);
        const monthly = (selectedPrice && isFromRoom) ? selectedPrice : ((selectedPrice || Number(property.price) || 0) * 30);
        subtotal = monthly;

        // For monthly mode, we assume at least 30 days unless dates are selected
        currentDays = 30;
        if (datesSelected) {
          const checkIn = new Date(formData.checkInDate);
          const checkOut = new Date(formData.checkOutDate);
          const diffTime = Math.abs(checkOut - checkIn);
          currentDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        }

        if (isTMLuxe) {
          if (currentDays > 30) {
            discountPercentage = 30;
          } else if (currentDays > 15) {
            discountPercentage = 15;
          }
        }
      } else if (datesSelected) {
          // Standard Daily/Other logic requiring dates
          const checkIn = new Date(formData.checkInDate);
          const checkOut = new Date(formData.checkOutDate);
          const diffTime = Math.abs(checkOut - checkIn);
          currentDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
          if (property.property_category === 'PG' && pricingMode === 'daily') {
             const nightly = Number(property.meta?.perNightPrice) || Number(property.price) || 0;
             subtotal = nightly * currentDays;
          } else {
             // Standard Hotel
             const price = Number(property.price) || 0;
             subtotal = price * currentDays;
          }

          if (isTMLuxe) {
            if (currentDays > 30) {
              discountPercentage = 30;
            } else if (currentDays > 15) {
              discountPercentage = 15;
            }
          }
      }

      // Calculate next tier info only for TM Luxe properties
      if (isTMLuxe && currentDays > 0) {
        if (currentDays <= 15) {
          nextTierDays = 16;
          nextTierPercentage = 15;
          daysNeededForNextTier = nextTierDays - currentDays;
        } else if (currentDays <= 30) {
          nextTierDays = 31;
          nextTierPercentage = 30;
          daysNeededForNextTier = nextTierDays - currentDays;
        }
      }
    }

    if (subtotal > 0) {
      discountAmount = (subtotal * discountPercentage) / 100;
      const amountAfterDiscount = subtotal - discountAmount;
      const gstAmount = amountAfterDiscount * 0.05;
      computedTotal = amountAfterDiscount + gstAmount;
      
      setPricing({ 
        subtotal: subtotal, 
        discount: discountAmount,
        discountPercentage: discountPercentage,
        gst: gstAmount, 
        total: computedTotal,
        daysNeededForNextTier: daysNeededForNextTier,
        nextTierPercentage: nextTierPercentage
      });
    } else {
      setPricing({ subtotal: 0, discount: 0, discountPercentage: 0, gst: 0, total: 0, daysNeededForNextTier: 0, nextTierPercentage: 0 });
    }
  }, [formData.checkInDate, formData.checkOutDate, property, pricingMode, selectedPrice]);

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

  // Fetch Booking Requests for User
  useEffect(() => {
    if (user?.username && property?.id) {
      axios.get(`https://townmanor.ai/api/booking-request?username=${user.username}`)
        .then(res => {
          if (res.data.success && Array.isArray(res.data.data)) {
            setUserBookingRequests(res.data.data);
            const req = res.data.data.find(r => r.property_id === property.id);
            if (req) {
              setBookingRequestStatus(req.status);
              if (req.status === 'accepted') setOwnerApprovalStatus('accepted');
            }
          }
        })
        .catch(err => console.error("Failed to fetch booking requests", err));
    }
  }, [user?.username, property?.id]);


  const handleReserveClick = () => {
    if (property?.property_category === 'PG' && pricingMode === 'monthly') {
        setSelectedRoomForLead(null); // General inquiry
        setShowLeadModal(true);
        return;
    }
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    // Booking Request Logic
    if (bookingType === 1) {
        if (bookingRequestStatus === 'pending') {
            showAlert("You have a pending request for this property. Please wait for the owner's approval.");
            return;
        }
        if (bookingRequestStatus === 'accepted') {
            // Proceed to payment directly
             setAvailabilityRequested(false);
             setShowPaymentModal(true);
             setStep(1);
             return;
        }
        // If no request or rejected, open modal to send request (Step 1)
        setAvailabilityRequested(false); 
        setShowPaymentModal(true); // Reusing payment modal for date selection
        setStep(1); 
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
        username: user?.username || username,
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
  const baseRate = Number(property.price) || 0;
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

      <LeadGenerationModal 
        isOpen={showLeadModal}
        onClose={() => setShowLeadModal(false)}
        propertyName={property.property_name}
        propertyId={property.id}
        user={user}
        roomType={selectedRoomForLead}
      />

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
                        {formatCurrency(property.price)}<span style={{ fontSize: '1rem', color: '#666' }}>/{property.property_category === 'PG' ? 'night' : (property.billing_cycle || 'night')}</span>
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
                        currentMonth={calendarViewMonth}
                        setCurrentMonth={setCalendarViewMonth}
                        onDateSelect={async (dates) => {
                          setFormData({ ...formData, ...dates });
                          if (dates.checkInDate && dates.checkOutDate) {
                            // Valid range selected
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
                        {pricing.discount > 0 && (
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid #e5e5e5', color: '#16a34a' }}>
                            <span>Stay Discount ({pricing.discountPercentage}%)</span>
                            <span>-<MdCurrencyRupee style={{ display: 'inline' }} />{pricing.discount.toFixed(2)}</span>
                          </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid #e5e5e5' }}>
                          <span>Taxes & GST (5%)</span>
                          <span><MdCurrencyRupee style={{ display: 'inline' }} />{pricing.gst.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', fontSize: '1.2rem', color: '#8b0000' }}>
                          <span>Total Price</span>
                          <span><MdCurrencyRupee style={{ display: 'inline' }} />{pricing.total.toFixed(2)}</span>
                        </div>
                        {pricing.discount > 0 && (
                          <div style={{ marginTop: '0.5rem', textAlign: 'right', color: '#16a34a', fontSize: '0.85rem', fontWeight: '600' }}>
                            You saved ₹{pricing.discount.toFixed(2)} on this stay!
                          </div>
                        )}
                        {pricing.daysNeededForNextTier > 0 && pricing.daysNeededForNextTier <= 5 && (
                          <div style={{ 
                            marginTop: '1rem', 
                            padding: '10px', 
                            background: '#eff6ff', 
                            borderRadius: '6px', 
                            border: '1px dashed #3b82f6',
                            fontSize: '0.85rem',
                            color: '#1e40af',
                            textAlign: 'center'
                          }}>
                            💡 Add <strong>{pricing.daysNeededForNextTier} {pricing.daysNeededForNextTier === 1 ? 'more day' : 'more days'}</strong> to get <strong>{pricing.nextTierPercentage}% discount!</strong>
                          </div>
                        )}
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
              {step === 3 && bookingType === 1 && bookingRequestStatus !== 'accepted' ? (
                <button 
                  onClick={() => sendAvailabilityRequest({ checkInDate: formData.checkInDate, checkOutDate: formData.checkOutDate })}
                  disabled={!formData.checkInDate || !formData.checkOutDate || ownerApprovalStatus === 'pending'}
                  style={{ padding: '12px 32px', background: ownerApprovalStatus === 'pending' ? '#ccc' : '#8b0000', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: ownerApprovalStatus === 'pending' ? 'not-allowed' : 'pointer' }}
                >
                  {ownerApprovalStatus === 'pending' ? "Request Sent" : "Send Booking Request"}
                </button>
              ) : (
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
                <span>{property.property_category === 'PG' ? 'Room Type' : 'Bedroom'}</span>
              </div>
            </div>
            <div className="feature-box">
              <BiBath className="f-icon"/>
              <div>
                <strong>{getDisplayCount(property.bathrooms, property.parsedBathrooms)}</strong>
                <span>Bathroom</span>
              </div>
            </div>
            {property.balconies > 0 && (
              <div className="feature-box">
                <FiWind className="f-icon"/>
                <div>
                  <strong>{property.balconies}</strong>
                  <span>Balcony</span>
                </div>
              </div>
            )}
            <div className="feature-box">
              <BiArea className="f-icon"/>
              <div>
                <strong>{property.area || 'N/A'}</strong>
                <span>Sq Ft</span>
              </div>
            </div>
            {property.facing && (
               <div className="feature-box">
                <FiCompass className="f-icon"/>
                <div>
                  <strong>{property.facing}</strong>
                  <span>Facing</span>
                </div>
               </div>
            )}
          </div>

          <div className="divider"></div>

       <div className="text-section about-mobile-wrap">
  <h3>About this space</h3>

  <div className="about-mobile-card">
    <p>{property.description || "No description provided."}</p>
  </div>
</div>


          {/* {(property.parsedBedrooms?.length > 0 || property.parsedBathrooms?.length > 0) && property.property_category !== 'PG' && (
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
          )} */}
          
{(property.parsedBedrooms?.length > 0 || property.parsedBathrooms?.length > 0) && property.property_category !== 'PG' && (
  <>
    <div className="divider"></div>
    <div className="text-section">
      <div className="rm-section-header">
        <div className="rm-section-left">
          <span className="rm-pill">Layout</span>
          <h3 className="rm-section-title">Room Arrangements</h3>
        </div>
        <div className="rm-section-stats">
          {property.parsedBedrooms?.length > 0 && (
            <div className="rm-stat-box">
              <span className="rm-stat-num">{property.parsedBedrooms.length}</span>
              <span className="rm-stat-lbl">Bedrooms</span>
            </div>
          )}
          {property.parsedBathrooms?.length > 0 && (
            <div className="rm-stat-box rm-stat-box--gold">
              <span className="rm-stat-num">{property.parsedBathrooms.length}</span>
              <span className="rm-stat-lbl">Bathrooms</span>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="rm-table-outer">
        <table className="rm-table">
          <thead>
            <tr>
              <th className="rm-th rm-th--room">Room</th>
              <th className="rm-th">Category</th>
              <th className="rm-th rm-th--price">Count</th>
            </tr>
          </thead>
          <tbody>
            {property.parsedBedrooms?.map((room, i) => (
              <tr key={`bed-${i}`} className={`rm-row ${!property.parsedBathrooms?.length && i === property.parsedBedrooms.length - 1 ? 'rm-row--last' : ''}`}>
                <td className="rm-td rm-td--room">
                  <div className="rm-room-cell">
                    <span className="rm-row-index">{String(i + 1).padStart(2, '0')}</span>
                    <div className="rm-room-info">
                      <span className="rm-room-name">{room.type || 'Bedroom'}</span>
                    </div>
                  </div>
                </td>
                <td className="rm-td">
                  <span className="rm-bath rm-bath--attached">
                    <span className="rm-bath-dot"></span>Bedroom
                  </span>
                </td>
                <td className="rm-td rm-td--price">
                  <div className="rm-price-cell">
                    <span className="rm-price-main">{room.count || 1}</span>
                    <span className="rm-price-unit"> unit{(room.count || 1) > 1 ? 's' : ''}</span>
                  </div>
                </td>
              </tr>
            ))}
            {property.parsedBathrooms?.map((bath, i) => (
              <tr key={`bath-${i}`} className={`rm-row ${i === property.parsedBathrooms.length - 1 ? 'rm-row--last' : ''}`}>
                <td className="rm-td rm-td--room">
                  <div className="rm-room-cell">
                    <span className="rm-row-index">{String((property.parsedBedrooms?.length || 0) + i + 1).padStart(2, '0')}</span>
                    <div className="rm-room-info">
                      <span className="rm-room-name">{bath.type || 'Bathroom'}</span>
                    </div>
                  </div>
                </td>
                <td className="rm-td">
                  <span className="rm-bath rm-bath--shared">
                    <span className="rm-bath-dot"></span>Bathroom
                  </span>
                </td>
                <td className="rm-td rm-td--price">
                  <div className="rm-price-cell">
                    <span className="rm-price-main">{bath.count || 1}</span>
                    <span className="rm-price-unit"> unit{(bath.count || 1) > 1 ? 's' : ''}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="rm-mobile-list">
        {[
          ...(property.parsedBedrooms || []).map(r => ({ ...r, _cat: 'Bedroom' })),
          ...(property.parsedBathrooms || []).map(r => ({ ...r, _cat: 'Bathroom' }))
        ].map((item, i) => (
          <div key={i} className="rm-mobile-card rm-mobile-card--simple">
            <div className="rm-mc-top">
              <div className="rm-mc-left">
                <span className="rm-mc-idx">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <div className="rm-mc-name">{item.type || item._cat}</div>
                </div>
              </div>
              <div className="rm-mc-price">
                <span className={`rm-bath ${item._cat === 'Bedroom' ? 'rm-bath--attached' : 'rm-bath--shared'}`}>
                  <span className="rm-bath-dot"></span>
                  {item._cat}
                </span>
              </div>
            </div>
            <div className="rm-mc-grid" style={{gridTemplateColumns:'1fr'}}>
              <div className="rm-mc-cell">
                <span className="rm-mc-label">Count</span>
                <span className="rm-area-val">{item.count || 1} unit{(item.count || 1) > 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
)}

          {/* {property.parsedBedrooms?.length > 0 && property.property_category === 'PG' && (
            <>
              <div className="divider"></div>
              <div className="text-section">
                <h3>Room Rates & Sharing Options</h3>
                <div className="room-rates-grid-comprehensive">
                  {property.parsedBedrooms.map((curr, i) => (
                    <div 
                        key={i} 
                        className="pg-room-card-premium" 
                        onClick={() => {
                            setSelectedRoomForLead(curr.type);
                            setShowLeadModal(true);
                        }}
                    >
                      <div className="pg-room-badge">
                        {curr.type}
                      </div>
                      
                      <div className="pg-room-content">
                        <div className="pg-room-main-info">
                            <div className="pg-room-pricing">
                                {curr.price ? (
                                    <>
                                        <span className="pg-rent-val">₹{formatCurrency(curr.price)}</span>
                                        <span className="pg-rent-unit">/month</span>
                                    </>
                                ) : <span className="pg-rent-unit">Price on Request</span>}
                            </div>
                            {curr.securityDeposit && (
                                <div className="pg-deposit-tag">
                                    Deposit: ₹{formatCurrency(curr.securityDeposit)}
                                </div>
                            )}
                        </div>

                        <div className="pg-room-specs">
                            <div className="spec-item"><BiBed /> {curr.bedType || 'Standard Bed'} ({curr.bedCount || 1})</div>
                            <div className="spec-item">
                                {curr.ac ? <span style={{color: '#16a34a'}}><FiZap /> AC Room</span> : <span style={{color: '#64748b'}}><FiZap /> Non-AC</span>}
                            </div>
                            <div className="spec-item"><BiBath /> {curr.attachedBathroom ? 'Attached Bath' : 'Shared Bath'}</div>
                            {curr.areaSqFt && <div className="spec-item"><BiArea /> {curr.areaSqFt} Sq Ft</div>}
                            {curr.windowType && <div className="spec-item"><FiWind /> {curr.windowType} Window</div>}
                            {curr.availabilityDate && (
                                <div className="spec-item" style={{color: '#8b0000', fontWeight: '500'}}>
                                    <FiCalendar /> Avail: {new Date(curr.availabilityDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                                </div>
                            )}
                        </div>

                        {curr.furnishingDetails?.length > 0 && (
                            <div className="pg-room-items">
                                <strong>In-room:</strong> {curr.furnishingDetails.join(", ")}
                            </div>
                        )}

                        <button className="pg-enquiry-btn">Enquire Now</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )} */}
          
{property.parsedBedrooms?.length > 0 && property.property_category === 'PG' && (
  <>
    <div className="divider"></div>
    <div className="text-section">
      <div className="rm-section-header">
        <div className="rm-section-left">
          <span className="rm-pill">Room Inventory</span>
          <h3 className="rm-section-title">Available Rooms & Rates</h3>
          <p className="rm-section-sub">
            {property.parsedBedrooms.length} room type{property.parsedBedrooms.length > 1 ? 's' : ''} · Starting{' '}
            <strong>
              ₹{Math.min(...property.parsedBedrooms.map(r => Number(r.price) || Infinity).filter(p => p < Infinity)).toLocaleString('en-IN')}
            </strong>/mo
          </p>
        </div>
        <div className="rm-section-stats">
          <div className="rm-stat-box">
            <span className="rm-stat-num">{property.parsedBedrooms.length}</span>
            <span className="rm-stat-lbl">Types</span>
          </div>
          <div className="rm-stat-box rm-stat-box--gold">
            <span className="rm-stat-num" style={{fontSize:'0.78rem'}}>
              ₹{Math.min(...property.parsedBedrooms.map(r => Number(r.price) || Infinity).filter(p => p < Infinity)).toLocaleString('en-IN')}
            </span>
            <span className="rm-stat-lbl">From</span>
          </div>
        </div>
      </div>

      {/* ── DESKTOP TABLE ── */}
      <div className="rm-table-outer">
        <table className="rm-table">
          <thead>
            <tr>
              <th className="rm-th rm-th--room">Room Type</th>
              <th className="rm-th">Bathroom</th>
              <th className="rm-th">Area</th>
              <th className="rm-th rm-th--price">Price / Month</th>
              <th className="rm-th">Available</th>
              <th className="rm-th rm-th--action"></th>
            </tr>
          </thead>
          <tbody>
            {property.parsedBedrooms.map((room, i) => {
              const price = Number(room.price) || 0;
              const hasAvail = room.availabilityDate;
              const isLast = i === property.parsedBedrooms.length - 1;
              return (
                <tr key={i} className={`rm-row ${isLast ? 'rm-row--last' : ''}`}>
                  <td className="rm-td rm-td--room">
                    <div className="rm-room-cell">
                      <span className="rm-row-index">{String(i + 1).padStart(2, '0')}</span>
                      <div className="rm-room-info">
                        <span className="rm-room-name">{room.type || 'Standard Room'}</span>
                        <div className="rm-room-tags">
                          {room.bedType && <span className="rm-tag">{room.bedType}</span>}
                          {room.ac && <span className="rm-tag rm-tag--ac">❄ AC</span>}
                          {room.furnished && <span className="rm-tag">Furnished</span>}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="rm-td">
                    <div className={`rm-bath ${room.attachedBathroom ? 'rm-bath--attached' : 'rm-bath--shared'}`}>
                      <span className="rm-bath-dot"></span>
                      <span>{room.attachedBathroom ? 'Attached' : 'Shared'}</span>
                    </div>
                  </td>
                  <td className="rm-td">
                    <span className="rm-area-val">{room.areaSqFt ? `${room.areaSqFt} sqft` : '—'}</span>
                  </td>
                  <td className="rm-td rm-td--price">
                    {price > 0 ? (
                      <div className="rm-price-cell">
                        <div style={{display:'flex',alignItems:'baseline',gap:'2px'}}>
                          <span className="rm-price-main">₹{price.toLocaleString('en-IN')}</span>
                          <span className="rm-price-unit">/mo</span>
                        </div>
                        {room.securityDeposit && (
                          <div className="rm-deposit">Dep: ₹{Number(room.securityDeposit).toLocaleString('en-IN')}</div>
                        )}
                      </div>
                    ) : <span className="rm-on-request">On Request</span>}
                  </td>
                  <td className="rm-td">
                    {hasAvail ? (
                      <div className="rm-avail rm-avail--date">
                        <span className="rm-avail-dot"></span>
                        {new Date(room.availabilityDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </div>
                    ) : (
                      <div className="rm-avail rm-avail--now">
                        <span className="rm-avail-dot"></span>Available Now
                      </div>
                    )}
                  </td>
                  <td className="rm-td rm-td--cta">
                    <button className="rm-enquire-btn" onClick={() => { setSelectedRoomForLead(room.type); setShowLeadModal(true); }}>
                      Enquire
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── MOBILE CARDS ── */}
      <div className="rm-mobile-list">
        {property.parsedBedrooms.map((room, i) => {
          const price = Number(room.price) || 0;
          const hasAvail = room.availabilityDate;
          return (
            <div key={i} className="rm-mobile-card">
              <div className="rm-mc-top">
                <div className="rm-mc-left">
                  <span className="rm-mc-idx">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <div className="rm-mc-name">{room.type || 'Standard Room'}</div>
                    <div className="rm-mc-tags">
                      {room.bedType && <span className="rm-tag">{room.bedType}</span>}
                      {room.ac && <span className="rm-tag rm-tag--ac">❄ AC</span>}
                    </div>
                  </div>
                </div>
                <div className="rm-mc-price">
                  {price > 0 ? (
                    <><span className="rm-mc-price-main">₹{price.toLocaleString('en-IN')}</span><span className="rm-mc-price-unit">/mo</span></>
                  ) : <span className="rm-on-request">On Request</span>}
                </div>
              </div>
              <div className="rm-mc-grid">
                <div className="rm-mc-cell">
                  <span className="rm-mc-label">Bathroom</span>
                  <div className={`rm-bath ${room.attachedBathroom ? 'rm-bath--attached' : 'rm-bath--shared'}`}>
                    <span className="rm-bath-dot"></span>
                    <span>{room.attachedBathroom ? 'Attached' : 'Shared'}</span>
                  </div>
                </div>
                <div className="rm-mc-cell">
                  <span className="rm-mc-label">Area</span>
                  <span className="rm-area-val">{room.areaSqFt ? `${room.areaSqFt} sqft` : '—'}</span>
                </div>
                <div className="rm-mc-cell">
                  <span className="rm-mc-label">Available</span>
                  {hasAvail ? (
                    <div className="rm-avail rm-avail--date"><span className="rm-avail-dot"></span>{new Date(room.availabilityDate).toLocaleDateString('en-IN', {day:'numeric',month:'short'})}</div>
                  ) : (
                    <div className="rm-avail rm-avail--now"><span className="rm-avail-dot"></span>Now</div>
                  )}
                </div>
                {room.securityDeposit && (
                  <div className="rm-mc-cell">
                    <span className="rm-mc-label">Deposit</span>
                    <span className="rm-area-val">₹{Number(room.securityDeposit).toLocaleString('en-IN')}</span>
                  </div>
                )}
              </div>
              {room.furnishingDetails?.length > 0 && (
                <div className="rm-mc-furnish">
                  {room.furnishingDetails.slice(0, 4).map((f, fi) => <span key={fi} className="rm-furnish-tag">{f}</span>)}
                  {room.furnishingDetails.length > 4 && <span className="rm-furnish-tag rm-furnish-more">+{room.furnishingDetails.length - 4}</span>}
                </div>
              )}
              <button className="rm-mc-enquire" onClick={() => { setSelectedRoomForLead(room.type); setShowLeadModal(true); }}>
                Enquire for this room
              </button>
            </div>
          );
        })}
      </div>

    </div>
  </>
)}

          <div className="divider"></div>

          {/* NEW SECTION: BUILDING & INFRASTRUCTURE */}
          {(property.waterSupply || property.electricityStatus || property.floorType || property.propertyAge || property.floorNo) && (
            <>
              <div className="text-section">
                <h3>Building & Infrastructure</h3>
                <div className="amenities-grid">
                  {property.floorNo && (
                    <div className="amenity-card rule-card">
                      <div className="rule-icon"><Building size={18} color="#64748b" /></div>
                      <div className="rule-info">
                        <span className="rule-label">Floor</span>
                        <strong>{property.floorNo} {property.totalFloors ? `of ${property.totalFloors}` : ''}</strong>
                      </div>
                    </div>
                  )}
                  {property.waterSupply && (
                    <div className="amenity-card rule-card">
                      <div className="rule-icon"><Bus size={18} color="#0ea5e9" /></div>
                      <div className="rule-info">
                        <span className="rule-label">Water Supply</span>
                        <strong>{property.waterSupply}</strong>
                      </div>
                    </div>
                  )}
                  {property.electricityStatus && (
                    <div className="amenity-card rule-card">
                      <div className="rule-icon"><FiZap color="#eab308" /></div>
                      <div className="rule-info">
                        <span className="rule-label">Power Status</span>
                        <strong>{property.electricityStatus}</strong>
                      </div>
                    </div>
                  )}
                  {property.floorType && (
                    <div className="amenity-card rule-card">
                      <div className="rule-icon"><BiArea color="#94a3b8" /></div>
                      <div className="rule-info">
                        <span className="rule-label">Flooring</span>
                        <strong>{property.floorType}</strong>
                      </div>
                    </div>
                  )}
                  {property.propertyAge && (
                    <div className="amenity-card rule-card">
                      <div className="rule-icon"><FiCalendar color="#6366f1" /></div>
                      <div className="rule-info">
                        <span className="rule-label">Property Age</span>
                        <strong>{property.propertyAge}</strong>
                      </div>
                    </div>
                  )}
                  {property.carParking && (
                    <div className="amenity-card rule-card">
                      <div className="rule-icon"><Car size={18} color="#334155" /></div>
                      <div className="rule-info">
                        <span className="rule-label">Parking</span>
                        <strong>{property.carParking}</strong>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="divider"></div>
            </>
          )}

          {/* NEW SECTION: FINANCIALS & BILLS */}
          {(property.securityDeposit || property.maintenanceCharge || property.availableFrom) && (
            <>
              <div className="text-section">
                <h3>Financials & Availability</h3>
                <div className="amenities-grid">
                  {property.securityDeposit && (
                    <div className="amenity-card rule-card">
                      <div className="rule-icon"><FiLock color="#8b0000" /></div>
                      <div className="rule-info">
                        <span className="rule-label">Security Deposit</span>
                        <strong>₹{formatCurrency(property.securityDeposit)}</strong>
                      </div>
                    </div>
                  )}
                  {property.maintenanceCharge && (
                    <div className="amenity-card rule-card">
                      <div className="rule-icon"><CreditCard size={18} color="#0ea5e9" /></div>
                      <div className="rule-info">
                        <span className="rule-label">Maintenance</span>
                        <strong>₹{formatCurrency(property.maintenanceCharge)} ({property.maintenanceCycle || 'Monthly'})</strong>
                      </div>
                    </div>
                  )}
                  {property.availableFrom && (
                    <div className="amenity-card rule-card">
                      <div className="rule-icon"><FiCalendar color="#16a34a" /></div>
                      <div className="rule-info">
                        <span className="rule-label">Available From</span>
                        <strong>{new Date(property.availableFrom).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</strong>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="divider"></div>
            </>
          )}

          <div className="text-section">
            <h3>Amenities & Features</h3>
            <div className="amenities-container-premium">
              {Object.entries(groupedAmenities).length > 0 ? (
                Object.entries(groupedAmenities).map(([group, list]) => (
                  <div key={group} className="amenity-group-detail">
                    <h4 className="amenity-group-title">{group}</h4>
                    <div className="amenities-grid">
                      {list.map((am, i) => (
                        <div key={i} className="amenity-item">
                          <FiCheck className="check-icon" /> {am}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p>No specific amenities listed.</p>
              )}
            </div>
          </div>

          <div className="divider"></div>

          <div className="text-section">
            
        <h3>House Rules & Policies</h3>

<div className="amenities-grid">

  {/* Smoking */}
  <div className="amenity-card rule-card">
    <div className="rule-icon">
      {(property.smoking_allowed || property.smokingAllowed || property.meta?.smokingAllowed) ? <FiCheck className="text-green" /> : <FiXCircle className="text-red" />}
    </div>
    <div className="rule-info">
      <span className="rule-label">Smoking</span>
      <strong className={(property.smoking_allowed || property.smokingAllowed || property.meta?.smokingAllowed) ? "text-green" : "text-gray"}>
        {(property.smoking_allowed || property.smokingAllowed || property.meta?.smokingAllowed) ? 'Allowed' : 'Not allowed'}
      </strong>
    </div>
  </div>

  {/* Pets */}
  <div className="amenity-card rule-card">
    <div className="rule-icon">
      {(property.pets_allowed || property.petsAllowed || property.meta?.petsAllowed) ? <FiCheck className="text-green" /> : <FiXCircle className="text-red" />}
    </div>
    <div className="rule-info">
      <span className="rule-label">Pets</span>
      <strong className={(property.pets_allowed || property.petsAllowed || property.meta?.petsAllowed) ? "text-green" : "text-gray"}>
        {(property.pets_allowed || property.petsAllowed || property.meta?.petsAllowed) ? 'Allowed' : 'Not allowed'}
      </strong>
    </div>
  </div>

  {/* Events */}
  <div className="amenity-card rule-card">
    <div className="rule-icon">
      {(property.events_allowed || property.eventsAllowed || property.meta?.eventsAllowed) ? <FiCheck className="text-green" /> : <FiXCircle className="text-red" />}
    </div>
    <div className="rule-info">
      <span className="rule-label">Events</span>
      <strong className={(property.events_allowed || property.eventsAllowed || property.meta?.eventsAllowed) ? "text-green" : "text-gray"}>
        {(property.events_allowed || property.eventsAllowed || property.meta?.eventsAllowed) ? 'Allowed' : 'Not allowed'}
      </strong>
    </div>
  </div>

  {/* Alcohol */}
  <div className="amenity-card rule-card">
    <div className="rule-icon">
      {(property.drinking_allowed || property.drinkingAllowed || property.meta?.drinkingAllowed) ? <FiCheck className="text-green" /> : <FiXCircle className="text-red" />}
    </div>
    <div className="rule-info">
      <span className="rule-label">Alcohol</span>
      <strong className={(property.drinking_allowed || property.drinkingAllowed || property.meta?.drinkingAllowed) ? "text-green" : "text-gray"}>
        {(property.drinking_allowed || property.drinkingAllowed || property.meta?.drinkingAllowed) ? 'Allowed' : 'Not allowed'}
      </strong>
    </div>
  </div>

  {/* Outside Guests */}
  <div className="amenity-card rule-card">
    <div className="rule-icon">
      {(property.outside_guests_allowed || property.outsideGuestsAllowed || property.meta?.outsideGuestsAllowed) ? <FiCheck className="text-green" /> : <FiXCircle className="text-red" />}
    </div>
    <div className="rule-info">
      <span className="rule-label">Outside Guests</span>
      <strong className={(property.outside_guests_allowed || property.outsideGuestsAllowed || property.meta?.outsideGuestsAllowed) ? "text-green" : "text-gray"}>
        {(property.outside_guests_allowed || property.outsideGuestsAllowed || property.meta?.outsideGuestsAllowed) ? 'Allowed' : 'Not allowed'}
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

  {/* Late Entry */}
  {property.houseRules?.includes("Late Entry Allowed") && (
    <div className="amenity-card rule-card">
      <div className="rule-icon"><FiCheck className="text-green" /></div>
      <div className="rule-info">
        <span className="rule-label">Late Entry</span>
        <strong className="text-green">Allowed</strong>
      </div>
    </div>
  )}

  {/* Friends Allowed */}
  {property.houseRules?.includes("Friends Allowed") && (
    <div className="amenity-card rule-card">
      <div className="rule-icon"><FiCheck className="text-green" /></div>
      <div className="rule-info">
        <span className="rule-label">Friends Entry</span>
        <strong className="text-green">Allowed</strong>
      </div>
    </div>
  )}

  {/* Veg Only */}
  {property.houseRules?.includes("Veg Only") && (
    <div className="amenity-card rule-card">
      <div className="rule-icon"><UtensilsCrossed size={18} className="text-green" /></div>
      <div className="rule-info">
        <span className="rule-label">Food Preference</span>
        <strong className="text-green">Pure Veg Only</strong>
      </div>
    </div>
  )}

  {/* GF/BF Entry */}
  {property.houseRules?.includes("Girlfriend/Boyfriend Entry Allowed") && (
    <div className="amenity-card rule-card">
      <div className="rule-icon"><FiCheck className="text-green" /></div>
      <div className="rule-info">
        <span className="rule-label">Partner Entry</span>
        <strong className="text-green">Allowed</strong>
      </div>
    </div>
  )}

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

{/* WATER CHARGES */}
{(property.waterCharges || property.meta?.waterCharges) && (
  <div className="amenity-card rule-card">
    <div className="rule-icon">
      <Bus size={18} color="#0ea5e9" />
    </div>
    <div className="rule-info">
      <span className="rule-label">Water Bill</span>
      <strong>{property.waterCharges || property.meta?.waterCharges}</strong>
    </div>
  </div>
)}

{/* GATE CLOSING TIME */}
{(property.gateClosingTime || property.meta?.gateClosingTime || (property.property_category === 'PG' && property.check_in_time)) && (
  <div className="amenity-card rule-card">
    <div className="rule-icon">
      <Clock size={18} color="#ef4444" />
    </div>
    <div className="rule-info">
      <span className="rule-label">Gate Closing</span>
      <strong>{property.gateClosingTime || property.meta?.gateClosingTime || property.check_in_time}</strong>
    </div>
  </div>
)}

  {/* FOOD */}
  {(property.foodAvailable !== undefined || property.meta?.foodAvailable !== undefined) && (
    <div className="amenity-card rule-card">
      <div className="rule-icon">
        {property.foodAvailable || property.meta?.foodAvailable ? <UtensilsCrossed size={18} className="text-green" /> : <FiXCircle className="text-red" />}
      </div>
      <div className="rule-info">
        <span className="rule-label">Food</span>
        <strong>{property.foodAvailable || property.meta?.foodAvailable ? 'Included' : 'Not included'}</strong>
        {(property.foodAvailable || property.meta?.foodAvailable) && property.foodDetails && (
          <div style={{fontSize: '0.75rem', color: '#64748b'}}>
            {[
              property.foodDetails.breakfast && 'Breakfast',
              property.foodDetails.lunch && 'Lunch',
              property.foodDetails.dinner && 'Dinner'
            ].filter(Boolean).join(', ')}
          </div>
        )}
      </div>
    </div>
  )}

  {/* PREFERRED TENANTS */}
  {(property.preferredTenants?.length > 0) && (
    <div className="amenity-card rule-card">
      <div className="rule-icon"><Users size={18} color="#6366f1" /></div>
      <div className="rule-info">
        <span className="rule-label">Preferred Tenant</span>
        <strong>{property.preferredTenants.join(", ")}</strong>
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

              {/* NEW: Metro & Bus from PG Form */}
              {property.guidebook.transport_tips.metro && (
                <div className="gbRow">
                  <div className="gbRowLeft">
                    <Train size={16} className="gbRowIcon" />
                    <span className="gbRowLabel">Metro Station</span>
                  </div>
                  <div className="gbRowValue">{property.guidebook.transport_tips.metro}</div>
                </div>
              )}

              {property.guidebook.transport_tips.bus && (
                <div className="gbRow">
                  <div className="gbRowLeft">
                    <Bus size={16} className="gbRowIcon" />
                    <span className="gbRowLabel">Bus Stop</span>
                  </div>
                  <div className="gbRowValue">{property.guidebook.transport_tips.bus}</div>
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

              {property.guidebook.essentials_nearby.shopping && (
                <div className="gbRow">
                  <div className="gbRowLeft">
                    <ShoppingBag size={16} className="gbRowIcon" />
                    <span className="gbRowLabel">Shopping</span>
                  </div>
                  <div className="gbRowValue">{property.guidebook.essentials_nearby.shopping}</div>
                </div>
              )}
              
              {property.guidebook.essentials_nearby.pharmacy && (
                <div className="gbRow">
                  <div className="gbRowLeft">
                    <Pill size={16} className="gbRowIcon" />
                    <span className="gbRowLabel">Pharmacy</span>
                  </div>
                  <div className="gbRowValue">{property.guidebook.essentials_nearby.pharmacy}</div>
                </div>
              )}

              {property.guidebook.essentials_nearby.gym && (
                <div className="gbRow">
                  <div className="gbRowLeft">
                    <Dumbbell size={16} className="gbRowIcon" />
                    <span className="gbRowLabel">Gym / Fitness</span>
                  </div>
                  <div className="gbRowValue">{property.guidebook.essentials_nearby.gym}</div>
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
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                      <span className="amount">
                        ₹{formatCurrency(
                            property.property_category === 'PG' 
                               ? (pricingMode === 'daily' ? (Number(property.meta?.perNightPrice) || Number(property.price) || 0) : (selectedPrice || property.price || 0)) 
                               : (property.price || 0)
                        )}
                      </span>
                      <span className="unit">
                        /{property.property_category === 'PG' ? (pricingMode === 'daily' ? 'night' : 'month') : (property.billing_cycle || 'night')}
                      </span>
                    </div>
                    {property.property_category === 'PG' && pricingMode === 'daily' && (
                      <span style={{ fontSize: '0.75rem', color: '#8b0000', fontWeight: '500', marginTop: '2px' }}>
                        * Flexible nightly stay enabled
                      </span>
                    )}
                  </div>
                </div>
                <div className="review-badge">
                  <FiStar /> <span>New</span>
                </div>
              </div>

              {property.property_category === 'PG' && pricingMode === 'daily' && (
                <div style={{ margin: '8px 16px', padding: '10px', background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: '8px', fontSize: '0.8rem', color: '#92400e', lineHeight: '1.4' }}>
                   <strong>Nightly Stay Write-up:</strong> Pay only for the nights you actually stay. Perfect for travelers, candidates appearing for exams, or short business trips. No long-term commitment required.
                </div>
              )}

              <div className="booking-details">
                <div className="date-picker-mock">
                  <div className="date-box">
                    <label>{property.property_category === 'PG' && pricingMode === 'monthly' ? 'MOVE-IN DATE' : 'CHECK-IN'}</label>
                    <span>{formData.checkInDate ? new Date(formData.checkInDate).toLocaleDateString() : (property.check_in_time || 'Select Date')}</span>
                  </div>
                  <div className="date-box">
                    <label>{property.property_category === 'PG' && pricingMode === 'monthly' ? 'NOTICE PERIOD' : 'CHECK-OUT'}</label>
                    <span>{property.property_category === 'PG' && pricingMode === 'monthly' ? `${property.noticePeriod || property.meta?.noticePeriod || 30} Days` : (formData.checkOutDate ? new Date(formData.checkOutDate).toLocaleDateString() : (property.check_out_time || 'Select Date'))}</span>
                  </div>
                </div>
                
                {/* Removed price breakdown as requested */}

                <div style={{ margin: '1.5rem 0' }}>
                  <button className="reserve-btn" onClick={handleReserveClick}>
                    {bookingType === 1 && bookingRequestStatus !== 'accepted' ? "Send Booking Request" : "Reserve Now"}
                  </button>
                  <p className="hint" style={{ marginBottom: 0 }}>
                      {bookingType === 1 && bookingRequestStatus !== 'accepted' ? "Send a request first" : "You won't be charged yet"}
                  </p>
                </div>

                {property.property_category === 'PG' && pricingMode === 'monthly' && property.parsedBedrooms?.length > 0 && (
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                     <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: '#334155' }}>Select Room Type:</h4>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {property.parsedBedrooms.map((room, idx) => {
                           const rPrice = Number(room.price) || 0;
                           const isSelected = selectedPrice === rPrice;
                           return (
                           <div 
                              key={idx} 
                              onClick={() => rPrice > 0 && setSelectedPrice(rPrice)}
                              style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                fontSize: '0.9rem', 
                                padding: '8px', 
                                borderRadius: '6px', 
                                cursor: rPrice > 0 ? 'pointer' : 'default',
                                background: isSelected ? '#fef2f2' : 'transparent',
                                border: isSelected ? '1px solid #8b0000' : '1px solid transparent'
                              }}
                           >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ 
                                    width: '16px', 
                                    height: '16px', 
                                    borderRadius: '50%', 
                                    border: isSelected ? '5px solid #8b0000' : '2px solid #cbd5e1',
                                    background: 'white' 
                                }}></div>
                                <span style={{ color: isSelected ? '#8b0000' : '#64748b', fontWeight: isSelected ? 600 : 400 }}>
                                    {room.type} <span style={{ fontSize: '0.8rem' }}>({room.washroomType})</span>
                                </span>
                              </div>
                              <span style={{ fontWeight: 600, color: '#0f172a' }}>
                                {rPrice ? `₹${formatCurrency(rPrice)}/mo` : 'N/A'}
                              </span>
                           </div>
                           );
                        })}
                     </div>
                  </div>
                )}

                {bookingType === 1 && (
                  <div style={{ marginTop: '8px', padding: '10px', background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '6px', fontSize: '0.8rem', color: '#92400e' }}>
                    {bookingRequestStatus === 'pending' ? (
                         <span>⏳ <strong>Request Pending</strong><br/>Waiting for owner approval.</span>
                    ) : bookingRequestStatus === 'accepted' ? (
                         <span>✅ <strong>Request Accepted!</strong><br/>You can now proceed to book.</span>
                    ) : (
                         <span>⚠️ <strong>Owner approval required</strong><br />Please send a booking request first.</span>
                    )}
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
                <img src={hostImage} alt="Host" className="host-img" />
              ) : (
                <UserCircle size={48} className="host-icon-fallback" />
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


