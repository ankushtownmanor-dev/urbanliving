import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

import "./SmartLiving.css";
import { IoArrowForwardSharp } from "react-icons/io5";
import { LuBuilding } from "react-icons/lu";
import { PiBuildingLight } from "react-icons/pi";
import { TbBuildingEstate } from "react-icons/tb";
import { BsFillDoorOpenFill } from "react-icons/bs";

const SmartLiving = () => {
  return (
    <div className="smart-container">
      {/* Header Section */}
      <div className="header-text">
        <h2>✨ Smart Living. Simplified Life</h2>
        <h2>Your Space , Your Style</h2>
        <h2>Your Freedom</h2>
        <p>From Shared To Stylish - Living Spaces For Every Lifestyle</p>
      </div>

      {/* Hero Image Section */}
      <div className="hero">
        <img src="/mobile-banner.png" alt="student" className="hero-img" />
        {/* <div className="search-box">
          <input type="text" placeholder="Find your stay" />
          <button>
            <FaSearch /> Search
          </button>
        </div> */}
      </div>

      {/* Features Section */}
      {/* <div className="features">
        <div className="card">
          <div className="card-left">
            <img src="https://placehold.co/60x60" alt="TM Stay" />
          </div>
          <div className="card-body">
            <h3>TM Stay</h3>
            <p>For PG</p>
          </div>
          <div className="card-arrow">
            <p>Residence 450+ →</p>
          </div>
        </div>

        <div className="card">
          <div className="card-left">
            <img src="https://placehold.co/60x60" alt="TM Hive" />
          </div>
          <div className="card-body">
            <h3>TM Hive</h3>
            <p>For Co Living</p>
          </div>
          <div className="card-arrow">
            <p>Rooms 40,000+ →</p>
          </div>
        </div>

        <div className="card">
          <div className="card-left">
            <img src="https://placehold.co/60x60" alt="TM Luxe" />
          </div>
          <div className="card-body">
            <h3>TM Luxe</h3>
            <p>For Luxury Stay</p>
          </div>
          <div className="card-arrow">
            <p>Cities 15+ →</p>
          </div>
        </div>
      </div> */}
      <div className="feature-card">
        <div className='smart-living-category-box'>
  <div className='smart-living-image-stay'>
    <img src="/4.png" alt='TM Stay' />
  </div>
  <div className='smart-living-category-right'>
    <h3>
      <span className="smart-living-tm">TM</span> <span className="smart-living-stay">Luxe</span>
    </h3>
    <p>For Luxury Stay</p>
    
  </div>
</div>

        <div className="building_icon">
          <TbBuildingEstate className="iconx" size={35}/>
        </div>
         <div className="card-text">
            <p>Cities</p>
            <h3>15+</h3>
         </div>
      <span className='smart-living-left-arrow'>
      <IoArrowForwardSharp size={15} />
    </span>
      </div>


       <div className="feature-card mid-card">
        <div className='smart-living-category-box mid-box'>
  <div className='smart-living-image-stay'>
    <img src="/2.png" alt='TM Stay' />
  </div>
  <div className='smart-living-category-right'>
    <h3>
      <span className="smart-living-tm">TM</span> <span className="smart-living-stay">Hive</span>
    </h3>
    <p id="coliving-text">For Coliving</p>
    
  </div>
</div>
  <span className='smart-living-left-arrow'>
      <IoArrowForwardSharp size={15} />
    </span>
       
         <div className="card-text">
            <p>Rooms</p>
            <h3>40000+</h3>
         </div>
    
     <div className="building_icon">
        
          <BsFillDoorOpenFill className="iconx" size={35}/>
        </div>
      </div>
      <div className="feature-card">
        <div className='smart-living-category-box'>
  <div className='smart-living-image-stay'>
    <img src="/1.png" alt='TM Stay' />
  </div>
  <div className='smart-living-category-right'>
    <h3>
      <span className="smart-living-tm">TM</span> <span className="smart-living-stay">Stay</span>
    </h3>
    <p>For PG</p>
    
  </div>
</div>

        <div className="building_icon">
          <PiBuildingLight className="iconx" size={35}/>  
        </div>
         <div className="card-text">
            <p>Residence</p>
            <h3>450+</h3>
         </div>
      <span className='smart-living-left-arrow'>
      <IoArrowForwardSharp size={15} />
    </span>
      </div>
    </div>
  );
};

export default SmartLiving;
