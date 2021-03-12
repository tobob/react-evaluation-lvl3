import React from "react";
import { Formik, Field, Form } from "formik";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import Header from "../../components/Header";

const AddUser = gql`
  mutation CreateUser($email: String!, $name: String!) {
    userCreateOne(record: { email: $email, name: $name }) {
      recordId
    }
  }
`;

const Add = () => {
  const [addUser] = useMutation(AddUser);
  let history = useHistory();

  return (
    <div>
      <Header>User add</Header>
      <div>
        <Formik
          initialValues={{
            name: "",
            email: "",
          }}
          onSubmit={async (values) => {
            console.log(values);
            await addUser({ variables: values });
            history.push("/users");
          }}
        >
          <Form>
            <label htmlFor="firstName">Name</label>
            <Field id="firstName" name="name" placeholder="bob" />

            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              placeholder="jane@acme.com"
              type="email"
            />
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Add;
