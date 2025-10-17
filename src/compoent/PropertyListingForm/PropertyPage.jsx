// PropertyPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBed, FaBath, FaUserFriends, FaMapMarkerAlt, FaShare, FaHeart, FaPhone, FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import { FiShare2, FiHeart } from 'react-icons/fi';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import './PropertyPage.css';

// Dummy property data
const dummyProperties = [
    {
        id: '1',
        basicInfo: {
            propertyName: 'Luxury PG for Professionals',
            address: '456, Sector 50, Noida, Uttar Pradesh',
            city: 'Noida',
            locality: 'Sector 50',
            pincode: '201301',
            propertyFacing: 'East',
            furnishing: 'Fully Furnished',
            availableFrom: '2023-11-15',
            availableFor: 'Professionals',
            preferredTenants: 'Working Professionals',
            description: 'A premium PG with modern amenities, perfect for working professionals. Features include high-speed WiFi, housekeeping, and 24/7 security.'
        },
        propertyDetails: {
            propertyType: 'PG',
            roomType: 'Single',
            sharingType: '1',
            roomFacilities: ['AC', 'TV', 'Geyser', 'Attached Bathroom', 'Wardrobe', 'Study Table'],
            commonAreas: ['Living Room', 'Kitchen', 'Dining Area', 'Gym'],
            amenities: {
                basic: ['WiFi', 'Power Backup', 'Lift', 'Housekeeping', 'Laundry'],
                security: ['CCTV', 'Security Guard', 'Fire Extinguisher']
            },
            rules: ['No Smoking', 'No Outside Food', 'No Visitors after 10 PM']
        },
        pricing: {
            monthlyRent: '15000',
            securityDeposit: '30000',
            maintenance: '1500',
            electricityBill: 'Included',
            foodIncluded: true,
            foodCost: '4000'
        },
        photos: [
            'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        ],
        contact: {
            name: 'Priya Singh',
            phone: '+91 98765 12345',
            email: 'priya.singh@example.com',
            postedOn: '2023-10-10'
        }
    },
    {
        id: '2',
        basicInfo: {
            propertyName: 'Cozy PG for Girls',
            address: '789, Sector 62, Noida, Uttar Pradesh',
            city: 'Noida',
            locality: 'Sector 62',
            pincode: '201301',
            propertyFacing: 'North',
            furnishing: 'Semi-Furnished',
            availableFrom: '2023-11-01',
            availableFor: 'Girls',
            preferredTenants: 'Students',
            description: 'A safe and comfortable PG exclusively for girls, located near major educational institutions. 24/7 security and home-cooked food available.'
        },
        propertyDetails: {
            propertyType: 'PG',
            roomType: 'Double',
            sharingType: '2',
            roomFacilities: ['AC', 'Geyser', 'Wardrobe', 'Study Table'],
            commonAreas: ['Living Room', 'Kitchen', 'Dining Area'],
            amenities: {
                basic: ['WiFi', 'Power Backup', 'Lift', 'Housekeeping'],
                security: ['CCTV', 'Security Guard']
            },
            rules: ['No Visitors', 'No Outside Food', 'No Smoking']
        },
        pricing: {
            monthlyRent: '10000',
            securityDeposit: '20000',
            maintenance: '1000',
            electricityBill: 'Metered',
            foodIncluded: true,
            foodCost: '3500'
        },
        photos: [
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        ],
        contact: {
            name: 'Anjali Sharma',
            phone: '+91 98765 67890',
            email: 'anjali.sharma@example.com',
            postedOn: '2023-10-12'
        }
    }
];

const PropertyPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentImage, setCurrentImage] = useState(0);
    const [showContact, setShowContact] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                // In a real app, you would fetch from your API
                // const response = await fetch(`/api/properties/${id}`);
                // const data = await response.json();
                
                // For demo, we'll use the dummy data
                const foundProperty = dummyProperties.find(p => p.id === id);
                
                if (foundProperty) {
                    setProperty(foundProperty);
                } else {
                    // If property not found in dummy data, use a default one
                    setProperty(dummyProperties[0]);
                }
                
                setLoading(false);
            } catch (error) {
                console.error('Error fetching property:', error);
                // Fallback to first dummy property on error
                setProperty(dummyProperties[0]);
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    const shareProperty = () => {
        if (navigator.share) {
            navigator.share({
                title: property.basicInfo.propertyName,
                text: `Check out this ${property.propertyDetails.propertyType} in ${property.basicInfo.locality}`,
                url: window.location.href,
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    const handleBack = () => {
        navigate(-1); // Go back to previous page
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading property details...</p>
            </div>
        );
    }

    if (!property) {
        return (
            <div className="error-container">
                <h2>Property Not Found</h2>
                <p>Sorry, we couldn't find the property you're looking for.</p>
                <button className="btn btn-primary" onClick={() => navigate('/')}>
                    Browse Properties
                </button>
            </div>
        );
    }

    const handlePrevImage = () => {
        setCurrentImage(prev => (prev === 0 ? property.photos.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setCurrentImage(prev => (prev === property.photos.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="property-page">
            <button className="back-button" onClick={handleBack}>
                <FaArrowLeft /> Back to Listings
            </button>

            <div className="property-gallery">
                <div className="main-image">
                    <img 
                        src={property.photos[currentImage]} 
                        alt={property.basicInfo.propertyName} 
                    />
                    
                    <div className="gallery-navigation">
                        <button className="nav-arrow prev" onClick={handlePrevImage}>
                            <IoIosArrowBack />
                        </button>
                        <button className="nav-arrow next" onClick={handleNextImage}>
                            <IoIosArrowForward />
                        </button>
                    </div>
                    
                    <div className="gallery-actions">
                        <button 
                            className={`icon-btn ${isFavorite ? 'active' : ''}`}
                            onClick={toggleFavorite}
                            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                        >
                            {isFavorite ? <FaHeart /> : <FiHeart />}
                        </button>
                        <button 
                            className="icon-btn"
                            onClick={shareProperty}
                            aria-label="Share property"
                        >
                            <FiShare2 />
                        </button>
                    </div>
                    
                    <div className="image-counter">
                        {currentImage + 1} / {property.photos.length}
                    </div>
                </div>
                
                {property.photos.length > 1 && (
                    <div className="thumbnail-gallery">
                        {property.photos.map((photo, index) => (
                            <div 
                                key={index}
                                className={`thumbnail ${currentImage === index ? 'active' : ''}`}
                                onClick={() => setCurrentImage(index)}
                            >
                                <img 
                                    src={photo} 
                                    alt={`Thumbnail ${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="property-content">
                <div className="property-header">
                    <div>
                        <h1>{property.basicInfo.propertyName}</h1>
                        <div className="property-location">
                            <FaMapMarkerAlt className="location-icon" />
                            <span>{property.basicInfo.locality}, {property.basicInfo.city}</span>
                        </div>
                    </div>
                    <div className="price-tag">
                        <span className="amount">₹{parseInt(property.pricing.monthlyRent).toLocaleString('en-IN')}</span>
                        <span className="duration">/month</span>
                    </div>
                </div>

                <div className="property-highlights">
                    <div className="highlight">
                        <FaBed className="highlight-icon" />
                        <div className="highlight-text">
                            <span className="highlight-value">{property.propertyDetails.roomType}</span>
                            <span className="highlight-label">Room Type</span>
                        </div>
                    </div>
                    <div className="highlight">
                        <FaBath className="highlight-icon" />
                        <div className="highlight-text">
                            <span className="highlight-value">
                                {property.propertyDetails.roomFacilities.includes('Attached Bathroom') ? 'Attached' : 'Shared'}
                            </span>
                            <span className="highlight-label">Bathroom</span>
                        </div>
                    </div>
                    <div className="highlight">
                        <FaUserFriends className="highlight-icon" />
                        <div className="highlight-text">
                            <span className="highlight-value">
                                {property.propertyDetails.sharingType} {property.propertyDetails.sharingType === '1' ? 'Person' : 'People'}
                            </span>
                            <span className="highlight-label">Sharing</span>
                        </div>
                    </div>
                </div>

                <div className="property-section">
                    <h2 className="section-title">About This Property</h2>
                    <p className="property-description">{property.basicInfo.description}</p>
                </div>

                <div className="property-section">
                    <h2 className="section-title">Property Details</h2>
                    <div className="details-grid">
                        <div className="detail-item">
                            <span className="detail-label">Property Type</span>
                            <span className="detail-value">{property.propertyDetails.propertyType}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Furnishing</span>
                            <span className="detail-value">{property.basicInfo.furnishing}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Available For</span>
                            <span className="detail-value">{property.basicInfo.availableFor}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Preferred Tenants</span>
                            <span className="detail-value">{property.basicInfo.preferredTenants}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Available From</span>
                            <span className="detail-value">
                                {new Date(property.basicInfo.availableFrom).toLocaleDateString('en-IN', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Property Facing</span>
                            <span className="detail-value">{property.basicInfo.propertyFacing}</span>
                        </div>
                    </div>
                </div>

                <div className="property-section">
                    <h2 className="section-title">Room Facilities</h2>
                    <div className="amenities-grid">
                        {property.propertyDetails.roomFacilities.map((facility, index) => (
                            <div key={index} className="amenity-item">
                                {facility}
                            </div>
                        ))}
                    </div>
                </div>

                {Object.entries(property.propertyDetails.amenities).map(([category, items]) => (
                    items.length > 0 && (
                        <div key={category} className="property-section">
                            <h2 className="section-title">{category.charAt(0).toUpperCase() + category.slice(1)} Amenities</h2>
                            <div className="amenities-grid">
                                {items.map((item, index) => (
                                    <div key={index} className="amenity-item">
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                ))}

                {property.propertyDetails.rules && property.propertyDetails.rules.length > 0 && (
                    <div className="property-section">
                        <h2 className="section-title">House Rules</h2>
                        <div className="rules-list">
                            {property.propertyDetails.rules.map((rule, index) => (
                                <div key={index} className="rule-item">
                                    {rule}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="property-section pricing-section">
                    <h2 className="section-title">Pricing Details</h2>
                    <div className="pricing-card">
                        <div className="price-row">
                            <span>Monthly Rent</span>
                            <span>₹{parseInt(property.pricing.monthlyRent).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="price-row">
                            <span>Security Deposit</span>
                            <span>₹{parseInt(property.pricing.securityDeposit).toLocaleString('en-IN')}</span>
                        </div>
                        {property.pricing.maintenance && (
                            <div className="price-row">
                                <span>Maintenance</span>
                                <span>₹{parseInt(property.pricing.maintenance).toLocaleString('en-IN')}/month</span>
                            </div>
                        )}
                        <div className="price-row">
                            <span>Electricity Bill</span>
                            <span>{property.pricing.electricityBill}</span>
                        </div>
                        {property.pricing.foodIncluded && (
                            <div className="price-row highlight">
                                <span>Food Plan</span>
                                <span>₹{parseInt(property.pricing.foodCost).toLocaleString('en-IN')}/month</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="property-section">
                    <h2 className="section-title">Location</h2>
                    <div className="map-container">
                        <div className="map-placeholder">
                            <p>Map of {property.basicInfo.locality}, {property.basicInfo.city}</p>
                        </div>
                        <div className="address-details">
                            <p><strong>Address:</strong> {property.basicInfo.address}</p>
                            <p><strong>Pincode:</strong> {property.basicInfo.pincode}</p>
                        </div>
                    </div>
                </div>

                <div className="contact-section">
                    {showContact ? (
                        <div className="contact-details">
                            <h3>Contact Owner</h3>
                            <div className="contact-method">
                                <FaPhone className="contact-icon" />
                                <a href={`tel:${property.contact.phone}`} className="contact-link">
                                    {property.contact.phone}
                                </a>
                            </div>
                            <div className="contact-method">
                                <FaEnvelope className="contact-icon" />
                                <a href={`mailto:${property.contact.email}`} className="contact-link">
                                    {property.contact.email}
                                </a>
                            </div>
                        </div>
                    ) : (
                        <button 
                            className="btn btn-primary btn-block"
                            onClick={() => setShowContact(true)}
                        >
                            Show Contact Details
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PropertyPage;