import React from 'react'
// import LuxeBanner from './LuxeBanner'
import LuxeProperties from './LuxeProperties'
// import LuxeResidentReviews from './LuxeResidentReviews'
import { Helmet } from 'react-helmet'
import LuxeHeroTM from './LuxeHeroTM'
import TMLuxeWhyChoose from './TMLuxeWhyChoose'
import TMXLuxeTestimonialsCard from './TMXLuxeTestimonialsCard'

function LuxeMain() {
  return (
    <>
     <Helmet>

      <title>Ovika Luxe – Premium Apartments for Rent | Airbnb-Style Living</title>


      <meta
        name="description"
        content="Experience Ovika Luxe premium apartments with Airbnb-style flexibility. Stylish, fully furnished homes for short & long stays in Delhi, Noida & Gurgaon."
      />

     
      <meta
        name="keywords"
        content="Ovika Luxe, premium apartments Delhi, Airbnb style apartments, luxury apartments Noida, serviced apartments Gurgaon, furnished apartments for rent, short stay apartments, monthly rentals Noida, flexible rentals Gurgaon"
      />

      {/* 🔹 Open Graph / Social Sharing */}
      <meta property="og:title" content="Ovika Luxe – Premium Apartments for Rent" />
      <meta
        property="og:description"
        content="Book premium Airbnb-style apartments with Ovika Luxe. Fully furnished, flexible rentals in Delhi, Noida & Gurgaon."
      />
      <meta property="og:url" content="https://www.ovika.co.in/tmluxe" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.ovika.co.in/images/tmluxe-cover.jpg" />

      {/* 🔹 Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Ovika Luxe – Premium Apartments for Rent" />
      <meta
        name="twitter:description"
        content="Premium Airbnb-style apartments in Delhi NCR. Ovika Luxe offers stylish, fully furnished rentals for short & long stays."
      />
      <meta name="twitter:image" content="https://www.ovika.co.in/images/tmluxe-cover.jpg" />
    </Helmet>
    <LuxeHeroTM/>
    <TMLuxeWhyChoose/>

    {/* <LuxeBanner/> */}

    <LuxeProperties/>
    <TMXLuxeTestimonialsCard/>
    {/* <LuxeResidentReviews/> */}
    </>
  )
}

export default LuxeMain