import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loginimg from '../assets/login.png';
import { FloatingLabel, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../services/allAPI';

function Auth({ insideRegister }) {
  const navigate = useNavigate()
  const [userInputs, setUserInputs] = useState({
    firstname: "",
    lastname: "",
    adress: "",
    gender: "",
    course: "",
    dob: "",
    mobile: "",
    email: "",
    password: ""
  });

  console.log(userInputs);

  const handleRegister = async (e) => {
    e.preventDefault()
    if (userInputs.firstname && userInputs.lastname && userInputs.adress && userInputs.gender && userInputs.course && userInputs.dob && userInputs.mobile && userInputs.email && userInputs.password) {
      //api call
      try {
        const result = await registerAPI(userInputs)
        console.log(result);
        if (result.status == 200) {
          toast.success(`Welcome ${result.data.firstname}...`)
          setUserInputs({ firstname: "", lastname: "",adress: "",gender: "",course: "",dob: "",mobile: "", email: "", password: "" })
          setTimeout(() => {
            navigate('/dashboard')
          }, 2000);
        } else {
          toast.error(result.response.data)
          setTimeout(() => {
            setUserInputs({ firstname: "", lastname: "",adress: "",gender: "",course: "",dob: "",mobile: "", email: "", password: "" })
          }, 2000);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.warning("please fill the form completely!!!")
    }

  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (userInputs.email && userInputs.password) {
      //api call
      try {
        const result = await loginAPI(userInputs)
        if (result.status == 200) {
          //store existingUser and token in sessionstorage
          sessionStorage.setItem("exisitingUser", JSON.stringify(result.data.existingUser))
          sessionStorage.setItem("token", result.data.token)
          toast.success(`Welcome ${result.data.existingUser.firstname}...`)
          setUserInputs({ email: "", password: "" })
          setTimeout(() => {
            navigate('/dashboard')
          }, 2000);
        } else {
          toast.error(result.response.data)
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.warning("please fill the form completely!!!")
    }

  }

const handleCancel =()=>{
  setUserInputs({ firstname: "", lastname: "",adress: "",gender: "",course: "",dob: "",mobile: "", email: "", password: "" })
}

  return (
    <div style={{ width: '100%', height: '100vh' }} className='d-flex justify-content-center align-items-center'>
      <div className="container w-100">
        <div className="card shadow p-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img className='w-100' src={Loginimg} alt="Auth" />
            </div>
            <div className="col-lg-6">
              <h4 className="fw-bolder mt-2 text-center">Apply as a Student</h4>
              <Form>
                {
                  insideRegister &&
                  <div>
                    <FloatingLabel
                      controlId="floatingInputName"
                      label="First name"
                      className="mb-1"
                    >
                      <Form.Control value={userInputs.firstname} onChange={e => setUserInputs({ ...userInputs, firstname: e.target.value })} type="text" placeholder="First name" />
                    </FloatingLabel>

                    <FloatingLabel
                      controlId="floatingInputName"
                      label="Last name"
                      className="mb-1"
                    >
                      <Form.Control value={userInputs.lastname} onChange={e => setUserInputs({ ...userInputs, lastname: e.target.value })} type="text" placeholder="Last name" />
                    </FloatingLabel>

                    <FloatingLabel
                      controlId="floatingTextarea"
                      label="Enter your adress"
                      className="mb-1"
                    >
                      <Form.Control value={userInputs.adress} onChange={e => setUserInputs({ ...userInputs, adress: e.target.value })} as="textarea" placeholder="Leave a comment here" />
                    </FloatingLabel>

                    <FloatingLabel
                      controlId="floatingSelect"
                      label="Select gender"
                      className="mb-1"
                    >
                      <Form.Select
                        aria-label="Select gender"
                        value={userInputs.gender}
                        onChange={(e) =>
                          setUserInputs({ ...userInputs, gender: e.target.value })
                        }
                      >
                        <option>Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Form.Select>
                    </FloatingLabel>

                    <FloatingLabel
                      controlId="floatingSelect"
                      label="Select course"
                      className="mb-1"
                    >
                      <Form.Select
                        aria-label="Select course"
                        value={userInputs.course}
                        onChange={(e) =>
                          setUserInputs({ ...userInputs, course: e.target.value })
                        }
                      >
                        <option>Select course</option>
                        <option value="Biology">Biology</option>
                        <option value="Computer science">Computer science</option>
                        <option value="Commerce">Commerce</option>
                        <option value="Humanities">Humanities</option>
                      </Form.Select>
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingDOB" label="Date of Birth" className='mb-1'>
                      <Form.Control
                        value={userInputs.dob}
                        onChange={(e) =>
                          setUserInputs({ ...userInputs, dob: e.target.value })
                        }
                        type="date"
                        placeholder="Date of Birth"
                      />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingMobile" label="Mobile Number" className="mb-1">
                      <Form.Control
                        value={userInputs.mobile}
                        onChange={(e) =>
                          setUserInputs({ ...userInputs, mobile: e.target.value })
                        }
                        type="tel"
                        placeholder="Mobile Number"
                      />
                    </FloatingLabel>

                  </div>

                }

                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-1"
                >
                  <Form.Control value={userInputs.email} onChange={e => setUserInputs({ ...userInputs, email: e.target.value })} type="email" placeholder="name@example.com" />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingPassword"
                  label="Password"
                >
                  <Form.Control value={userInputs.password} onChange={e => setUserInputs({ ...userInputs, password: e.target.value })} type="password" placeholder="Password" />
                </FloatingLabel>

                {
                  insideRegister ?
                    <div className='mt-1'>
                      <button onClick={handleRegister} className='btn btn-primary'>Register</button>
                      <button onClick={handleCancel} className='btn btn-light ms-2'>Cancel</button>
                    </div>
                    :
                    <div className='mt-1'>
                      <button onClick={handleLogin} className='btn btn-primary'>Login</button>
                    </div>

                }

              </Form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </div>
  );
}

export default Auth;
