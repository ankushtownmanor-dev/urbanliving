
// import React, { useEffect, useState, useContext, useCallback } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import styles from "./Dashboard.module.css";
// import { AuthContext } from "../../Login/AuthContext";
// import { Home, Plus, Loader } from "lucide-react";

// function KeyItem({ text, filetype = "pdf" }) {
//   const isXlsx = filetype === "xlsx";
//   return (
//     <div className={styles.keyItem}>
//       <span className={`${styles.keyDot} ${isXlsx ? styles.xlsx : styles.pdf}`} />
//       <span className={styles.keyText}>{text}</span>
//       <div className={styles.keyActions}>
//         <button title="View" className={styles.iconBtn} aria-label="view"><i className="fa-regular fa-eye" /></button>
//         <button title="Download" className={styles.iconBtn} aria-label="download"><i className="fa-solid fa-download" /></button>
//       </div>
//     </div>
//   );
// }

// function MessageItem({ initials, name, note }) {
//   return (
//     <div className={styles.msgItem}>
//       <div className={styles.avatar}>{initials}</div>
//       <div>
//         <div className={styles.msgName}>{name}</div>
//         <div className={styles.msgNote}>{note}</div>
//       </div>
//     </div>
//   );
// }

// function TicketRow({ title, status }) {
//   const statusClass = status.toLowerCase() === "resolved" ? styles.resolved : styles.open;
//   return (
//     <div className={styles.ticketRow}>
//       <span className={styles.ticketTitle}>{title}</span>
//       <span className={`${styles.chip} ${statusClass}`}>{status}</span>
//     </div>
//   );
// }

// // Constants for regular properties
// const AMENITIES = {
//   Basic: ["Wi-Fi", "Heating", "Air conditioning", "Hot water"],
//   Kitchen: ["Refrigerator", "Stovetop/oven", "Microwave", "Cooking utensils"],
//   Entertainment: ["TV", "Streaming services"],
//   Safety: ["Smoke detector", "Carbon monoxide detector", "Fire extinguisher", "First aid kit"],
//   Outdoor: ["Balcony/terrace", "Garden", "Parking space", "BBQ grill", "Tennis Court", "Golf Course"],
//   Wellness: ["Pool", "Hot tub", "Sauna", "Gym"],
//   Accessibility: ["Wheelchair accessible", "Elevator", "Ramp access"],
//   Services: ["Breakfast Included", "Lunch Included", "Dinner Included", "All Meals Included", "Airport pick-up", "Luggage storage", "Cleaning on request"],
// };

// // PG-specific constants
// const PG_AMENITIES = {
//   Essentials: ["Wi-Fi", "Power Backup", "Water Supply", "Housekeeping", "Laundry Service"],
//   Room_Features: ["Attached Bathroom", "Balcony", "Air Conditioner", "Geyser", "Study Table", "Cupboard", "TV"],
//   Food_Kitchen: ["Breakfast", "Lunch", "Dinner", "Tea/Coffee", "Self-cooking Kitchen", "Refrigerator", "Microwave", "RO Water Purifier"],
//   Security: ["CCTV", "Biometric Entry", "Security Guard", "Warden"],
//   Common_Areas: ["Common Room", "Dining Area", "Gym", "Gaming Zone", "Terrace", "Lift", "Parking"],
// };

// const DEFAULT_CANCELLATION_POLICIES = ["Flexible", "Moderate", "Strict"];
// const DEFAULT_PROPERTY_CATEGORIES = ["Apartment", "House", "Villa", "Cabin", "Bungalow", "Studio", "Suite", "PG", "Other"];
// const PROPERTY_TYPES = ["Entire place", "Private room"];
// const PG_TYPES = ["Boys PG", "Girls PG", "Co-ed PG"];
// const SHARING_TYPES = ["Single Room", "Double Sharing", "Triple Sharing", "Four Sharing", "Dormitory"];

// // Edit Modal Component
// function EditPropertyModal({ property, onClose, onRefresh }) {
//   const [loading, setLoading] = useState(false);

//   // Check if this is a PG property
//   const isPG = property.property_category === "PG" || 
//                (typeof property.meta === 'string' ? JSON.parse(property.meta || '{}') : property.meta)?.propertyCategory === "PG";

//   // Helper to safely get meta fields
//   const getMeta = (key, fallback = "") => {
//     if (!property) return fallback;
//     if (property[key] !== undefined && property[key] !== null) return property[key];

//     let m = property.meta;
//     if (typeof m === 'string') {
//       try { m = JSON.parse(m); } catch (e) { m = {}; }
//     }
    
//     if (['familyAllowed', 'unmarriedCoupleAllowed', 'bachelorAllowed'].includes(key)) {
//       let gp = property.guest_policy;
//       if (typeof gp === 'string') { try { gp = JSON.parse(gp); } catch (e) { } }
//       if (key === 'familyAllowed') return gp?.family_allowed ?? m?.familyAllowed ?? fallback;
//       if (key === 'unmarriedCoupleAllowed') return gp?.unmarried_couple_allowed ?? m?.unmarriedCoupleAllowed ?? fallback;
//       if (key === 'bachelorAllowed') return gp?.bachelors_allowed ?? m?.bachelorAllowed ?? fallback;
//     }

//     return m?.[key] ?? fallback;
//   };

//   // Helper to parse JSON fields
//   const parseJson = (val, fallback = []) => {
//     if (!val) return fallback;
//     if (Array.isArray(val)) return val;
//     if (typeof val === 'string') {
//       try { return JSON.parse(val) || fallback; } catch (e) { return fallback; }
//     }
//     return fallback;
//   };

//   // Safe Photos Parser
//   const getInitialPhotos = () => {
//     let p = property.photos;
//     if (typeof p === 'string') {
//       p = p.trim();
//       if (p.startsWith('[') && p.endsWith(']')) {
//         try { return JSON.parse(p); } catch (e) { }
//       }
//       return p.split(',').map(s => s.trim()).filter(Boolean);
//     }
//     if (Array.isArray(p)) return p;
//     return [];
//   };

//   const getInitialAmenities = () => {
//     let am = getMeta('amenities');
//     if (Array.isArray(am)) return am;
//     if (typeof am === 'string') {
//       try { return JSON.parse(am); } catch (e) { return []; }
//     }
//     return [];
//   };

//   // Get bedroom details based on property type
//   const getInitialBedroomDetails = () => {
//     const bedrooms = parseJson(property.bedrooms || getMeta('bedrooms'), []);
//     if (isPG && bedrooms.length > 0 && bedrooms[0].price !== undefined) {
//       // PG format with prices per sharing type
//       return bedrooms.map((bed, idx) => ({
//         id: idx,
//         type: bed.type || "Double Sharing",
//         count: bed.count || 1,
//         price: bed.price || "",
//         washroomType: bed.washroomType || "Attached"
//       }));
//     }
//     // Regular property format
//     return bedrooms.length > 0 ? bedrooms : [{ type: "King Bed", count: 1 }];
//   };

//   const [photoList, setPhotoList] = useState(getInitialPhotos());
//   const [newFiles, setNewFiles] = useState([]);

//   // Initialize state with all fields
//   const [formData, setFormData] = useState({
//     property_name: property.property_name || property.name || "",
//     description: property.description || "",
//     price: property.price || "",

//     // Type & Category
//     propertyType: isPG ? (getMeta('propertyType') || PG_TYPES[0]) : (property.property_type || getMeta('propertyType') || PROPERTY_TYPES[0]),
//     propertyCategory: getMeta('propertyCategory') || (isPG ? "PG" : DEFAULT_PROPERTY_CATEGORIES[0]),

//     // Location
//     address: property.address || "",
//     city: property.city || "",
//     country: property.country || getMeta('country') || "India",
//     postalCode: property.postal_code || property.zip_code || getMeta('postalCode') || "",
//     latitude: property.latitude || getMeta('latitude') || "",
//     longitude: property.longitude || getMeta('longitude') || "",

//     // Details
//     area: property.area || getMeta('area') || "",
//     beds: property.beds || getMeta('beds') || "",
//     maxGuests: property.max_guests || getMeta('maxGuests', 1),
//     bedrooms: getInitialBedroomDetails(),
//     bathrooms: parseJson(property.bathrooms || getMeta('bathrooms'), [{ type: "Attached", count: 1 }]),

//     // Costs
//     weekendRate: property.weekend_rate || getMeta('weekendRate'),
//     cleaningFee: property.cleaning_fee || getMeta('cleaningFee'),
//     weeklyDiscountPct: property.weekly_discount_pct || getMeta('weeklyDiscountPct'),
//     monthlyDiscountPct: property.monthly_discount_pct || getMeta('monthlyDiscountPct'),

//     // Times & Rules
//     checkInTime: property.check_in_time || getMeta('checkInTime') || "",
//     checkOutTime: property.check_out_time || getMeta('checkOutTime') || "",
//     quietHours: property.quiet_hours || getMeta('quietHours', isPG ? "23:00-06:00" : "22:00-07:00"),

//     // Booleans - Rules
//     smokingAllowed: property.smoking_allowed ? true : getMeta('smokingAllowed', false),
//     petsAllowed: property.pets_allowed ? true : getMeta('petsAllowed', false),
//     eventsAllowed: property.events_allowed ? true : getMeta('eventsAllowed', false),
//     drinkingAllowed: property.drinking_alcohol ? true : getMeta('drinkingAllowed', false),
//     outsideGuestsAllowed: property.outside_guests_allowed ? true : getMeta('outsideGuestsAllowed', false),

//     // Guest Policies
//     familyAllowed: getMeta('familyAllowed', false),
//     unmarriedCoupleAllowed: getMeta('unmarriedCoupleAllowed', false),
//     bachelorAllowed: getMeta('bachelorAllowed', isPG ? true : false),

//     // Policies & Booking
//     selfCheckIn: getMeta('selfCheckIn', ""),
//     bookingType: property.booking_type !== undefined ? property.booking_type : getMeta('bookingType', 0),
//     cancellationPolicy: property.cancellation_policy || getMeta('cancellationPolicy', DEFAULT_CANCELLATION_POLICIES[0]),
//     insurance: property.insurance ? true : getMeta('insurance', false),
//     damageProtection: property.damage_protection ? true : getMeta('damageProtection', false),

//     // PG-specific fields from listing form
//     gateClosingTime: getMeta('gateClosingTime', ""),
//     noticePeriod: getMeta('noticePeriod', 30),
//     lockInPeriod: getMeta('lockInPeriod', 1),
//     foodAvailable: getMeta('foodAvailable', false),
//     electricityCharges: getMeta('electricityCharges', "Included in Rent"),
//     perNightPrice: getMeta('perNightPrice', ""),
//     securityDeposit: getMeta('securityDeposit', ""),
    
//     // Local Guide fields from PG listing form
//     localGuide: {
//       nearestMetroStation: getMeta('localGuide')?.nearestMetroStation || "",
//       nearestBusStop: getMeta('localGuide')?.nearestBusStop || "",
//       nearbyMarket: getMeta('localGuide')?.nearbyMarket || "",
//       nearbyHospital: getMeta('localGuide')?.nearbyHospital || "",
//       nearbyShowroom: getMeta('localGuide')?.nearbyShowroom || "",
//       otherNotes: getMeta('localGuide')?.otherNotes || ""
//     },

//     // Amenities List
//     amenities: getInitialAmenities(),
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
//   };

//   const handleAmenityToggle = (amenity) => {
//     setFormData(prev => {
//       const current = prev.amenities || [];
//       if (current.includes(amenity)) {
//         return { ...prev, amenities: current.filter(a => a !== amenity) };
//       } else {
//         return { ...prev, amenities: [...current, amenity] };
//       }
//     });
//   };

//   // Photo handlers
//   const handleFileSelect = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const files = Array.from(e.target.files);
//       const images = files.filter(f => f.type.startsWith('image/'));
//       setNewFiles(prev => [...prev, ...images]);
//     }
//   };

//   const removePhoto = (index) => {
//     setPhotoList(prev => prev.filter((_, i) => i !== index));
//   };

//   const removeNewFile = (index) => {
//     setNewFiles(prev => prev.filter((_, i) => i !== index));
//   };

//   const handleSave = async () => {
//     setLoading(true);
//     try {
//       // 1. Upload any new files
//       let uploadedUrls = [];
//       if (newFiles.length > 0) {
//         const uploadPromises = newFiles.map(async (file) => {
//           const fd = new FormData();
//           fd.append('images', file);
//           const res = await fetch('https://www.townmanor.ai/api/image/aws-upload-owner-images', {
//             method: 'POST',
//             body: fd,
//           });
//           const data = await res.json();
//           return (data.fileUrls && data.fileUrls[0]) ? data.fileUrls[0] : null;
//         });
//         const results = await Promise.all(uploadPromises);
//         uploadedUrls = results.filter(Boolean);
//       }

//       const finalAllPhotos = [...photoList, ...uploadedUrls];

//       const payload = {};

//       // 1. Basic Strings
//       if (formData.property_name) payload.property_name = formData.property_name;
      
//       // Build description with PG info embedded (WITHOUT EMOJIS)
//       let finalDescription = formData.description || "";
//       if (isPG) {
//         const pgInfo = [];
//         if (formData.gateClosingTime) pgInfo.push(`Gate Closing Time: ${formData.gateClosingTime}`);
//         if (formData.noticePeriod) pgInfo.push(`Notice Period: ${formData.noticePeriod} days`);
//         if (formData.lockInPeriod) pgInfo.push(`Lock-in Period: ${formData.lockInPeriod} months`);
//         if (formData.foodAvailable) pgInfo.push(`Food: Available`);
//         if (formData.electricityCharges) pgInfo.push(`Electricity: ${formData.electricityCharges}`);
//         if (formData.securityDeposit) pgInfo.push(`Security Deposit: Rs.${formData.securityDeposit}`);
        
//         // Local Guide
//         if (formData.localGuide) {
//           const lg = formData.localGuide;
//           const locInfo = [];
//           if (lg.nearestMetroStation) locInfo.push(`Metro: ${lg.nearestMetroStation}`);
//           if (lg.nearestBusStop) locInfo.push(`Bus: ${lg.nearestBusStop}`);
//           if (lg.nearbyMarket) locInfo.push(`Market: ${lg.nearbyMarket}`);
//           if (lg.nearbyHospital) locInfo.push(`Hospital: ${lg.nearbyHospital}`);
//           if (lg.otherNotes) locInfo.push(`Notes: ${lg.otherNotes}`);
          
//           if (locInfo.length > 0) {
//             pgInfo.push('');
//             pgInfo.push('Location & Nearby:');
//             pgInfo.push(...locInfo);
//           }
//         }
        
//         if (pgInfo.length > 0) {
//           finalDescription += '\n\n--- PG Details ---\n' + pgInfo.join('\n');
//         }
//       }
      
//       payload.description = finalDescription;
//       payload.address = formData.address || "";
//       payload.city = formData.city || "";
//       payload.country = formData.country || "";
//       payload.postal_code = formData.postalCode || "";

//       // 2. Numbers & Optionals
//       if (formData.price) payload.price = formData.price;
//       if (formData.weekendRate) payload.weekend_rate = formData.weekendRate;
//       if (formData.cleaningFee) payload.cleaning_fee = formData.cleaningFee;
//       if (formData.weeklyDiscountPct) payload.weekly_discount_pct = formData.weeklyDiscountPct;
//       if (formData.monthlyDiscountPct) payload.monthly_discount_pct = formData.monthlyDiscountPct;

//       if (formData.maxGuests) payload.max_guests = formData.maxGuests;
//       if (formData.area) payload.area = formData.area;
//       if (formData.beds) payload.beds = formData.beds;
//       if (formData.latitude) payload.latitude = formData.latitude;
//       if (formData.longitude) payload.longitude = formData.longitude;

//       // 3. Time & Enum fields
//       if (formData.checkInTime) payload.check_in_time = formData.checkInTime;
//       if (formData.checkOutTime) payload.check_out_time = formData.checkOutTime;
//       if (formData.quietHours) payload.quiet_hours = formData.quietHours;

//       if (formData.propertyType) payload.property_type = formData.propertyType;
//       if (formData.propertyCategory) payload.property_category = formData.propertyCategory;
//       if (formData.cancellationPolicy) payload.cancellation_policy = formData.cancellationPolicy;

//       // Handle boolean-likes
//       if (formData.bookingType !== undefined) payload.booking_type = formData.bookingType;
//       payload.smoking_allowed = !!formData.smokingAllowed;
//       payload.pets_allowed = !!formData.petsAllowed;
//       payload.events_allowed = !!formData.eventsAllowed;
//       payload.drinking_alcohol = !!formData.drinkingAllowed;
//       payload.outside_guests_allowed = !!formData.outsideGuestsAllowed;
//       payload.insurance = !!formData.insurance;
//       payload.damage_protection = !!formData.damageProtection;

//       // 4. JSON Fields (Arrays/Objects serialized)
//       payload.bedrooms = JSON.stringify(formData.bedrooms || []);
//       payload.bathrooms = JSON.stringify(formData.bathrooms || []);
//       payload.photos = JSON.stringify(finalAllPhotos);
//       payload.amenities = JSON.stringify(formData.amenities || []);

//       // Guest policy
//       payload.guest_policy = JSON.stringify({
//         family_allowed: Boolean(formData.familyAllowed),
//         unmarried_couple_allowed: Boolean(formData.unmarriedCoupleAllowed),
//         bachelors_allowed: Boolean(formData.bachelorAllowed),
//       });

//       const id = property.id || property._id;
//       console.log("Updating property:", id, payload);

//       await axios.put(`https://townmanor.ai/api/ovika/properties/${id}`, payload, {
//         headers: { 'Content-Type': 'application/json' }
//       });

//       alert("Property updated successfully!");
//       onRefresh();
//       onClose();
//     } catch (e) {
//       console.error("Update Error:", e);
//       const serverMsg = e.response?.data?.error || e.response?.data?.message || e.message;
//       alert("Failed to update: " + serverMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Styles
//   const modalOverlayStyle = {
//     position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
//     display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
//   };
//   const modalContentStyle = {
//     background: '#fff', padding: '24px', borderRadius: '12px', width: '90%', maxWidth: '800px',
//     boxShadow: '0 4px 20px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto'
//   };
//   const inputStyle = {
//     width: '100%', padding: '10px', margin: '4px 0 12px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px'
//   };
//   const labelStyle = { fontSize: '13px', fontWeight: '600', color: '#555' };
//   const sectionTitleStyle = { fontSize: '16px', fontWeight: '700', color: '#333', marginTop: '20px', marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '6px' };
//   const btnGroupStyle = { display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px', position: 'sticky', bottom: '-10px', background: '#fff', padding: '10px 0', borderTop: '1px solid #eee' };
//   const btnStyle = { padding: '10px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: '500' };
//   const dynamicRowStyle = { display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' };
//   const toggleRowStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', padding: '8px', background: '#f9f9f9', borderRadius: '6px' };
//   const toggleLabelStyle = { fontSize: '14px', color: '#333' };
//   const photoGrid = { display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px', marginTop: '5px' };
//   const photoFrame = { position: 'relative', width: '80px', height: '80px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #eee' };
//   const photoImg = { width: '100%', height: '100%', objectFit: 'cover' };
//   const deleteBtn = { position: 'absolute', top: '2px', right: '2px', background: 'rgba(255,0,0,0.8)', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' };

//   // Simple handlers for dynamic lists
//   const handleAddList = (field) => {
//     setFormData(prev => ({ ...prev, [field]: [...(prev[field] || []), isPG && field === 'bedrooms' ? { type: "Double Sharing", count: 1, price: "", washroomType: "Attached" } : { type: "", count: 1 }] }));
//   };
//   const handleRemoveList = (field, idx) => {
//     setFormData(prev => ({ ...prev, [field]: (prev[field] || []).filter((_, i) => i !== idx) }));
//   };
//   const handleListChange = (field, idx, key, val) => {
//     setFormData(prev => {
//       const list = [...(prev[field] || [])];
//       list[idx] = { ...list[idx], [key]: val };
//       return { ...prev, [field]: list };
//     });
//   };

//   const Toggle = ({ checked, onChange }) => (
//     <div style={{ display: 'flex', gap: '4px' }}>
//       <button onClick={() => onChange(false)} style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #ddd', background: !checked ? '#000' : '#fff', color: !checked ? '#fff' : '#000', cursor: 'pointer' }}>No</button>
//       <button onClick={() => onChange(true)} style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #ddd', background: checked ? '#000' : '#fff', color: checked ? '#fff' : '#000', cursor: 'pointer' }}>Yes</button>
//     </div>
//   );

//   // Choose amenities based on property type
//   const AMENITIES_TO_USE = isPG ? PG_AMENITIES : AMENITIES;

//   return (
//     <div style={modalOverlayStyle}>
//       <div style={modalContentStyle}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <h3 style={{ margin: '0', fontSize: '20px' }}>Update {isPG ? 'PG' : 'Property'}</h3>
//           <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>&times;</button>
//         </div>

//         {/* -- BASIC INFO -- */}
//         <h4 style={sectionTitleStyle}>Basic Information</h4>
//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
//           <div>
//             <label style={labelStyle}>{isPG ? 'PG Type' : 'Property Type'}</label>
//             <select name="propertyType" value={formData.propertyType} onChange={handleChange} style={inputStyle}>
//               {isPG ? PG_TYPES.map(p => <option key={p} value={p}>{p}</option>) : PROPERTY_TYPES.map(p => <option key={p} value={p}>{p}</option>)}
//             </select>
//           </div>
//           <div>
//             <label style={labelStyle}>Category</label>
//             <select name="propertyCategory" value={formData.propertyCategory} onChange={handleChange} style={inputStyle}>
//               {DEFAULT_PROPERTY_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
//             </select>
//           </div>
//         </div>

//         <div>
//           <label style={labelStyle}>{isPG ? 'PG Name' : 'Property Name'}</label>
//           <input name="property_name" value={formData.property_name} onChange={handleChange} style={inputStyle} />
//         </div>

//         <div>
//           <label style={labelStyle}>Description</label>
//           <textarea name="description" value={formData.description} onChange={handleChange} rows={3} style={{ ...inputStyle, fontFamily: 'inherit' }} />
//         </div>

//         {/* -- PHOTOS -- */}
//         <h4 style={sectionTitleStyle}>Photos</h4>
//         <div style={{ marginBottom: '16px' }}>
//           <div style={photoGrid}>
//             {photoList.map((url, i) => (
//               <div key={`exist-${i}`} style={photoFrame} title="Existing Photo">
//                 <img src={url} alt="prop" style={photoImg} onError={e => e.target.src = 'https://via.placeholder.com/70?text=Err'} />
//                 <button onClick={() => removePhoto(i)} style={deleteBtn}>&times;</button>
//               </div>
//             ))}
//             {newFiles.map((file, i) => (
//               <div key={`new-${i}`} style={photoFrame} title="New Upload">
//                 <img src={URL.createObjectURL(file)} alt="new" style={photoImg} />
//                 <button onClick={() => removeNewFile(i)} style={deleteBtn}>&times;</button>
//               </div>
//             ))}
//           </div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//             <label htmlFor="modal-file-upload" style={{ ...btnStyle, padding: '8px 16px', background: '#f0f9ff', color: '#0284c7', border: '1px solid #bae6fd', display: 'inline-block', fontSize: '13px' }}>
//               <i className="fa-solid fa-cloud-arrow-up" style={{ marginRight: '6px' }} />
//               Select Photos
//             </label>
//             <input id="modal-file-upload" type="file" multiple accept="image/*" onChange={handleFileSelect} style={{ display: 'none' }} />
//             <span style={{ fontSize: '12px', color: '#666' }}>{newFiles.length} new selected</span>
//           </div>
//         </div>

//         {/* -- LOCATION -- */}
//         <h4 style={sectionTitleStyle}>Location</h4>
//         <div>
//           <label style={labelStyle}>Address</label>
//           <input name="address" value={formData.address} onChange={handleChange} style={inputStyle} />
//         </div>
//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
//           <div>
//             <label style={labelStyle}>City</label>
//             <input name="city" value={formData.city} onChange={handleChange} style={inputStyle} />
//           </div>
//           <div>
//             <label style={labelStyle}>Postal Code</label>
//             <input name="postalCode" value={formData.postalCode} onChange={handleChange} style={inputStyle} />
//           </div>
//         </div>

//         {/* -- CONFIGURATION -- */}
//         <h4 style={sectionTitleStyle}>{isPG ? 'Room Details' : 'Property Details'}</h4>
//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
//           <div>
//             <label style={labelStyle}>Area (sq ft)</label>
//             <input name="area" type="number" value={formData.area} onChange={handleChange} style={inputStyle} />
//           </div>
//           <div>
//             <label style={labelStyle}>{isPG ? 'Total Capacity' : 'Total Beds'}</label>
//             <input name="beds" type="number" min="1" value={formData.beds} onChange={handleChange} style={inputStyle} />
//           </div>
//         </div>

//         {isPG ? (
//           // PG-specific bedroom configuration with prices
//           <>
//             <label style={labelStyle}>Room Sharing Options & Prices</label>
//             <div style={{ border: '1px solid #ddd', padding: '12px', borderRadius: '8px', background: '#fafafa', marginBottom: '12px' }}>
//               {(formData.bedrooms || []).map((bed, idx) => (
//                 <div key={idx} style={{ ...dynamicRowStyle, flexWrap: 'wrap' }}>
//                   <select
//                     value={bed.type || ""}
//                     onChange={(e) => handleListChange('bedrooms', idx, 'type', e.target.value)}
//                     style={{ ...inputStyle, margin: 0, flex: '1 1 140px' }}
//                   >
//                     {SHARING_TYPES.map(opt => (
//                       <option key={opt} value={opt}>{opt}</option>
//                     ))}
//                   </select>
//                   <input
//                     type="number" min="0" placeholder="Price (₹/night)" value={bed.price || ''}
//                     onChange={(e) => handleListChange('bedrooms', idx, 'price', e.target.value)}
//                     style={{ ...inputStyle, margin: 0, flex: '1 1 120px' }}
//                   />
//                   <select
//                     value={bed.washroomType || "Attached"}
//                     onChange={(e) => handleListChange('bedrooms', idx, 'washroomType', e.target.value)}
//                     style={{ ...inputStyle, margin: 0, flex: '1 1 140px' }}
//                   >
//                     <option value="Attached">Attached Washroom</option>
//                     <option value="Common">Common Washroom</option>
//                   </select>
//                   <button onClick={() => handleRemoveList('bedrooms', idx)} style={{ color: '#ef4444', border: '1px solid #ef4444', background: '#fff', borderRadius: '4px', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>&times;</button>
//                 </div>
//               ))}
//               <button onClick={() => handleAddList('bedrooms')} style={{ ...btnStyle, background: '#fff', border: '1px dashed #999', color: '#555', fontSize: '13px', padding: '8px 16px', width: '100%' }}>+ Add Sharing Type</button>
//             </div>
//           </>
//         ) : (
//           // Regular property bedroom configuration
//           <>
//             <label style={labelStyle}>Bedroom Configuration</label>
//             <div style={{ border: '1px solid #ddd', padding: '12px', borderRadius: '8px', background: '#fafafa', marginBottom: '12px' }}>
//               {(formData.bedrooms || []).map((bed, idx) => (
//                 <div key={idx} style={dynamicRowStyle}>
//                   <select
//                     value={bed.type || ""}
//                     onChange={(e) => handleListChange('bedrooms', idx, 'type', e.target.value)}
//                     style={{ ...inputStyle, margin: 0, flex: 2 }}
//                   >
//                     <option value="">Select Bed Type</option>
//                     {["King Bed", "Queen Bed", "Double Bed", "Single Bed", "Bunk Bed", "Sofa Bed"].map(opt => (
//                       <option key={opt} value={opt}>{opt}</option>
//                     ))}
//                   </select>
//                   <input
//                     type="number" min="1" placeholder="Count" value={bed.count || 1}
//                     onChange={(e) => handleListChange('bedrooms', idx, 'count', Number(e.target.value))}
//                     style={{ ...inputStyle, margin: 0, flex: 1 }}
//                   />
//                   <button onClick={() => handleRemoveList('bedrooms', idx)} style={{ color: '#ef4444', border: '1px solid #ef4444', background: '#fff', borderRadius: '4px', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>&times;</button>
//                 </div>
//               ))}
//               <button onClick={() => handleAddList('bedrooms')} style={{ ...btnStyle, background: '#fff', border: '1px dashed #999', color: '#555', fontSize: '13px', padding: '8px 16px', width: '100%' }}>+ Add Bedroom Type</button>
//             </div>
//           </>
//         )}

//         <label style={labelStyle}>Bathroom Configuration</label>
//         <div style={{ border: '1px solid #ddd', padding: '12px', borderRadius: '8px', background: '#fafafa', marginBottom: '12px' }}>
//           {(formData.bathrooms || []).map((bath, idx) => (
//             <div key={idx} style={dynamicRowStyle}>
//               <select
//                 value={bath.type || ""}
//                 onChange={(e) => handleListChange('bathrooms', idx, 'type', e.target.value)}
//                 style={{ ...inputStyle, margin: 0, flex: 2 }}
//               >
//                 <option value="">Select Bath Type</option>
//                 <option value="Attached">Attached</option>
//                 <option value="Common">Common</option>
//                 <option value="En-suite">En-suite</option>
//                 <option value="Jack & Jill">Jack & Jill</option>
//                 <option value="Separate">Separate</option>
//                 <option value="Other">Other</option>
//               </select>
//               <input
//                 type="number" min="1" placeholder="Count" value={bath.count || 1}
//                 onChange={(e) => handleListChange('bathrooms', idx, 'count', Number(e.target.value))}
//                 style={{ ...inputStyle, margin: 0, flex: 1 }}
//               />
//               <button onClick={() => handleRemoveList('bathrooms', idx)} style={{ color: '#ef4444', border: '1px solid #ef4444', background: '#fff', borderRadius: '4px', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>&times;</button>
//             </div>
//           ))}
//           <button onClick={() => handleAddList('bathrooms')} style={{ ...btnStyle, background: '#fff', border: '1px dashed #999', color: '#555', fontSize: '13px', padding: '8px 16px', width: '100%' }}>+ Add Bathroom Type</button>
//         </div>

//         {/* -- AMENITIES -- */}
//         <h4 style={sectionTitleStyle}>Amenities</h4>
//         <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #eee', padding: '10px', borderRadius: '8px' }}>
//           {Object.entries(AMENITIES_TO_USE).map(([group, list]) => (
//             <div key={group} style={{ marginBottom: '12px' }}>
//               <div style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: '#888', marginBottom: '6px' }}>{group.replace(/_/g, ' ')}</div>
//               <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
//                 {list.map(a => (
//                   <label key={a} style={{ display: 'flex', items: 'center', gap: '6px', fontSize: '13px', background: '#f5f5f5', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>
//                     <input type="checkbox" checked={formData.amenities.includes(a)} onChange={() => handleAmenityToggle(a)} />
//                     {a}
//                   </label>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* -- PRICING -- */}
//         <h4 style={sectionTitleStyle}>Pricing & Costs</h4>
//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
//           <div>
//             <label style={labelStyle}>{isPG ? 'Base Rent (₹/night)' : 'Base Price (₹/night)'}</label>
//             <input name="price" type="number" value={formData.price} onChange={handleChange} style={inputStyle} />
//           </div>
//           {!isPG && (
//             <div>
//               <label style={labelStyle}>Weekend Rate</label>
//               <input name="weekendRate" type="number" value={formData.weekendRate} onChange={handleChange} style={inputStyle} />
//             </div>
//           )}
//         </div>
//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
//           <div>
//             <label style={labelStyle}>{isPG ? 'Maintenance Fee' : 'Cleaning Fee'}</label>
//             <input name="cleaningFee" type="number" value={formData.cleaningFee} onChange={handleChange} style={inputStyle} />
//           </div>
//           {isPG && (
//             <div>
//               <label style={labelStyle}>Security Deposit</label>
//               <input name="securityDeposit" type="number" value={formData.securityDeposit} onChange={(e) => setFormData(f => ({ ...f, securityDeposit: e.target.value }))} style={inputStyle} />
//             </div>
//           )}
//           {!isPG && (
//             <>
//               <div>
//                 <label style={labelStyle}>Weekly Disc (%)</label>
//                 <input name="weeklyDiscountPct" type="number" value={formData.weeklyDiscountPct} onChange={handleChange} style={inputStyle} />
//               </div>
//               <div>
//                 <label style={labelStyle}>Monthly Disc (%)</label>
//                 <input name="monthlyDiscountPct" type="number" value={formData.monthlyDiscountPct} onChange={handleChange} style={inputStyle} />
//               </div>
//             </>
//           )}
//         </div>

//         {/* -- RULES & POLICIES -- */}
//         <h4 style={sectionTitleStyle}>Rules & Policies</h4>
//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
//           {/* Column 1 */}
//           <div>
//             <div style={toggleRowStyle}>
//               <span style={toggleLabelStyle}>Max Guests</span>
//               <input name="maxGuests" type="number" value={formData.maxGuests} onChange={handleChange} style={{ width: '60px', padding: '4px' }} />
//             </div>
//             {isPG && (
//               <>
//                 <div style={toggleRowStyle}>
//                   <span style={toggleLabelStyle}>Gate Closing Time</span>
//                   <input name="gateClosingTime" type="time" value={formData.gateClosingTime} onChange={handleChange} style={{ padding: '4px' }} />
//                 </div>
//                 <div style={{ marginBottom: '8px' }}>
//                   <label style={labelStyle}>Notice Period (Days)</label>
//                   <input name="noticePeriod" type="number" value={formData.noticePeriod} onChange={handleChange} style={inputStyle} />
//                 </div>
//                 <div style={{ marginBottom: '8px' }}>
//                   <label style={labelStyle}>Lock-in Period (Months)</label>
//                   <input name="lockInPeriod" type="number" value={formData.lockInPeriod} onChange={handleChange} style={inputStyle} />
//                 </div>
//               </>
//             )}
//             {!isPG && (
//               <>
//                 <div style={toggleRowStyle}>
//                   <span style={toggleLabelStyle}>Check-In Time</span>
//                   <input name="checkInTime" type="time" value={formData.checkInTime} onChange={handleChange} style={{ padding: '4px' }} />
//                 </div>
//                 <div style={toggleRowStyle}>
//                   <span style={toggleLabelStyle}>Check-Out Time</span>
//                   <input name="checkOutTime" type="time" value={formData.checkOutTime} onChange={handleChange} style={{ padding: '4px' }} />
//                 </div>
//               </>
//             )}
//             <div style={{ marginBottom: '8px' }}>
//               <label style={labelStyle}>Cancellation Policy</label>
//               <select name="cancellationPolicy" value={formData.cancellationPolicy} onChange={handleChange} style={inputStyle}>
//                 {DEFAULT_CANCELLATION_POLICIES.map(p => <option key={p} value={p}>{p}</option>)}
//               </select>
//             </div>
//             <div style={{ marginBottom: '8px' }}>
//               <label style={labelStyle}>Booking Type</label>
//               <select name="bookingType" value={formData.bookingType} onChange={handleChange} style={inputStyle}>
//                 <option value={0}>Instant Booking</option>
//                 <option value={1}>Approval Required</option>
//               </select>
//             </div>
//           </div>

//           {/* Column 2: Toggles */}
//           <div>
//             <div style={toggleRowStyle}>
//               <span style={toggleLabelStyle}>Smoking Allowed</span>
//               <Toggle checked={formData.smokingAllowed} onChange={(v) => setFormData(f => ({ ...f, smokingAllowed: v }))} />
//             </div>
//             <div style={toggleRowStyle}>
//               <span style={toggleLabelStyle}>Pets Allowed</span>
//               <Toggle checked={formData.petsAllowed} onChange={(v) => setFormData(f => ({ ...f, petsAllowed: v }))} />
//             </div>
//             {!isPG && (
//               <div style={toggleRowStyle}>
//                 <span style={toggleLabelStyle}>Events Allowed</span>
//                 <Toggle checked={formData.eventsAllowed} onChange={(v) => setFormData(f => ({ ...f, eventsAllowed: v }))} />
//               </div>
//             )}
//             <div style={toggleRowStyle}>
//               <span style={toggleLabelStyle}>Drinking Allowed</span>
//               <Toggle checked={formData.drinkingAllowed} onChange={(v) => setFormData(f => ({ ...f, drinkingAllowed: v }))} />
//             </div>
//             <div style={toggleRowStyle}>
//               <span style={toggleLabelStyle}>Outside Guests</span>
//               <Toggle checked={formData.outsideGuestsAllowed} onChange={(v) => setFormData(f => ({ ...f, outsideGuestsAllowed: v }))} />
//             </div>
//             {isPG && (
//               <div style={toggleRowStyle}>
//                 <span style={toggleLabelStyle}>Food Available</span>
//                 <Toggle checked={formData.foodAvailable} onChange={(v) => setFormData(f => ({ ...f, foodAvailable: v }))} />
//               </div>
//             )}
//             <div style={toggleRowStyle}>
//               <span style={toggleLabelStyle}>Family Allowed</span>
//               <Toggle checked={formData.familyAllowed} onChange={(v) => setFormData(f => ({ ...f, familyAllowed: v }))} />
//             </div>
//             <div style={toggleRowStyle}>
//               <span style={toggleLabelStyle}>Unmarried Couples</span>
//               <Toggle checked={formData.unmarriedCoupleAllowed} onChange={(v) => setFormData(f => ({ ...f, unmarriedCoupleAllowed: v }))} />
//             </div>
//             <div style={toggleRowStyle}>
//               <span style={toggleLabelStyle}>Bachelors Allowed</span>
//               <Toggle checked={formData.bachelorAllowed} onChange={(v) => setFormData(f => ({ ...f, bachelorAllowed: v }))} />
//             </div>
//           </div>
//         </div>

//         {isPG && (
//           <div style={{ marginTop: '12px' }}>
//             <label style={labelStyle}>Electricity Charges</label>
//             <select name="electricityCharges" value={formData.electricityCharges} onChange={handleChange} style={inputStyle}>
//               <option value="Included in Rent">Included in Rent</option>
//               <option value="Separate (As per Meter)">Separate (As per Meter)</option>
//               <option value="Fixed Amount">Fixed Amount</option>
//             </select>
//           </div>
//         )}

//         {/* -- LOCAL GUIDE (PG only) -- */}
//         {isPG && (
//           <>
//             <h4 style={sectionTitleStyle}>Local Guide / Neighborhood</h4>
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
//               <div>
//                 <label style={labelStyle}>Nearest Metro Station</label>
//                 <input 
//                   value={formData.localGuide.nearestMetroStation} 
//                   onChange={(e) => setFormData(f => ({ ...f, localGuide: { ...f.localGuide, nearestMetroStation: e.target.value } }))} 
//                   style={inputStyle} 
//                   placeholder="e.g. MG Road Metro" 
//                 />
//               </div>
//               <div>
//                 <label style={labelStyle}>Nearest Bus Stop</label>
//                 <input 
//                   value={formData.localGuide.nearestBusStop} 
//                   onChange={(e) => setFormData(f => ({ ...f, localGuide: { ...f.localGuide, nearestBusStop: e.target.value } }))} 
//                   style={inputStyle} 
//                   placeholder="e.g. Sector 18 Bus Stand" 
//                 />
//               </div>
//               <div>
//                 <label style={labelStyle}>Nearby Market / Grocery</label>
//                 <input 
//                   value={formData.localGuide.nearbyMarket} 
//                   onChange={(e) => setFormData(f => ({ ...f, localGuide: { ...f.localGuide, nearbyMarket: e.target.value } }))} 
//                   style={inputStyle} 
//                   placeholder="e.g. Super Mart, Local Vegetable Market" 
//                 />
//               </div>
//               <div>
//                 <label style={labelStyle}>Nearby Hospital / Pharmacy</label>
//                 <input 
//                   value={formData.localGuide.nearbyHospital} 
//                   onChange={(e) => setFormData(f => ({ ...f, localGuide: { ...f.localGuide, nearbyHospital: e.target.value } }))} 
//                   style={inputStyle} 
//                   placeholder="e.g. City Hospital" 
//                 />
//               </div>
//               <div className="full">
//                 <label style={labelStyle}>Other Landmarks / Notes</label>
//                 <textarea 
//                   value={formData.localGuide.otherNotes} 
//                   onChange={(e) => setFormData(f => ({ ...f, localGuide: { ...f.localGuide, otherNotes: e.target.value } }))} 
//                   style={{ ...inputStyle, fontFamily: 'inherit' }} 
//                   placeholder="Any other important landmarks nearby..." 
//                   rows={3} 
//                 />
//               </div>
//             </div>
//           </>
//         )}

//         <div style={btnGroupStyle}>
//           <button onClick={onClose} style={{ ...btnStyle, background: '#f5f5f5', color: '#333' }}>Cancel</button>
//           <button onClick={handleSave} disabled={loading} style={{ ...btnStyle, background: '#c98b3e', color: '#fff' }}>
//             {loading ? 'Saving...' : 'Save Changes'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function PropertyCard({ photoUrl, name, location, priceText, details, onEdit, onDelete, onView }) {
//   return (
//     <div className={styles.propertyCard}>
//       <img
//         src={photoUrl}
//         alt={name}
//         className={styles.propertyImage}
//         onClick={onView}
//         style={{ cursor: "pointer" }}
//       />
//       <div className={styles.propertyMeta}>
//         <div className={styles.propertyTitle}>{name}</div>
//         <div className={styles.propertySubtitle}>{location}</div>
//         {details && <div className={styles.propertyDetails}>{details}</div>}
//         {priceText && <div className={styles.propertyPrice}>{priceText}</div>}
//         <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
//           <button
//             onClick={onEdit}
//             style={{
//               border: '1px solid #ddd', background: '#fff', padding: '6px 12px', borderRadius: '6px',
//               cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px'
//             }}
//           >
//             <i className="fa-solid fa-pen" /> Update
//           </button>
//           <button
//             onClick={onDelete}
//             style={{
//               border: '1px solid #fdd', background: '#fff5f5', color: '#d32f2f', padding: '6px 12px',
//               borderRadius: '6px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px'
//             }}
//           >
//             <i className="fa-solid fa-trash" /> Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // robust id extractor
// const extractIdFromObj = (obj) => {
//   if (!obj || typeof obj !== "object") return null;
//   if (obj.owner_id) return obj.owner_id;
//   if (obj.ownerId) return obj.ownerId;
//   if (obj.id) return obj.id;
//   if (obj._id) return obj._id;
//   if (obj.userId) return obj.userId;
//   if (obj.uid) return obj.uid;
//   if (obj.user && typeof obj.user === "object") return extractIdFromObj(obj.user);
//   if (obj.data && typeof obj.data === "object") return extractIdFromObj(obj.data);
//   return null;
// };

// const getPropertyPhoto = (prop) => {
//   if (!prop) return "/public/image 68.png";
//   if (Array.isArray(prop.photos) && prop.photos.length > 0) {
//     if (typeof prop.cover_photo_index === "number" && prop.photos[prop.cover_photo_index]) {
//       return prop.photos[prop.cover_photo_index];
//     }
//     return prop.photos[0];
//   }
//   if (typeof prop.photos === "string" && prop.photos.trim()) {
//     const parts = prop.photos.split(",").map((p) => p.trim()).filter(Boolean);
//     if (parts.length) return parts[0];
//   }
//   return "/public/image 68.png";
// };

// const getRoomCount = (val) => {
//   if (val === undefined || val === null) return 0;
//   if (typeof val === 'number') return val;
//   let parsed = val;
//   if (typeof val === 'string') {
//     if (!isNaN(val) && !val.trim().startsWith('[')) {
//       return Number(val);
//     }
//     try {
//       parsed = JSON.parse(val);
//     } catch (e) {
//       return parseFloat(val) || 0;
//     }
//   }
//   if (typeof parsed === 'number') return parsed;
//   if (Array.isArray(parsed)) {
//     return parsed.reduce((acc, item) => {
//       const c = Number(item.count);
//       return acc + (isNaN(c) ? 1 : c);
//     }, 0);
//   }
//   return 0;
// };

// export default function DashBoardAdmin() {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const STORAGE_KEY = "user";
//   const [ownerId, setOwnerId] = useState(null);
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [editingProperty, setEditingProperty] = useState(null);

//   const resolveOwnerIdFromSources = useCallback(() => {
//     const idFromContext = extractIdFromObj(user);
//     if (idFromContext) return String(idFromContext);
//     try {
//       const raw = localStorage.getItem(STORAGE_KEY);
//       if (!raw) return null;
//       const parsed = JSON.parse(raw);
//       const id = extractIdFromObj(parsed);
//       if (id) return String(id);
//     } catch (e) {}
//     return null;
//   }, [user]);

//   const fetchFilteredProperties = useCallback(async (resolvedOwnerId) => {
//     if (!resolvedOwnerId) {
//       setProperties([]);
//       setLoading(false);
//       return;
//     }
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await axios.get("https://townmanor.ai/api/ovika/properties", { timeout: 10000 });
//       let all = [];

//       if (!res || !res.data) {
//         all = [];
//       } else if (Array.isArray(res.data)) {
//         all = res.data;
//       } else if (Array.isArray(res.data.data)) {
//         all = res.data.data;
//       } else if (Array.isArray(res.data.results)) {
//         all = res.data.results;
//       } else {
//         const arr = Object.values(res.data).find((v) => Array.isArray(v));
//         if (arr) all = arr;
//       }

//       const filtered = all.filter((p) => {
//         if (!p || typeof p !== "object") return false;
//         const candidates = [
//           p.owner_id,
//           p.ownerId,
//           p.user_id,
//           p.userId,
//           (p.meta && (p.meta.ownerId || p.meta.owner_id)),
//           p.owner,
//         ].filter(Boolean);
//         return candidates.some((c) => String(c) === String(resolvedOwnerId));
//       });

//       setProperties(filtered);
//     } catch (err) {
//       console.error("DashBoardAdmin: Failed to load properties:", err);
//       setError("Failed to load properties (see console).");
//       setProperties([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     let mounted = true;
//     let pollHandle = null;
//     let attempts = 0;
//     const maxAttempts = 6;
    
//     const tryResolveNow = () => {
//       const id = resolveOwnerIdFromSources();
//       if (!mounted) return;
//       if (id) {
//         setOwnerId(id);
//         fetchFilteredProperties(id);
//         return;
//       }
//       pollHandle = setInterval(() => {
//         attempts += 1;
//         const id2 = resolveOwnerIdFromSources();
//         if (id2) {
//           clearInterval(pollHandle);
//           if (!mounted) return;
//           setOwnerId(id2);
//           fetchFilteredProperties(id2);
//           return;
//         }
//         if (attempts >= maxAttempts) {
//           clearInterval(pollHandle);
//           if (!mounted) return;
//           setOwnerId(null);
//           setProperties([]);
//           setLoading(false);
//         }
//       }, 400);
//     };

//     tryResolveNow();

//     return () => {
//       mounted = false;
//       if (pollHandle) clearInterval(pollHandle);
//     };
//   }, [resolveOwnerIdFromSources, fetchFilteredProperties]);

//   useEffect(() => {
//     const onStorage = (e) => {
//       if (e.key !== STORAGE_KEY) return;
//       if (!e.newValue) {
//         setOwnerId(null);
//         setProperties([]);
//         setLoading(false);
//         return;
//       }

//       try {
//         const parsed = JSON.parse(e.newValue);
//         const id = extractIdFromObj(parsed);
//         if (id) {
//           const sid = String(id);
//           setOwnerId(sid);
//           fetchFilteredProperties(sid);
//         } else {
//           setOwnerId(null);
//           setProperties([]);
//         }
//       } catch (err) {
//         setOwnerId(null);
//         setProperties([]);
//       }
//     };
//     window.addEventListener("storage", onStorage);
//     return () => window.removeEventListener("storage", onStorage);
//   }, [fetchFilteredProperties]);

//   useEffect(() => {
//     const onPropertyCreated = (e) => {
//       const created = e?.detail;
//       if (!created) return;
//       const pOwner = created.owner_id || created.ownerId || (created.meta && (created.meta.ownerId || created.meta.owner_id));
//       const resolved = resolveOwnerIdFromSources();
//       if (!resolved) {
//         const id = resolveOwnerIdFromSources();
//         if (id) {
//           setOwnerId(id);
//           fetchFilteredProperties(id);
//         }
//         return;
//       }
//       if (String(pOwner) === String(resolved)) {
//         setProperties((prev) => [created, ...prev]);
//       }
//     };
//     window.addEventListener("propertyCreated", onPropertyCreated);
//     return () => window.removeEventListener("propertyCreated", onPropertyCreated);
//   }, [fetchFilteredProperties, resolveOwnerIdFromSources]);

//   useEffect(() => {
//     const id = resolveOwnerIdFromSources();
//     if (!id) {
//       setOwnerId(null);
//       setProperties([]);
//       setLoading(false);
//       return;
//     }
//     if (id && id !== ownerId) {
//       setOwnerId(id);
//       fetchFilteredProperties(id);
//     }
//   }, [user, resolveOwnerIdFromSources, fetchFilteredProperties]);

//   const refresh = async () => {
//     const id = resolveOwnerIdFromSources();
//     setOwnerId(id);
//     await fetchFilteredProperties(id);
//   };

//   if (!ownerId) {
//     return (
//       <div className={styles.page}>
//         <main className={styles.grid}>
//           <section>
//             <h3 className={styles.sectionTitle}>My Properties</h3>
//             <p>We couldn't detect your account yet. If you just signed up, you won't see any properties until you publish your first listing.</p>
//             <p style={{ marginTop: 8 }}>If you have already created a listing, click Retry to detect your account and refresh.</p>
//             <div style={{ marginTop: 12 }}>
//               <button className={styles.iconBtn} onClick={refresh}>Retry detect account</button>
//             </div>
//           </section>
//         </main>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className={styles.page}>
//         <div className={styles.topbar}></div>
//         <section style={{ marginTop: "-3px" }} className={styles.hero}>
//           <img className={styles.heroBg} src="/Group 89.png" alt="hero background" />
//           <div className={styles.heroOverlay} />
//           <div className={styles.heroContent}>
//             <h1>Owner Dashboard</h1>
//             <p>Manage your properties and track your listings</p>
//           </div>
//         </section>
//         <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh", flexDirection: "column", gap: "12px" }}>
//           <Loader size={40} style={{ animation: "spin 1s linear infinite", color: "#3b82f6" }} />
//           <p style={{ fontSize: "16px", color: "#6b7280", fontWeight: 500 }}>Loading properties…</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.page}>
//       <div className={styles.topbar}></div>
//       <section style={{ marginTop: "-3px" }} className={styles.hero}>
//         <img className={styles.heroBg} src="/Group 89.png" alt="hero background" />
//         <div className={styles.heroOverlay} />
//         <div className={styles.heroContent}>
//           <h1>Owner Dashboard</h1>
//           <p>Manage your properties and track your listings</p>
//         </div>
//       </section>

//       <main className={styles.grid}>
//         <section>
//           <h3 className={styles.sectionTitle}>My Properties</h3>

//           {error && <p style={{ color: "red" }}>{error}</p>}

//           {properties.length === 0 ? (
//             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', padding: '40px 20px', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
//               <div style={{ background: '#fff', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', maxWidth: '500px', textAlign: 'center' }}>
//                 <div style={{ background: '#c2772b', width: '100px', height: '100px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
//                   <Home size={50} style={{ color: '#fff' }} />
//                 </div>
//                 <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', marginBottom: '16px' }}>No Properties Listed Yet</h2>
//                 <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: '1.6', marginBottom: '24px' }}>
//                   Start your journey by listing your first property. Create a compelling listing to attract guests and maximize your rental income.
//                 </p>
//                 <button
//                   onClick={() => navigate('/listed1')}
//                   style={{
//                     background: '#c2772b',
//                     color: '#fff',
//                     padding: '14px 32px',
//                     borderRadius: '10px',
//                     border: 'none',
//                     fontSize: '16px',
//                     fontWeight: '600',
//                     cursor: 'pointer',
//                     display: 'inline-flex',
//                     alignItems: 'center',
//                     gap: '10px',
//                     boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
//                     transition: 'all 0.3s ease'
//                   }}
//                   onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
//                   onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
//                 >
//                   <Plus size={20} />
//                   List Your Property
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className={styles.properties}>
//               {properties.map((prop) => {
//                 const name = prop.property_name || prop.name || "Untitled Property";
//                 const locationParts = [prop.city, prop.country].filter(Boolean);
//                 const location = locationParts.join(", ") || "Location not specified";

//                 const detailsPieces = [];
//                 if (prop.property_type) detailsPieces.push(prop.property_type);
//                 const bedroomCount = prop.total_bedrooms || getRoomCount(prop.bedrooms);
//                 if (bedroomCount > 0) detailsPieces.push(`${bedroomCount} BR`);

//                 const bathroomCount = prop.total_bathrooms || getRoomCount(prop.bathrooms);
//                 if (bathroomCount > 0) detailsPieces.push(`${bathroomCount} BA`);
//                 if (prop.max_guests !== undefined && prop.max_guests !== null) detailsPieces.push(`Up to ${prop.max_guests} guests`);
//                 const details = detailsPieces.join(" • ");

//                 const priceText = prop.price ? `₹${Number(prop.price).toLocaleString("en-IN")} / night` : "";
//                 const photoUrl = getPropertyPhoto(prop);

//                 return (
//                   <PropertyCard
//                     key={prop.id || prop._id || Math.random()}
//                     photoUrl={photoUrl}
//                     name={name}
//                     location={location}
//                     details={details}
//                     priceText={priceText}
//                     onView={() => navigate(`/property/${prop.id || prop._id}`)}
//                     onEdit={() => setEditingProperty(prop)}
//                     onDelete={async () => {
//                       if (!window.confirm("Are you sure you want to delete this property?")) return;
//                       try {
//                         const id = prop.id || prop._id;
//                         await axios.delete(`https://townmanor.ai/api/ovika/properties/${id}`);
//                         setProperties(prev => prev.filter(p => (p.id || p._id) !== id));
//                       } catch (e) {
//                         alert("Failed to delete property");
//                         console.error(e);
//                       }
//                     }}
//                   />
//                 );
//               })}
//             </div>
//           )}
//         </section>

//         {editingProperty && (
//           <EditPropertyModal
//             property={editingProperty}
//             onClose={() => setEditingProperty(null)}
//             onRefresh={refresh}
//           />
//         )}
//       </main>
//     </div>
//   );
// }

import React, { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { AuthContext } from "../../Login/AuthContext";
import { Home, Plus, Loader } from "lucide-react";

function KeyItem({ text, filetype = "pdf" }) {
  const isXlsx = filetype === "xlsx";
  return (
    <div className={styles.keyItem}>
      <span className={`${styles.keyDot} ${isXlsx ? styles.xlsx : styles.pdf}`} />
      <span className={styles.keyText}>{text}</span>
      <div className={styles.keyActions}>
        <button title="View" className={styles.iconBtn} aria-label="view"><i className="fa-regular fa-eye" /></button>
        <button title="Download" className={styles.iconBtn} aria-label="download"><i className="fa-solid fa-download" /></button>
      </div>
    </div>
  );
}

function MessageItem({ initials, name, note }) {
  return (
    <div className={styles.msgItem}>
      <div className={styles.avatar}>{initials}</div>
      <div>
        <div className={styles.msgName}>{name}</div>
        <div className={styles.msgNote}>{note}</div>
      </div>
    </div>
  );
}

function TicketRow({ title, status }) {
  const statusClass = status.toLowerCase() === "resolved" ? styles.resolved : styles.open;
  return (
    <div className={styles.ticketRow}>
      <span className={styles.ticketTitle}>{title}</span>
      <span className={`${styles.chip} ${statusClass}`}>{status}</span>
    </div>
  );
}

const AMENITIES = {
  Basic: ["Wi-Fi", "Heating", "Air conditioning", "Hot water"],
  Kitchen: ["Refrigerator", "Stovetop/oven", "Microwave", "Cooking utensils"],
  Entertainment: ["TV", "Streaming services"],
  Safety: ["Smoke detector", "Carbon monoxide detector", "Fire extinguisher", "First aid kit"],
  Outdoor: ["Balcony/terrace", "Garden", "Parking space", "BBQ grill", "Tennis Court", "Golf Course"],
  Wellness: ["Pool", "Hot tub", "Sauna", "Gym"],
  Accessibility: ["Wheelchair accessible", "Elevator", "Ramp access"],
  Services: ["Breakfast Included", "Lunch Included", "Dinner Included", "All Meals Included", "Airport pick-up", "Luggage storage", "Cleaning on request"],
};

const PG_AMENITIES = {
  Essentials: ["Wi-Fi", "Power Backup", "Water Supply", "Housekeeping", "Laundry Service"],
  Room_Features: ["Attached Bathroom", "Balcony", "Air Conditioner", "Geyser", "Study Table", "Cupboard", "TV"],
  Food_Kitchen: ["Breakfast", "Lunch", "Dinner", "Tea/Coffee", "Self-cooking Kitchen", "Refrigerator", "Microwave", "RO Water Purifier"],
  Security: ["CCTV", "Biometric Entry", "Security Guard", "Warden"],
  Common_Areas: ["Common Room", "Dining Area", "Gym", "Gaming Zone", "Terrace", "Lift", "Parking"],
};

const DEFAULT_CANCELLATION_POLICIES = ["Flexible", "Moderate", "Strict"];
const DEFAULT_PROPERTY_CATEGORIES = ["Apartment", "House", "Villa", "Cabin", "Bungalow", "Studio", "Suite", "PG", "Other"];
const PROPERTY_TYPES = ["Entire place", "Private room"];
const PG_TYPES = ["Boys PG", "Girls PG", "Co-ed PG"];
const SHARING_TYPES = ["Single Room", "Double Sharing", "Triple Sharing", "Four Sharing", "Dormitory"];

function EditPropertyModal({ property, onClose, onRefresh }) {
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState("");

  const isPG = property.property_category === "PG" ||
    (typeof property.meta === 'string' ? JSON.parse(property.meta || '{}') : property.meta)?.propertyCategory === "PG";

  const getMeta = (key, fallback = "") => {
    if (!property) return fallback;
    if (property[key] !== undefined && property[key] !== null) return property[key];
    let m = property.meta;
    if (typeof m === 'string') {
      try { m = JSON.parse(m); } catch (e) { m = {}; }
    }
    if (['familyAllowed', 'unmarriedCoupleAllowed', 'bachelorAllowed'].includes(key)) {
      let gp = property.guest_policy;
      if (typeof gp === 'string') { try { gp = JSON.parse(gp); } catch (e) { } }
      if (key === 'familyAllowed') return gp?.family_allowed ?? m?.familyAllowed ?? fallback;
      if (key === 'unmarriedCoupleAllowed') return gp?.unmarried_couple_allowed ?? m?.unmarriedCoupleAllowed ?? fallback;
      if (key === 'bachelorAllowed') return gp?.bachelors_allowed ?? m?.bachelorAllowed ?? fallback;
    }
    return m?.[key] ?? fallback;
  };

  const parseJson = (val, fallback = []) => {
    if (!val) return fallback;
    if (Array.isArray(val)) return val;
    if (typeof val === 'string') {
      try { return JSON.parse(val) || fallback; } catch (e) { return fallback; }
    }
    return fallback;
  };

  const getInitialPhotos = () => {
    let p = property.photos;
    if (typeof p === 'string') {
      p = p.trim();
      if (p.startsWith('[') && p.endsWith(']')) {
        try { return JSON.parse(p); } catch (e) { }
      }
      return p.split(',').map(s => s.trim()).filter(Boolean);
    }
    if (Array.isArray(p)) return p;
    return [];
  };

  const getInitialAmenities = () => {
    let am = getMeta('amenities');
    if (Array.isArray(am)) return am;
    if (typeof am === 'string') {
      try { return JSON.parse(am); } catch (e) { return []; }
    }
    return [];
  };

  const getInitialBedroomDetails = () => {
    const bedrooms = parseJson(property.bedrooms || getMeta('bedrooms'), []);
    if (isPG && bedrooms.length > 0 && bedrooms[0].price !== undefined) {
      return bedrooms.map((bed, idx) => ({
        id: idx, type: bed.type || "Double Sharing",
        count: bed.count || 1, price: bed.price || "", washroomType: bed.washroomType || "Attached"
      }));
    }
    return bedrooms.length > 0 ? bedrooms : [{ type: "King Bed", count: 1 }];
  };

  const [photoList, setPhotoList] = useState(getInitialPhotos());
  const [newFiles, setNewFiles] = useState([]);

  const [formData, setFormData] = useState({
    property_name: property.property_name || property.name || "",
    description: property.description || "",
    // ✅ FIX 1: price always as string for input, never undefined
    price: (property.price !== undefined && property.price !== null && property.price !== "") 
      ? String(property.price) 
      : "",

    propertyType: isPG ? (getMeta('propertyType') || PG_TYPES[0]) : (property.property_type || getMeta('propertyType') || PROPERTY_TYPES[0]),
    propertyCategory: getMeta('propertyCategory') || (isPG ? "PG" : DEFAULT_PROPERTY_CATEGORIES[0]),
    address: property.address || "",
    city: property.city || "",
    country: property.country || getMeta('country') || "India",
    postalCode: property.postal_code || property.zip_code || getMeta('postalCode') || "",
    latitude: property.latitude || getMeta('latitude') || "",
    longitude: property.longitude || getMeta('longitude') || "",
    area: property.area || getMeta('area') || "",
    beds: property.beds || getMeta('beds') || "",
    maxGuests: property.max_guests || getMeta('maxGuests', 1),
    bedrooms: getInitialBedroomDetails(),
    bathrooms: parseJson(property.bathrooms || getMeta('bathrooms'), [{ type: "Attached", count: 1 }]),
    weekendRate: property.weekend_rate || getMeta('weekendRate') || "",
    cleaningFee: property.cleaning_fee || getMeta('cleaningFee') || "",
    weeklyDiscountPct: property.weekly_discount_pct || getMeta('weeklyDiscountPct') || "",
    monthlyDiscountPct: property.monthly_discount_pct || getMeta('monthlyDiscountPct') || "",
    checkInTime: property.check_in_time || getMeta('checkInTime') || "",
    checkOutTime: property.check_out_time || getMeta('checkOutTime') || "",
    quietHours: property.quiet_hours || getMeta('quietHours', isPG ? "23:00-06:00" : "22:00-07:00"),
    smokingAllowed: property.smoking_allowed ? true : getMeta('smokingAllowed', false),
    petsAllowed: property.pets_allowed ? true : getMeta('petsAllowed', false),
    eventsAllowed: property.events_allowed ? true : getMeta('eventsAllowed', false),
    drinkingAllowed: property.drinking_alcohol ? true : getMeta('drinkingAllowed', false),
    outsideGuestsAllowed: property.outside_guests_allowed ? true : getMeta('outsideGuestsAllowed', false),
    familyAllowed: getMeta('familyAllowed', false),
    unmarriedCoupleAllowed: getMeta('unmarriedCoupleAllowed', false),
    bachelorAllowed: getMeta('bachelorAllowed', isPG ? true : false),
    selfCheckIn: getMeta('selfCheckIn', ""),
    bookingType: property.booking_type !== undefined ? property.booking_type : getMeta('bookingType', 0),
    cancellationPolicy: property.cancellation_policy || getMeta('cancellationPolicy', DEFAULT_CANCELLATION_POLICIES[0]),
    insurance: property.insurance ? true : getMeta('insurance', false),
    damageProtection: property.damage_protection ? true : getMeta('damageProtection', false),
    gateClosingTime: getMeta('gateClosingTime', ""),
    noticePeriod: getMeta('noticePeriod', 30),
    lockInPeriod: getMeta('lockInPeriod', 1),
    foodAvailable: getMeta('foodAvailable', false),
    electricityCharges: getMeta('electricityCharges', "Included in Rent"),
    perNightPrice: getMeta('perNightPrice', ""),
    securityDeposit: getMeta('securityDeposit', ""),
    localGuide: {
      nearestMetroStation: getMeta('localGuide')?.nearestMetroStation || "",
      nearestBusStop: getMeta('localGuide')?.nearestBusStop || "",
      nearbyMarket: getMeta('localGuide')?.nearbyMarket || "",
      nearbyHospital: getMeta('localGuide')?.nearbyHospital || "",
      nearbyShowroom: getMeta('localGuide')?.nearbyShowroom || "",
      otherNotes: getMeta('localGuide')?.otherNotes || ""
    },
    amenities: getInitialAmenities(),
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleAmenityToggle = (amenity) => {
    setFormData(prev => {
      const current = prev.amenities || [];
      return current.includes(amenity)
        ? { ...prev, amenities: current.filter(a => a !== amenity) }
        : { ...prev, amenities: [...current, amenity] };
    });
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const images = Array.from(e.target.files).filter(f => f.type.startsWith('image/'));
      setNewFiles(prev => [...prev, ...images]);
    }
  };

  const removePhoto = (index) => setPhotoList(prev => prev.filter((_, i) => i !== index));
  const removeNewFile = (index) => setNewFiles(prev => prev.filter((_, i) => i !== index));

  const handleSave = async () => {
    setLoading(true);
    setDebugInfo("");

    // ✅ FIX 2: Get property ID correctly
    const propertyId = property.id || property._id;
    if (!propertyId) {
      alert("Error: Property ID not found! Cannot update.");
      setLoading(false);
      return;
    }

    try {
      // Upload new photos first
      let uploadedUrls = [];
      if (newFiles.length > 0) {
        const uploadPromises = newFiles.map(async (file) => {
          const fd = new FormData();
          fd.append('images', file);
          const res = await fetch('https://www.townmanor.ai/api/image/aws-upload-owner-images', {
            method: 'POST', body: fd,
          });
          const data = await res.json();
          return (data.fileUrls && data.fileUrls[0]) ? data.fileUrls[0] : null;
        });
        const results = await Promise.all(uploadPromises);
        uploadedUrls = results.filter(Boolean);
      }

      const finalAllPhotos = [...photoList, ...uploadedUrls];

      // Build description
      let finalDescription = formData.description || "";
      if (isPG) {
        const pgInfo = [];
        if (formData.gateClosingTime) pgInfo.push(`Gate Closing Time: ${formData.gateClosingTime}`);
        if (formData.noticePeriod) pgInfo.push(`Notice Period: ${formData.noticePeriod} days`);
        if (formData.lockInPeriod) pgInfo.push(`Lock-in Period: ${formData.lockInPeriod} months`);
        if (formData.foodAvailable) pgInfo.push(`Food: Available`);
        if (formData.electricityCharges) pgInfo.push(`Electricity: ${formData.electricityCharges}`);
        if (formData.securityDeposit) pgInfo.push(`Security Deposit: Rs.${formData.securityDeposit}`);
        if (formData.localGuide) {
          const lg = formData.localGuide;
          const locInfo = [];
          if (lg.nearestMetroStation) locInfo.push(`Metro: ${lg.nearestMetroStation}`);
          if (lg.nearestBusStop) locInfo.push(`Bus: ${lg.nearestBusStop}`);
          if (lg.nearbyMarket) locInfo.push(`Market: ${lg.nearbyMarket}`);
          if (lg.nearbyHospital) locInfo.push(`Hospital: ${lg.nearbyHospital}`);
          if (lg.otherNotes) locInfo.push(`Notes: ${lg.otherNotes}`);
          if (locInfo.length > 0) { pgInfo.push(''); pgInfo.push('Location & Nearby:'); pgInfo.push(...locInfo); }
        }
        if (pgInfo.length > 0) finalDescription += '\n\n--- PG Details ---\n' + pgInfo.join('\n');
      }

      // ✅ FIX 3: Build payload - price HAMESHA include karo, if/condition nahi
      const payload = {
        // Basic info
        property_name: formData.property_name || "",
        description: finalDescription,
        address: formData.address || "",
        city: formData.city || "",
        country: formData.country || "",
        postal_code: formData.postalCode || "",

        // ✅ PRICE - ALWAYS SEND, NO if() CHECK
        price: formData.price !== "" ? Number(formData.price) : 0,

        // Optional numbers - only send if filled
        ...(formData.weekendRate !== "" && { weekend_rate: Number(formData.weekendRate) }),
        ...(formData.cleaningFee !== "" && { cleaning_fee: Number(formData.cleaningFee) }),
        ...(formData.weeklyDiscountPct !== "" && { weekly_discount_pct: Number(formData.weeklyDiscountPct) }),
        ...(formData.monthlyDiscountPct !== "" && { monthly_discount_pct: Number(formData.monthlyDiscountPct) }),
        ...(formData.area !== "" && { area: formData.area }),
        ...(formData.beds !== "" && { beds: formData.beds }),
        ...(formData.maxGuests && { max_guests: formData.maxGuests }),
        ...(formData.latitude !== "" && { latitude: formData.latitude }),
        ...(formData.longitude !== "" && { longitude: formData.longitude }),

        // Times
        ...(formData.checkInTime && { check_in_time: formData.checkInTime }),
        ...(formData.checkOutTime && { check_out_time: formData.checkOutTime }),
        ...(formData.quietHours && { quiet_hours: formData.quietHours }),

        // Type & category
        property_type: formData.propertyType || "",
        property_category: formData.propertyCategory || "",
        cancellation_policy: formData.cancellationPolicy || "",
        booking_type: formData.bookingType,

        // Booleans
        smoking_allowed: !!formData.smokingAllowed,
        pets_allowed: !!formData.petsAllowed,
        events_allowed: !!formData.eventsAllowed,
        drinking_alcohol: !!formData.drinkingAllowed,
        outside_guests_allowed: !!formData.outsideGuestsAllowed,
        insurance: !!formData.insurance,
        damage_protection: !!formData.damageProtection,

        // JSON fields
        bedrooms: JSON.stringify(formData.bedrooms || []),
        bathrooms: JSON.stringify(formData.bathrooms || []),
        photos: JSON.stringify(finalAllPhotos),
        amenities: JSON.stringify(formData.amenities || []),
        guest_policy: JSON.stringify({
          family_allowed: Boolean(formData.familyAllowed),
          unmarried_couple_allowed: Boolean(formData.unmarriedCoupleAllowed),
          bachelors_allowed: Boolean(formData.bachelorAllowed),
        }),
      };

      // ✅ FIX 4: Correct URL - townmanor.ai (without www)
      const apiUrl = `https://www.townmanor.ai/api/ovika/properties/${propertyId}`;
      
      console.log("=== UPDATE DEBUG ===");
      console.log("Property ID:", propertyId);
      console.log("API URL:", apiUrl);
      console.log("Price being sent:", payload.price);
      console.log("Full payload:", payload);

      // ✅ FIX 5: Try PUT first, fallback to PATCH if PUT fails
      let response;
      try {
        response = await axios.put(apiUrl, payload, {
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          timeout: 15000
        });
      } catch (putError) {
        console.warn("PUT failed, trying PATCH...", putError.response?.status);
        // Agar PUT 405 (Method Not Allowed) de toh PATCH try karo
        if (putError.response?.status === 405 || putError.response?.status === 404) {
          response = await axios.patch(apiUrl, payload, {
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            timeout: 15000
          });
        } else {
          throw putError;
        }
      }

      console.log("Update SUCCESS response:", response.data);
      alert(`✅ Property updated successfully!\nPrice: ₹${payload.price}`);
      onRefresh();
      onClose();

    } catch (e) {
      console.error("=== UPDATE FAILED ===", e);
      const status = e.response?.status;
      const serverMsg = e.response?.data?.error || e.response?.data?.message || e.message;
      const errorDetails = `Status: ${status || 'Network Error'}\nMessage: ${serverMsg}`;
      console.error("Error details:", errorDetails);
      setDebugInfo(`❌ Error ${status}: ${serverMsg}`);
      alert(`Failed to update property!\n\n${errorDetails}\n\nCheck browser console (F12) for details.`);
    } finally {
      setLoading(false);
    }
  };

  const modalOverlayStyle = {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
  };
  const modalContentStyle = {
    background: '#fff', padding: '24px', borderRadius: '12px', width: '90%', maxWidth: '800px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto'
  };
  const inputStyle = {
    width: '100%', padding: '10px', margin: '4px 0 12px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px',
    boxSizing: 'border-box'
  };
  const labelStyle = { fontSize: '13px', fontWeight: '600', color: '#555' };
  const sectionTitleStyle = { fontSize: '16px', fontWeight: '700', color: '#333', marginTop: '20px', marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '6px' };
  const btnGroupStyle = { display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px', position: 'sticky', bottom: '-10px', background: '#fff', padding: '10px 0', borderTop: '1px solid #eee' };
  const btnStyle = { padding: '10px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: '500' };
  const dynamicRowStyle = { display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' };
  const toggleRowStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', padding: '8px', background: '#f9f9f9', borderRadius: '6px' };
  const toggleLabelStyle = { fontSize: '14px', color: '#333' };
  const photoGrid = { display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px', marginTop: '5px' };
  const photoFrame = { position: 'relative', width: '80px', height: '80px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #eee' };
  const photoImg = { width: '100%', height: '100%', objectFit: 'cover' };
  const deleteBtn = { position: 'absolute', top: '2px', right: '2px', background: 'rgba(255,0,0,0.8)', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' };

  const handleAddList = (field) => {
    setFormData(prev => ({ ...prev, [field]: [...(prev[field] || []), isPG && field === 'bedrooms' ? { type: "Double Sharing", count: 1, price: "", washroomType: "Attached" } : { type: "", count: 1 }] }));
  };
  const handleRemoveList = (field, idx) => {
    setFormData(prev => ({ ...prev, [field]: (prev[field] || []).filter((_, i) => i !== idx) }));
  };
  const handleListChange = (field, idx, key, val) => {
    setFormData(prev => {
      const list = [...(prev[field] || [])];
      list[idx] = { ...list[idx], [key]: val };
      return { ...prev, [field]: list };
    });
  };

  const Toggle = ({ checked, onChange }) => (
    <div style={{ display: 'flex', gap: '4px' }}>
      <button type="button" onClick={() => onChange(false)} style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #ddd', background: !checked ? '#000' : '#fff', color: !checked ? '#fff' : '#000', cursor: 'pointer' }}>No</button>
      <button type="button" onClick={() => onChange(true)} style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #ddd', background: checked ? '#000' : '#fff', color: checked ? '#fff' : '#000', cursor: 'pointer' }}>Yes</button>
    </div>
  );

  const AMENITIES_TO_USE = isPG ? PG_AMENITIES : AMENITIES;

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: '0', fontSize: '20px' }}>Update {isPG ? 'PG' : 'Property'}</h3>
          <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>&times;</button>
        </div>

        {/* Debug info bar */}
        {debugInfo && (
          <div style={{ background: '#fff3cd', border: '1px solid #ffc107', padding: '8px 12px', borderRadius: '6px', marginTop: '10px', fontSize: '13px', color: '#856404' }}>
            {debugInfo}
          </div>
        )}

        {/* Property ID display for debug */}
        <div style={{ fontSize: '11px', color: '#aaa', marginTop: '6px' }}>
          ID: {property.id || property._id || 'NOT FOUND ⚠️'}
        </div>

        <h4 style={sectionTitleStyle}>Basic Information</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <label style={labelStyle}>{isPG ? 'PG Type' : 'Property Type'}</label>
            <select name="propertyType" value={formData.propertyType} onChange={handleChange} style={inputStyle}>
              {isPG ? PG_TYPES.map(p => <option key={p} value={p}>{p}</option>) : PROPERTY_TYPES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Category</label>
            <select name="propertyCategory" value={formData.propertyCategory} onChange={handleChange} style={inputStyle}>
              {DEFAULT_PROPERTY_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label style={labelStyle}>{isPG ? 'PG Name' : 'Property Name'}</label>
          <input name="property_name" value={formData.property_name} onChange={handleChange} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows={3} style={{ ...inputStyle, fontFamily: 'inherit' }} />
        </div>

        <h4 style={sectionTitleStyle}>Photos</h4>
        <div style={{ marginBottom: '16px' }}>
          <div style={photoGrid}>
            {photoList.map((url, i) => (
              <div key={`exist-${i}`} style={photoFrame}>
                <img src={url} alt="prop" style={photoImg} onError={e => e.target.src = 'https://via.placeholder.com/70?text=Err'} />
                <button type="button" onClick={() => removePhoto(i)} style={deleteBtn}>&times;</button>
              </div>
            ))}
            {newFiles.map((file, i) => (
              <div key={`new-${i}`} style={photoFrame}>
                <img src={URL.createObjectURL(file)} alt="new" style={photoImg} />
                <button type="button" onClick={() => removeNewFile(i)} style={deleteBtn}>&times;</button>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label htmlFor="modal-file-upload" style={{ ...btnStyle, padding: '8px 16px', background: '#f0f9ff', color: '#0284c7', border: '1px solid #bae6fd', display: 'inline-block', fontSize: '13px', cursor: 'pointer' }}>
              <i className="fa-solid fa-cloud-arrow-up" style={{ marginRight: '6px' }} />Select Photos
            </label>
            <input id="modal-file-upload" type="file" multiple accept="image/*" onChange={handleFileSelect} style={{ display: 'none' }} />
            <span style={{ fontSize: '12px', color: '#666' }}>{newFiles.length} new selected</span>
          </div>
        </div>

        <h4 style={sectionTitleStyle}>Location</h4>
        <div>
          <label style={labelStyle}>Address</label>
          <input name="address" value={formData.address} onChange={handleChange} style={inputStyle} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <label style={labelStyle}>City</label>
            <input name="city" value={formData.city} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Postal Code</label>
            <input name="postalCode" value={formData.postalCode} onChange={handleChange} style={inputStyle} />
          </div>
        </div>

        <h4 style={sectionTitleStyle}>{isPG ? 'Room Details' : 'Property Details'}</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <label style={labelStyle}>Area (sq ft)</label>
            <input name="area" type="number" value={formData.area} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>{isPG ? 'Total Capacity' : 'Total Beds'}</label>
            <input name="beds" type="number" min="1" value={formData.beds} onChange={handleChange} style={inputStyle} />
          </div>
        </div>

        {isPG ? (
          <>
            <label style={labelStyle}>Room Sharing Options & Prices</label>
            <div style={{ border: '1px solid #ddd', padding: '12px', borderRadius: '8px', background: '#fafafa', marginBottom: '12px' }}>
              {(formData.bedrooms || []).map((bed, idx) => (
                <div key={idx} style={{ ...dynamicRowStyle, flexWrap: 'wrap' }}>
                  <select value={bed.type || ""} onChange={(e) => handleListChange('bedrooms', idx, 'type', e.target.value)} style={{ ...inputStyle, margin: 0, flex: '1 1 140px' }}>
                    {SHARING_TYPES.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <input type="number" min="0" placeholder="Price (₹/night)" value={bed.price || ''} onChange={(e) => handleListChange('bedrooms', idx, 'price', e.target.value)} style={{ ...inputStyle, margin: 0, flex: '1 1 120px' }} />
                  <select value={bed.washroomType || "Attached"} onChange={(e) => handleListChange('bedrooms', idx, 'washroomType', e.target.value)} style={{ ...inputStyle, margin: 0, flex: '1 1 140px' }}>
                    <option value="Attached">Attached Washroom</option>
                    <option value="Common">Common Washroom</option>
                  </select>
                  <button type="button" onClick={() => handleRemoveList('bedrooms', idx)} style={{ color: '#ef4444', border: '1px solid #ef4444', background: '#fff', borderRadius: '4px', width: '32px', height: '32px', cursor: 'pointer' }}>&times;</button>
                </div>
              ))}
              <button type="button" onClick={() => handleAddList('bedrooms')} style={{ ...btnStyle, background: '#fff', border: '1px dashed #999', color: '#555', fontSize: '13px', padding: '8px 16px', width: '100%' }}>+ Add Sharing Type</button>
            </div>
          </>
        ) : (
          <>
            <label style={labelStyle}>Bedroom Configuration</label>
            <div style={{ border: '1px solid #ddd', padding: '12px', borderRadius: '8px', background: '#fafafa', marginBottom: '12px' }}>
              {(formData.bedrooms || []).map((bed, idx) => (
                <div key={idx} style={dynamicRowStyle}>
                  <select value={bed.type || ""} onChange={(e) => handleListChange('bedrooms', idx, 'type', e.target.value)} style={{ ...inputStyle, margin: 0, flex: 2 }}>
                    <option value="">Select Bed Type</option>
                    {["King Bed", "Queen Bed", "Double Bed", "Single Bed", "Bunk Bed", "Sofa Bed"].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <input type="number" min="1" placeholder="Count" value={bed.count || 1} onChange={(e) => handleListChange('bedrooms', idx, 'count', Number(e.target.value))} style={{ ...inputStyle, margin: 0, flex: 1 }} />
                  <button type="button" onClick={() => handleRemoveList('bedrooms', idx)} style={{ color: '#ef4444', border: '1px solid #ef4444', background: '#fff', borderRadius: '4px', width: '32px', height: '32px', cursor: 'pointer' }}>&times;</button>
                </div>
              ))}
              <button type="button" onClick={() => handleAddList('bedrooms')} style={{ ...btnStyle, background: '#fff', border: '1px dashed #999', color: '#555', fontSize: '13px', padding: '8px 16px', width: '100%' }}>+ Add Bedroom Type</button>
            </div>
          </>
        )}

        <label style={labelStyle}>Bathroom Configuration</label>
        <div style={{ border: '1px solid #ddd', padding: '12px', borderRadius: '8px', background: '#fafafa', marginBottom: '12px' }}>
          {(formData.bathrooms || []).map((bath, idx) => (
            <div key={idx} style={dynamicRowStyle}>
              <select value={bath.type || ""} onChange={(e) => handleListChange('bathrooms', idx, 'type', e.target.value)} style={{ ...inputStyle, margin: 0, flex: 2 }}>
                <option value="">Select Bath Type</option>
                <option value="Attached">Attached</option>
                <option value="Common">Common</option>
                <option value="En-suite">En-suite</option>
                <option value="Jack & Jill">Jack & Jill</option>
                <option value="Separate">Separate</option>
                <option value="Other">Other</option>
              </select>
              <input type="number" min="1" placeholder="Count" value={bath.count || 1} onChange={(e) => handleListChange('bathrooms', idx, 'count', Number(e.target.value))} style={{ ...inputStyle, margin: 0, flex: 1 }} />
              <button type="button" onClick={() => handleRemoveList('bathrooms', idx)} style={{ color: '#ef4444', border: '1px solid #ef4444', background: '#fff', borderRadius: '4px', width: '32px', height: '32px', cursor: 'pointer' }}>&times;</button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddList('bathrooms')} style={{ ...btnStyle, background: '#fff', border: '1px dashed #999', color: '#555', fontSize: '13px', padding: '8px 16px', width: '100%' }}>+ Add Bathroom Type</button>
        </div>

        <h4 style={sectionTitleStyle}>Amenities</h4>
        <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #eee', padding: '10px', borderRadius: '8px' }}>
          {Object.entries(AMENITIES_TO_USE).map(([group, list]) => (
            <div key={group} style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: '#888', marginBottom: '6px' }}>{group.replace(/_/g, ' ')}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {list.map(a => (
                  <label key={a} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', background: '#f5f5f5', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={formData.amenities.includes(a)} onChange={() => handleAmenityToggle(a)} />
                    {a}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ✅ PRICING - Price field with highlighted border */}
        <h4 style={sectionTitleStyle}>Pricing & Costs</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <label style={{ ...labelStyle, color: '#c98b3e' }}>
              {isPG ? 'Base Rent (₹/month)' : 'Base Price (₹/night)'} <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              name="price"
              type="number"
              min="0"
              value={formData.price}
              onChange={handleChange}
              style={{ ...inputStyle, border: '2px solid #c98b3e', fontWeight: '600', fontSize: '16px' }}
              placeholder="Enter price e.g. 2500"
            />
            <span style={{ fontSize: '11px', color: '#888' }}>Current saved: ₹{property.price || 'Not set'}</span>
          </div>
          {!isPG && (
            <div>
              <label style={labelStyle}>Weekend Rate</label>
              <input name="weekendRate" type="number" value={formData.weekendRate} onChange={handleChange} style={inputStyle} />
            </div>
          )}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
          <div>
            <label style={labelStyle}>{isPG ? 'Maintenance Fee' : 'Cleaning Fee'}</label>
            <input name="cleaningFee" type="number" value={formData.cleaningFee} onChange={handleChange} style={inputStyle} />
          </div>
          {isPG && (
            <div>
              <label style={labelStyle}>Security Deposit</label>
              <input name="securityDeposit" type="number" value={formData.securityDeposit} onChange={(e) => setFormData(f => ({ ...f, securityDeposit: e.target.value }))} style={inputStyle} />
            </div>
          )}
          {!isPG && (
            <>
              <div>
                <label style={labelStyle}>Weekly Disc (%)</label>
                <input name="weeklyDiscountPct" type="number" value={formData.weeklyDiscountPct} onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Monthly Disc (%)</label>
                <input name="monthlyDiscountPct" type="number" value={formData.monthlyDiscountPct} onChange={handleChange} style={inputStyle} />
              </div>
            </>
          )}
        </div>

        <h4 style={sectionTitleStyle}>Rules & Policies</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <div style={toggleRowStyle}>
              <span style={toggleLabelStyle}>Max Guests</span>
              <input name="maxGuests" type="number" value={formData.maxGuests} onChange={handleChange} style={{ width: '60px', padding: '4px' }} />
            </div>
            {isPG && (
              <>
                <div style={toggleRowStyle}>
                  <span style={toggleLabelStyle}>Gate Closing Time</span>
                  <input name="gateClosingTime" type="time" value={formData.gateClosingTime} onChange={handleChange} style={{ padding: '4px' }} />
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <label style={labelStyle}>Notice Period (Days)</label>
                  <input name="noticePeriod" type="number" value={formData.noticePeriod} onChange={handleChange} style={inputStyle} />
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <label style={labelStyle}>Lock-in Period (Months)</label>
                  <input name="lockInPeriod" type="number" value={formData.lockInPeriod} onChange={handleChange} style={inputStyle} />
                </div>
              </>
            )}
            {!isPG && (
              <>
                <div style={toggleRowStyle}>
                  <span style={toggleLabelStyle}>Check-In Time</span>
                  <input name="checkInTime" type="time" value={formData.checkInTime} onChange={handleChange} style={{ padding: '4px' }} />
                </div>
                <div style={toggleRowStyle}>
                  <span style={toggleLabelStyle}>Check-Out Time</span>
                  <input name="checkOutTime" type="time" value={formData.checkOutTime} onChange={handleChange} style={{ padding: '4px' }} />
                </div>
              </>
            )}
            <div style={{ marginBottom: '8px' }}>
              <label style={labelStyle}>Cancellation Policy</label>
              <select name="cancellationPolicy" value={formData.cancellationPolicy} onChange={handleChange} style={inputStyle}>
                {DEFAULT_CANCELLATION_POLICIES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: '8px' }}>
              <label style={labelStyle}>Booking Type</label>
              <select name="bookingType" value={formData.bookingType} onChange={handleChange} style={inputStyle}>
                <option value={0}>Instant Booking</option>
                <option value={1}>Approval Required</option>
              </select>
            </div>
          </div>

          <div>
            <div style={toggleRowStyle}>
              <span style={toggleLabelStyle}>Smoking Allowed</span>
              <Toggle checked={formData.smokingAllowed} onChange={(v) => setFormData(f => ({ ...f, smokingAllowed: v }))} />
            </div>
            <div style={toggleRowStyle}>
              <span style={toggleLabelStyle}>Pets Allowed</span>
              <Toggle checked={formData.petsAllowed} onChange={(v) => setFormData(f => ({ ...f, petsAllowed: v }))} />
            </div>
            {!isPG && (
              <div style={toggleRowStyle}>
                <span style={toggleLabelStyle}>Events Allowed</span>
                <Toggle checked={formData.eventsAllowed} onChange={(v) => setFormData(f => ({ ...f, eventsAllowed: v }))} />
              </div>
            )}
            <div style={toggleRowStyle}>
              <span style={toggleLabelStyle}>Drinking Allowed</span>
              <Toggle checked={formData.drinkingAllowed} onChange={(v) => setFormData(f => ({ ...f, drinkingAllowed: v }))} />
            </div>
            <div style={toggleRowStyle}>
              <span style={toggleLabelStyle}>Outside Guests</span>
              <Toggle checked={formData.outsideGuestsAllowed} onChange={(v) => setFormData(f => ({ ...f, outsideGuestsAllowed: v }))} />
            </div>
            {isPG && (
              <div style={toggleRowStyle}>
                <span style={toggleLabelStyle}>Food Available</span>
                <Toggle checked={formData.foodAvailable} onChange={(v) => setFormData(f => ({ ...f, foodAvailable: v }))} />
              </div>
            )}
            <div style={toggleRowStyle}>
              <span style={toggleLabelStyle}>Family Allowed</span>
              <Toggle checked={formData.familyAllowed} onChange={(v) => setFormData(f => ({ ...f, familyAllowed: v }))} />
            </div>
            <div style={toggleRowStyle}>
              <span style={toggleLabelStyle}>Unmarried Couples</span>
              <Toggle checked={formData.unmarriedCoupleAllowed} onChange={(v) => setFormData(f => ({ ...f, unmarriedCoupleAllowed: v }))} />
            </div>
            <div style={toggleRowStyle}>
              <span style={toggleLabelStyle}>Bachelors Allowed</span>
              <Toggle checked={formData.bachelorAllowed} onChange={(v) => setFormData(f => ({ ...f, bachelorAllowed: v }))} />
            </div>
          </div>
        </div>

        {isPG && (
          <div style={{ marginTop: '12px' }}>
            <label style={labelStyle}>Electricity Charges</label>
            <select name="electricityCharges" value={formData.electricityCharges} onChange={handleChange} style={inputStyle}>
              <option value="Included in Rent">Included in Rent</option>
              <option value="Separate (As per Meter)">Separate (As per Meter)</option>
              <option value="Fixed Amount">Fixed Amount</option>
            </select>
          </div>
        )}

        {isPG && (
          <>
            <h4 style={sectionTitleStyle}>Local Guide / Neighborhood</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Nearest Metro Station</label>
                <input value={formData.localGuide.nearestMetroStation} onChange={(e) => setFormData(f => ({ ...f, localGuide: { ...f.localGuide, nearestMetroStation: e.target.value } }))} style={inputStyle} placeholder="e.g. MG Road Metro" />
              </div>
              <div>
                <label style={labelStyle}>Nearest Bus Stop</label>
                <input value={formData.localGuide.nearestBusStop} onChange={(e) => setFormData(f => ({ ...f, localGuide: { ...f.localGuide, nearestBusStop: e.target.value } }))} style={inputStyle} placeholder="e.g. Sector 18 Bus Stand" />
              </div>
              <div>
                <label style={labelStyle}>Nearby Market / Grocery</label>
                <input value={formData.localGuide.nearbyMarket} onChange={(e) => setFormData(f => ({ ...f, localGuide: { ...f.localGuide, nearbyMarket: e.target.value } }))} style={inputStyle} placeholder="e.g. Super Mart" />
              </div>
              <div>
                <label style={labelStyle}>Nearby Hospital / Pharmacy</label>
                <input value={formData.localGuide.nearbyHospital} onChange={(e) => setFormData(f => ({ ...f, localGuide: { ...f.localGuide, nearbyHospital: e.target.value } }))} style={inputStyle} placeholder="e.g. City Hospital" />
              </div>
              <div>
                <label style={labelStyle}>Other Landmarks / Notes</label>
                <textarea value={formData.localGuide.otherNotes} onChange={(e) => setFormData(f => ({ ...f, localGuide: { ...f.localGuide, otherNotes: e.target.value } }))} style={{ ...inputStyle, fontFamily: 'inherit' }} placeholder="Any other landmarks nearby..." rows={3} />
              </div>
            </div>
          </>
        )}

        <div style={btnGroupStyle}>
          <button type="button" onClick={onClose} style={{ ...btnStyle, background: '#f5f5f5', color: '#333' }}>Cancel</button>
          <button type="button" onClick={handleSave} disabled={loading} style={{ ...btnStyle, background: loading ? '#ccc' : '#c98b3e', color: '#fff', minWidth: '120px' }}>
            {loading ? '⏳ Saving...' : '💾 Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

function PropertyCard({ photoUrl, name, location, priceText, details, onEdit, onDelete, onView }) {
  return (
    <div className={styles.propertyCard}>
      <img src={photoUrl} alt={name} className={styles.propertyImage} onClick={onView} style={{ cursor: "pointer" }} />
      <div className={styles.propertyMeta}>
        <div className={styles.propertyTitle}>{name}</div>
        <div className={styles.propertySubtitle}>{location}</div>
        {details && <div className={styles.propertyDetails}>{details}</div>}
        {priceText && <div className={styles.propertyPrice}>{priceText}</div>}
        <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
          <button type="button" onClick={onEdit} style={{ border: '1px solid #ddd', background: '#fff', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <i className="fa-solid fa-pen" /> Update
          </button>
          <button type="button" onClick={onDelete} style={{ border: '1px solid #fdd', background: '#fff5f5', color: '#d32f2f', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <i className="fa-solid fa-trash" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

const extractIdFromObj = (obj) => {
  if (!obj || typeof obj !== "object") return null;
  if (obj.owner_id) return obj.owner_id;
  if (obj.ownerId) return obj.ownerId;
  if (obj.id) return obj.id;
  if (obj._id) return obj._id;
  if (obj.userId) return obj.userId;
  if (obj.uid) return obj.uid;
  if (obj.user && typeof obj.user === "object") return extractIdFromObj(obj.user);
  if (obj.data && typeof obj.data === "object") return extractIdFromObj(obj.data);
  return null;
};

const getPropertyPhoto = (prop) => {
  if (!prop) return "/public/image 68.png";
  if (Array.isArray(prop.photos) && prop.photos.length > 0) {
    if (typeof prop.cover_photo_index === "number" && prop.photos[prop.cover_photo_index]) return prop.photos[prop.cover_photo_index];
    return prop.photos[0];
  }
  if (typeof prop.photos === "string" && prop.photos.trim()) {
    const parts = prop.photos.split(",").map((p) => p.trim()).filter(Boolean);
    if (parts.length) return parts[0];
  }
  return "/public/image 68.png";
};

const getRoomCount = (val) => {
  if (val === undefined || val === null) return 0;
  if (typeof val === 'number') return val;
  let parsed = val;
  if (typeof val === 'string') {
    if (!isNaN(val) && !val.trim().startsWith('[')) return Number(val);
    try { parsed = JSON.parse(val); } catch (e) { return parseFloat(val) || 0; }
  }
  if (typeof parsed === 'number') return parsed;
  if (Array.isArray(parsed)) return parsed.reduce((acc, item) => { const c = Number(item.count); return acc + (isNaN(c) ? 1 : c); }, 0);
  return 0;
};

export default function DashBoardAdmin() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const STORAGE_KEY = "user";
  const [ownerId, setOwnerId] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingProperty, setEditingProperty] = useState(null);

  const resolveOwnerIdFromSources = useCallback(() => {
    const idFromContext = extractIdFromObj(user);
    if (idFromContext) return String(idFromContext);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      const id = extractIdFromObj(parsed);
      if (id) return String(id);
    } catch (e) {}
    return null;
  }, [user]);

  const fetchFilteredProperties = useCallback(async (resolvedOwnerId) => {
    if (!resolvedOwnerId) { setProperties([]); setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("https://www.townmanor.ai/api/ovika/properties", { timeout: 10000 });
      let all = [];
      if (!res || !res.data) { all = []; }
      else if (Array.isArray(res.data)) { all = res.data; }
      else if (Array.isArray(res.data.data)) { all = res.data.data; }
      else if (Array.isArray(res.data.results)) { all = res.data.results; }
      else { const arr = Object.values(res.data).find((v) => Array.isArray(v)); if (arr) all = arr; }
      const filtered = all.filter((p) => {
        if (!p || typeof p !== "object") return false;
        const candidates = [p.owner_id, p.ownerId, p.user_id, p.userId, (p.meta && (p.meta.ownerId || p.meta.owner_id)), p.owner].filter(Boolean);
        return candidates.some((c) => String(c) === String(resolvedOwnerId));
      });
      setProperties(filtered);
    } catch (err) {
      console.error("DashBoardAdmin: Failed to load properties:", err);
      setError("Failed to load properties (see console).");
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    let pollHandle = null;
    let attempts = 0;
    const maxAttempts = 6;
    const tryResolveNow = () => {
      const id = resolveOwnerIdFromSources();
      if (!mounted) return;
      if (id) { setOwnerId(id); fetchFilteredProperties(id); return; }
      pollHandle = setInterval(() => {
        attempts += 1;
        const id2 = resolveOwnerIdFromSources();
        if (id2) { clearInterval(pollHandle); if (!mounted) return; setOwnerId(id2); fetchFilteredProperties(id2); return; }
        if (attempts >= maxAttempts) { clearInterval(pollHandle); if (!mounted) return; setOwnerId(null); setProperties([]); setLoading(false); }
      }, 400);
    };
    tryResolveNow();
    return () => { mounted = false; if (pollHandle) clearInterval(pollHandle); };
  }, [resolveOwnerIdFromSources, fetchFilteredProperties]);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== STORAGE_KEY) return;
      if (!e.newValue) { setOwnerId(null); setProperties([]); setLoading(false); return; }
      try {
        const parsed = JSON.parse(e.newValue);
        const id = extractIdFromObj(parsed);
        if (id) { const sid = String(id); setOwnerId(sid); fetchFilteredProperties(sid); }
        else { setOwnerId(null); setProperties([]); }
      } catch (err) { setOwnerId(null); setProperties([]); }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [fetchFilteredProperties]);

  useEffect(() => {
    const onPropertyCreated = (e) => {
      const created = e?.detail;
      if (!created) return;
      const pOwner = created.owner_id || created.ownerId || (created.meta && (created.meta.ownerId || created.meta.owner_id));
      const resolved = resolveOwnerIdFromSources();
      if (!resolved) { const id = resolveOwnerIdFromSources(); if (id) { setOwnerId(id); fetchFilteredProperties(id); } return; }
      if (String(pOwner) === String(resolved)) setProperties((prev) => [created, ...prev]);
    };
    window.addEventListener("propertyCreated", onPropertyCreated);
    return () => window.removeEventListener("propertyCreated", onPropertyCreated);
  }, [fetchFilteredProperties, resolveOwnerIdFromSources]);

  useEffect(() => {
    const id = resolveOwnerIdFromSources();
    if (!id) { setOwnerId(null); setProperties([]); setLoading(false); return; }
    if (id && id !== ownerId) { setOwnerId(id); fetchFilteredProperties(id); }
  }, [user, resolveOwnerIdFromSources, fetchFilteredProperties]);

  const refresh = async () => {
    const id = resolveOwnerIdFromSources();
    setOwnerId(id);
    await fetchFilteredProperties(id);
  };

  if (!ownerId) {
    return (
      <div className={styles.page}>
        <main className={styles.grid}>
          <section>
            <h3 className={styles.sectionTitle}>My Properties</h3>
            <p>We couldn't detect your account yet.</p>
            <div style={{ marginTop: 12 }}>
              <button className={styles.iconBtn} onClick={refresh}>Retry detect account</button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.topbar}></div>
        <section style={{ marginTop: "-3px" }} className={styles.hero}>
          <img className={styles.heroBg} src="/Group 89.png" alt="hero background" />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}><h1>Owner Dashboard</h1><p>Manage your properties and track your listings</p></div>
        </section>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh", flexDirection: "column", gap: "12px" }}>
          <Loader size={40} style={{ animation: "spin 1s linear infinite", color: "#3b82f6" }} />
          <p style={{ fontSize: "16px", color: "#6b7280", fontWeight: 500 }}>Loading properties…</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.topbar}></div>
      <section style={{ marginTop: "-3px" }} className={styles.hero}>
        <img className={styles.heroBg} src="/Group 89.png" alt="hero background" />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}><h1>Owner Dashboard</h1><p>Manage your properties and track your listings</p></div>
      </section>
      <main className={styles.grid}>
        <section>
          <h3 className={styles.sectionTitle}>My Properties</h3>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {properties.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', padding: '40px 20px', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '16px' }}>
              <div style={{ background: '#fff', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', maxWidth: '500px', textAlign: 'center' }}>
                <div style={{ background: '#c2772b', width: '100px', height: '100px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                  <Home size={50} style={{ color: '#fff' }} />
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', marginBottom: '16px' }}>No Properties Listed Yet</h2>
                <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: '1.6', marginBottom: '24px' }}>Start your journey by listing your first property.</p>
                <button type="button" onClick={() => navigate('/listed1')} style={{ background: '#c2772b', color: '#fff', padding: '14px 32px', borderRadius: '10px', border: 'none', fontSize: '16px', fontWeight: '600', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                  <Plus size={20} /> List Your Property
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.properties}>
              {properties.map((prop) => {
                const name = prop.property_name || prop.name || "Untitled Property";
                const locationParts = [prop.city, prop.country].filter(Boolean);
                const location = locationParts.join(", ") || "Location not specified";
                const detailsPieces = [];
                if (prop.property_type) detailsPieces.push(prop.property_type);
                const bedroomCount = prop.total_bedrooms || getRoomCount(prop.bedrooms);
                if (bedroomCount > 0) detailsPieces.push(`${bedroomCount} BR`);
                const bathroomCount = prop.total_bathrooms || getRoomCount(prop.bathrooms);
                if (bathroomCount > 0) detailsPieces.push(`${bathroomCount} BA`);
                if (prop.max_guests !== undefined && prop.max_guests !== null) detailsPieces.push(`Up to ${prop.max_guests} guests`);
                const details = detailsPieces.join(" • ");
                const priceText = prop.price ? `₹${Number(prop.price).toLocaleString("en-IN")} / night` : "";
                const photoUrl = getPropertyPhoto(prop);
                return (
                  <PropertyCard
                    key={prop.id || prop._id || Math.random()}
                    photoUrl={photoUrl} name={name} location={location} details={details} priceText={priceText}
                    onView={() => navigate(`/property/${prop.id || prop._id}`)}
                    onEdit={() => setEditingProperty(prop)}
                    onDelete={async () => {
                      if (!window.confirm("Are you sure you want to delete this property?")) return;
                      try {
                        const id = prop.id || prop._id;
                        await axios.delete(`https://www.townmanor.ai/api/ovika/properties/${id}`);
                        setProperties(prev => prev.filter(p => (p.id || p._id) !== id));
                      } catch (e) { alert("Failed to delete property"); console.error(e); }
                    }}
                  />
                );
              })}
            </div>
          )}
        </section>
        {editingProperty && (
          <EditPropertyModal property={editingProperty} onClose={() => setEditingProperty(null)} onRefresh={refresh} />
        )}
      </main>
    </div>
  );
}