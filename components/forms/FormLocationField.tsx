import React from 'react';
import _ from 'lodash';

import { useFormikContext } from 'formik';

import GoogleTextInput, { GoogleTextInputProps } from '../ui/GoogleTextInput';
import ErrorMessage from './ErrorMessage';

interface Props extends Omit<GoogleTextInputProps, 'onPress' | 'initialLocation'> {
	name: string;
}

const FormField: React.FC<Props> = ({ name, ...otherProps }) => {
	const { setFieldTouched, setFieldValue, errors, values, touched } = useFormikContext();
	const value = _.get(values, name);

	console.log('value', value)

	return (
		<>
			<GoogleTextInput
				{...otherProps}
				initialLocation={value ? value.address : undefined}
				onPress={(location) => {
					setFieldTouched(name);
					setFieldValue(name, location);
				}}
			/>

			<ErrorMessage
				isVisible={_.get(touched, name)} 
				errorMessage={_.get(errors, name)} 
			/>
		</>

	);
};

export default FormField;
