import { signupInitialValues, signup_validation } from "@/utils/functions";
import { useFormik } from "formik";
import React from "react";
import { useRouter } from "next/router";

export default function Signup() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: signupInitialValues,
    validate: signup_validation,
    onSubmit,
  });

  async function onSubmit(values: typeof signupInitialValues) {
    console.log({ values });
    const { firstname, lastname, email, password } = values;
    const name = firstname + " " + lastname;

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    };

    await fetch("http://localhost:3000/api/auth/signup", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log({ data });
          router.push("/login");
          formik.resetForm();
        }
      });
  }

  return (
    <div className=" flex justify-center bg-gradient-to-r">
      <div className="bg-white p-8 rounded-lg shadow-lg sm:w-96 w-full">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Sign Up
        </h2>
        <form noValidate onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                className={`w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 ${
                  formik.errors.firstname &&
                  formik.touched.firstname &&
                  "border-rose-600"
                } `}
                placeholder="Your first name"
                // value={formik.values.firstname}
                // onChange={formik.handleChange}
                {...formik.getFieldProps("firstname")}
              />
              {formik.errors.firstname && formik.touched.firstname && (
                <span className="inline-flex text-xs text-red-700">
                  {formik.errors.firstname}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                className={`w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 ${
                  formik.errors.lastname &&
                  formik.touched.lastname &&
                  "border-rose-600"
                } `}
                placeholder="Your last name"
                {...formik.getFieldProps("lastname")}
                // value={formik.values.lastname}
                // onChange={formik.handleChange}
              />
              {formik.errors.lastname && formik.touched.lastname && (
                <span className="inline-flex text-xs text-red-700">
                  {formik.errors.lastname}
                </span>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className={`w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 ${
                formik.errors.email && formik.touched.email && "border-rose-600"
              } `}
              placeholder="Your email address"
              {...formik.getFieldProps("email")}
              // value={formik.values.email}
              // onChange={formik.handleChange}
            />
            {formik.errors.email && formik.touched.email && (
              <span className="inline-flex text-xs text-red-700">
                {formik.errors.email}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className={`w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 ${
                formik.errors.password &&
                formik.touched.password &&
                "border-rose-600"
              } `}
              placeholder="Your password"
              {...formik.getFieldProps("password")}
              // value={formik.values.password}
              // onChange={formik.handleChange}
            />
            {formik.errors.password && formik.touched.password && (
              <span className="inline-flex text-xs text-red-700">
                {formik.errors.password}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className={`w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 ${
                formik.errors.confirm_password &&
                formik.touched.confirm_password &&
                "border-rose-600"
              } `}
              placeholder="Confirm password"
              {...formik.getFieldProps("confirm_password")}
              // value={formik.values.confirm_password}
              // onChange={formik.handleChange}
            />
            {formik.errors.confirm_password &&
              formik.touched.confirm_password && (
                <span className="inline-flex text-xs text-red-700">
                  {formik.errors.confirm_password}
                </span>
              )}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-slate-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
