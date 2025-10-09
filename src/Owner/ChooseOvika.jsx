import React from 'react';
import './choose-ovika.css';
import { MdVerified } from 'react-icons/md';
import { FaCamera, FaCreditCard } from 'react-icons/fa';
import { IoPersonSharp } from 'react-icons/io5';

const reasons = [
  { Icon: MdVerified, title: 'Verified Tenents Only' },
  { Icon: FaCamera, title: 'Professional Photos' },
  { Icon: FaCreditCard, title: 'Automated Rent Collection' },
  { Icon: IoPersonSharp, title: 'Dedicated Property Manager' },
];

export default function ChooseOvika() {
  return (
    <section className="choose-ovika section">
      <div className="choose-ovika container">
        <h2 className="choose-ovika heading">
          Why choose Ovika for listing<br />managment
        </h2>
        <p className="choose-ovika sub">
          Our simple , streamlined process ensures your property is managed efficiently
        </p>

        <div className="choose-ovika grid">
          {reasons.map(({ Icon, title }, i) => (
            <div className="choose-ovika card" key={i}>
              {/* plain icon (no circle) */}
              <Icon className="choose-ovika glyph plain" aria-hidden="true" />
              <div className="choose-ovika cardTitle">{title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}