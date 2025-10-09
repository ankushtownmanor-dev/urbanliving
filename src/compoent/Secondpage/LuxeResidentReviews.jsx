

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
