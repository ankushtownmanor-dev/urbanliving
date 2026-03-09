// import React from "react";
// import "./Home5.css";
// import { ShieldCheck, Users, Headphones, CalendarClock } from "lucide-react";

// const Home5 = () => {
//   const data = [
//     {
//       icon:"/siki1.png",
//       title: "Verified Properties",
//       text: "Every property is hand-picked and verified for quality and safety",
//     },
//     {
//       icon: "/siki2.png",
//       title: "Prime Locations",
//       text: "Our homes are located in well-connected neighborhoods, offering easy access to key areas and daily essentials",
//     },
//     {
//       icon: "/siki3.png",
//       title: "Dedicated Support",
//       text: "Our support team is available during service hours to assist you promptly and ensure a smooth living experience.",
//     },
//     {
//       icon:"/siki4.png",
//       title: "Transparent Pricing",
//       text: "We follow a clear and honest pricing structure with no hidden charges, ensuring complete clarity in billing at every step.",
//     },
//   ];

//   return (
//     <div className="why-container-97">
//       <h2 className="why-heading-97">Why Choose OvikaLiving ?</h2>

//       <div className="why-grid-97">
//         {data.map((item, index) => (
//           <div key={index} className="why-card-97">
//             <img className="why-icon-97" src={item.icon}/>
//             <h3 className="why-title-97">{item.title}</h3>
//             <p className="why-text-97">{item.text}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home5;
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PROPERTIES = [
  { city: 'Noida',         tag: 'Most Booked', price: '₹4,500', per: 'night', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80', desc: 'Sector 62 · 2BHK · Pool View' },
  { city: 'Gurugram',      tag: 'Premium',     price: '₹7,200', per: 'night', img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80', desc: 'Golf Course Rd · 3BHK · Fully Furnished' },
  { city: 'Delhi',         tag: 'Signature',   price: '₹6,000', per: 'night', img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80', desc: 'South Delhi · 3BHK · Luxury Interior' },
  { city: 'Greater Noida', tag: 'New',         price: '₹3,800', per: 'night', img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80', desc: 'Omega · 2BHK · Modern Amenities' },
  { city: 'Ghaziabad',     tag: 'Value Pick',  price: '₹2,900', per: 'night', img: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&q=80', desc: 'Indirapuram · 2BHK · Metro Nearby' },
  { city: 'Lucknow',       tag: 'Popular',     price: '₹3,500', per: 'night', img: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&q=80', desc: 'Gomti Nagar · 3BHK · Heritage Touch' },
  { city: 'Agra',          tag: 'Heritage',    price: '₹5,500', per: 'night', img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80', desc: 'Taj Nagri · 2BHK · Taj View' },
  { city: 'Varanasi',      tag: 'Spiritual',   price: '₹4,200', per: 'night', img: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=600&q=80', desc: 'Assi Ghat · 2BHK · River View' },
  { city: 'Dehradun',      tag: 'Hill Escape', price: '₹5,800', per: 'night', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', desc: 'Rajpur Road · 3BHK · Mountain View' },
  { city: 'Haridwar',      tag: 'Spiritual',   price: '₹3,200', per: 'night', img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80', desc: 'Near Ganga Ghat · 2BHK · Peaceful' },
];

const TAG_COLORS = {
  'Most Booked': { bg: '#fff3e0', color: '#e65100' },
  'Premium':     { bg: '#f3e5f5', color: '#6a1b9a' },
  'Signature':   { bg: '#fce4ec', color: '#880e4f' },
  'New':         { bg: '#e8f5e9', color: '#1b5e20' },
  'Value Pick':  { bg: '#e3f2fd', color: '#0d47a1' },
  'Popular':     { bg: '#fff8e1', color: '#f57f17' },
  'Heritage':    { bg: '#efebe9', color: '#4e342e' },
  'Spiritual':   { bg: '#fce4ec', color: '#880e4f' },
  'Hill Escape': { bg: '#e0f2f1', color: '#004d40' },
};

export default function SignatureStays() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const scroll = dir => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
  };

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  return (
    <section
      id="signature-stays-section"
      style={{
        width: '100%',
        padding: isMobile ? 'clamp(2rem, 5vw, 3.5rem) 0 clamp(2.5rem, 5vw, 4rem)' : 'clamp(2rem, 5vw, 3.5rem) 0 clamp(2.5rem, 5vw, 4rem)',
        background: 'white',
        boxSizing: 'border-box',
        fontFamily: 'Poppins, sans-serif',
        overflow: 'hidden',
      }}
    >

      {/* ── Header — CENTER ── */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(1.2rem, 3vw, 2rem)', padding: '0 1.5rem' }}>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          {/* <span style={{ display: 'block', width: 32, height: 2, background: 'linear-gradient(90deg, transparent, #c2772b)', borderRadius: 2 }}/> */}
          {/* <span style={{ fontSize: 'clamp(0.65rem, 0.9vw, 0.78rem)', fontWeight: 600, color: '#c2772b', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Curated Collection
          </span> */}
          {/* <span style={{ display: 'block', width: 32, height: 2, background: 'linear-gradient(90deg, #c2772b, transparent)', borderRadius: 2 }}/> */}
        </div>

        <h2 style={{
          fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
          fontWeight: 700,
          color: '#1a0f00',
          margin: '0 0 0.4rem',
          fontFamily: "Georgia, 'Times New Roman', serif",
          letterSpacing: '-0.3px',
        }}>
          OvikaLiving <span style={{ color: '#c2772b' }}>Signature Stays</span>
        </h2>

        {/* <p style={{
          fontSize: 'clamp(0.78rem, 1.1vw, 0.95rem)',
          color: '#7a6b57',
          margin: 0,
          maxWidth: 520,
          marginLeft: 'auto',
          marginRight: 'auto',
          lineHeight: 1.6,
        }}>
          Hand-picked premium properties across India's finest cities — verified quality, curated comfort.
        </p> */}
      </div>

      {/* ── Carousel wrapper ── */}
      <div style={{ position: 'relative', width: '100%' }}>

        {/* Left arrow */}
        <button
          onClick={() => scroll('left')}
          style={{
            position: 'absolute', left: 12, top: '50%', transform: 'translateY(-60%)',
            zIndex: 10, width: 40, height: 40, borderRadius: '50%',
            border: '1.5px solid #e0c9a0',
            background: canLeft ? '#fff' : 'rgba(255,255,255,0.5)',
            boxShadow: canLeft ? '0 4px 16px rgba(194,119,43,0.18)' : 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: canLeft ? 'pointer' : 'default',
            transition: 'all 0.2s',
            opacity: canLeft ? 1 : 0.35,
          }}
        >
          <ChevronLeft size={18} color="#c2772b"/>
        </button>

        {/* Right arrow */}
        <button
          onClick={() => scroll('right')}
          style={{
            position: 'absolute', right: 12, top: '50%', transform: 'translateY(-60%)',
            zIndex: 10, width: 40, height: 40, borderRadius: '50%',
            border: '1.5px solid #e0c9a0',
            background: canRight ? '#fff' : 'rgba(255,255,255,0.5)',
            boxShadow: canRight ? '0 4px 16px rgba(194,119,43,0.18)' : 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: canRight ? 'pointer' : 'default',
            transition: 'all 0.2s',
            opacity: canRight ? 1 : 0.35,
          }}
        >
          <ChevronRight size={18} color="#c2772b"/>
        </button>

        {/* Scroll container */}
        <div
          ref={scrollRef}
          onScroll={onScroll}
          style={{
            display: 'flex',
            gap: 'clamp(12px, 1.5vw, 20px)',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            padding: isMobile
              ? '0.5rem 16px 1.5rem'
              : '0.5rem clamp(48px, 5vw, 64px) 1.5rem',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {PROPERTIES.map((p, i) => {
            const isHovered = hoveredIdx === i;
            const tagStyle = TAG_COLORS[p.tag] || { bg: '#f5f5f5', color: '#555' };
            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => navigate(`/properties?city=${encodeURIComponent(p.city)}`)}
                style={{
                  flexShrink: 0,
                  scrollSnapAlign: 'start',
                  width: 'clamp(220px, 22vw, 280px)',
                  borderRadius: 20,
                  overflow: 'hidden',
                  background: '#fff',
                  cursor: 'pointer',
                  boxShadow: isHovered
                    ? '0 16px 48px rgba(194,119,43,0.22), 0 4px 16px rgba(0,0,0,0.1)'
                    : '0 4px 20px rgba(0,0,0,0.08)',
                  transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                  transition: 'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease',
                  border: isHovered ? '1.5px solid rgba(194,119,43,0.3)' : '1.5px solid transparent',
                }}
              >
                {/* Image */}
                <div style={{ position: 'relative', height: 168, overflow: 'hidden' }}>
                  <img
                    src={p.img} alt={p.city}
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                      transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                      transition: 'transform 0.4s ease',
                    }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(20,10,0,0.55) 0%, transparent 55%)',
                  }}/>
                  {/* Tag */}
                  <div style={{
                    position: 'absolute', top: 10, left: 10,
                    background: tagStyle.bg, color: tagStyle.color,
                    fontSize: '0.6rem', fontWeight: 700,
                    padding: '3px 9px', borderRadius: 20,
                    letterSpacing: '0.4px', textTransform: 'uppercase',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}>
                    {p.tag}
                  </div>
                  {/* City name on image */}
                  <div style={{
                    position: 'absolute', bottom: 10, left: 12,
                    color: '#fff',
                    fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
                    fontWeight: 700,
                    textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                    letterSpacing: '0.2px',
                  }}>
                    {p.city}
                  </div>
                </div>

                {/* Card body */}
                <div style={{ padding: '12px 14px 14px' }}>
                  <p style={{
                    fontSize: '0.72rem', color: '#9a8a78', margin: '0 0 8px',
                    lineHeight: 1.4, display: 'flex', alignItems: 'center', gap: 4,
                  }}>
                    <span style={{ color: '#c2772b', fontSize: '0.68rem' }}>📍</span>
                    {p.desc}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', fontWeight: 700, color: '#1a0f00' }}>
                        {p.price}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: '#aaa', marginLeft: 3 }}>/ {p.per}</span>
                    </div>
                    <div style={{
                      fontSize: '0.68rem', color: '#c2772b', fontWeight: 600,
                      display: 'flex', alignItems: 'center', gap: 3,
                      opacity: isHovered ? 1 : 0.7,
                      transition: 'opacity 0.2s',
                    }}>
                      View →
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── CTA Button ── */}
      <div style={{ textAlign: 'center', marginTop: 'clamp(0.5rem, 2vw, 1.2rem)' }}>
        <button
          onClick={() => navigate('/properties')}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 10px 32px rgba(194,119,43,0.55)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(194,119,43,0.4)';
          }}
          style={{
            background: 'linear-gradient(135deg, #c2772b 0%, #a85e1f 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 50,
            padding: 'clamp(10px, 1.5vw, 14px) clamp(24px, 3vw, 40px)',
            fontSize: 'clamp(0.78rem, 1vw, 0.92rem)',
            fontWeight: 600,
            cursor: 'pointer',
            letterSpacing: '0.4px',
            boxShadow: '0 6px 24px rgba(194,119,43,0.4)',
            fontFamily: 'Poppins, sans-serif',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
        >
          View All Signature Stays ✦
        </button>
      </div>

    </section>
  );
}
