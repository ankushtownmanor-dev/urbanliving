import React from "react";
import "./Home5.css";
import { ShieldCheck, Users, Headphones, CalendarClock } from "lucide-react";

const Home5 = () => {
  const data = [
    {
      icon: <ShieldCheck size={35} color="#c2772b" />,
      title: "Verified Properties",
      text: "Every property is hand-picked and verified for quality and safety",
    },
    {
      icon: <Users size={35} color="#c2772b" />,
      title: "100+ Happy Residence",
      text: "Join a vibrant community of professionals and students",
    },
    {
      icon: <Headphones size={35} color="#c2772b" />,
      title: "24/7 Customer Support",
      text: "We are here to help you anytime, anywhere",
    },
    {
      icon: <CalendarClock size={35} color="#c2772b" />,
      title: "Flexible Rent & Stay",
      text: "Choose from a variety of stay durations that suit your needs",
    },
  ];

  return (
    <div className="why-container-97">
      <h2 className="why-heading-97">Why Choose Ovika ?</h2>

      <div className="why-grid-97">
        {data.map((item, index) => (
          <div key={index} className="why-card-97">
            <div className="why-icon-97">{item.icon}</div>
            <h3 className="why-title-97">{item.title}</h3>
            <p className="why-text-97">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home5;
