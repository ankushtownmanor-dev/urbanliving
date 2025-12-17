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
      title: "Prime Locations",
      text: "Our homes are located in well-connected neighborhoods, offering easy access to key areas and daily essentials",
    },
    {
      icon: "/siki3.png",
      title: "Dedicated Support",
      text: "Our support team is available during service hours to assist you promptly and ensure a smooth living experience.",
    },
    {
      icon:"/siki4.png",
      title: "Transparent Pricing",
      text: "We follow a clear and honest pricing structure with no hidden charges, ensuring complete clarity in billing at every step.",
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
