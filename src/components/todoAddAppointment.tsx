import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export function TodoAddAppointment(){

    const navigate = useNavigate();
    const[cookies, setCookie, removeCookie] = useCookies(["userid"]);
    const formik = useFormik({
        initialValues:{
            AppointmentId:0,
            Title:"",
            Description:"",
            Date:new Date(),
            UserId: cookies["userid"]
        },
        onSubmit:(appointment)=>{
            axios.post("http://127.0.0.1:4000/add-appointment",appointment)
            .then(()=>{
                console.log(appointment);
                
                alert("Appointment Added Successfully");
                navigate("/user-dashboard");
            })
            
        }
    })
    return(
        <div className="text-start d-flex justify-content-center">
        <form className="bg-light w-25 p-3 mt-4" onSubmit={formik.handleSubmit}>
            <h3>Add New Appointment</h3>
            <dl>
                <dt>Appointment Id</dt>
                <dd><input type="number" name="AppointmentId"  onChange={formik.handleChange} className="form-control"/></dd>
                <dt>Title</dt>
                <dd><input type="text" name="Title" onChange={formik.handleChange} className="form-control"/></dd>
                <dt>Description</dt>
                <dd><textarea name="Description" onChange={formik.handleChange} className="form-control"/></dd>
                <dt>Date</dt>
                <dd><input type="date" name="Date" onChange={formik.handleChange} className="form-control"/></dd>
            </dl>
            <button type="submit" className="btn btn-primary w-100 mt-2">Add</button>
            <div className="mt-2">
                <Link to="/user-dashboard">Back To Dashboard</Link>
            </div>
        </form>
    </div>
    )
}