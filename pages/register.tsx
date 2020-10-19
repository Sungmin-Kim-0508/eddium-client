import React from 'react'
import Layout from '../components/Layout'
import { TextInput } from "../components/FormFields"
import { Formik, Form } from 'formik'
import * as yup from "yup";

type RegisterProps = {
}

const validationSchema = yup.object({
  email: yup.string().required('Please fill out email address.').email('Incorrect Email Address.'),
  firstName: yup.string().required('Please fill out first name.'),
  lastName: yup.string().required('Please fill out last name.'),
  password: yup.string().required('Please fill out password.'),
  confirmedPassword: yup.string().required('Please fill out confirmed password.'),
})

const Register: React.FC<RegisterProps> = ({}) => {
  return (
    <Layout bgColor="bg-mediumPrimary">
      <div className="grid grid-cols-2 grid-rows-1">
        <div className="flex flex-col justify-center content-center">
          <h1 className="text-center text-6xl font-bold font-display">Join Eddium.</h1>
          <p className="text-center text-2xl mb-3">A place where your words matter.</p>
          <p className="text-center">Already have an account? <a href="#" className="text-teal-400 font-semibold">Sign In</a></p>
        </div>
        <Formik
            initialValues={{ email: '', firstName: '', lastName: '', password: '', confirmedPassword: ''}}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log('submit: ', values)
            }}>
              {({ isSubmitting, errors }) => (
                <Form className="flex flex-col justify-center content-center bg-white p-10">
                  <TextInput type="email" placeholder="Email Address" name="email" />
                  <TextInput type="text" placeholder="First Name" name="firstName" />
                  <TextInput type="text" placeholder="Last Name" name="lastName" />
                  <TextInput type="password" placeholder="Password" name="password" />
                  <TextInput type="password" placeholder="Confirmed Password" name="confirmedPassword" />
                  <div className="text-center">
                    <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Sign Up</button>
                  </div>
                </Form>
              )}
          </Formik>
      </div>
    </Layout>
  );
}

export default Register