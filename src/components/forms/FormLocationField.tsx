import React from 'react';
import _ from 'lodash';

import { useFormikContext } from 'formik';

import GoogleTextInput, { GoogleTextInputProps } from '@/src/components/ui/GoogleTextInput';
import ErrorMessage from '@/src/components/forms/ErrorMessage';

interface Props extends Omit<GoogleTextInputProps, 'onPress' | 'initialLocation'> {
	name: string;
}

const FormField: React.FC<Props> = ({ name, ...otherProps }) => {
	const { setFieldTouched, setFieldValue, errors, values, touched } = useFormikContext();
	const value = _.get(values, name);

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
