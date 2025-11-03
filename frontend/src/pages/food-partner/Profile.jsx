import React, { useState, useEffect, useRef } from "react";
import "../auth/Auth.css";
import "./Profile.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const videoRefs = useRef({});

    useEffect(() => {
        axios.get(`http://localhost:3000/api/food-partner/${id}`, {withCredentials: true})
        .then(response => {
            setProfile(response.data.foodPartner);
            setVideos(response.data.foodPartner.foodItems)
            setLoading(false);
            console.log("video: ", videos);
            console.log("response: ", response);
        })
        .catch(error => {
            console.error("Error fetching profile:", error);
            setLoading(false);
        });
        
        // Fetch videos for this food partner
        axios.get("http://localhost:3000/api/food", {withCredentials: true})
        .then(response => {
            const partnerVideos = response.data.foodItems?.filter(
                item => item.foodPartner?._id === id || item.foodPartner === id
            ) || [];
            setVideos(partnerVideos);
        })
        .catch(error => {
            console.error("Error fetching videos:", error);
        });
    }, [id]);

    if (loading) {
        return (
            <div className="profile-container">
                <div className="profile-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading restaurant profile...</p>
                </div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="profile-container">
                <div className="profile-error">
                    <p>Restaurant profile not found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                {/* Hero Header Section */}
                <div className="profile-hero">
                    <div className="profile-hero-content">
                        <div className="profile-logo-container">
                            <div className="profile-logo">
                                <img 
                                    src="data:image/png;base64,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"
                                    alt={profile.restaurantName || "Restaurant Logo"}
                                />
                            </div>
                        </div>
                        <div className="profile-hero-info">
                            <h1 className="profile-restaurant-name">{profile.restaurantName || "Restaurant Name"}</h1>
                            <div className="profile-owner-badge">
                                <span className="owner-icon">👨‍🍳</span>
                                <span className="owner-name">{profile.ownerName || "Owner"}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Cards Section */}
                <div className="profile-info-section">
                    <div className="info-card">
                        <div className="info-icon">📍</div>
                        <div className="info-content">
                            <div className="info-label">Address</div>
                            <div className="info-value">{profile.address || "Address not provided"}</div>
                        </div>
                    </div>
                    {profile.email && (
                        <div className="info-card">
                            <div className="info-icon">✉️</div>
                            <div className="info-content">
                                <div className="info-label">Email</div>
                                <div className="info-value">{profile.email}</div>
                            </div>
                        </div>
                    )}
                    {profile.phoneNumber && (
                        <div className="info-card">
                            <div className="info-icon">📞</div>
                            <div className="info-content">
                                <div className="info-label">Phone</div>
                                <div className="info-value">{profile.phoneNumber}</div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Stats Section */}
                <div className="profile-stats-section">
                    <div className="stat-card">
                        <div className="stat-icon">🍽️</div>
                        <div className="stat-content">
                            <div className="stat-value">43</div>
                            <div className="stat-label">Total Meals</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">👥</div>
                        <div className="stat-content">
                            <div className="stat-value">15K</div>
                            <div className="stat-label">Customers Served</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">⭐</div>
                        <div className="stat-content">
                            <div className="stat-value">4.8</div>
                            <div className="stat-label">Rating</div>
                        </div>
                    </div>
                </div>

                {/* Section Divider */}
                <div className="profile-section-divider">
                    <div className="divider-line"></div>
                    <div className="divider-text">Our Videos</div>
                    <div className="divider-line"></div>
                </div>

                {/* Video Grid Section - Instagram Style */}
                <div className="profile-video-section">
                    {videos.length > 0 ? (
                        <div className="instagram-video-grid">
                            {videos.map((video, index) => {
                                const videoId = video._id || `video-${index}`;
                                
                                const handleMouseEnter = () => {
                                    const videoEl = videoRefs.current[videoId];
                                    if (videoEl) {
                                        videoEl.play().catch(() => {});
                                    }
                                };
                                
                                const handleMouseLeave = () => {
                                    const videoEl = videoRefs.current[videoId];
                                    if (videoEl) {
                                        videoEl.pause();
                                        videoEl.currentTime = 0;
                                    }
                                };
                                
                                return (
                                    <div 
                                        key={videoId} 
                                        className="instagram-video-item"
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <div className="video-thumbnail-wrapper">
                                            <video
                                                ref={el => videoRefs.current[videoId] = el}
                                                className="video-thumbnail"
                                                src={video.video}
                                                muted
                                                loop
                                                playsInline
                                                preload="metadata"
                                            />
                                            
                                            <div className="video-overlay">
                                                <div className="video-overlay-content">
                                                    <div className="play-button">
                                                        <svg viewBox="0 0 24 24" fill="white" width="32" height="32">
                                                            <path d="M8 5v14l11-7z"/>
                                                        </svg>
                                                    </div>
                                                    <div className="video-engagement">
                                                        <span className="engagement-icon">❤️</span>
                                                        <span className="engagement-count">{Math.floor(Math.random() * 1000) + 100}</span>
                                                    </div>
                                                    <div className="video-engagement">
                                                        <span className="engagement-icon">💬</span>
                                                        <span className="engagement-count">{Math.floor(Math.random() * 50) + 10}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="no-videos-message">
                            <div className="no-videos-icon">📹</div>
                            <p>No videos yet</p>
                            <span className="no-videos-subtitle">Check back later for new content</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
