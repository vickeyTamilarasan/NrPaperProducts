import React, { useEffect, useState } from "react"
import '../App.css'
import '../AppFrame.css'
import axios from "axios"
import CartItem from "./CartItem"
import CheckoutImg from '../assets/checkoutitem.gif'
import EmpytycartImg from '../assets/emptycart.gif'
import { useNavigate } from "react-router-dom"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { ApiAddress } from "../Api/ApiAddress"

function Checkout() {

    let [cartdata, setcartdata] = useState([]);
    const navi = useNavigate();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const [showAddress, setShowAddress] = useState(false);

    const handleCloseAddress = () => setShowAddress(false);
    const handleShowAddress = () => setShowAddress(true);


    useEffect(() => {
        axios.get('https://nr-paper-products.onrender.com/cart').then((item) => {
            setcartdata(item.data)
            console.log(item.data);
        })
    }, [])

    const cartItemsList = cartdata.map((item, index) => {
        return <CartItem key={index} cartName={item.name} cartId={item._id} gsm={item.gsm} image={item.image} price={item.price} quty={item.qtycart} />
    })

    const handleShow = () => {
        if (localStorage.getItem("UserName") === "") {
            setShow(true);
        } else {
            handelOrderPlaceApi()
            setShow(false);

        }
    };

    function handelReturn() {
        navi('/');
    }

    function handelOrderPlaceApi() {
        axios.delete('https://nr-paper-products.onrender.com/cart').then((s) => {
            console.log(s.data);
            navi('/orderPlaced');
        });
    }

    function handleLogin() {
        navi('/login')
    }

    function handleSaveAddress() {
        axios.put(`${ApiAddress}/${localStorage.getItem("UserId")}`, {
            name: localStorage.getItem("UserName"),
            email: localStorage.getItem("UserEmail"),
            password: localStorage.getItem("UserPassword"),
            mobileNo: localStorage.getItem("UserMobileNo"),
            dateofbirth: localStorage.getItem("UserDateOfBirth"),
            address: localStorage.getItem("UserAddress")
        }).then((s) => {
            console.log(s.data);
            setShowAddress(false);
        })
    }

    return (
        <div>
            <h1 className="txtcheckh">
                Checkout
            </h1>
            {cartdata.length === 0 ?
                <div className="row">
                    <div className="col-12 text-center">
                        <img className="emptyimg" src={EmpytycartImg} alt="Checkout" />

                        <h4 className="txtcarte">
                            You cart is Empty !
                        </h4>

                        <p>
                            Must add items on the cart before you proceed to check out.
                        </p>

                        <button type="button" className="btnreshop" onClick={handelReturn}>Return to shop</button>
                    </div>
                </div> :
                <div className="row">
                    <div className="col-6">
                        <img className="checkimg" src={CheckoutImg} alt="Checkout" />
                    </div>
                    <div className="col-6 text-start">
                        <div className="card cardCheck">
                            {cartItemsList}

                            {localStorage.getItem("UserName") !== "" ?
                                <div className="row">
                                    <div className="col-4 text-end">
                                        <p className="txthAddress">
                                            User Address :
                                        </p>
                                    </div>
                                    <div className="col-5 text-start mt-2">
                                        {localStorage.getItem('UserAddress')}
                                    </div>
                                    <div className="col-3">
                                        <button type="button" className="btnUpdate" onClick={handleShowAddress}>Update</button>

                                        <Modal show={showAddress} onHide={handleCloseAddress}>
                                            <Modal.Header closeButton>
                                                <Modal.Title className="text-center">Update Address</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Form >
                                                    <Form.Group
                                                        className="mb-3"
                                                        controlId="exampleForm.ControlTextarea1">
                                                        <Form.Label>Address</Form.Label>
                                                        <Form.Control as="textarea" rows={3} defaultValue={localStorage.getItem('UserAddress')} onChange={(e) => { localStorage.setItem('UserAddress', e.target.value) }} />
                                                    </Form.Group>
                                                </Form>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleCloseAddress}>
                                                    Close
                                                </Button>
                                                <Button variant="primary" onClick={handleSaveAddress}>
                                                    Update
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </div>
                                </div> :
                                <div></div>
                            }


                            <button type="button" className="btnPlaorder" onClick={handleShow}>Place Order</button>

                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title className="text-center">Alert</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Please login to continue !</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={handleLogin}>
                                        Login
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default Checkout