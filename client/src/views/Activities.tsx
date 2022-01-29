import { ChangeEvent, FC, useState } from 'react';
import { Select } from 'react-materialize';
import ActivityTable from '../components/ActivityTable';
import NavBar from '../components/NavBar';
import { useAppSelector } from '../store';
import { Activity, ActivityTypes } from '../types/Activity';

enum ExtendedTypes {
	NONE = 'None',
}
type ExtendedActivityTypes = ActivityTypes | ExtendedTypes;

const filterActivities = (activityList: Activity[], filterByType: ExtendedActivityTypes) => {
	if (filterByType === ExtendedTypes.NONE) return activityList;
	return activityList.filter(({ type }) => type === filterByType);
};

const Activities: FC = () => {
	const { activityList } = useAppSelector((state) => state.activities);
	const [filterByType, setFilterBy] = useState<ExtendedActivityTypes>(ExtendedTypes.NONE);
	const [filteredActivities, setFilteredActivities] = useState(filterActivities(activityList, filterByType));

	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const newFilterBy = e.currentTarget.value as ExtendedActivityTypes;
		setFilterBy(newFilterBy);
		setFilteredActivities(filterActivities(activityList, newFilterBy));
	};

	return (
		<>
			<NavBar />
			<div className="activity-filter">
				<label className="activity-filter__title" htmlFor="typeSelector">Filter by:</label>
				<Select
					id="typeSelector"
					value={filterByType}
					options={{ classes: 'activity-filter__input' }}
					onChange={handleChange}
				>
					{Object.values(ExtendedTypes).map((type) => (
						<option key={type} value={type}>{type}</option>
					))}
					{Object.values(ActivityTypes).map((type) => (
						<option key={type} value={type}>{type}</option>
					))}
				</Select>
			</div>
			<ActivityTable fullSize activityList={filteredActivities} />
		</>
	);
};

export default Activities;
