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


function Home() {
  return (
   <>
   {/* <Navbar/> */}
   <MainBanner/>
   {/* <HowItWorks/> */}
 <MainTmFeature/>
   <BookingSteps/>
 <EliteProperties/>

   <ListYourPropertyTM/>
   {/* <HoomieFooter/> */}
   </>
  )
}

export default Home