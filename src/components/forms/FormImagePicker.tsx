import React from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import ImagePickerList from '../ui/ImagePickerList';

interface Props {
  name: string;
}

function FormImagePicker({ name }: Props) {
  const { errors, setFieldValue, touched, values } = useFormikContext<Record<string, string[]>>();
  const imageUris = values[name];

  const handleAdd = (uri: string) => {
    setFieldValue(name, [...imageUris, uri]);
  };

  const handleRemove = (uri: string) => {
    setFieldValue(name, imageUris.filter((imageUri) => imageUri !== uri));
  };

  return (
    <>
      <ImagePickerList
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />
      <ErrorMessage errorMessage={errors[name] as string} isVisible={touched[name] as boolean} />
    </>
  );
}

export default FormImagePicker;
