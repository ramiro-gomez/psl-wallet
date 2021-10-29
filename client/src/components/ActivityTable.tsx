import { FC } from 'react';
import { Icon, Table } from 'react-materialize';
import { Link } from 'react-router-dom';

interface Props {
	full?: boolean,
}
const defaultProps = {
	full: false,
};

const ActivityTable: FC<Props> = ({ full }) => (
	<div className={`activity-table ${full ? 'activity-table--full' : ''}`}>
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
				<tr>
					<td>Coffee</td>
					<td>Food</td>
					<td>Outflow</td>
					<td>11:00 10/21/2021</td>
					<td>$100</td>
					<td><Link to="/"><Icon>edit</Icon></Link></td>
					<td><Link to="/"><Icon>delete</Icon></Link></td>
				</tr>
				<tr>
					<td>Coffee</td>
					<td>Food</td>
					<td>Outflow</td>
					<td>11:00 10/21/2021</td>
					<td>$100</td>
					<td><Link to="/"><Icon>edit</Icon></Link></td>
					<td><Link to="/"><Icon>delete</Icon></Link></td>
				</tr>
				<tr>
					<td>Coffee</td>
					<td>Food</td>
					<td>Outflow</td>
					<td>11:00 10/21/2021</td>
					<td>$100</td>
					<td><Link to="/"><Icon>edit</Icon></Link></td>
					<td><Link to="/"><Icon>delete</Icon></Link></td>
				</tr>
				<tr>
					<td>Coffee</td>
					<td>Food</td>
					<td>Outflow</td>
					<td>11:00 10/21/2021</td>
					<td>$100</td>
					<td><Link to="/"><Icon>edit</Icon></Link></td>
					<td><Link to="/"><Icon>delete</Icon></Link></td>
				</tr>
				<tr>
					<td>Coffee</td>
					<td>Food</td>
					<td>Outflow</td>
					<td>11:00 10/21/2021</td>
					<td>$100</td>
					<td><Link to="/"><Icon>edit</Icon></Link></td>
					<td><Link to="/"><Icon>delete</Icon></Link></td>
				</tr>
				<tr>
					<td>Coffee</td>
					<td>Food</td>
					<td>Outflow</td>
					<td>11:00 10/21/2021</td>
					<td>$100</td>
					<td><Link to="/"><Icon>edit</Icon></Link></td>
					<td><Link to="/"><Icon>delete</Icon></Link></td>
				</tr>
				<tr>
					<td>Coffee</td>
					<td>Food</td>
					<td>Outflow</td>
					<td>11:00 10/21/2021</td>
					<td>$100</td>
					<td><Link to="/"><Icon>edit</Icon></Link></td>
					<td><Link to="/"><Icon>delete</Icon></Link></td>
				</tr>
				<tr>
					<td>Coffee</td>
					<td>Food</td>
					<td>Outflow</td>
					<td>11:00 10/21/2021</td>
					<td>$100</td>
					<td><Link to="/"><Icon>edit</Icon></Link></td>
					<td><Link to="/"><Icon>delete</Icon></Link></td>
				</tr>
				<tr>
					<td>Coffee</td>
					<td>Food</td>
					<td>Outflow</td>
					<td>11:00 10/21/2021</td>
					<td>$100</td>
					<td><Link to="/"><Icon>edit</Icon></Link></td>
					<td><Link to="/"><Icon>delete</Icon></Link></td>
				</tr>
				<tr>
					<td>Coffee</td>
					<td>Food</td>
					<td>Outflow</td>
					<td>11:00 10/21/2021</td>
					<td>$100</td>
					<td><Link to="/"><Icon>edit</Icon></Link></td>
					<td><Link to="/"><Icon>delete</Icon></Link></td>
				</tr>
			</tbody>
		</Table>
	</div>
);
ActivityTable.defaultProps = defaultProps;

export default ActivityTable;
