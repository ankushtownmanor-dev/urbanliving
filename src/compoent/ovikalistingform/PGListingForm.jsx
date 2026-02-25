import React, { useState, useEffect, useContext } from "react";
import "./tmx9pf-form.css"; 
import { AuthContext } from "../Login/AuthContext";
import { 
  Building, 
  Home, 
  Hotel, 
  Users, 
  MapPin, 
  Info, 
  FileText, 
  Camera, 
  CreditCard, 
  ShieldCheck,
  Zap,
  Wifi,
  Trash2,
  CheckCircle2
} from "lucide-react";

const API_BASE = "https://townmanor.ai/api";

const PROPERTY_CATEGORIES = [
  { id: "Flat", label: "Flat / Apartment", sub: "Apartments, Penthouses, Studio", icon: <Building size={20} /> },
  { id: "House", label: "Independent House", sub: "Standalone Home, Bungalow", icon: <Home size={20} /> },
  { id: "Villa", label: "Villa / Farmhouse", sub: "Luxury villas & retreats", icon: <Hotel size={20} /> },
  { id: "PG", label: "PG / Hostel", sub: "Shared accommodation", icon: <Users size={20} /> },
  { id: "Penthouse", label: "Penthouse", sub: "Top floor luxury", icon: <Building size={20} /> },
  { id: "Studio", label: "Studio Apartment", sub: "1Room Kitchen sets", icon: <Zap size={20} /> },
];

const FLOOR_TYPES = ["Vitrifed Tiles", "Marble", "Wooden", "Granite", "Mosaic", "Normal", "Laminate", "Carpeted"];
const WATER_SUPPLIES = ["Corporation (MCG)", "Borewell", "Dual (Both)", "Tanker", "Rainwater Harvesting"];
const PROPERTY_AGE = ["New Construction", "0-1 Year", "1-5 Years", "5-10 Years", "10+ Years", "Under Construction"];
const HOUSE_RULES = ["Smoking Allowed", "Pets Allowed", "Events Allowed", "Drinking Allowed", "Late Entry Allowed", "Friends Allowed", "Veg Only", "Non-Veg Allowed", "Girlfriend/Boyfriend Entry Allowed", "Couple Friendly"];
const WINDOW_TYPES = ["Normal", "Large / Full Sized", "French Windows", "Bay Windows", "No Window", "Sky Light"];

const FURNISHING_STATUS = ["Unfurnished", "Semi-Furnished", "Fully Furnished"];
const SHARING_TYPES = ["Private Room", "Double Sharing", "Triple Sharing", "Four Sharing", "Five Sharing", "Dormitory"];
const TENANT_PREFERENCES = ["Bachelors (Any)", "Bachelors (Female Only)", "Bachelors (Male Only)", "Family Only", "Working Professionals", "Students Only", "No Preference"];
const CANCELLATION_POLICIES = ["Flexible: Full refund 1 day prior", "Moderate: Full refund 5 days prior", "Strict: 50% refund 7 days prior", "No Refund"];
const FACING_OPTIONS = ["North", "South", "East", "West", "North-East", "North-West", "South-East", "South-West"];

const AMENITIES_MASTER = {
  "Safety & Security": ["CCTV", "Security Guard", "Fire Extinguisher", "Intercom", "Biometric Entry", "Gated Community", "Fire Alarm", "Sprinklers", "Smoke Detectors", "Emergency Exit"],
  "Modern Living": ["Lift", "Power Backup", "Wi-Fi", "Swimming Pool", "Gym", "Clubhouse", "Modular Kitchen", "Chimney", "Central AC", "Smart Home Tech", "EV Charging Point"],
  "Basic Utilities": ["Water Supply 24/7", "Borewell", "Corporation Water", "Gas Pipeline", "Solar Water", "Reserved Parking", "Visitor Parking", "STP Plant", "Waste Management"],
  "Indoor Features": ["Air Conditioner", "Geyser", "RO Water", "Washing Machine", "Refrigerator", "Inverter", "Wardrobe", "Study Table", "Smart TV", "Gas Stove", "Dishwasher", "Microwave"],
  "Outer Spaces": ["Balcony", "Private Terrace", "Garden", "Park Area", "Pet Area", "Kids Play Area", "Club House", "Jogging Track"]
};

const PROPERTY_TYPES = {
  "Flat": ["Apartment", "Penthouse", "Studio", "Duplex"],
  "House": ["Independent House", "Bungalow", "Row House"],
  "Villa": ["Luxury Villa", "Farmhouse", "Holiday Home"],
  "PG": ["Girls PG", "Boys PG", "Co-living Space", "Student Hostel"],
};

const FURNISHING_ITEMS = ["Fridge", "Sofa", "Study Table", "Geyser", "AC", "Washing Machine", "Microwave", "Cupboard", "Bed", "TV", "Mirror", "Curtains", "Shoe Rack", "Bookshelf", "Dishwasher", "Air Purifier", "Iron Table", "Chair", "Desk Lamp"];
const BED_TYPES = [
  "Single Bed", "Double Bed", "Queen Bed", "King Bed", 
  "Bunk Bed", "Twin Bed", "Sofa Bed", "Folding Bed", "Diwan", "Floor Mattress", "None"
];
const ROOM_CATEGORIES = ["Master Bedroom", "Regular Bedroom", "Guest Room", "Study Room", "Staff Room"];

const BOOKING_TYPES = [
  { id: 0, label: "Instant Booking", desc: "Guests can book instantly without waiting for approval." },
  { id: 1, label: "Request to Book", desc: "You review and accept or decline booking requests." }
];

function useFilePreviews() {
  const [previews, setPreviews] = useState([]);
  const update = (files) => {
    const arr = Array.from(files || []).slice(0, 15);
    const readers = arr.map((file) => {
      return new Promise((res) => {
        const r = new FileReader();
        r.onload = (e) => res({ name: file.name, url: e.target.result, file });
        r.readAsDataURL(file);
      });
    });
    Promise.all(readers).then(setPreviews);
  };
  return { previews, update };
}

function isAcceptedFile(file) {
  if (!file) return false;
  const ext = (file.name || "").split(".").pop()?.toLowerCase() || "";
  return ["jpg", "jpeg", "png", "webp", "avif", "pdf"].includes(ext);
}

const PGListingForm = () => {
  const { user } = useContext(AuthContext);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(0);

  const [form, setForm] = useState({
    propertyCategory: "Flat",
    propertyType: "Apartment",
    title: "",
    mainDescription: "",
    address: "",
    country: "India",
    postalCode: "",
    city: "",
    latitude: "",
    longitude: "",
    
    bedrooms: 2,
    bathrooms: 2,
    balconies: 1,
    floorNo: "",
    totalFloors: "",
    area: "",
    furnishing: FURNISHING_STATUS[1],
    facing: FACING_OPTIONS[0],
    
    bedroomDetails: [{ 
      id: 0, 
      type: "Regular Bedroom", 
      roomNumber: "",
      bedType: "Queen Bed",
      bedCount: 1,
      ac: true,
      furnished: true,
      furnishingDetails: [], 
      attachedBathroom: true,
      price: "",
      securityDeposit: "",
      areaSqFt: "",
      availabilityDate: "",
      windowType: "Normal",
      roomFloorType: "Same as Property",
    }],
    
    waterSupply: WATER_SUPPLIES[0],
    electricityStatus: "24 Hours Power Cut Rare",
    floorType: FLOOR_TYPES[0],
    propertyAge: PROPERTY_AGE[0],
    carParking: "1 Open",
    preferredTenants: [TENANT_PREFERENCES[0]],
    houseRules: ["Couple Friendly"],
    
    foodAvailable: false,
    foodDetails: { breakfast: true, lunch: false, dinner: true, type: "Both" },
    noticePeriod: 30,
    lockInPeriod: 1,
    gateClosingTime: "11:00 PM",
    
    baseRate: "", 
    securityDeposit: "",
    maintenanceCharge: "",
    maintenanceCycle: "Monthly",
    availableFrom: "",
    
    amenities: {},
    smokingAllowed: false,
    petsAllowed: false,
    eventsAllowed: false,
    drinkingAllowed: false,
    
    bookingType: 1,
    registrationNumber: "",
    cancellationPolicy: CANCELLATION_POLICIES[0],
    
    youtubeLink: "",
    virtualTourLink: "",
    electricityCharges: "As per Meter / Unit",
    waterCharges: "Included in Rent",
    
    transportTips: { metro: "", bus: "", walk: "" },
    essentialsNearby: { grocery: "", medical: "", shopping: "" },
    cafesRestaurants: [{ name: "", distance: "" }],
    houseSpecificTips: [""],
  });

  const photoPreviews = useFilePreviews();
  const [coverIndex, setCoverIndex] = useState(0);
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [aadhaarVerified, setAadhaarVerified] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState("");

  const STEPS = [
    { id: 0, title: "Category", icon: <Zap size={18} /> },
    { id: 1, title: "Info", icon: <Info size={18} /> },
    { id: 2, title: "Details", icon: <FileText size={18} /> },
    { id: 3, title: "Amenities", icon: <Wifi size={18} /> },
    { id: 4, title: "Local Guide", icon: <MapPin size={18} /> },
    { id: 5, title: "Photos", icon: <Camera size={18} /> },
    { id: 6, title: "Pricing", icon: <CreditCard size={18} /> },
    { id: 7, title: "Verification", icon: <ShieldCheck size={18} /> },
  ];

  useEffect(() => {
    const all = {};
    Object.values(AMENITIES_MASTER).flat().forEach((a) => (all[a] = false));
    setForm((f) => ({ ...f, amenities: all }));
  }, []);

  const validateStep = (s) => {
    const err = {};
    if (s === 1) {
      if (!form.title.trim()) err.title = "Required";
      if (!form.city.trim()) err.city = "Required";
      if (!form.address.trim()) err.address = "Required";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleAmenityToggle = (a) => {
    setForm(f => ({ ...f, amenities: { ...f.amenities, [a]: !f.amenities[a] } }));
  };

  const nextStep = () => { if(validateStep(step)) setStep(s => Math.min(s+1, STEPS.length-1)); window.scrollTo(0, 0); };
  const prevStep = () => { setStep(s => Math.max(s-1, 0)); window.scrollTo(0, 0); };

  const handlePhotos = (e) => {
    const files = Array.from(e.target.files).filter(isAcceptedFile);
    photoPreviews.update(files);
  };

  const handleSendOtp = () => {
    if(phoneNumber.length !== 10) return alert("Please enter valid 10-digit number");
    setOtpSent(true);
    alert("OTP sent to " + phoneNumber + ". (Mock OTP: 1234)");
  };

  const handleVerifyOtp = () => {
    if(phoneOtp === "1234") {
      setIsPhoneVerified(true);
      alert("Phone Verified Successfully!");
    } else {
      alert("Invalid OTP! Try '1234' for testing.");
    }
  };

  const verifyAadhaar = () => {
    if (aadhaarNumber.length !== 12) return alert("Invalid Aadhaar");
    setAadhaarVerified(true);
    alert("Aadhaar Verified!");
  };

  const handleSubmit = async (e) => {
    if (!aadhaarVerified || !isPhoneVerified) return alert("Please complete verification");
    setIsSubmitting(true);

    try {
      const fd = new FormData();
      
      // Calculate total beds
      const totalBeds = form.bedroomDetails.reduce((sum, r) => sum + (Number(r.bedCount) || 1), 0);
      
      // Top-level fields required by backend
      fd.append("property_name", form.title);
      fd.append("description", form.mainDescription);
      fd.append("city", form.city);
      fd.append("address", form.address);
      fd.append("price", form.baseRate);
      fd.append("booking_type", String(form.bookingType));
      fd.append("owner_id", user?.id || "99"); // Using a fallback owner_id
      
      // Explicitly send these fields if backend has columns for them
      fd.append("bedrooms", JSON.stringify(form.bedroomDetails));
      fd.append("bathrooms", JSON.stringify([{ type: "Attached", count: form.bathrooms }]));
      fd.append("amenities", JSON.stringify(Object.keys(form.amenities).filter(k => form.amenities[k])));
      fd.append("beds", String(totalBeds));

      const guidebook = {
        transport_tips: form.transportTips,
        metro_station: form.transportTips.metro,
        hospital: form.essentialsNearby.medical,
        market: form.essentialsNearby.grocery,
        cafes_restaurants: form.cafesRestaurants.filter(c => c.name.trim()),
        essentials_nearby: form.essentialsNearby,
        house_specific_tips: form.houseSpecificTips.filter(t => t.trim())
      };

      const meta = {
        ...form,
        totalBeds,
        amenities: Object.keys(form.amenities).filter(k => form.amenities[k]),
        guidebook: guidebook,
        aadhaarVerified,
        isPhoneVerified,
      };
      
      fd.append("meta", JSON.stringify(meta));
      fd.append("guest_policy", JSON.stringify({
        family_allowed: form.preferredTenants.includes("Family Only"),
        unmarried_couple_allowed: form.houseRules.includes("Couple Friendly"),
        bachelors_allowed: form.preferredTenants.some(t => t.includes("Bachelors")),
      }));

      photoPreviews.previews.forEach((p) => {
        if(p.file) fd.append("photos", p.file);
      });

      const res = await fetch(`${API_BASE}/ovika/properties/upload`, {
        method: "POST",
        body: fd,
        credentials: "include"
      });

      const result = await res.json();

      if(res.ok) {
        alert("Listing Published Successfully! ID: " + (result.data?.id || "New"));
        window.location.reload();
      } else {
        alert(result.message || "Failed to publish");
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred during submission. Check console.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="tmx9pf-root">
      <div className="rental-form-container">
        <div className="form-header-premium">
          <div className="header-content">
             <h1>List Your <span className="highlight">Property</span></h1>
             <p>Market your property to thousands of high-quality tenants</p>
          </div>
          <div className="stepper-horizontal">
            {STEPS.map((s, i) => (
              <div key={s.id} className={`step-item ${i === step ? 'active' : i < step ? 'completed' : ''}`}>
                <div className="icon-box">{i < step ? <CheckCircle2 size={16} /> : s.icon}</div>
                <span>{s.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="form-main-card">
          {step === 0 && (
            <div className="step-fade">
              <h2 className="step-title">Select Property Category</h2>
              <div className="category-grid">
                 {PROPERTY_CATEGORIES.map(cat => (
                   <div 
                    key={cat.id} 
                    className={`category-card ${form.propertyCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setForm(f => ({ ...f, propertyCategory: cat.id }))}
                   >
                     <div className="cat-icon">{cat.icon}</div>
                     <div className="cat-info">
                        <h3>{cat.label}</h3>
                        <p>{cat.sub}</p>
                     </div>
                   </div>
                 ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="step-fade">
              <h2 className="step-title">Basic Information</h2>
              <div className="form-grid">
                <div className="field-group full">
                  <label>Property Title / Building Name *</label>
                  <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Spacious 3BHK in DLF Phase 5" />
                  {errors.title && <span className="error">{errors.title}</span>}
                </div>
                <div className="field-group">
                  <label>Specific Property Type</label>
                  <select name="propertyType" value={form.propertyType} onChange={handleChange}>
                    {PROPERTY_TYPES[form.propertyCategory]?.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="field-group full">
                  <label>Short Description *</label>
                  <textarea name="mainDescription" value={form.mainDescription} onChange={handleChange} rows="2" placeholder="Tell us about the highlights of your property..." />
                </div>
                <div className="field-group full">
                  <label>Full Address *</label>
                  <textarea name="address" value={form.address} onChange={handleChange} rows="3" placeholder="Street, Sector, Locality..." />
                </div>
                <div className="field-group">
                  <label>City *</label>
                  <input name="city" value={form.city} onChange={handleChange} placeholder="e.g. Gurugram" />
                </div>
                <div className="field-group">
                  <label>Postal Code</label>
                  <input name="postalCode" value={form.postalCode} onChange={handleChange} placeholder="6 Digits" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="step-fade">
              <h2 className="step-title">Property Layout & Room Configuration</h2>
              <div className="form-grid">
                <div className="field-group full">
                  <div className="section-subtitle">Room Details Configuration</div>
                  <div className="room-config-list">
                    {form.bedroomDetails.map((room, idx) => (
                      <div key={idx} className="room-detail-card">
                        <div className="room-header">
                          <span className="room-idx">Room #{idx + 1}</span>
                          <button className="del-btn-icon" onClick={() => setForm(f => ({ ...f, bedroomDetails: f.bedroomDetails.filter((_, i) => i !== idx) }))}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                        
                        <div className="room-grid-mini">
                          <div className="field-group">
                            <label>Room Category / Type</label>
                            <select value={room.type} onChange={(e) => {
                              const newList = [...form.bedroomDetails];
                              newList[idx].type = e.target.value;
                              setForm(f => ({ ...f, bedroomDetails: newList }));
                            }}>
                              {form.propertyCategory === 'PG' 
                                ? SHARING_TYPES.map(s => <option key={s} value={s}>{s}</option>)
                                : ROOM_CATEGORIES.map(r => <option key={r} value={r}>{r}</option>)
                              }
                            </select>
                          </div>
                          
                          <div className="field-group">
                            <label>Room No. (Optional)</label>
                            <input placeholder="e.g. 101" value={room.roomNumber} onChange={(e) => {
                              const newList = [...form.bedroomDetails];
                              newList[idx].roomNumber = e.target.value;
                              setForm(f => ({ ...f, bedroomDetails: newList }));
                            }} />
                          </div>

                          <div className="field-group">
                            <label>Bed Type</label>
                            <select value={room.bedType} onChange={(e) => {
                              const newList = [...form.bedroomDetails];
                              newList[idx].bedType = e.target.value;
                              setForm(f => ({ ...f, bedroomDetails: newList }));
                            }}>
                              {BED_TYPES.map(bt => <option key={bt} value={bt}>{bt}</option>)}
                            </select>
                          </div>

                          <div className="field-group">
                            <label>Bed Count</label>
                            <input type="number" value={room.bedCount} onChange={(e) => {
                              const newList = [...form.bedroomDetails];
                              newList[idx].bedCount = Number(e.target.value);
                              setForm(f => ({ ...f, bedroomDetails: newList }));
                            }} />
                          </div>

                          <div className="field-group">
                            <label>Rent / Price (₹)</label>
                            <input type="number" placeholder="per month" value={room.price} onChange={(e) => {
                              const newList = [...form.bedroomDetails];
                              newList[idx].price = e.target.value;
                              setForm(f => ({ ...f, bedroomDetails: newList }));
                            }} />
                          </div>

                          <div className="field-group">
                            <label>Security Deposit (₹)</label>
                            <input type="number" placeholder="Refundable amt" value={room.securityDeposit} onChange={(e) => {
                              const newList = [...form.bedroomDetails];
                              newList[idx].securityDeposit = e.target.value;
                              setForm(f => ({ ...f, bedroomDetails: newList }));
                            }} />
                          </div>

                          <div className="field-group full">
                            <label>Furnishing Items Available in Room</label>
                            <div className="chips-grid-mini">
                              {FURNISHING_ITEMS.map(item => (
                                <div 
                                  key={item} 
                                  className={`mini-chip ${room.furnishingDetails?.includes(item) ? 'active' : ''}`}
                                  onClick={() => {
                                    const newList = [...form.bedroomDetails];
                                    const items = newList[idx].furnishingDetails || [];
                                    newList[idx].furnishingDetails = items.includes(item) 
                                      ? items.filter(i => i !== item) 
                                      : [...items, item];
                                    setForm(f => ({ ...f, bedroomDetails: newList }));
                                  }}
                                >
                                  {item}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="room-checkbox-grid">
                            <label className="checkbox-mini">
                              <input type="checkbox" checked={room.ac} onChange={(e) => {
                                const newList = [...form.bedroomDetails];
                                newList[idx].ac = e.target.checked;
                                setForm(f => ({ ...f, bedroomDetails: newList }));
                              }} />
                              <span>Air Conditioning (AC)</span>
                            </label>
                            <label className="checkbox-mini">
                              <input type="checkbox" checked={room.furnished} onChange={(e) => {
                                const newList = [...form.bedroomDetails];
                                newList[idx].furnished = e.target.checked;
                                setForm(f => ({ ...f, bedroomDetails: newList }));
                              }} />
                              <span>Furnished Room</span>
                            </label>
                            <label className="checkbox-mini">
                              <input type="checkbox" checked={room.attachedBathroom} onChange={(e) => {
                                const newList = [...form.bedroomDetails];
                                newList[idx].attachedBathroom = e.target.checked;
                                setForm(f => ({ ...f, bedroomDetails: newList }));
                              }} />
                              <span>Attached Bathroom</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button className="add-btn-wide" onClick={() => {
                      const newId = Date.now();
                      setForm(f => ({ ...f, bedroomDetails: [...f.bedroomDetails, { 
                        id: newId, 
                        type: f.propertyCategory === 'PG' ? SHARING_TYPES[0] : ROOM_CATEGORIES[0], 
                        roomNumber: "",
                        bedType: BED_TYPES[1],
                        bedCount: 1,
                        ac: true,
                        furnished: true,
                        attachedBathroom: true,
                        price: "",
                        securityDeposit: "",
                        areaSqFt: ""
                      }] }));
                    }}>
                      <Users size={18} /> Add Another Room Configuration
                    </button>
                  </div>
                </div>
                
                <div className="field-group">
                  <label>Total Built-up Area (Sq Ft) *</label>
                  <input type="number" name="area" value={form.area} onChange={handleChange} placeholder="Total house area" />
                </div>
                <div className="field-group">
                  <label>Overall Furnishing</label>
                  <select name="furnishing" value={form.furnishing} onChange={handleChange}>
                    {FURNISHING_STATUS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                
                <div className="field-group">
                  <label>Property Age</label>
                  <select name="propertyAge" value={form.propertyAge} onChange={handleChange}>
                    {PROPERTY_AGE.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div className="field-group">
                  <label>Water Supply</label>
                  <select name="waterSupply" value={form.waterSupply} onChange={handleChange}>
                    {WATER_SUPPLIES.map(w => <option key={w} value={w}>{w}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="step-fade">
              <h2 className="step-title">Amenities & Features</h2>
              <div className="amenities-container">
                 {Object.entries(AMENITIES_MASTER).map(([group, list]) => (
                   <div key={group} className="amenity-group">
                      <h4>{group}</h4>
                      <div className="chips-grid">
                        {list.map(a => (
                          <div 
                           key={a} 
                           className={`amenity-chip ${form.amenities[a] ? 'selected' : ''}`}
                           onClick={() => handleAmenityToggle(a)}
                          >
                            {form.amenities[a] && <CheckCircle2 size={14} className="check-icon" />}
                            {a}
                          </div>
                        ))}
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="step-fade">
              <h2 className="step-title">Local Guide & Neighborhood</h2>
              <div className="form-grid">
                 <div className="field-group full">
                    <label>Nearest Metro Station</label>
                    <input value={form.transportTips.metro} onChange={(e) => setForm(f => ({ ...f, transportTips: { ...f.transportTips, metro: e.target.value }}))} placeholder="e.g. Huda City Centre" />
                 </div>
                 <div className="field-group">
                    <label>Nearest Hospital</label>
                    <input value={form.essentialsNearby.medical} onChange={(e) => setForm(f => ({ ...f, essentialsNearby: { ...f.essentialsNearby, medical: e.target.value }}))} placeholder="e.g. Artemis Hospital" />
                 </div>
                 <div className="field-group">
                    <label>Nearest Grocery / Market</label>
                    <input value={form.essentialsNearby.grocery} onChange={(e) => setForm(f => ({ ...f, essentialsNearby: { ...f.essentialsNearby, grocery: e.target.value }}))} placeholder="e.g. Reliance Fresh" />
                 </div>
                 
                 <div className="field-group full">
                    <div className="section-subtitle">Recommended Cafes & Restaurants</div>
                    {form.cafesRestaurants.map((res, idx) => (
                      <div key={idx} className="v-input-row" style={{marginBottom: '10px'}}>
                        <input placeholder="Name" value={res.name} onChange={(e) => {
                           const n = [...form.cafesRestaurants]; n[idx].name = e.target.value; setForm(f => ({ ...f, cafesRestaurants: n }));
                        }} />
                        <input placeholder="Distance (m)" value={res.distance} onChange={(e) => {
                           const n = [...form.cafesRestaurants]; n[idx].distance = e.target.value; setForm(f => ({ ...f, cafesRestaurants: n }));
                        }} />
                      </div>
                    ))}
                    <button className="mini-chip" onClick={() => setForm(f => ({ ...f, cafesRestaurants: [...f.cafesRestaurants, {name: "", distance: ""}] }))}>+ Add More</button>
                 </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="step-fade">
              <h3 className="step-title">Upload Gallery</h3>
              <div className="upload-zone">
                 <input type="file" multiple accept="image/*" onChange={handlePhotos} id="photo-upload" hidden />
                 <label htmlFor="photo-upload" className="upload-trigger">
                    <Camera size={40} />
                    <p>Click to upload property photos</p>
                    <span>Up to 15 high-quality images</span>
                 </label>
              </div>
              <div className="preview-grid">
                 {photoPreviews.previews.map((p, i) => (
                   <div key={i} className={`preview-item ${coverIndex === i ? 'is-cover' : ''}`}>
                      <img src={p.url} alt="prop" />
                      <div className="badge-cover" onClick={() => setCoverIndex(i)}>Cover</div>
                   </div>
                 ))}
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="step-fade">
              <h2 className="step-title">Rent & Financials</h2>
              <div className="form-grid">
                <div className="field-group">
                  <label>Nightly Rent (₹) *</label>
                  <input type="number" name="baseRate" value={form.baseRate} onChange={handleChange} placeholder="e.g. 25000" />
                </div>
                <div className="field-group">
                  <label>Security Deposit (₹)</label>
                  <input type="number" name="securityDeposit" value={form.securityDeposit} onChange={handleChange} placeholder="e.g. 50000" />
                </div>
                <div className="field-group">
                  <label>Gate Closing Time</label>
                  <input name="gateClosingTime" value={form.gateClosingTime} onChange={handleChange} />
                </div>
                <div className="field-group">
                  <label>Notice Period (Days)</label>
                  <input type="number" name="noticePeriod" value={form.noticePeriod} onChange={handleChange} />
                </div>

                <div className="field-group full">
                   <label>Preferred Tenant (Select Multiple)</label>
                   <div className="chips-grid">
                      {TENANT_PREFERENCES.map(p => (
                        <div 
                          key={p} 
                          className={`amenity-chip ${form.preferredTenants.includes(p) ? 'selected' : ''}`}
                          onClick={() => {
                            const newTenants = form.preferredTenants.includes(p) 
                              ? form.preferredTenants.filter(t => t !== p) 
                              : [...form.preferredTenants, p];
                            setForm(f => ({ ...f, preferredTenants: newTenants }));
                          }}
                        >
                          {p}
                        </div>
                      ))}
                   </div>
                </div>

                <div className="field-group full">
                  <div className="section-separator">Bill Payment Policy</div>
                </div>
                
                <div className="field-group">
                  <label>Electricity Charges</label>
                  <select name="electricityCharges" value={form.electricityCharges} onChange={handleChange}>
                    <option>Included in Rent</option>
                    <option>As per Meter / Unit</option>
                    <option>Fixed Monthly Charge</option>
                    <option>Shared among roommates</option>
                  </select>
                </div>
                <div className="field-group">
                  <label>Water Charges</label>
                  <select name="waterCharges" value={form.waterCharges} onChange={handleChange}>
                    <option>Included in Rent</option>
                    <option>Fixed Monthly Charge</option>
                    <option>Shared Bill</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 7 && (
            <div className="step-fade">
              <h2 className="step-title">Final Verification</h2>
              <div className="verification-box">
                 <div className="v-item">
                    <div className="v-label">Aadhaar Number (Identity)</div>
                    <div className="v-input-row">
                       <input 
                        placeholder="12 digit number" 
                        value={aadhaarNumber} 
                        onChange={(e) => setAadhaarNumber(e.target.value.slice(0,12))} 
                        disabled={aadhaarVerified}
                       />
                       <button onClick={verifyAadhaar} disabled={aadhaarVerified} className={aadhaarVerified ? 'verified' : ''}>
                          {aadhaarVerified ? 'Verified' : 'Verify'}
                       </button>
                    </div>
                 </div>
                 <div className="v-item">
                    <div className="v-label">Mobile Number Verification</div>
                    <div className="v-input-row">
                       <input 
                        placeholder="10 digit number" 
                        value={phoneNumber} 
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g,'').slice(0,10))} 
                        disabled={otpSent}
                       />
                       {!otpSent ? (
                         <button onClick={handleSendOtp}>Send OTP</button>
                       ) : !isPhoneVerified ? (
                        <div className="otp-container">
                          <input 
                            placeholder="OTP" 
                            className="otp-input"
                            value={phoneOtp}
                            onChange={(e) => setPhoneOtp(e.target.value.slice(0,4))}
                          />
                          <button onClick={handleVerifyOtp} className="verify-btn">Verify</button>
                        </div>
                       ) : (
                         <button className="verified" disabled><CheckCircle2 size={16} /> Verified</button>
                       )}
                    </div>
                 </div>
              </div>
            </div>
          )}
        </div>

        <div className="form-footer-nav">
           <button className="btn-back" onClick={prevStep} disabled={step === 0}>Back</button>
           {step < STEPS.length - 1 ? (
             <button className="btn-next" onClick={nextStep}>Continue</button>
           ) : (
             <button className="btn-submit" onClick={handleSubmit} disabled={isSubmitting}>
               {isSubmitting ? 'Publishing...' : 'Publish Listing'}
             </button>
           )}
        </div>
      </div>
    </div>
  );
};

export default PGListingForm;
