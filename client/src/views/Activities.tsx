import { FC } from 'react';
import { Select } from 'react-materialize';
import ActivityTable from '../components/ActivityTable';
import NavBar from '../components/NavBar';

const Activities: FC = () => (
	<div className="custom-container">
		<NavBar />
		<div className="activity-filter">
			<h3 className="activity-filter__title">Filter by:</h3>
			<Select
				value="Outflow"
				options={{
					classes: 'activity-filter__input',
				}}
			>
				<option value="income">Income</option>
				<option value="outflow">Outflow</option>
			</Select>
		</div>
		<ActivityTable full />
	</div>
);

export default Activities;
