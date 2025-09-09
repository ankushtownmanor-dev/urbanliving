import React, { useEffect, useState } from 'react';
import './tmxelite-prop.css';
import { useNavigate } from 'react-router';
import { FaHeart } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

function EliteProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // Dummy properties for filling empty space
  const dummyProperties = [
    {
      id: 'dummy-1',
      name: 'TM Stay - 1',
      images: ['/tmluxe.png'],
      monthly_price: 12000,
    },
    {
      id: 'dummy-2',
      name: 'TM Stay - 2',
      images: ['/tmluxe2.png'],
      monthly_price: 9500,
    },
  ];

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch('https://townmanor.ai/api/properties/all');
        if (!res.ok) throw new Error('Failed to load properties');
        const data = await res.json();

        let fetchedProps = [];
        if (Array.isArray(data)) {
          fetchedProps = data;
        } else if (data && Array.isArray(data.properties)) {
          fetchedProps = data.properties;
        } else {
          setError('Invalid response format');
        }

        // Append dummy properties if less than 4
        if (fetchedProps.length < 4) {
          const needed = 4 - fetchedProps.length;
          fetchedProps = [...fetchedProps, ...dummyProperties.slice(0, needed)];
        }

        setProperties(fetchedProps);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  return (
    <section className="tmxelite-prop">
      <div className="tmxelite-prop-container">
        <div className="tmxelite-prop-head">
          <h2 className="tmxelite-prop-title">Trending Properties</h2>
          <span className="tmxelite-prop-chevron">›</span>
        </div>

        {loading && (
          <div className="tmxelite-prop-grid">
            <div className="tmxelite-prop-card">Loading...</div>
          </div>
        )}
        {error && !loading && (
          <div className="tmxelite-prop-grid">
            <div className="tmxelite-prop-card">{error}</div>
          </div>
        )}
        {!loading && !error && (
          <>
            {isMobile ? (
              <Swiper
                modules={[Autoplay, Pagination]}
                slidesPerView={1.2}
                spaceBetween={16}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop
                pagination={{ clickable: true }}
                centeredSlides={true}  
              >
                {properties.map((prop) => {
                  const isDummy = prop.id?.toString().startsWith('dummy');

                  const imageArray = Array.isArray(prop.images)
                    ? prop.images
                    : Array.isArray(prop.IMAGES)
                    ? prop.IMAGES
                    : [];
                  const imageSrc = imageArray.length > 0 ? imageArray[0] : '/p1.png';

                  let priceText = '';
                  if (isDummy) {
                    const priceNumber = prop.monthly_price;
                    priceText = priceNumber
                      ? `₹ ${priceNumber.toLocaleString('en-IN')} per month`
                      : '';
                  } else {
                    const rawPrice = prop.per_night_price ?? prop.PER_NIGHT_PRICE;
                    const priceNumber =
                      typeof rawPrice === 'string'
                        ? parseFloat(rawPrice)
                        : rawPrice;
                    priceText = priceNumber
                      ? `₹ ${priceNumber.toLocaleString('en-IN')} per night`
                      : '';
                  }

                  const id = prop.id ?? prop.ID;
                  const name = prop.name ?? prop.NAME;

                  return (
                    <SwiperSlide key={id}>
                      <article
                        className="tmxelite-prop-card"
                        onClick={() => {
                          if (isDummy) return;
                          navigate(`/tmluxespecific/${id}`, { state: { propertyId: id } });
                        }}
                      >
                        <div className="tmxelite-prop-media">
                          <img src={imageSrc} alt={name} />
                          <span className="tmxelite-prop-badge">
                            {isDummy ? 'Coming Soon' : 'Guest Favorite'}
                          </span>
                          <button className="tmxelite-prop-like" aria-label="save">
                            <FaHeart color="white" />
                          </button>
                        </div>
                        <div className="tmxelite-prop-body">
                          <h3 className="tmxelite-prop-name">{name}</h3>
                          <div className="tmxelite-prop-meta">
                            <span className="tmxelite-prop-price">{priceText}</span>
                          </div>
                        </div>
                      </article>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            ) : (
              <div className="tmxelite-prop-grid">
                {properties.map((prop) => {
                  const isDummy = prop.id?.toString().startsWith('dummy');

                  const imageArray = Array.isArray(prop.images)
                    ? prop.images
                    : Array.isArray(prop.IMAGES)
                    ? prop.IMAGES
                    : [];
                  const imageSrc = imageArray.length > 0 ? imageArray[0] : '/p1.png';

                  let priceText = '';
                  if (isDummy) {
                    const priceNumber = prop.monthly_price;
                    priceText = priceNumber
                      ? `₹ ${priceNumber.toLocaleString('en-IN')} per month`
                      : '';
                  } else {
                    const rawPrice = prop.per_night_price ?? prop.PER_NIGHT_PRICE;
                    const priceNumber =
                      typeof rawPrice === 'string'
                        ? parseFloat(rawPrice)
                        : rawPrice;
                    priceText = priceNumber
                      ? `₹ ${priceNumber.toLocaleString('en-IN')} per night`
                      : '';
                  }

                  const id = prop.id ?? prop.ID;
                  const name = prop.name ?? prop.NAME;

                  return (
                    <article
                      key={id}
                      className="tmxelite-prop-card"
                      onClick={() => {
                        // Prevent navigation for dummy properties
                        if (isDummy) return;
                        navigate(`/tmluxespecific/${id}`, { state: { propertyId: id } });
                      }}
                    >
                      <div className="tmxelite-prop-media">
                        <img src={imageSrc} alt={name} />
                        <span className="tmxelite-prop-badge">
                          {isDummy ? 'Coming Soon' : 'Guest Favorite'}
                        </span>
                        <button className="tmxelite-prop-like" aria-label="save">
                          <FaHeart color="white" />
                        </button>
                      </div>
                      <div className="tmxelite-prop-body">
                        <h3 className="tmxelite-prop-name">{name}</h3>
                        <div className="tmxelite-prop-meta">
                          <span className="tmxelite-prop-price">{priceText}</span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default EliteProperties;
