import React from 'react';
import './choose-ovika.css';

const reasons = [
  {
    icon: 'https://placehold.co/56x56/7b0000/ffffff?text=✔',
    title: 'Verified Tenents Only',
  },
  {
    icon: 'https://placehold.co/56x56/7b0000/ffffff?text=📷',
    title: 'Professional Photos',
  },
  {
    icon: 'https://placehold.co/56x56/7b0000/ffffff?text=💳',
    title: 'Automated Rent Collection',
  },
  {
    icon: 'https://placehold.co/56x56/7b0000/ffffff?text=👤',
    title: 'Dedicated Property Manager',
  },
];

export default function ChooseOvika() {
  return (
    <section className="choose-ovika section">
      <div className="choose-ovika container">
        <h2 className="choose-ovika heading">
          Why choose Ovika for listing<br />mangament
        </h2>
        <p className="choose-ovika sub">
          Our simple , streamlined process ensures your property is managed efficiently
        </p>

        <div className="choose-ovika grid">
          {reasons.map((r, i) => (
            <div className="choose-ovika card" key={i}>
              <div className="choose-ovika iconWrap">
                <img className="choose-ovika icon" src={r.icon} alt="" />
              </div>
              <div className="choose-ovika cardTitle">{r.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}