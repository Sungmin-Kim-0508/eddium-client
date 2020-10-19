import React from 'react'
import { Field, useField } from 'formik'

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
}


export const TextInput: React.FC<InputFieldProps> = ({ type, placeholder, className, ...props }) => {
  const [field, { touched, error }] = useField({ ...props, type });
  return (
    <>
      <div className="mb-6">
        <Field {...field} placeholder={placeholder} className="border-b-2 focus:outline-none py-2 px-4 w-11/12 ml-3" />
        {touched && error && <p className="text-red-500 text-xs italic ml-6">{error}</p>}
      </div>
    </>
  );
}
