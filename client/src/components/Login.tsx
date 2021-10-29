import { FC } from 'react';
import 'materialize-css';
import { Button, TextInput } from 'react-materialize';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Login: FC = () => (
	<div className="custom-container center">
		<nav>
			<Link className="logo logo--center" to="/">
				<img className="logo__img" src={logo} alt="logo" />
			</Link>
		</nav>
		<h2 className="regular-title">
			Welcome!
			<br />
			Please log in to start using the app
		</h2>
		<form className="form">
			<div className="form__error-box red lighten-1 white-text">
				<p>Error message</p>
			</div>
			<TextInput s={12} label="Email" />
			<TextInput s={12} password label="Password" />
			<div className="center">
				<Button className="form__button">
					Log in
				</Button>
			</div>
			<p className="form__bottom-text">
				Don&apos;t have an account?
				{' '}
				<Link to="/register">Click here to register</Link>
			</p>
		</form>
	</div>
);

export default Login;
