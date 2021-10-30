import { FC } from 'react';
import {
	Button, DatePicker, Select, TextInput, TimePicker,
} from 'react-materialize';
import NavBar from '../components/NavBar';

const Editor: FC = () => (
	<>
		<NavBar />
		<div className="center">
			<h2 className="regular-title">Create activity</h2>
			<form className="form">
				<div className="form__error-box red lighten-1 white-text">
					<p>Error message</p>
				</div>
				<TextInput s={12} label="Concept" />
				<Select
					s={12}
					label="Category"
					value=""
					options={{
						classes: 'activity-filter__input',
					}}
				>
					{['Food', 'Transport', 'Services', 'Clothing', 'Other'].map((category) => (
						<option value={category}>{category}</option>
					))}
				</Select>
				<Select
					s={12}
					label="Type"
					value="Outflow"
					options={{
						classes: 'activity-filter__input',
					}}
				>
					<option value="income">Income</option>
					<option value="outflow">Outflow</option>
				</Select>
				<TextInput s={12} label="Amount" type="number" />
				<div className="row">
					<DatePicker s={6} label="Date" />
					<TimePicker s={6} label="Time" value="00:00 AM" />
				</div>
				<div className="center">
					<Button className="form__button">
						Create
					</Button>
				</div>
			</form>
		</div>
	</>
);

export default Editor;
