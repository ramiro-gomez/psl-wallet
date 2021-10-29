import { FC } from 'react';
import { Button, Icon, Table } from 'react-materialize';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Home: FC = () => (
	<div className="custom-container">
		<nav className="navbar">
			<Link className="logo" to="/">
				<img className="logo__img" src={logo} alt="logo" />
			</Link>
			<Button>Log out</Button>
		</nav>
		<div className="center">
			<section className="balance-box">
				<p className="balance-box__money">$100</p>
				<h3 className="balance-box__title">Balance</h3>
			</section>
			<section className="resume">
				<h3 className="resume__title">Last 10 activities</h3>
				<Link className="resume__link" to="/">Click here to view all</Link>
				<div className="c-table">
					<Table centered>
						<thead className="c-table__head">
							<tr>
								<th className="c-table__th" data-field="concept">Concept</th>
								<th className="c-table__th" data-field="category">Category</th>
								<th className="c-table__th" data-field="type">Type</th>
								<th className="c-table__th" data-field="date">Date</th>
								<th className="c-table__th" data-field="amount">Amount</th>
								<th className="c-table__th" data-field="edit">Edit</th>
								<th className="c-table__th" data-field="delete">Delete</th>
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
				<Button small>Add a new activity</Button>
			</section>
		</div>
	</div>
);

export default Home;
