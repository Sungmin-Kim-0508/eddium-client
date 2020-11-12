import React, { useState } from 'react'
import Layout from '../components/Layout';
import { Formik, Form } from 'formik'
import { TextInput } from '../components/InputFields';
import { LoadingBtn, SubmitBtn } from '../components/Buttons';
import { useForgotPasswordMutation } from '../generated/graphql';

type ForgotPasswordProps = {
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({}) => {
  const [complete, setComplete] = useState(false)
  const [fotgotPassword, { loading }] = useForgotPasswordMutation()
  return (
    <Layout bgColor="bg-mediumPrimary">
      <div className="">
        <h1 className="h-24 text-center text-4xl font-bold font-display">Don't worry. It happens.😉</h1>
        <Formik
          initialValues={{ email: '' }}
          onSubmit={async (values) => {
            await fotgotPassword({ variables: values })
            setComplete(true)
          }}
          >
            <div className="flex justify-center">
              {complete ? (
                <div>
                  <p>If an account exists, we've sent you the link to reset your password</p>
                </div>
              ) : (
                <Form className="bg-white p-5 w-2/5">
                  <TextInput type="email" placeholder="Email Address" name="email" />
                  <div className="text-center">
                    {!complete && !loading && <SubmitBtn>Forgot password</SubmitBtn>}
                    {!complete && loading && <LoadingBtn>Loading...</LoadingBtn>}
                  </div>
                </Form>
              )}
            </div>
        </Formik>
      </div>
    </Layout>
  );
}

export default ForgotPassword