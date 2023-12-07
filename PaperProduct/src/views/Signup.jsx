import React, { useState } from "react"
import '../views/Login.css'
import '../views/LoginFrame.css'
import Loginimg from '../assets/login.gif'
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {

    const navi = useNavigate();
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [mobileNo, setmobileNo] = useState('');
    const [dateofbirth, setdateofbirth] = useState('');
    const [address, setaddress] = useState('');


    function handelRegister() {
        axios.post('https://nr-paper-products.onrender.com/register', {
            name: name,
            email: email,
            password: password,
            mobileNo: mobileNo,
            dateofbirth: dateofbirth,
            address: address
        }).then((user) => {
            console.log(user);
            navi('/login')
        })
    }

    return (
        <div>
            <div className="col-md-12 container bg-white mt-5 logcarsty">
                <div className="row">
                    <div className="col-7">
                        <img className="imgLogo" src={Loginimg} alt="Login" />
                    </div>
                    <div className="col-5">
                        <div className=" border border-1 text-center rounded-3 p-3 mt-5 logcard">

                            <p class="mt-2 txtLog">
                                MAKE YOUR REGISTER</p>

                            <form action="" className="form-group">
                                <input type="text" placeholder="ENTER YOUR NAME" value={name} onChange={((e) => { setname(e.target.value) })} className="form-control text-center ms-3 inemail" />

                                <input type="text" placeholder="ENTER YOUR EMAIL" value={email} onChange={((e) => { setemail(e.target.value) })} className="form-control text-center ms-3 mt-3 inemail" />

                                <input type="password" placeholder="PASSWORD" value={password} onChange={((e) => { setpassword(e.target.value) })} className="form-control text-center ms-3 mt-3 inpass" />

                                <input type="text" placeholder="ENTER YOUR MOBILE NUMBER" value={mobileNo} onChange={((e) => { setmobileNo(e.target.value) })} className="form-control text-center ms-3 mt-3 inemail" />

                                <input type="text" placeholder="ENTER YOUR DATE OF BIRTH" value={dateofbirth} onChange={((e) => { setdateofbirth(e.target.value) })} className="form-control text-center mt-3 ms-3 inemail" />

                                <input type="text" placeholder="ENTER YOUR ADDRESS" value={address} onChange={((e) => { setaddress(e.target.value) })} className="form-control text-center mt-3 ms-3 inemail" />

                                <button type="button" onClick={handelRegister} className="bg-gradient btnlogin">REGISTER</button>
                            </form>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup