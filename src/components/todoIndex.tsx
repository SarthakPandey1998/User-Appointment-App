import { Link } from "react-router-dom";

export function TodoIndex(){
    return(
        <div className="container-fluid">
            <div className="d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
                <Link to="/register" className="btn btn-dark">New User Register</Link>
                <Link to="/login" className="btn btn-warning ms-2">Existing User Login</Link>

            </div>
        </div>
    )
}