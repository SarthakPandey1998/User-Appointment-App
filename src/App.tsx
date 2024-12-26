import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TodoIndex } from './components/todoIndex';
import './App.css'
import { TodoUserLogin } from './components/todoUserLogin';
import { TodoUserRegister } from './components/todoUserRegister';
import { TodoUserDashboard } from './components/todoUserDashboard';
import { TodoAddAppointment } from './components/todoAddAppointment';
import { TodoEditAppointment } from './components/todoEditAppointment';
import { TodoDeleteAppointment } from './components/todoDeleteAppointment';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <div className="App bg-image">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <section>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<TodoIndex/>}/>
              <Route path="register" element={<TodoUserRegister/>}/>
              <Route path="login" element={<TodoUserLogin/>}/>
              <Route path="user-dashboard" element={<TodoUserDashboard/>}/>
              <Route path="add-appointment" element={<TodoAddAppointment/>}/>
              <Route path="/edit-appointment/:id" element={<TodoEditAppointment/>}/>
              <Route path="/delete-appointment/:id" element={<TodoDeleteAppointment/>}/>
          </Routes>
        </BrowserRouter>
      </section>
    </div>
  )
}

export default App
