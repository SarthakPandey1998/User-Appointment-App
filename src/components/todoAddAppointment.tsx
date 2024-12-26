import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

export function TodoAddAppointment() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["userid"]);

  const formattedDate = new Date().toISOString().split("T")[0];
  const formik = useFormik({
    initialValues: {
      AppointmentId: 0,
      Title: "",
      Description: "",
      Date: formattedDate,
      UserId: cookies["userid"],
    },
    validationSchema: Yup.object({
      AppointmentId: Yup.number().required("AppointmentId is required"),
      Title: Yup.string()
        .required("Title is required")
        .min(3, "Title must be at least 3 characters"),
      Description: Yup.string().required("Description is required"),
      Date: Yup.date()
        .required("Date is required")
        .min(formattedDate, "Appointment cannot be in the past"),
    }),
    onSubmit: (appointment) => {
      axios
        .post("http://127.0.0.1:4000/add-appointment", appointment)
        .then(() => {
          toast.success("Appointment Added Successfully");
          navigate("/user-dashboard");
        })
        .catch(()=>{
          toast.error("Appointment Addition failed")
        })
    },
  });

  return (
    <div className="text-start d-flex justify-content-center">
      <form className="bg-light w-25 p-3 mt-4" onSubmit={formik.handleSubmit}>
        <h3>Add New Appointment</h3>
        <dl>
          <dt>Appointment Id</dt>
          <dd>
            <input
              type="number"
              name="AppointmentId"
              onChange={formik.handleChange}
              className="form-control"
            />
          </dd>
          <dd>
            {formik.touched.AppointmentId && formik.errors.AppointmentId ? (
              <div className="text-danger">{formik.errors.AppointmentId}</div>
            ) : null}
          </dd>
          <dt>Title</dt>
          <dd>
            <input
              type="text"
              name="Title"
              onChange={formik.handleChange}
              className="form-control"
            />
          </dd>
          <dd>
            {formik.touched.Title && formik.errors.Title ? (
              <div className="text-danger">{formik.errors.Title}</div>
            ) : null}
          </dd>
          <dt>Description</dt>
          <dd>
            <textarea
              name="Description"
              onChange={formik.handleChange}
              className="form-control"
            />
          </dd>
          <dd>
            {formik.touched.Description && formik.errors.Description ? (
              <div className="text-danger">{formik.errors.Description}</div>
            ) : null}
          </dd>
          <dt>Date</dt>
          <dd>
            <input
              type="date"
              name="Date"
              onChange={formik.handleChange}
              className="form-control"
            />
          </dd>
          {formik.touched.Date && formik.errors.Date ? (
              <div className="text-danger">{String(formik.errors.Date)}</div>
            ) : null}
        </dl>
        <button type="submit" className="btn btn-primary w-100 mt-2">
          Add
        </button>
        <div className="mt-2">
          <Link to="/user-dashboard">Back To Dashboard</Link>
        </div>
      </form>
    </div>
  );
}
