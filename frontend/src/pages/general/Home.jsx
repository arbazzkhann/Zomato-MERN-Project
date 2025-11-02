import React, { useState, useRef, useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [ videos, setVideos ] = useState([]);
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);


  // Track current video index
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollTop = container.scrollTop
      const containerHeight = container.clientHeight
      const index = Math.round(scrollTop / containerHeight)
      setCurrentIndex(index)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [videos])

  useEffect(() => {
    axios.get("http://localhost:3000/api/food", {withCredentials: true})
    .then(response => {
      // console.log("response.data: ", response.data.foodItems)
      setVideos(response.data.foodItems);
    })
  })

  // Truncate description to max 2 lines
  const truncateDescription = (text, maxLines = 2) => {
    const words = text.split(' ')
    let truncated = ''
    const testDiv = document.createElement('div')
    testDiv.style.cssText = 'position: absolute; visibility: hidden; width: 90%; padding: 0 20px; font-size: 14px; line-height: 1.4;'
    testDiv.innerHTML = truncated
    document.body.appendChild(testDiv)
    
    for (let word of words) {
      const prevText = truncated
      truncated += (truncated ? ' ' : '') + word
      testDiv.textContent = truncated
      
      if (testDiv.scrollHeight > maxLines * (14 * 1.4)) {
        document.body.removeChild(testDiv)
        return prevText + '...'
      }
    }
    document.body.removeChild(testDiv)
    return truncated
  }

  return (
    <div className="home-container">
      <div className="video-feed" ref={containerRef}>
        {videos.map(video => (
          <div key={video._id} className="video-wrapper">
            <video
              src={video.video}
              autoPlay
              muted
              loop
              playsInline
              preload='metadata'
              className="video"
            />
            
            {/* Overlay with description and button */}
            <div className="video-overlay">
              <div className="video-info">
                <p className="video-description">
                  {truncateDescription(video.description)}
                </p>
                <button className="visit-store-btn">
                  <Link to={`/food-partner/${video.foodPartner}`}>Visit Store</Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home