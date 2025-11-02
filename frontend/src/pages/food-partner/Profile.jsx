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
                                {profile.restaurantName?.charAt(0) || "R"}
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
