import { FC } from 'react';
import { Button } from 'react-materialize';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useAppDispatch } from '../store';
import { logOut } from '../store/reducers/authReducer';

interface Props {
	centered?: boolean,
}
const defaultProps = {
	centered: false,
};

const NavBar: FC<Props> = ({ centered }) => {
	const dispatch = useAppDispatch();

	return (
		<nav className={`navbar ${centered ? 'navbar--centered' : ''}`}>
			<Link className="navbar__logo-wrapper" to="/">
				<img className="navbar__logo" src={logo} alt="logo" />
			</Link>
			{!centered && <Button onClick={() => dispatch(logOut())}>Log out</Button>}
		</nav>
	);
};
NavBar.defaultProps = defaultProps;

export default NavBar;
