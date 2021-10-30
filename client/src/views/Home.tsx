import { FC } from 'react';
import { Button } from 'react-materialize';
import { Link } from 'react-router-dom';
import ActivityTable from '../components/ActivityTable';
import NavBar from '../components/NavBar';

const Home: FC = () => (
	<>
		<div className="center">
			<NavBar />
			<section className="balance-box">
				<p className="balance-box__money">$100</p>
				<h3 className="balance-box__title">Balance</h3>
			</section>
			<section className="resume">
				<h3 className="resume__title">Last 10 activities</h3>
				<Link className="resume__link" to="/activities">Click here to view all</Link>
				<ActivityTable />
				<Button small>Add a new activity</Button>
			</section>
		</div>
	</>
);

export default Home;
