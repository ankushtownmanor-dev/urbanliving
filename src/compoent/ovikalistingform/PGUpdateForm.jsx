import React, { useState, useEffect, useContext } from "react";
import "./pg-listing-form.css"; 
import { AuthContext } from "../Login/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
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

const API_BASE = "https://www.townmanor.ai/api";

const PROPERTY_CATEGORIES = [
  { id: "Flat", label: "Flat / Apartment", sub: "Apartments, Penthouses, Studio", icon: <Building size={20} /> },
  { id: "House", label: "House / Villa / Farmhouse", sub: "Independent Home, Bungalow, Luxury Villa & Farmhouse", icon: <Home size={20} /> },
  { id: "PG", label: "PG / Hostel", sub: "Shared accommodation", icon: <Users size={20} /> },
  { id: "Penthouse", label: "Penthouse", sub: "Top floor luxury", icon: <Building size={20} /> },
  { id: "Studio", label: "Studio Apartment", sub: "1Room Kitchen sets", icon: <Zap size={20} /> },
  { id: "Suite", label: "Suite", sub: "Luxury Suites & Living", icon: <Hotel size={20} /> },
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
  "Flat": ["Standard Apartment", "Studio Apartment", "Penthouse", "Duplex", "Service Apartment"],
  "House": ["Independent House", "Bungalow", "Row House", "Luxury Villa", "Farmhouse", "Holiday Home"],
  "PG": ["Girls PG", "Boys PG", "Co-living Space", "Student Hostel"],
  "Penthouse": ["Luxury Penthouse", "Duplex Penthouse", "Studio Penthouse"],
  "Studio": ["1RK Studio", "1BHK Studio", "Luxury Studio"],
  "Suite": ["Standard Suite", "Executive Suite", "Presidential Suite", "Junior Suite"],
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

function isAcceptedFile(file) {
  if (!file) return false;
  const name = typeof file === 'string' ? file : (file.name || "");
  const ext = name.split(".").pop()?.toLowerCase() || "";
  return ["jpg", "jpeg", "png", "webp", "avif", "pdf"].includes(ext);
}

const PGUpdateForm = ({ propId: passedId, onComplete }) => {
  const { user } = useContext(AuthContext);
  const { id: paramId } = useParams();
  const id = passedId || paramId;
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
    
    bedroomDetails: [],
    
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
    discount90Days: "", 
    discount180Days: "",
  });

  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [aadhaarVerified, setAadhaarVerified] = useState(false);
  const [isVerifyingAadhaar, setIsVerifyingAadhaar] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState("");
  const [otpClientId, setOtpClientId] = useState(null);

  const [existingPhotos, setExistingPhotos] = useState([]);
  const [newPhotos, setNewPhotos] = useState([]);
  const [newPhotoPreviews, setNewPhotoPreviews] = useState([]);
  const [coverIndex, setCoverIndex] = useState(0);

  const uploadPhotos = async (files) => {
    const fd = new FormData();
    files.forEach(f => fd.append('images', f));

    // Use the same upload endpoint used by the admin dashboard
    const res = await fetch('https://www.townmanor.ai/api/image/aws-upload-owner-images', {
      method: 'POST',
      body: fd,
    });

    const data = await res.json().catch(() => null);
    if (!res.ok || !data) {
      throw new Error(`Upload failed: ${res.status} ${res.statusText}`);
    }

    // API returns { fileUrls: [ ... ] }
    if (Array.isArray(data.fileUrls) && data.fileUrls.length > 0) {
      return data.fileUrls;
    }

    throw new Error('No URLs returned from upload');
  };

  const STEPS = [
    { id: 0, title: "Category", icon: <Zap size={18} /> },
    { id: 1, title: "Info", icon: <Info size={18} /> },
    { id: 2, title: "Details", icon: <FileText size={18} /> },
    { id: 3, title: "Amenities", icon: <Wifi size={18} /> },
    { id: 4, title: "Local Guide", icon: <MapPin size={18} /> },
    { id: 5, title: "Photos", icon: <Camera size={18} /> },
    { id: 6, title: "Pricing / Review", icon: <CreditCard size={18} /> },
  ];

  useEffect(() => {
    fetchPropertyData();
  }, [id]);

  const fetchPropertyData = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/ovika/properties/${id}`);
      const data = res.data.data || res.data;
      
      const meta = typeof data.meta === 'string' ? JSON.parse(data.meta) : (data.meta || {});
      
      // Sanitize meta to avoid nulls/undefined in form inputs
      const sanitizedMeta = {};
      if (meta && typeof meta === 'object') {
        Object.keys(meta).forEach(k => {
          sanitizedMeta[k] = meta[k] === null ? "" : meta[k];
        });
      }

      // Special handling for bedroomDetails to avoid nulls in nested inputs
      const rawBedrooms = meta.bedroomDetails || data.bedrooms;
      const sanitizedBedrooms = (Array.isArray(rawBedrooms) ? rawBedrooms : []).map(room => ({
        ...room,
        type: room.type || (data.property_category === 'PG' ? SHARING_TYPES[0] : ROOM_CATEGORIES[0]),
        roomNumber: room.roomNumber || "",
        bedType: room.bedType || BED_TYPES[0],
        bedCount: room.bedCount || 1,
        price: room.price || "",
        securityDeposit: room.securityDeposit || "",
        maintenanceCharge: room.maintenanceCharge || "",
        maintenanceCycle: room.maintenanceCycle || "Monthly",
        furnishingDetails: room.furnishingDetails || [],
        ac: !!room.ac,
        furnished: !!room.furnished,
        attachedBathroom: !!room.attachedBathroom
      }));

      // Map API data back to form state
      setForm(prevForm => {
        const updatedForm = {
          ...prevForm,
          ...sanitizedMeta,
          title: data.property_name || data.name || "",
          mainDescription: data.description || "",
          city: data.city || "",
          address: data.address || "",
          baseRate: data.price || "",
          propertyCategory: data.property_category || meta.propertyCategory || "PG",
          propertyType: data.property_type || meta.propertyType || "Standard PG",
          bookingType: data.booking_type !== undefined ? Number(data.booking_type) : 0,
          // Reconstruct amenities object for the toggle UI
          amenities: constructAmenitiesObject(data.amenities || meta.amenities || []),
          bedroomDetails: sanitizedBedrooms,
          owner_id: data.owner_id || meta.owner_id || "",
        };

        // Deep sanitize nested objects that are used in inputs
        if (updatedForm.transportTips) {
          updatedForm.transportTips = {
            metro: updatedForm.transportTips.metro || "",
            bus: updatedForm.transportTips.bus || "",
            walk: updatedForm.transportTips.walk || ""
          };
        }
        if (updatedForm.essentialsNearby) {
          updatedForm.essentialsNearby = {
            grocery: updatedForm.essentialsNearby.grocery || "",
            medical: updatedForm.essentialsNearby.medical || "",
            shopping: updatedForm.essentialsNearby.shopping || ""
          };
        }
        if (Array.isArray(updatedForm.cafesRestaurants)) {
          updatedForm.cafesRestaurants = updatedForm.cafesRestaurants.map(c => ({
            name: c.name || "",
            distance: c.distance || ""
          }));
        }
        return updatedForm;
      });

      setAadhaarNumber(meta.aadhaarNumber || "");
      setAadhaarVerified(meta.aadhaarVerified || false);
      setPhoneNumber(meta.phoneNumber || "");
      setIsPhoneVerified(meta.isPhoneVerified || false);

      // Handle photos
      let photos = [];
      if (Array.isArray(data.photos)) photos = data.photos;
      else if (typeof data.photos === 'string') photos = data.photos.split(',').filter(Boolean);
      setExistingPhotos(photos);
      setCoverIndex(data.cover_photo_index || 0);

      setIsLoading(false);
    } catch (err) {
      console.error("Failed to fetch property", err);
      alert("Error loading property data");
      setIsLoading(false);
    }
  };

  const constructAmenitiesObject = (amenityList) => {
    const all = {};
    Object.values(AMENITIES_MASTER).flat().forEach((a) => {
      all[a] = Array.isArray(amenityList) ? amenityList.includes(a) : false;
    });
    return all;
  };

  const validateStep = (s) => {
    const err = {};
    if (s === 1) {
      if (!form.title?.trim()) err.title = "Required";
      if (!form.city?.trim()) err.city = "Required";
      if (!form.address?.trim()) err.address = "Required";
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
    setNewPhotos([...newPhotos, ...files]);
    
    // Create previews
    const readers = files.map((file) => {
      return new Promise((res) => {
        const r = new FileReader();
        r.onload = (e) => res({ name: file.name, url: e.target.result, file });
        r.readAsDataURL(file);
      });
    });
    
    Promise.all(readers).then((results) => {
      setNewPhotoPreviews([...newPhotoPreviews, ...results]);
    });
  };

  const removeExistingPhoto = (idx) => {
    setExistingPhotos(existingPhotos.filter((_, i) => i !== idx));
    if (coverIndex === idx) setCoverIndex(0);
    else if (coverIndex > idx) setCoverIndex(coverIndex - 1);
  };

  const removeNewPhoto = (idx) => {
    setNewPhotos(newPhotos.filter((_, i) => i !== idx));
    setNewPhotoPreviews(newPhotoPreviews.filter((_, i) => i !== idx));
    const newIndex = existingPhotos.length + idx;
    if (coverIndex === newIndex) setCoverIndex(0);
    else if (coverIndex > newIndex) setCoverIndex(coverIndex - 1);
  };

  const handleSendOtp = async () => {
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
        alert("Failed to send OTP: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Phone OTP error", err);
      alert("Error sending OTP. Please try again.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
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
        alert("Verification Failed: " + (data.message || "Invalid OTP"));
      }
    } catch (err) {
      console.error("Phone verification error", err);
      alert("Verification Error. Please try again.");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

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
        alert("Aadhaar Verified Successfully!");
      } else {
        setAadhaarVerified(false);
        alert("Verification Failed: " + (data.message || "Invalid Aadhaar"));
      }
    } catch (err) {
      console.error("Aadhaar verification error", err);
      alert("Verification Error. Please try again.");
    } finally {
      setIsVerifyingAadhaar(false);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    try {
      const idStr = String(id);
      
      // Upload new photos if any
      let uploadedUrls = [];
      if (newPhotos.length > 0) {
        try {
          uploadedUrls = await uploadPhotos(newPhotos);
        } catch (err) {
          // Continue even if upload fails (e.g., endpoint missing or response not JSON)
          console.warn('Photo upload failed, continuing without new photos:', err);
          alert('Could not upload new photos. The update will proceed without them.');
          uploadedUrls = [];
        }
      }
      
      // Calculate total beds correctly
      const totalBeds = (form.bedroomDetails || []).reduce((sum, r) => sum + (Number(r.bedCount) || 1), 0);
      
      // Construct extra info like in SuperAdminDashboard
      let extraInfo = "\n\n--- PG Details ---";
      if (form.noticePeriod) extraInfo += `\nNotice Period: ${form.noticePeriod} Days`;
      if (form.gateClosingTime) extraInfo += `\nGate Closing Time: ${form.gateClosingTime}`;
      if (form.securityDeposit) extraInfo += `\nSecurity Deposit: ₹${form.securityDeposit}`;
      
      // Build payload exactly like SuperAdminDashboard (Verified reference for PUT updates)
      // We exclude 'meta' and 'photos' here as SuperAdminDashboard doesn't send them in PUT
      const updatedPhotos = [...existingPhotos, ...uploadedUrls];
      const coverPhotoUrl = updatedPhotos[coverIndex] || updatedPhotos[0] || "";

      const payload = {
        property_name: form.title || "Untitled",
        description: (form.mainDescription || "") + extraInfo,
        price: Number(form.baseRate) || 0,
        address: form.address || "",
        city: form.city || "",
        property_type: form.propertyType || "Standard PG",
        property_category: form.propertyCategory || "PG",
        area: form.area || "",
        beds: Number(totalBeds) || 0,
        max_guests: Number(totalBeds) || 1,
        booking_type: String(form.bookingType || "0"),
        owner_id: form.owner_id || user?.id || "admin", // Match SuperAdminDashboard default
        
        // Boolean columns used by standard properties
        smoking_allowed: !!form.smokingAllowed,
        pets_allowed: !!form.petsAllowed,
        events_allowed: !!form.eventsAllowed,
        drinking_alcohol: !!form.drinkingAllowed,

        // Optional standard columns
        check_in_time: form.check_in_time || "12:00",
        check_out_time: form.check_out_time || "11:00",
        weekend_rate: Number(form.weekend_rate) || 0,
        cleaning_fee: Number(form.cleaning_fee) || 0,
        weekly_discount_pct: Number(form.weekly_discount_pct) || 0,
        monthly_discount_pct: Number(form.monthly_discount_pct) || 0,
        cover_photo_index: coverIndex,

        // JSON fields (stringified as per SuperAdminDashboard)
        amenities: JSON.stringify(Object.keys(form.amenities || {}).filter(k => form.amenities[k])),
        bedrooms: JSON.stringify(form.bedroomDetails || []),
        bathrooms: JSON.stringify([{ type: "Attached", count: form.bathrooms || 1 }]),
        photos: JSON.stringify(updatedPhotos),
        guest_policy: JSON.stringify({
          family_allowed: form.preferredTenants?.includes("Family Only"),
          unmarried_couple_allowed: form.houseRules?.includes("Couple Friendly"),
          bachelors_allowed: form.preferredTenants?.some(t => t.includes("Bachelors")),
        }),
      };

      console.log("Submitting Robust Payload for ID:", idStr, payload);

      // Using the exact URL format from the SuperAdminDashboard
      const res = await axios.put(`https://www.townmanor.ai/api/ovika/properties/${idStr}`, payload, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });

      if(res.status === 200 || res.data?.success) {
        alert("Property Updated Successfully!");
        if (onComplete) onComplete();
        else navigate("/admin-control-panel");
      } else {
        alert("Failed to update property: " + (res.data?.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Update Error Detailed:", err);
      const serverMsg = err.response?.data?.error || err.response?.data?.message || err.message;
      alert(`Error updating property: ${serverMsg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="tmx9pf-root"><div className="rental-form-container"><h1>Loading...</h1></div></div>;

  return (
    <div className="tmx9pf-root">
      <div className="rental-form-container">
        <div className="form-header-premium">
          <div className="header-content">
             <h1>Update <span className="highlight">Property</span></h1>
             <p>Edit your listing details to keep them up to date</p>
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
                    {(form.bedroomDetails || []).map((room, idx) => (
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
                            <label>Monthly Rent (₹)</label>
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
                          
                          <div className="field-group">
                            <label>Maintenance Charge (₹)</label>
                            <input type="number" placeholder="per month/cycle" value={room.maintenanceCharge} onChange={(e) => {
                              const newList = [...form.bedroomDetails];
                              newList[idx].maintenanceCharge = e.target.value;
                              setForm(f => ({ ...f, bedroomDetails: newList }));
                            }} />
                          </div>

                          <div className="field-group">
                            <label>Maintenance Cycle</label>
                            <select value={room.maintenanceCycle} onChange={(e) => {
                              const newList = [...form.bedroomDetails];
                              newList[idx].maintenanceCycle = e.target.value;
                              setForm(f => ({ ...f, bedroomDetails: newList }));
                            }}>
                              <option value="Monthly">Monthly</option>
                              <option value="Quarterly">Quarterly</option>
                              <option value="Half-Yearly">Half-Yearly</option>
                              <option value="Yearly">Yearly</option>
                              <option value="One-Time">One-Time</option>
                            </select>
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
                      setForm(f => ({ ...f, bedroomDetails: [...(f.bedroomDetails || []), { 
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
                        maintenanceCharge: "",
                        maintenanceCycle: "Monthly",
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
                    <input value={form.transportTips?.metro || ""} onChange={(e) => setForm(f => ({ ...f, transportTips: { ...(f.transportTips || {}), metro: e.target.value }}))} placeholder="e.g. Huda City Centre" />
                 </div>
                 <div className="field-group">
                    <label>Nearest Hospital</label>
                    <input value={form.essentialsNearby?.medical || ""} onChange={(e) => setForm(f => ({ ...f, essentialsNearby: { ...(f.essentialsNearby || {}), medical: e.target.value }}))} placeholder="e.g. Artemis Hospital" />
                 </div>
                 <div className="field-group">
                    <label>Nearest Grocery / Market</label>
                    <input value={form.essentialsNearby?.grocery || ""} onChange={(e) => setForm(f => ({ ...f, essentialsNearby: { ...(f.essentialsNearby || {}), grocery: e.target.value }}))} placeholder="e.g. Reliance Fresh" />
                 </div>
                 
                 <div className="field-group full">
                    <div className="section-subtitle">Recommended Cafes & Restaurants</div>
                    {(form.cafesRestaurants || []).map((res, idx) => (
                      <div key={idx} className="v-input-row" style={{marginBottom: '10px'}}>
                        <input placeholder="Name" value={res.name} onChange={(e) => {
                           const n = [...form.cafesRestaurants]; n[idx].name = e.target.value; setForm(f => ({ ...f, cafesRestaurants: n }));
                        }} />
                        <input placeholder="Distance (m)" value={res.distance} onChange={(e) => {
                           const n = [...form.cafesRestaurants]; n[idx].distance = e.target.value; setForm(f => ({ ...f, cafesRestaurants: n }));
                        }} />
                      </div>
                    ))}
                    <button className="mini-chip" onClick={() => setForm(f => ({ ...f, cafesRestaurants: [...(f.cafesRestaurants || []), {name: "", distance: ""}] }))}>+ Add More</button>
                 </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="step-fade">
              <h3 className="step-title">Gallery Management</h3>
              
              <div className="section-subtitle">Existing Photos</div>
              <div className="preview-grid" style={{marginBottom: '30px'}}>
                 {existingPhotos.map((url, i) => (
                   <div key={i} className={`preview-item ${coverIndex === i ? 'is-cover' : ''}`}>
                      <img src={url} alt="prop" />
                      <div className="preview-overlay-fixed">
                         <div className="top-actions">
                            <button 
                              type="button" 
                              className="remove-btn-premium" 
                              onClick={() => removeExistingPhoto(i)}
                            >
                               <Trash2 size={14} />
                               <span>Remove</span>
                            </button>
                         </div>
                         <div className="bottom-actions">
                            <div 
                              className={`badge-cover-premium ${coverIndex === i ? 'active' : ''}`} 
                              onClick={() => setCoverIndex(i)}
                            >
                              {coverIndex === i ? 'Main Cover' : 'Set as Cover'}
                            </div>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>

              <div className="section-subtitle">Upload New Photos</div>
              <div className="upload-zone">
                 <input type="file" multiple accept="image/*" onChange={handlePhotos} id="photo-upload" hidden />
                 <label htmlFor="photo-upload" className="upload-trigger">
                    <Camera size={40} />
                    <p>Click to add more photos</p>
                 </label>
              </div>
              <div className="preview-grid">
                 {newPhotoPreviews.map((p, i) => (
                   <div key={i} className={`preview-item ${coverIndex === (existingPhotos.length + i) ? 'is-cover' : ''}`}>
                      <img src={p.url} alt="prop" />
                      <div className="preview-overlay-fixed">
                         <div className="top-actions">
                            <button 
                              type="button" 
                              className="remove-btn-premium" 
                              onClick={() => removeNewPhoto(i)}
                            >
                               <Trash2 size={14} />
                               <span>Discard</span>
                            </button>
                         </div>
                         <div className="bottom-actions">
                            <div 
                              className={`badge-cover-premium ${coverIndex === (existingPhotos.length + i) ? 'active' : ''}`} 
                              onClick={() => setCoverIndex(existingPhotos.length + i)}
                            >
                              {coverIndex === (existingPhotos.length + i) ? 'Main Cover' : 'Set as Cover'}
                            </div>
                         </div>
                      </div>
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
                  <label>Base Price / Monthly Rental (₹)</label>
                  <input type="number" name="baseRate" value={form.baseRate} onChange={handleChange} placeholder="e.g. 15000" />
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
                          className={`amenity-chip ${form.preferredTenants?.includes(p) ? 'selected' : ''}`}
                          onClick={() => {
                            const newTenants = form.preferredTenants.includes(p) 
                              ? form.preferredTenants.filter(t => t !== p) 
                              : [...(form.preferredTenants || []), p];
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

                <div className="field-group full">
                  <div className="section-separator">Long-term Stay Discounts</div>
                </div>

                <div className="field-group">
                  <label>90 Days Discount (%)</label>
                  <input type="number" name="discount90Days" value={form.discount90Days} onChange={handleChange} placeholder="e.g. 5" />
                </div>
                <div className="field-group">
                  <label>180 Days Discount (%)</label>
                  <input type="number" name="discount180Days" value={form.discount180Days} onChange={handleChange} placeholder="e.g. 10" />
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
               {isSubmitting ? 'Updating...' : 'Save Updates'}
             </button>
           )}
        </div>
      </div>
    </div>
  );
};

export default PGUpdateForm;
