import React from 'react'
import Owner from './Owner.jsx'
import ManageListings from './ManageListings.jsx'
import ChooseOvika from './ChooseOvika.jsx'
// import OwnersSection from './OwnersSection.jsx'
import FAQOvika from './FAQOvika.jsx'
// import OwnweForm from './OwnerForm.jsx'
import ManageTestimonials from './ManageTestimonials.jsx'
import OvikaConsultForm from './OvikaConsultForm.jsx'
// import FAQManage from './FAQManage.jsx'
function Ownermain() {
  return (
    <>
    <Owner/>
    <ManageListings/>
    <ChooseOvika/>
    {/* <OwnersSection/> */}
    <ManageTestimonials/>

    <FAQOvika/> 
    {/* <FAQManage/> */}
    {/* <OwnweForm/> */}
    <OvikaConsultForm/>

    </>
  )
}

export default Ownermain