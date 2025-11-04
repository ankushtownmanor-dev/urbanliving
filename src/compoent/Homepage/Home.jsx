import React from 'react'

import Banner from './Banner'
import TMFeatures from './TMFeatures'
import BookingSteps from './BookingSteps'
import ListYourPropertyTM from './ListYourPropertyTM'
import HoomieFooter from './HoomieFooter'
import Navbar from './Navbar'
import MainBanner from './MainBanner'
import MainTmFeature from './MainTmFeature'
import EliteProperties from './EliteProperties'
import FloatingSearch from './FloatingSearch'
import { Helmet } from 'react-helmet'
import MainHow from './MainHow'

function Home() {
  return (
   <>
   <Helmet>
     <title>OVIKA – Premium Living Spaces in Noida & Greater Noida | Smart Urban Living</title>
     <meta
       name="description"
       content="From shared to stylish – OVIKA offers premium living spaces in Noida & Greater Noida. Explore Luxe, Stay & Hive or partner with us to list your property."
     />
     <meta
       name="keywords"
       content="ovika, ovika noida, ovika greater noida, ovika smart urban living, tm luxe noida, tm luxe greater noida, luxe 1 studio noida, luxe 2 suite noida, premium serviced apartments noida, premium studio stay noida, short term stays noida, corporate stay noida, co-living noida, tm stay noida, tm hive noida, premium pg noida, business stay greater noida, premium living spaces noida, luxury rentals noida, list your property ovika, lease property ovika, managed rental solutions noida, property management noida, premium 1bhk apartments noida, elegant stay noida"
     />
     <meta name="robots" content="index,follow" />
     <meta property="og:title" content="OVIKA – Premium Living Spaces in Noida & Greater Noida" />
     <meta property="og:description" content="From shared to stylish – OVIKA offers premium living spaces. Experience smart urban living with Luxe, Stay & Hive collections." />
     <meta property="og:type" content="website" />
     <meta name="twitter:card" content="summary_large_image" />
     <meta name="twitter:title" content="OVIKA – Premium Living Spaces in Noida & Greater Noida" />
     <meta name="twitter:description" content="Experience smart urban living with OVIKA's premium living spaces. Discover Luxe, Stay & Hive collections in Noida & Greater Noida." />
   </Helmet>
   {/* <Navbar/> */}
   <MainBanner/>
   {/* <HowItWorks/> */}
 <MainTmFeature/>
   {/* <BookingSteps/> */}
   <MainHow/>
 <EliteProperties/>
  <FloatingSearch/>
   <ListYourPropertyTM/>
   {/* <HoomieFooter/> */}
   </>
  )
}

export default Home