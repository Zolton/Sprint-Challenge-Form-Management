import { withFormik, Form, Field } from "formik";
import React, { useState } from "react";
import { axiosWithAuth } from "../Security/axiosWithAuth";
import * as Yup from "yup";

function Login() {
  return (
    <Form>
      <Field type="text" name="username" />
      <Field type="password" name="password" />
      <button>Submit</button>
    </Form>
  );
}

const FormikLoginForm = withFormik({
  mapPropsToValue({ username, password }) {
    return {
      username: username || "",
      password: password || ""
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .min(3, "Minimum 3 char")
      .required("Username is required"),
    password: Yup.string()
      .min(3, "Minimum 3 char")
      .required("Password is required")
  }),

  handleSubmit(values, { resetForm, setErrors, setSubmitting, props }) {
    if (values.email === "alreadytaken@gmail.com") {
      setErrors({ email: "Try again" });
    } else {
      axiosWithAuth()
        .post("http://localhost:6000/api/register", values)
        .then(res => {
          console.log(res);
          resetForm();
          localStorage.setItem("token", res.data.token);
          props.history.push("/recipes");
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
        });
    }
  }
})(Login);
