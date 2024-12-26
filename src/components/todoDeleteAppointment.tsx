import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { AppointmentContract } from "../contracts/AppointmentContract";

export function TodoDeleteAppointment(){

    const params = useParams();
    const navigate = useNavigate()
    const[appointments,setAppointments] = useState<AppointmentContract[]>([{
        AppointmentId:0,
        Title:"",
        Description:"",
        Date:new Date(),
        UserId:""
    }])

    const handleDelete = async(e:any) =>{
        e.preventDefault();
        try{
            const res = await axios.delete(`http://127.0.0.1:4000/delete-appointment/${params.id}`);
            if(res.status === 200){
                alert("Appointment deleted succesfully");
                navigate("/user-dashboard");
                
            }
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        axios.get(`http://127.0.0.1:4000/get-appointment/${params.id}`)
        .then((res)=>{
            setAppointments(res.data);
        })
    },[params.id])
    return(
        <div className="d-flex justify-content-center">
            <form className="bg-light mt-4 p-3">
                <h3>Delete Appointment</h3>
                <dl>
                    <dt>Title</dt>
                    <dd>{appointments[0].Title}</dd>
                    <dt>Description</dt>
                    <dd>{appointments[0].Description}</dd>
                </dl>
                <button  onClick={(e)=>handleDelete(e)} className="btn btn-danger">Yes</button>
                <Link to="/user-dashboard"  className="btn btn-warning ms-2">No</Link>
            </form>
        </div>
    )
}