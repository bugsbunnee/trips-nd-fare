import React from 'react';
import { useFormikContext, FormikValues } from 'formik';

import TextInput, { AppTextInputProps } from '@/components/ui/TextInput';

interface Props extends AppTextInputProps {
	name: string;
}

const FormField: React.FC<Props> = ({ name, width, ...otherProps }) => {
	const { setFieldTouched, setFieldValue, errors, touched, values } = useFormikContext();

	return (
		<TextInput
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
