import React from 'react';
import { FaFile, FaMoneyBill } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { AiFillSound } from 'react-icons/ai';
import './manage-ovika.css';

const items = [
  {
    Icon: FaFile,
    title: 'Share your property details',
    text:
      'To redefine hospitality by creating inclusive, comfortable, and community-driven spaces where everyone feels at home.',
  },
  {
    Icon: MdVerified,
    title: 'We renovate and manage',
    text:
      'To be the most trusted name in modern hospitality — connecting people, places, and experiences through care, comfort, and innovation.',
  },
  {
    Icon: AiFillSound,
    title: 'Earn and share property',
    text:
      'Our values are built on comfort, inclusivity, community, trust, and innovation — the pillars that shape every stay with us.',
  },
  {
    Icon: FaMoneyBill,
    title: 'Earn and share property',
    text:
      'Our values are built on comfort, inclusivity, community, trust, and innovation — the pillars that shape every stay with us.',
  },
];

export default function ManageListings() {
  return (
    <section className="manage-ovika wrap">
      <div className="manage-ovika container">
        <h2 className="manage-ovika heading">How We Manage Listings</h2>
        <p className="manage-ovika sub">
          Our simple , streamlined process ensures your property is managed efficiently
        </p>

        <div className="manage-ovika grid noCards">
          {items.map(({ Icon, title, text }, i) => (
            <div className="manage-ovika block left" key={i}>
              <div className="manage-ovika iconWrap" aria-hidden="true">
                <div className="manage-ovika iconCircle">
                  <Icon className="manage-ovika iconGlyph" />
                </div>
                <span className="manage-ovika iconShadow" />
              </div>

              <h3 className="manage-ovika title left">{title}</h3>
              <p className="manage-ovika text left">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}