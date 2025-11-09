import React, { useState, useRef, useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const containerRef = useRef(null);
  const videoRefs = useRef([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/food', { withCredentials: true })
      .then((res) => setVideos(res.data?.foodItems || []))
      .catch((err) => console.error('Error fetching videos:', err));
  }, []);

  // Autoplay/pause the video that’s in view (desktop & mobile)
  useEffect(() => {
    const root = containerRef.current;
    if (!root || !videos.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute('data-index'));
          const vid = videoRefs.current[idx];
          if (!vid) return;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            vid.play().catch(() => {});
          } else {
            vid.pause();
          }
        });
      },
      { root, threshold: [0.6] }
    );

    const pages = root.querySelectorAll('.video-page');
    pages.forEach((el) => obs.observe(el));

    return () => obs.disconnect();
  }, [videos]);

  const truncateDescription = (text, max = 120) =>
    typeof text === 'string' && text.length > max ? text.slice(0, max - 1) + '…' : text || '';

  // ---- Desktop button helpers (safe) ----
  const getIndex = () => {
    const el = containerRef.current;
    if (!el) return 0;
    const h = Math.max(el.clientHeight, 1);
    return Math.round(el.scrollTop / h);
  };

  const scrollToIndex = (idx) => {
    const el = containerRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(idx, videos.length - 1));
    const top = clamped * el.clientHeight;
    el.scrollTo({ top, behavior: 'smooth' });
  };

  const goPrev = () => scrollToIndex(getIndex() - 1);
  const goNext = () => scrollToIndex(getIndex() + 1);


  console.log(videos)
  // ---------------------------------------

  return (
    <div className="home-container">
      {/* Feed */}
      <div className="video-feed" ref={containerRef}>
        {videos.length === 0 && (
          <div className="empty-state">No videos available.</div>
        )}

        {videos.map((item, i) => {
  const partner = item?.foodPartner;
  return (
    <section className="video-page snap" key={item._id || i} data-index={i}>
      <div className="video-wrapper">
        <video
          ref={(el) => (videoRefs.current[i] = el)}
          src={item.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="video"
        />

        {partner && (
          <div className="video-left-info">
            <div className="restaurant-profile">
              <div className="restaurant-avatar">
                {partner.restaurantName?.[0]?.toUpperCase() || 'R'}
              </div>
              <div className="restaurant-details">
                <h3 className="restaurant-name">{partner.restaurantName || 'Restaurant'}</h3>
                <p className="restaurant-location">{partner.address || 'Location'}</p>
              </div>
            </div>
            <p className="video-description">{truncateDescription(item.description)}</p>
          </div>
        )}

        <div className="video-actions">
          <Link to={`/food-partner/${partner ?? ''}`} className="action-btn visit-store-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <span>Visit</span>
          </Link>
        </div>

        {i === 0 && videos.length > 1 && <div className="scroll-indicator">↓</div>}

        {/* 🔽 NEW: desktop-only edge buttons, appended to the right side of the video */}
        <div className="desktop-edge-nav" role="presentation">
          <button className="edge-btn up" onClick={goPrev} aria-label="Previous video">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 15l6-6 6 6" />
            </svg>
          </button>
          <button className="edge-btn down" onClick={goNext} aria-label="Next video">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 9l-6 6-6-6" />
            </svg>
          </button>
        </div>
        {/* 🔼 NEW */}
      </div>
    </section>
  );
})}

      </div>
    </div>
  );
};

export default Home;
