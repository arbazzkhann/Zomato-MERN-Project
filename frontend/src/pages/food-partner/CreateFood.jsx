import { useState } from 'react';
import './CreateFood.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateFood = () => {
  const navigate = useNavigate();
  const [videoFile, setVideoFile] = useState(null);      // store File
  const [videoPreview, setVideoPreview] = useState(null); // store preview URL

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // only allow mp4 (optional, but recommended)
    if (file.type !== 'video/mp4') {
      alert('Please select an MP4 file');
      e.target.value = '';
      setVideoFile(null);
      setVideoPreview(null);
      return;
    }

    setVideoFile(file);
    const url = URL.createObjectURL(file);   // blob preview URL
    setVideoPreview(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const foodName = e.target.foodName.value;

    if (!videoFile) {
      alert('Please select a video first');
      return;
    }

    const formData = new FormData();
    formData.append('foodName', foodName);
    formData.append('foodVideo', videoFile);

    const response = await axios.post(
      'http://localhost:3000/api/food/create',
      formData,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    console.log(response.data);

    // free preview URL memory
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }

    navigate('/');
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2 className="auth-title">Create Food</h2>

        <form method="post" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="foodName" className="form-label">Food Name</label>
            <input
              type="text"
              id="foodName"
              name="foodName"
              className="form-input"
              placeholder="Enter food name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="foodVideo" className="form-label">Food Video (.mp4)</label>
            <div className="file-input-wrapper">
              <input
                type="file"
                id="foodVideo"
                name="foodVideo"
                accept="video/mp4"
                className="form-input file-input"
                onChange={handleVideoChange}
                required
              />
            </div>
          </div>

          {videoPreview && (
            <div className="video-preview-wrapper">
              <p className="video-preview-label">Preview</p>
              <video
                className="video-preview"
                src={videoPreview}
                controls
              />
            </div>
          )}

          <button type="submit" className="auth-button">
            Create Food
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;