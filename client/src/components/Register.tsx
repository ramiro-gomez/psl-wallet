import { FC } from 'react';
import 'materialize-css';
import { Button, TextInput } from 'react-materialize';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Register: FC = () => (
	<div className="custom-container center">
		<nav>
			<Link className="logo logo--center" to="/">
				<img className="logo__img responsive-img" src={logo} alt="logo" />
			</Link>
		</nav>
		<h2 className="regular-title">Register</h2>
		<form className="form">
			<div className="form__error-box red lighten-1 white-text">
				<p>Error message</p>
			</div>
			<TextInput s={12} label="Name" />
			<TextInput s={12} label="Email" />
			<TextInput s={12} password label="Password" />
			<TextInput s={12} password label="Repeat your password" />
			<div className="center">
				<Button className="form__btn">
					Register
				</Button>
			</div>
		</form>
	</div>
);

export default Register;
