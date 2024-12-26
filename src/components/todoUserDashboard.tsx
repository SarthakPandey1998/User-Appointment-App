import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { AppointmentContract } from "../contracts/AppointmentContract";
import axios from "axios";

export function TodoUserDashboard() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState<AppointmentContract[]>();

  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(["userid"]);

  function handleSignout() {
    removeCookie("userid");
    navigate("/login");
  }

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:4000/appointment/${cookies["userid"]}`)
      .then((res) => {
        console.log(111,res.data);
        setAppointments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container-fluid">
      <nav className="d-flex justify-content-between pt-5">
        <div className="text-white h3">{cookies["userid"]} - Dashboard</div>
        <div className="btn btn-danger" onClick={handleSignout}>
          Signout
        </div>
      </nav>
      <section className="text-start">
        <div>
          <Link
            to="/add-appointment"
            className="bi bi-calender-date btn btn-dark"
          >
            Add Appointments
          </Link>
        </div>
        <div className="d-flex gap-2 flex-wrap">
          {appointments?.map((appointment) => {
            return (
              <div  className="bg-light w-25 p-4 mt-3" key={appointment.AppointmentId}>
                <h2>{appointment.Title}</h2>
                <p>{appointment.Description}</p>
                <div className="btn btn-dark bi bi-calender-date">{appointment.Date.toString()}</div>
                <div className="mt-2">
                    <Link className="btn btn-danger bi bi-trash" to={`/delete-appointment/${appointment.AppointmentId}`}> Remove</Link>
                    <Link className="btn btn-warning bi bi-pen-fill ms-2" to={`/edit-appointment/${appointment.AppointmentId}`}> Edit</Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
