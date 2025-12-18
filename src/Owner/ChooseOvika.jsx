import React from 'react';
import './choose-ovika.css';
import { MdVerified } from 'react-icons/md';
import { FaCamera, FaCreditCard } from 'react-icons/fa';
import { IoPersonSharp } from 'react-icons/io5';

const reasons = [
  { Icon: MdVerified, title: 'Verified Tenents Only' },
  { Icon: FaCamera, title: 'Professional Listing & Photos' },
  { Icon: FaCreditCard, title: 'Automated Rent & Reports' },
  { Icon: IoPersonSharp, title: 'Dedicated Property Manager' },
];

export default function ChooseOvika() {
  return (
    <section className="choose-ovika section">
      <div className="choose-ovika container">
        <h2 className="choose-ovika heading">
          Why Choose <span className='text-red-600'>OvikaLiving </span>for Property Management<br />
        </h2>
        <p className="choose-ovika sub">
        Our end-to-end service ensures your property earns consistently — while you enjoy complete peace of mind.
From verified tenants to automated rent collection, OvikaLiving manages it all through a  <br/>  trusted commission model.
        </p>

        <div className="choose-ovika grid">
          {reasons.map(({ Icon, title }, i) => (
            <div className="choose-ovika card" key={i}>
              {/* plain icon (no circle) */}
              <Icon className="choose-ovika glyph plain" aria-hidden="true" />
              <div className="choose-ovika cardTitle">{title}</div>
               <p className="choose-ovika sub">
       
        </p>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}