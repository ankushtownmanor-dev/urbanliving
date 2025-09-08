import React from 'react'
import TMFeatures from './TMFeatures'
import TMFeaturesMobile from './TMFeaturesMobile'

function MainTmFeature() {
  return (
    <>
    <div className="main_banner_container">
      <div className="desktop-banner">
        <TMFeatures/>
      </div>
      <div className="mobile-banner">
        <TMFeaturesMobile/>
      </div>
    </div>
    
    </>
  )
}

export default MainTmFeature