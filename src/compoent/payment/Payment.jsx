import { useState, useEffect, useRef } from 'react';
import { CheckCircle, XCircle, UploadCloud, Loader, ChevronLeft, ChevronRight } from 'lucide-react';
import './Payment.css';
import { MdCurrencyRupee, MdOutlineCurrencyRupee } from 'react-icons/md';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { format } from 'date-fns';

// ---------- Surepass config (dev only) ----------
const SUREPASS_BEARER =
  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMDE0NjA5NiwianRpIjoiNmM0YWMxNTMtNDE2MS00YzliLWI4N2EtZWIxYjhmNDRiOTU5IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnVzZXJuYW1lXzJ5MTV1OWk0MW10bjR3eWpsaTh6b2p6eXZiZEBzdXJlcGFzcy5pbyIsIm5iZiI6MTcxMDE0NjA5NiwiZXhwIjoyMzQwODY2MDk2LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsidXNlciJdfX0.DfipEQt4RqFBQbOK29jbQju3slpn0wF9aoccdmtIsPg';

const spHeaders = (json = true) => ({
  ...(json ? { 'Content-Type': 'application/json' } : {}),
  Authorization: SUREPASS_BEARER,
});

// Endpoints used
const TELECOM_GEN = 'https://kyc-api.surepass.io/api/v1/telecom/generate-otp';
const TELECOM_SUB = 'https://kyc-api.surepass.io/api/v1/telecom/submit-otp';
const AADHAAR_GEN_OTP = 'https://kyc-api.surepass.io/api/v1/aadhaar-v2/generate-otp';
const AADHAAR_SUBMIT_OTP = 'https://kyc-api.surepass.io/api/v1/aadhaar-v2/submit-otp';
const AADHAAR_VALIDATION = 'https://kyc-api.surepass.io/api/v1/aadhaar-validation/aadhaar-validation';
const ASYNC_SUBMIT = 'https://kyc-api.surepass.io/api/v1/async/submit';
const ASYNC_STATUS = (clientId) => `https://kyc-api.surepass.io/api/v1/async/status/${clientId}`;

// ---------- Calendar ----------
const Calendar = ({ selectedDates, onDateSelect, minDate = new Date(), disabledDateSet = new Set(), onInvalidRange }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [checkInDate, setCheckInDate] = useState(selectedDates.checkInDate ? new Date(selectedDates.checkInDate) : null);
  const [checkOutDate, setCheckOutDate] = useState(selectedDates.checkOutDate ? new Date(selectedDates.checkOutDate) : null);
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const daysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const getDaysInMonth = (date) => {
    const y = date.getFullYear(), m = date.getMonth();
    const first = new Date(y, m, 1), last = new Date(y, m + 1, 0);
    const startingDay = first.getDay(), daysInMonth = last.getDate();
    const days = [];
    for (let i = 0; i < startingDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(y, m, i));
    return days;
  };
  const isDateDisabled = (date) => {
    if (!date) return true;
    const ds = date.toISOString().split('T')[0];
    const min = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    return date < min || disabledDateSet.has(ds);
  };
  const isDateSelected = (date) => {
    if (!date) return false;
    const ds = date.toISOString().split('T')[0];
    return (checkInDate && ds === checkInDate.toISOString().split('T')[0]) ||
           (checkOutDate && ds === checkOutDate.toISOString().split('T')[0]);
  };
  const isDateInRange = (date) => {
    if (!date || !checkInDate || !checkOutDate) return false;
    const ds = date.toISOString().split('T')[0];
    const a = checkInDate.toISOString().split('T')[0];
    const b = checkOutDate.toISOString().split('T')[0];
    return ds > a && ds < b;
  };
  const hasBlockedInRange = (start, end) => {
    if (!start || !end) return false;
    const s = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const e = new Date(end.getFullYear(), end.getMonth(), end.getDate());
    for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
      const ds = d.toISOString().split('T')[0];
      if (disabledDateSet.has(ds)) return true;
    }
    return false;
  };
  const handleDateClick = (date) => {
    if (!date || isDateDisabled(date)) return;
    if (!checkInDate || (checkInDate && checkOutDate)) {
      setCheckInDate(date);
      setCheckOutDate(null);
    } else {
      if (date > checkInDate) {
        if (hasBlockedInRange(checkInDate, date)) {
          onInvalidRange && onInvalidRange('Selected range includes unavailable dates. Choose different dates.');
          return;
        }
        setCheckOutDate(date);
        onDateSelect({ checkInDate: checkInDate.toISOString().split('T')[0], checkOutDate: date.toISOString().split('T')[0] });
      } else {
        if (hasBlockedInRange(date, checkInDate)) {
          onInvalidRange && onInvalidRange('Selected range includes unavailable dates. Choose different dates.');
          return;
        }
        setCheckOutDate(checkInDate);
        setCheckInDate(date);
        onDateSelect({ checkInDate: date.toISOString().split('T')[0], checkOutDate: checkInDate.toISOString().split('T')[0] });
      }
    }
  };
  const days = getDaysInMonth(currentMonth);
  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))} className="calendar-nav-button"><ChevronLeft size={20}/></button>
        <h3 className="calendar-title">{months[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
        <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} className="calendar-nav-button"><ChevronRight size={20}/></button>
      </div>
      <div className="calendar-grid">
        {daysOfWeek.map(d => <div key={d} className="calendar-day-header">{d}</div>)}
        {days.map((date, i) => (
          <button key={i} onClick={() => handleDateClick(date)} disabled={!date || isDateDisabled(date)}
            className={`calendar-day ${!date ? 'calendar-day-empty' : isDateDisabled(date) ? 'calendar-day-disabled' : isDateSelected(date) ? 'calendar-day-selected' : isDateInRange(date) ? 'calendar-day-in-range' : 'calendar-day-available'}`}>
            {date ? date.getDate() : ''}
          </button>
        ))}
      </div>
      <div className="calendar-selection">
        <div className="calendar-selection-item"><span className="calendar-selection-label">Check-in:</span><span className="calendar-selection-date">{checkInDate ? checkInDate.toLocaleDateString() : 'Not selected'}</span></div>
        <div className="calendar-selection-item"><span className="calendar-selection-label">Check-out:</span><span className="calendar-selection-date">{checkOutDate ? checkOutDate.toLocaleDateString() : 'Not selected'}</span></div>
      </div>
    </div>
  );
};

// ---------- Main ----------
function Payment() {
  const [step, setStep] = useState(1);
  const [property, setProperty] = useState(null);
  const [formData, setFormData] = useState({ termsAgreed:false, checkInDate:'', checkOutDate:'', phoneOtpVerified:false, aadhaarVerified:false, uploadedPhoto:null });

  // Phone
  const [phoneDigits, setPhoneDigits] = useState(Array(10).fill(''));
  const [showOtpInputs, setShowOtpInputs] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const phoneInputsRef = useRef([]);
  const otpInputRef = useRef(null);
  const [clientId, setClientId] = useState('');
  const [loading, setLoading] = useState(false);

  // Aadhaar
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [isAadhaarLoading, setIsAadhaarLoading] = useState(false);
  const [aadhaarClientId, setAadhaarClientId] = useState('');
  const [aadhaarOtp, setAadhaarOtp] = useState('');
  const [aadhaarOtpStep, setAadhaarOtpStep] = useState('idle'); // idle | sent

  // Pricing etc.
  const [pricing, setPricing] = useState({ subtotal:0, gst:0, total:0 });
  const [isPayNowEnabled, setIsPayNowEnabled] = useState(false);
  const [isPhotoUploading, setIsPhotoUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [disabledDateSet, setDisabledDateSet] = useState(new Set());
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Alerts
  const [alertMessage, setAlertMessage] = useState(null);
  const showAlert = (m) => setAlertMessage(m);
  const closeAlert = () => setAlertMessage(null);

  // User context
  const propertyId = localStorage.getItem('property_id') || '2';
  const token = Cookies.get('jwttoken');
  let username = '';
  try { if (token) username = jwtDecode(token).username; } catch {}

  // Property + availability
  useEffect(() => { (async()=>{
    try{
      const r=await fetch(`https://townmanor.ai/api/properties/${propertyId}`); const j=await r.json();
      if (j?.success) setProperty(j.property);
    }catch{}
  })(); }, [propertyId]);

  useEffect(() => {
    if (step !== 3) return;
    (async()=>{
      try{
        setBookingsLoading(true);
        const r=await fetch('https://townmanor.ai/api/booking/dates'); const j=await r.json();
        const pid = Number(propertyId);
        const bookings = Array.isArray(j?.bookings)?j.bookings:[];
        const filtered = bookings.filter(b=>Number(b.property_id)===pid && Number(b.cancelled)===0);
        const s=new Set();
        filtered.forEach(b=>{
          const start=new Date(b.start_date); const end=new Date(b.end_date);
          for (let d=new Date(start); d<end; d.setDate(d.getDate()+1)) s.add(d.toISOString().split('T')[0]);
        });
        setDisabledDateSet(s);
      } finally { setBookingsLoading(false); }
    })();
  }, [step, propertyId]);

  // Pricing
  useEffect(() => {
    if (formData.checkInDate && formData.checkOutDate && property?.per_night_price) {
      const a = new Date(formData.checkInDate), b = new Date(formData.checkOutDate);
      const nights = Math.ceil((b-a)/(1000*60*60*24));
      const subtotal = Math.max(0,nights) * Number(property.per_night_price);
      const gst = subtotal * 0.05;
      setPricing({ subtotal, gst, total: subtotal+gst });
    } else setPricing({ subtotal:0, gst:0, total:0 });
  }, [formData.checkInDate, formData.checkOutDate, property]);

  useEffect(() => {
    const ok = formData.termsAgreed && formData.checkInDate && formData.checkOutDate && pricing.total>0 && formData.phoneOtpVerified && formData.aadhaarVerified && formData.uploadedPhoto;
    setIsPayNowEnabled(ok);
  }, [formData, pricing]);

  // Phone OTP
  const handlePhoneChange = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const next=[...phoneDigits]; next[i]=v; setPhoneDigits(next);
    if (v && i<9) phoneInputsRef.current[i+1]?.focus();
  };
  const handlePhoneKeyDown = (i, e) => { if (e.key==='Backspace' && !phoneDigits[i] && i>0) phoneInputsRef.current[i-1]?.focus(); };

  const handleSendOtp = async () => {
    const phone = phoneDigits.join('');
    if (!/^\d{10}$/.test(phone)) return showAlert('Enter valid 10‑digit phone number.');
    setLoading(true);
    try {
      const { data } = await axios.post(TELECOM_GEN, { id_number: phone }, { headers: spHeaders(true) });
      if (data?.success) {
        setClientId(data?.data?.client_id || '');
        setShowOtpInputs(true); setOtpValue('');
        showAlert('Phone OTP sent.');
        setTimeout(()=>otpInputRef.current?.focus(),0);
      } else showAlert(data?.message || 'Failed to send OTP.');
    } catch(e){ showAlert(e?.response?.data?.message || e.message || 'Failed to send OTP.'); }
    finally{ setLoading(false); }
  };

  const handleSubmitOtp = async (otp) => {
    if (!(otp?.length===4 || otp?.length===6)) return showAlert('Enter 4 or 6‑digit OTP.');
    setLoading(true);
    try {
      const { data } = await axios.post(TELECOM_SUB, { client_id: clientId, otp }, { headers: spHeaders(true) });
      if (data?.success) {
        setFormData(p=>({...p, phoneOtpVerified:true})); setShowOtpInputs(false);
        showAlert('Phone verified.');
      } else showAlert(data?.message || 'Invalid OTP.');
    } catch(e){ showAlert(e?.response?.data?.message || e.message || 'Failed to verify OTP.'); }
    finally{ setLoading(false); }
  };

  // Aadhaar flows
  const generateAadhaarOtp = async () => {
    const id = aadhaarNumber.trim();
    if (!/^\d{12}$/.test(id)) return showAlert('Enter valid 12‑digit Aadhaar.');
    setIsAadhaarLoading(true);
    try {
      const { data } = await axios.post(AADHAAR_GEN_OTP, { id_number:id }, { headers: spHeaders(true) });
      if (data?.success) {
        setAadhaarClientId(data?.data?.client_id || '');
        setAadhaarOtpStep('sent');
        showAlert('Aadhaar OTP sent to linked mobile.');
      } else {
        showAlert(data?.message || 'Failed to send Aadhaar OTP.');
      }
    } catch(e){
      const status = e?.response?.status;
      const msg = e?.response?.data?.message || e.message;
      // If 410 (backend discontinued) -> fallback to validation-only
      if (status === 410) {
        showAlert('Aadhaar OTP backend disabled on this account. Falling back to validation without OTP.');
        await validateAadhaarSimple(); // fallback
      } else {
        showAlert(`Aadhaar OTP error (${status || 'ERR'}): ${msg}`);
      }
    } finally { setIsAadhaarLoading(false); }
  };

  const submitAadhaarOtp = async () => {
    if (!/^\d{6}$/.test(aadhaarOtp)) return showAlert('Enter 6‑digit OTP.');
    if (!aadhaarClientId) return showAlert('Client ID missing. Send OTP again.');
    setIsAadhaarLoading(true);
    try {
      const { data } = await axios.post(AADHAAR_SUBMIT_OTP, { client_id: aadhaarClientId, otp: aadhaarOtp }, { headers: spHeaders(true) });
      const success = data?.success === true;
      const valid = data?.data?.valid_aadhaar === true || data?.message_code === 'success';
      if (success && valid) {
        setFormData(p=>({...p, aadhaarVerified:true}));
        setAadhaarOtpStep('idle');
        showAlert('Aadhaar verified successfully.');
      } else {
        showAlert(data?.message || 'Aadhaar verification failed.');
      }
    } catch(e){
      const status = e?.response?.status;
      const msg = e?.response?.data?.message || e.message;
      showAlert(`Aadhaar submit error (${status || 'ERR'}): ${msg}`);
    } finally { setIsAadhaarLoading(false); }
  };

  // Validation-only endpoint (no OTP)
  const validateAadhaarSimple = async () => {
    const id = aadhaarNumber.trim();
    if (!/^\d{12}$/.test(id)) return showAlert('Enter valid 12‑digit Aadhaar.');
    setIsAadhaarLoading(true);
    try {
      const { data } = await axios.post(AADHAAR_VALIDATION, { id_number:id }, { headers: spHeaders(true) });
      const ok = data?.success === true && (data?.data?.valid_aadhaar || data?.data?.is_valid || data?.message_code === 'success' || data?.data?.remarks === 'success');
      if (ok) {
        setFormData(p=>({...p, aadhaarVerified:true}));
        showAlert('Aadhaar validated.');
      } else {
        showAlert(data?.message || 'Aadhaar not valid.');
      }
    } catch(e){
      const status = e?.response?.status;
      const msg = e?.response?.data?.message || e.message;
      showAlert(`Aadhaar validation error (${status || 'ERR'}): ${msg}`);
    } finally { setIsAadhaarLoading(false); }
  };

  // File upload (unchanged)
  const handleFile = async (file) => {
    if (!file?.type?.startsWith('image/')) return showAlert('Please upload an image file.');
    setIsPhotoUploading(true);
    const fd = new FormData(); fd.append('images', file);
    try {
      const r = await fetch('https://www.townmanor.ai/api/image/aws-upload-owner-images', { method:'POST', body: fd });
      const j = await r.json();
      const url = j?.fileUrls?.[0];
      if (!url) throw new Error('Image URL not found.');
      setFormData(prev => ({...prev, uploadedPhoto: url}));
      showAlert('Photo uploaded successfully!');
    } catch(e){ showAlert(e?.message || 'Upload failed.'); }
    finally { setIsPhotoUploading(false); }
  };
  const handleFileDrop = (e)=>{ e.preventDefault(); e.stopPropagation(); if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]); };
  const handleFileChange = (e)=>{ if (e.target.files?.[0]) handleFile(e.target.files[0]); };

  // Payment (kept same as your logic)
  const handlePayNow = async () => {
    if (!isPayNowEnabled || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const userLocal = (()=>{ try { return JSON.parse(localStorage.getItem('user')||'{}'); } catch { return {}; }})();
      const bookingDetails = {
        property_id: String(propertyId || '2'),
        start_date: format(new Date(formData.checkInDate), 'yyyy-MM-dd'),
        end_date: format(new Date(formData.checkOutDate), 'yyyy-MM-dd'),
        username: userLocal.username || username || '',
        phone_number: phoneDigits.join(''),
        aadhar_number: aadhaarNumber || '',
        user_photo: formData.uploadedPhoto || '',
        terms_verified: !!formData.termsAgreed,
        email: userLocal.email || '',
      };
      const { data } = await axios.post('https://townmanor.ai/api/booking', bookingDetails);
      const bookingId = data?.booking?.id || data?.booking_id || data?.id || data?.bookingId;
      if (bookingId) {
        localStorage.setItem('paymentType','coliving');
        localStorage.setItem('bookingId', String(bookingId));
      }
      const userResp = await fetch(`https://www.townmanor.ai/api/user/${username}`);
      if (!userResp.ok) throw new Error('Failed to fetch user data');
      const user = await userResp.json();
      const txnid = 'OID' + Date.now();
      const payload = {
        key: 'UvTrjC', txnid, amount: pricing.total, productinfo: 'Room Booking',
        firstname: user.name || username || '', email: user.email || '', phone: user.phone || '',
        surl: `https://townmanor.ai/api/boster/payu/success?redirectUrl=https://www.ovika.co.in/success`,
        furl: `https://townmanor.ai/api/boster/payu/failure?redirectUrl=https://www.ovika.co.in/failure`,
        udf1: bookingId || '', service_provider: 'payu_paisa'
      };
      const resp = await axios.post('https://townmanor.ai/api/payu/payment', payload);
      if (!resp.data?.paymentUrl || !resp.data?.params) throw new Error('Invalid payment response');
      const form = document.createElement('form'); form.method='POST'; form.action=resp.data.paymentUrl;
      Object.entries(resp.data.params).forEach(([k,v]) => { if (v!==undefined && v!==null) { const input=document.createElement('input'); input.type='hidden'; input.name=String(k); input.value=String(v); form.appendChild(input); }});
      document.body.appendChild(form); form.submit(); document.body.removeChild(form);
    } catch(e){ showAlert(e?.response?.data?.message || e.message || 'Failed to initiate payment.'); }
    finally { setIsSubmitting(false); }
  };

  // UI
  const steps = ['Property','Terms','Dates & Pricing','Verification','Photo Upload','Payment'];
  const handleNext = () => {
    if (step===2 && !formData.termsAgreed) return;
    if (step===3 && (!formData.checkInDate || !formData.checkOutDate || pricing.total<=0)) return;
    if (step===4 && (!formData.phoneOtpVerified || !formData.aadhaarVerified)) return;
    if (step===5 && !formData.uploadedPhoto) return;
    if (step<6) setStep(step+1);
  };
  const handlePrev = () => { if (step>1) setStep(step-1); };

  return (
    <div className="booking-form-wrapper">
      <div className="booking-form-container">
        <div className="progress-bar-container">
          {steps.map((name, index)=>(
            <div key={index} className="progress-bar-step">
              <div className={`progress-bar-line ${index < step ? 'is-active':''}`}></div>
              <span className={`progress-bar-step-name ${index+1===step?'is-active':''}`}>{name}</span>
            </div>
          ))}
        </div>

        {/* Step 1: Property */}
        {step===1 && (
          <div>
            <h2 className="form-step-title">Property Details</h2>
            <div className="form-step-card">
              <img src={(property?.images?.[0]) || '/image 71.png'} alt="Property" className="form-step-card-image"/>
              <div className="form-step-card-content">
                <h3 className="form-step-card-title">{property?.name || '—'}</h3>
                <p className="form-step-card-location">{property?.address || ''}</p>
                <p className="form-step-card-description">{property?.description || ''}</p>
                <p className="form-step-card-price"><MdCurrencyRupee/>{property?.per_night_price || 0}<span className="form-step-card-price-per-night">/night</span></p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Terms */}
        {step===2 && (
          <div>
            <h2 className="form-step-title">Terms & Conditions</h2>
            <div className="terms-container">
              <p className="mb-2 font-bold">1. Booking Agreement</p>
              <p className="mb-4">By confirming this booking, you agree to abide by house rules...</p>
              <p className="mb-2 font-bold">2. Cancellation Policy</p>
              <p className="mb-4">Refund rules...</p>
              <p className="mb-2 font-bold">3. Damage & Liability</p>
              <p className="mb-4">Guests are responsible for damages...</p>
              <p className="mb-2 font-bold">4. Payment & Pricing</p>
              <p className="mb-4">All prices are final...</p>
              <p className="mb-2 font-bold">5. Privacy</p>
              <p className="mb-4">Your information will be used solely for booking...</p>
            </div>
            <label className="terms-agreement-label">
              <input type="checkbox" className="hidden" checked={formData.termsAgreed} onChange={(e)=>setFormData({...formData, termsAgreed:e.target.checked})}/>
              <span className={`custom-checkbox ${formData.termsAgreed?'is-checked':''}`}>{formData.termsAgreed && <CheckCircle size={16} color="white"/>}</span>
              <span className="custom-checkbox-text">I have read and agree to the Terms & Conditions.</span>
            </label>
          </div>
        )}

        {/* Step 3: Dates & Pricing */}
        {step===3 && (
          <div>
            <h2 className="form-step-title">Dates & Pricing</h2>
            <div className="dates-pricing-container">
              <div className="calendar-section">
                <Calendar
                  selectedDates={{ checkInDate: formData.checkInDate, checkOutDate: formData.checkOutDate }}
                  onDateSelect={(d)=>setFormData({...formData, ...d})}
                  minDate={new Date()}
                  disabledDateSet={disabledDateSet}
                  onInvalidRange={showAlert}
                />
                {bookingsLoading && <p style={{marginTop:8,color:'#666'}}>Loading availability…</p>}
              </div>
              <div className="pricing-summary-card">
                <h3 className="pricing-summary-title">Pricing Summary</h3>
                <div className="pricing-item-list">
                  <div className="pricing-item"><span>Subtotal</span><span><MdCurrencyRupee/>{pricing.subtotal.toFixed(2)}</span></div>
                  <div className="pricing-item"><span>Taxes & GST (5%)</span><span><MdCurrencyRupee/>{pricing.gst.toFixed(2)}</span></div>
                  <div className="pricing-total"><span>Total Price</span><span><MdCurrencyRupee/>{pricing.total.toFixed(2)}</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Verification */}
        {step===4 && (
          <div>
            <h2 className="form-step-title">Verification</h2>
            <div className="verification-container">
              {/* Phone */}
              <div className="verification-card">
                <h3 className="verification-title">Phone OTP</h3>
                <label className="digit-inputs-label">Enter Mobile Number</label>
                <div className="digit-inputs" role="group" aria-label="Mobile number">
                  {phoneDigits.map((d,i)=>(
                    <input key={i} type="text" inputMode="numeric" pattern="[0-9]*" maxLength={1}
                      value={d} ref={el=>phoneInputsRef.current[i]=el}
                      onChange={(e)=>handlePhoneChange(i, e.target.value.replace(/\D/g,''))}
                      onKeyDown={(e)=>handlePhoneKeyDown(i, e)}
                      className={`digit-box ${d?'is-filled':''}`} disabled={formData.phoneOtpVerified}/>
                  ))}
                </div>
                <button onClick={handleSendOtp} disabled={formData.phoneOtpVerified || phoneDigits.join('').length!==10}
                  className={`verification-button ${formData.phoneOtpVerified?'verification-button-verified':'verification-button-default'} send-otp-button`}>
                  {formData.phoneOtpVerified ? 'Verified' : 'Send OTP'}
                </button>

                {showOtpInputs && !formData.phoneOtpVerified && (
                  <div className="otp-inputs-container">
                    <label className="digit-inputs-label">Enter OTP</label>
                    <div className="verification-action">
                      <input ref={otpInputRef} type="text" inputMode="numeric" pattern="[0-9]*" maxLength={6}
                        value={otpValue} onChange={(e)=>setOtpValue(e.target.value.replace(/\D/g,''))}
                        className="aadhaar-input" placeholder="Enter 4 or 6-digit OTP"/>
                      <button onClick={()=>handleSubmitOtp(otpValue)} disabled={!(otpValue.length===4 || otpValue.length===6) || loading}
                        className="verification-button verification-button-default">{loading?'Verifying…':'Verify'}</button>
                    </div>
                  </div>
                )}

                <div className="verification-status-icon">
                  {formData.phoneOtpVerified ? <CheckCircle size={24} color="#8b0000"/> : <XCircle size={24} color="gray"/>}
                </div>
              </div>

              {/* Aadhaar */}
              <div className="verification-card">
                <h3 className="verification-title">Aadhaar Check</h3>
                <label className="digit-inputs-label">Enter Aadhaar Number</label>
                <div className="aadhaar-inputs-container">
                  <input type="text" inputMode="numeric" pattern="[0-9]*" maxLength={12} value={aadhaarNumber}
                    onChange={(e)=>setAadhaarNumber(e.target.value.replace(/\D/g,''))}
                    className="aadhaar-input" disabled={formData.aadhaarVerified || aadhaarOtpStep==='sent'} placeholder="12-digit Aadhaar"/>
                  {aadhaarOtpStep==='idle' && !formData.aadhaarVerified && (
                    <button onClick={generateAadhaarOtp} disabled={!aadhaarNumber || isAadhaarLoading}
                      className="verification-button verification-button-default">
                      {isAadhaarLoading?'Sending…':'Send Aadhaar OTP'}
                    </button>
                  )}
                </div>

                {aadhaarOtpStep==='sent' && !formData.aadhaarVerified && (
                  <div className="otp-inputs-container">
                    <label className="digit-inputs-label">Enter Aadhaar OTP</label>
                    <div className="verification-action">
                      <input type="text" inputMode="numeric" pattern="[0-9]*" maxLength={6}
                        value={aadhaarOtp} onChange={(e)=>setAadhaarOtp(e.target.value.replace(/\D/g,''))}
                        className="aadhaar-input" placeholder="6-digit OTP"/>
                      <button onClick={submitAadhaarOtp} disabled={!/^\d{6}$/.test(aadhaarOtp) || isAadhaarLoading}
                        className="verification-button verification-button-default">{isAadhaarLoading?'Verifying…':'Verify'}</button>
                    </div>
                  </div>
                )}

                <div className="verification-status-icon">
                  {formData.aadhaarVerified ? <CheckCircle size={24} color="#8b0000"/> : (isAadhaarLoading ? <Loader size={24} className="animate-spin text-gray-400"/> : <XCircle size={24} color="gray"/>)}
                </div>

                {/* Optional manual validation button if you prefer no OTP */}
                {!formData.aadhaarVerified && aadhaarOtpStep==='idle' && (
                  <div style={{marginTop:8}}>
                    <button className="verification-button verification-button-default" onClick={validateAadhaarSimple} disabled={!aadhaarNumber || isAadhaarLoading}>
                      Use Validation Only (No OTP)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Photo Upload */}
        {step===5 && (
          <div>
            <h2 className="form-step-title">Photo Upload</h2>
            <div className={`upload-container ${isPhotoUploading?'is-uploading':''}`} onDragOver={(e)=>e.preventDefault()} onDrop={handleFileDrop} onClick={()=>fileInputRef.current?.click()}>
              {isPhotoUploading ? <div className="flex flex-col items-center space-y-2"><Loader size={48} className="animate-spin text-gray-400"/><p className="upload-text">Uploading...</p></div> :
                (<><UploadCloud size={48} className="upload-icon"/><p className="upload-text">Drag and drop your photo here, or<br/><span>click to browse</span></p></>)}
            </div>
            <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/*"/>
            {formData.uploadedPhoto && (<div className="photo-preview-container"><h3 className="photo-preview-title">Preview</h3><img src={formData.uploadedPhoto} alt="Uploaded Preview" className="photo-preview-image"/></div>)}
          </div>
        )}

        {/* Step 6: Payment */}
        {step===6 && (
          <div>
            <h2 className="form-step-title">Payment</h2>
            <div className="payment-container">
              <p className="payment-price-text">Final Price: <span className="payment-price-amount"><MdOutlineCurrencyRupee size={20}/>{pricing.total.toFixed(2)}</span></p>
              <button onClick={handlePayNow} disabled={!isPayNowEnabled || isSubmitting} className={`pay-now-button ${isPayNowEnabled && !isSubmitting ? 'is-enabled':'is-disabled'}`}>{isSubmitting?'Processing…':'Pay Now'}</button>
              {!isPayNowEnabled && <p className="disabled-message">Please complete all previous steps to enable payment.</p>}
            </div>
          </div>
        )}

        <div className="navigation-container">
          <button onClick={handlePrev} disabled={step===1} className="navigation-button prev-button">Prev</button>
          <button onClick={handleNext} disabled={step===6 || (step===2 && !formData.termsAgreed)} className="navigation-button next-button">Next</button>
        </div>
      </div>

      {alertMessage && (
        <div className="alert__overlay">
          <div className="alert__box">
            <p className="alert__message">{alertMessage}</p>
            <button onClick={closeAlert} className="alert__button">OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payment;
