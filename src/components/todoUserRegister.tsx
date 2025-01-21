import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
export function TodoUserRegister() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      UserId: "",
      UserName: "",
      Password: "",
      Email: "",
      Mobile: "",
    },
    validationSchema: Yup.object({
      UserId: Yup.string().required("UserId is required"),
      UserName: Yup.string()
        .required("UserName is required")
        .min(3, "UserName must be atleast 3 characters"),
      Password: Yup.string().required("Password is required"),
      Email: Yup.string()
        .email("Invalid Email address")
        .required("Email is required"),
      Mobile: Yup.string()
        .required("Mobile is required")
        .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
    }),
    onSubmit: (user) => {
      axios
        .post("http://127.0.0.1:4000/register-user", user)
        .then(() => {
          // alert("User Registered successfully");
          toast.success("User Registered successfully!");
          navigate("/login");
        })
        .catch(() => {
          toast.error("Registration failed, please try again!");
        });
    },
  });
  return (
    <div className="text-start d-flex justify-content-center">
      <form className="bg-light w-25 p-3 mt-4" onSubmit={formik.handleSubmit}>
        <h3>Register User</h3>
        <dl>
          <dt>UserId</dt>
          <dd>
            <input
              type="text"
              name="UserId"
              onChange={formik.handleChange}
              className="form-control"
            />
          </dd>
          <dd>
            {" "}
            {formik.touched.UserId && formik.errors.UserId ? (
              <div className="text-danger">{formik.errors.UserId}</div>
            ) : null}
          </dd>
          <dt>User Name</dt>
          <dd>
            <input
              type="text"
              name="UserName"
              onChange={formik.handleChange}
              className="form-control"
            />
          </dd>
          <dd>
            {" "}
            {formik.touched.UserName && formik.errors.UserName ? (
              <div className="text-danger">{formik.errors.UserName}</div>
            ) : null}
          </dd>
          <dt>Password</dt>
          <dd>
            <input
              type="password"
              name="Password"
              onChange={formik.handleChange}
              className="form-control"
            />
          </dd>
          <dd>
            {" "}
            {formik.touched.Password && formik.errors.Password ? (
              <div className="text-danger">{formik.errors.Password}</div>
            ) : null}
          </dd>
          <dt>Email</dt>
          <dd>
            <input
              type="email"
              name="Email"
              onChange={formik.handleChange}
              className="form-control"
            />
          </dd>
          <dd>
            {formik.touched.Email && formik.errors.Email ? (
              <div className="text-danger">{formik.errors.Email}</div>
            ) : null}
          </dd>
          <dt>Mobile</dt>
          <dd>
            <input
              type="text"
              name="Mobile"
              onChange={formik.handleChange}
              className="form-control"
            />
          </dd>
          <dd>
            {formik.touched.Mobile && formik.errors.Mobile ? (
              <div className="text-danger">{formik.errors.Mobile}</div>
            ) : null}
          </dd>
        </dl>
        <button type="submit" className="btn btn-warning w-100 mt-2">
          Register
        </button>
        <div className="d-flex justify-content-evenly mt-1">
          <Link to="/">Home</Link>
          <Link to="/login">Have Account</Link>
        </div>
      </form>
    </div>
  );
}
