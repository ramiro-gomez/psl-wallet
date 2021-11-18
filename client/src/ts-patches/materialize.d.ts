import React from 'react';
import * as reactMaterialize from 'react-materialize';

declare module 'react-materialize' {
	export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {}
	// export interface DatePickerProps extends reactMaterialize.TextInputProps {}
	export interface DatePickerProps {
		s?: number,
		label?: string
		value?: Date,
	}
	export interface TimePickerProps extends reactMaterialize.TextInputProps {}
	export default reactMaterialize;
}
