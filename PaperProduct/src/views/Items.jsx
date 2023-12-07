import React, { useEffect, useState } from "react"
import '../App.css'
import '../AppFrame.css'

// OwlCarousel
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
// import OwlCarousel from 'react-owl-carousel';

// Images
import VbottomCover from '../assets/vbottomcover.jpg'
import BoxbottomCover from '../assets/boxbottomcover.jpg'
import BoxbottomCoverWithHandel from '../assets/boxbottomwithhandel.jpg'
import TissuePaper from '../assets/tissuepaper.jpg'
import WhitePaperPlate from '../assets/whitepaperplate.jpg'
import SilverPaperPlate from '../assets/silverpaperplate.jpg'
import axios from "axios";
import { Api } from "../Api/Api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom"

function Items() {

    let [items, setitems] = useState([]);
    let [itemId, setitemId] = useState('');
    let [itemName, setitemName] = useState('');
    let [itemGsm, setitemGsm] = useState('');
    let [itemImage, setitemImage] = useState('');
    let [itemPrice, setitemPrice] = useState('');
    let [itemQuantity, setitemQuantity] = useState('');

    const [counter, setCounter] = useState(1);
    const navi = useNavigate()


    useEffect(() => {
        setitemId(localStorage.getItem("_id"));
        setitemName(localStorage.getItem('name'));
        setitemGsm(localStorage.getItem('gsm'));
        setitemImage(localStorage.getItem('image'));
        setitemPrice(localStorage.getItem('price'));
        setitemQuantity(localStorage.getItem('quty'));
    })


    const handelminuscount = () => {
        if (counter === 1) {
            setCounter(1)
        } else {
            setCounter(counter - 1)
        }
    }
    const handeladdcount = () => { setCounter(counter + 1) }

    function handelAddItem() {
        axios.post('https://nr-paper-products.onrender.com/cart', {
            name: itemName,
            gsm: itemGsm,
            image: itemImage,
            price: itemPrice,
            qtycart: counter
        }).then((s) => {
            console.log(s.data);
        })
    }

    function handelcart() {
        navi('/checkout')
    }

    return (
        <div>
            <h1 className="txtheding">
                Product details
            </h1>
            <div className="text-end cartItem">
                <FontAwesomeIcon icon={faBagShopping} bounce size="xl" style={{ color: '#24385c' }} onClick={handelcart} />
            </div>
            <div className="row">
                <div className="col-6 p-5">
                    <img className=" card img-fluid imgBanner" src={`data:image/jpg;base64,${itemImage}`} alt="Item images" />
                </div>
                <div className="col-6 p-5">
                    <h3 className="txtgsm">
                        Name : {itemName}
                    </h3>
                    <h3 className="txtgsm">
                        Size : Available in different size
                    </h3>
                    <h3 className="txtgsm">
                        GSM : {itemGsm}
                    </h3>
                    <h3 className="txtgsm">
                        Price : {itemPrice}/{itemQuantity}
                    </h3>
                    <h3 className="txtgsm">
                        Material : Recycle kraft paper
                    </h3>
                    <div>
                        {
                            itemQuantity === "per 1 kg" ?
                                <div>
                                    <div className="col-5">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">Kg</div>
                                            </div>
                                            <input type="text" className="form-control inkg" id="inlineFormInputGroup" placeholder="Type Quantity" />
                                        </div>
                                    </div>
                                    <button className="addcart" onClick={handelAddItem}>Add to cart</button>
                                </div> : <div>
                                    <div>
                                        <button className="btnminus" onClick={handelminuscount}>-</button>
                                        <input className="incoun" type="text" value={counter} disabled='true' />
                                        <button className="btnadd" onClick={handeladdcount}>+</button>
                                    </div>
                                    <button className="addcart" onClick={handelAddItem}>Add to cart</button>
                                </div>
                        }


                    </div>
                </div>
            </div>

        </div>
    )
}

export default Items