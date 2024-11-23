import React from 'react';
import { useFormikContext, FormikValues } from 'formik';

import TextInput, { AppTextInputProps } from '@/components/ui/TextInput';

interface Props extends AppTextInputProps {
	name: string;
	Component?: React.FC;
}

const FormField: React.FC<Props> = ({ name, width, Component = TextInput,  ...otherProps }) => {
	const { setFieldTouched, setFieldValue, errors, touched, values } = useFormikContext();

	return (
		<Component
			onBlur={() => setFieldTouched(name)}
			onChangeText={(text: string) => setFieldValue(name, text)}
			value={(values as FormikValues)[name]}
			width={width}
			error={(touched as any)[name] ? (errors as any)[name] : null}
			{...otherProps}
		/>
	);
};

export default FormField;
