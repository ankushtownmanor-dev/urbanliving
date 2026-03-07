import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Search, ChevronDown } from 'lucide-react';
import './Home1.css';

export default function Home1() {
  const navigate = useNavigate();
  const [rentalType, setRentalType] = useState(null);
  
  // Search bar state
  const [city, setCity] = useState('Noida');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [cities, setCities] = useState(['Noida', 'Gurugram', 'Delhi', 'Mumbai', 'Bengaluru']); // Default while loading

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch('https://townmanor.ai/api/ovika/properties');
        if (!res.ok) throw new Error('Fetch failed');
        const data = await res.json();
        const list = data?.data || [];
        
        // Extract unique cities from property list
        let uniqueCities = [...new Set(list.map(p => p.city).filter(Boolean))];

        uniqueCities = uniqueCities
          .filter(c => !statesToExclude.includes(c))
          .sort();

        if (uniqueCities.length > 0) {
          setCities(uniqueCities);
          // Set first city as default if Noida isn't in the list
          if (!uniqueCities.includes('Noida')) {
            setCity(uniqueCities[0]);
          }
        }
      } catch (err) {
        console.error('Error fetching cities:', err);
      }
    };

    fetchCities();

    const type = sessionStorage.getItem('ovika_rental_type');
    setRentalType(type);

    const interval = setInterval(() => {
      const updated = sessionStorage.getItem('ovika_rental_type');
      setRentalType(updated);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const pricingLabel = rentalType === 'short'
    ? ' — Per Night'
    : rentalType === 'long'
    ? ' — Per Month'
    : '';

  const cards = [
    {
      icon: '🏠',
      title: 'PG',
      subtitle: `Affordable stays${pricingLabel}`,
      desc: 'Ideal for students & professionals.',
      category: 'PG',
    },
    {
      icon: '🏢',
      title: 'Economy Stay',
      subtitle: `Comfort at great value${pricingLabel}`,
      desc: 'Well-furnished homes with modern amenities.',
      category: 'Economy Stay',
    },
    {
      icon: '✨',
      title: 'Premium Stay',
      subtitle: `Refined living experience${pricingLabel}`,
      desc: 'Enhanced comfort with premium facilities.',
      category: 'Premium Stay',
    },
  ];

  // Build URL with both category + rentalType
  const buildHref = (category) => {
    const params = new URLSearchParams();
    params.set('category', category);
    if (rentalType) params.set('rentalType', rentalType);
    return `/properties?${params.toString()}`;
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (city) {
      params.set('city', city);
      params.set('search', city); // PropertyListPage logic matches on 'search'
    }
    if (rentalType) params.set('rentalType', rentalType);
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (guests) params.set('guests', guests.toString());
    
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="ovika-urban-hero-container">
      <div className="ovika-urban-hero-bg"></div>

      <div className="ovika-urban-hero-wrapper">
        {/* Left Content */}
        <div className="ovika-hero-left">
          <h1 className="ovika-urban-hero-heading">
            <span className="ovika-brand-name">OvikaLiving.com</span> – India's Smart Stay Marketplace
          </h1>
        </div>

        {/* Right Cards */}
        <div className="ovika-hero-cards">
          {cards.map((card, i) => (
            <a
              key={i}
              href={buildHref(card.category)}
              className="ovika-hero-card"
              style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}
            >
              <div className="ovika-card-icon">{card.icon}</div>
              <div className="ovika-card-body">
                <h3 className="ovika-card-title">{card.title}</h3>
                <p className="ovika-card-subtitle">{card.subtitle}</p>
                <p className="ovika-card-desc">{card.desc}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Search Bar section moved outside to be centered at bottom */}
        <div className="ovika-search-section">
          <div className="ovika-search-title">
            <MapPin className="pin-icon" size={22} />
            <span>Where are you going?</span>
          </div>
          
          <div className="ovika-search-bar-container">
            {/* Location / City Selection */}
            <div className="ovika-search-field city-field" onClick={() => setShowCityDropdown(!showCityDropdown)}>
              <div className="field-icon-box">
                <MapPin size={18} style={{ color: '#f5a623' }} />
              </div>
              <div className="field-text">
                <span className="field-value" style={{ marginLeft: '4px' }}>{city}</span>
              </div>
              {showCityDropdown && (
                <div className="city-dropdown">
                  {cities.map(c => (
                    <div 
                      key={c} 
                      className="city-option"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCity(c);
                        setShowCityDropdown(false);
                      }}
                    >
                      {c}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="field-divider"></div>
            
            {/* Check-in */}
            <div className="ovika-search-field">
              <div className="field-icon-box">
                <Calendar size={18} />
              </div>
              <div className="field-text">
                <span className="field-label">Check-in</span>
                <input 
                  type="date" 
                  className="date-input" 
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
            </div>
            
            <div className="field-divider"></div>
            
            {/* Check-out */}
            <div className="ovika-search-field">
              <div className="field-icon-box">
                <Calendar size={18} />
              </div>
              <div className="field-text">
                <span className="field-label">Check-out</span>
                <input 
                  type="date" 
                  className="date-input"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
            </div>
            
            <div className="field-divider"></div>
            
            {/* Guests */}
            <div className="ovika-search-field guests-field">
              <div className="field-icon-box">
                <Users size={18} />
              </div>
              <div className="field-text">
                <span className="field-value">{guests} Guests</span>
              </div>
              <div className="guest-controls">
                <button onClick={(e) => { e.stopPropagation(); setGuests(Math.max(1, guests - 1)) }}>-</button>
                <button onClick={(e) => { e.stopPropagation(); setGuests(guests + 1) }}>+</button>
              </div>
            </div>
            
            <button className="ovika-search-btn" onClick={handleSearch}>
              <Search size={20} />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}