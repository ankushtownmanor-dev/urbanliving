// // Tmx9PropertyForm.jsx
// import React, { useState, useEffect } from "react";
// import "./tmx9pf-form.css";

// /*
//   Paginated property form (6 steps) — Updated per user's request:
//   - Next button will NOT submit until final step (explicit type attributes)
//   - All major fields validated (required) and errors shown as <span> under inputs
//   - Improved radio/select UI for Smoking / Pets / Events as compact toggle buttons with small SVG icons
//   - Input/file borders and accents use #c98429
// */

// const AMENITIES = {
//   Basic: ["Wi-Fi", "Heating", "Air conditioning", "Hot water"],
//   Kitchen: ["Refrigerator", "Stovetop/oven", "Microwave", "Cooking utensils"],
//   Entertainment: ["TV", "Streaming services"],
//   Safety: ["Smoke detector", "Carbon monoxide detector", "Fire extinguisher", "First aid kit"],
//   Outdoor: ["Balcony/terrace", "Garden", "Parking space", "BBQ grill"],
//   Wellness: ["Pool", "Hot tub", "Sauna", "Gym"],
//   Services: ["Breakfast included", "Airport pick-up", "Luggage storage", "Cleaning on request"]
// };

// const DEFAULT_CANCELLATION_POLICIES = ["Flexible", "Moderate", "Strict"];
// const DEFAULT_PROPERTY_CATEGORIES = ["Apartment", "House", "Villa", "Cabin", "Bungalow", "Hotel room", "Other"];
// const PROPERTY_TYPES = ["Entire place", "Private room"];

// function useFilePreviews() {
//   const [previews, setPreviews] = useState([]);
//   const update = (files) => {
//     const arr = Array.from(files || []).slice(0, 12); // limit thumbnails
//     const readers = arr.map((file) => {
//       return new Promise((res) => {
//         const r = new FileReader();
//         r.onload = (e) => res({ name: file.name, url: e.target.result, file });
//         r.readAsDataURL(file);
//       });
//     });
//     Promise.all(readers).then(setPreviews);
//   };
//   const clear = () => setPreviews([]);
//   return { previews, update, clear };
// }

// const Tmx9PropertyForm = () => {
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [form, setForm] = useState({
//     propertyType: PROPERTY_TYPES[0],
//     propertyCategory: DEFAULT_PROPERTY_CATEGORIES[0],
//     address: "",
//     city: "",
//     postalCode: "",
//     country: "",
//     latitude: "",
//     longitude: "",
//     registrationNumber: "",
//     localCompliance: "",

//     title: "",
//     mainDescription: "",
//     spaceDescription: "",
//     guestAccess: "",
//     interaction: "",
//     neighborhood: "",
//     otherNotes: "",

//     bedrooms: 1,
//     beds: 1,
//     bathrooms: 1,
//     area: "",
//     amenities: {},

//     checkInTime: "15:00",
//     checkOutTime: "11:00",
//     smokingAllowed: false,
//     petsAllowed: false,
//     eventsAllowed: false,
//     quietHours: "22:00-07:00",
//     maxGuests: 2,

//     baseRate: "",
//     weekendRate: "",
//     weeklyDiscountPct: "",
//     monthlyDiscountPct: "",
//     cleaningFee: "",
//     securityDeposit: "",
//     additionalGuestFee: "",
//     minStay: 1,
//     maxStay: 30,
//     bookingWindowDays: 365,

//     selfCheckIn: "",
//     keyExchange: "",
//     hostMeetup: ""
//   });

//   const photoPreviews = useFilePreviews();
//   const [coverIndex, setCoverIndex] = useState(null);
//   const [idFiles, setIdFiles] = useState([]);
//   const [selfieFile, setSelfieFile] = useState(null);
//   const [policy, setPolicy] = useState(DEFAULT_CANCELLATION_POLICIES[0]);
//   const [insurance, setInsurance] = useState(false);
//   const [damageProtection, setDamageProtection] = useState(false);

//   const STEPS = [
//     { id: 1, title: 'Basic & Description' },
//     { id: 2, title: 'Details & Amenities' },
//     { id: 3, title: 'House Rules' },
//     { id: 4, title: 'Photos & Media' },
//     { id: 5, title: 'Pricing & Check-in' },
//     { id: 6, title: 'IDs & Legal' }
//   ];
//   const [step, setStep] = useState(0);

//   useEffect(() => {
//     const all = {};
//     Object.values(AMENITIES).flat().forEach((a) => (all[a] = false));
//     setForm((f) => ({ ...f, amenities: all }));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // FULL validation (all steps) and per-step validation
//   const validateForStep = (s) => {
//     const newErrors = {};

//     // Step 0: Basic & Description
//     if (s === 0) {
//       if (!form.address?.trim()) newErrors.address = 'Address is required';
//       if (!form.city?.trim()) newErrors.city = 'City is required';
//       if (!form.postalCode?.trim()) newErrors.postalCode = 'Postal code is required';
//       if (!form.country?.trim()) newErrors.country = 'Country is required';
//       if (!form.title?.trim()) newErrors.title = 'Title is required';
//       if (!form.mainDescription?.trim()) newErrors.mainDescription = 'Description is required';
//       else if (form.mainDescription.length < 30) newErrors.mainDescription = 'Description should be at least 30 characters';
//     }

//     // Step 1: Details & Amenities
//     if (s === 1) {
//       if (form.bedrooms === '' || form.bedrooms < 0) newErrors.bedrooms = 'Bedrooms required (>= 0)';
//       if (form.beds === '' || form.beds <= 0) newErrors.beds = 'At least one bed required';
//       if (form.bathrooms === '' || form.bathrooms <= 0) newErrors.bathrooms = 'At least one bathroom required';
//     }

//     // Step 2: House Rules
//     if (s === 2) {
//       if (!form.checkInTime) newErrors.checkInTime = 'Check-in time required';
//       if (!form.checkOutTime) newErrors.checkOutTime = 'Check-out time required';
//       if (form.maxGuests === '' || form.maxGuests < 1) newErrors.maxGuests = 'Max guests must be at least 1';
//     }

//     // Step 3: Photos
//     if (s === 3) {
//       if (photoPreviews.previews.length === 0) newErrors.photos = 'At least one photo is required';
//     }

//     // Step 4: Pricing & Check-in
//     if (s === 4) {
//       if (!form.baseRate && form.baseRate !== 0) newErrors.baseRate = 'Base rate is required';
//       if (form.baseRate && Number(form.baseRate) <= 0) newErrors.baseRate = 'Rate must be positive';
//       if (form.weeklyDiscountPct && (form.weeklyDiscountPct < 0 || form.weeklyDiscountPct > 100)) newErrors.weeklyDiscountPct = 'Discount must be between 0 and 100';
//       if (!form.selfCheckIn?.trim()) newErrors.selfCheckIn = 'Provide self-check-in method or note';
//     }

//     // Step 5: IDs & Legal
//     if (s === 5) {
//       if (idFiles.length === 0) newErrors.idFiles = 'Please upload at least one ID / document';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const renderError = (field) => (errors[field] ? <span className="tmx9pf-error">{errors[field]}</span> : null);

//   const handleChange = (e) => {
//     const { name, type, value, checked } = e.target;
//     setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
//   };

//   const handleNumChange = (e) => {
//     const { name, value } = e.target;
//     const num = value === "" ? "" : Number(value);
//     setForm((s) => ({ ...s, [name]: num }));
//   };

//   const handleAmenityToggle = (amenity) => {
//     setForm((s) => ({ ...s, amenities: { ...s.amenities, [amenity]: !s.amenities[amenity] } }));
//   };

//   const handlePhotos = (e) => {
//     const files = e.target.files;
//     photoPreviews.update(files);
//     setCoverIndex(null);
//     // clear any photo error when files added
//     setErrors((prev) => ({ ...prev, photos: undefined }));
//   };

//   const removePhoto = (index) => {
//     const updated = photoPreviews.previews.filter((_, i) => i !== index);
//     photoPreviews.update([]);
//     setTimeout(() => photoPreviews.update(updated.map((p) => p.file)), 0);
//     if (coverIndex === index) setCoverIndex(null);
//     else if (coverIndex > index) setCoverIndex((c) => c - 1);
//   };

//   const handleIdFiles = (e) => {
//     const arr = Array.from(e.target.files || []);
//     setIdFiles(arr);
//     setErrors((prev) => ({ ...prev, idFiles: undefined }));
//   };
//   const handleSelfie = (e) => setSelfieFile(e.target.files?.[0] || null);

//   const goNext = () => {
//     // validate current step; only move forward if ok
//     if (validateForStep(step)) {
//       setStep((s) => Math.min(s + 1, STEPS.length - 1));
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     } else {
//       // focus first invalid field
//       const firstError = Object.keys(errors)[0];
//       setTimeout(() => {
//         const element = document.querySelector(`[name="${firstError}"]`);
//         if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       }, 50);
//     }
//   };

//   const goPrev = () => {
//     setStep((s) => Math.max(s - 1, 0));
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // validate all steps
//     for (let i = 0; i < STEPS.length; i++) {
//       const ok = validateForStep(i);
//       if (!ok) { setIsSubmitting(false); setStep(i); return; }
//     }

//     try {
//       const payload = {
//         ...form,
//         amenities: Object.keys(form.amenities).filter(k => form.amenities[k]),
//         photos: photoPreviews.previews.map(p => ({ name: p.name })),
//         coverPhotoIndex: coverIndex,
//         idFiles: idFiles.map(f => f.name),
//         selfie: selfieFile?.name || null,
//         cancellationPolicy: policy,
//         insurance,
//         damageProtection
//       };

//       console.log("SUBMITTING PAYLOAD:", payload);
//       alert("Form submitted successfully!");
//     } catch (error) {
//       console.error("Submission error:", error);
//       alert("Failed to submit form. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // custom toggle UI for binary options (smoking/pets/events)
//   const Toggle = ({ name, value, onChange }) => (
//     <div className="tmx9pf-toggle" role="group" aria-label={name}>
//       <button type="button" className={`option ${value === false ? 'active' : ''}`} onClick={() => onChange(false)}>
//         {/* small svg for No */}
//         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
//           <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
//         </svg>
//         <small>No</small>
//       </button>
//       <button type="button" className={`option ${value === true ? 'active' : ''}`} onClick={() => onChange(true)}>
//         {/* small svg for Yes */}
//         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
//           <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//         </svg>
//         <small>Yes</small>
//       </button>
//     </div>
//   );

//   return (
//     <form className="tmx9pf-root tmx9pf-paginated" onSubmit={handleSubmit} noValidate>
//       <header className="tmx9pf-header">
//         <h1 className="tmx9pf-title">Create <span className="span-data-setup">Property</span> Listing</h1>
//         <p className="tmx9pf-sub">Fill the sections below carefully. Use Next / Previous to navigate steps.</p>

//         <div className="tmx9pf-stepper">
//           {STEPS.map((s, i) => (
//             <div key={s.id} className={`tmx9pf-step ${i === step ? 'active' : i < step ? 'done' : ''}`}>
//               <div className="tmx9pf-step-bullet">{i + 1}</div>
//               <div className="tmx9pf-step-title">{s.title}</div>
//             </div>
//           ))}
//         </div>
//       </header>

//       <div className="tmx9pf-card">

//         {step === 0 && (
//           <section className="tmx9pf-section">
//             <h2 className="tmx9pf-section-title">Basic Property Information & Description</h2>
//             <div className="tmx9pf-grid">
//               <div className="tmx9pf-field">
//                 <label className="tmx9pf-label">Property Type</label>
//                 <select name="propertyType" value={form.propertyType} onChange={handleChange} className="tmx9pf-select">
//                   {PROPERTY_TYPES.map((p) => <option key={p} value={p}>{p}</option>)}
//                 </select>
//               </div>
              

//               <div className="tmx9pf-field">
//                 <label className="tmx9pf-label">Category</label>
//                 <select name="propertyCategory" value={form.propertyCategory} onChange={handleChange} className="tmx9pf-select">
//                   {DEFAULT_PROPERTY_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
//                 </select>
//               </div>

//               <div className="tmx9pf-field full">
//                 <label className="tmx9pf-label">Listing Title *</label>
//                 <input name="title" value={form.title} onChange={handleChange} className={`tmx9pf-input ${errors.title ? 'tmx9pf-input--error' : ''}`} placeholder="Cozy 2-Bedroom Apartment Near City Center" />
//                 {renderError('title')}
//               </div>

//               <div className="tmx9pf-field full">
//                 <label className="tmx9pf-label">Main Description *</label>
//                 <textarea name="mainDescription" value={form.mainDescription} onChange={handleChange} rows="4" className={`tmx9pf-textarea ${errors.mainDescription ? 'tmx9pf-input--error' : ''}`} />
//                 {renderError('mainDescription')}
//               </div>

//               <div className="tmx9pf-field full">
//                 <label className="tmx9pf-label">Full Address *</label>
//                 <input name="address" value={form.address} onChange={handleChange} className={`tmx9pf-input ${errors.address ? 'tmx9pf-input--error' : ''}`} />
//                 {renderError('address')}
//               </div>
//  <div className="tmx9pf-field">
//                 <label className="tmx9pf-label">Country *</label>
//                 <input name="country" value={form.country} onChange={handleChange} className={`tmx9pf-input ${errors.country ? 'tmx9pf-input--error' : ''}`} />
//                 {renderError('country')}
//               </div>
             

//               <div className="tmx9pf-field">
//                 <label className="tmx9pf-label">ZIP / Postal Code *</label>
//                 <input name="postalCode" value={form.postalCode} onChange={handleChange} className={`tmx9pf-input ${errors.postalCode ? 'tmx9pf-input--error' : ''}`} />
//                 {renderError('postalCode')}
//               </div>

             
//                <div className="tmx9pf-field">
//                 <label className="tmx9pf-label">City *</label>
//                 <input name="city" value={form.city} onChange={handleChange} className={`tmx9pf-input ${errors.city ? 'tmx9pf-input--error' : ''}`} />
//                 {renderError('city')}
//               </div>

//             </div>
//           </section>
//         )}

//         {step === 1 && (
//           <section className="tmx9pf-section">
//             <h2 className="tmx9pf-section-title">Property Details & Features</h2>
//             <div className="tmx9pf-grid">
//               <div className="tmx9pf-field">
//                 <label className="tmx9pf-label">Bedrooms *</label>
//                 <input name="bedrooms" type="number" min="0" value={form.bedrooms} onChange={handleNumChange} className={`tmx9pf-input ${errors.bedrooms ? 'tmx9pf-input--error' : ''}`} />
//                 {renderError('bedrooms')}
//               </div>

//               <div className="tmx9pf-field">
//                 <label className="tmx9pf-label">Beds (count) *</label>
//                 <input name="beds" type="number" min="1" value={form.beds} onChange={handleNumChange} className={`tmx9pf-input ${errors.beds ? 'tmx9pf-input--error' : ''}`} />
//                 {renderError('beds')}
//               </div>

//               <div className="tmx9pf-field">
//                 <label className="tmx9pf-label">Bathrooms *</label>
//                 <input name="bathrooms" type="number" min="1"  value={form.bathrooms} onChange={handleNumChange} className={`tmx9pf-input ${errors.bathrooms ? 'tmx9pf-input--error' : ''}`} />
//                 {renderError('bathrooms')}
//               </div>

//               <div className="tmx9pf-field full">
//                 <label className="tmx9pf-label">Living Spaces (describe)</label>
//                 <input name="area" value={form.area} onChange={handleChange} className="tmx9pf-input" placeholder="e.g., Living room, kitchen, terrace" />
//               </div>

//               <div className="tmx9pf-field full">
//                 <label className="tmx9pf-label">Amenities (select all that apply)</label>
//                 <div className="tmx9pf-amenities">
//                   {Object.entries(AMENITIES).map(([group, list]) => (
//                     <div key={group} className="tmx9pf-amenity-group">
//                       <div className="tmx9pf-amenity-group-title">{group}</div>
//                       <div className="tmx9pf-amenity-list">
//                         {list.map((a) => (
//                           <label key={a} className="tmx9pf-amenity">
//                             <input type="checkbox" checked={!!form.amenities[a]} onChange={() => handleAmenityToggle(a)} />
//                             <span>{a}</span>
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </section>
//         )}

//         {step === 2 && (
//           <section className="tmx9pf-section">
//             <h2 className="tmx9pf-section-title">House Rules</h2>
//             <div className="tmx9pf-grid">
//               <div className="tmx9pf-field">
//                 <label className="tmx9pf-label">Check-in Time *</label>
//                 <input name="checkInTime" type="time" value={form.checkInTime} onChange={handleChange} className={`tmx9pf-input ${errors.checkInTime ? 'tmx9pf-input--error' : ''}`} />
//                 {renderError('checkInTime')}
//               </div>

//               <div className="tmx9pf-field">
//                 <label className="tmx9pf-label">Check-out Time *</label>
//                 <input name="checkOutTime" type="time" value={form.checkOutTime} onChange={handleChange} className={`tmx9pf-input ${errors.checkOutTime ? 'tmx9pf-input--error' : ''}`} />
//                 {renderError('checkOutTime')}
//               </div>

//               <div className="tmx9pf-field">
//                 <label className="tmx9pf-label">Smoking Allowed</label>
//                 <Toggle name="smokingAllowed" value={form.smokingAllowed} onChange={(v) => setForm(s => ({ ...s, smokingAllowed: v }))} />
//               </div>

//               <div className="tmx9pf-field">
//                 <label className="tmx9pf-label">Pets Allowed</label>
//                 <Toggle name="petsAllowed" value={form.petsAllowed} onChange={(v) => setForm(s => ({ ...s, petsAllowed: v }))} />
//               </div>

//               <div className="tmx9pf-field">
//                 <label className="tmx9pf-label">Events / Parties Allowed</label>
//                 <Toggle name="eventsAllowed" value={form.eventsAllowed} onChange={(v) => setForm(s => ({ ...s, eventsAllowed: v }))} />
//               </div>

//               <div className="tmx9pf-field">
//                 <label className="tmx9pf-label">Quiet Hours</label>
//                 <input name="quietHours" value={form.quietHours} onChange={handleChange} className="tmx9pf-input" />
//               </div>

//               <div className="tmx9pf-field">
//                 <label className="tmx9pf-label">Maximum Guests *</label>
//                 <input name="maxGuests" type="number" min="1" value={form.maxGuests} onChange={handleNumChange} className={`tmx9pf-input ${errors.maxGuests ? 'tmx9pf-input--error' : ''}`} />
//                 {renderError('maxGuests')}
//               </div>
//             </div>
//           </section>
//         )}

//         {step === 3 && (
//           <section className="tmx9pf-section">
//             <h2 className="tmx9pf-section-title">Photos & Media</h2>
//             <div className="tmx9pf-grid">
//               <div className="tmx9pf-field full">
//                 <label className="tmx9pf-label">Photos (drag & select) — up to 12 *</label>
//                 <input type="file" accept="image/*" multiple onChange={handlePhotos} className={`tmx9pf-file ${errors.photos ? 'tmx9pf-file--error' : ''}`} />
//                 {renderError('photos')}
//                 <div className="tmx9pf-photo-previews">
//                   {photoPreviews.previews.length === 0 && <div className="tmx9pf-muted">No photos selected</div>}
//                   {photoPreviews.previews.map((p, i) => (
//                     <div key={i} className="tmx9pf-photo-thumb">
//                       <img src={p.url} alt={p.name} />
//                       <div className="tmx9pf-photo-actions">
//                         <button type="button" onClick={() => setCoverIndex(i)} className={`tmx9pf-small-btn ${coverIndex === i ? 'tmx9pf-small-btn--active' : ''}`}>Cover</button>
//                         <button type="button" onClick={() => removePhoto(i)} className="tmx9pf-small-btn">Remove</button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </section>
//         )}

//         {step === 4 && (
//           <section className="tmx9pf-section">
//             <h2 className="tmx9pf-section-title">Pricing & Availability</h2>
//             <div className="tmx9pf-grid">
//               <div className="tmx9pf-field">
//                 <label className="tmx9pf-label">Base nightly rate (Rs) *</label>
//                 <input name="baseRate" type="number" min="0"  value={form.baseRate} onChange={handleNumChange} className={`tmx9pf-input ${errors.baseRate ? 'tmx9pf-input--error' : ''}`} />
//                 {renderError('baseRate')}
//               </div>

//               <div className="tmx9pf-field">
//                 <label className="tmx9pf-label">Weekend rate</label>
//                 <input type="number" name="weekendRate" value={form.weekendRate} onChange={handleChange} className="tmx9pf-input" />
//               </div>

//               <div className="tmx9pf-field">
//                 <label className="tmx9pf-label">Weekly Discount %</label>
//                 <input step="0.01" name="weeklyDiscountPct" type="number" min="0" max="100" value={form.weeklyDiscountPct} onChange={handleNumChange} className={`tmx9pf-input ${errors.weeklyDiscountPct ? 'tmx9pf-input--error' : ''}`} />
//                 {renderError('weeklyDiscountPct')}
//               </div>

//               <div className="tmx9pf-field">
//                 <label className="tmx9pf-label">Monthly discount (%)</label>
//                 <input step="0.01" name="monthlyDiscountPct" type="number" min="0" max="100" value={form.monthlyDiscountPct} onChange={handleNumChange} className="tmx9pf-input" />
//               </div>

//               <div className="tmx9pf-field">
//                 <label className="tmx9pf-label">Cleaning fee</label>
//                 <input name="cleaningFee" value={form.cleaningFee} onChange={handleChange} className="tmx9pf-input" />
//               </div>

//               <div className="tmx9pf-field">
//                 <label className="tmx9pf-label">Self-check-in method *</label>
//                 <input name="selfCheckIn" value={form.selfCheckIn} onChange={handleChange} className={`tmx9pf-input ${errors.selfCheckIn ? 'tmx9pf-input--error' : ''}`} placeholder="e.g., Smart lock, Lockbox" />
//                 {renderError('selfCheckIn')}
//               </div>

//             </div>
//           </section>
//         )}

//         {step === 5 && (
//           <section className="tmx9pf-section">
//             <h2 className="tmx9pf-section-title">Identity & Legal</h2>
//             <div className="tmx9pf-grid">
//               <div className="tmx9pf-field full">
//                 <label className="tmx9pf-label">Government ID / Business documents *</label>
//                 <input type="file" accept=".pdf,image/*" multiple onChange={handleIdFiles} className="tmx9pf-file" />
//                 {renderError('idFiles')}
//                 <div className="tmx9pf-muted">Files selected: {idFiles.length}</div>
//               </div>

//               <div className="tmx9pf-field">
//                 <label className="tmx9pf-label">Selfie verification (optional)</label>
//                 <input type="file" accept="image/*" onChange={handleSelfie} className="tmx9pf-file" />
//                 <div className="tmx9pf-muted">{selfieFile ? selfieFile.name : "No selfie selected"}</div>
//               </div>

//               <div className="tmx9pf-field">
//                 <label className="tmx9pf-label">Cancellation policy</label>
//                 <select value={policy} onChange={(e) => setPolicy(e.target.value)} className="tmx9pf-select">
//                   {DEFAULT_CANCELLATION_POLICIES.map(p => <option key={p} value={p}>{p}</option>)}
//                 </select>
//               </div>

//               <div className="tmx9pf-field">
//                 <label className="tmx9pf-label">Insurance option</label>
//                 <select value={insurance ? "yes" : "no"} onChange={(e) => setInsurance(e.target.value === "yes")} className="tmx9pf-select">
//                   <option value="no">No</option>
//                   <option value="yes">Yes - include</option>
//                 </select>
//               </div>

//               <div className="tmx9pf-field">
//                 <label className="tmx9pf-label">Damage protection</label>
//                 <select value={damageProtection ? "yes" : "no"} onChange={(e) => setDamageProtection(e.target.value === "yes")} className="tmx9pf-select">
//                   <option value="no">No</option>
//                   <option value="yes">Yes - require</option>
//                 </select>
//               </div>
//             </div>
//           </section>
//         )}

//       </div>

//       <div className="tmx9pf-nav">
//         <button type="button" onClick={goPrev} disabled={step === 0} className="tmx9pf-nav-btn tmx9pf-nav-prev">Previous</button>
//         {step < STEPS.length - 1 ? (
//           <button type="button" onClick={goNext} className="tmx9pf-nav-btn tmx9pf-nav-next">Next</button>
//         ) : (
//           <button type="submit" className="tmx9pf-nav-btn tmx9pf-nav-next" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Publish'}</button>
//         )}
//       </div>

//     </form>
//   );
// };

// export default Tmx9PropertyForm;

// Tmx9PropertyForm.jsx
import React, { useState, useEffect } from "react";
import "./tmx9pf-form.css";

/*
  Paginated property form (6 steps) — Updated per user's request:
  - Next button will NOT submit until final step (explicit type attributes)
  - All major fields validated (required) and errors shown as <span> under inputs
  - Improved radio/select UI for Smoking / Pets / Events as compact toggle buttons with small SVG icons
  - Input/file borders and accents use #c98429
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
const PROPERTY_TYPES = ["Entire place", "Private room"];

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
    // Property Information
    property_name: "",
    property_type: "Villa",
    property_category: "Luxury",
    space_description: "",
    guest_access: "",
    interaction: "",
    neighborhood: "",
    other_notes: "",
    pin: "",
    zipcode: "",
    
    // Location
    country: "India",
    latitude: "",
    longitude: "",
    registration_number: "",
    local_compliance: "",
    
    // Property Details
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    area: "",
    amenities: [],
    
    // Policies
    check_in_time: "15:00:00",
    check_out_time: "11:00:00",
    smoking_allowed: 0,
    pets_allowed: 0,
    events_allowed: 0,
    quiet_hours: "22:00-07:00",
    max_guests: 2,
    
    // Pricing
    base_rate: "",
    weekend_rate: "",
    weekly_discount_pct: "",
    monthly_discount_pct: "",
    cleaning_fee: "",
    security_deposit: "",
    additional_guest_fee: "",
    min_stay: 1,
    max_stay: 30,
    booking_window_days: 365,
    
    // Check-in
    self_check_in: "",
    key_exchange: "",
    host_meetup: "",
    
    // Additional
    cover_photo_index: 0,
    cancellation_policy: "Flexible",
    insurance: 0,
    damage_protection: 0,
    host_id: 123
  });

  const photoPreviews = useFilePreviews();
  const [coverIndex, setCoverIndex] = useState(null);
  const [idFiles, setIdFiles] = useState([]);
  const [selfieFile, setSelfieFile] = useState(null);
  const [policy, setPolicy] = useState(DEFAULT_CANCELLATION_POLICIES[0]);
  const [insurance, setInsurance] = useState(false);
  const [damageProtection, setDamageProtection] = useState(false);

  const STEPS = [
    { id: 1, title: 'Basic & Description' },
    { id: 2, title: 'Details & Amenities' },
    { id: 3, title: 'House Rules' },
    { id: 4, title: 'Photos & Media' },
    { id: 5, title: 'Pricing & Check-in' },
    { id: 6, title: 'IDs & Legal' }
  ];
  const [step, setStep] = useState(0);

  useEffect(() => {
    const all = {};
    Object.values(AMENITIES).flat().forEach((a) => (all[a] = false));
    setForm((f) => ({ ...f, amenities: all }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // FULL validation (all steps) and per-step validation
  const validateForStep = (s) => {
    const newErrors = {};

    // Step 0: Basic & Description
    if (s === 0) {
      if (!form.address?.trim()) newErrors.address = 'Address is required';
      if (!form.city?.trim()) newErrors.city = 'City is required';
      if (!form.postalCode?.trim()) newErrors.postalCode = 'Postal code is required';
      if (!form.country?.trim()) newErrors.country = 'Country is required';
      if (!form.title?.trim()) newErrors.title = 'Title is required';
      if (!form.mainDescription?.trim()) newErrors.mainDescription = 'Description is required';
      else if (form.mainDescription.length < 30) newErrors.mainDescription = 'Description should be at least 30 characters';
      
      // Validate latitude and longitude if provided
      if (form.latitude !== '' && form.latitude !== undefined) {
        const lat = Number(form.latitude);
        if (isNaN(lat) || lat < -90 || lat > 90) {
          newErrors.latitude = 'Latitude must be between -90 and 90';
        }
      }
      if (form.longitude !== '' && form.longitude !== undefined) {
        const lng = Number(form.longitude);
        if (isNaN(lng) || lng < -180 || lng > 180) {
          newErrors.longitude = 'Longitude must be between -180 and 180';
        }
      }
    }

    // Step 1: Details & Amenities
    if (s === 1) {
      if (form.bedrooms === '' || form.bedrooms < 0) newErrors.bedrooms = 'Bedrooms required (>= 0)';
      if (form.beds === '' || form.beds <= 0) newErrors.beds = 'At least one bed required';
      if (form.bathrooms === '' || form.bathrooms <= 0) newErrors.bathrooms = 'At least one bathroom required';
      if (!form.area?.trim()) {
        newErrors.area = 'Area is required';
      } else if (form.area.length > 20) {
        newErrors.area = 'Area should not exceed 20 characters';
      }
    }

    // Step 2: House Rules
    if (s === 2) {
      if (!form.checkInTime) newErrors.checkInTime = 'Check-in time required';
      if (!form.checkOutTime) newErrors.checkOutTime = 'Check-out time required';
      if (form.maxGuests === '' || form.maxGuests < 1) newErrors.maxGuests = 'Max guests must be at least 1';
    }

    // Step 3: Photos
    if (s === 3) {
      if (photoPreviews.previews.length === 0) newErrors.photos = 'At least one photo is required';
    }

    // Step 4: Pricing & Check-in
    if (s === 4) {
      if (!form.baseRate && form.baseRate !== 0) newErrors.baseRate = 'Base rate is required';
      if (form.baseRate && Number(form.baseRate) <= 0) newErrors.baseRate = 'Rate must be positive';
      if (form.weeklyDiscountPct && (form.weeklyDiscountPct < 0 || form.weeklyDiscountPct > 100)) newErrors.weeklyDiscountPct = 'Discount must be between 0 and 100';
      if (!form.selfCheckIn?.trim()) newErrors.selfCheckIn = 'Provide self-check-in method or note';
    }

    // Step 5: IDs & Legal
    if (s === 5) {
      if (idFiles.length === 0) newErrors.idFiles = 'Please upload at least one ID / document';
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
    // For latitude and longitude, allow empty string or valid number
    if (name === 'latitude' || name === 'longitude') {
      if (value === '') {
        setForm((s) => ({ ...s, [name]: '' }));
      } else {
        const num = Number(value);
        if (!isNaN(num)) {
          setForm((s) => ({ ...s, [name]: num }));
        }
      }
    } else {
      const num = value === "" ? "" : Number(value);
      setForm((s) => ({ ...s, [name]: num }));
    }
  };

  const handleAmenityToggle = (amenity) => {
    setForm((s) => ({ ...s, amenities: { ...s.amenities, [amenity]: !s.amenities[amenity] } }));
  };

  const handlePhotos = (e) => {
    const files = e.target.files;
    photoPreviews.update(files);
    setCoverIndex(null);
    // clear any photo error when files added
    setErrors((prev) => ({ ...prev, photos: undefined }));
  };

  const removePhoto = (index) => {
    const updated = photoPreviews.previews.filter((_, i) => i !== index);
    photoPreviews.update([]);
    setTimeout(() => photoPreviews.update(updated.map((p) => p.file)), 0);
    if (coverIndex === index) setCoverIndex(null);
    else if (coverIndex > index) setCoverIndex((c) => c - 1);
  };

  const handleIdFiles = (e) => {
    const arr = Array.from(e.target.files || []);
    setIdFiles(arr);
    setErrors((prev) => ({ ...prev, idFiles: undefined }));
  };
  const handleSelfie = (e) => setSelfieFile(e.target.files?.[0] || null);

  const goNext = () => {
    // validate current step; only move forward if ok
    if (validateForStep(step)) {
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // focus first invalid field
      const firstError = Object.keys(errors)[0];
      setTimeout(() => {
        const element = document.querySelector(`[name="${firstError}"]`);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
    }
  };

  const goPrev = () => {
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ---------- UPDATED handleSubmit: sends multipart/form-data to backend ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // validate all steps
    for (let i = 0; i < STEPS.length; i++) {
      const ok = validateForStep(i);
      if (!ok) { setIsSubmitting(false); setStep(i); return; }
    }

    try {
      // Build FormData
      const fd = new FormData();

      // Required backend fields mapping (backend expects property_name etc.)
      fd.append('property_name', form.title || '');
      fd.append('description', form.mainDescription || '');
      fd.append('city', form.city || '');
      fd.append('address', form.address || '');
      if (form.baseRate !== '' && form.baseRate !== null) {
        fd.append('price', Number(form.baseRate).toFixed(2));
      }

      // Attach a meta JSON for extra fields (optional)
      const meta = {
        propertyType: form.propertyType,
        propertyCategory: form.propertyCategory,
        bedrooms: form.bedrooms,
        beds: form.beds,
        bathrooms: form.bathrooms,
        area: form.area,
        amenities: Object.keys(form.amenities).filter(k => form.amenities[k]),
        checkInTime: form.checkInTime,
        checkOutTime: form.checkOutTime,
        smokingAllowed: form.smokingAllowed,
        petsAllowed: form.petsAllowed,
        eventsAllowed: form.eventsAllowed,
        maxGuests: form.maxGuests,
        weekendRate: form.weekendRate,
        weeklyDiscountPct: form.weeklyDiscountPct,
        monthlyDiscountPct: form.monthlyDiscountPct,
        cleaningFee: form.cleaningFee,
        selfCheckIn: form.selfCheckIn,
        cancellationPolicy: policy,
        insurance,
        damageProtection,
        postalCode: form.postalCode,
        country: form.country,
        // Only include latitude/longitude if they have values
        ...(form.latitude !== '' && form.latitude !== undefined && { latitude: Number(form.latitude) }),
        ...(form.longitude !== '' && form.longitude !== undefined && { longitude: Number(form.longitude) }),
        registrationNumber: form.registrationNumber,
        localCompliance: form.localCompliance
      };
      fd.append('meta', JSON.stringify(meta));

      // Attach photos (ensure photoPreviews.previews items include .file)
      photoPreviews.previews.forEach((p, i) => {
        if (p && p.file) fd.append('photos', p.file, p.name || `photo-${i}`);
      });

      // Attach id files
      idFiles.forEach((f, i) => {
        fd.append('idFiles', f, f.name || `id-${i}`);
      });

      // Selfie if provided
      if (selfieFile) fd.append('selfie', selfieFile, selfieFile.name);

      // Optionally append cover index
      if (coverIndex !== null && coverIndex !== undefined) {
        fd.append('coverPhotoIndex', String(coverIndex));
      }

      // Send to backend (do not set Content-Type; browser will set boundary)
      const res = await fetch('http://localhost:3030/api/ovika/properties/upload', {
        method: 'POST',
        body: fd,
        credentials: 'include' // optional: if you use cookies/sessions
      });

      const data = await res.json().catch(() => ({ success: false, message: 'Invalid JSON response' }));

      if (!res.ok) {
        console.error('API error', data);
        alert(`Error: ${data.message || 'Failed to create property'}`);
        setIsSubmitting(false);
        return;
      }

      // success
      console.log('API response', data);
      alert('Property created successfully! ID: ' + (data.data?.id ?? 'unknown'));

      // reset some parts of the form (do not wipe everything; preserve UX as you want)
      setForm(prev => ({
        ...prev,
        title: '',
        mainDescription: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        baseRate: ''
      }));
      photoPreviews.clear();
      setIdFiles([]);
      setSelfieFile(null);
      setCoverIndex(null);
      setStep(0);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit form. Please check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };
  // ---------- END handleSubmit ---------------------------------------------------

  // custom toggle UI for binary options (smoking/pets/events)
  const Toggle = ({ name, value, onChange }) => (
    <div className="tmx9pf-toggle" role="group" aria-label={name}>
      <button type="button" className={`option ${value === false ? 'active' : ''}`} onClick={() => onChange(false)}>
        {/* small svg for No */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <small>No</small>
      </button>
      <button type="button" className={`option ${value === true ? 'active' : ''}`} onClick={() => onChange(true)}>
        {/* small svg for Yes */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <small>Yes</small>
      </button>
    </div>
  );

  return (
    <form className="tmx9pf-root tmx9pf-paginated" onSubmit={handleSubmit} noValidate>
      <header className="tmx9pf-header">
        <h1 className="tmx9pf-title">Create <span className="span-data-setup">Property</span> Listing</h1>
        <p className="tmx9pf-sub">Fill the sections below carefully. Use Next / Previous to navigate steps.</p>

        <div className="tmx9pf-stepper">
          {STEPS.map((s, i) => (
            <div key={s.id} className={`tmx9pf-step ${i === step ? 'active' : i < step ? 'done' : ''}`}>
              <div className="tmx9pf-step-bullet">{i + 1}</div>
              <div className="tmx9pf-step-title">{s.title}</div>
            </div>
          ))}
        </div>
      </header>

      <div className="tmx9pf-card">

        {step === 0 && (
          <section className="tmx9pf-section">
            <h2 className="tmx9pf-section-title">Basic Property Information & Description</h2>
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

              <div className="tmx9pf-field full">
                <label className="tmx9pf-label">Listing Title *</label>
                <input name="title" value={form.title} onChange={handleChange} className={`tmx9pf-input ${errors.title ? 'tmx9pf-input--error' : ''}`} placeholder="Cozy 2-Bedroom Apartment Near City Center" />
                {renderError('title')}
              </div>

              <div className="tmx9pf-field full">
                <label className="tmx9pf-label">Main Description *</label>
                <textarea name="mainDescription" value={form.mainDescription} onChange={handleChange} rows="4" className={`tmx9pf-textarea ${errors.mainDescription ? 'tmx9pf-input--error' : ''}`} />
                {renderError('mainDescription')}
              </div>

              <div className="tmx9pf-field full">
                <label className="tmx9pf-label">Full Address *</label>
                <input name="address" value={form.address} onChange={handleChange} className={`tmx9pf-input ${errors.address ? 'tmx9pf-input--error' : ''}`} />
                {renderError('address')}
              </div>
 <div className="tmx9pf-field">
                <label className="tmx9pf-label">Country *</label>
                <input name="country" value={form.country} onChange={handleChange} className={`tmx9pf-input ${errors.country ? 'tmx9pf-input--error' : ''}`} />
                {renderError('country')}
              </div>
             

              <div className="tmx9pf-field">
                <label className="tmx9pf-label">ZIP / Postal Code *</label>
                <input name="postalCode" value={form.postalCode} onChange={handleChange} className={`tmx9pf-input ${errors.postalCode ? 'tmx9pf-input--error' : ''}`} />
                {renderError('postalCode')}
              </div>

             
               <div className="tmx9pf-field">
                <label className="tmx9pf-label">City *</label>
                <input name="city" value={form.city} onChange={handleChange} className={`tmx9pf-input ${errors.city ? 'tmx9pf-input--error' : ''}`} />
                {renderError('city')}
              </div>

              <div className="tmx9pf-field">
                <label className="tmx9pf-label">Latitude</label>
                <input 
                  type="number" 
                  step="0.000001" 
                  name="latitude" 
                  value={form.latitude} 
                  onChange={handleNumChange} 
                  className={`tmx9pf-input ${errors.latitude ? 'tmx9pf-input--error' : ''}`} 
                  placeholder="e.g., 19.0760"
                />
                {renderError('latitude')}
              </div>
              <div className="tmx9pf-field">
                <label className="tmx9pf-label">Longitude</label>
                <input 
                  type="number" 
                  step="0.000001" 
                  name="longitude" 
                  value={form.longitude} 
                  onChange={handleNumChange} 
                  className={`tmx9pf-input ${errors.longitude ? 'tmx9pf-input--error' : ''}`}
                  placeholder="e.g., 72.8777"
                />
                {renderError('longitude')}
              </div>

            </div>
          </section>
        )}

        {step === 1 && (
          <section className="tmx9pf-section">
            <h2 className="tmx9pf-section-title">Property Details & Features</h2>
            <div className="tmx9pf-grid">
              <div className="tmx9pf-field">
                <label className="tmx9pf-label">Bedrooms *</label>
                <input name="bedrooms" type="number" min="0" value={form.bedrooms} onChange={handleNumChange} className={`tmx9pf-input ${errors.bedrooms ? 'tmx9pf-input--error' : ''}`} />
                {renderError('bedrooms')}
              </div>

              <div className="tmx9pf-field">
                <label className="tmx9pf-label">Beds (count) *</label>
                <input name="beds" type="number" min="1" value={form.beds} onChange={handleNumChange} className={`tmx9pf-input ${errors.beds ? 'tmx9pf-input--error' : ''}`} />
                {renderError('beds')}
              </div>

              <div className="tmx9pf-field">
                <label className="tmx9pf-label">Bathrooms *</label>
                <input name="bathrooms" type="number" min="1"  value={form.bathrooms} onChange={handleNumChange} className={`tmx9pf-input ${errors.bathrooms ? 'tmx9pf-input--error' : ''}`} />
                {renderError('bathrooms')}
              </div>

              <div className="tmx9pf-field">
                <label className="tmx9pf-label">Area (sq ft) *</label>
                <input 
                  name="area" 
                  value={form.area} 
                  onChange={handleChange} 
                  maxLength={20}
                  className={`tmx9pf-input ${errors.area ? 'tmx9pf-input--error' : ''}`} 
                  placeholder="e.g., 1500 sqft" 
                />
                {renderError('area')}
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

        {step === 2 && (
          <section className="tmx9pf-section">
            <h2 className="tmx9pf-section-title">House Rules</h2>
            <div className="tmx9pf-grid">
              <div className="tmx9pf-field">
                <label className="tmx9pf-label">Check-in Time *</label>
                <input name="checkInTime" type="time" value={form.checkInTime} onChange={handleChange} className={`tmx9pf-input ${errors.checkInTime ? 'tmx9pf-input--error' : ''}`} />
                {renderError('checkInTime')}
              </div>

              <div className="tmx9pf-field">
                <label className="tmx9pf-label">Check-out Time *</label>
                <input name="checkOutTime" type="time" value={form.checkOutTime} onChange={handleChange} className={`tmx9pf-input ${errors.checkOutTime ? 'tmx9pf-input--error' : ''}`} />
                {renderError('checkOutTime')}
              </div>

              <div className="tmx9pf-field">
                <label className="tmx9pf-label">Smoking Allowed</label>
                <Toggle name="smokingAllowed" value={form.smokingAllowed} onChange={(v) => setForm(s => ({ ...s, smokingAllowed: v }))} />
              </div>

              <div className="tmx9pf-field">
                <label className="tmx9pf-label">Pets Allowed</label>
                <Toggle name="petsAllowed" value={form.petsAllowed} onChange={(v) => setForm(s => ({ ...s, petsAllowed: v }))} />
              </div>

              <div className="tmx9pf-field">
                <label className="tmx9pf-label">Events / Parties Allowed</label>
                <Toggle name="eventsAllowed" value={form.eventsAllowed} onChange={(v) => setForm(s => ({ ...s, eventsAllowed: v }))} />
              </div>

              <div className="tmx9pf-field">
                <label className="tmx9pf-label">Quiet Hours</label>
                <input name="quietHours" value={form.quietHours} onChange={handleChange} className="tmx9pf-input" />
              </div>

              <div className="tmx9pf-field">
                <label className="tmx9pf-label">Maximum Guests *</label>
                <input name="maxGuests" type="number" min="1" value={form.maxGuests} onChange={handleNumChange} className={`tmx9pf-input ${errors.maxGuests ? 'tmx9pf-input--error' : ''}`} />
                {renderError('maxGuests')}
              </div>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="tmx9pf-section">
            <h2 className="tmx9pf-section-title">Photos & Media</h2>
            <div className="tmx9pf-grid">
              <div className="tmx9pf-field full">
                <label className="tmx9pf-label">Photos (drag & select) — up to 12 *</label>
                <input type="file" accept="image/*" multiple onChange={handlePhotos} className={`tmx9pf-file ${errors.photos ? 'tmx9pf-file--error' : ''}`} />
                {renderError('photos')}
                <div className="tmx9pf-photo-previews">
                  {photoPreviews.previews.length === 0 && <div className="tmx9pf-muted">No photos selected</div>}
                  {photoPreviews.previews.map((p, i) => (
                    <div key={i} className="tmx9pf-photo-thumb">
                      <img src={p.url} alt={p.name} />
                      <div className="tmx9pf-photo-actions">
                        <button type="button" onClick={() => setCoverIndex(i)} className={`tmx9pf-small-btn ${coverIndex === i ? 'tmx9pf-small-btn--active' : ''}`}>Cover</button>
                        <button type="button" onClick={() => removePhoto(i)} className="tmx9pf-small-btn">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {step === 4 && (
          <section className="tmx9pf-section">
            <h2 className="tmx9pf-section-title">Pricing & Availability</h2>
            <div className="tmx9pf-grid">
              <div className="tmx9pf-field">
                <label className="tmx9pf-label">Base nightly rate (Rs) *</label>
                <input name="baseRate" type="number" min="0"  value={form.baseRate} onChange={handleNumChange} className={`tmx9pf-input ${errors.baseRate ? 'tmx9pf-input--error' : ''}`} />
                {renderError('baseRate')}
              </div>

              <div className="tmx9pf-field">
                <label className="tmx9pf-label">Weekend rate</label>
                <input type="number" name="weekendRate" value={form.weekendRate} onChange={handleChange} className="tmx9pf-input" />
              </div>

              <div className="tmx9pf-field">
                <label className="tmx9pf-label">Weekly Discount %</label>
                <input step="0.01" name="weeklyDiscountPct" type="number" min="0" max="100" value={form.weeklyDiscountPct} onChange={handleNumChange} className={`tmx9pf-input ${errors.weeklyDiscountPct ? 'tmx9pf-input--error' : ''}`} />
                {renderError('weeklyDiscountPct')}
              </div>

              <div className="tmx9pf-field">
                <label className="tmx9pf-label">Monthly discount (%)</label>
                <input step="0.01" name="monthlyDiscountPct" type="number" min="0" max="100" value={form.monthlyDiscountPct} onChange={handleNumChange} className="tmx9pf-input" />
              </div>

              <div className="tmx9pf-field">
                <label className="tmx9pf-label">Cleaning fee</label>
                <input name="cleaningFee" value={form.cleaningFee} onChange={handleChange} className="tmx9pf-input" />
              </div>

              <div className="tmx9pf-field">
                <label className="tmx9pf-label">Self-check-in method *</label>
                <input name="selfCheckIn" value={form.selfCheckIn} onChange={handleChange} className={`tmx9pf-input ${errors.selfCheckIn ? 'tmx9pf-input--error' : ''}`} placeholder="e.g., Smart lock, Lockbox" />
                {renderError('selfCheckIn')}
              </div>

            </div>
          </section>
        )}

        {step === 5 && (
          <section className="tmx9pf-section">
            <h2 className="tmx9pf-section-title">Identity & Legal</h2>
            <div className="tmx9pf-grid">
              <div className="tmx9pf-field full">
                <label className="tmx9pf-label">Government ID / Business documents *</label>
                <input type="file" accept=".pdf,image/*" multiple onChange={handleIdFiles} className="tmx9pf-file" />
                {renderError('idFiles')}
                <div className="tmx9pf-muted">Files selected: {idFiles.length}</div>
              </div>

              <div className="tmx9pf-field">
                <label className="tmx9pf-label">Selfie verification (optional)</label>
                <input type="file" accept="image/*" onChange={handleSelfie} className="tmx9pf-file" />
                <div className="tmx9pf-muted">{selfieFile ? selfieFile.name : "No selfie selected"}</div>
              </div>

              <div className="tmx9pf-field">
                <label className="tmx9pf-label">Cancellation policy</label>
                <select value={policy} onChange={(e) => setPolicy(e.target.value)} className="tmx9pf-select">
                  {DEFAULT_CANCELLATION_POLICIES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              <div className="tmx9pf-field">
                <label className="tmx9pf-label">Insurance option</label>
                <select value={insurance ? "yes" : "no"} onChange={(e) => setInsurance(e.target.value === "yes")} className="tmx9pf-select">
                  <option value="no">No</option>
                  <option value="yes">Yes - include</option>
                </select>
              </div>

              <div className="tmx9pf-field">
                <label className="tmx9pf-label">Damage protection</label>
                <select value={damageProtection ? "yes" : "no"} onChange={(e) => setDamageProtection(e.target.value === "yes")} className="tmx9pf-select">
                  <option value="no">No</option>
                  <option value="yes">Yes - require</option>
                </select>
              </div>
            </div>
          </section>
        )}

      </div>

      <div className="tmx9pf-nav">
        <button type="button" onClick={goPrev} disabled={step === 0} className="tmx9pf-nav-btn tmx9pf-nav-prev">Previous</button>
        {step < STEPS.length - 1 ? (
          <button type="button" onClick={goNext} className="tmx9pf-nav-btn tmx9pf-nav-next">Next</button>
        ) : (
          <button type="submit" className="tmx9pf-nav-btn tmx9pf-nav-next" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Publish'}</button>
        )}
      </div>

    </form>
  );
};

export default Tmx9PropertyForm;