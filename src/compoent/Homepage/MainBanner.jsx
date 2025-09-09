import React from 'react'
import Banner from './Banner'
import BannerMobile from './BannerMobile'
import './MainBanner.css'
import SmartLiving from './SmartLiving'

function MainBanner() {
  return (
    <div className="main_banner_container">
      <div className="desktop-banner">
        <Banner />
      </div> 
      <div className="mobile-banner">
        {/* <BannerMobile /> */}
        <SmartLiving/>
      </div>
    </div>
  )
}

export default MainBanner
