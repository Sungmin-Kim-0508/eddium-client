import React from 'react'
import { Formik, Form } from 'formik';
import * as yup from "yup";
import { TextInput } from '../components/InputFields';
import Layout from '../components/Layout';
import Link from 'next/link';
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import { toastNotification } from '../utils/toasters';
import { useRouter } from 'next/router'
import { LoadingBtn, SubmitBtn } from '../components/Buttons';

type LoginProps = {
}

const MIN = 3; const MAX = 15;
const validationSchema = yup.object({
  email: yup.string().required('Please fill out email address.').email('Incorrect Email Address.'),
  password: yup.string()
    .required('Please fill out password.')
    .min(MIN, `A password has to be at least ${MIN} characters long.`)
    .max(MAX, `A password has to be between ${MIN} and ${MAX} characters long.`)
})

const Login: React.FC<LoginProps> = ({}) => {
  const [loginUser] = useLoginMutation()
  const router = useRouter()

  return (
    <Layout bgColor="bg-mediumPrimary">
      <div className="grid grid-rows-2 grid-flow-col gap-y-2">
        <div className="flex flex-col justify-center content-center">
          <h1 className="text-center text-5xl font-bold font-display">Get Inspired.</h1>
          <h1 className="text-center text-6xl font-bold font-display">Join Eddium.</h1>
          <p className="text-center mb-3">You don't have an account?</p>
          <Link href="/register">
            <a className="text-teal-400 text-center font-semibold text-xl mb-1"> Join Eddium</a>
          </Link>
          <Link href="/forgot-password">
            <a className="text-blue-600 text-center font-semibold mb-2"> Forgot your password?</a>
          </Link>
        </div>
        <Formik
            initialValues={{ email: '', firstName: '', lastName: '', password: '', confirmedPassword: ''}}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              const { data } = await loginUser({
                variables: values,
                update: (cache, { data }) => {
                  cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                      __typename: 'Query',
                      me: data?.login?.user
                    }
                  })
                }
              })
              if (data?.login.errors) {
                toastNotification.error(data?.login.errors[0]. message)
              } else if (data?.login.user) {
                router.push('/')
              }
            }}>
              {({ isSubmitting }) => (
                <div className="flex justify-center content-center">
                  <Form className="flex flex-col bg-white p-10 w-2/5">
                    <TextInput type="email" placeholder="Email Address" name="email" />
                    <TextInput type="password" placeholder="Password" name="password" />
                    <div className="text-center">
                      {isSubmitting && <LoadingBtn>Loading...</LoadingBtn>}
                      {!isSubmitting && <SubmitBtn>Sign In</SubmitBtn>}
                    </div>
                  </Form>
                </div>
              )}
          </Formik>
      </div>
    </Layout>
  );
}

export default Login