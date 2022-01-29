import { FC } from 'react';
import { Button } from 'react-materialize';
import { Link } from 'react-router-dom';
import ActivityTable from '../components/ActivityTable';
import NavBar from '../components/NavBar';
import { useAppSelector } from '../store';

const Home: FC = () => {
	const { user } = useAppSelector((state) => state.auth);
	const { balance } = useAppSelector((state) => state.activities);
	if (!user) throw new Error('user.accessToken doesn\'t exist on this component');

	return (
		<>
			<div className="center">
				<NavBar />
				<h4>
					Hello
					{' '}
					{user.name}
					!
				</h4>
				<section className="balance-box">
					<p className="balance-box__money">
						{balance < 0 ? '-' : ''}
						$
						{Math.abs(balance)}
					</p>
					<h3 className="balance-box__title">Balance</h3>
				</section>
				<section className="resume">
					<h3 className="resume__title">Last 10 activities</h3>
					<Link className="resume__link" to="/activities">Click here to view all</Link>
					<ActivityTable />
					<Link to="/create">
						<Button small>Add a new activity</Button>
					</Link>
				</section>
			</div>
		</>
	);
};

export default Home;
