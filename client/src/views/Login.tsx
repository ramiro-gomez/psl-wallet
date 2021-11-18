import {
	ChangeEvent, FC, FormEvent, useState,
} from 'react';
import { Button, TextInput } from 'react-materialize';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useAppDispatch, useAppSelector } from '../store';
import { logIn } from '../store/reducers/authReducer';

const Login: FC = () => {
	const [form, setForm] = useState({
		email: '',
		password: '',
	});
	const { errorMessage, isLoading } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(logIn(form));
	};

	return (
		<div className="center">
			<NavBar centered />
			<h2 className="regular-title">
				Welcome!
				<br />
				Please log in to start using the app
			</h2>
			<form className="form" onSubmit={handleSubmit}>
				{errorMessage && (
					<div className="form__error-box red lighten-1 white-text">
						<p>{errorMessage}</p>
					</div>
				)}
				<TextInput
					s={12}
					label="Email"
					name="email"
					value={form.email}
					onChange={handleChange}
				/>
				<TextInput
					s={12}
					password
					label="Password"
					name="password"
					value={form.password}
					onChange={handleChange}
				/>
				<div className="center">
					<Button className="form__button" disabled={isLoading} type="submit">
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
};

export default Login;
