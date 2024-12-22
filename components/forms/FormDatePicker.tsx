import React from 'react';
import { useFormikContext, FormikValues } from 'formik';

import { DatePicker } from '../ui';
import { DatePickerProps } from '../ui/DatePicker';

interface Props extends Omit<DatePickerProps, 'value' | 'onPress' | 'onDateChange'> {
	name: string;
	Component?: React.FC;
}

const FormDatePicker: React.FC<Props> = ({ name, width,  ...otherProps }) => {
	const { setFieldTouched, setFieldValue, errors, touched, values } = useFormikContext();

	return (
		<DatePicker
			{...otherProps}
			onPress={() => setFieldTouched(name)}
			onDateChange={(date: Date) => setFieldValue(name, date)}
			value={(values as FormikValues)[name]}
			width={width}
			error={(touched as any)[name] ? (errors as any)[name] : null}
		/>
	);
};

export default FormDatePicker;
