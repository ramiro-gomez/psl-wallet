export interface Activity {
	id: number,
    concept: string,
    type: ActivityTypes,
    amount: number,
    category: ActivityCategories,
    date: string
}

export enum ActivityTypes {
	INCOME = 'Income',
	OUTFLOW = 'Outflow'
}
export enum ActivityCategories {
	FOOD = 'Food',
	TRANSPORT = 'Transport',
	SERVICES = 'Services',
	CLOTHING = 'Clothing',
	OTHER = 'Other'
}

export interface GetActivitiesProps {
	token: string
}
export interface AddActivityProps {
	token: string,
	activity: Omit<Activity, 'id'>
}
export interface EditActivityProps {
	token: string,
	activity: Activity
}
export interface DeleteActivityProps {
	token: string,
	activityID: number,
}

export interface ActivityFormState {
    concept: string,
    category: ActivityCategories,
    type: ActivityTypes,
    amount: number,
    date: Date,
    time: string
}
