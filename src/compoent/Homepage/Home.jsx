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

function Home() {
  return (
   <>
   <Helmet>
     <title>Ovika – Smart & Stylish Living Spaces | Comfort & Freedom</title>
     <meta
       name="description"
       content="Discover Ovika’s smart and stylish living spaces. From shared to independent homes, enjoy comfort, flexibility, and modern living designed for every lifestyle."
     />
     <meta
       name="keywords"
       content="rental house in Noida, rental room in Noida, apartment for rent in Noida, fully furnished apartment in Noida, 1 BHK rental house in Noida, 2 BHK rental house in Noida, flat for rent in Noida Sector 62, flat for rent in Noida Sector 137, Noida Extension rental house, PG and rooms for rent in Noida, rental house in Delhi, rental room in Delhi, flat for rent in South Delhi, flat for rent in East Delhi, flat for rent in West Delhi, flat for rent in North Delhi, fully furnished apartment in Delhi, no brokerage room rent in Delhi, rental property management in Delhi, independent house for rent in Delhi, rental house in Gurgaon, rental room in Gurgaon, apartment for rent in Gurgaon, fully furnished apartment in Gurgaon, 1 BHK rental house in Gurgaon, 2 BHK flat for rent in Gurgaon, flat for rent near Cyber City Gurgaon, flat for rent in DLF Phase 1 Gurgaon, flat for rent in MG Road Gurgaon, no brokerage rooms in Gurgaon, rent my property in Noida, rent my property in Delhi, rent my property in Gurgaon, no brokerage room rent in Noida, rental and property management in Noida, rental and property management in Delhi NCR, rooms in a house for rent in NCR, fully furnished apartment for rent in NCR"
     />
     <meta name="robots" content="index,follow" />
     <meta property="og:title" content="Ovika – Smart & Stylish Living Spaces | Comfort & Freedom" />
     <meta property="og:description" content="Discover Ovika’s smart and stylish living spaces. From shared to independent homes, enjoy comfort, flexibility, and modern living designed for every lifestyle." />
     <meta property="og:type" content="website" />
     <meta name="twitter:card" content="summary_large_image" />
     <meta name="twitter:title" content="Ovika – Smart & Stylish Living Spaces | Comfort & Freedom" />
     <meta name="twitter:description" content="Discover Ovika’s smart and stylish living spaces. From shared to independent homes, enjoy comfort, flexibility, and modern living designed for every lifestyle." />
   </Helmet>
   {/* <Navbar/> */}
   <MainBanner/>
   {/* <HowItWorks/> */}
 <MainTmFeature/>
   <BookingSteps/>
 <EliteProperties/>
  <FloatingSearch/>
   <ListYourPropertyTM/>
   {/* <HoomieFooter/> */}
   </>
  )
}

export default Home