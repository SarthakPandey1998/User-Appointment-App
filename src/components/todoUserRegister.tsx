import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
export function TodoUserRegister(){

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues:{
            UserId:"",
            UserName:"",
            Password:"",
            Email:"",
            Mobile:""
        },
        onSubmit:(user)=>{
            axios.post("http://127.0.0.1:4000/register-user",user)
            .then(()=>{
                alert("User Registered successfully");
                navigate("/login");                                                            
            })
            
        }
    })
    return(
        <div className="text-start d-flex justify-content-center">
            <form className="bg-light w-25 p-3 mt-4" onSubmit={formik.handleSubmit}>
                <h3>Register User</h3>
                <dl>
                    <dt>UserId</dt>
                    <dd><input type="text" name="UserId"  onChange={formik.handleChange} className="form-control"/></dd>
                    <dt>User Name</dt>
                    <dd><input type="text" name="UserName" onChange={formik.handleChange} className="form-control"/></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" onChange={formik.handleChange} className="form-control"/></dd>
                    <dt>Email</dt>
                    <dd><input type="email" name="Email" onChange={formik.handleChange} className="form-control"/></dd>
                    <dt>Mobile</dt>
                    <dd><input type="text" name="Mobile"  onChange={formik.handleChange} className="form-control"/></dd>
                </dl>
                <button type="submit" className="btn btn-warning w-100 mt-2">Register</button>
                <div className="d-flex justify-content-evenly mt-1">
                    <Link to="/">Home</Link>
                    <Link to="/login">Have Account</Link>
                </div>
            </form>
        </div>
    )
}