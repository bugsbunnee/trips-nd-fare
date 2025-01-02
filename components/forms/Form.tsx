import React, { PropsWithChildren } from 'react';
import { Formik, FormikHelpers, FormikProps, FormikValues } from 'formik';

interface FormProps extends PropsWithChildren {
	initialValues: FormikValues;
	onSubmit: (values: any, helpers: FormikHelpers<any>) => void;
	validationSchema: unknown;
}

const Form = React.forwardRef<FormikProps<any> | null, FormProps>((props, ref) => {
	const { initialValues, onSubmit, validationSchema, children } = props;

	return (
		<Formik
			innerRef={ref}
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
			enableReinitialize
		>
			{() => <>{children}</>}
		</Formik>
	);
});

export default Form;
