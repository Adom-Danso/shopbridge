import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router';
import axios from 'axios'

import '../../styles/register.css';

const RegisterBuyer = ({ fetchCurrentUser }) => {
	const apiUrl = import.meta.env.VITE_API_URL
	let navigate = useNavigate()
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		password2: '',
	});
	const [allValidUsers, setAllValidUsers] = useState([])


	const handleChange = (e) => {
	    const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		})

		if (name == 'email') {
			if (userExists(value)) {
				console.log("User already exists")
			} else {
				console.log("Good to go")
			}
		}
	}

	const userExists = (inputEmail) => {
		return allValidUsers.includes(inputEmail)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const response = await fetch(`${apiUrl}/api/auth/buyer/register`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				firstName: formData.firstName,
				lastName: formData.lastName,
				email: formData.email,
				password: formData.password,
			}),
			credentials: 'include',
		});

		const data = await response.json(); 

		if (response.status === 201) {
			await fetchCurrentUser();
			navigate("/"); 
		}

	}

	const fetchValidUsers = async () => {
		const response = await axios.get(`${apiUrl}/api/auth/buyer/get-valid-users`);
		setAllValidUsers(response.data.users);
	};

	const initialisePage = async () => {
		await fetchValidUsers()
	}

	useEffect(() => {
		initialisePage()
	}, [])

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
						<span className="signup-title">Sign Up</span>
						<div className="signup-options">
							<div>
								<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
									<path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"/>
								</svg>
							</div>
						</div>
					</div>
					<div className="signup-inputs">
						<div className="signup-input-group">
							<input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange}/>
							<input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
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

export default RegisterBuyer;
