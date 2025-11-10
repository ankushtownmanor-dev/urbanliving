// import react from "react"
import PropertyShare from "./PropertyShare"
import ListProperty from "./ListProperty"
// import PropertyControl from "./PropertyControl"
// import Testimonials from "./Testimonials"
import FAQ from "./FAQ"
// import PropertyShareForm from "./PropertyShareForm"
import OvikaTestimonials from "./OvikaTestimonials"
import PropertyConsultForm from "./PropertyConsultForm"
import PropertyControlSection from "./PropertyControlSection"
function SelfManage(){
    return(
        <>
        <PropertyShare/>
        <ListProperty/>
         {/* <PropertyControl/> */}
         <PropertyControlSection/>
        <OvikaTestimonials/>
        {/* <Testimonials/>   */}
        <FAQ/>   
        {/* <PropertyShareForm/> */}
        <PropertyConsultForm/>

        </>
    )
}
export default SelfManage