import React, { useState } from 'react'
import Layout from '../../components/Layout';
import { useRouter } from 'next/router'
import { Form, Formik } from 'formik';
import { LoadingBtn, SubmitBtn } from '../../components/Buttons';
import { TextInput } from '../../components/FormFields';
import { MeDocument, MeQuery, useChangePasswordMutation } from '../../generated/graphql';
import Link from 'next/link';

const ChangePassword = () => {
  const router = useRouter()
  const { token } = router.query
  const [tokenErrorMsg, setTokenErrorMsg] = useState<string>('')
  const [changePassword] = useChangePasswordMutation()

  return (
    <Layout bgColor="bg-mediumPrimary">
      <div>
        <h1 className="h-24 text-center text-4xl font-bold font-display">Change the password</h1>
        <Formik
          initialValues={{ password: '', confirmedPassword: ''}}
          onSubmit={async (values) => {
            const { data } = await changePassword({
              variables: {...values, token: token as string },
              update: (cache, { data }) => {
                cache.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    __typename: "Query",
                    me: data?.changePassword.user,
                  },
                });
              }
            })
            if (data?.changePassword.errors) {
              setTokenErrorMsg(data?.changePassword.errors[0]?.message)
            } else if (data?.changePassword?.user) {
              router.push('/')
            }
          }}>
            {({ isSubmitting }) => (
              <div className="flex justify-center content-center">
                {tokenErrorMsg.length > 0 ? (
                  <div className="text-center">
                    <p className="text-center mb-3">{tokenErrorMsg}</p>
                    <Link href="/forgot-password">
                      <a className="inline-block px-4 py-2 bg-gray-800 text-white text-sm rounded">
                        Go to Change Password
                      </a>
                    </Link>
                  </div>
                ) : (
                  <Form className="flex flex-col bg-white p-10 w-2/5">
                    <TextInput type="password" placeholder="Password" name="password" />
                    <TextInput type="password" placeholder="Confirmed Password" name="confirmedPassword" />
                    <div className="text-center">
                      {isSubmitting && <LoadingBtn>Loading...</LoadingBtn>}
                      {!isSubmitting && <SubmitBtn>Sign In</SubmitBtn>}
                    </div>
                  </Form>
                )}

            </div>
            )}
        </Formik>
      </div>
    </Layout>
  )
}

export default ChangePassword