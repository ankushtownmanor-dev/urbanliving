// import { useState, useEffect, useRef } from 'react';
// import { CheckCircle, XCircle, UploadCloud, Loader, ChevronLeft, ChevronRight } from 'lucide-react';
// import './Payment.css';
// import { MdCurrencyRupee, MdOutlineCurrencyRupee } from 'react-icons/md';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import Cookies from 'js-cookie';
// import { format, differenceInDays } from 'date-fns';

// // Calendar Component
// const Calendar = ({ selectedDates, onDateSelect, minDate = new Date(), disabledDateSet = new Set(), onInvalidRange }) => {
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [view, setView] = useState('calendar'); // 'calendar' or 'checkout'
//   const [checkInDate, setCheckInDate] = useState(selectedDates.checkInDate ? new Date(selectedDates.checkInDate) : null);
//   const [checkOutDate, setCheckOutDate] = useState(selectedDates.checkOutDate ? new Date(selectedDates.checkOutDate) : null);

//   const months = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];

//   const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//   const getDaysInMonth = (date) => {
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const daysInMonth = lastDay.getDate();
//     const startingDay = firstDay.getDay();
    
//     const days = [];
    
//     // Add empty cells for days before the first day of the month
//     for (let i = 0; i < startingDay; i++) {
//       days.push(null);
//     }
    
//     // Add all days of the month
//     for (let i = 1; i <= daysInMonth; i++) {
//       days.push(new Date(year, month, i));
//     }
    
//     return days;
//   };

//   const isDateDisabled = (date) => {
//     if (!date) return true;
//     const dateStr = date.toISOString().split('T')[0];
//     return date < minDate || disabledDateSet.has(dateStr);
//   };

//   const isDateSelected = (date) => {
//     if (!date) return false;
//     const dateStr = date.toISOString().split('T')[0];
//     return (checkInDate && dateStr === checkInDate.toISOString().split('T')[0]) ||
//            (checkOutDate && dateStr === checkOutDate.toISOString().split('T')[0]);
//   };

//   const isDateInRange = (date) => {
//     if (!date || !checkInDate || !checkOutDate) return false;
//     const dateStr = date.toISOString().split('T')[0];
//     const checkInStr = checkInDate.toISOString().split('T')[0];
//     const checkOutStr = checkOutDate.toISOString().split('T')[0];
//     return dateStr > checkInStr && dateStr < checkOutStr;
//   };

//   const handleDateClick = (date) => {
//     if (!date || isDateDisabled(date)) return;

//     const hasBlockedDateInRange = (start, end) => {
//       if (!start || !end) return false;
//       const s = new Date(start.getFullYear(), start.getMonth(), start.getDate());
//       const e = new Date(end.getFullYear(), end.getMonth(), end.getDate());
//       // iterate from start to end (inclusive)
//       for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
//         const dStr = d.toISOString().split('T')[0];
//         if (disabledDateSet.has(dStr)) return true;
//       }
//       return false;
//     };

//     if (!checkInDate || (checkInDate && checkOutDate)) {
//       // Start new selection
//       setCheckInDate(date);
//       setCheckOutDate(null);
//     } else {
//       // Complete selection
//       if (date > checkInDate) {
//         // Validate range does not include disabled dates
//         if (hasBlockedDateInRange(checkInDate, date)) {
//           onInvalidRange && onInvalidRange('Selected range includes unavailable dates. Please choose different dates.');
//           return;
//         }
//         setCheckOutDate(date);
//         onDateSelect({
//           checkInDate: checkInDate.toISOString().split('T')[0],
//           checkOutDate: date.toISOString().split('T')[0]
//         });
//       } else {
//         // If selected date is before check-in, validate and swap them
//         if (hasBlockedDateInRange(date, checkInDate)) {
//           onInvalidRange && onInvalidRange('Selected range includes unavailable dates. Please choose different dates.');
//           return;
//         }
//         setCheckInDate(date);
//         setCheckOutDate(checkInDate);
//         onDateSelect({
//           checkInDate: date.toISOString().split('T')[0],
//           checkOutDate: checkInDate.toISOString().split('T')[0]
//         });
//       }
//     }
//   };

//   const nextMonth = () => {
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
//   };

//   const prevMonth = () => {
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
//   };

//   const days = getDaysInMonth(currentMonth);

//   return (
//     <div className="calendar-container">
//       <div className="calendar-header">
//         <button onClick={prevMonth} className="calendar-nav-button">
//           <ChevronLeft size={20} />
//         </button>
//         <h3 className="calendar-title">
//           {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
//         </h3>
//         <button onClick={nextMonth} className="calendar-nav-button">
//           <ChevronRight size={20} />
//         </button>
//       </div>

//       <div className="calendar-grid">
//         {/* Days of week header */}
//         {daysOfWeek.map(day => (
//           <div key={day} className="calendar-day-header">
//             {day}
//           </div>
//         ))}
        
//         {/* Calendar days */}
//         {days.map((date, index) => (
//           <button
//             key={index}
//             onClick={() => handleDateClick(date)}
//             disabled={!date || isDateDisabled(date)}
//             className={`calendar-day ${
//               !date ? 'calendar-day-empty' :
//               isDateDisabled(date) ? 'calendar-day-disabled' :
//               isDateSelected(date) ? 'calendar-day-selected' :
//               isDateInRange(date) ? 'calendar-day-in-range' :
//               'calendar-day-available'
//             }`}
//           >
//             {date ? date.getDate() : ''}
//           </button>
//         ))}
//       </div>

//       {/* Selected dates display */}
//       <div className="calendar-selection">
//         <div className="calendar-selection-item">
//           <span className="calendar-selection-label">Check-in:</span>
//           <span className="calendar-selection-date">
//             {checkInDate ? checkInDate.toLocaleDateString() : 'Not selected'}
//           </span>
//         </div>
//         <div className="calendar-selection-item">
//           <span className="calendar-selection-label">Check-out:</span>
//           <span className="calendar-selection-date">
//             {checkOutDate ? checkOutDate.toLocaleDateString() : 'Not selected'}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// function Payment() {
//     const [step, setStep] = useState(1);
//   const [property, setProperty] = useState(null);
//   const [propertyLoading, setPropertyLoading] = useState(true);
//   const [propertyError, setPropertyError] = useState('');
//   const [formData, setFormData] = useState({
//     termsAgreed: false,
//     checkInDate: '',
//     checkOutDate: '',
//     phoneOtpVerified: false,
//     aadhaarVerified: false,
//     uploadedPhoto: null,
//   });

//   // Phone & OTP state
//   const [phoneDigits, setPhoneDigits] = useState(Array(10).fill(''));
//   const [showOtpInputs, setShowOtpInputs] = useState(false);
//   const [otpDigits, setOtpDigits] = useState(Array(6).fill(''));
//   const [otpValue, setOtpValue] = useState('');
//   const [otpError, setOtpError] = useState('');
//   const phoneInputsRef = useRef([]);
//   const otpInputsRef = useRef([]);
//   const otpInputRef = useRef(null);

//   // Aadhaar state
//   const [aadhaarNumber, setAadhaarNumber] = useState('');
//   const [isAadhaarLoading, setIsAadhaarLoading] = useState(false);

//   // Calculate pricing dynamically based on dates
//   const [pricing, setPricing] = useState({
//     subtotal: 0,
//     gst: 0,
//     total: 0,
//   });

//   const [isPayNowEnabled, setIsPayNowEnabled] = useState(false);
//   const [isPhotoUploading, setIsPhotoUploading] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // References for file upload
//   const fileInputRef = useRef(null);

//   // Additional state for API integration
//   const [clientId, setClientId] = useState('');
//   const [phoneVerificationData, setPhoneVerificationData] = useState(null);
//   const [bookingId, setBookingId] = useState(null);
//   const [photoUploaded, setPhotoUploaded] = useState(false);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);

//   // Booking availability state
//   const [disabledDateSet, setDisabledDateSet] = useState(new Set());
//   const [bookingsLoading, setBookingsLoading] = useState(false);

//   // Persist step-wise progress in localStorage
//   const STORAGE_KEYS = {
//     step: 'payment_step',
//     formData: 'payment_formData',
//     phoneDigits: 'payment_phoneDigits',
//     otpDigits: 'payment_otpDigits',
//     aadhaar: 'payment_aadhaarNumber',
//   };
//   const hasLoadedFromStorageRef = useRef(false);

//   // Load saved progress on mount
//   useEffect(() => {
//     try {
//       const savedStepRaw = localStorage.getItem(STORAGE_KEYS.step);
//       const savedStep = savedStepRaw ? parseInt(savedStepRaw, 10) : null;
//       const savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEYS.formData) || '{}');
//       const savedPhoneDigits = JSON.parse(localStorage.getItem(STORAGE_KEYS.phoneDigits) || '[]');
//       const savedOtpDigits = JSON.parse(localStorage.getItem(STORAGE_KEYS.otpDigits) || '[]');
//       const savedAadhaar = localStorage.getItem(STORAGE_KEYS.aadhaar) || '';

//       if (!Number.isNaN(savedStep) && savedStep && savedStep >= 1 && savedStep <= 6) {
//         setStep(savedStep);
//       }
//       if (savedFormData && typeof savedFormData === 'object') {
//         setFormData(prev => ({ ...prev, ...savedFormData }));
//       }
//       if (Array.isArray(savedPhoneDigits) && savedPhoneDigits.length === 10) {
//         setPhoneDigits(savedPhoneDigits);
//       }
//       if (Array.isArray(savedOtpDigits) && savedOtpDigits.length === 6) {
//         setOtpDigits(savedOtpDigits);
//       }
//       if (savedAadhaar) {
//         setAadhaarNumber(savedAadhaar);
//       }
//     } catch (error) {
//       console.warn('Failed to restore payment progress from storage', error);
//     } finally {
//       hasLoadedFromStorageRef.current = true;
//     }
//   }, []);

//   // Persist progress whenever it changes
//   useEffect(() => {
//     if (!hasLoadedFromStorageRef.current) return;
//     localStorage.setItem(STORAGE_KEYS.step, String(step));
//   }, [step]);

//   useEffect(() => {
//     if (!hasLoadedFromStorageRef.current) return;
//     try {
//       localStorage.setItem(STORAGE_KEYS.formData, JSON.stringify(formData));
//     } catch {}
//   }, [formData]);

//   useEffect(() => {
//     if (!hasLoadedFromStorageRef.current) return;
//     try {
//       localStorage.setItem(STORAGE_KEYS.phoneDigits, JSON.stringify(phoneDigits));
//     } catch {}
//   }, [phoneDigits]);

//   useEffect(() => {
//     if (!hasLoadedFromStorageRef.current) return;
//     try {
//       localStorage.setItem(STORAGE_KEYS.otpDigits, JSON.stringify(otpDigits));
//     } catch {}
//   }, [otpDigits]);

//   useEffect(() => {
//     if (!hasLoadedFromStorageRef.current) return;
//     localStorage.setItem(STORAGE_KEYS.aadhaar, aadhaarNumber);
//   }, [aadhaarNumber]);

//   // Get user data from localStorage and cookies
//   const roomId = localStorage.getItem('roomId');
//   const userId = localStorage.getItem('propertyid');
//   const propertyId = localStorage.getItem('property_id');
//   const token = Cookies.get('jwttoken');
//   let username = '';
  
//   if (token) {
//     try {
//       const decodedToken = jwtDecode(token);
//       username = decodedToken.username;
//     } catch (error) {
//       console.error('Error decoding token:', error);
//     }
//   }

//   // Progress bar steps
//   const steps = [
//     'Property',
//     'Terms',
//     'Dates & Pricing',
//     'Verification',
//     'Photo Upload',
//     'Payment',
//   ];

//   // Logic to handle next step
//   const handleNext = () => {
//     // Validate each step before moving forward
//     if (step === 2 && !formData.termsAgreed) return;
//     if (step === 3 && (!formData.checkInDate || !formData.checkOutDate || pricing.total <= 0)) return;
//     if (step === 4 && (!formData.phoneOtpVerified || !formData.aadhaarVerified)) return;
//     if (step === 5 && !formData.uploadedPhoto) return;

//     if (step < steps.length) {
//       setStep(step + 1);
//     }
//   };

//   // Logic to handle previous step
//   const handlePrev = () => {
//     if (step > 1) {
//       setStep(step - 1);
//     }
//   };

//   // Calculate price whenever dates change
//   useEffect(() => {
//     if (formData.checkInDate && formData.checkOutDate) {
//       const checkIn = new Date(formData.checkInDate);
//       const checkOut = new Date(formData.checkOutDate);
//       const diffTime = Math.abs(checkOut - checkIn);
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
//       const pricePerNight = property?.per_night_price ? Number(property.per_night_price) : 0;
//       const subtotal = diffDays * pricePerNight;
//       const gst = subtotal * 0.05; // 18% GST
//       const total = subtotal + gst;

//       setPricing({ subtotal, gst, total });
//     } else {
//       setPricing({ subtotal: 0, gst: 0, total: 0 });
//     }
//   }, [formData.checkInDate, formData.checkOutDate, property]);

//   // Enable Pay Now button only when all steps are valid
//   useEffect(() => {
//     const allStepsComplete =
//       formData.termsAgreed &&
//       (formData.checkInDate && formData.checkOutDate && pricing.total > 0) &&
//       formData.phoneOtpVerified &&
//       formData.aadhaarVerified &&
//       formData.uploadedPhoto;
//     setIsPayNowEnabled(allStepsComplete);
//   }, [formData, pricing]);

//   // Fetch property details from API using property_id in localStorage
//   useEffect(() => {
//     const id = propertyId || '2';
//     const fetchProperty = async () => {
//       setPropertyLoading(true);
//       setPropertyError('');
//       try {
//         const res = await fetch(`https://townmanor.ai/api/properties/${id}`);
//         const json = await res.json();
//         if (json && json.success && json.property) {
//           setProperty(json.property);
//         } else {
//           setPropertyError('Failed to load property');
//         }
//       } catch (e) {
//         setPropertyError('Failed to load property');
//       } finally {
//         setPropertyLoading(false);
//       }
//     };
//     fetchProperty();
//   }, [propertyId]);

//   // Fetch booked dates (disabled) when on Step 3
//   useEffect(() => {
//     const fetchBookedDates = async () => {
//       try {
//         setBookingsLoading(true);
//         const res = await fetch('https://townmanor.ai/api/booking/dates');
//         const json = await res.json();
//         const pid = Number(propertyId || '2');
//         const bookings = Array.isArray(json?.bookings) ? json.bookings : [];
//         const filtered = bookings.filter(b => Number(b.property_id) === pid && Number(b.cancelled) === 0);
//         const dates = new Set();
//         // Disable from start_date through day before end_date (treat end as checkout)
//         filtered.forEach(b => {
//           const start = new Date(b.start_date);
//           const end = new Date(b.end_date);
//           for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
//             const dStr = d.toISOString().split('T')[0];
//             dates.add(dStr);
//           }
//         });
//         setDisabledDateSet(dates);
//       } catch (e) {
//         console.error('Failed to load booked dates', e);
//       } finally {
//         setBookingsLoading(false);
//       }
//     };

//     if (step === 3) {
//       fetchBookedDates();
//     }
//   }, [step, propertyId]);

//   // Handle file drop for photo upload
//   const handleFileDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const files = e.dataTransfer.files;
//     if (files.length > 0) {
//       handleFile(files[0]);
//     }
//   };

//   // Handle file selection from input
//   const handleFileChange = (e) => {
//     const files = e.target.files;
//     if (files.length > 0) {
//       handleFile(files[0]);
//     }
//   };

//   // Process the uploaded file
//   const handleFile = async (file) => {
//     if (file.type.startsWith('image/')) {
//       setIsPhotoUploading(true);
//       setUploading(true);
      
//       const formData = new FormData();
//       formData.append('images', file);
      
//       try {
//         const response = await fetch('https://www.townmanor.ai/api/image/aws-upload-owner-images', {
//           method: 'POST',
//           body: formData,
//         });
        
//         const data = await response.json();
//         console.log(data);
        
//         if (!data || !data.fileUrls || data.fileUrls.length === 0) {
//           throw new Error('Image URL not found in upload response.');
//         }

//         const imageUrl = data.fileUrls[0];
//         const photoUrl = imageUrl;
        
//         setFormData(prev => ({ ...prev, uploadedPhoto: photoUrl }));
//         setPhotoUploaded(true);
//         showAlert('Photo uploaded successfully!');

//       } catch (error) {
//         console.error('Error uploading photo:', error);
//         showAlert('Failed to upload photo. ' + (error.message || 'An unknown error occurred.'));
//       } finally {
//         setIsPhotoUploading(false);
//         setUploading(false);
//       }
//     } else {
//       showAlert('Please upload a valid image file.');
//     }
//   };

//   // Handle verification logic
//   const handleSendOtp = async (retryCount = 0) => {
//     const phone = phoneDigits.join('');
//     if (!phone || !/^\d{10}$/.test(phone)) {
//       showAlert('Please enter a valid 10-digit phone number.');
//       return;
//     }

//     // Don't allow multiple simultaneous requests
//     if (loading) return;

//     setLoading(true);
//     setOtpError('');

//     try {
//       const response = await axios.post(
//         'https://kyc-api.surepass.io/api/v1/telecom/generate-otp',
//         { id_number: phone },
//         {
//           headers: {
//             'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMDE0NjA5NiwianRpIjoiNmM0YWMxNTMtNDE2MS00YzliLWI4N2EtZWIxYjhmNDRiOTU5IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnVzZXJuYW1lXzJ5MTV1OWk0MW10bjR3eWpsaTh6b2p6eXZiZEBzdXJlcGFzcy5pbyIsIm5iZiI6MTcxMDE0NjA5NiwiZXhwIjoyMzQwODY2MDk2LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsidXNlciJdfX0.DfipEQt4RqFBQbOK29jbQju3slpn0wF9aoccdmtIsPg',
//             'Content-Type': 'application/json'
//           },
//           timeout: 10000 // 10 second timeout
//         }
//       );

//       if (response.data?.success) {
//         setClientId(response.data.data.client_id);
//         setShowOtpInputs(true);
//         setOtpValue('');
//         showAlert('OTP sent successfully!');
//         setTimeout(() => {
//           if (otpInputRef.current) otpInputRef.current.focus();
//         }, 0);
//       } else {
//         throw new Error(response.data?.message || 'Failed to send OTP');
//       }
//     } catch (error) {
//       console.error('Error generating OTP:', error);
      
//       // Handle rate limiting with exponential backoff (max 3 retries)
//       if (error.response?.status === 429 && retryCount < 3) {
//         const delay = Math.pow(2, retryCount) * 1000; // 2^retryCount seconds
//         showAlert(`Rate limited. Retrying in ${delay/1000} seconds...`);
//         await new Promise(resolve => setTimeout(resolve, delay));
//         return handleSendOtp(retryCount + 1);
//       }
      
//       const errorMessage = error.response?.data?.message || 
//                          error.message || 
//                          'An error occurred while sending OTP. Please try again later.';
//       showAlert(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmitOtp = async (otpValue) => {
//     if (!otpValue || !(otpValue.length === 4 || otpValue.length === 6)) {
//       showAlert('Please enter a valid 4 or 6-digit OTP.');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await axios.post('https://kyc-api.surepass.io/api/v1/telecom/submit-otp', {
//         client_id: clientId,
//         otp: otpValue
//       }, {
//         headers: {
//           'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMDE0NjA5NiwianRpIjoiNmM0YWMxNTMtNDE2MS00YzliLWI4N2EtZWIxYjhmNDRiOTU5IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnVzZXJuYW1lXzJ5MTV1OWk0MW10bjR3eWpsaTh6b2p6eXZiZEBzdXJlcGFzcy5pbyIsIm5iZiI6MTcxMDE0NjA5NiwiZXhwIjoyMzQwODY2MDk2LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsidXNlciJdfX0.DfipEQt4RqFBQbOK29jbQju3slpn0wF9aoccdmtIsPg'
//         }
//       });

//       if (response.data.success) {
//         setFormData(prev => ({ ...prev, phoneOtpVerified: true }));
//         setShowOtpInputs(false);
//         setPhoneVerificationData(response.data);
//         showAlert('Phone number verified successfully!');
//       } else {
//         setOtpError('Invalid OTP. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error submitting OTP:', error);
//       setOtpError('An error occurred while verifying OTP. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOtpKeyDown = (index, e) => {
//     if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
//       otpInputsRef.current[index - 1]?.focus();
//     }
//   };

//   const handlePhoneChange = (index, value) => {
//     if (/^\d?$/.test(value)) {
//       const next = [...phoneDigits];
//       next[index] = value;
//       setPhoneDigits(next);
//       if (value && index < 9) {
//         phoneInputsRef.current[index + 1]?.focus();
//       }
//     }
//   };

//   const handlePhoneKeyDown = (index, e) => {
//     if (e.key === 'Backspace' && !phoneDigits[index] && index > 0) {
//       phoneInputsRef.current[index - 1]?.focus();
//     }
//   };

//   const handleVerifyAadhaar = async () => {
//     // Clear any previous verification status
//     setFormData(prev => ({ ...prev, aadhaarVerified: false }));
    
//     // Basic validation
//     if (!aadhaarNumber || !/^\d{12}$/.test(aadhaarNumber)) {
//       showAlert('Please enter a valid 12-digit Aadhaar number (digits only, no spaces or dashes).');
//       return;
//     }
  
//     // Check for test numbers or known invalid patterns
//     if (/^[0-1]{12}$/.test(aadhaarNumber) || /^(\d)\1{11}$/.test(aadhaarNumber)) {
//       showAlert('The Aadhaar number appears to be invalid. Please check and try again.');
//       return;
//     }
  
//     setIsAadhaarLoading(true);
//     showAlert('Verifying Aadhaar number. This may take a moment...');
  
//     try {
//       const response = await axios.post(
//         'https://kyc-api.surepass.app/api/v1/aadhaar-validation/aadhaar-validation',
//         { id_number: aadhaarNumber },
//         {
//           headers: {
//             'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMDE0NjA5NiwianRpIjoiNmM0YWMxNTMtNDE2MS00YzliLWI4N2EtZWIxYjhmNDRiOTU5IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnVzZXJuYW1lXzJ5MTV1OWk0MW10bjR3eWpsaTh6b2p6eXZiZEBzdXJlcGFzcy5pbyIsIm5iZiI6MTcxMDE0NjA5NiwiZXhwIjoyMzQwODY2MDk2LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsidXNlciJdfX0.DfipEQt4RqFBQbOK29jbQju3slpn0wF9aoccdmtIsPg',
//             'Content-Type': 'application/json'
//           }
//         }
//       );
  
//       if (response.data && response.data.success) {
//         setFormData(prev => ({ ...prev, aadhaarVerified: true }));
//         showAlert('Aadhaar verified successfully!');
//       } else {
//         const errorMessage = response.data?.message || 'Verification failed';
//         showAlert(`Aadhaar verification failed: ${errorMessage}. Please ensure the number is correct and try again.`);
//       }
//     } catch (error) {
//       console.error('Aadhaar verification error:', error);
//       const errorMessage = error.response?.data?.message || error.message || 'Verification failed';
//       showAlert(`Aadhaar verification failed: ${errorMessage}. Please try again later.`);
//     } finally {
//       setIsAadhaarLoading(false);
//     }
//   };
  
//   // Custom styled alert box to replace native alert()
//   const CustomAlert = ({ message, onClose }) => {
//     return (
//       <div className="alert__overlay">
//         <div className="alert__box">
//           <p className="alert__message">{message}</p>
//           <button onClick={onClose} className="alert__button">OK</button>
//         </div>
//       </div>
//     );
//   };
  
//   const [alertMessage, setAlertMessage] = useState(null);

//   const showAlert = (message) => {
//     setAlertMessage(message);
//   };
//   const closeAlert = () => {
//     setAlertMessage(null);
//   };

//   const handlePayNow = async () => {
//     if (!isPayNowEnabled || isSubmitting) return;
//     setIsSubmitting(true);
  
//     try {
//       // Verify Aadhaar & Phone first
//       if (!formData.phoneOtpVerified || !formData.aadhaarVerified) {
//         showAlert('Please verify your Aadhar and Phone number.');
//         return;
//       }
  
//       // Collect required details
//       const userLocal = (() => {
//         try {
//           return JSON.parse(localStorage.getItem('user') || '{}');
//         } catch {
//           return {};
//         }
//       })();

//       const bookingDetails = {
//         property_id: String(propertyId || '2'),
//         start_date: format(new Date(formData.checkInDate), 'yyyy-MM-dd'),
//         end_date: format(new Date(formData.checkOutDate), 'yyyy-MM-dd'),
//         username: userLocal.username || username || '',
//         phone_number: phoneDigits.join(''),
//         aadhar_number: aadhaarNumber || '',
//         user_photo: formData.uploadedPhoto || '',
//         terms_verified: !!formData.termsAgreed,
//         email: userLocal.email || '',
//       };
//       console.log('Booking details:', bookingDetails);
//       // Create booking
//       const { data } = await axios.post('https://townmanor.ai/api/booking', bookingDetails);
//       const newBookingId =
//         data?.booking?.id || data?.booking_id || data?.id || data?.bookingId || null;

//       // Handle the expected response showing pricing summary
//       if (data?.success && data?.booking) {
//         const b = data.booking;
//         showAlert(`Booking created successfully. Total: ${b.total_price}, Nights: ${b.nights}, From ${b.start_date} to ${b.end_date}`);
//       }
  
//       if (newBookingId) {
//         setBookingId(newBookingId);
//         try {
//           localStorage.setItem('bookingId', String(newBookingId));
//         } catch {}
//       }
  
//       // Always proceed to payment
//       await handleProceedToPayment(newBookingId);
  
//     } catch (error) {
//       console.error('Error creating booking:', error);
//       showAlert('Failed to create booking. ' + (error.response?.data?.message || error.message));
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
  

//   const handleProceedToPayment = async (bookingIdParam) => {
//     console.log('Proceeding to payment for booking ID:', bookingIdParam);
//     try {
//       localStorage.setItem('paymentType', 'coliving');
//       if (bookingIdParam) localStorage.setItem('bookingId', bookingIdParam);
      
//       const userResponse = await fetch(`https://www.townmanor.ai/api/user/${username}`);
//       if (!userResponse.ok) {
//         throw new Error('Failed to fetch user data');
//       }
//       const userData = await userResponse.json();

//       const txnid = 'OID' + Date.now();

//       const paymentData = {
//         key: 'UvTrjC',
//         txnid: txnid,
//         amount: pricing.total,
//         productinfo: 'Room Booking',
//         firstname: userData.name || username || '',
//         email: userData.email || '',
//         phone: userData.phone || '',
//         surl: `https://townmanor.ai/api/boster/payu/success?redirectUrl=https://www.ovika.co.in/success`,
//         furl: `https://townmanor.ai/api/boster/payu/failure?redirectUrl=https://www.ovika.co.in/failure`,
//         udf1: bookingIdParam || '',
//         service_provider: 'payu_paisa'
//       };

//       const response = await axios.post('https://townmanor.ai/api/payu/payment', paymentData);

//       if (!response.data || !response.data.paymentUrl || !response.data.params) {
//         throw new Error('Invalid payment response received');
//       }

//       const form = document.createElement('form');
//       form.method = 'POST';
//       form.action = response.data.paymentUrl;

//       Object.entries(response.data.params).forEach(([key, value]) => {
//         if (value !== undefined && value !== null) {
//           const input = document.createElement('input');
//           input.type = 'hidden';
//           input.name = key;
//           input.value = value.toString();
//           form.appendChild(input);
//         }
//       });

//       document.body.appendChild(form);
//       form.submit();
//       document.body.removeChild(form);

//     } catch (error) {
//       console.error('Payment initiation failed:', error);
//       showAlert(error.response?.data?.message || error.message || 'Failed to initiate payment. Please try again.');
//     }
//   };

//   return (
//    <>
//      <div className="booking-form-wrapper">
   
//       <div className="booking-form-container">
//         {/* Progress Bar */}
//         <div className="progress-bar-container">
//           {steps.map((stepName, index) => (
//             <div key={index} className="progress-bar-step">
//               <div
//                 className={`progress-bar-line ${
//                   index < step ? 'is-active' : ''
//                 }`}
//               ></div>
//               <span
//                 className={`progress-bar-step-name ${
//                   index + 1 === step ? 'is-active' : ''
//                 }`}
//               >
//                 {stepName}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* Form Content based on current step */}
//         <div>
//           {/* Step 1: Property Details */}
//           {step === 1 && (
//             <div>
//               <h2 className="form-step-title">Property Details</h2>
//               <div className="form-step-card">
//                 <img
//                   src={(property && property.images && property.images[0]) ? property.images[0] : '/image 71.png'}
//                   alt="Property"
//                   className="form-step-card-image"
//                 />
//                 <div className="form-step-card-content">
//                   <h3 className="form-step-card-title">{property?.name || '—'}</h3>
//                   <p className="form-step-card-location">{property?.address || ''}</p>
//                   <p className="form-step-card-description">
//                     {property?.description || ''}
//                   </p>
//                   {/* <ul className="form-step-card-amenities">
//                     {(property?.amenities || []).map((a, i) => (
//                       <li key={i}>{a}</li>
//                     ))}
//                   </ul> */}
//                   <p className="form-step-card-price">
//                     <MdCurrencyRupee />{property?.per_night_price || 0}<span className="form-step-card-price-per-night">/night</span>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Step 2: Terms & Conditions */}
//           {step === 2 && (
//             <div>
//               <h2 className="form-step-title">Terms & Conditions</h2>
//               <div className="terms-container">
//                 <p className="font-bold mb-2">1. Booking Agreement</p>
//                 <p className="mb-4">
//                   By confirming this booking, you agree to abide by all house rules, including check-in/check-out times, noise restrictions, and guest limits. Violation of these terms may result in a fine or cancellation of your reservation without a refund.
//                 </p>
//                 <p className="font-bold mb-2">2. Cancellation Policy</p>
//                 <p className="mb-4">
//                   A full refund will be provided for cancellations made within 48 hours of booking, if the check-in date is at least 14 days away. 50% refund for cancellations made 7 days before check-in. No refund for cancellations within 7 days of check-in.
//                 </p>
//                 <p className="font-bold mb-2">3. Damage & Liability</p>
//                 <p className="mb-4">
//                   Guests are responsible for any damage caused to the property and its contents during their stay. The host reserves the right to charge the guest for repair or replacement costs.
//                 </p>
//                 <p className="font-bold mb-2">4. Payment & Pricing</p>
//                 <p className="mb-4">
//                   All prices are final and non-negotiable. Additional taxes and service fees are included in the final price. Payment must be completed in full before the reservation is confirmed.
//                 </p>
//                 <p className="font-bold mb-2">5. Privacy</p>
//                 <p className="mb-4">
//                   Your personal information will be used solely for the purpose of this booking and will not be shared with third parties.
//                 </p>
//               </div>
//               <label className="terms-agreement-label">
//                 <input
//                   type="checkbox"
//                   className="hidden"
//                   checked={formData.termsAgreed}
//                   onChange={(e) => setFormData({ ...formData, termsAgreed: e.target.checked })}
//                 />
//                 <span className={`custom-checkbox ${formData.termsAgreed ? 'is-checked' : ''}`}>
//                   {formData.termsAgreed && <CheckCircle size={16} color="white" />}
//                 </span>
//                 <span className="custom-checkbox-text">I have read and agree to the Terms & Conditions.</span>
//               </label>
//             </div>
//           )}

//           {/* Step 3: Date Selection & Pricing */}
//           {step === 3 && (
//             <div>
//               <h2 className="form-step-title">Dates & Pricing</h2>
//               <div className="dates-pricing-container">
//                 <div className="calendar-section">
//                   <Calendar
//                     selectedDates={{
//                       checkInDate: formData.checkInDate,
//                       checkOutDate: formData.checkOutDate
//                     }}
//                     onDateSelect={(dates) => setFormData({ ...formData, ...dates })}
//                     minDate={new Date()}
//                     disabledDateSet={disabledDateSet}
//                     onInvalidRange={showAlert}
//                   />
//                   {bookingsLoading && (
//                     <p style={{ marginTop: '8px', color: '#666' }}>Loading availability…</p>
//                   )}
//                 </div>

//                 <div className="pricing-summary-card">
//                   <h3 className="pricing-summary-title">Pricing Summary</h3>
//                   <div className="pricing-item-list">
//                     <div className="pricing-item">
//                       <span>Subtotal</span>
//                       <span><MdCurrencyRupee/>{pricing.subtotal.toFixed(2)}</span>
//                     </div>
//                     <div className="pricing-item">
//                       <span>Taxes & GST (5%)</span>
//                       <span><MdCurrencyRupee/>{pricing.gst.toFixed(2)}</span>
//                     </div>
//                     <div className="pricing-total">
//                       <span>Total Price</span>
//                       <span><MdCurrencyRupee/>{pricing.total.toFixed(2)}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Step 4: Verification */}
//           {step === 4 && (
//             <div>
//               <h2 className="form-step-title">Verification</h2>
//               <div className="verification-container">
//                 {/* Phone OTP Verification */}
//                 <div className="verification-card">
//                   <h3 className="verification-title">Phone OTP</h3>
//                   <div className="phone-inputs-container">
//                     <label className="digit-inputs-label">Enter Mobile Number</label>
//                     <div className="digit-inputs" role="group" aria-label="Mobile number">
//                       {phoneDigits.map((d, i) => (
//                         <input
//                           key={i}
//                           type="text"
//                           inputMode="numeric"
//                           pattern="[0-9]*"
//                           maxLength={1}
//                           value={d}
//                           ref={el => phoneInputsRef.current[i] = el}
//                           onChange={(e) => handlePhoneChange(i, e.target.value.replace(/\D/g, ''))}
//                           onKeyDown={(e) => handlePhoneKeyDown(i, e)}
//                           className={`digit-box ${d ? 'is-filled' : ''}`}
//                           disabled={formData.phoneOtpVerified}
//                         />
//                       ))}
//                     </div>
//                     <button
//                       onClick={handleSendOtp}
//                       disabled={formData.phoneOtpVerified || phoneDigits.join('').length !== 10}
//                       className={`verification-button ${
//                         formData.phoneOtpVerified
//                           ? 'verification-button-verified'
//                           : 'verification-button-default'
//                       } send-otp-button`}
//                     >
//                       {formData.phoneOtpVerified ? 'Verified' : 'Send OTP'}
//                     </button>
//                   </div>

//                   {showOtpInputs && !formData.phoneOtpVerified && (
//                     <div className="otp-inputs-container">
//                       <label className="digit-inputs-label">Enter OTP</label>
//                       <div className="verification-action">
//                         <input
//                           ref={otpInputRef}
//                           type="text"
//                           inputMode="numeric"
//                           pattern="[0-9]*"
//                           maxLength={6}
//                           value={otpValue}
//                           onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ''))}
//                           className="aadhaar-input"
//                           placeholder="Enter 4 or 6-digit OTP"
//                         />
//                         <button
//                           onClick={() => handleSubmitOtp(otpValue)}
//                           disabled={!(otpValue.length === 4 || otpValue.length === 6) || loading}
//                           className={`verification-button ${
//                             (otpValue.length === 4 || otpValue.length === 6) && !loading
//                               ? 'verification-button-default'
//                               : 'verification-button-default'
//                           }`}
//                         >
//                           {loading ? 'Verifying…' : 'Verify'}
//                         </button>
//                       </div>
//                       {otpError && <p className="otp-error-text">{otpError}</p>}
//                     </div>
//                   )}

//                   <div className="verification-status-icon">
//                     {formData.phoneOtpVerified ? (
//                       <CheckCircle size={24} color="#8b0000" />
//                     ) : (
//                       <XCircle size={24} color="gray" />
//                     )}
//                   </div>
//                 </div>

//                 {/* Aadhaar Check */}
//                 <div className="verification-card">
//                   <h3 className="verification-title">Aadhaar Check</h3>
//                   <label className="digit-inputs-label">Enter Aadhaar Number</label>
//                   <div className="aadhaar-inputs-container">
                   
//                     <input
//                       type="text"
//                       inputMode="numeric"
//                       pattern="[0-9]*"
//                       maxLength={12}
//                       value={aadhaarNumber}
//                       onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, ''))}
//                       className="aadhaar-input"
//                       disabled={formData.aadhaarVerified}
//                       placeholder="12-digit Aadhaar"
//                     />
//                     <button
//                       onClick={handleVerifyAadhaar}
//                       disabled={formData.aadhaarVerified || !aadhaarNumber || isAadhaarLoading}
//                       className={`verification-button ${
//                         formData.aadhaarVerified
//                           ? 'verification-button-verified'
//                           : 'verification-button-default'
//                       }`}
//                     >
//                       {formData.aadhaarVerified ? 'Verified' : (isAadhaarLoading ? 'Verifying…' : 'Verify Aadhaar')}
//                     </button>
//                   </div>
//                   <div className="verification-status-icon">
//                     {formData.aadhaarVerified ? (
//                       <CheckCircle size={24} color="#8b0000" />
//                     ) : (
//                       isAadhaarLoading ? (
//                         <Loader size={24} className="animate-spin text-gray-400" />
//                       ) : (
//                         <XCircle size={24} color="gray" />
//                       )
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Step 5: Photo Upload */}
//           {step === 5 && (
//             <div>
//               <h2 className="form-step-title">Photo Upload</h2>
//               <div
//                 className={`upload-container ${isPhotoUploading ? 'is-uploading' : ''}`}
//                 onDragOver={(e) => e.preventDefault()}
//                 onDragLeave={(e) => e.preventDefault()}
//                 onDrop={handleFileDrop}
//                 onClick={() => fileInputRef.current.click()}
//               >
//                 {isPhotoUploading ? (
//                   <div className="flex flex-col items-center space-y-2">
//                     <Loader size={48} className="animate-spin text-gray-400" />
//                     <p className="upload-text">Uploading...</p>
//                   </div>
//                 ) : (
//                   <>
//                     <UploadCloud size={48} className="upload-icon" />
//                     <p className="upload-text">
//                       Drag and drop your photo here, or
//                       <br />
//                       <span>click to browse</span>
//                     </p>
//                   </>
//                 )}
//               </div>
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 className="hidden"
//                 onChange={handleFileChange}
//                 accept="image/*"
//               />

//               {/* Photo Preview */}
//               {formData.uploadedPhoto && (
//                 <div className="photo-preview-container">
//                   <h3 className="photo-preview-title">Preview</h3>
//                   <img
//                     src={formData.uploadedPhoto}
//                     alt="Uploaded Preview"
//                     className="photo-preview-image"
//                   />
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Step 6: Payment */}
//           {step === 6 && (
//             <div>
//               <h2 className="form-step-title">Payment</h2>
//               <div className="payment-container">
//                 <p className="payment-price-text">
//                   Final Price: <span className="payment-price-amount"><MdOutlineCurrencyRupee size={20} />{pricing.total.toFixed(2)}</span>
//                 </p>
//                 <button
//                   onClick={handlePayNow}
//                   disabled={!isPayNowEnabled || isSubmitting}
//                   className={`pay-now-button ${isPayNowEnabled && !isSubmitting ? 'is-enabled' : 'is-disabled'}`}
//                 >
//                   {isSubmitting ? 'Processing…' : 'Pay Now'}
//                 </button>
//                 {!isPayNowEnabled && (
//                   <p className="disabled-message">
//                     Please complete all previous steps to enable payment.
//                   </p>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Navigation Buttons */}
//         <div className="navigation-container">
//           <button
//             onClick={handlePrev}
//             disabled={step === 1}
//             className="navigation-button prev-button"
//           >
//             Prev
//           </button>
//           <button
//             onClick={handleNext}
//             disabled={step === steps.length || (step === 2 && !formData.termsAgreed)}
//             className="navigation-button next-button"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//       {alertMessage && <CustomAlert message={alertMessage} onClose={closeAlert} />}
//     </div>

//    </>
//   )
// }

// export default Payment
// import { useState, useEffect, useRef } from 'react';
// import { CheckCircle, XCircle, UploadCloud, Loader, ChevronLeft, ChevronRight } from 'lucide-react';
// import './Payment.css';
// import { MdCurrencyRupee, MdOutlineCurrencyRupee } from 'react-icons/md';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import Cookies from 'js-cookie';
// import { format, differenceInDays } from 'date-fns';

// // ========== CALENDAR API HELPERS (NEW) ==========
// const CALENDAR_API_BASE = 'http://localhost:3030/api/calendar';

// async function getCalendar(propertyKey) {
//   const res = await fetch(`${CALENDAR_API_BASE}/${propertyKey}`, { credentials: 'include' });
//   if (!res.ok) throw new Error('Failed to fetch calendar');
//   return res.json();
// }

// // ========== DISABLED DATE BUILDER (NEW) ==========
// const toYMD = (date) => {
//   const d = new Date(date);
//   const y = d.getFullYear();
//   const m = String(d.getMonth() + 1).padStart(2, '0');
//   const day = String(d.getDate()).padStart(2, '0');
//   return `${y}-${m}-${day}`;
// };

// const addDays = (date, n) => {
//   const d = new Date(date);
//   d.setDate(d.getDate() + n);
//   return d;
// };

// function buildDisabledDates(blockedRanges = []) {
//   const set = new Set();
//   blockedRanges.forEach((r) => {
//     const start = new Date(r.start);
//     const end = new Date(r.end); // checkout (exclusive)
//     for (let d = new Date(start); toYMD(d) < toYMD(end); d = addDays(d, 1)) {
//       set.add(toYMD(d));
//     }
//   });
//   return set;
// }

// // ========== CALENDAR COMPONENT (UNCHANGED) ==========
// const Calendar = ({ selectedDates, onDateSelect, minDate = new Date(), disabledDateSet = new Set(), onInvalidRange }) => {
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [view, setView] = useState('calendar');
//   const [checkInDate, setCheckInDate] = useState(selectedDates.checkInDate ? new Date(selectedDates.checkInDate) : null);
//   const [checkOutDate, setCheckOutDate] = useState(selectedDates.checkOutDate ? new Date(selectedDates.checkOutDate) : null);

//   const months = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];

//   const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//   const getDaysInMonth = (date) => {
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const daysInMonth = lastDay.getDate();
//     const startingDay = firstDay.getDay();
    
//     const days = [];
    
//     for (let i = 0; i < startingDay; i++) {
//       days.push(null);
//     }
    
//     for (let i = 1; i <= daysInMonth; i++) {
//       days.push(new Date(year, month, i));
//     }
    
//     return days;
//   };

//   const isDateDisabled = (date) => {
//     if (!date) return true;
//     const dateStr = date.toISOString().split('T')[0];
//     return date < minDate || disabledDateSet.has(dateStr);
//   };

//   const isDateSelected = (date) => {
//     if (!date) return false;
//     const dateStr = date.toISOString().split('T')[0];
//     return (checkInDate && dateStr === checkInDate.toISOString().split('T')[0]) ||
//            (checkOutDate && dateStr === checkOutDate.toISOString().split('T')[0]);
//   };

//   const isDateInRange = (date) => {
//     if (!date || !checkInDate || !checkOutDate) return false;
//     const dateStr = date.toISOString().split('T')[0];
//     const checkInStr = checkInDate.toISOString().split('T')[0];
//     const checkOutStr = checkOutDate.toISOString().split('T')[0];
//     return dateStr > checkInStr && dateStr < checkOutStr;
//   };

//   const handleDateClick = (date) => {
//     if (!date || isDateDisabled(date)) return;

//     const hasBlockedDateInRange = (start, end) => {
//       if (!start || !end) return false;
//       const s = new Date(start.getFullYear(), start.getMonth(), start.getDate());
//       const e = new Date(end.getFullYear(), end.getMonth(), end.getDate());
//       for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
//         const dStr = d.toISOString().split('T')[0];
//         if (disabledDateSet.has(dStr)) return true;
//       }
//       return false;
//     };

//     if (!checkInDate || (checkInDate && checkOutDate)) {
//       setCheckInDate(date);
//       setCheckOutDate(null);
//     } else {
//       if (date > checkInDate) {
//         if (hasBlockedDateInRange(checkInDate, date)) {
//           onInvalidRange && onInvalidRange('Selected range includes unavailable dates. Please choose different dates.');
//           return;
//         }
//         setCheckOutDate(date);
//         onDateSelect({
//           checkInDate: checkInDate.toISOString().split('T')[0],
//           checkOutDate: date.toISOString().split('T')[0]
//         });
//       } else {
//         if (hasBlockedDateInRange(date, checkInDate)) {
//           onInvalidRange && onInvalidRange('Selected range includes unavailable dates. Please choose different dates.');
//           return;
//         }
//         setCheckInDate(date);
//         setCheckOutDate(checkInDate);
//         onDateSelect({
//           checkInDate: date.toISOString().split('T')[0],
//           checkOutDate: checkInDate.toISOString().split('T')[0]
//         });
//       }
//     }
//   };

//   const nextMonth = () => {
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
//   };

//   const prevMonth = () => {
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
//   };

//   const days = getDaysInMonth(currentMonth);

//   return (
//     <div className="calendar-container">
//       <div className="calendar-header">
//         <button onClick={prevMonth} className="calendar-nav-button">
//           <ChevronLeft size={20} />
//         </button>
//         <h3 className="calendar-title">
//           {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
//         </h3>
//         <button onClick={nextMonth} className="calendar-nav-button">
//           <ChevronRight size={20} />
//         </button>
//       </div>

//       <div className="calendar-grid">
//         {daysOfWeek.map(day => (
//           <div key={day} className="calendar-day-header">
//             {day}
//           </div>
//         ))}
        
//         {days.map((date, index) => (
//           <button
//             key={index}
//             onClick={() => handleDateClick(date)}
//             disabled={!date || isDateDisabled(date)}
//             className={`calendar-day ${
//               !date ? 'calendar-day-empty' :
//               isDateDisabled(date) ? 'calendar-day-disabled' :
//               isDateSelected(date) ? 'calendar-day-selected' :
//               isDateInRange(date) ? 'calendar-day-in-range' :
//               'calendar-day-available'
//             }`}
//           >
//             {date ? date.getDate() : ''}
//           </button>
//         ))}
//       </div>

//       <div className="calendar-selection">
//         <div className="calendar-selection-item">
//           <span className="calendar-selection-label">Check-in:</span>
//           <span className="calendar-selection-date">
//             {checkInDate ? checkInDate.toLocaleDateString() : 'Not selected'}
//           </span>
//         </div>
//         <div className="calendar-selection-item">
//           <span className="calendar-selection-label">Check-out:</span>
//           <span className="calendar-selection-date">
//             {checkOutDate ? checkOutDate.toLocaleDateString() : 'Not selected'}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ========== MAIN PAYMENT COMPONENT (MODIFIED WITH PASSPORT, TERMS REMOVED) ==========
// function Payment() {
//   const [step, setStep] = useState(1);
//   const [property, setProperty] = useState(null);
//   const [propertyLoading, setPropertyLoading] = useState(true);
//   const [propertyError, setPropertyError] = useState('');
//   const [formData, setFormData] = useState({
//     // termsAgreed removed — you will add your own terms UI
//     checkInDate: '',
//     checkOutDate: '',
//     phoneOtpVerified: false,
//     aadhaarVerified: false,
//     passportVerified: false, // added
//     uploadedPhoto: null,
//   });

//   const [phoneDigits, setPhoneDigits] = useState(Array(10).fill(''));
//   const [showOtpInputs, setShowOtpInputs] = useState(false);
//   const [otpDigits, setOtpDigits] = useState(Array(6).fill(''));
//   const [otpValue, setOtpValue] = useState('');
//   const [otpError, setOtpError] = useState('');
//   const phoneInputsRef = useRef([]);
//   const otpInputsRef = useRef([]);
//   const otpInputRef = useRef(null);

//   const [aadhaarNumber, setAadhaarNumber] = useState('');
//   const [isAadhaarLoading, setIsAadhaarLoading] = useState(false);

//   // Passport states (in-memory only)
//   const [verificationMethod, setVerificationMethod] = useState('aadhaar'); // 'aadhaar' | 'passport'
//   const [passportInput, setPassportInput] = useState(''); // client_id or passport number (not persisted)
//   const [isPassportLoading, setIsPassportLoading] = useState(false);
//   const [passportError, setPassportError] = useState('');

//   const [pricing, setPricing] = useState({
//     subtotal: 0,
//     gst: 0,
//     total: 0,
//   });

//   const [isPayNowEnabled, setIsPayNowEnabled] = useState(false);
//   const [isPhotoUploading, setIsPhotoUploading] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const fileInputRef = useRef(null);

//   const [clientId, setClientId] = useState('');
//   const [phoneVerificationData, setPhoneVerificationData] = useState(null);
//   const [bookingId, setBookingId] = useState(null);
//   const [photoUploaded, setPhotoUploaded] = useState(false);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);

//   const [disabledDateSet, setDisabledDateSet] = useState(new Set());
//   const [bookingsLoading, setBookingsLoading] = useState(false);

//   const STORAGE_KEYS = {
//     step: 'payment_step',
//     formData: 'payment_formData',
//     phoneDigits: 'payment_phoneDigits',
//     otpDigits: 'payment_otpDigits',
//     aadhaar: 'payment_aadhaarNumber',
//   };
//   const hasLoadedFromStorageRef = useRef(false);

//   useEffect(() => {
//     try {
//       const savedStepRaw = localStorage.getItem(STORAGE_KEYS.step);
//       const savedStep = savedStepRaw ? parseInt(savedStepRaw, 10) : null;
//       const savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEYS.formData) || '{}');
//       const savedPhoneDigits = JSON.parse(localStorage.getItem(STORAGE_KEYS.phoneDigits) || '[]');
//       const savedOtpDigits = JSON.parse(localStorage.getItem(STORAGE_KEYS.otpDigits) || '[]');
//       const savedAadhaar = localStorage.getItem(STORAGE_KEYS.aadhaar) || '';

//       if (!Number.isNaN(savedStep) && savedStep && savedStep >= 1 && savedStep <= 6) {
//         setStep(savedStep);
//       }
//       if (savedFormData && typeof savedFormData === 'object') {
//         setFormData(prev => ({ ...prev, ...savedFormData }));
//       }
//       if (Array.isArray(savedPhoneDigits) && savedPhoneDigits.length === 10) {
//         setPhoneDigits(savedPhoneDigits);
//       }
//       if (Array.isArray(savedOtpDigits) && savedOtpDigits.length === 6) {
//         setOtpDigits(savedOtpDigits);
//       }
//       if (savedAadhaar) {
//         setAadhaarNumber(savedAadhaar);
//       }
//     } catch (error) {
//       console.warn('Failed to restore payment progress from storage', error);
//     } finally {
//       hasLoadedFromStorageRef.current = true;
//     }
//   }, []);

//   useEffect(() => {
//     if (!hasLoadedFromStorageRef.current) return;
//     localStorage.setItem(STORAGE_KEYS.step, String(step));
//   }, [step]);

//   useEffect(() => {
//     if (!hasLoadedFromStorageRef.current) return;
//     try {
//       // Do NOT persist passportInput — it's in-memory only
//       localStorage.setItem(STORAGE_KEYS.formData, JSON.stringify(formData));
//     } catch {}
//   }, [formData]);

//   useEffect(() => {
//     if (!hasLoadedFromStorageRef.current) return;
//     try {
//       localStorage.setItem(STORAGE_KEYS.phoneDigits, JSON.stringify(phoneDigits));
//     } catch {}
//   }, [phoneDigits]);

//   useEffect(() => {
//     if (!hasLoadedFromStorageRef.current) return;
//     try {
//       localStorage.setItem(STORAGE_KEYS.otpDigits, JSON.stringify(otpDigits));
//     } catch {}
//   }, [otpDigits]);

//   useEffect(() => {
//     if (!hasLoadedFromStorageRef.current) return;
//     localStorage.setItem(STORAGE_KEYS.aadhaar, aadhaarNumber);
//   }, [aadhaarNumber]);

//   const roomId = localStorage.getItem('roomId');
//   const userId = localStorage.getItem('propertyid');
//   const propertyId = localStorage.getItem('property_id');
//   const token = Cookies.get('jwttoken');
//   let username = '';
  
//   if (token) {
//     try {
//       const decodedToken = jwtDecode(token);
//       username = decodedToken.username;
//     } catch (error) {
//       console.error('Error decoding token:', error);
//     }
//   }

//   const steps = [
//     'Property',
//     'Terms',
//     'Dates & Pricing',
//     'Verification',
//     'Photo Upload',
//     'Payment',
//   ];

//   const handleNext = () => {
//     // Terms check removed (you will add terms yourself)
//     if (step === 3 && (!formData.checkInDate || !formData.checkOutDate || pricing.total <= 0)) return;
//     if (step === 4 && (!formData.phoneOtpVerified || !(formData.aadhaarVerified || formData.passportVerified))) return;
//     if (step === 5 && !formData.uploadedPhoto) return;

//     if (step < steps.length) {
//       setStep(step + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (step > 1) {
//       setStep(step - 1);
//     }
//   };

//   useEffect(() => {
//     if (formData.checkInDate && formData.checkOutDate) {
//       const checkIn = new Date(formData.checkInDate);
//       const checkOut = new Date(formData.checkOutDate);
//       const diffTime = Math.abs(checkOut - checkIn);
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
//       const pricePerNight = property?.per_night_price ? Number(property.per_night_price) : 0;
//       const subtotal = diffDays * pricePerNight;
//       const gst = subtotal * 0.05;
//       const total = subtotal + gst;

//       setPricing({ subtotal, gst, total });
//     } else {
//       setPricing({ subtotal: 0, gst: 0, total: 0 });
//     }
//   }, [formData.checkInDate, formData.checkOutDate, property]);

//   useEffect(() => {
//     const allStepsComplete =
//       // Terms requirement removed intentionally
//       (formData.checkInDate && formData.checkOutDate && pricing.total > 0) &&
//       formData.phoneOtpVerified &&
//       (formData.aadhaarVerified || formData.passportVerified) && // allow either
//       formData.uploadedPhoto;
//     setIsPayNowEnabled(allStepsComplete);
//   }, [formData, pricing]);

//   useEffect(() => {
//     const id = propertyId || '2';
//     const fetchProperty = async () => {
//       setPropertyLoading(true);
//       setPropertyError('');
//       try {
//         const res = await fetch(`https://townmanor.ai/api/properties/${id}`);
//         const json = await res.json();
//         if (json && json.success && json.property) {
//           setProperty(json.property);
//         } else {
//           setPropertyError('Failed to load property');
//         }
//       } catch (e) {
//         setPropertyError('Failed to load property');
//       } finally {
//         setPropertyLoading(false);
//       }
//     };
//     fetchProperty();
//   }, [propertyId]);

//   // ========== FETCH CALENDAR BLOCKED DATES (UPDATED) ==========
//   useEffect(() => {
//     const fetchCalendarBlockedDates = async () => {
//       try {
//         setBookingsLoading(true);
//         const pid = Number(propertyId || '2');
//         // Map property_id to calendar key
//         const propertyKeyMap = { 2: 'tm-luxe-1', 1: 'tm-luxe-2' };
//         const propertyKey = propertyKeyMap[pid] || 'tm-luxe-1';

//         // Fetch from calendar API
//         const { blocked } = await getCalendar(propertyKey);
//         const disabledSet = buildDisabledDates(blocked || []);
//         setDisabledDateSet(disabledSet);
//       } catch (e) {
//         console.error('Failed to load calendar blocked dates', e);
//         // Fallback: fetch from old booking API if calendar fails
//         try {
//           const res = await fetch('https://townmanor.ai/api/booking/dates');
//           const json = await res.json();
//           const pid = Number(propertyId || '2');
//           const bookings = Array.isArray(json?.bookings) ? json.bookings : [];
//           const filtered = bookings.filter(b => Number(b.property_id) === pid && Number(b.cancelled) === 0);
//           const dates = new Set();
//           filtered.forEach(b => {
//             const start = new Date(b.start_date);
//             const end = new Date(b.end_date);
//             for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
//               const dStr = d.toISOString().split('T')[0];
//               dates.add(dStr);
//             }
//           });
//           setDisabledDateSet(dates);
//         } catch (fallbackErr) {
//           console.error('Fallback booking dates fetch also failed', fallbackErr);
//         }
//       } finally {
//         setBookingsLoading(false);
//       }
//     };

//     if (step === 3) {
//       fetchCalendarBlockedDates();
//     }
//   }, [step, propertyId]);

//   const handleFileDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const files = e.dataTransfer.files;
//     if (files.length > 0) {
//       handleFile(files[0]);
//     }
//   };

//   const handleFileChange = (e) => {
//     const files = e.target.files;
//     if (files.length > 0) {
//       handleFile(files[0]);
//     }
//   };

//   const handleFile = async (file) => {
//     if (file.type.startsWith('image/')) {
//       setIsPhotoUploading(true);
//       setUploading(true);
      
//       const formDataLocal = new FormData();
//       formDataLocal.append('images', file);
      
//       try {
//         const response = await fetch('https://www.townmanor.ai/api/image/aws-upload-owner-images', {
//           method: 'POST',
//           body: formDataLocal,
//         });
        
//         const data = await response.json();
//         console.log(data);
        
//         if (!data || !data.fileUrls || data.fileUrls.length === 0) {
//           throw new Error('Image URL not found in upload response.');
//         }

//         const imageUrl = data.fileUrls[0];
//         const photoUrl = imageUrl;
        
//         setFormData(prev => ({ ...prev, uploadedPhoto: photoUrl }));
//         setPhotoUploaded(true);
//         showAlert('Photo uploaded successfully!');

//       } catch (error) {
//         console.error('Error uploading photo:', error);
//         showAlert('Failed to upload photo. ' + (error.message || 'An unknown error occurred.'));
//       } finally {
//         setIsPhotoUploading(false);
//         setUploading(false);
//       }
//     } else {
//       showAlert('Please upload a valid image file.');
//     }
//   };

//   const handleSendOtp = async (retryCount = 0) => {
//     const phone = phoneDigits.join('');
//     if (!phone || !/^\d{10}$/.test(phone)) {
//       showAlert('Please enter a valid 10-digit phone number.');
//       return;
//     }

//     if (loading) return;

//     setLoading(true);
//     setOtpError('');

//     try {
//       const response = await axios.post(
//         'https://kyc-api.surepass.io/api/v1/telecom/generate-otp',
//         { id_number: phone },
//         {
//           headers: {
//             'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMDE0NjA5NiwianRpIjoiNmM0YWMxNTMtNDE2MS00YzliLWI4N2EtZWIxYjhmNDRiOTU5IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnVzZXJuYW1lXzJ5MTV1OWk0MW10bjR3eWpsaTh6b2p6eXZiZEBzdXJlcGFzcy5pbyIsIm5iZiI6MTcxMDE0NjA5NiwiZXhwIjoyMzQwODY2MDk2LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsidXNlciJdfX0.DfipEQt4RqFBQbOK29jbQju3slpn0wF9aoccdmtIsPg',
//             'Content-Type': 'application/json'
//           },
//           timeout: 10000
//         }
//       );

//       if (response.data?.success) {
//         setClientId(response.data.data.client_id);
//         setShowOtpInputs(true);
//         setOtpValue('');
//         showAlert('OTP sent successfully!');
//         setTimeout(() => {
//           if (otpInputRef.current) otpInputRef.current.focus();
//         }, 0);
//       } else {
//         throw new Error(response.data?.message || 'Failed to send OTP');
//       }
//     } catch (error) {
//       console.error('Error generating OTP:', error);
      
//       if (error.response?.status === 429 && retryCount < 3) {
//         const delay = Math.pow(2, retryCount) * 1000;
//         showAlert(`Rate limited. Retrying in ${delay/1000} seconds...`);
//         await new Promise(resolve => setTimeout(resolve, delay));
//         return handleSendOtp(retryCount + 1);
//       }
      
//       const errorMessage = error.response?.data?.message || 
//                          error.message || 
//                          'An error occurred while sending OTP. Please try again later.';
//       showAlert(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmitOtp = async (otpValueParam) => {
//     if (!otpValueParam || !(otpValueParam.length === 4 || otpValueParam.length === 6)) {
//       showAlert('Please enter a valid 4 or 6-digit OTP.');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await axios.post('https://kyc-api.surepass.io/api/v1/telecom/submit-otp', {
//         client_id: clientId,
//         otp: otpValueParam
//       }, {
//         headers: {
//           'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMDE0NjA5NiwianRpIjoiNmM0YWMxNTMtNDE2MS00YzliLWI4N2EtZWIxYjhmNDRiOTU5IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnVzZXJuYW1lXzJ5MTV1OWk0MW10bjR3eWpsaTh6b2p6eXZiZEBzdXJlcGFzcy5pbyIsIm5iZiI6MTcxMDE0NjA5NiwiZXhwIjoyMzQwODY2MDk2LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsidXNlciJdfX0.DfipEQt4RqFBQbOK29jbQju3slpn0wF9aoccdmtIsPg'
//         }
//       });

//       if (response.data.success) {
//         setFormData(prev => ({ ...prev, phoneOtpVerified: true }));
//         setShowOtpInputs(false);
//         setPhoneVerificationData(response.data);
//         showAlert('Phone number verified successfully!');
//       } else {
//         setOtpError('Invalid OTP. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error submitting OTP:', error);
//       setOtpError('An error occurred while verifying OTP. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOtpKeyDown = (index, e) => {
//     if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
//       otpInputsRef.current[index - 1]?.focus();
//     }
//   };

//   const handlePhoneChange = (index, value) => {
//     if (/^\d?$/.test(value)) {
//       const next = [...phoneDigits];
//       next[index] = value;
//       setPhoneDigits(next);
//       if (value && index < 9) {
//         phoneInputsRef.current[index + 1]?.focus();
//       }
//     }
//   };

//   const handlePhoneKeyDown = (index, e) => {
//     if (e.key === 'Backspace' && !phoneDigits[index] && index > 0) {
//       phoneInputsRef.current[index - 1]?.focus();
//     }
//   };

//   const handleVerifyAadhaar = async () => {
//     setFormData(prev => ({ ...prev, aadhaarVerified: false }));
    
//     if (!aadhaarNumber || !/^\d{12}$/.test(aadhaarNumber)) {
//       showAlert('Please enter a valid 12-digit Aadhaar number (digits only, no spaces or dashes).');
//       return;
//     }
  
//     if (/^[0-1]{12}$/.test(aadhaarNumber) || /^(\d)\1{11}$/.test(aadhaarNumber)) {
//       showAlert('The Aadhaar number appears to be invalid. Please check and try again.');
//       return;
//     }
  
//     setIsAadhaarLoading(true);
//     showAlert('Verifying Aadhaar number. This may take a moment...');
  
//     try {
//       const response = await axios.post(
//         'https://kyc-api.surepass.app/api/v1/aadhaar-validation/aadhaar-validation',
//         { id_number: aadhaarNumber },
//         {
//           headers: {
//             'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMDE0NjA5NiwianRpIjoiNmM0YWMxNTMtNDE2MS00YzliLWI4N2EtZWIxYjhmNDRiOTU5IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnVzZXJuYW1lXzJ5MTV1OWk0MW10bjR3eWpsaTh6b2p6eXZiZEBzdXJlcGFzcy5pbyIsIm5iZiI6MTcxMDE0NjA5NiwiZXhwIjoyMzQwODY2MDk2LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsidXNlciJdfX0.DfipEQt4RqFBQbOK29jbQju3slpn0wF9aoccdmtIsPg',
//             'Content-Type': 'application/json'
//           }
//         }
//       );
  
//       if (response.data && response.data.success) {
//         setFormData(prev => ({ ...prev, aadhaarVerified: true }));
//         showAlert('Aadhaar verified successfully!');
//       } else {
//         const errorMessage = response.data?.message || 'Verification failed';
//         showAlert(`Aadhaar verification failed: ${errorMessage}. Please ensure the number is correct and try again.`);
//       }
//     } catch (error) {
//       console.error('Aadhaar verification error:', error);
//       const errorMessage = error.response?.data?.message || error.message || 'Verification failed';
//       showAlert(`Aadhaar verification failed: ${errorMessage}. Please try again later.`);
//     } finally {
//       setIsAadhaarLoading(false);
//     }
//   };

//   // ----------------- Passport verification -----------------
//   const SUREPASS_PASSPORT_VERIFY_URL = 'https://kyc-api.surepass.app/api/v1/passport/passport/verify';
//   const SUREPASS_BEARER = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMDE0NjA5NiwianRpIjoiNmM0YWMxNTMtNDE2MS00YzliLWI4N2EtZWIxYjhmNDRiOTU5IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnVzZXJuYW1lXzJ5MTV1OWk0MW10bjR3eWpsaTh6b2p6eXZiZEBzdXJlcGFzcy5pbyIsIm5iZiI6MTcxMDE0NjA5NiwiZXhwIjoyMzQwODY2MDk2LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsidXNlciJdfX0.DfipEQt4RqFBQbOK29jbQju3slpn0wF9aoccdmtIsPg';

//   const handleVerifyPassport = async () => {
//     setFormData(prev => ({ ...prev, passportVerified: false }));
//     setPassportError('');
//     if (!passportInput || passportInput.trim().length < 3) {
//       showAlert('Please enter a passport identifier or client_id (at least 3 characters).');
//       return;
//     }
//     setIsPassportLoading(true);
//     showAlert('Verifying passport — please wait...');
//     try {
//       // Try two payload shapes: id_number (like Aadhaar) and client_id (some APIs expect this)
//       // First try id_number style
//       let res;
//       try {
//         res = await axios.post(SUREPASS_PASSPORT_VERIFY_URL, { id_number: passportInput.trim() }, {
//           headers: {
//             Authorization: SUREPASS_BEARER,
//             'Content-Type': 'application/json'
//           },
//           timeout: 20000
//         });
//       } catch (errInner) {
//         // if first fails, try client_id
//         try {
//           res = await axios.post(SUREPASS_PASSPORT_VERIFY_URL, { client_id: passportInput.trim() }, {
//             headers: {
//               Authorization: SUREPASS_BEARER,
//               'Content-Type': 'application/json'
//             },
//             timeout: 20000
//           });
//         } catch (err2) {
//           throw err2;
//         }
//       }

//       const data = res?.data || {};
//       if (data.success === true) {
//         setFormData(prev => ({ ...prev, passportVerified: true }));
//         showAlert('Passport verified successfully');
//       } else {
//         const msg = data?.message || 'Passport verification failed';
//         setPassportError(msg);
//         showAlert(msg);
//       }
//     } catch (err) {
//       console.error('Passport verify error', err);
//       const msg = err.response?.data?.message || err.message || 'Passport verification error';
//       setPassportError(msg);
//       showAlert(msg);
//     } finally {
//       setIsPassportLoading(false);
//       // passportInput stays only in memory (we do not persist it)
//     }
//   };

//   const CustomAlert = ({ message, onClose }) => {
//     return (
//       <div className="alert__overlay">
//         <div className="alert__box">
//           <p className="alert__message">{message}</p>
//           <button onClick={onClose} className="alert__button">OK</button>
//         </div>
//       </div>
//     );
//   };
  
//   const [alertMessage, setAlertMessage] = useState(null);

//   const showAlert = (message) => {
//     setAlertMessage(message);
//   };
//   const closeAlert = () => {
//     setAlertMessage(null);
//   };

//   const handlePayNow = async () => {
//     if (!isPayNowEnabled || isSubmitting) return;
//     setIsSubmitting(true);
  
//     try {
//       if (!formData.phoneOtpVerified || !(formData.aadhaarVerified || formData.passportVerified)) {
//         showAlert('Please verify your phone and either Aadhaar or Passport before proceeding.');
//         return;
//       }
  
//       const userLocal = (() => {
//         try {
//           return JSON.parse(localStorage.getItem('user') || '{}');
//         } catch {
//           return {};
//         }
//       })();

//       const bookingDetails = {
//         property_id: String(propertyId || '2'),
//         start_date: format(new Date(formData.checkInDate), 'yyyy-MM-dd'),
//         end_date: format(new Date(formData.checkOutDate), 'yyyy-MM-dd'),
//         username: userLocal.username || username || '',
//         phone_number: phoneDigits.join(''),
//         aadhar_number: aadhaarNumber || '',
//         user_photo: formData.uploadedPhoto || '',
//         terms_verified: !!formData.termsAgreed, // kept for backend payload; you can control when you add your terms UI
//         email: userLocal.email || '',
//       };
//       console.log('Booking details:', bookingDetails);
//       const { data } = await axios.post('https://townmanor.ai/api/booking', bookingDetails);
//       const newBookingId =
//         data?.booking?.id || data?.booking_id || data?.id || data?.bookingId || null;

//       if (data?.success && data?.booking) {
//         const b = data.booking;
//         showAlert(`Booking created successfully. Total: ${b.total_price}, Nights: ${b.nights}, From ${b.start_date} to ${b.end_date}`);
//       }
  
//       if (newBookingId) {
//         setBookingId(newBookingId);
//         try {
//           localStorage.setItem('bookingId', String(newBookingId));
//         } catch {}
//       }
  
//       await handleProceedToPayment(newBookingId);
  
//     } catch (error) {
//       console.error('Error creating booking:', error);
//       showAlert('Failed to create booking. ' + (error.response?.data?.message || error.message));
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
  
// const handleProceedToPayment = async (bookingIdParam) => {
//   console.log('Proceeding to payment for booking ID:', bookingIdParam);
//   try {
//     localStorage.setItem('paymentType', 'coliving');
//     if (bookingIdParam) localStorage.setItem('bookingId', bookingIdParam);
    
//     const userResponse = await fetch(`https://www.townmanor.ai/api/user/${username}`);
//     if (!userResponse.ok) {
//       throw new Error('Failed to fetch user data');
//     }
//     const userData = await userResponse.json();

//     const txnid = 'OID' + Date.now();

//     const paymentData = {
//       key: 'UvTrjC',
//       txnid: txnid,
//       amount: 1, // Changed to ₹1 for testing
//       productinfo: 'Room Booking',
//       firstname: userData.name || username || '',
//       email: userData.email || '',
//       phone: userData.phone || '',
//       surl: `https://townmanor.ai/api/boster/payu/success?redirectUrl=https://www.ovika.co.in/success`,
//       furl: `https://townmanor.ai/api/boster/payu/failure?redirectUrl=https://www.ovika.co.in/failure`,
//       udf1: bookingIdParam || '',
//       service_provider: 'payu_paisa'
//     };

//     const response = await axios.post('https://townmanor.ai/api/payu/payment', paymentData);

//     if (!response.data || !response.data.paymentUrl || !response.data.params) {
//       throw new Error('Invalid payment response received');
//     }

//     const form = document.createElement('form');
//     form.method = 'POST';
//     form.action = response.data.paymentUrl;

//     Object.entries(response.data.params).forEach(([key, value]) => {
//       if (value !== undefined && value !== null) {
//         const input = document.createElement('input');
//         input.type = 'hidden';
//         input.name = key;
//         input.value = value.toString();
//         form.appendChild(input);
//       }
//     });

//     document.body.appendChild(form);
//     form.submit();
//     document.body.removeChild(form);

//   } catch (error) {
//     console.error('Payment initiation failed:', error);
//     showAlert(error.response?.data?.message || error.message || 'Failed to initiate payment. Please try again.');
//   }
// };

//   return (
//    <>
//      <div className="booking-form-wrapper">
   
//       <div className="booking-form-container">
//         <div className="progress-bar-container">
//           {steps.map((stepName, index) => (
//             <div key={index} className="progress-bar-step">
//               <div
//                 className={`progress-bar-line ${
//                   index < step ? 'is-active' : ''
//                 }`}
//               ></div>
//               <span
//                 className={`progress-bar-step-name ${
//                   index + 1 === step ? 'is-active' : ''
//                 }`}
//               >
//                 {stepName}
//               </span>
//             </div>
//           ))}
//         </div>

//         <div>
//           {step === 1 && (
//             <div>
//               <h2 className="form-step-title">Property Details</h2>
//               <div className="form-step-card">
//                 <img
//                   src={(property && property.images && property.images[0]) ? property.images[0] : '/image 71.png'}
//                   alt="Property"
//                   className="form-step-card-image"
//                 />
//                 <div className="form-step-card-content">
//                   <h3 className="form-step-card-title">{property?.name || '—'}</h3>
//                   <p className="form-step-card-location">{property?.address || ''}</p>
//                   <p className="form-step-card-description">
//                     {property?.description || ''}
//                   </p>
//                   <p className="form-step-card-price">
//                     <MdCurrencyRupee />{property?.per_night_price || 0}<span className="form-step-card-price-per-night">/night</span>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//             {step === 2 && (
//             <div>
//               <h2 className="form-step-title">Terms & Conditions</h2>
//               <div className="terms-container">
//                 <p className="font-bold mb-2">1. Booking Agreement</p>
//                 <p className="mb-4">
//                   By confirming this booking, you agree to abide by all house rules, including check-in/check-out times, noise restrictions, and guest limits. Violation of these terms may result in a fine or cancellation of your reservation without a refund.
//                 </p>
//                 <p className="font-bold mb-2">2. Cancellation Policy</p>
//                 <p className="mb-4">
//                   A full refund will be provided for cancellations made within 48 hours of booking, if the check-in date is at least 14 days away. 50% refund for cancellations made 7 days before check-in. No refund for cancellations within 7 days of check-in.
//                 </p>
//                 <p className="font-bold mb-2">3. Damage & Liability</p>
//                 <p className="mb-4">
//                   Guests are responsible for any damage caused to the property and its contents during their stay. The host reserves the right to charge the guest for repair or replacement costs.
//                 </p>
//                 <p className="font-bold mb-2">4. Payment & Pricing</p>
//                 <p className="mb-4">
//                   All prices are final and non-negotiable. Additional taxes and service fees are included in the final price. Payment must be completed in full before the reservation is confirmed.
//                 </p>
//                 <p className="font-bold mb-2">5. Privacy</p>
//                 <p className="mb-4">
//                   Your personal information will be used solely for the purpose of this booking and will not be shared with third parties.
//                 </p>
//               </div>
//               <label className="terms-agreement-label">
//                 <input
//                   type="checkbox"
//                   className="hidden"
//                   checked={formData.termsAgreed}
//                   onChange={(e) => setFormData({ ...formData, termsAgreed: e.target.checked })}
//                 />
//                 <span className={`custom-checkbox ${formData.termsAgreed ? 'is-checked' : ''}`}>
//                   {formData.termsAgreed && <CheckCircle size={16} color="white" />}
//                 </span>
//                 <span className="custom-checkbox-text">I have read and agree to the Terms & Conditions.</span>
//               </label>
//             </div>
//           )}

//           {step === 3 && (
//             <div>
//               <h2 className="form-step-title">Dates & Pricing</h2>
//               <div className="dates-pricing-container">
//                 <div className="calendar-section">
//                   <Calendar
//                     selectedDates={{
//                       checkInDate: formData.checkInDate,
//                       checkOutDate: formData.checkOutDate
//                     }}
//                     onDateSelect={(dates) => setFormData({ ...formData, ...dates })}
//                     minDate={new Date()}
//                     disabledDateSet={disabledDateSet}
//                     onInvalidRange={showAlert}
//                   />
//                   {bookingsLoading && (
//                     <p style={{ marginTop: '8px', color: '#666' }}>Loading availability…</p>
//                   )}
//                 </div>

//                 <div className="pricing-summary-card">
//                   <h3 className="pricing-summary-title">Pricing Summary</h3>
//                   <div className="pricing-item-list">
//                     <div className="pricing-item">
//                       <span>Subtotal</span>
//                       <span><MdCurrencyRupee/>{pricing.subtotal.toFixed(2)}</span>
//                     </div>
//                     <div className="pricing-item">
//                       <span>Taxes & GST (5%)</span>
//                       <span><MdCurrencyRupee/>{pricing.gst.toFixed(2)}</span>
//                     </div>
//                     <div className="pricing-total">
//                       <span>Total Price</span>
//                       <span><MdCurrencyRupee/>{pricing.total.toFixed(2)}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {step === 4 && (
// <div>
//   <h2 className="form-step-title">Verification</h2>

//   <div style={{ marginBottom: 12 }}>
//     <label style={{ marginRight: 12 }}>
//       <input type="radio" name="verif-method" value="aadhaar" checked={verificationMethod === 'aadhaar'} onChange={() => setVerificationMethod('aadhaar')} /> Aadhaar
//     </label>
//     <label>
//       <input type="radio" name="verif-method" value="passport" checked={verificationMethod === 'passport'} onChange={() => setVerificationMethod('passport')} /> Passport
//     </label>
//     <div style={{ fontSize: 12, color: '#666', marginTop: 6 }}>Passport verification — for foreign customers or where Aadhaar not available.</div>
//   </div>

//   <div className="veri-container-1">
//     {/* PHONE VERIFICATION */}
//     <div className="veri-card-1">
//       <h3 className="veri-title-1">Phone OTP</h3>
//       <div className="veri-phone-wrap-1">
//         <label className="veri-label-1">Enter Mobile Number</label>
//         <div className="veri-digits-1" role="group" aria-label="Mobile number">
//           {phoneDigits.map((d, i) => (
//             <input
//             style={{width:"28px"}}
//               key={i}
//               type="text"
//               inputMode="numeric"
//               pattern="[0-9]*"
//               maxLength={1}
//               value={d}
//               ref={(el) => (phoneInputsRef.current[i] = el)}
//               onChange={(e) =>
//                 handlePhoneChange(i, e.target.value.replace(/\D/g, ""))
//               }
//               onKeyDown={(e) => handlePhoneKeyDown(i, e)}
//               className={`veri-digitbox-1 ${d ? "is-filled" : ""}`}
//               disabled={formData.phoneOtpVerified}
//             />
//           ))}
//         </div>
//         <button
//           onClick={handleSendOtp}
//           disabled={
//             formData.phoneOtpVerified || phoneDigits.join("").length !== 10
//           }
//           className={`veri-btn-1 ${
//             formData.phoneOtpVerified ? "veri-btn-verified-1" : "veri-btn-default-1"
//           }`}
//         >
//           {formData.phoneOtpVerified ? "Verified" : "Send OTP"}
//         </button>
//       </div>

//       {showOtpInputs && !formData.phoneOtpVerified && (
//         <div className="veri-otp-wrap-1">
//           <label className="veri-label-1">Enter OTP</label>
//           <div className="veri-action-1">
//             <input
//               ref={otpInputRef}
//               type="text"
//               inputMode="numeric"
//               pattern="[0-9]*"
//               maxLength={6}
//               value={otpValue}
//               onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ""))}
//               className="veri-input-1"
//               placeholder="Enter 4 or 6-digit OTP"
//             />
//             <button
//               onClick={() => handleSubmitOtp(otpValue)}
//               disabled={!(otpValue.length === 4 || otpValue.length === 6) || loading}
//               className={`veri-btn-1 veri-btn-default-1`}
//             >
//               {loading ? "Verifying…" : "Verify"}
//             </button>
//           </div>
//           {otpError && <p className="veri-error-1">{otpError}</p>}
//         </div>
//       )}

//       <div className="veri-icon-1">
//         {formData.phoneOtpVerified ? (
//           <CheckCircle size={24} color="#8b0000" />
//         ) : (
//           <XCircle size={24} color="gray" />
//         )}
//       </div>
//     </div>

//     {/* AADHAAR or PASSPORT verification card(s) */}
//     {verificationMethod === 'aadhaar' ? (
//       <div className="veri-card-1">
//         <h3 className="veri-title-1">Aadhaar Check</h3>
//         <label className="veri-label-1">Enter Aadhaar Number</label>
//         <div className="veri-aadhaar-wrap-1">
//           <input
//             type="text"
//             inputMode="numeric"
//             pattern="[0-9]*"
//             maxLength={12}
//             value={aadhaarNumber}
//             onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, ""))}
//             className="veri-input-1"
//             disabled={formData.aadhaarVerified}
//             placeholder="12-digit Aadhaar"
//           />
//           <button
//             onClick={handleVerifyAadhaar}
//             disabled={formData.aadhaarVerified || !aadhaarNumber || isAadhaarLoading}
//             className={`veri-btn-1 ${
//               formData.aadhaarVerified
//                 ? "veri-btn-verified-1"
//                 : "veri-btn-default-1"
//             }`}
//           >
//             {formData.aadhaarVerified
//               ? "Verified"
//               : isAadhaarLoading
//               ? "Verifying…"
//               : "Verify Aadhaar"}
//           </button>
//         </div>
//         <div className="veri-icon-1">
//           {formData.aadhaarVerified ? (
//             <CheckCircle size={24} color="#8b0000" />
//           ) : isAadhaarLoading ? (
//             <Loader size={24} className="animate-spin text-gray-400" />
//           ) : (
//             <XCircle size={24} color="gray" />
//           )}
//         </div>
//       </div>
//     ) : (
//       <div className="veri-card-1">
//         <h3 className="veri-title-1">Passport Check</h3>
//         <label className="veri-label-1">Enter Passport number or client_id</label>
//         <div className="veri-aadhaar-wrap-1">
//           <input
//             type="text"
//             value={passportInput}
//             onChange={(e) => setPassportInput(e.target.value)}
//             className="veri-input-1"
//             disabled={formData.passportVerified}
//             placeholder="Passport no. or client_id (kept in memory only)"
//           />
//           <button
//             onClick={handleVerifyPassport}
//             disabled={formData.passportVerified || !passportInput || isPassportLoading}
//             className={`veri-btn-1 ${
//               formData.passportVerified ? "veri-btn-verified-1" : "veri-btn-default-1"
//             }`}
//           >
//             {formData.passportVerified ? "Verified" : isPassportLoading ? "Verifying…" : "Verify Passport"}
//           </button>
//         </div>
//         {passportError && <p style={{ color: 'red', marginTop: 6 }}>{passportError}</p>}
//         <div className="veri-icon-1">
//           {formData.passportVerified ? (
//             <CheckCircle size={24} color="#8b0000" />
//           ) : isPassportLoading ? (
//             <Loader size={24} className="animate-spin text-gray-400" />
//           ) : (
//             <XCircle size={24} color="gray" />
//           )}
//         </div>
//         <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
//           Note: Some passport verify endpoints expect a client_id returned after uploading the passport image. If you only have passport number and verification fails, I can add an upload→get client_id→auto-verify flow.
//         </div>
//       </div>
//     )}
//   </div>
// </div>
//           )}

//           {step === 5 && (
//             <div>
//               <h2 className="form-step-title">Photo Upload</h2>
//               <div
//                 className={`upload-container ${isPhotoUploading ? 'is-uploading' : ''}`}
//                 onDragOver={(e) => e.preventDefault()}
//                 onDragLeave={(e) => e.preventDefault()}
//                 onDrop={handleFileDrop}
//                 onClick={() => fileInputRef.current.click()}
//               >
//                 {isPhotoUploading ? (
//                   <div className="flex flex-col items-center space-y-2">
//                     <Loader size={48} className="animate-spin text-gray-400" />
//                     <p className="upload-text">Uploading...</p>
//                   </div>
//                 ) : (
//                   <>
//                     <UploadCloud size={48} className="upload-icon" />
//                     <p className="upload-text">
//                       Drag and drop your photo here, or
//                       <br />
//                       <span>click to browse</span>
//                     </p>
//                   </>
//                 )}
//               </div>
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 className="hidden"
//                 onChange={handleFileChange}
//                 accept="image/*"
//               />

//               {formData.uploadedPhoto && (
//                 <div className="photo-preview-container">
//                   <h3 className="photo-preview-title">Preview</h3>
//                   <img
//                     src={formData.uploadedPhoto}
//                     alt="Uploaded Preview"
//                     className="photo-preview-image"
//                   />
//                 </div>
//               )}
//             </div>
//           )}

//           {step === 6 && (
//             <div>
//               <h2 className="form-step-title">Payment</h2>
//               <div className="payment-container">
//                 <p className="payment-price-text">
//                   Final Price: <span className="payment-price-amount"><MdOutlineCurrencyRupee size={20} />{pricing.total.toFixed(2)}</span>
//                 </p>
//                 <button
//                   onClick={handlePayNow}
//                   disabled={!isPayNowEnabled || isSubmitting}
//                   className={`pay-now-button ${isPayNowEnabled && !isSubmitting ? 'is-enabled' : 'is-disabled'}`}
//                 >
//                   {isSubmitting ? 'Processing…' : 'Pay Now'}
//                 </button>
//                 {!isPayNowEnabled && (
//                   <p className="disabled-message">
//                     Please complete all previous steps to enable payment.
//                   </p>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="navigation-container">
//           <button
//             onClick={handlePrev}
//             disabled={step === 1}
//             className="navigation-button prev-button"
//           >
//             Prev
//           </button>
//           <button
//             onClick={handleNext}
//             disabled={step === steps.length}
//             className="navigation-button next-button"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//       {alertMessage && <CustomAlert message={alertMessage} onClose={closeAlert} />}
//     </div>

//    </>
//   )
// }

// export default Payment




import { useState, useEffect, useRef } from 'react';
import { CheckCircle, XCircle, UploadCloud, Loader, ChevronLeft, ChevronRight } from 'lucide-react';
import './Payment.css';
import { MdCurrencyRupee, MdOutlineCurrencyRupee } from 'react-icons/md';
import axios from 'axios';
// import jwtDecode from 'jwt-decode';
import * as jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { format } from 'date-fns';

// ========== CALENDAR API HELPERS (unchanged) ==========
const CALENDAR_API_BASE = 'http://localhost:3030/api/calendar';
async function getCalendar(propertyKey) {
  const res = await fetch(`${CALENDAR_API_BASE}/${propertyKey}`, { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to fetch calendar');
  return res.json();
}
const toYMD = (date) => {
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};
const addDays = (date, n) => {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
};
function buildDisabledDates(blockedRanges = []) {
  const set = new Set();
  blockedRanges.forEach((r) => {
    const start = new Date(r.start);
    const end = new Date(r.end); // checkout exclusive
    for (let d = new Date(start); toYMD(d) < toYMD(end); d = addDays(d, 1)) {
      set.add(toYMD(d));
    }
  });
  return set;
}

// ========== Calendar component (unchanged) ==========
const Calendar = ({ selectedDates, onDateSelect, minDate = new Date(), disabledDateSet = new Set(), onInvalidRange }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [checkInDate, setCheckInDate] = useState(selectedDates.checkInDate ? new Date(selectedDates.checkInDate) : null);
  const [checkOutDate, setCheckOutDate] = useState(selectedDates.checkOutDate ? new Date(selectedDates.checkOutDate) : null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

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

  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const days = getDaysInMonth(currentMonth);

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={prevMonth} className="calendar-nav-button"><ChevronLeft size={20} /></button>
        <h3 className="calendar-title">{months[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
        <button onClick={nextMonth} className="calendar-nav-button"><ChevronRight size={20} /></button>
      </div>

      <div className="calendar-grid">
        {daysOfWeek.map(day => (<div key={day} className="calendar-day-header">{day}</div>))}
        {days.map((date, index) => (
          <button
            key={index}
            onClick={() => handleDateClick(date)}
            disabled={!date || isDateDisabled(date)}
            className={`calendar-day ${
              !date ? 'calendar-day-empty' :
              isDateDisabled(date) ? 'calendar-day-disabled' :
              isDateSelected(date) ? 'calendar-day-selected' :
              isDateInRange(date) ? 'calendar-day-in-range' :
              'calendar-day-available'
            }`}
          >
            {date ? date.getDate() : ''}
          </button>
        ))}
      </div>

      <div className="calendar-selection">
        <div className="calendar-selection-item">
          <span className="calendar-selection-label">Check-in:</span>
          <span className="calendar-selection-date">{checkInDate ? checkInDate.toLocaleDateString() : 'Not selected'}</span>
        </div>
        <div className="calendar-selection-item">
          <span className="calendar-selection-label">Check-out:</span>
          <span className="calendar-selection-date">{checkOutDate ? checkOutDate.toLocaleDateString() : 'Not selected'}</span>
        </div>
      </div>
    </div>
  );
};

// ========== MAIN PAYMENT COMPONENT (OTP-only verification) ==========
function Payment() {
  const [step, setStep] = useState(1);
  const [property, setProperty] = useState(null);
  const [propertyLoading, setPropertyLoading] = useState(true);
  const [propertyError, setPropertyError] = useState('');
  const [formData, setFormData] = useState({
    checkInDate: '',
    checkOutDate: '',
    phoneOtpVerified: false,
    uploadedPhoto: null,
    termsAgreed: false
  });

  const [phoneDigits, setPhoneDigits] = useState(Array(10).fill(''));
  const [showOtpInputs, setShowOtpInputs] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [otpError, setOtpError] = useState('');
  const phoneInputsRef = useRef([]);
  const otpInputRef = useRef(null);

  const [isPhotoUploading, setIsPhotoUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef(null);

  const [clientId, setClientId] = useState('');
  const [phoneVerificationData, setPhoneVerificationData] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [disabledDateSet, setDisabledDateSet] = useState(new Set());
  const [bookingsLoading, setBookingsLoading] = useState(false);

  const STORAGE_KEYS = {
    step: 'payment_step',
    formData: 'payment_formData',
    phoneDigits: 'payment_phoneDigits',
    otpDigits: 'payment_otpDigits'
  };
  const hasLoadedFromStorageRef = useRef(false);

  useEffect(() => {
    try {
      const savedStepRaw = localStorage.getItem(STORAGE_KEYS.step);
      const savedStep = savedStepRaw ? parseInt(savedStepRaw, 10) : null;
      const savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEYS.formData) || '{}');
      const savedPhoneDigits = JSON.parse(localStorage.getItem(STORAGE_KEYS.phoneDigits) || '[]');
      const savedOtpDigits = JSON.parse(localStorage.getItem(STORAGE_KEYS.otpDigits) || '[]');

      if (!Number.isNaN(savedStep) && savedStep && savedStep >= 1 && savedStep <= 6) setStep(savedStep);
      if (savedFormData && typeof savedFormData === 'object') setFormData(prev => ({ ...prev, ...savedFormData }));
      if (Array.isArray(savedPhoneDigits) && savedPhoneDigits.length === 10) setPhoneDigits(savedPhoneDigits);
      if (Array.isArray(savedOtpDigits) && savedOtpDigits.length === 6) { /* we don't use otpDigits array inputs now */ }
    } catch (error) {
      console.warn('Failed to restore payment progress from storage', error);
    } finally {
      hasLoadedFromStorageRef.current = true;
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedFromStorageRef.current) return;
    localStorage.setItem(STORAGE_KEYS.step, String(step));
  }, [step]);

  useEffect(() => {
    if (!hasLoadedFromStorageRef.current) return;
    try {
      localStorage.setItem(STORAGE_KEYS.formData, JSON.stringify(formData));
    } catch {}
  }, [formData]);

  useEffect(() => {
    if (!hasLoadedFromStorageRef.current) return;
    try {
      localStorage.setItem(STORAGE_KEYS.phoneDigits, JSON.stringify(phoneDigits));
    } catch {}
  }, [phoneDigits]);

  const roomId = localStorage.getItem('roomId');
  const userId = localStorage.getItem('propertyid');
  const propertyId = localStorage.getItem('property_id');
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
    'Phone Verification',
    'Photo Upload',
    'Payment',
  ];

  const handleNext = () => {
    // Step 3: require dates & pricing
    if (step === 3 && (!formData.checkInDate || !formData.checkOutDate || (formData.checkInDate && formData.checkOutDate && Number.isNaN(Number(formData.checkInDate)) && Number.isNaN(Number(formData.checkOutDate))))) {
      // keep simple — the Pricing UI will show totals
    }
    // Step 4: require phone OTP verified
    if (step === 4 && !formData.phoneOtpVerified) return;
    // Step 5: require uploaded photo
    if (step === 5 && !formData.uploadedPhoto) return;

    if (step < steps.length) setStep(step + 1);
  };

  const handlePrev = () => { if (step > 1) setStep(step - 1); };

  useEffect(() => {
    if (formData.checkInDate && formData.checkOutDate && property) {
      const checkIn = new Date(formData.checkInDate);
      const checkOut = new Date(formData.checkOutDate);
      const diffTime = Math.abs(checkOut - checkIn);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const pricePerNight = property?.per_night_price ? Number(property.per_night_price) : 0;
      const subtotal = diffDays * pricePerNight;
      const gst = subtotal * 0.05;
      const total = subtotal + gst;
      setPricing({ subtotal, gst, total });
    } else {
      setPricing({ subtotal: 0, gst: 0, total: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.checkInDate, formData.checkOutDate, property]);

  const [pricing, setPricing] = useState({ subtotal: 0, gst: 0, total: 0 });
  const [isPayNowEnabled, setIsPayNowEnabled] = useState(false);

  useEffect(() => {
    const allStepsComplete =
      (formData.checkInDate && formData.checkOutDate && pricing.total > 0) &&
      formData.phoneOtpVerified &&
      formData.uploadedPhoto;
    setIsPayNowEnabled(allStepsComplete);
  }, [formData, pricing]);

  useEffect(() => {
    const id = propertyId || '2';
    const fetchProperty = async () => {
      setPropertyLoading(true);
      setPropertyError('');
      try {
        const res = await fetch(`https://townmanor.ai/api/properties/${id}`);
        const json = await res.json();
        if (json && json.success && json.property) setProperty(json.property);
        else setPropertyError('Failed to load property');
      } catch (e) {
        setPropertyError('Failed to load property');
      } finally {
        setPropertyLoading(false);
      }
    };
    fetchProperty();
  }, [propertyId]);

  // Fetch calendar blocked dates (unchanged)
  useEffect(() => {
    const fetchCalendarBlockedDates = async () => {
      try {
        setBookingsLoading(true);
        const pid = Number(propertyId || '2');
        const propertyKeyMap = { 2: 'tm-luxe-1', 1: 'tm-luxe-2' };
        const propertyKey = propertyKeyMap[pid] || 'tm-luxe-1';
        const { blocked } = await getCalendar(propertyKey);
        const disabledSet = buildDisabledDates(blocked || []);
        setDisabledDateSet(disabledSet);
      } catch (e) {
        console.error('Failed to load calendar blocked dates', e);
        // fallback to booking API
        try {
          const res = await fetch('https://townmanor.ai/api/booking/dates');
          const json = await res.json();
          const pid = Number(propertyId || '2');
          const bookings = Array.isArray(json?.bookings) ? json.bookings : [];
          const filtered = bookings.filter(b => Number(b.property_id) === pid && Number(b.cancelled) === 0);
          const dates = new Set();
          filtered.forEach(b => {
            const start = new Date(b.start_date);
            const end = new Date(b.end_date);
            for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
              const dStr = d.toISOString().split('T')[0];
              dates.add(dStr);
            }
          });
          setDisabledDateSet(dates);
        } catch (fallbackErr) {
          console.error('Fallback booking dates fetch also failed', fallbackErr);
        }
      } finally {
        setBookingsLoading(false);
      }
    };

    if (step === 3) fetchCalendarBlockedDates();
  }, [step, propertyId]);

  // File handlers (unchanged)
  const handleFileDrop = (e) => {
    e.preventDefault(); e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) handleFile(files[0]);
  };
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) handleFile(files[0]);
  };
  const handleFile = async (file) => {
    if (!file.type.startsWith('image/')) {
      showAlert('Please upload a valid image file.');
      return;
    }
    setIsPhotoUploading(true);
    setUploading(true);
    const formDataLocal = new FormData();
    formDataLocal.append('images', file);
    try {
      const response = await fetch('https://www.townmanor.ai/api/image/aws-upload-owner-images', {
        method: 'POST',
        body: formDataLocal,
      });
      const data = await response.json();
      if (!data || !data.fileUrls || data.fileUrls.length === 0) throw new Error('Image URL not found in upload response.');
      const imageUrl = data.fileUrls[0];
      setFormData(prev => ({ ...prev, uploadedPhoto: imageUrl }));
      setPhotoUploaded(true);
      showAlert('Photo uploaded successfully!');
    } catch (error) {
      console.error('Error uploading photo:', error);
      showAlert('Failed to upload photo. ' + (error.message || 'An unknown error occurred.'));
    } finally {
      setIsPhotoUploading(false);
      setUploading(false);
    }
  };

  // PHONE OTP logic (unchanged except minor cleanup)
  const handleSendOtp = async (retryCount = 0) => {
    const phone = phoneDigits.join('');
    if (!phone || !/^\d{10}$/.test(phone)) {
      showAlert('Please enter a valid 10-digit phone number.');
      return;
    }
    if (loading) return;
    setLoading(true);
    setOtpError('');
    try {
      const response = await axios.post(
        'https://kyc-api.surepass.io/api/v1/telecom/generate-otp',
        { id_number: phone },
        {
          headers: {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMDE0NjA5NiwianRpIjoiNmM0YWMxNTMtNDE2MS00YzliLWI4N2EtZWIxYjhmNDRiOTU5IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnVzZXJuYW1lXzJ5MTV1OWk0MW10bjR3eWpsaTh6b2p6eXZiZEBzdXJlcGFzcy5pbyIsIm5iZiI6MTcxMDE0NjA5NiwiZXhwIjoyMzQwODY2MDk2LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsidXNlciJdfX0.DfipEQt4RqFBQbOK29jbQju3slpn0wF9aoccdmtIsPg',
            'Content-Type': 'application/json'
          },
          timeout: 10000
        }
      );

      if (response.data?.success) {
        setClientId(response.data.data.client_id);
        setShowOtpInputs(true);
        setOtpValue('');
        showAlert('OTP sent successfully!');
        setTimeout(() => { if (otpInputRef.current) otpInputRef.current.focus(); }, 0);
      } else {
        throw new Error(response.data?.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Error generating OTP:', error);
      if (error.response?.status === 429 && retryCount < 3) {
        const delay = Math.pow(2, retryCount) * 1000;
        showAlert(`Rate limited. Retrying in ${delay/1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return handleSendOtp(retryCount + 1);
      }
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred while sending OTP. Please try again later.';
      showAlert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitOtp = async (otpValueParam) => {
    if (!otpValueParam || !(otpValueParam.length === 4 || otpValueParam.length === 6)) {
      showAlert('Please enter a valid 4 or 6-digit OTP.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('https://kyc-api.surepass.io/api/v1/telecom/submit-otp', {
        client_id: clientId,
        otp: otpValueParam
      }, {
        headers: {
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMDE0NjA5NiwianRpIjoiNmM0YWMxNTMtNDE2MS00YzliLWI4N2EtZWIxYjhmNDRiOTU5IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnVzZXJuYW1lXzJ5MTV1OWk0MW10bjR3eWpsaTh6b2p6eXZiZEBzdXJlcGFzcy5pbyIsIm5iZiI6MTcxMDE0NjA5NiwiZXhwIjoyMzQwODY2MDk2LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsidXNlciJdfX0.DfipEQt4RqFBQbOK29jbQju3slpn0wF9aoccdmtIsPg'
        }
      });

      if (response.data.success) {
        setFormData(prev => ({ ...prev, phoneOtpVerified: true }));
        setShowOtpInputs(false);
        setPhoneVerificationData(response.data);
        showAlert('Phone number verified successfully!');
      } else {
        setOtpError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting OTP:', error);
      setOtpError('An error occurred while verifying OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const next = [...phoneDigits];
      next[index] = value;
      setPhoneDigits(next);
      if (value && index < 9) phoneInputsRef.current[index + 1]?.focus();
    }
  };
  const handlePhoneKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !phoneDigits[index] && index > 0) phoneInputsRef.current[index - 1]?.focus();
  };

  const CustomAlert = ({ message, onClose }) => (
    <div className="alert__overlay">
      <div className="alert__box">
        <p className="alert__message">{message}</p>
        <button onClick={onClose} className="alert__button">OK</button>
      </div>
    </div>
  );
  const [alertMessage, setAlertMessage] = useState(null);
  const showAlert = (message) => setAlertMessage(message);
  const closeAlert = () => setAlertMessage(null);

  const handlePayNow = async () => {
    if (!isPayNowEnabled || isSubmitting) return;
    setIsSubmitting(true);
    try {
      if (!formData.phoneOtpVerified) {
        showAlert('Please verify your phone before proceeding.');
        return;
      }
      const userLocal = (() => { try { return JSON.parse(localStorage.getItem('user') || '{}'); } catch { return {}; } })();

      const bookingDetails = {
        property_id: String(propertyId || '2'),
        start_date: format(new Date(formData.checkInDate), 'yyyy-MM-dd'),
        end_date: format(new Date(formData.checkOutDate), 'yyyy-MM-dd'),
        username: userLocal.username || username || '',
        phone_number: phoneDigits.join(''),
        user_photo: formData.uploadedPhoto || '',
        terms_verified: !!formData.termsAgreed,
        email: userLocal.email || '',
      };
      console.log('Booking details:', bookingDetails);
      const { data } = await axios.post('https://townmanor.ai/api/booking', bookingDetails);
      const newBookingId = data?.booking?.id || data?.booking_id || data?.id || data?.bookingId || null;

      if (data?.success && data?.booking) {
        const b = data.booking;
        showAlert(`Booking created successfully. Total: ${b.total_price}, Nights: ${b.nights}, From ${b.start_date} to ${b.end_date}`);
      }

      if (newBookingId) {
        setBookingId(newBookingId);
        try { localStorage.setItem('bookingId', String(newBookingId)); } catch {}
      }

      await handleProceedToPayment(newBookingId);
    } catch (error) {
      console.error('Error creating booking:', error);
      showAlert('Failed to create booking. ' + (error.response?.data?.message || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  // const handleProceedToPayment = async (bookingIdParam) => {
  //   try {
  //     localStorage.setItem('paymentType', 'coliving');
  //     if (bookingIdParam) localStorage.setItem('bookingId', bookingIdParam);
  //     const userResponse = await fetch(`https://www.townmanor.ai/api/user/${username}`);
  //     if (!userResponse.ok) throw new Error('Failed to fetch user data');
  //     const userData = await userResponse.json();

  //     const txnid = 'OID' + Date.now();
  //     const paymentData = {
  //       key: 'UvTrjC',
  //       txnid,
  //       amount: 1,
  //       productinfo: 'Room Booking',
  //       firstname: userData.name || username || '',
  //       email: userData.email || '',
  //       phone: userData.phone || '',
  //       surl: `https://townmanor.ai/api/boster/payu/success?redirectUrl=https://www.ovika.co.in/success`,
  //       furl: `https://townmanor.ai/api/boster/payu/failure?redirectUrl=https://www.ovika.co.in/failure`,
  //       udf1: bookingIdParam || '',
  //       service_provider: 'payu_paisa'
  //     };

  //     const response = await axios.post('https://townmanor.ai/api/payu/payment', paymentData);

  //     if (!response.data || !response.data.paymentUrl || !response.data.params) throw new Error('Invalid payment response received');

  //     const form = document.createElement('form');
  //     form.method = 'POST';
  //     form.action = response.data.paymentUrl;
  //     Object.entries(response.data.params).forEach(([key, value]) => {
  //       if (value !== undefined && value !== null) {
  //         const input = document.createElement('input');
  //         input.type = 'hidden';
  //         input.name = key;
  //         input.value = value.toString();
  //         form.appendChild(input);
  //       }
  //     });
  //     document.body.appendChild(form);
  //     form.submit();
  //     document.body.removeChild(form);
  //   } catch (error) {
  //     console.error('Payment initiation failed:', error);
  //     showAlert(error.response?.data?.message || error.message || 'Failed to initiate payment. Please try again.');
  //   }
  // };
const handleProceedToPayment = async (bookingIdParam) => {
  console.log('Proceeding to payment for booking ID:', bookingIdParam);
  try {
    localStorage.setItem('paymentType', 'coliving');
    if (bookingIdParam) localStorage.setItem('bookingId', bookingIdParam);
  
    const userResponse = await fetch(`https://www.townmanor.ai/api/user/${username}`);
    if (!userResponse.ok) {
      throw new Error('Failed to fetch user data');
    }
    const userData = await userResponse.json();

    const txnid = 'OID' + Date.now();

    const paymentData = {
      key: 'UvTrjC',
      txnid: txnid,
      amount: 3000, // <- changed to ₹3000
      productinfo: 'Room Booking',
      firstname: userData.name || username || '',
      email: userData.email || '',
      phone: userData.phone || '',
      surl: `https://townmanor.ai/api/boster/payu/success?redirectUrl=https://www.ovika.co.in/success`,
      furl: `https://townmanor.ai/api/boster/payu/failure?redirectUrl=https://www.ovika.co.in/failure`,
      udf1: bookingIdParam || '',
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
  }
};
  return (
   <>
     <div className="booking-form-wrapper">
      <div className="booking-form-container">
        <div className="progress-bar-container">
          {steps.map((stepName, index) => (
            <div key={index} className="progress-bar-step">
              <div className={`progress-bar-line ${index < step ? 'is-active' : ''}`}></div>
              <span className={`progress-bar-step-name ${index + 1 === step ? 'is-active' : ''}`}>{stepName}</span>
            </div>
          ))}
        </div>

        <div>
          {step === 1 && (
            <div>
              <h2 className="form-step-title">Property Details</h2>
              <div className="form-step-card">
                <img src={(property && property.images && property.images[0]) ? property.images[0] : '/image 71.png'} alt="Property" className="form-step-card-image" />
                <div className="form-step-card-content">
                  <h3 className="form-step-card-title">{property?.name || '—'}</h3>
                  <p className="form-step-card-location">{property?.address || ''}</p>
                  <p className="form-step-card-description">{property?.description || ''}</p>
                  <p className="form-step-card-price"><MdCurrencyRupee />{property?.per_night_price || 0}<span className="form-step-card-price-per-night">/night</span></p>
                </div>
              </div>
            </div>
          )}

         {step === 2 && (
          <div>
  <h2 className="form-step-title">Terms & Conditions</h2>
  <div className="terms-container">
    <p className="mb-4">
      1. By booking a property through OVIKA, the guest agrees to comply with these Terms & Conditions. OVIKA acts as a booking facilitator for listed properties owned or managed by its partners or affiliates. Guests must be at least 18 years of age to make a booking.
    </p>

    <p className="mb-4">
      2. All bookings are subject to availability and confirmation by OVIKA. Full or partial payment must be made at the time of booking. Accepted payment methods include credit/debit cards, UPI, bank transfers, or any other mode listed on the website. Prices are displayed in INR and include applicable taxes unless stated otherwise. Any promotional offers or discounts apply only if booked within the specified period. Payment must be completed in full before confirmation.
    </p>

    <p className="mb-4">
      3. Standard check-in time is 2:00 PM and standard check-out time is 11:00 AM. Early check-in or late check-out is subject to availability and may incur additional charges. A valid government ID (Aadhaar, Passport, or Driving License) is mandatory for all adult guests at check-in.
    </p>

    <p className="mb-4">
      4. Cancellations made 48 hours or more before check-in are eligible for a full refund. Cancellations made within 48 hours of check-in will incur a one-night charge or as per the property’s individual policy. No-shows or early check-outs are non-refundable. Refunds will be processed within 7–10 business days through the original payment mode.
    </p>

    <p className="mb-4">
      5. Guests must maintain decorum and respect the property, neighbors, and staff. Loud music, parties, or unlawful activities are strictly prohibited unless prior written approval is obtained. Smoking is not allowed in non-smoking properties. Any damage to property, furnishings, or equipment caused by the guest will be charged to the guest at actual cost.
    </p>

    <p className="mb-4">
      6. Each property has a maximum occupancy limit as stated in its listing. Extra guests may be allowed only upon prior approval and may attract additional charges. Pets are allowed only in designated pet-friendly properties.
    </p>

    <p className="mb-4">
      7. Daily or periodic housekeeping services may be provided depending on the booking plan. Guests must promptly inform OVIKA or the property manager of any maintenance issues. OVIKA reserves the right to access the unit for cleaning, maintenance, or inspection with prior notice.
    </p>

    <p className="mb-4">
      8. Guests are responsible for any damage caused to the property or its contents during their stay. OVIKA and the property owners are not responsible for loss of personal belongings, valuables, or injuries during the stay. Guests are advised to follow all safety guidelines. OVIKA shall not be liable for disruptions beyond its control such as power cuts, natural calamities, or government restrictions.
    </p>

    <p className="mb-4">
      9. In case of unforeseen circumstances such as maintenance or overbooking, OVIKA reserves the right to relocate the guest to an equivalent property or provide a full refund.
    </p>

    <p className="mb-4">
      10. Guest information is collected solely for booking, communication, and legal compliance. OVIKA respects your privacy and follows applicable data protection laws. Your personal information will not be shared with third parties except as required for booking and compliance. For more details, please refer to our Privacy Policy.
    </p>

    <p className="mb-4">
      11. OVIKA or the property owner reserves the right to terminate a booking without refund if the guest violates these terms, engages in illegal activity, or causes disturbance to others.
    </p>

    <p className="mb-4">
      12. These Terms & Conditions are governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Noida, Uttar Pradesh.
    </p>

    <p className="mb-4">
      13. For any booking-related queries or concerns, please contact us at:
      <br />📧 enquiry@ovikaliving.com
      <br />📞 (+91) 7042888903
    </p>
  </div>

  <label className="terms-agreement-label">
    <input
      type="checkbox"
      className="hidden"
      checked={formData.termsAgreed}
      onChange={(e) => setFormData({ ...formData, termsAgreed: e.target.checked })}
    />
    <span className={`custom-checkbox ${formData.termsAgreed ? 'is-checked' : ''}`}>
      {formData.termsAgreed && <CheckCircle size={16} color="white" />}
    </span>
    <span className="custom-checkbox-text">
      I have read and agree to the Terms & Conditions.
    </span>
  </label>
</div>


          )}

          {step === 3 && (
            <div>
              <h2 className="form-step-title">Dates & Pricing</h2>
              <div className="dates-pricing-container">
                <div className="calendar-section">
                  <Calendar
                    selectedDates={{ checkInDate: formData.checkInDate, checkOutDate: formData.checkOutDate }}
                    onDateSelect={(dates) => setFormData({ ...formData, ...dates })}
                    minDate={new Date()}
                    disabledDateSet={disabledDateSet}
                    onInvalidRange={showAlert}
                  />
                  {bookingsLoading && (<p style={{ marginTop: '8px', color: '#666' }}>Loading availability…</p>)}
                </div>

                <div className="pricing-summary-card">
                  <h3 className="pricing-summary-title">Pricing Summary</h3>
                  <div className="pricing-item-list">
                    <div className="pricing-item">
                      <span>Subtotal</span>
                      <span><MdCurrencyRupee/>{pricing.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="pricing-item">
                      <span>Taxes & GST (5%)</span>
                      <span><MdCurrencyRupee/>{pricing.gst.toFixed(2)}</span>
                    </div>
                    <div className="pricing-total">
                      <span>Total Price</span>
                      <span><MdCurrencyRupee/>{pricing.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="form-step-title">Phone Verification</h2>
              <div className="veri-container-1">
                <div className="veri-card-1">
                  <h3 className="veri-title-1">Phone OTP</h3>
                  <div className="veri-phone-wrap-1">
                    <label className="veri-label-1">Enter Mobile Number</label>
                    <div className="veri-digits-1" role="group" aria-label="Mobile number">
                      {phoneDigits.map((d, i) => (
                        <input
                          style={{width:"28px"}}
                          key={i}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={1}
                          value={d}
                          ref={(el) => (phoneInputsRef.current[i] = el)}
                          onChange={(e) => handlePhoneChange(i, e.target.value.replace(/\D/g, ""))}
                          onKeyDown={(e) => handlePhoneKeyDown(i, e)}
                          className={`veri-digitbox-1 ${d ? "is-filled" : ""}`}
                          disabled={formData.phoneOtpVerified}
                        />
                      ))}
                    </div>
                    <button
                      onClick={handleSendOtp}
                      disabled={formData.phoneOtpVerified || phoneDigits.join("").length !== 10}
                      className={`veri-btn-1 ${ formData.phoneOtpVerified ? "veri-btn-verified-1" : "veri-btn-default-1" }`}
                    >
                      {formData.phoneOtpVerified ? "Verified" : "Send OTP"}
                    </button>
                  </div>

                  {showOtpInputs && !formData.phoneOtpVerified && (
                    <div className="veri-otp-wrap-1">
                      <label className="veri-label-1">Enter OTP</label>
                      <div className="veri-action-1">
                        <input
                          ref={otpInputRef}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={6}
                          value={otpValue}
                          onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ""))}
                          className="veri-input-1"
                          placeholder="Enter 4 or 6-digit OTP"
                        />
                        <button
                          onClick={() => handleSubmitOtp(otpValue)}
                          disabled={!(otpValue.length === 4 || otpValue.length === 6) || loading}
                          className={`veri-btn-1 veri-btn-default-1`}
                        >
                          {loading ? "Verifying…" : "Verify"}
                        </button>
                      </div>
                      {otpError && <p className="veri-error-1">{otpError}</p>}
                    </div>
                  )}

                  <div className="veri-icon-1">
                    {formData.phoneOtpVerified ? <CheckCircle size={24} color="#8b0000" /> : <XCircle size={24} color="gray" />}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="form-step-title">Photo Upload</h2>
              <div
                className={`upload-container ${isPhotoUploading ? 'is-uploading' : ''}`}
                onDragOver={(e) => e.preventDefault()}
                onDragLeave={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
                onClick={() => fileInputRef.current.click()}
              >
                {isPhotoUploading ? (
                  <div className="flex flex-col items-center space-y-2">
                    <Loader size={48} className="animate-spin text-gray-400" />
                    <p className="upload-text">Uploading...</p>
                  </div>
                ) : (
                  <>
                    <UploadCloud size={48} className="upload-icon" />
                    <p className="upload-text">Drag and drop your photo here, or<br/><span>click to browse</span></p>
                  </>
                )}
              </div>
              <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/*" />
              {formData.uploadedPhoto && (
                <div className="photo-preview-container">
                  <h3 className="photo-preview-title">Preview</h3>
                  <img src={formData.uploadedPhoto} alt="Uploaded Preview" className="photo-preview-image" />
                </div>
              )}
            </div>
          )}

          {step === 6 && (
            <div>
              <h2 className="form-step-title">Payment</h2>
              <div className="payment-container">
                <p className="payment-price-text">
                  Final Price: <span className="payment-price-amount"><MdOutlineCurrencyRupee size={20} />{pricing.total.toFixed(2)}</span>
                </p>
                <button
                  onClick={handlePayNow}
                  disabled={!isPayNowEnabled || isSubmitting}
                  className={`pay-now-button ${isPayNowEnabled && !isSubmitting ? 'is-enabled' : 'is-disabled'}`}
                >
                  {isSubmitting ? 'Processing…' : 'Pay Now'}
                </button>
                {!isPayNowEnabled && (<p className="disabled-message">Please complete all previous steps to enable payment.</p>)}
              </div>
            </div>
          )}
        </div>

        <div className="navigation-container">
          <button onClick={handlePrev} disabled={step === 1} className="navigation-button prev-button">Prev</button>
          <button onClick={handleNext} disabled={step === steps.length} className="navigation-button next-button">Next</button>
        </div>
      </div>

      {alertMessage && <CustomAlert message={alertMessage} onClose={closeAlert} />}
    </div>
   </>
  );
}

export default Payment;