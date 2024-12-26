import axios from "axios";
import { useFormik } from "formik"
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom"
import { AppointmentContract } from "../contracts/AppointmentContract";

export function TodoEditAppointment(){

    const[appointments,setAppointments]  = useState<AppointmentContract[]>([{
        AppointmentId:0,
        Title:"",
        Description:"",
        Date:new Date(),
        UserId:''
    }]);
    const navigate = useNavigate();
    const params =useParams();

    const[cookies,setcookie ,removeCookie] = useCookies(["userid"])
    const formik = useFormik({
        initialValues:{
            AppointmentId:appointments[0].AppointmentId,
            Title:appointments[0].Title,
            Description:appointments[0].Description,
            Date: appointments[0].Date,
            UserId: cookies["userid"]
        },
        onSubmit: (appointment)=>{
            axios.put(`http://127.0.0.1:4000/edit-appointment/${params.id}`,appointment)
            .then(()=>{
                console.log("Appointment Updated");
                navigate("/user-dashboard");
                
            })
        },
        enableReinitialize:true
    })

    useEffect(()=>{
        axios.get(`http://127.0.0.1:4000/get-appointment/${params.id}`)
        .then((res)=>{
            setAppointments(res.data);
        })
    },[])


    return(
        <div className="d-flex justify-content-center">
            <form className="bg-light mt-4 p-2" onSubmit={formik.handleSubmit}>
                <h3>Edit Appointment</h3>
                <dl className="text-start">
                    <dt>AppointmentId</dt>
                    <dd><input type="number" name="AppointmentId" value={formik.values.AppointmentId} onChange={formik.handleChange} className="form-control"/></dd>
                    <dt>Title</dt>
                    <dd><input type="text" name="Title" value={formik.values.Title} onChange={formik.handleChange} className="form-control"/></dd>
                    <dt>Description</dt>
                    <dd><textarea  name="Description" value={formik.values.Description} onChange={formik.handleChange } className="form-control"/></dd>
                    <dt>Date</dt>
                    <dd><input type="date" name="Date" value={formik.values.Date?new Date(formik.values.Date).toISOString().split('T')[0]:""} onChange={formik.handleChange} className="form-control"/></dd>
                </dl>
                <button type="submit" className="btn btn-success">Save</button>
                <button onClick={()=> navigate("/user-dashboard")} className="btn btn-danger ms-2">Cancel</button>
            </form>
        </div>
    )
}