import { FC } from 'react';
import { Button } from 'react-materialize';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

interface Props {
	centered?: boolean,
}
const defaultProps = {
	centered: false,
};

const NavBar: FC<Props> = ({ centered }) => (
	<nav className={`navbar ${centered ? 'navbar--centered' : ''}`}>
		<Link className="navbar__logo-wrapper" to="/">
			<img className="navbar__logo" src={logo} alt="logo" />
		</Link>
		{!centered && <Button>Log out</Button>}
	</nav>
);
NavBar.defaultProps = defaultProps;

export default NavBar;
