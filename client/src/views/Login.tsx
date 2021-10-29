import { FC } from 'react';
import { Button, TextInput } from 'react-materialize';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';

const Login: FC = () => (
	<div className="custom-container center">
		<NavBar centered />
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
