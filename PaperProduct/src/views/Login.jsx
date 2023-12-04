import React, { useState } from "react";
import '../views/Login.css'
import '../views/LoginFrame.css'
import Loginimg from '../assets/login.gif'
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

    const navi = useNavigate();
    const [name, setname] = useState('');
    const [password, setpassword] = useState('');

    function handelSignup() {
        navi('/signup');
    }

    function handelLogins(event) {
        event.preventDefault();
        try {
            axios.post('http://localhost:2000/login', {
                name: name,
                password: password
            }).then((user) => {
                localStorage.setItem('UserId' , user.data._id);
                localStorage.setItem('UserName', user.data.name);
                localStorage.setItem('UserEmail', user.data.email);
                localStorage.setItem('UserPassword', user.data.password);
                localStorage.setItem('UserMobileNo', user.data.mobileNo);
                localStorage.setItem('UserDateOfBirth', user.data.dateofbirth);
                localStorage.setItem('UserAddress' , user.data.address);

                navi('/')

            })
        } catch (error) {

        }
    }

    return (
        <div>
            <div className="col-12 container bg-white mt-5 logcarsty">
                <div className="row">
                    <div className="col-7">
                        <img className="imgLogo" src={Loginimg} alt="Login" />
                    </div>
                    <div className="col-5">
                        <div className=" border border-1 text-center rounded-3 p-3 mt-5 logcard">
                            <button className="bg-gradient btnfac">LOGIN
                                WITH FACEBOOK</button>
                            <div className="row vertical-center mt-3">
                                <div className="col-sm-5">
                                    <hr />
                                </div>
                                <div className="col-sm-2 txtor">
                                    OR</div>
                                <div className="col-sm-5">
                                    <hr />
                                </div>
                            </div>
                            <p className="mt-2 txtLog">
                                MAKE YOUR LOGIN</p>

                            <form action="" className="form-group">
                                <input type="text" placeholder="TYPE YOUR NAME" value={name} onChange={((e) => { setname(e.target.value) })} className="form-control text-center ms-3 inemail" />

                                <input type="password" placeholder="PASSWORD" value={password} onChange={((e) => { setpassword(e.target.value) })} className="form-control text-center ms-3 mt-3 inpass" />

                                <button type = "button" onClick={handelLogins} className="bg-gradient btnlogin">ENTER</button>
                            </form>

                            {/* <p className="mt-4 txtfyp">
                                Forgot your password? <span className="txtcli">click
                                    here</span></p> */}
                        </div>
                        <p className="mt-4 txtdnhaa">
                            Do not have an account yet?<br /> <span onClick={handelSignup} className="txtsuff">
                                Sign up for free</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login