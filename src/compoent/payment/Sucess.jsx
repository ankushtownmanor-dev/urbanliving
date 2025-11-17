// import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import './Sucess.css'

// function Sucess() {
//   const [bookingId, setBookingId] = useState(localStorage.getItem('bookingId') || 6)
//   const [confirmation, setConfirmation] = useState(null)
//   const [secondsLeft, setSecondsLeft] = useState(4)
//   const navigate = useNavigate()

//   useEffect(() => {
//     const patchBookingStatus = async () => {
//       try {
//         const id = bookingId || 6
//         const response = await fetch(`https://townmanor.ai/api/booking/${id}/status`, {
//           method: 'PATCH',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ booking_status: 'confirmed' }),
//         })

//         if (!response.ok) {
//           throw new Error('Failed to update booking status')
//         }

//         // Show exactly the expected response shape
//         setConfirmation({ booking_status: 'confirmed' })
//       } catch (error) {
//         console.error('Update booking status error:', error)
//       }
//     }
//     patchBookingStatus()
//   }, [bookingId])

//   // Start countdown on mount and navigate after 4 seconds
//   useEffect(() => {
//     setSecondsLeft(4)
//     const intervalId = setInterval(() => {
//       setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0))
//     }, 1000)

//     const timeoutId = setTimeout(() => {
//       navigate('/dashboard')
//     }, 4000)

//     return () => {
//       clearInterval(intervalId)
//       clearTimeout(timeoutId)
//     }
//   }, [navigate])

//   return (
//     <>
//       <main className="success-page" role="main" aria-label="Success confirmation">
//         <section className="success-card" role="status" aria-live="polite">
//           {/* Gradient ring with white inner circle */}
//           <div className="icon-ring" aria-hidden="true">
//             <div className="icon-circle">
//               {/* Inline SVG used here for Playground preview. In your app, replace with FaCheckCircle from react-icons. */}
//               <svg
//                 className="success-icon"
//                 width="70"
//                 height="70"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm-1.003 14.2a1 1 0 0 1-1.414 0l-3.2-3.2a1 1 0 1 1 1.414-1.414l2.493 2.493 5.4-5.4a1 1 0 1 1 1.414 1.414l-6.1 6.107Z" />
//               </svg>
//             </div>
//           </div>

//           <h1 className="title">Success!</h1>
//           <p className="message">
//             Your Booking Successfully confirmed ... Redirecting to dashboard in {secondsLeft}s
//           </p>

//           {confirmation && (
//             <div className="confirmation">
//               <pre>{JSON.stringify(confirmation)}</pre>
//             </div>
//           )}

//           <div className="actions">
//             {/* <button className="btn btn-primary" aria-label="Continue">
//               Continue
//             </button> */}
//             <button className="btn btn-secondary" aria-label="Go back to home" onClick={()=>navigate('/')}>
//               Back to Home
//             </button>
//           </div>
//         </section>
//       </main>
//     </>
//   )
// }

// export default Sucess


import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import { format, differenceInDays } from 'date-fns'
import './Sucess.css'

function Sucess() {
  const [bookingId, setBookingId] = useState(localStorage.getItem('bookingId') || 6)
  const [confirmation, setConfirmation] = useState(null)
  const [secondsLeft, setSecondsLeft] = useState(4)
  const [emailSent, setEmailSent] = useState(false)
  const navigate = useNavigate()

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("Jv4HT7o1ji_gU5PJ0") // Replace with your actual EmailJS public key
  }, [])

  // Send booking confirmation email
  const sendBookingConfirmationEmail = async () => {
    try {
      // Get booking data
      const bookingId = localStorage.getItem('bookingId')
      const propertyId = localStorage.getItem('property_id')
      
      // Fetch property details
      const propertyRes = await fetch(`https://townmanor.ai/api/properties/${propertyId}`)
      const propertyData = await propertyRes.json()
      const property = propertyData.property
      
      // Fetch booking details
      const bookingRes = await fetch(`https://townmanor.ai/api/booking/${bookingId}`)
      const bookingData = await bookingRes.json()
      const booking = bookingData.booking
      
      // Get user data from localStorage
      const userLocal = JSON.parse(localStorage.getItem('user') || '{}')
      
      // Calculate nights
      const nights = differenceInDays(
        new Date(booking.end_date), 
        new Date(booking.start_date)
      )
      
      // Prepare email parameters
      const emailParams = {
        to_email: userLocal.email || booking.email || '',
        to_name: userLocal.username || booking.username || 'Guest',
        property_name: property?.name || 'Property',
        check_in_date: format(new Date(booking.start_date), 'dd MMM yyyy'),
        check_out_date: format(new Date(booking.end_date), 'dd MMM yyyy'),
        total_amount: booking.total_price || '0.00',
        subtotal: (booking.total_price / 1.05).toFixed(2) || '0.00',
        gst: (booking.total_price * 0.05 / 1.05).toFixed(2) || '0.00',
        booking_id: bookingId || 'N/A',
        phone_number: booking.phone_number || '',
        property_address: property?.address || '',
        nights: nights,
      }

      // Send email using EmailJS
      const response = await emailjs.send(
        'service_ggypt4s',      // Replace with your Service ID
        'template_irruvtk',     // Replace with your Template ID
        emailParams
      )

      console.log('Email sent successfully:', response)
      setEmailSent(true)
      return true
    } catch (error) {
      console.error('Failed to send email:', error)
      return false
    }
  }

  useEffect(() => {
    const patchBookingStatus = async () => {
      try {
        const id = bookingId || 6
        const response = await fetch(`https://townmanor.ai/api/booking/${id}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ booking_status: 'confirmed' }),
        })

        if (!response.ok) {
          throw new Error('Failed to update booking status')
        }

        // Update booking status
        setConfirmation({ booking_status: 'confirmed' })
        
        // Send confirmation email after booking is confirmed
        await sendBookingConfirmationEmail()
      } catch (error) {
        console.error('Update booking status error:', error)
      }
    }
    patchBookingStatus()
  }, [bookingId])

  // Start countdown on mount and navigate after 4 seconds
  useEffect(() => {
    setSecondsLeft(4)
    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    const timeoutId = setTimeout(() => {
      navigate('/dashboard')
    }, 4000)

    return () => {
      clearInterval(intervalId)
      clearTimeout(timeoutId)
    }
  }, [navigate])

  return (
    <>
      <main className="success-page" role="main" aria-label="Success confirmation">
        <section className="success-card" role="status" aria-live="polite">
          {/* Gradient ring with white inner circle */}
          <div className="icon-ring" aria-hidden="true">
            <div className="icon-circle">
              <svg
                className="success-icon"
                width="70"
                height="70"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm-1.003 14.2a1 1 0 0 1-1.414 0l-3.2-3.2a1 1 0 1 1 1.414-1.414l2.493 2.493 5.4-5.4a1 1 0 1 1 1.414 1.414l-6.1 6.107Z" />
              </svg>
            </div>
          </div>

          <h1 className="title">Success!</h1>
          <p className="message">
            Your Booking Successfully confirmed ... Redirecting to dashboard in {secondsLeft}s
          </p>
          
          {emailSent && (
            <p className="email-confirmation">Booking confirmation email sent to your inbox!</p>
          )}

          {confirmation && (
            <div className="confirmation">
              <pre>{JSON.stringify(confirmation)}</pre>
            </div>
          )}

          <div className="actions">
            <button className="btn btn-secondary" aria-label="Go back to home" onClick={()=>navigate('/')}>
              Back to Home
            </button>
          </div>
        </section>
      </main>
    </>
  )
}

export default Sucess