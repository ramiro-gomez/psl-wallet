import { FC } from 'react';
import 'materialize-css';
import { Button, TextInput } from 'react-materialize';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Register: FC = () => (
	<div className="center">
		<Link to="/">
			<img className="logo" src={logo} alt="logo" />
		</Link>
		<h2 className="form-title center-align">Register</h2>
		<form className="form-size">
			<div className="form-error-box red lighten-1 white-text">
				<p>Error message</p>
			</div>
			<TextInput s={12} label="Name" />
			<TextInput s={12} label="Email" />
			<TextInput s={12} password label="Password" />
			<TextInput s={12} password label="Repeat your password" />
			<div className="center">
				<Button className="form-button" large>
					Register
				</Button>
			</div>
		</form>
	</div>
);

export default Register;
