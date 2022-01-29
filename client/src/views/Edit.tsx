import { FC, FormEvent, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useAppDispatch, useAppSelector } from '../store';
import { editActivity } from '../store/reducers/activitiesReducer';
import { ActivityFormState } from '../types/Activity';
import ActivityForm from '../components/ActivityForm';

type EditorParam = {
	id: string
};

const Edit: FC = () => {
	const { user } = useAppSelector((state) => state.auth);
	if (!user) throw new Error('user.accessToken doesn\'t exist on this component');
	const { activityList } = useAppSelector((state) => state.activities);
	const dispatch = useAppDispatch();
	const { id } = useParams<EditorParam>();
	const activityToEdit = activityList.find((activity) => activity.id === Number(id));
	const history = useHistory();
	const [isPending, setIsPending] = useState(false);

	const onSubmit = async (e: FormEvent<HTMLFormElement>, form: ActivityFormState) => {
		e.preventDefault();
		setIsPending(true);
		const { type } = await dispatch(editActivity({
			token: user.accessToken,
			activity: {
				id: Number(id),
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
				{activityToEdit ? (
					<ActivityForm
						titleText="Edit your activity"
						buttonText="Edit"
						initialForm={{
							concept: activityToEdit.concept,
							category: activityToEdit.category,
							type: activityToEdit.type,
							amount: activityToEdit.amount,
							date: new Date(activityToEdit.date),
							time: new Date(activityToEdit.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
						}}
						onSubmit={onSubmit}
						isPending={isPending}
						disableType
					/>
				) : (
					<h4 className="editor__message red-text">
						Activity with id
						{' '}
						{id}
						{' '}
						doesn&apos;t exist
					</h4>
				)}
			</div>
		</>
	);
};

export default Edit;
