import React from "react"
import OrderPlacedimg from '../assets/orderplaced.gif'
import '../App.css'
import '../AppFrame.css'
import { useNavigate } from "react-router-dom"

function OrderPlaced() {

     const navi = useNavigate();

    function handelreturn(){
        navi('/');
    }

    return (
        <div className="text-center">
            <div className="text-center">
                <img className="imgorder" src={OrderPlacedimg} alt="" />

            </div>
            <button type="button" className="btnreApp" onClick={handelreturn}>Returm home</button>
        </div>
    )
}

export default OrderPlaced