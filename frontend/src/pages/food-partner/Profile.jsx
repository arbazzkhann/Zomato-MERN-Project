import React from 'react'
import '../auth/Auth.css'
import './Profile.css'

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Top Section */}
        <div className="profile-top-section">
          <div className="profile-header">
            <div className="profile-image-container">
              <div className="profile-image-placeholder"></div>
            </div>
            <div className="profile-info">
              <div className="profile-field">
                <span className="profile-field-text">bussiness name</span>
              </div>
              <div className="profile-field">
                <span className="profile-field-text">Address</span>
              </div>
            </div>
          </div>
          
          <div className="profile-stats">
            <div className="stat-item">
              <div className="stat-label">total meals</div>
              <div className="stat-value">43</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">customer serve</div>
              <div className="stat-value">15K</div>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="profile-divider"></div>
        
        {/* Bottom Section - Video Grid */}
        <div className="profile-video-grid">
          {Array.from({ length: 9 }, (_, index) => (
            <div key={index} className="video-grid-item">
              <span className="video-placeholder-text">video</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile