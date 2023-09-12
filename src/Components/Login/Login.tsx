import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { loginInitialValues, login_validation } from "@/utils/functions";
import { useFormik } from "formik";

export default function Login() {
  const router = useRouter();

  const onSubmit = async (values: typeof loginInitialValues) => {
    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });

    if (status && status.ok) {
      router.push(status.url as string);
      formik.resetForm();
    }
  };

  const formik = useFormik({
    initialValues: loginInitialValues,
    validate: login_validation,
    onSubmit,
  });

  return (
    <div className=" flex justify-center bg-gradient-to-r">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Log in to your account
        </h2>
        <form noValidate onSubmit={formik.handleSubmit}>
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
              }`}
              placeholder="Your email address"
              {...formik.getFieldProps("email")}
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
              }`}
              placeholder="Your password"
              {...formik.getFieldProps("password")}
            />
            {formik.errors.password && formik.touched.password && (
              <span className="inline-flex text-xs text-red-700">
                {formik.errors.password}
              </span>
            )}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-slate-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
            >
              Log In
            </button>
          </div>
          <div className="mt-4">
            <p className="mt-2 mb-4 text-xl font-medium text-center text-gray-700">
              OR continue with
            </p>
            <div className="mt-2 grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => {
                  signIn("google", { callbackUrl: "/" });
                }}
                className="group items-center relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <i className="fab fa-google mr-2"></i> Google
              </button>
              <button
                type="button"
                onClick={() => {
                  signIn("github", { callbackUrl: "/" });
                }}
                className="group items-center relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <i className="fab fa-github mr-2"></i> Github
              </button>
              <button
                type="button"
                onClick={() => {
                  signIn("facebook", { callbackUrl: "/" });
                }}
                className="group items-center relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <i className="fab fa-facebook mr-2"></i> Facebook
              </button>
              {/* <button
                type="button"
                onClick={() => {
                  signIn("slack", { callbackUrl: "/" });
                }}
                className="group items-center relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <i className="fab fa-slack mr-2"></i> Slack
              </button> */}
              {/* <button
                type="button"
                onClick={() => console.log("Linkedin")}
                className="group items-center relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <i className="fab fa-linkedin mr-2"></i> Linkedin
              </button> */}
              <button
                onClick={() => {
                  signIn("reddit", { callbackUrl: "/" });
                }}
                className="group items-center relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <i className="fab fa-reddit mr-2"></i> Reddit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// <div className="flex items-center justify-between mb-4">
// <div className="flex items-center">
//   <input
//     id="remember-me"
//     name="remember-me"
//     type="checkbox"
//     className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//   />
//   <label
//     htmlFor="remember-me"
//     className="ml-2 block text-sm text-gray-900"
//   >
//     Remember me
//   </label>
// </div>

// <div className="text-sm">
//   <a
//     href="#"
//     className="font-medium text-indigo-600 hover:text-indigo-500"
//   >
//     Forgot your password?
//   </a>
// </div>
// </div>
