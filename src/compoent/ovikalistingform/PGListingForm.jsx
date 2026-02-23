import React, { useState, useEffect, useContext } from "react";
import "./tmx9pf-form.css"; // Reusing the same CSS for consistency
import { AuthContext } from "../Login/AuthContext";

const API_BASE = "https://townmanor.ai/api";
const STORAGE_KEY = "user";

const PG_AMENITIES = {
  Essentials: ["Wi-Fi", "Power Backup", "Water Supply", "Housekeeping", "Laundry Service"],
  Room_Features: ["Attached Bathroom", "Balcony", "Air Conditioner", "Geyser", "Study Table", "Cupboard", "TV"],
  Food_Kitchen: ["Breakfast", "Lunch", "Dinner", "Tea/Coffee", "Self-cooking Kitchen", "Refrigerator", "Microwave", "RO Water Purifier"],
  Security: ["CCTV", "Biometric Entry", "Security Guard", "Warden"],
  Common_Areas: ["Common Room", "Dining Area", "Gym", "Gaming Zone", "Terrace", "Lift", "Parking"],
};

const CANCELLATION_POLICIES = ["Flexible", "Moderate", "Strict"];
const PG_TYPES = ["Boys PG", "Girls PG", "Co-ed PG"];
const SHARING_TYPES = ["Single Room", "Double Sharing", "Triple Sharing", "Four Sharing", "Dormitory"];

const BOOKING_TYPES = [
  { id: 0, label: "Instant Booking", desc: "Guests can book instantly without waiting for approval." },
  { id: 1, label: "Request to Book", desc: "You review and accept or decline booking requests." }
];

function useFilePreviews() {
  const [previews, setPreviews] = useState([]);
  const update = (files) => {
    const arr = Array.from(files || []).slice(0, 12);
    const readers = arr.map((file) => {
      return new Promise((res) => {
        const r = new FileReader();
        r.onload = (e) => res({ name: file.name, url: e.target.result, file });
        r.readAsDataURL(file);
      });
    });
    Promise.all(readers).then(setPreviews);
  };
  const clear = () => setPreviews([]);
  return { previews, update, clear };
}

const ACCEPTED_MIME = ["application/pdf", "image/avif"];
function isImageMime(mime) {
  return typeof mime === "string" && mime.startsWith("image/");
}
function isAcceptedFile(file) {
  if (!file) return false;
  const { type, name } = file;
  if (isImageMime(type)) return true;
  if (ACCEPTED_MIME.includes(type)) return true;
  const ext = (name || "").split(".").pop()?.toLowerCase() || "";
  if (["jpg", "jpeg", "png", "gif", "webp", "avif", "pdf"].includes(ext)) return true;
  return false;
}

const PGListingForm = () => {
  const { user } = useContext(AuthContext);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    propertyType: PG_TYPES[0], // Boys/Girls/Co-ed
    propertyCategory: "PG", // Fixed
    title: "",
    mainDescription: "",
    address: "",
    country: "India",
    postalCode: "",
    city: "",
    latitude: "",
    longitude: "",
    // Mapping sharing options to bedroom details with price
    bedroomDetails: [{ id: 0, type: "Double Sharing", count: 1, price: "", washroomType: "Attached" }], 
    bathroomDetails: [{ id: 0, type: "Attached", count: 1 }],
    beds: 1, // Total capacity
    area: "",
    amenities: {},
    checkInTime: "12:00:00",
    checkOutTime: "11:00:00",
    smokingAllowed: false,
    petsAllowed: false,
    eventsAllowed: false,
    drinkingAllowed: false,
    outsideGuestsAllowed: false,
    quietHours: "23:00-06:00",
    maxGuests: 1, // Vacancy count likely
    baseRate: "", // Monthly Rent
    bookingType: 1, // Default to Approval Required (Request to Book)
    cleaningFee: "", // Maintenance Charge
    selfCheckIn: "Not Available",
    registrationNumber: "",
    // Guidebook fields could be used for "Nearby Colleges/Offices"
    transportTips: { taxi: "", parking: "", localTravel: "" },
    cafesRestaurants: [{ id: 0, name: "", distanceM: "" }],
    essentialsNearby: { atm: "", grocery: "", medical: "" },
    mustVisitPlaces: [{ id: 0, place: "", bestTime: "" }],
    houseSpecificTips: [""],
     familyAllowed: false,
  unmarriedCoupleAllowed: false,
   bachelorAllowed: true, // Usually true for PGs
    noticePeriod: 30, // days
    lockInPeriod: 1, // months
    foodAvailable: false,
    electricityCharges: "Included in Rent", // or "Separate", "Fixed"
    perNightPrice: "", // New optional field
    gateClosingTime: "",
    localGuide: {
        nearestMetroStation: "",
        nearestBusStop: "",
        nearbyMarket: "",
        nearbyHospital: "",
        nearbyShowroom: "",
        otherNotes: ""
    }
  });

  const photoPreviews = useFilePreviews();
  const [coverIndex, setCoverIndex] = useState(null);
  const [idFiles, setIdFiles] = useState([]);
  const [selfieFile, setSelfieFile] = useState(null);
  const [policy, setPolicy] = useState(CANCELLATION_POLICIES[0]);
  const [insurance, setInsurance] = useState(false);
  const [damageProtection, setDamageProtection] = useState(false);
  const [securityDeposit, setSecurityDeposit] = useState(""); // Extra field handled in meta or description

  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [aadhaarVerified, setAadhaarVerified] = useState(false);
  const [isVerifyingAadhaar, setIsVerifyingAadhaar] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpClientId, setOtpClientId] = useState(null);

  const STEPS = [
    { id: 1, title: "PG Details" },
    { id: 2, title: "Rooms & Amenities" },
    { id: 3, title: "Rules & Policies" },
    { id: 4, title: "Local Guide" },
    { id: 5, title: "Photos" },
    { id: 6, title: "Rent & Charges" },
    { id: 7, title: "Verification" },
  ];
  const [step, setStep] = useState(0);

  useEffect(() => {
    const all = {};
    Object.values(PG_AMENITIES).flat().forEach((a) => (all[a] = false));
    setForm((f) => ({ ...f, amenities: all }));
  }, []);

  const validateForStep = (s) => {
    const newErrors = {};
    if (s === 0) {
      if (!form.title?.trim()) newErrors.title = "PG Name is required";
      if (!form.mainDescription?.trim()) newErrors.mainDescription = "Description is required";
      if (!form.address?.trim()) newErrors.address = "Address is required";
      if (!form.city?.trim()) newErrors.city = "City is required";
      if (!form.postalCode?.trim()) newErrors.postalCode = "Postal code is required";
    }

    if (s === 1) {
      if (form.bedroomDetails.length === 0) newErrors.bedrooms = "At least one room type is required";
      if (!form.area?.trim()) newErrors.area = "Area is required";
    }

    if (s === 4) { // Photos
       if (photoPreviews.previews.length === 0) newErrors.photos = "At least one photo is required";
    }

    if (s === 5) { // Pricing (Rent & Charges)
      if (!form.baseRate && form.baseRate !== 0) newErrors.baseRate = "Monthly rent is required";
    }

    if (s === 6) { // Verification
       if (!aadhaarVerified) newErrors.idFiles = "Please verify your Aadhaar number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const renderError = (field) => (errors[field] ? <span className="tmx9pf-error">{errors[field]}</span> : null);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const handleNumChange = (e) => {
    const { name, value } = e.target;
    const num = value === "" ? "" : Number(value);
    setForm((s) => ({ ...s, [name]: num }));
  };

  const handleAmenityToggle = (amenity) => {
    setForm((s) => ({ ...s, amenities: { ...s.amenities, [amenity]: !s.amenities[amenity] } }));
  };

  const handlePhotos = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) {
      photoPreviews.update([]);
      return;
    }
    const valid = [];
    files.forEach((f) => {
      if (isAcceptedFile(f)) valid.push(f);
    });
    if (valid.length > 0) {
       photoPreviews.update(valid);
       setCoverIndex(null);
    }
  };

  const removePhoto = (index) => {
    const updated = photoPreviews.previews.filter((_, i) => i !== index);
    photoPreviews.update([]);
    setTimeout(() => photoPreviews.update(updated.map((p) => p.file)), 0);
    if (coverIndex === index) setCoverIndex(null);
    else if (coverIndex > index) setCoverIndex((c) => c - 1);
  };

  // --- Verification Logic (Same as original) ---
  const verifyAadhaar = async () => {
    if (!aadhaarNumber || !/^\d{12}$/.test(aadhaarNumber)) {
      alert("Please enter a valid 12-digit Aadhaar number.");
      return;
    }
    setIsVerifyingAadhaar(true);
    try {
      const res = await fetch("https://kyc-api.surepass.app/api/v1/aadhaar-validation/aadhaar-validation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMDE0NjA5NiwianRpIjoiNmM0YWMxNTMtNDE2MS00YzliLWI4N2EtZWIxYjhmNDRiOTU5IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnVzZXJuYW1lXzJ5MTV1OWk0MW10bjR3eWpsaTh6b2p6eXZiZEBzdXJlcGFzcy5pbyIsIm5iZiI6MTcxMDE0NjA5NiwiZXhwIjoyMzQwODY2MDk2LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsidXNlciJdfX0.DfipEQt4RqFBQbOK29jbQju3slpn0wF9aoccdmtIsPg"
        },
        body: JSON.stringify({ id_number: aadhaarNumber })
      });
      const data = await res.json();
      if (data.success || data.status_code === 200) {
        setAadhaarVerified(true);
        setErrors(prev => ({ ...prev, idFiles: undefined }));
        alert("Aadhaar Verified Successfully!");
      } else {
        setAadhaarVerified(false);
        alert("Verification Failed: " + (data.message || "Invalid Aadhaar"));
      }
    } catch (err) {
      alert("Verification Error. Please try again.");
    } finally {
      setIsVerifyingAadhaar(false);
    }
  };

  const sendPhoneOtp = async () => {
     if (!phoneNumber || phoneNumber.length < 10) {
      alert("Please enter a valid phone number");
      return;
    }
    setIsSendingOtp(true);
    try {
      const res = await fetch("https://kyc-api.surepass.app/api/v1/telecom/generate-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMDE0NjA5NiwianRpIjoiNmM0YWMxNTMtNDE2MS00YzliLWI4N2EtZWIxYjhmNDRiOTU5IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnVzZXJuYW1lXzJ5MTV1OWk0MW10bjR3eWpsaTh6b2p6eXZiZEBzdXJlcGFzcy5pbyIsIm5iZiI6MTcxMDE0NjA5NiwiZXhwIjoyMzQwODY2MDk2LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsidXNlciJdfX0.DfipEQt4RqFBQbOK29jbQju3slpn0wF9aoccdmtIsPg"
        },
        body: JSON.stringify({ id_number: phoneNumber })
      });
      const data = await res.json();
      if (data.success || data.status_code === 200) {
        setOtpSent(true);
        setOtpClientId(data.data?.client_id || data.client_id); 
        alert("OTP Sent Successfully!");
      } else {
        alert("Failed to send OTP.");
      }
    } catch (err) {
      alert("Error sending OTP.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const verifyPhoneOtp = async () => {
    if (!phoneOtp) return;
    setIsVerifyingOtp(true);
    try {
      const res = await fetch("https://kyc-api.surepass.app/api/v1/telecom/submit-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMDE0NjA5NiwianRpIjoiNmM0YWMxNTMtNDE2MS00YzliLWI4N2EtZWIxYjhmNDRiOTU5IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnVzZXJuYW1lXzJ5MTV1OWk0MW10bjR3eWpsaTh6b2p6eXZiZEBzdXJlcGFzcy5pbyIsIm5iZiI6MTcxMDE0NjA5NiwiZXhwIjoyMzQwODY2MDk2LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsidXNlciJdfX0.DfipEQt4RqFBQbOK29jbQju3slpn0wF9aoccdmtIsPg"
        },
        body: JSON.stringify({ client_id: otpClientId, otp: phoneOtp })
      });
      const data = await res.json();
      if (data.success || data.status_code === 200) {
        setIsPhoneVerified(true);
        setOtpSent(false);
        alert("Phone Verified Successfully!");
      } else {
        setIsPhoneVerified(false);
        alert("Verification Failed.");
      }
    } catch (err) {
      alert("Verification Error.");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleSelfie = (e) => setSelfieFile(e.target.files?.[0] || null);

  // --- Navigation & User Resolution ---

  const goNext = () => {
    if (validateForStep(step)) {
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goPrev = () => {
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  function extractIdFromObj(obj) {
    if (!obj) return null;
    return obj.id || obj._id || obj.owner_id || obj.userId || obj.uid || null;
  }

  async function fetchServerUser() {
    try {
      const res = await fetch(`${API_BASE}/auth/me`, { method: "GET", credentials: "include" });
      const d = await res.json().catch(() => ({}));
      const maybe = d?.user || d?.data || d;
      if (extractIdFromObj(maybe)) {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(maybe)); } catch (e) {}
        return maybe;
      }
    } catch (err) { console.warn(err); }
    return null;
  }

  const resolveOwnerId = async () => {
    const idFromContext = extractIdFromObj(user);
    if (idFromContext) return idFromContext;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (extractIdFromObj(parsed)) return extractIdFromObj(parsed);
      }
    } catch (e) {}
    const serverUser = await fetchServerUser();
    if (extractIdFromObj(serverUser)) return extractIdFromObj(serverUser);
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const ownerId = await resolveOwnerId();
    if (!ownerId) {
      alert("Owner not found. Please sign in again.");
      setIsSubmitting(false);
      return;
    }

    if (!aadhaarVerified) {
      alert("Please complete Aadhaar verification before listing.");
      setIsSubmitting(false);
      return;
    }

    if (!isPhoneVerified) {
      alert("Please complete Phone verification before listing.");
      setIsSubmitting(false);
      return;
    }

    try {
      const fd = new FormData();
      fd.append("property_name", form.title || "");
      fd.append("description", form.mainDescription || "");
      fd.append("city", form.city || "");
      fd.append("address", form.address || "");
      if (form.baseRate !== "" && form.baseRate !== null) fd.append("price", Number(form.baseRate).toFixed(2));
      fd.append("booking_type", String(form.bookingType));
      fd.append("owner_id", String(ownerId));

      // PG specific guidebook formatting
      const guidebook = {
        transport_tips: form.transportTips,
        cafes_restaurants: form.cafesRestaurants.filter(c => c.name.trim()).map(c => ({ name: c.name, distance_m: Number(c.distanceM) || 0 })),
        essentials_nearby: form.essentialsNearby,
        must_visit_places: form.mustVisitPlaces.filter(p => p.place.trim()).map(p => ({ place: p.place, best_time: p.bestTime })),
        house_specific_tips: form.houseSpecificTips.filter(t => t.trim())
      };

      // Add Local Guide from new form structure
      if (form.localGuide) {
          guidebook.transport_tips = { 
              ...guidebook.transport_tips, 
              metro: form.localGuide.nearestMetroStation,
              bus: form.localGuide.nearestBusStop,
              local: form.localGuide.otherNotes
          };
          guidebook.essentials_nearby = {
              ...guidebook.essentials_nearby,
              grocery: form.localGuide.nearbyMarket,
              medical: form.localGuide.nearbyHospital,
              shopping: form.localGuide.nearbyShowroom
          };
      }

      const meta = {
        propertyType: form.propertyType, // Boys PG, Girls PG etc
        propertyCategory: "PG", 
        // Mapping bedroom details to what backend expects, including price per sharing type
        bedrooms: form.bedroomDetails.map(d => ({ type: d.type, count: d.count, price: d.price, washroomType: d.washroomType })),
        beds: form.beds, // Total Capacity
        bathrooms: form.bathroomDetails.map(d => ({ type: d.type, count: d.count })),
        area: form.area,
        amenities: Object.keys(form.amenities || {}).filter((k) => form.amenities[k]),
        checkInTime: form.checkInTime,
        checkOutTime: form.checkOutTime,
        smokingAllowed: form.smokingAllowed,
        petsAllowed: form.petsAllowed,
        eventsAllowed: form.eventsAllowed,
        drinkingAllowed: form.drinkingAllowed,
        outsideGuestsAllowed: form.outsideGuestsAllowed,
        maxGuests: form.maxGuests,
        gateClosingTime: form.gateClosingTime,
        cleaningFee: form.cleaningFee, // Maintenance
        securityDeposit: securityDeposit, // Custom field for PG
        selfCheckIn: form.selfCheckIn,
        bookingType: form.bookingType,
        cancellationPolicy: policy,
        insurance,
        damageProtection,
        postalCode: form.postalCode,
        country: form.country,
        ...(form.latitude && { latitude: Number(form.latitude) }),
        ...(form.longitude && { longitude: Number(form.longitude) }),
        registrationNumber: form.registrationNumber,
        ownerId: ownerId,
        identityVerification: aadhaarVerified ? { type: "aadhaar", number: aadhaarNumber } : { type: "file" },
        phoneVerification: isPhoneVerified ? { number: phoneNumber } : null,
        guidebook: guidebook,
        guest_policy: {
          family_allowed: Boolean(form.familyAllowed),
          unmarried_couple_allowed: Boolean(form.unmarriedCoupleAllowed),
          bachelors_allowed: Boolean(form.bachelorAllowed),
        },
        noticePeriod: form.noticePeriod,
        lockInPeriod: form.lockInPeriod,
        foodAvailable: form.foodAvailable,
        electricityCharges: form.electricityCharges,
        perNightPrice: form.perNightPrice,
      };
      
      fd.append("meta", JSON.stringify(meta));
             fd.append(
  "guest_policy",
  JSON.stringify({
    family_allowed: form.familyAllowed,
    unmarried_couple_allowed: form.unmarriedCoupleAllowed,
     bachelors_allowed:form.bachelorAllowed,
  })
);

      photoPreviews.previews.forEach((p, i) => {
        if (p && p.file) fd.append("photos", p.file, p.name || `photo-${i}`);
      });
      if (selfieFile) fd.append("selfie", selfieFile, selfieFile.name);
      if (coverIndex !== null) fd.append("coverPhotoIndex", String(coverIndex));

      const response = await fetch(`${API_BASE}/ovika/properties/upload`, {
        method: "POST",
        body: fd,
        credentials: "include",
      });

      const data = await response.json().catch(() => ({ success: false, message: "Invalid JSON response" }));

      if (!response.ok) {
        alert(data.message || "Failed to create PG listing");
        return;
      }

      alert("PG Listing created successfully! ID: " + (data.data?.id ?? "unknown"));
      // Reset form...
      window.location.reload(); // Simple reload to clear for now
    } catch (error) {
      alert("Failed to submit. Check console.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const Toggle = ({ name, value, onChange }) => (
    <div className="tmx9pf-toggle" aria-label={name}>
      <button type="button" className={`option ${value === false ? "active" : ""}`} onClick={() => onChange(false)}>No</button>
      <button type="button" className={`option ${value === true ? "active" : ""}`} onClick={() => onChange(true)}>Yes</button>
    </div>
  );

  return (
    <form className="tmx9pf-root tmx9pf-paginated" onSubmit={handleSubmit} noValidate>
      <header className="tmx9pf-header">
        <h1 className="tmx9pf-title">List Your <span className="span-data-setup">PG / Hostel</span></h1>
        <p className="tmx9pf-sub">Fill in the details to list your Paying Guest accommodation.</p>

        <div className="tmx9pf-stepper">
          {STEPS.map((s, i) => (
            <div key={s.id} className={`tmx9pf-step ${i === step ? "active" : i < step ? "done" : ""}`}>
              <div className="tmx9pf-step-bullet">{i + 1}</div>
              <div className="tmx9pf-step-title">{s.title}</div>
            </div>
          ))}
        </div>
      </header>

      <div className="tmx9pf-card">
        {/* STEP 0: Basics */}
        {step === 0 && (
          <section className="tmx9pf-section">
            <h2 className="tmx9pf-section-title">PG Information</h2>
            <div className="tmx9pf-grid">
              <div className="tmx9pf-field">
                <label className="tmx9pf-label">PG Type</label>
                <select name="propertyType" value={form.propertyType} onChange={handleChange} className="tmx9pf-select">
                  {PG_TYPES.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              <div className="tmx9pf-field full">
                <label className="tmx9pf-label">PG Name *</label>
                <input name="title" value={form.title} onChange={handleChange} className="tmx9pf-input" placeholder="e.g. Stays PG for Men, Andheri West" />
                {renderError("title")}
              </div>

              <div className="tmx9pf-field full">
                <label className="tmx9pf-label">Description *</label>
                <textarea name="mainDescription" value={form.mainDescription} onChange={handleChange} rows="4" className="tmx9pf-textarea" placeholder="Describe the facilities, food, environment..." />
                {renderError("mainDescription")}
              </div>

              <div className="tmx9pf-field full">
                <label className="tmx9pf-label">Address *</label>
                <input name="address" value={form.address} onChange={handleChange} className="tmx9pf-input" placeholder="Full Address" />
                {renderError("address")}
              </div>

              <div className="tmx9pf-field">
                <label className="tmx9pf-label">City *</label>
                <input name="city" value={form.city} onChange={handleChange} className="tmx9pf-input" />
                {renderError("city")}
              </div>

              <div className="tmx9pf-field">
                <label className="tmx9pf-label">Postal Code *</label>
                <input name="postalCode" value={form.postalCode} onChange={handleChange} className="tmx9pf-input" />
                {renderError("postalCode")}
              </div>
            </div>
          </section>
        )}

        {/* STEP 1: Rooms & Amenities */}
        {step === 1 && (
          <section className="tmx9pf-section">
            <h2 className="tmx9pf-section-title">Rooms & Facilities</h2>
            <div className="tmx9pf-grid">
               <div className="tmx9pf-field full">
                <label className="tmx9pf-label">Room Sharing Options & Prices *</label>
                <div className="tmx9pf-dynamic-list">
                  {form.bedroomDetails.map((item, index) => (
                    <div key={item.id} className="tmx9pf-dynamic-row" style={{ alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                      <select value={item.type} onChange={(e) => { const newDetails = [...form.bedroomDetails]; newDetails[index].type = e.target.value; setForm(f => ({ ...f, bedroomDetails: newDetails })); }} className="tmx9pf-select" style={{ flex: '1 1 160px' }}>
                        {SHARING_TYPES.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                      {/* Removed "Number of Rooms" count to simplify configuration per type */}
                      <input type="number" min="0" placeholder="Rent (₹) / month" value={item.price} onChange={(e) => { const newDetails = [...form.bedroomDetails]; newDetails[index].price = e.target.value; setForm(f => ({ ...f, bedroomDetails: newDetails })); }} className="tmx9pf-input" style={{ flex: '1 1 140px' }} />
                      <select value={item.washroomType} onChange={(e) => { const newDetails = [...form.bedroomDetails]; newDetails[index].washroomType = e.target.value; setForm(f => ({ ...f, bedroomDetails: newDetails })); }} className="tmx9pf-select" style={{ flex: '1 1 160px' }}>
                        <option value="Attached">Attached Washroom</option>
                        <option value="Common">Common Washroom</option>
                      </select>
                      <button type="button" onClick={() => { const newDetails = form.bedroomDetails.filter((_, i) => i !== index); setForm(f => ({ ...f, bedroomDetails: newDetails })); }} className="tmx9pf-small-btn danger">×</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => setForm(f => ({ ...f, bedroomDetails: [...f.bedroomDetails, { id: Date.now(), type: "Double Sharing", count: 1, price: "", washroomType: "Attached" }] }))} className="tmx9pf-small-btn">+ Add Sharing Type</button>
                </div>
              </div>

              <div className="tmx9pf-field">
                 <label className="tmx9pf-label">Total Occupancy Capacity</label>
                 <input name="beds" type="number" min="1" value={form.beds} onChange={handleNumChange} className="tmx9pf-input" placeholder="Total beds available" />
              </div>
              
              <div className="tmx9pf-field">
                <label className="tmx9pf-label">Total Area (sq ft)</label>
                <input name="area" value={form.area} onChange={handleChange} className="tmx9pf-input" />
                {renderError("area")}
              </div>

              <div className="tmx9pf-field full">
                <label className="tmx9pf-label">Amenities</label>
                <div className="tmx9pf-amenities">
                  {Object.entries(PG_AMENITIES).map(([group, list]) => (
                    <div key={group} className="tmx9pf-amenity-group">
                      <div className="tmx9pf-amenity-group-title">{group.replace(/_/g, " ")}</div>
                      <div className="tmx9pf-amenity-list">
                        {list.map((a) => (
                          <label key={a} className="tmx9pf-amenity">
                            <input type="checkbox" checked={!!form.amenities[a]} onChange={() => handleAmenityToggle(a)} />
                            <span>{a}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* STEP 2: Rules */}
        {step === 2 && (
          <section className="tmx9pf-section">
            <h2 className="tmx9pf-section-title">PG Rules</h2>
            <div className="tmx9pf-grid">
              <div className="tmx9pf-field">
                <label className="tmx9pf-label">Gate Closing Time</label>
                <input name="gateClosingTime" type="time" value={form.gateClosingTime} onChange={handleChange} className="tmx9pf-input" />
                <div className="tmx9pf-muted">Time by which residents must be in.</div>
              </div>

              <div className="tmx9pf-field">
                <label className="tmx9pf-label">Notice Period (Days)</label>
                <input name="noticePeriod" type="number" min="0" value={form.noticePeriod} onChange={handleNumChange} className="tmx9pf-input" />
              </div>

              <div className="tmx9pf-field">
                <label className="tmx9pf-label">Lock-in Period (Months)</label>
                <input name="lockInPeriod" type="number" min="0" value={form.lockInPeriod} onChange={handleNumChange} className="tmx9pf-input" />
              </div>

               <div className="tmx9pf-field">
                <label className="tmx9pf-label">Visitors / Outside Guests</label>
                <Toggle name="outsideGuestsAllowed" value={form.outsideGuestsAllowed} onChange={(v) => setForm((s) => ({ ...s, outsideGuestsAllowed: v }))} />
              </div>

              <div className="tmx9pf-field">
                <label className="tmx9pf-label">Smoking</label>
                <Toggle name="smokingAllowed" value={form.smokingAllowed} onChange={(v) => setForm((s) => ({ ...s, smokingAllowed: v }))} />
              </div>

              <div className="tmx9pf-field">
                <label className="tmx9pf-label">Alcohol</label>
                <Toggle name="drinkingAllowed" value={form.drinkingAllowed} onChange={(v) => setForm((s) => ({ ...s, drinkingAllowed: v }))} />
              </div>

              <div className="tmx9pf-field">
                <label className="tmx9pf-label">Food Included?</label>
                <Toggle name="foodAvailable" value={form.foodAvailable} onChange={(v) => setForm((s) => ({ ...s, foodAvailable: v }))} />
              </div>
            </div>
          </section>
        )}

        {/* STEP 4: Local Guide (New) */}
        {step === 3 && (
          <section className="tmx9pf-section">
            <h2 className="tmx9pf-section-title">Local Guide / Neighborhood</h2>
            <div className="tmx9pf-grid">
               <div className="tmx9pf-field">
                 <label className="tmx9pf-label">Nearest Metro Station</label>
                 <input value={form.localGuide.nearestMetroStation} onChange={(e) => setForm(f => ({ ...f, localGuide: { ...f.localGuide, nearestMetroStation: e.target.value } }))} className="tmx9pf-input" placeholder="e.g. MG Road Metro" />
               </div>
               <div className="tmx9pf-field">
                 <label className="tmx9pf-label">Nearest Bus Stop</label>
                 <input value={form.localGuide.nearestBusStop} onChange={(e) => setForm(f => ({ ...f, localGuide: { ...f.localGuide, nearestBusStop: e.target.value } }))} className="tmx9pf-input" placeholder="e.g. Sector 18 Bus Stand" />
               </div>
               <div className="tmx9pf-field">
                 <label className="tmx9pf-label">Nearby Market / Grocery</label>
                 <input value={form.localGuide.nearbyMarket} onChange={(e) => setForm(f => ({ ...f, localGuide: { ...f.localGuide, nearbyMarket: e.target.value } }))} className="tmx9pf-input" placeholder="e.g. Super Mart, Local Vegetable Market" />
               </div>
               <div className="tmx9pf-field">
                 <label className="tmx9pf-label">Nearby Hospital / Pharmacy</label>
                 <input value={form.localGuide.nearbyHospital} onChange={(e) => setForm(f => ({ ...f, localGuide: { ...f.localGuide, nearbyHospital: e.target.value } }))} className="tmx9pf-input" placeholder="e.g. City Hospital" />
               </div>
               <div className="tmx9pf-field full">
                 <label className="tmx9pf-label">Other Landmarks / Notes</label>
                 <textarea value={form.localGuide.otherNotes} onChange={(e) => setForm(f => ({ ...f, localGuide: { ...f.localGuide, otherNotes: e.target.value } }))} className="tmx9pf-textarea" placeholder="Any other important landmarks nearby..." rows="3" />
               </div>
            </div>
          </section>
        )}

        {/* STEP 5: Photos */}
        {step === 4 && (
          <section className="tmx9pf-section">
            <h2 className="tmx9pf-section-title">PG Photos</h2>
            <div className="tmx9pf-field full">
              <label className="tmx9pf-label">Upload Photos (Rooms, Kitchen, Common Area) *</label>
              <input type="file" multiple accept="image/*" onChange={handlePhotos} className="tmx9pf-file" />
              {renderError("photos")}
              <div className="tmx9pf-photo-previews">
                {photoPreviews.previews.map((p, i) => (
                  <div key={i} className="tmx9pf-photo-thumb">
                    <img src={p.url} alt="preview" />
                  <div className="tmx9pf-photo-actions">
                    <button type="button" onClick={() => removePhoto(i)} className="tmx9pf-small-btn">Remove</button>
                    <button type="button" onClick={() => setCoverIndex(i)} className={`tmx9pf-small-btn ${coverIndex === i ? "tmx9pf-small-btn--active" : ""}`}>Cover</button>
                  </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* STEP 6: Pricing */}
        {step === 5 && (
          <section className="tmx9pf-section">
            <h2 className="tmx9pf-section-title">Rent & Charges</h2>
             <div className="tmx9pf-grid">
                <div className="tmx9pf-field">
                 <label className="tmx9pf-label">Rent per Night (Rs) *</label>
                 <input name="baseRate" type="number" value={form.baseRate} onChange={handleNumChange} className="tmx9pf-input" placeholder="e.g. 1200" />
                 {renderError("baseRate")}
                </div>

                <div className="tmx9pf-field full" style={{ marginTop: "1rem" }}>
                   <label className="tmx9pf-label">Booking Process</label>
                   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                      {BOOKING_TYPES.map((type) => (
                        <div 
                          key={type.id}
                          onClick={() => setForm(f => ({ ...f, bookingType: type.id }))}
                          style={{
                            padding: '1rem',
                            borderRadius: '8px',
                            border: form.bookingType === type.id ? '2px solid #8b0000' : '1px solid #ddd',
                            background: form.bookingType === type.id ? '#fff5f5' : 'white',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            display: 'flex', flexDirection: 'column', gap: '4px'
                          }}
                        >
                           <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.25rem' }}>
                              <div style={{
                                 width: '18px', height: '18px', borderRadius: '50%',
                                 border: form.bookingType === type.id ? '2px solid #8b0000' : '2px solid #ccc',
                                 marginRight: '10px',
                                 position: 'relative',
                                 display: 'flex', alignItems: 'center', justifyContent: 'center'
                              }}>
                                {form.bookingType === type.id && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#8b0000' }} />}
                              </div>
                              <span style={{ fontWeight: '600', color: '#333' }}>{type.label}</span>
                           </div>
                           <p style={{ margin: 0, fontSize: '0.85rem', color: '#666', paddingLeft: '28px' }}>{type.desc}</p>
                        </div>
                      ))}
                   </div>
                </div>

               <div className="tmx9pf-field">
                 <label className="tmx9pf-label">Electricity Charges</label>
                 <select name="electricityCharges" value={form.electricityCharges} onChange={handleChange} className="tmx9pf-select">
                   <option value="Included in Rent">Included in Rent</option>
                   <option value="Separate (As per Meter)">Separate (As per Meter)</option>
                   <option value="Fixed Amount">Fixed Amount</option>
                 </select>
               </div>

               <div className="tmx9pf-field">
                <label className="tmx9pf-label">Security Deposit (Rs)</label>
                <input type="number" value={securityDeposit} onChange={(e) => setSecurityDeposit(e.target.value)} className="tmx9pf-input" />
               </div>

               <div className="tmx9pf-field">
                <label className="tmx9pf-label">Maintenance/Cleaning Fee</label>
                <input name="cleaningFee" type="number" value={form.cleaningFee} onChange={handleChange} className="tmx9pf-input" />
               </div>

                <div className="tmx9pf-field full">
                <label className="tmx9pf-label">Cancellation Policy</label>
                 <select value={policy} onChange={(e) => setPolicy(e.target.value)} className="tmx9pf-select">
                  {CANCELLATION_POLICIES.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
               </div>
             </div>
          </section>
        )}

        {/* STEP 7: Verification (Same as original) */}
        {step === 6 && (
           <section className="tmx9pf-section">
            <h2 className="tmx9pf-section-title">Owner Verification</h2>
            <div className="tmx9pf-field full" style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
               <label className="tmx9pf-label">Aadhaar Verification *</label> 
               <div style={{ display: 'flex', gap: '10px' }}>
                 <input value={aadhaarNumber} onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, '').slice(0, 12))} placeholder="12-digit Aadhaar" className="tmx9pf-input" disabled={aadhaarVerified} />
                 <button type="button" onClick={verifyAadhaar} disabled={aadhaarVerified || isVerifyingAadhaar} className="tmx9pf-small-btn" style={{ background: aadhaarVerified ? '#22c55e' : '#3b82f6', color: 'white' }}>{aadhaarVerified ? "Verified" : "Verify"}</button>
               </div>
               {renderError("idFiles")}
            </div>

            <div className="tmx9pf-field full" style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', marginTop: '16px' }}>
               <label className="tmx9pf-label">Phone Verification *</label> 
               <div style={{ display: 'flex', gap: '10px' }}>
                 <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="10-digit Mobile" className="tmx9pf-input" disabled={isPhoneVerified || otpSent} />
                 {!otpSent && !isPhoneVerified && <button type="button" onClick={sendPhoneOtp} disabled={isSendingOtp} className="tmx9pf-small-btn" style={{ background: '#3b82f6', color: 'white' }}>Send OTP</button>}
               </div>
               {otpSent && !isPhoneVerified && (
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <input value={phoneOtp} onChange={(e) => setPhoneOtp(e.target.value)} placeholder="OTP" className="tmx9pf-input" />
                    <button type="button" onClick={verifyPhoneOtp} disabled={isVerifyingOtp} className="tmx9pf-small-btn" style={{ background: '#10b981', color: 'white' }}>Verify OTP</button>
                  </div>
               )}
               {isPhoneVerified && <p style={{ color: '#166534', margin: '5px 0 0 0' }}>✓ Verified</p>}
            </div>
           </section>
        )}

      </div>

      <div className="tmx9pf-nav">
        <button type="button" onClick={goPrev} disabled={step === 0} className="tmx9pf-nav-btn tmx9pf-nav-prev">Previous</button>
        {step < STEPS.length - 1 ? (
          <button type="button" onClick={goNext} className="tmx9pf-nav-btn tmx9pf-nav-next">Next</button>
        ) : (
          <button type="submit" className="tmx9pf-nav-btn tmx9pf-nav-next" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "List PG"}</button>
        )}
      </div>
    </form>
  );
};

export default PGListingForm;
// Temporary file to force update
