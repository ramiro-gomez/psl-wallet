import { useHistory } from 'react-router-dom';
import { FC, FormEvent, useState } from 'react';
import NavBar from '../components/NavBar';
import { useAppDispatch, useAppSelector } from '../store';
import { addActivity } from '../store/reducers/activitiesReducer';
import { ActivityCategories, ActivityFormState, ActivityTypes } from '../types/Activity';
import ActivityForm from '../components/ActivityForm';

const Create: FC = () => {
	const { user } = useAppSelector((state) => state.auth);
	if (!user) throw new Error('user.accessToken doesn\'t exist on this component');
	const dispatch = useAppDispatch();
	const history = useHistory();
	const [isPending, setIsPending] = useState(false);

	const onSubmit = async (e: FormEvent<HTMLFormElement>, form: ActivityFormState) => {
		e.preventDefault();
		setIsPending(true);
		const { type } = await dispatch(addActivity({
			token: user.accessToken,
			activity: {
				concept: form.concept,
				category: form.category,
				type: form.type,
				amount: form.amount,
				date: new Date(`${form.date.toDateString()} ${form.time}`).toISOString(),
			},
		}));
		setIsPending(false);
		if (type.includes('fulfilled')) {
			history.push('/');
		}
	};

	return (
		<>
			<NavBar />
			<div className="center">
				<ActivityForm
					titleText="Create your activity"
					buttonText="Create"
					initialForm={{
						concept: '',
						category: ActivityCategories.FOOD,
						type: ActivityTypes.INCOME,
						amount: 0,
						date: new Date(),
						time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
					}}
					onSubmit={onSubmit}
					isPending={isPending}
					disableType={false}
				/>
			</div>
		</>
	);
};

export default Create;
