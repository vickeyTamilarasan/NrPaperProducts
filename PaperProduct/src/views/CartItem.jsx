import React from "react"
import Vbottomcover from '../assets/vbottomcover.jpg'

function CartItem({ cartName, cartId, image, gsm, price, quty }) {

    const totalValue = parseInt(quty) * parseInt(price);

    return (
        <div>
            <div className="row">
                <div className="col-3 text-center">
                    <img className="img-thumbnail imgcarti" src={Vbottomcover} alt="" />
                </div>
                <div className="col-8 d-flex text-center">
                    <h5 className="txtcartItde">
                        {cartName},{gsm}GSM,{quty}/Kg
                    </h5>
                    <h6 className="txtcartItdepri">
                        { totalValue }.Rs
                    </h6>
                </div>
            </div>
        </div>
    )
}

export default CartItem