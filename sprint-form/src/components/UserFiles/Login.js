import { withFormik, Form, Field } from "formik";
import React, { useState } from "react";
import { axiosWithAuth } from "../Security/axiosWithAuth";
import * as Yup from "yup";

const  Login = () => {
  return (
    <Form>
      <Field type="text" name="name" />

      <Field type="password" name="password" />
      <button type="submit">Submit</button>
    </Form>
  );
}

const FormikLoginForm = withFormik({
  mapPropsToValue({ name, password }) {
    return {
      name: name || "",
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
        .post("http://localhost:5000/api/register", values)
        .then(res => {
          console.log(res);
          //resetForm();
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
        })
        .catch(error=>console.log(error))
    }
  }
})(Login);

export default FormikLoginForm;