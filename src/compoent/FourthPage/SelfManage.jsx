// import react from "react"
import PropertyShare from "./PropertyShare"
import ListProperty from "./ListProperty"
import PropertyControl from "./PropertyControl"
import Testimonials from "./Testimonials"
import FAQ from "./FAQ"
import PropertyShareForm from "./PropertyShareForm"
function SelfManage(){
    return(
        <>
        <PropertyShare/>
        <ListProperty/>
        <PropertyControl/>  
        <Testimonials/>  
        <FAQ/>   
        <PropertyShareForm/>
        
        </>
    )
}
export default SelfManage