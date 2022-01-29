import { FC } from 'react';
import { Button, Icon, Table } from 'react-materialize';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { deleteActivity } from '../store/reducers/activitiesReducer';
import { Activity } from '../types/Activity';

interface Props {
	fullSize?: boolean,
	activityList: Activity[]
}
const defaultProps: Partial<Props> = {
	fullSize: false,
};

const ActivityTable: FC<Props> = ({ fullSize, activityList }) => {
	const { user } = useAppSelector((state) => state.auth);
	if (!user) throw new Error('user.accessToken doesn\'t exist on this component');
	const dispatch = useAppDispatch();

	return (
		<div className={`activity-table ${fullSize ? 'activity-table--full' : ''}`}>
			<Table centered>
				<thead className="activity-table__head">
					<tr>
						<th className="activity-table__th" data-field="concept">Concept</th>
						<th className="activity-table__th" data-field="category">Category</th>
						<th className="activity-table__th" data-field="type">Type</th>
						<th className="activity-table__th" data-field="date">Date</th>
						<th className="activity-table__th" data-field="amount">Amount</th>
						<th className="activity-table__th" data-field="edit">Edit</th>
						<th className="activity-table__th" data-field="delete">Delete</th>
					</tr>
				</thead>
				<tbody>
					{activityList.map(({
						id, concept, category, type, date, amount,
					}) => (
						<tr key={id}>
							<td>{concept}</td>
							<td>{category}</td>
							<td>{type}</td>
							<td>{new Date(date).toLocaleString()}</td>
							<td>{amount}</td>
							<td><Link to={`/edit/${id}`}><Icon>edit</Icon></Link></td>
							<td>
								<Button
									onClick={(e) => {
										dispatch(deleteActivity({ token: user.accessToken, activityID: id }));
										e.currentTarget.disabled = true;
									}}
								>
									<Icon>delete</Icon>
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			{!activityList.length && <p className="activity-table__message">You haven&apos;t added activities yet</p>}
		</div>
	);
};
ActivityTable.defaultProps = defaultProps;

export default ActivityTable;
