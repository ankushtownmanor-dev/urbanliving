// Tmx9PropertyForm.jsx
import React, { useState, useEffect } from "react";
import "./tmx9pf-form.css";

/**
 * Tmx9PropertyForm
 * - Full multi-section property listing form matching the requested fields.
 * - Images and files are read via inputs and previewed (so they load via JSX).
 * - On submit, the payload is logged to console. Replace with your API call as needed.
 */

const AMENITIES = {
  Basic: ["Wi-Fi", "Heating", "Air conditioning", "Hot water"],
  Kitchen: ["Refrigerator", "Stovetop/oven", "Microwave", "Cooking utensils"],
  Entertainment: ["TV", "Streaming services"],
  Safety: ["Smoke detector", "Carbon monoxide detector", "Fire extinguisher", "First aid kit"],
  Outdoor: ["Balcony/terrace", "Garden", "Parking space", "BBQ grill"],
  Wellness: ["Pool", "Hot tub", "Sauna", "Gym"],
  Services: ["Breakfast included", "Airport pick-up", "Luggage storage", "Cleaning on request"]
};

const DEFAULT_CANCELLATION_POLICIES = ["Flexible", "Moderate", "Strict"];
const DEFAULT_PROPERTY_CATEGORIES = ["Apartment", "House", "Villa", "Cabin", "Bungalow", "Hotel room", "Other"];
const PROPERTY_TYPES = ["Entire place", "Private room", "Shared room"];

function useFilePreviews() {
  const [previews, setPreviews] = useState([]);
  const update = (files) => {
    const arr = Array.from(files || []).slice(0, 12); // limit thumbnails
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

const Tmx9PropertyForm = () => {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    // 1. Basic Property Information
    propertyType: PROPERTY_TYPES[0],
    propertyCategory: DEFAULT_PROPERTY_CATEGORIES[0],
    address: "",
    city: "",
    postalCode: "",
    country: "",
    latitude: "",
    longitude: "",
    registrationNumber: "",
    localCompliance: "",

    // 2. Description
    title: "",
    mainDescription: "",
    spaceDescription: "",
    guestAccess: "",
    interaction: "",
    neighborhood: "",
    otherNotes: "",

    // 3. Details & Features
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    area: "",
    amenities: {},

    // 4. House Rules
    checkInTime: "15:00",
    checkOutTime: "11:00",
    smokingAllowed: false,
    petsAllowed: false,
    eventsAllowed: false,
    quietHours: "22:00-07:00",
    maxGuests: 2,

    // 6. Pricing & Availability
    baseRate: "",
    weekendRate: "",
    weeklyDiscountPct: "",
    monthlyDiscountPct: "",
    cleaningFee: "",
    securityDeposit: "",
    additionalGuestFee: "",
    minStay: 1,
    maxStay: 30,
    bookingWindowDays: 365,

    // 7. Check-in details
    selfCheckIn: "",
    keyExchange: "",
    hostMeetup: ""
  });

  // 5. Photos & Media (separate state for files and previews)
  const photoPreviews = useFilePreviews();
  const [coverIndex, setCoverIndex] = useState(null);

  // 8. ID & Verification (files)
  const [idFiles, setIdFiles] = useState([]);
  const [selfieFile, setSelfieFile] = useState(null);

  // 9. Legal Agreements
  const [policy, setPolicy] = useState(DEFAULT_CANCELLATION_POLICIES[0]);
  const [insurance, setInsurance] = useState(false);
  const [damageProtection, setDamageProtection] = useState(false);

  // initialize amenities object
  React.useEffect(() => {
    const all = {};
    Object.values(AMENITIES).flat().forEach((a) => (all[a] = false));
    setForm((f) => ({ ...f, amenities: all }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Basic Information
    if (!form.address?.trim()) newErrors.address = 'Address is required';
    if (!form.city?.trim()) newErrors.city = 'City is required';
    if (!form.postalCode?.trim()) newErrors.postalCode = 'Postal code is required';
    if (!form.country?.trim()) newErrors.country = 'Country is required';

    // Description
    if (!form.title?.trim()) newErrors.title = 'Title is required';
    if (!form.mainDescription?.trim()) {
      newErrors.mainDescription = 'Description is required';
    } else if (form.mainDescription.length < 30) {
      newErrors.mainDescription = 'Description should be at least 30 characters';
    }

    // Property Details
    if (form.bedrooms < 0) newErrors.bedrooms = 'Number of bedrooms cannot be negative';
    if (form.bathrooms <= 0) newErrors.bathrooms = 'Must have at least one bathroom';
    if (form.beds <= 0) newErrors.beds = 'Must have at least one bed';

    // Pricing
    if (!form.baseRate) newErrors.baseRate = 'Base rate is required';
    if (form.baseRate && form.baseRate <= 0) newErrors.baseRate = 'Rate must be positive';
    if (form.weeklyDiscountPct && (form.weeklyDiscountPct < 0 || form.weeklyDiscountPct > 100)) {
      newErrors.weeklyDiscountPct = 'Discount must be between 0 and 100';
    }

    // Photos
    if (photoPreviews.previews.length === 0) {
      newErrors.photos = 'At least one photo is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Helper to render error message
  const renderError = (field) => {
    return errors[field] ? (
      <div className="tmx9pf-error">{errors[field]}</div>
    ) : null;
  };

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
    const files = e.target.files;
    photoPreviews.update(files);
    setCoverIndex(null);
  };

  const removePhoto = (index) => {
    const updated = photoPreviews.previews.filter((_, i) => i !== index);
    // rebuild FileList is complex, but we keep previews in state for demo
    photoPreviews.update([]); // clear
    setTimeout(() => photoPreviews.update(updated.map((p) => p.file)), 0);
    if (coverIndex === index) setCoverIndex(null);
    else if (coverIndex > index) setCoverIndex((c) => c - 1);
  };

  const handleIdFiles = (e) => {
    setIdFiles(Array.from(e.target.files || []));
  };
  const handleSelfie = (e) => {
    setSelfieFile(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      // Scroll to first error after a short delay to allow render
      setTimeout(() => {
        const firstError = Object.keys(errors)[0];
        if (firstError) {
          const element = document.querySelector(`[name="${firstError}"]`);
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            });
          }
        }
      }, 100);
      return;
    }

    try {
      const payload = {
        ...form,
        amenities: Object.keys(form.amenities).filter(k => form.amenities[k]),
        photos: photoPreviews.previews.map(p => ({ name: p.name })),
        coverPhotoIndex: coverIndex,
        idFiles: idFiles.map(f => f.name),
        selfie: selfieFile?.name || null,
        cancellationPolicy: policy,
        insurance,
        damageProtection
      };

      console.log("SUBMITTING PAYLOAD:", payload);
      // Replace with actual API call
      // await api.submitProperty(payload);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="tmx9pf-root" onSubmit={handleSubmit} noValidate>
      <header className="tmx9pf-header">
        <h1 className="tmx9pf-title">Create / Edit Property Listing</h1>
        <p className="tmx9pf-sub">Fill the sections below carefully. You can upload photos and documents — they'll be previewed below.</p>
      </header>

      <section className="tmx9pf-section">
        <h2 className="tmx9pf-section-title">1. Basic Property Information</h2>
        <div className="tmx9pf-grid">
          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Property Type</label>
            <select name="propertyType" value={form.propertyType} onChange={handleChange} className="tmx9pf-select">
              {PROPERTY_TYPES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Category</label>
            <select name="propertyCategory" value={form.propertyCategory} onChange={handleChange} className="tmx9pf-select">
              {DEFAULT_PROPERTY_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Full Address *</label>
            <input 
              name="address" 
              value={form.address} 
              onChange={handleChange} 
              className={`tmx9pf-input ${errors.address ? 'tmx9pf-input--error' : ''}`} 
            />
            {renderError('address')}
          </div>

          <div className="tmx9pf-field">
            <label className="tmx9pf-label">City *</label>
            <input 
              name="city" 
              value={form.city} 
              onChange={handleChange} 
              className={`tmx9pf-input ${errors.city ? 'tmx9pf-input--error' : ''}`} 
            />
            {renderError('city')}
          </div>

          <div className="tmx9pf-field">
            <label className="tmx9pf-label">ZIP / Postal Code *</label>
            <input 
              name="postalCode" 
              value={form.postalCode} 
              onChange={handleChange} 
              className={`tmx9pf-input ${errors.postalCode ? 'tmx9pf-input--error' : ''}`} 
            />
            {renderError('postalCode')}
          </div>

          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Country *</label>
            <input 
              name="country" 
              value={form.country} 
              onChange={handleChange} 
              className={`tmx9pf-input ${errors.country ? 'tmx9pf-input--error' : ''}`} 
            />
            {renderError('country')}
          </div>

          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Map Pin - Latitude</label>
            <input name="latitude" value={form.latitude} onChange={handleChange} className="tmx9pf-input" placeholder="e.g. 28.6139" />
          </div>

          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Map Pin - Longitude</label>
            <input name="longitude" value={form.longitude} onChange={handleChange} className="tmx9pf-input" placeholder="e.g. 77.2090" />
          </div>

          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Local Registration / Permit #</label>
            <input name="registrationNumber" value={form.registrationNumber} onChange={handleChange} className="tmx9pf-input" />
          </div>

          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Compliance Notes</label>
            <input name="localCompliance" value={form.localCompliance} onChange={handleChange} className="tmx9pf-input" />
          </div>
        </div>
      </section>

      <section className="tmx9pf-section">
        <h2 className="tmx9pf-section-title">2. Tell Us About Your Place</h2>
        <div className="tmx9pf-grid">
          <div className="tmx9pf-field full">
            <label className="tmx9pf-label">Listing Title *</label>
            <input 
              name="title" 
              value={form.title} 
              onChange={handleChange} 
              placeholder="Cozy 2-Bedroom Apartment Near City Center" 
              className={`tmx9pf-input ${errors.title ? 'tmx9pf-input--error' : ''}`}
            />
            {renderError('title')}
          </div>

          <div className="tmx9pf-field full">
            <label className="tmx9pf-label">Main Description *</label>
            <textarea 
              name="mainDescription" 
              value={form.mainDescription} 
              onChange={handleChange} 
              rows="4" 
              className={`tmx9pf-textarea ${errors.mainDescription ? 'tmx9pf-input--error' : ''}`} 
            />
            {renderError('mainDescription')}
          </div>

          <div className="tmx9pf-field full">
            <label className="tmx9pf-label">Space Description (layout, sleeping)</label>
            <textarea name="spaceDescription" value={form.spaceDescription} onChange={handleChange} rows="3" className="tmx9pf-textarea" />
          </div>

          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Guest Access</label>
            <input name="guestAccess" value={form.guestAccess} onChange={handleChange} className="tmx9pf-input" />
          </div>

          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Interaction With Guests</label>
            <input name="interaction" value={form.interaction} onChange={handleChange} className="tmx9pf-input" />
          </div>

          <div className="tmx9pf-field full">
            <label className="tmx9pf-label">Neighborhood Description</label>
            <textarea name="neighborhood" value={form.neighborhood} onChange={handleChange} rows="2" className="tmx9pf-textarea" />
          </div>

          <div className="tmx9pf-field full">
            <label className="tmx9pf-label">Other Notes (quirks, parking etc.)</label>
            <textarea name="otherNotes" value={form.otherNotes} onChange={handleChange} rows="2" className="tmx9pf-textarea" />
          </div>
        </div>
      </section>

      <section className="tmx9pf-section">
        <h2 className="tmx9pf-section-title">3. Property Details & Features</h2>
        <div className="tmx9pf-grid">
          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Bedrooms *</label>
            <input 
              name="bedrooms" 
              type="number" 
              min="0" 
              value={form.bedrooms} 
              onChange={handleNumChange} 
              className={`tmx9pf-input ${errors.bedrooms ? 'tmx9pf-input--error' : ''}`}
            />
            {renderError('bedrooms')}
          </div>

          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Beds (count) *</label>
            <input 
              name="beds" 
              type="number" 
              min="1" 
              value={form.beds} 
              onChange={handleNumChange} 
              className={`tmx9pf-input ${errors.beds ? 'tmx9pf-input--error' : ''}`}
            />
            {renderError('beds')}
          </div>

          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Bathrooms *</label>
            <input 
              name="bathrooms" 
              type="number" 
              min="1" 
              step="0.5"
              value={form.bathrooms} 
              onChange={handleNumChange} 
              className={`tmx9pf-input ${errors.bathrooms ? 'tmx9pf-input--error' : ''}`}
            />
            {renderError('bathrooms')}
          </div>

          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Living Spaces (describe)</label>
            <input name="area" value={form.area} onChange={handleChange} className="tmx9pf-input" placeholder="e.g., Living room, kitchen, terrace"/>
          </div>

          <div className="tmx9pf-field full">
            <label className="tmx9pf-label">Amenities (select all that apply)</label>

            <div className="tmx9pf-amenities">
              {Object.entries(AMENITIES).map(([group, list]) => (
                <div key={group} className="tmx9pf-amenity-group">
                  <div className="tmx9pf-amenity-group-title">{group}</div>
                  <div className="tmx9pf-amenity-list">
                    {list.map((a) => (
                      <label key={a} className="tmx9pf-amenity">
                        <input
                          type="checkbox"
                          checked={!!form.amenities[a]}
                          onChange={() => handleAmenityToggle(a)}
                        />
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

      <section className="tmx9pf-section">
        <h2 className="tmx9pf-section-title">4. House Rules</h2>
        <div className="tmx9pf-grid">
          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Check-in Time</label>
            <input name="checkInTime" type="time" value={form.checkInTime} onChange={handleChange} className="tmx9pf-input"/>
          </div>

          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Check-out Time</label>
            <input name="checkOutTime" type="time" value={form.checkOutTime} onChange={handleChange} className="tmx9pf-input"/>
          </div>

          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Smoking Allowed</label>
            <select name="smokingAllowed" value={String(form.smokingAllowed)} onChange={(e)=>setForm(s=>({...s, smokingAllowed: e.target.value === "true"}))} className="tmx9pf-select">
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Pets Allowed</label>
            <select name="petsAllowed" value={String(form.petsAllowed)} onChange={(e)=>setForm(s=>({...s, petsAllowed: e.target.value === "true"}))} className="tmx9pf-select">
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Events / Parties Allowed</label>
            <select name="eventsAllowed" value={String(form.eventsAllowed)} onChange={(e)=>setForm(s=>({...s, eventsAllowed: e.target.value === "true"}))} className="tmx9pf-select">
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Quiet Hours</label>
            <input name="quietHours" value={form.quietHours} onChange={handleChange} className="tmx9pf-input" />
          </div>

          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Maximum Guests</label>
            <input name="maxGuests" type="number" min="1" value={form.maxGuests} onChange={handleNumChange} className="tmx9pf-input"/>
          </div>
        </div>
      </section>

      <section className="tmx9pf-section">
        <h2 className="tmx9pf-section-title">5. Photos & Media</h2>
        <div className="tmx9pf-grid">
          <div className="tmx9pf-field full">
            <label className="tmx9pf-label">Photos (drag & drop or select) — up to 12</label>
            <input 
              type="file" 
              accept="image/*" 
              multiple 
              onChange={handlePhotos} 
              className={`tmx9pf-file ${errors.photos ? 'tmx9pf-input--error' : ''}`} 
            />
            {renderError('photos')}
            <div className="tmx9pf-photo-previews">
              {photoPreviews.previews.length === 0 && <div className="tmx9pf-muted">No photos selected</div>}
              {photoPreviews.previews.map((p, i) => (
                <div key={i} className="tmx9pf-photo-thumb">
                  <img src={p.url} alt={p.name} />
                  <div className="tmx9pf-photo-actions">
                    <button type="button" onClick={() => setCoverIndex(i)} className={`tmx9pf-small-btn ${coverIndex === i ? "tmx9pf-small-btn--active":""}`}>Cover</button>
                    <button type="button" onClick={() => removePhoto(i)} className="tmx9pf-small-btn">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="tmx9pf-section">
        <h2 className="tmx9pf-section-title">6. Pricing & Availability</h2>
        <div className="tmx9pf-grid">
          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Base nightly rate (currency)</label>
            <input 
              name="baseRate" 
              type="number" 
              min="0" 
              step="0.01"
              value={form.baseRate} 
              onChange={handleNumChange} 
              className={`tmx9pf-input ${errors.baseRate ? 'tmx9pf-input--error' : ''}`}
            />
            {renderError('baseRate')}
          </div>
          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Weekend rate</label>
            <input name="weekendRate" value={form.weekendRate} onChange={handleChange} className="tmx9pf-input" />
          </div>
          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Weekly Discount %</label>
            <input 
              name="weeklyDiscountPct" 
              type="number" 
              min="0" 
              max="100" 
              value={form.weeklyDiscountPct} 
              onChange={handleNumChange} 
              className={`tmx9pf-input ${errors.weeklyDiscountPct ? 'tmx9pf-input--error' : ''}`}
            />
            {renderError('weeklyDiscountPct')}
          </div>
          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Monthly discount (%)</label>
            <input name="monthlyDiscountPct" type="number" min="0" max="100" value={form.monthlyDiscountPct} onChange={handleNumChange} className="tmx9pf-input"/>
          </div>

          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Cleaning fee</label>
            <input name="cleaningFee" value={form.cleaningFee} onChange={handleChange} className="tmx9pf-input"/>
          </div>

          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Security deposit</label>
            <input name="securityDeposit" value={form.securityDeposit} onChange={handleChange} className="tmx9pf-input"/>
          </div>

          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Additional guest fee</label>
            <input name="additionalGuestFee" value={form.additionalGuestFee} onChange={handleChange} className="tmx9pf-input"/>
          </div>

          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Min stay (nights)</label>
            <input name="minStay" type="number" min="1" value={form.minStay} onChange={handleNumChange} className="tmx9pf-input"/>
          </div>

          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Max stay (nights)</label>
            <input name="maxStay" type="number" min="1" value={form.maxStay} onChange={handleNumChange} className="tmx9pf-input"/>
          </div>

          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Booking window (days)</label>
            <input name="bookingWindowDays" type="number" min="1" value={form.bookingWindowDays} onChange={handleNumChange} className="tmx9pf-input"/>
          </div>
        </div>
      </section>

      <section className="tmx9pf-section">
        <h2 className="tmx9pf-section-title">7. Check-In & Check-Out Setup</h2>
        <div className="tmx9pf-grid">
          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Self-check-in method</label>
            <input name="selfCheckIn" value={form.selfCheckIn} onChange={handleChange} className="tmx9pf-input" placeholder="e.g., Smart lock, Lockbox"/>
          </div>
          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Key exchange instructions</label>
            <input name="keyExchange" value={form.keyExchange} onChange={handleChange} className="tmx9pf-input" />
          </div>

          <div className="tmx9pf-field full">
            <label className="tmx9pf-label">Host meet-up time / notes</label>
            <input name="hostMeetup" value={form.hostMeetup} onChange={handleChange} className="tmx9pf-input" />
          </div>
        </div>
      </section>

      <section className="tmx9pf-section">
        <h2 className="tmx9pf-section-title">8. Identity & Verification (Host)</h2>
        <div className="tmx9pf-grid">
          <div className="tmx9pf-field full">
            <label className="tmx9pf-label">Government ID / Business documents</label>
            <input type="file" accept=".pdf,image/*" multiple onChange={handleIdFiles} className="tmx9pf-file" />
            <div className="tmx9pf-muted">Files selected: {idFiles.length}</div>
          </div>

          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Selfie verification (optional)</label>
            <input type="file" accept="image/*" onChange={handleSelfie} className="tmx9pf-file" />
            <div className="tmx9pf-muted">{selfieFile ? selfieFile.name : "No selfie selected"}</div>
          </div>

          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Email / Phone verification handled separately</label>
            <div className="tmx9pf-muted">Integrate your verification flow (OTP / Doc verification) in backend</div>
          </div>
        </div>
      </section>

      <section className="tmx9pf-section">
        <h2 className="tmx9pf-section-title">9. Legal Agreements</h2>
        <div className="tmx9pf-grid">
          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Cancellation policy</label>
            <select value={policy} onChange={(e)=>setPolicy(e.target.value)} className="tmx9pf-select">
              {DEFAULT_CANCELLATION_POLICIES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Insurance option</label>
            <select value={insurance ? "yes":"no"} onChange={(e)=>setInsurance(e.target.value === "yes")} className="tmx9pf-select">
              <option value="no">No</option>
              <option value="yes">Yes - include</option>
            </select>
          </div>

          <div className="tmx9pf-field">
            <label className="tmx9pf-label">Damage protection</label>
            <select value={damageProtection ? "yes":"no"} onChange={(e)=>setDamageProtection(e.target.value === "yes")} className="tmx9pf-select">
              <option value="no">No</option>
              <option value="yes">Yes - require</option>
            </select>
          </div>

          <div className="tmx9pf-field full">
            <label className="tmx9pf-label">Host service agreement / Terms</label>
            <div className="tmx9pf-muted">Link your agreement and ensure user accepts it when publishing the listing.</div>
          </div>
        </div>
      </section>

      <div className="tmx9pf-actions">
        <button 
          type="submit" 
          className="tmx9pf-submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Property'}
        </button>
      </div>
    </form>
  );
};

export default Tmx9PropertyForm;