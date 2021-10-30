import * as reactMaterialize from 'react-materialize';

declare module 'react-materialize' {
	export interface DatePickerProps {
		label?: string,
		s?: number
		value?: string,
	}
	export interface TimePickerProps {
		label?: string,
		s?: number
		value?: string,
	}
	export default reactMaterialize;
}
