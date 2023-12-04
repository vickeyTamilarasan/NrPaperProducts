import React, { useEffect } from "react"
import '../App.css'
import '../AppFrame.css'

import { useNavigate } from 'react-router-dom';

function ItemCard({ cardName, cardId, image, gsm, price, quty }) {

    const navi = useNavigate();

    

    function handelItemPage() {
        console.log(gsm);
        localStorage.setItem('_id', cardId);
        localStorage.setItem('name', cardName);
        localStorage.setItem('image', image);
        localStorage.setItem('gsm', gsm);
        localStorage.setItem('price', price);
        localStorage.setItem('quty', quty);
        navi('/item')
    }

    return (
        <div>
            <div className='card itemcard text-center'>

                <img className='card-img-top img-fluid itemimg' src={`data:image/jpg;base64,${image}`} alt="items" />

                <div className='card-body'>
                    <h5 className='card-title text-center m-2 txtitem'>
                        {cardName}
                    </h5>
                    {/* <a href="/item" className="btn btn-primary m-2 btnitem">Check Item</a> */}
                    <button onClick={handelItemPage} className="btn btn-primary btnitem">Check Item</button>
                </div>
            </div>
        </div>
    )
}

export default ItemCard