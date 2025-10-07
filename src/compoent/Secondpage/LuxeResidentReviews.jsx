// import React from 'react'
// import './tmxluxe-resident.css'
// import { AiOutlineLike } from 'react-icons/ai';
// import { FaRegComment, FaStar, FaCircleUser } from 'react-icons/fa6';

// function LuxeResidentReviews() {
//   const Star = ({ filled = true }) => (
//     <span className={`tmxluxe-resi-star ${filled ? "is-filled" : ""}`}>★</span>
//   );

//   const LikeIcon = () => (
//     <svg className="tmxluxe-resi-ic" viewBox="0 0 24 24" aria-hidden="true">
//       <path d="M2 21h3V9H2v12zm19-11h-6.31l1-4.52.02-.23a1.75 1.75 0 0 0-3.35-.77L9 10.5V20h9a2 2 0 0 0 2-2l1-6a2 2 0 0 0-2-2z" fill="currentColor"/>
//     </svg>
//   );

//   const CommentIcon = () => (
//     <svg className="tmxluxe-resi-ic" viewBox="0 0 24 24" aria-hidden="true">
//       <path d="M21 6h-18a1 1 0 0 0-1 1v12l4-3h15a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1z" fill="currentColor"/>
//     </svg>
//   );

//   return (
//     <section className="tmxluxe-resi">
//       <div className="tmxluxe-resi-container">
//         <h2 className="tmxluxe-resi-title">What Our Resident Says</h2>

//         <div className="tmxluxe-resi-box">
//           {/* Review 1 */}
//           <article className="tmxluxe-resi-item">
//             <FaCircleUser className="tmxluxe-resi-avatar" size={56} />

//             <div className="tmxluxe-resi-content">
//               <div className="tmxluxe-resi-row">
//                 <h3 className="tmxluxe-resi-name">Akshay</h3>
//                 <span className="tmxluxe-resi-date">August 2025</span>
//               </div>

//               <div className="tmxluxe-resi-stars">
//                 <FaStar size={20} color='red' />
//                 <FaStar size={20} color='red' />
//                 <FaStar size={20} color='red' />
//                 <FaStar size={20} color='red' />
//                 <FaStar size={20} color='red' />
//               </div>

//               <p className="tmxluxe-resi-text">
//               "We had an amazing experience at Townmanor, and a big thank you to the owner for making it feel like our second home. The place is beautifully designed, peaceful, and thoughtfully maintained. We were the very first guests to stay here, which made our visit even more special. The owner was extremely kind and accommodating — allowing us an early check-in which made our arrival smooth and comfortable. Every corner of the home reflects warmth and care. Truly a hidden gem and a perfect getaway spot. Highly recommended for anyone looking for a cozy, welcoming stay!"
//               </p>

//               <div className="tmxluxe-resi-actions">
//               </div>
//             </div>
//           </article>

//           {/* Review 2 */}
//           <article className="tmxluxe-resi-item">
//             <FaCircleUser className="tmxluxe-resi-avatar" size={56} />

//             <div className="tmxluxe-resi-content">
//               <div className="tmxluxe-resi-row">
//                 <h3 className="tmxluxe-resi-name">pradeep</h3>
//                 <span className="tmxluxe-resi-date">1 week ago</span>
//               </div>

//               <div className="tmxluxe-resi-stars">
//                 <FaStar size={20} color='red' />
//                 <FaStar size={20} color='red' />
//                 <FaStar size={20} color='red' />
//                 <FaStar size={20} color='red' />
//                 <FaStar size={20} color='red' />
//               </div>

//               <p className="tmxluxe-resi-text">
//                 "I had an amazing two-night stay at this beautiful property! The space was spotless, very comfortable, and exactly as described in the listing. The host was incredibly welcoming and responsive throughout. I especially loved the cozy ambiance and thoughtful touches like fresh towels and tea coffee supplies and breakfast. The location is ideal for everyone because it is near the metro and offers easy access to Ola, Uber, and a variety of restaurants and shopping malls. I would absolutely recommend this place to anyone visiting, and I'd love to come back again!"
//               </p>

//               <div className="tmxluxe-resi-actions">

//               </div>
//             </div>
//           </article>
//         </div>
//       </div>
//     </section>
//   );
// }

// // export default LuxeResidentReviews;

// export default LuxeResidentReviews


import React from 'react';
import './tmxluxe-resident.css';
import { FaStar, FaCircleUser, FaRegComment } from 'react-icons/fa6';
import { AiOutlineLike } from 'react-icons/ai';

function LuxeResidentReviews() {
  return (
    <section className="tmxluxe-resi">
      <div className="tmxluxe-resi-container">
        <h2 className="tmxluxe-resi-title">What Our Resident Says</h2>

        <div className="tmxluxe-resi-box">

          {/* Review 1 */}
          <article className="tmxluxe-resi-item">
            <div className="tmxluxe-resi-toprow">
              <div className="tmxluxe-resi-profile">
                <FaCircleUser className="tmxluxe-resi-avatar" size={56} />
                <div>
                  <h3 className="tmxluxe-resi-name">Riya Malhotra</h3>
                  <span className="tmxluxe-resi-date">June 2025</span>
                </div>
              </div>
            </div>
     <div className="tmxluxe-resi-bottomrow">
              <div className="tmxluxe-resi-stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={18} color="#e6392e" />
                ))}
              </div>

              <div className="tmxluxe-resi-actions">
                <div className="tmxluxe-resi-act">
                  <AiOutlineLike className="tmxluxe-resi-ic" />
                  <span>32</span>
                </div>
                <div className="tmxluxe-resi-act">
                  <FaRegComment className="tmxluxe-resi-ic" />
                  <span>5</span>
                </div>
              </div>
            </div>
            <p className="tmxluxe-resi-text">
              “I've stayed in luxury hotels before, but TM Luxe has a soul. The private balcony overlooked the city skyline, the aroma of fresh flowers welcomed me daily, and every meal was an experience in itself. It wasn’t just a stay—it was a story I’ll tell for years.”
            </p>
            
       

          </article>

          {/* Review 2 */}
          <article className="tmxluxe-resi-item">
            <div className="tmxluxe-resi-toprow">
              <div className="tmxluxe-resi-profile">
                <FaCircleUser className="tmxluxe-resi-avatar" size={56} />
                <div>
                  <h3 className="tmxluxe-resi-name">Roshan Mishra</h3>
                  <span className="tmxluxe-resi-date">June 2025</span>
                </div>
              </div>
            </div>
            
            <div className="tmxluxe-resi-bottomrow">
              <div className="tmxluxe-resi-stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={18} color="#e6392e" />
                ))}
              </div>

              <div className="tmxluxe-resi-actions">
                <div className="tmxluxe-resi-act">
                  <AiOutlineLike className="tmxluxe-resi-ic" />
                  <span>23</span>
                </div>
                <div className="tmxluxe-resi-act">
                  <FaRegComment className="tmxluxe-resi-ic" />
                  <span>1</span>
                </div>
              </div>
            </div>

            <p className="tmxluxe-resi-text">
              “From the moment I walked into TM Luxe, I felt like I had stepped into a magazine spread. The interiors were stunning, the linens felt like clouds, and the staff anticipated my needs before I even voiced them. I came for a weekend getaway and left feeling completely renewed.”
            </p>

          
          </article>

        </div>
      </div>
    </section>
  );
}

export default LuxeResidentReviews;
