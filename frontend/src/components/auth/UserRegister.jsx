import { Link } from 'react-router-dom';
import './Auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const phoneNumber = e.target.phoneNumber.value;
    const password = e.target.password.value;

    const response = await axios.post("http://localhost:3000/api/auth/user/register", {
      fullName,
      email,
      phoneNumber,
      password
    }, {
      withCredentials: true  //saving cookies
    });

    console.log(response.data);

    navigate("/");
  }

  

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2 className="auth-title">User Registration</h2>
        <form method='post' onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">Full Name</label>
            <input
              type="text"
              id="fullName"
              className="form-input"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
            <input
              type="number"
              id="phoneNumber"
              className="form-input"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Create a password"
              required
            />
          </div>
          <button type='submit' className="auth-button">Register</button>
        </form>
        <div className="auth-switch">
          Already have an account? <Link to="/user/login">Login here</Link>
        </div>
        <div className="auth-switch">
          Want to register as a food partner? <Link to="/food-partner/register">Register as Partner</Link>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;