import React from 'react';
import './manage-ovika.css';

const items = [
  {
    icon: 'https://placehold.co/64x64/7b0000/ffffff?text=📊',
    title: 'Share your property details',
    text:
      'To redefine hospitality by creating inclusive, comfortable, and community-driven spaces where everyone feels at home.',
  },
  {
    icon: 'https://placehold.co/64x64/7b0000/ffffff?text=✔',
    title: 'We renovate and manage',
    text:
      'To be the most trusted name in modern hospitality — connecting people, places, and experiences through care, comfort, and innovation.',
  },
  {
    icon: 'https://placehold.co/64x64/7b0000/ffffff?text=📣',
    title: 'Earn and share property',
    text:
      'Our values are built on comfort, inclusivity, community, trust, and innovation — the pillars that shape every stay with us.',
  },
  {
    icon: 'https://placehold.co/64x64/7b0000/ffffff?text=📷',
    title: 'Earn and share property',
    text:
      'Our values are built on comfort, inclusivity, community, trust, and innovation — the pillars that shape every stay with us.',
  },
];

export default function ManageListings() {
  return (
    <section className="manage-ovika wrap">
      <div className="manage-ovika container">
        <h2 className="manage-ovika heading">How We Mange Listings</h2>
        <p className="manage-ovika sub">
          Our simple , streamlined process ensures your property is managed efficiently
        </p>

        <div className="manage-ovika grid">
          {items.map((it, i) => (
            <div className="manage-ovika card" key={i}>
              <div className="manage-ovika iconWrap">
                <img className="manage-ovika icon" src={it.icon} alt="" />
                <span className="manage-ovika iconShadow" />
              </div>
              <h3 className="manage-ovika title">{it.title}</h3>
              <p className="manage-ovika text">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}