import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';

import '../../styles/register.css';

const RegisterSeller = ({ fetchCurrentUser }) => {
	const apiUrl = import.meta.env.VITE_API_URL;
	let navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: '',
		shopName: '',
		email: '',
		password: '',
		password2: '',
	});
	const [allValidUsers, setAllValidUsers] = useState([]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});

		if (name === 'email') {
			if (userExists(value)) {
				console.log('Seller already exists');
			} else {
				console.log('Good to go');
			}
		}
	};

	const userExists = (inputEmail) => {
		return allValidUsers.includes(inputEmail);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				`${apiUrl}/auth/seller/register`,
				{
					name: formData.name,
					shopName: formData.shopName,
					email: formData.email,
					password: formData.password,
				},
				{ withCredentials: true }
			);

			if (response.status === 201) {
				await fetchCurrentUser();
				navigate('/');
			}
		} catch (error) {
			console.error('Registration failed', error);
		}
	};

	const fetchValidUsers = async () => {
		try {
			const response = await axios.get(`${apiUrl}/auth/get-user-emails`);
			setAllValidUsers(response.data.users);
		} catch (error) {
			console.error('Failed to fetch valid users', error);
		}
	};

	useEffect(() => {
		fetchValidUsers();
	}, []);

	return (
		<div className="signup-container">
			<div className="signup-box">
				<div className="signup-left">
					<div className="signup-left-content">
						<div>
							<span>Already have an account?</span>
						</div>
						<Link to="/login" className="signup-login-btn">Login</Link>
					</div>
				</div>
				<form className="signup-right" onSubmit={handleSubmit}>
					<div className="signup-header">
						<span className="signup-title">Register as Seller</span>
					</div>
					<div className="signup-inputs">
						<div className="signup-input-field">
							<input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} />
						</div>
						<div className="signup-input-field">
							<input type="text" name="shopName" placeholder="Shop Name" value={formData.shopName} onChange={handleChange} />
						</div>
						<div className="signup-input-field">
							<input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
						</div>
						<div className="signup-input-field">
							<input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
						</div>
						<div className="signup-input-field">
							<input type="password" name="password2" placeholder="Confirm Password" value={formData.password2} onChange={handleChange} />
						</div>
					</div>
					<div className="signup-button-container">
						<button className="signup-btn">Sign Up</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default RegisterSeller;
