import React from "react";
import "./Home5.css";
import { ShieldCheck, Users, Headphones, CalendarClock } from "lucide-react";

const Home5 = () => {
  const data = [
    {
      icon:"/siki1.png",
      title: "Verified Properties",
      text: "Every property is hand-picked and verified for quality and safety",
    },
    {
      icon: "/siki2.png",
      title: "100+ Happy Residence",
      text: "Join a vibrant community of professionals and students",
    },
    {
      icon: "/siki3.png",
      title: "24/7 Customer Support",
      text: "We are here to help you anytime, anywhere",
    },
    {
      icon:"/siki4.png",
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
            <img className="why-icon-97" src={item.icon}/>
            <h3 className="why-title-97">{item.title}</h3>
            <p className="why-text-97">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home5;
