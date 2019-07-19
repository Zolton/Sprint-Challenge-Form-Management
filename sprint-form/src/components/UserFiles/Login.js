import { withFormik, Form, Field } from "formik";
import React, { useState } from "react";
import { axiosWithAuth } from "../Security/axiosWithAuth";
import * as Yup from "yup";

// Just use Login to render out a form, nothing else.  Leave the
// heavy lifting to Formik

const Register = props => {
  return (
    <Form>
      <h2>You aren't registered! You're seeing this because you don't have a token in your local storage</h2>
      <div><label>Desired Username  </label><Field type="text" name="username" /></div>
      <div><label>Desired Password  </label><Field type="password" name="password" /></div>
      <button type="submit">Submit</button>
    </Form>
  );
};

const Login = props => {
  return (
    <Form>
      <h2>Please register</h2>
      <div><label>Username  </label><Field type="text" name="username" /></div>
      <div><label>Password  </label><Field type="password" name="password" /></div>
      <button type="submit">Submit</button>
    </Form>
  );
};

//  Tells Formik what to expect from the form, what to send to the server
const FormikLoginForm = withFormik({
  mapPropsToValue({ username, password }) {
    return {
      username: username || "",
      password: password || ""
    };
  },

  // Optional validation schema - throws a user error via {touch.error} if you want
  // a better user experience
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .min(3, "Minimum 3 char")
      .required("Username is required"),
    password: Yup.string()
      .min(3, "Minimum 3 char")
      .required("Password is required")
  }),

  // Values is the return above, what the object looks like that's being sent to the server
  //  Props comes in if you want to create a history push after successful login
  handleSubmit(values, { resetForm, setErrors, setSubmitting, props }) {
    if (values.email === "alreadytaken@gmail.com") {
      setErrors({ email: "Try again" });
    } else {
      //  Posts to the registration endpoint
      // As before, values is the user-created object, its shape defined in the return above
      axiosWithAuth()
        .post("http://localhost:5000/api/register", values)
        .then(res => {
          //   console.log("server successful response below");
          //   console.log(res);
          //resetForm();
          localStorage.setItem("token", res.data.token);
          props.history.push("/recipes");
          // Was gonna use this as a custom hook from the dark mode project,
          // but needlessly complicated when I've got
          // a backend server doing the work for me

          //   const useLocal = () => {
          //       const [storedValue, setStoredValue] = useState(()=>{
          //           const item = localStorage.getItem("token")
          //           return item ? JSON.parse(item) : value
          //       })
          //       const setValue = (value) => {
          //           localStorage.setItem("token", JSON.stringify(value))
          //           setStoredValue(value)
          //       }
          //       return [storedValue, setValue]
          //   }
        })
        .catch(error => {
          console.log("server failure response below");
          console.log(error);
        });
    }
  }
})(localStorage.getItem("token") ? Login : Register);
// Wrap Login inside Formik, it never comes out on its own

export default FormikLoginForm;
