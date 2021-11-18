import {
	ChangeEvent, FC, FormEvent, useState,
} from 'react';
import { Button, TextInput } from 'react-materialize';
import NavBar from '../components/NavBar';
import { useAppDispatch, useAppSelector } from '../store';
import { register } from '../store/reducers/authReducer';

const Register: FC = () => {
	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
		repeatPassword: '',
	});
	const { errorMessage, isLoading } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(register(form));
	};

	return (
		<div className="center">
			<NavBar centered />
			<h2 className="regular-title">Register</h2>
			<form className="form" onSubmit={handleSubmit}>
				{errorMessage && (
					<div className="form__error-box red lighten-1 white-text">
						<p>{errorMessage}</p>
					</div>
				)}
				<TextInput
					s={12}
					label="Name"
					name="name"
					value={form.name}
					onChange={handleChange}
				/>
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
				<TextInput
					s={12}
					password
					label="Repeat your password"
					name="repeatPassword"
					value={form.repeatPassword}
					onChange={handleChange}
				/>
				<div className="center">
					<Button className="form__button" disabled={isLoading} type="submit">
						Register
					</Button>
				</div>
			</form>
		</div>
	);
};

export default Register;
