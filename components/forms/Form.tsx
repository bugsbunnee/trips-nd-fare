import React, { PropsWithChildren } from 'react';
import { Formik, FormikValues } from 'formik';

interface FormProps extends PropsWithChildren {
	initialValues: FormikValues;
	onSubmit: (values: any) => void;
	validationSchema: unknown;
}

const Form: React.FC<FormProps> = ({
	initialValues,
	onSubmit,
	validationSchema,
	children,
}) => {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
			enableReinitialize
		>
			{() => <>{children}</>}
		</Formik>
	);
};

export default Form;
