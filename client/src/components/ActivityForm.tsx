import {
	ChangeEvent, FC, FormEvent, useEffect, useRef, useState,
} from 'react';
import {
	Button, Select, TextInput,
} from 'react-materialize';
import M from 'materialize-css';
import { ActivityCategories, ActivityFormState, ActivityTypes } from '../types/Activity';
import { useAppSelector } from '../store';

interface Props {
	titleText: string,
	buttonText: string,
	initialForm: ActivityFormState,
	onSubmit: (e: FormEvent<HTMLFormElement>, form: ActivityFormState) => Promise<void>,
	disableType: boolean,
	isPending: boolean,
}

const ActivityForm: FC<Props> = ({
	titleText, buttonText, initialForm, onSubmit, disableType, isPending,
}) => {
	const [form, _setForm] = useState<ActivityFormState>(initialForm);
	// Added ref to read updated state inside EventListeners
	const formRef = useRef(form);
	const setForm = (newState: typeof form) => {
		formRef.current = newState;
		_setForm(newState);
	};
	const { errorMessage } = useAppSelector((state) => state.activities);
	const dateInput = useRef<HTMLInputElement>(null);
	const timeInput = useRef<HTMLInputElement>(null);

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm({ ...form, [e.target.name]: e.target.value });

	useEffect(() => {
		// react-materialize DatePicker and TimePicker lacks some functionalities like onSave/onDone, so I added event listeners
		if (!dateInput.current) throw new Error('ref={dateInput} not found');
		if (!timeInput.current) throw new Error('ref={timeInput} not found');
		const datePicker = M.Datepicker.init(dateInput.current, {
			defaultDate: formRef.current.date,
			setDefaultDate: true,
		});
		const timePicker = M.Timepicker.init(timeInput.current);
		datePicker.doneBtn.addEventListener('click', () => setForm({
			...formRef.current,
			date: datePicker.date,
		}));
		timeInput.current.addEventListener('change', () => setForm({
			...formRef.current,
			time: `${timePicker.time} ${timePicker.amOrPm}`,
		}));
	}, []);

	return (
		<>
			<h2 className="regular-title">{titleText}</h2>
			<form className="form" onSubmit={(e) => onSubmit(e, form)}>
				{errorMessage && (
					<div className="form__error-box red white-text">
						<p>{errorMessage}</p>
					</div>
				)}
				<TextInput
					s={12}
					label="Concept"
					name="concept"
					value={form.concept}
					onChange={handleChange}
				/>
				<Select
					s={12}
					label="Category"
					name="category"
					value={form.category}
					onChange={handleChange}
					options={{
						classes: 'activity-filter__input',
					}}
				>
					{Object.values(ActivityCategories).map((category) => (
						<option key={category} value={category}>{category}</option>
					))}
				</Select>
				<Select
					s={12}
					label="Type"
					name="type"
					value={form.type}
					onChange={handleChange}
					options={{
						classes: 'activity-filter__input',
					}}
					disabled={disableType}
				>
					{Object.values(ActivityTypes).map((type) => (
						<option key={type} value={type}>{type}</option>
					))}
				</Select>
				<TextInput
					s={12}
					type="number"
					label="Amount"
					name="amount"
					value={form.amount.toString()}
					onChange={(e) => {
						const nAmount = Number(e.target.value);
						if (nAmount >= 0) {
							setForm({
								...form,
								amount: nAmount,
							});
						}
					}}
				/>
				<div className="row">
					<div className="input-field col s6">
						<input
							ref={dateInput}
							type="text"
							className="datepicker"
							id="date"
							readOnly
						/>
						<label htmlFor="date">Date</label>
					</div>
					<div className="input-field col s6">
						<input
							ref={timeInput}
							type="text"
							className="timepicker"
							id="time"
							value={form.time}
							readOnly
						/>
						<label htmlFor="time">Time</label>
					</div>
				</div>
				<div className="center">
					<Button className="form__button" type="submit" disabled={isPending}>{buttonText}</Button>
				</div>
			</form>
		</>
	);
};

export default ActivityForm;
