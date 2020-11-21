import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  findBy?: Maybe<User>;
  getAllStories: Array<Story>;
  getAllStoriesByUserId: Array<Story>;
  getAllStoriesByMe: Array<Story>;
  getStoryBy: Story;
};


export type QueryGetAllStoriesByUserIdArgs = {
  isPublished?: Maybe<Scalars['Boolean']>;
  userId: Scalars['String'];
};


export type QueryGetAllStoriesByMeArgs = {
  isPublished?: Maybe<Scalars['Boolean']>;
};


export type QueryGetStoryByArgs = {
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

/** This is User model */
export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  stories?: Maybe<Array<Story>>;
  comments?: Maybe<Array<Comment>>;
  savedStories?: Maybe<Array<SavedStory>>;
};

export type Story = {
  __typename?: 'Story';
  id: Scalars['String'];
  title: Scalars['String'];
  content: Scalars['String'];
  view: Scalars['Float'];
  clap: Scalars['Float'];
  userId: Scalars['String'];
  isPublished: Scalars['Boolean'];
  thumbnail_image_url: Scalars['String'];
  user?: Maybe<User>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['String'];
  comment: Scalars['String'];
  userId: Scalars['String'];
};

export type SavedStory = {
  __typename?: 'SavedStory';
  id: Scalars['String'];
  storyId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  changePassword: UserResponse;
  createStory: Story;
  updateStory?: Maybe<Story>;
  deleteStory: DeleteResponse;
  createThumnail: UploadedFileResponse;
};


export type MutationRegisterArgs = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  confirmedPassword?: Maybe<Scalars['String']>;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  confirmedPassword?: Maybe<Scalars['String']>;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  token?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  confirmedPassword?: Maybe<Scalars['String']>;
};


export type MutationCreateStoryArgs = {
  isPublished: Scalars['Boolean'];
  imgUrl?: Maybe<Scalars['String']>;
  content: Scalars['String'];
  title: Scalars['String'];
};


export type MutationUpdateStoryArgs = {
  isPublished: Scalars['Boolean'];
  imgUrl?: Maybe<Scalars['String']>;
  content: Scalars['String'];
  title: Scalars['String'];
  id: Scalars['String'];
};


export type MutationDeleteStoryArgs = {
  id: Scalars['String'];
};


export type MutationCreateThumnailArgs = {
  image: Scalars['Upload'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type DeleteResponse = {
  __typename?: 'DeleteResponse';
  isDelete: Scalars['Boolean'];
  msg: Scalars['String'];
};

export type UploadedFileResponse = {
  __typename?: 'UploadedFileResponse';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  filename: Scalars['String'];
  mimetype: Scalars['String'];
  encoding: Scalars['String'];
  url: Scalars['String'];
};


export type RegisterMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  confirmedPassword: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & { savedStories?: Maybe<Array<(
        { __typename?: 'SavedStory' }
        & Pick<SavedStory, 'storyId'>
      )>> }
      & RegularUserFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type ChangePasswordMutationVariables = Exact<{
  password: Scalars['String'];
  confirmedPassword?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type CreateStoryMutationVariables = Exact<{
  title: Scalars['String'];
  content: Scalars['String'];
  imgUrl?: Maybe<Scalars['String']>;
  isPublished?: Maybe<Scalars['Boolean']>;
}>;


export type CreateStoryMutation = (
  { __typename?: 'Mutation' }
  & { createStory: (
    { __typename?: 'Story' }
    & RegularStoryFragment
  ) }
);

export type UpdateStoryMutationVariables = Exact<{
  id: Scalars['String'];
  title: Scalars['String'];
  content: Scalars['String'];
  imgUrl?: Maybe<Scalars['String']>;
  isPublished?: Maybe<Scalars['Boolean']>;
}>;


export type UpdateStoryMutation = (
  { __typename?: 'Mutation' }
  & { updateStory?: Maybe<(
    { __typename?: 'Story' }
    & RegularStoryFragment
  )> }
);

export type DeleteStoryMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteStoryMutation = (
  { __typename?: 'Mutation' }
  & { deleteStory: (
    { __typename?: 'DeleteResponse' }
    & Pick<DeleteResponse, 'isDelete' | 'msg'>
  ) }
);

export type CreateThumnailMutationVariables = Exact<{
  image: Scalars['Upload'];
}>;


export type CreateThumnailMutation = (
  { __typename?: 'Mutation' }
  & { createThumnail: (
    { __typename?: 'UploadedFileResponse' }
    & Pick<UploadedFileResponse, 'success' | 'message' | 'url'>
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type GetAllStoriesForHomePageQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllStoriesForHomePageQuery = (
  { __typename?: 'Query' }
  & { getAllStories: Array<(
    { __typename?: 'Story' }
    & Pick<Story, 'id' | 'title' | 'content' | 'thumbnail_image_url' | 'createdAt'>
  )> }
);

export type GetAllStoryListByMeQueryVariables = Exact<{
  isPublished?: Maybe<Scalars['Boolean']>;
}>;


export type GetAllStoryListByMeQuery = (
  { __typename?: 'Query' }
  & { getAllStoriesByMe: Array<(
    { __typename?: 'Story' }
    & RegularStoryFragment
  )> }
);

export type GetStoryByStoryIdQueryVariables = Exact<{
  id?: Maybe<Scalars['String']>;
}>;


export type GetStoryByStoryIdQuery = (
  { __typename?: 'Query' }
  & { getStoryBy: (
    { __typename?: 'Story' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'firstName' | 'lastName'>
    )> }
    & RegularStoryFragment
  ) }
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
);

export type RegularStoryFragment = (
  { __typename?: 'Story' }
  & Pick<Story, 'id' | 'title' | 'content' | 'view' | 'clap' | 'isPublished' | 'thumbnail_image_url' | 'createdAt' | 'updatedAt'>
);

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  firstName
  lastName
  email
}
    `;
export const RegularStoryFragmentDoc = gql`
    fragment RegularStory on Story {
  id
  title
  content
  view
  clap
  isPublished
  thumbnail_image_url
  createdAt
  updatedAt
}
    `;
export const RegisterDocument = gql`
    mutation Register($firstName: String!, $lastName: String!, $email: String!, $password: String!, $confirmedPassword: String!) {
  register(email: $email, firstName: $firstName, lastName: $lastName, password: $password, confirmedPassword: $confirmedPassword) {
    user {
      id
      firstName
      lastName
      email
    }
    errors {
      field
      message
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      confirmedPassword: // value for 'confirmedPassword'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      ...RegularUser
      savedStories {
        storyId
      }
    }
    errors {
      field
      message
    }
  }
}
    ${RegularUserFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($password: String!, $confirmedPassword: String, $token: String) {
  changePassword(password: $password, confirmedPassword: $confirmedPassword, token: $token) {
    user {
      ...RegularUser
    }
    errors {
      field
      message
    }
  }
}
    ${RegularUserFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      password: // value for 'password'
 *      confirmedPassword: // value for 'confirmedPassword'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateStoryDocument = gql`
    mutation CreateStory($title: String!, $content: String!, $imgUrl: String, $isPublished: Boolean = false) {
  createStory(title: $title, content: $content, imgUrl: $imgUrl, isPublished: $isPublished) {
    ...RegularStory
  }
}
    ${RegularStoryFragmentDoc}`;
export type CreateStoryMutationFn = Apollo.MutationFunction<CreateStoryMutation, CreateStoryMutationVariables>;

/**
 * __useCreateStoryMutation__
 *
 * To run a mutation, you first call `useCreateStoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStoryMutation, { data, loading, error }] = useCreateStoryMutation({
 *   variables: {
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      imgUrl: // value for 'imgUrl'
 *      isPublished: // value for 'isPublished'
 *   },
 * });
 */
export function useCreateStoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateStoryMutation, CreateStoryMutationVariables>) {
        return Apollo.useMutation<CreateStoryMutation, CreateStoryMutationVariables>(CreateStoryDocument, baseOptions);
      }
export type CreateStoryMutationHookResult = ReturnType<typeof useCreateStoryMutation>;
export type CreateStoryMutationResult = Apollo.MutationResult<CreateStoryMutation>;
export type CreateStoryMutationOptions = Apollo.BaseMutationOptions<CreateStoryMutation, CreateStoryMutationVariables>;
export const UpdateStoryDocument = gql`
    mutation UpdateStory($id: String!, $title: String!, $content: String!, $imgUrl: String, $isPublished: Boolean = false) {
  updateStory(id: $id, title: $title, content: $content, imgUrl: $imgUrl, isPublished: $isPublished) {
    ...RegularStory
  }
}
    ${RegularStoryFragmentDoc}`;
export type UpdateStoryMutationFn = Apollo.MutationFunction<UpdateStoryMutation, UpdateStoryMutationVariables>;

/**
 * __useUpdateStoryMutation__
 *
 * To run a mutation, you first call `useUpdateStoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStoryMutation, { data, loading, error }] = useUpdateStoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      imgUrl: // value for 'imgUrl'
 *      isPublished: // value for 'isPublished'
 *   },
 * });
 */
export function useUpdateStoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStoryMutation, UpdateStoryMutationVariables>) {
        return Apollo.useMutation<UpdateStoryMutation, UpdateStoryMutationVariables>(UpdateStoryDocument, baseOptions);
      }
export type UpdateStoryMutationHookResult = ReturnType<typeof useUpdateStoryMutation>;
export type UpdateStoryMutationResult = Apollo.MutationResult<UpdateStoryMutation>;
export type UpdateStoryMutationOptions = Apollo.BaseMutationOptions<UpdateStoryMutation, UpdateStoryMutationVariables>;
export const DeleteStoryDocument = gql`
    mutation DeleteStory($id: String!) {
  deleteStory(id: $id) {
    isDelete
    msg
  }
}
    `;
export type DeleteStoryMutationFn = Apollo.MutationFunction<DeleteStoryMutation, DeleteStoryMutationVariables>;

/**
 * __useDeleteStoryMutation__
 *
 * To run a mutation, you first call `useDeleteStoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteStoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteStoryMutation, { data, loading, error }] = useDeleteStoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteStoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteStoryMutation, DeleteStoryMutationVariables>) {
        return Apollo.useMutation<DeleteStoryMutation, DeleteStoryMutationVariables>(DeleteStoryDocument, baseOptions);
      }
export type DeleteStoryMutationHookResult = ReturnType<typeof useDeleteStoryMutation>;
export type DeleteStoryMutationResult = Apollo.MutationResult<DeleteStoryMutation>;
export type DeleteStoryMutationOptions = Apollo.BaseMutationOptions<DeleteStoryMutation, DeleteStoryMutationVariables>;
export const CreateThumnailDocument = gql`
    mutation CreateThumnail($image: Upload!) {
  createThumnail(image: $image) {
    success
    message
    url
  }
}
    `;
export type CreateThumnailMutationFn = Apollo.MutationFunction<CreateThumnailMutation, CreateThumnailMutationVariables>;

/**
 * __useCreateThumnailMutation__
 *
 * To run a mutation, you first call `useCreateThumnailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateThumnailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createThumnailMutation, { data, loading, error }] = useCreateThumnailMutation({
 *   variables: {
 *      image: // value for 'image'
 *   },
 * });
 */
export function useCreateThumnailMutation(baseOptions?: Apollo.MutationHookOptions<CreateThumnailMutation, CreateThumnailMutationVariables>) {
        return Apollo.useMutation<CreateThumnailMutation, CreateThumnailMutationVariables>(CreateThumnailDocument, baseOptions);
      }
export type CreateThumnailMutationHookResult = ReturnType<typeof useCreateThumnailMutation>;
export type CreateThumnailMutationResult = Apollo.MutationResult<CreateThumnailMutation>;
export type CreateThumnailMutationOptions = Apollo.BaseMutationOptions<CreateThumnailMutation, CreateThumnailMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const GetAllStoriesForHomePageDocument = gql`
    query GetAllStoriesForHomePage {
  getAllStories {
    id
    title
    content
    thumbnail_image_url
    createdAt
  }
}
    `;

/**
 * __useGetAllStoriesForHomePageQuery__
 *
 * To run a query within a React component, call `useGetAllStoriesForHomePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllStoriesForHomePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllStoriesForHomePageQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllStoriesForHomePageQuery(baseOptions?: Apollo.QueryHookOptions<GetAllStoriesForHomePageQuery, GetAllStoriesForHomePageQueryVariables>) {
        return Apollo.useQuery<GetAllStoriesForHomePageQuery, GetAllStoriesForHomePageQueryVariables>(GetAllStoriesForHomePageDocument, baseOptions);
      }
export function useGetAllStoriesForHomePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllStoriesForHomePageQuery, GetAllStoriesForHomePageQueryVariables>) {
          return Apollo.useLazyQuery<GetAllStoriesForHomePageQuery, GetAllStoriesForHomePageQueryVariables>(GetAllStoriesForHomePageDocument, baseOptions);
        }
export type GetAllStoriesForHomePageQueryHookResult = ReturnType<typeof useGetAllStoriesForHomePageQuery>;
export type GetAllStoriesForHomePageLazyQueryHookResult = ReturnType<typeof useGetAllStoriesForHomePageLazyQuery>;
export type GetAllStoriesForHomePageQueryResult = Apollo.QueryResult<GetAllStoriesForHomePageQuery, GetAllStoriesForHomePageQueryVariables>;
export const GetAllStoryListByMeDocument = gql`
    query GetAllStoryListByMe($isPublished: Boolean = false) {
  getAllStoriesByMe(isPublished: $isPublished) {
    ...RegularStory
  }
}
    ${RegularStoryFragmentDoc}`;

/**
 * __useGetAllStoryListByMeQuery__
 *
 * To run a query within a React component, call `useGetAllStoryListByMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllStoryListByMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllStoryListByMeQuery({
 *   variables: {
 *      isPublished: // value for 'isPublished'
 *   },
 * });
 */
export function useGetAllStoryListByMeQuery(baseOptions?: Apollo.QueryHookOptions<GetAllStoryListByMeQuery, GetAllStoryListByMeQueryVariables>) {
        return Apollo.useQuery<GetAllStoryListByMeQuery, GetAllStoryListByMeQueryVariables>(GetAllStoryListByMeDocument, baseOptions);
      }
export function useGetAllStoryListByMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllStoryListByMeQuery, GetAllStoryListByMeQueryVariables>) {
          return Apollo.useLazyQuery<GetAllStoryListByMeQuery, GetAllStoryListByMeQueryVariables>(GetAllStoryListByMeDocument, baseOptions);
        }
export type GetAllStoryListByMeQueryHookResult = ReturnType<typeof useGetAllStoryListByMeQuery>;
export type GetAllStoryListByMeLazyQueryHookResult = ReturnType<typeof useGetAllStoryListByMeLazyQuery>;
export type GetAllStoryListByMeQueryResult = Apollo.QueryResult<GetAllStoryListByMeQuery, GetAllStoryListByMeQueryVariables>;
export const GetStoryByStoryIdDocument = gql`
    query GetStoryByStoryId($id: String) {
  getStoryBy(id: $id) {
    ...RegularStory
    user {
      firstName
      lastName
    }
  }
}
    ${RegularStoryFragmentDoc}`;

/**
 * __useGetStoryByStoryIdQuery__
 *
 * To run a query within a React component, call `useGetStoryByStoryIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStoryByStoryIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStoryByStoryIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetStoryByStoryIdQuery(baseOptions?: Apollo.QueryHookOptions<GetStoryByStoryIdQuery, GetStoryByStoryIdQueryVariables>) {
        return Apollo.useQuery<GetStoryByStoryIdQuery, GetStoryByStoryIdQueryVariables>(GetStoryByStoryIdDocument, baseOptions);
      }
export function useGetStoryByStoryIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStoryByStoryIdQuery, GetStoryByStoryIdQueryVariables>) {
          return Apollo.useLazyQuery<GetStoryByStoryIdQuery, GetStoryByStoryIdQueryVariables>(GetStoryByStoryIdDocument, baseOptions);
        }
export type GetStoryByStoryIdQueryHookResult = ReturnType<typeof useGetStoryByStoryIdQuery>;
export type GetStoryByStoryIdLazyQueryHookResult = ReturnType<typeof useGetStoryByStoryIdLazyQuery>;
export type GetStoryByStoryIdQueryResult = Apollo.QueryResult<GetStoryByStoryIdQuery, GetStoryByStoryIdQueryVariables>;