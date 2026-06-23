// pages/RegisterPage.tsx
import { Formik, Form, Field, ErrorMessage } from "formik";

import { useNavigate, Link } from "react-router-dom";
import { registerSchema, type RegisterValues } from "../../../common/validation/authSchemas";
import { zodValidate } from "../../../utils/zodValidate";
import { authApi } from "../../../api/AuthApi";
import { AppRoutes } from "../../../common/constants/AppRoutes";

export default function RegisterPage() {
  const navigate = useNavigate();

  const initialValues: RegisterValues = {
    name: "",
    email: "",
    password: "",
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center bg-light">
    <div className="w-100" style={{ maxWidth: "420px" }}>
        <div className="card shadow-sm p-4">
        <h1 className="h4 mb-4 fw-bold">Register</h1>

        <Formik
            initialValues={initialValues}
            validate={zodValidate(registerSchema)}
            onSubmit={async (values) => {
                await authApi.register(values);
                navigate(AppRoutes.ROOT);
            }}
        >
            {({ isSubmitting }) => (
        <Form className="d-flex flex-column gap-3">
                <div>
                    <Field
                        name="name"
                        type="name"
                        placeholder="Name"
                        className="form-control"
                    />
                    <ErrorMessage
                        name="name"
                        component="div"
                        className="text-danger small mt-1"
                    />
                </div>
                {/* Email */}
                <div>
                <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="form-control"
                />
                <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger small mt-1"
                />
                </div>

                {/* Password */}
                <div>
                <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="form-control"
                />
                <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger small mt-1"
                />
                </div>

                {/* Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-100"
                >
                Register
                </button>

                {/* Link */}
                <p className="text-center small mb-0">
                No account?{" "}
                <Link to="/register" className="text-primary text-decoration-none">
                    Register
                </Link>
                </p>
            </Form>
            )}
        </Formik>
        </div>
    </div>
    </div>
  );
}