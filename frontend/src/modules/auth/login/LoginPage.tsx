import { Formik, Form, Field, ErrorMessage } from "formik";

import { useNavigate, Link } from "react-router-dom";
import { authApi } from "../../../api/AuthApi";
import { zodValidate } from "../../../utils/zodValidate";
import { loginSchema, type LoginValues } from "../../../common/validation/authSchemas";
import { AppRoutes } from "../../../common/constants/AppRoutes";

export default function LoginPage() {
  const navigate = useNavigate();

  const initialValues: LoginValues = {
    email: "",
    password: "",
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center bg-light">
    <div className="w-100" style={{ maxWidth: "420px" }}>
        <div className="card shadow-sm p-4">
        <h1 className="h4 mb-4 fw-bold">Login</h1>

        <Formik
            initialValues={initialValues}
            validate={zodValidate(loginSchema)}
            onSubmit={async (values) => {
                await authApi.login(values);
                navigate(AppRoutes.ROOT);
            }}
        >
            {({ isSubmitting }) => (
            <Form className="d-flex flex-column gap-3">
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
                Login
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