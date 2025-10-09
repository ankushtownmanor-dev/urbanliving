


import React from 'react'
import './tmxluxe-why.css'
import { FaHouseChimney } from 'react-icons/fa6'
import { CiLocationOn } from 'react-icons/ci'
import { RiCustomerService2Fill } from 'react-icons/ri'
import { MdOutlineWorkspacePremium } from 'react-icons/md'
import { BsHouseDoor } from 'react-icons/bs'

function LuxeWhyChoose() {
  const cardStyle = {
  background: '#fff',
  borderRadius: '12px',
  border: 'none',
  padding: '18px 14px',
  boxShadow: '0 8px 20px rgba(0,0,0,0.18)',
  width: '100%',
  maxWidth: '340px',
  margin: '0 auto',
  textAlign: 'center',
  transition: 'box-shadow .2s, transform .18s',
};
const gridStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '22px',
  alignItems: 'center',
  width: '100%',
  margin: '0 auto'
};

  // Mobile styles
  const mobileStyles = {
    section: {
      padding: window.innerWidth <= 640 ? '48px 16px 40px' : '56px 24px 72px'
    },
    title: {
      background: window.innerWidth <= 640 ? '#ffffff' : 'transparent',
      padding: window.innerWidth <= 640 ? '12px 0' : '0',
      margin: window.innerWidth <= 640 ? '0 0 32px' : '0 0 10px'
    },
    grid: {
      maxWidth: window.innerWidth <= 640 ? '360px' : '1160px',
      margin: '0 auto'
    },
    card: {
      padding: window.innerWidth <= 640 ? '20px 20px' : '28px',
      boxShadow: window.innerWidth <= 640 ? '0 3px 12px rgba(0, 0, 0, 0.15)' : '0 16px 36px rgba(14, 23, 38, 0.06)'
    }
  }

  return (
  <>
  <section className="tmxluxe-why" style={mobileStyles.section}>
      <div className="tmxluxe-why-container">
        <h2 className="tmxluxe-why-title" style={mobileStyles.title}>Why Choose TM Luxe?</h2>
        <p className="tmxluxe-why-sub">
          Experience unparalleled luxury and comfort with our premium hospitality
          services
        </p>
        
        <div className="tmxluxe-why-grid" style={mobileStyles.grid}>
          <div className='tmxluxe-why-grid' style={mobileStyles.grid}></div>
          <article className="tmxluxe-why-card" style={mobileStyles.card}>
            <div className="tmxluxe-why-iconwrap">
              <span className="tmxluxe-why-icon"><BsHouseDoor size={30} color='red' /></span>
            </div>
            <h3 className="tmxluxe-why-card-title">Sophisticated Interiors</h3>
            <p className="tmxluxe-why-card-text">
              Meticulously designed spaces featuring premium materials, elegant
              furnishings, and thoughtful details that create an atmosphere of
              refined luxury.
            </p>
          </article>
          
          <article className="tmxluxe-why-card" style={mobileStyles.card}>
            <div className="tmxluxe-why-iconwrap">
              <span className="tmxluxe-why-icon"><CiLocationOn size={30} color='red' /></span>
            </div>
            <h3 className="tmxluxe-why-card-title">Prime Locations</h3>
            <p className="tmxluxe-why-card-text">
              Strategically positioned in the heart of major cities and
              exclusive destinations, offering unparalleled access to business
              districts and cultural attractions.
            </p>
          </article>
          
          <article className="tmxluxe-why-card" style={mobileStyles.card}>
            <div className="tmxluxe-why-iconwrap is-primary">
              <span className="tmxluxe-why-icon is-contrast"><RiCustomerService2Fill size={30} color='red' /></span>
            </div>
            <h3 className="tmxluxe-why-card-title">Exceptional Service</h3>
            <p className="tmxluxe-why-card-text">
              24/7 personalized concierge service with multilingual staff
              dedicated to exceeding expectations and creating memorable
              experiences for every guest.
            </p>
          </article>
          
          <article className="tmxluxe-why-card" style={mobileStyles.card}>
            <div className="tmxluxe-why-iconwrap">
              <span className="tmxluxe-why-icon"><MdOutlineWorkspacePremium size={30} color='red'/></span>
            </div>
            <h3 className="tmxluxe-why-card-title">Premium Amenities</h3>
            <p className="tmxluxe-why-card-text">
              World-class facilities including spa services, fine dining
              restaurants, fitness centers, and exclusive lounges designed for
              the discerning traveler.
            </p>
          </article>
        </div>
      </div>
    </section>
  </>
  )
}

export default LuxeWhyChoose