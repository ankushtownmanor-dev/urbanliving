import React from 'react'
import HowWeWork from './HowWeWork'
import BookingSteps from './BookingSteps'

function MainHow() {
  return (
   <div className="main_banner_container">
      <div className="desktop-banner">
        < BookingSteps/>
      </div> 
      <div className="mobile-banner">
        {/* <BannerMobile /> */}
        <HowWeWork/>
      </div>
    </div>
  )
}

export default MainHow