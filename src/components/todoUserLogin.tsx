import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

export function TodoUserLogin() {
  const navigate = useNavigate();

  // eslint-disable-next-line
  const [_, setCookie] = useCookies(["userid"]);

  const formik = useFormik({
    initialValues: {
      UserId: "",
      Password: "",
    },
    validationSchema: Yup.object({
      UserId: Yup.string().required("UserId is required"),
      Password: Yup.string()
        .required("Password is required"),
    }),
    onSubmit: (user) => {
      axios.get("http://127.0.0.1:4000/users").then((res) => {
        const userData = res.data.find(
          (item: { UserId: string; Password: string }) =>
            item.UserId === user.UserId
        );
        if (userData) {
          if (userData.Password === user.Password) {
            setCookie("userid", user.UserId);
            navigate("/user-dashboard");
            toast.success("User LogIn successfully")
          } else {
            toast.error("Invalid Password");
          }
        } else {
          toast.error("User Not found");
        }
      });
    },
  });

  return (
    <div className="d-flex justify-content-center">
      <form
        className="text-start bg-light w-25 p-3 mt-3"
        onSubmit={formik.handleSubmit}
      >
        <h2>User Login</h2>
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
          <dt>Password</dt>
          <dd>
            <input
              type="text"
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
        </dl>
        <button type="submit" className="btn btn-warning w-100">
          Login
        </button>
        <Link className="mt-4" to="/register">
          New User Registration
        </Link>
      </form>
    </div>
  );
}
