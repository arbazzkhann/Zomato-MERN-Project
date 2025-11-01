import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import axios from 'axios';

const FoodPartnerRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ownerName = e.target.ownerName.value;
    const restaurantName = e.target.restaurantName.value;
    const phoneNumber = e.target.phoneNumber.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;

    const response = await axios.post("http://localhost:3000/api/auth/food-partner/register", 
      {
        ownerName,
        restaurantName,
        phoneNumber,
        email,
        password,
        address
      },
      {
        withCredentials: true
      }
    );

    console.log(response);

    navigate("/create-food");
  }


  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2 className="auth-title">Food Partner Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="ownerName" className="form-label">Owner Name</label>
            <input
              type="text"
              id="ownerName"
              name="ownerName"
              className="form-input"
              placeholder="Enter owner name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="restaurantName" className="form-label">Restaurant Name</label>
            <input
              type="text"
              id="restaurantName"
              name="restaurantName"
              className="form-input"
              placeholder="Enter restaurant name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
            <input
              type="number"
              name="phoneNumber"
              className="form-input"
              placeholder="Enter phone number"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="Enter business email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              placeholder="Enter password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              className="form-input"
              placeholder="Enter restaurant address"
              required
            />
          </div>
          <button type="submit" className="auth-button">Register as Partner</button>
        </form>
        <div className="auth-switch">
          Already a partner? <Link to="/food-partner/login">Login here</Link>
        </div>
        <div className="auth-switch">
          Want to register as a user? <Link to="/user/register">Register as User</Link>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;