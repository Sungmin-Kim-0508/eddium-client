import React from 'react'
import Layout from '../components/Layout'
import { TextInput } from "../components/FormFields"
import { Formik, Form } from 'formik'
import * as yup from "yup";
import { useRegisterMutation } from '../generated/graphql';
import { toastNotification } from '../utils/toasters'

type RegisterProps = {
}

const MIN = 3; const MAX = 15;

const validationSchema = yup.object({
  email: yup.string().required('Please fill out email address.').email('Incorrect Email Address.'),
  firstName: yup.string().required('Please fill out first name.'),
  lastName: yup.string().required('Please fill out last name.'),
  password: yup.string()
    .required('Please fill out password.')
    .min(MIN, `A password has to be at least ${MIN} characters long.`)
    .max(MAX, `A password has to be between ${MIN} and ${MAX} characters long.`),
  confirmedPassword: yup.string()
    .required('Please fill out confirmed password.')
    .min(MIN, `A password has to be at least ${MIN} characters long.`)
    .max(MAX, `A password has to be between ${MIN} and ${MAX} characters long.`)
})

const Register: React.FC<RegisterProps> = ({}) => {
  const [registerUser] = useRegisterMutation()
  
  return (
    <Layout bgColor="bg-mediumPrimary">
      <div className="grid grid-cols-2 grid-flow-row">
        <div className="flex flex-col justify-center content-center">
          <h1 className="text-center text-6xl font-bold font-display">Join Eddium.</h1>
          <p className="text-center text-2xl mb-3">A place where your words matter.</p>
          <p className="text-center">Already have an account? <a href="#" className="text-teal-400 font-semibold">Sign In</a></p>
        </div>
        <Formik
            initialValues={{ email: '', firstName: '', lastName: '', password: '', confirmedPassword: ''}}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              const { data } = await registerUser({ variables: values })
              if (data?.register.errors) {
                toastNotification.error(data?.register.errors[0].message)
              } else if (data?.register.user) {
                toastNotification.success('🎉Congratuation to join on Eddium!')
              }
            }}>
              {({ isSubmitting }) => (
                <Form className="flex flex-col justify-center content-center bg-white p-10">
                  <TextInput type="email" placeholder="Email Address" name="email" />
                  <TextInput type="text" placeholder="First Name" name="firstName" />
                  <TextInput type="text" placeholder="Last Name" name="lastName" />
                  <TextInput type="password" placeholder="Password" name="password" />
                  <TextInput type="password" placeholder="Confirmed Password" name="confirmedPassword" />
                  <div className="text-center">
                    {isSubmitting && <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed">Loading</button>}
                    {!isSubmitting && <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Sign Up</button>}
                  </div>
                </Form>
              )}
          </Formik>
      </div>
    </Layout>
  );
}

export default Register