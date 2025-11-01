import React, { useState, useRef, useEffect } from 'react'
import './Home.css'

const Home = () => {
  const containerRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Sample video data - replace with your actual data
  const videos = [
    {
      id: 1,
      videoUrl: 'https://ik.imagekit.io/arbazfanda3/da2ba73c-f64b-4251-a4c0-f5646a874710_I6sfXRWOW.mp4',
      description: 'Delicious Italian pasta with creamy sauce and fresh herbs. Perfect for a cozy dinner!',
      storeName: 'Italian Bistro'
    },
    {
      id: 2,
      videoUrl: 'https://ik.imagekit.io/arbazfanda3/da2ba73c-f64b-4251-a4c0-f5646a874710_I6sfXRWOW.mp4',
      description: 'Authentic Mexican tacos with fresh ingredients and spicy salsa. A taste of Mexico!',
      storeName: 'El Taco Loco'
    },
    {
      id: 3,
      videoUrl: 'https://ik.imagekit.io/arbazfanda3/da2ba73c-f64b-4251-a4c0-f5646a874710_I6sfXRWOW.mp4',
      description: 'Crispy golden fried chicken with special herbs and spices. Finger-licking good!',
      storeName: 'Chicken Paradise'
    },
    {
      id: 4,
      videoUrl: 'https://ik.imagekit.io/arbazfanda3/da2ba73c-f64b-4251-a4c0-f5646a874710_I6sfXRWOW.mp4',
      description: 'Fresh sushi rolls with premium fish and expertly prepared rice. A Japanese delight!',
      storeName: 'Sushi Masters'
    }
  ]

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
  }, [])

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
        {videos.map((video, index) => (
          <div key={video.id} className="video-wrapper">
            <video
              src={video.videoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="video"
            />
            
            {/* Overlay with description and button */}
            <div className="video-overlay">
              <div className="video-info">
                <p className="video-description">
                  {truncateDescription(video.description)}
                </p>
                <button className="visit-store-btn">
                  Visit Store
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