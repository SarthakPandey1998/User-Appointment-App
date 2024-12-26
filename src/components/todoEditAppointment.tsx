import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { AppointmentContract } from "../contracts/AppointmentContract";
import * as Yup from "yup";

export function TodoEditAppointment() {
  const [appointments, setAppointments] = useState<AppointmentContract[]>([
    {
      AppointmentId: 0,
      Title: "",
      Description: "",
      Date: new Date(),
      UserId: "",
    },
  ]);
  const navigate = useNavigate();
  const params = useParams();

  const [cookies, setcookie, removeCookie] = useCookies(["userid"]);

  const formattedDate = new Date().toISOString().split("T")[0];
  const formik = useFormik({
    initialValues: {
      AppointmentId: appointments[0].AppointmentId,
      Title: appointments[0].Title,
      Description: appointments[0].Description,
      Date: appointments[0].Date,
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
        .put(`http://127.0.0.1:4000/edit-appointment/${params.id}`, appointment)
        .then(() => {
          console.log("Appointment Updated");
          navigate("/user-dashboard");
        });
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:4000/get-appointment/${params.id}`)
      .then((res) => {
        setAppointments(res.data);
      });
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <form className="bg-light mt-4 p-2" onSubmit={formik.handleSubmit}>
        <h3>Edit Appointment</h3>
        <dl className="text-start">
          <dt>AppointmentId</dt>
          <dd>
            <input
              type="number"
              name="AppointmentId"
              value={formik.values.AppointmentId}
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
              value={formik.values.Title}
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
              value={formik.values.Description}
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
              value={
                formik.values.Date
                  ? new Date(formik.values.Date).toISOString().split("T")[0]
                  : ""
              }
              onChange={formik.handleChange}
              className="form-control"
            />
          </dd>
          {formik.touched.Date && formik.errors.Date ? (
              <div className="text-danger">{String(formik.errors.Date)}</div>
            ) : null}
        </dl>
        <button type="submit" className="btn btn-success">
          Save
        </button>
        <button
          onClick={() => navigate("/user-dashboard")}
          className="btn btn-danger ms-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
