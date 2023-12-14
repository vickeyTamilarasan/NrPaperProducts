import React, { useEffect, useState } from 'react'
import packageic from './assets/packaging-1.png'
import bagic from './assets/bag-1.png'
import bagla from './assets/bag-10.png'
import business from './assets/buissness.png'
import friendly from './assets/broucher-3.gif'
import broucherFile from './assets/files/broucher.pdf'
import addition from './assets/additional.gif'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import './AppFrame.css'
import './AppMobileFrame.css'
import axios from 'axios'
import ItemCard from './views/ItemCard'
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import OwlCarousel from 'react-owl-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'


function App() {

  let [itemdata, setitemdata] = useState([]);
  const navi = useNavigate();
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [mobileNo, setmobileNo] = useState('');
  const [dateofbirth, setdateofbirth] = useState('');

  useEffect(() => {
    axios.get('https://nr-paper-products.onrender.com/items').then((item) => {
      setitemdata(item.data);
      console.log(item);
    })

    setname(localStorage.getItem('UserName'))
    setemail(localStorage.getItem('UserEmail'));
    setpassword(localStorage.getItem('UserPassword'));
    setmobileNo(localStorage.getItem('UserMobileNo'));
    setdateofbirth(localStorage.getItem('UserDateOfBirth'));

  }, []);

  const renderCards = itemdata.map((item, index) => {
    console.log(item);
    const base64String = btoa(String.fromCharCode(...new Uint8Array(item.image.data.data)));
    return <ItemCard key={index} cardName={item.name} cardId={item._id} gsm={item.gsm} image={base64String} price={item.price} quty={item.quantity} />;
  });

  function handelcart() {
    navi('/checkout');
  }

  function handelLoginApp() {
    navi('/login');
  }

  function handelLogoutApp() {
    localStorage.setItem('UserId' ,"");
    localStorage.setItem('UserName', "");
    localStorage.setItem('UserEmail', "");
    localStorage.setItem('UserPassword', "");
    localStorage.setItem('UserMobileNo', "");
    localStorage.setItem('UserDateOfBirth', "");
    localStorage.setItem('UserAddress', "");
    navi('/');
  }

  return (
    <body>
      <div>
        <div className='row'>
          <div className='col-3'></div>
          <div className='col-6'>
            <p id='header'>
              NR PAPER PRODUCTS
            </p>
          </div>
          <div className='col-3'>
            {name === "" ?
              <div className="text-end cartItemApp">
                <button type='button' onClick={handelLoginApp} className='btnLogin'>Login</button>
              </div> :
              <div className="text-end cartItemApp">
                <p className='txtUname'>{name}</p>
                <button type='button' onClick={handelLogoutApp} className='btnLogout'>Logout</button>
              </div>
            }
          </div>
        </div>

        <div className="text-end cartIconApp">
          <FontAwesomeIcon icon={faBagShopping} bounce size="xl" style={{ color: '#24385c' }} onClick={handelcart} />
        </div>
      </div>
      <div className='row divpack'>
        <div className='col-3 text-end'>
          <img src={packageic} alt="" className='pacimg' />
        </div>
        <div className='col-6'>
          <h1 id='fitext'>
            !Pack
          </h1>
          <h1 id='setext'>
            Anything Everthing
          </h1>
          <h1 id='thtext'>
            "Empowering a greener tomorrow, one paper bag at a time."
          </h1>
        </div>
        <div className='col-3 text-center'>
          <img src={bagic} alt="" className='bagimg' />
        </div>
      </div>
      <div className='row'>
        <div className='col-2'></div>
        <div className='col-7 roundiv'>
          <div className='row'>
            <div className='col-7'>
              <h1 className='ms-5 pt-5 text-light txttrust'>
                With integrity
                & trust
              </h1>
              <h6 className='ms-5 pt-2 pb-5 clitxt'>
                we help our clients to achive there goals by developing solutions specifically designed and implement for them.
              </h6>
            </div>
            <div className='col-5'>
              <h1 className='ms-5 me-5 pt-5 text-center text-light txttrust'>
                1000
              </h1>
              <h6 className='ms-5 pe-5 text-secondary text-center clitxt'>
                paperbags per sec
              </h6>
              <h1 className='ms-5 me-5 pt-1 text-center text-light txttrust'>
                200+
              </h1>
              <h6 className='ms-5 pe-5 text-secondary text-center clitxt'>
                paperbags per sec
              </h6>
            </div>
          </div>
        </div>
        <div className='col-3'>
          <img src={bagla} alt="bag lady" className='bagla' />
        </div>
      </div>
      <div className='marks'>
        <h1 className='nrpaper'>
          Getting Started
        </h1>
        <h1 className='nrpaper'>
          with <span className='nr'>Nr paper product is Easy</span>
        </h1>
      </div>
      <div className='row mt-5'>
        <div className='col-2'></div>
        <div className='col-8'>
          <div className='row'>
            <div className='col-7 text-center'>
              <h2 className='marke'>
                Meet your dedicated
              </h2>
              <h2 className='market'>
                Marketing Expert
              </h2>
              <p className='markpara'>
                Your dedicated marketing expert is there from the beggining; they will get you onboarded, learn the in's and out's of the finances.
              </p>
              <a className='contactbtn' href="https://api.whatsapp.com/send?phone=9597423332" target='_blank'>Contact him</a>
            </div>
            <div className='col-5 text-end'>
              <img className='busimg' src={business} alt="business" />
            </div>
          </div>
        </div>
        <div className='col-2'></div>
      </div>
      <div className=' pro'>
        <h1 className='producttxt'>
          Products
        </h1>
        <h1 className='protxt'>
          In Nr Paper
        </h1>
        <div className='mt-5 d-flex'>
          <ul className='list-group'>
            <li className='d-flex'>
              {renderCards}
            </li>
          </ul>
        </div>
      </div>
      <div className='purposecon'>
        <h1 className='producttxt'>
          Purpose Of <span className='titleh'>NrPaper</span>
        </h1>
        <div className='row'>
          <div className='col-2'></div>
          <div className='col-8 text-center mt-5'>
            <iframe className='videocon' src="https://www.youtube.com/embed/3_fjEc4aQVk?si=lqI2K_1U9LUqKas-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </div>
          <div className='col-2'></div>
        </div>

      </div>
      <div className='row envi'>
        <div className='col-1'></div>
        <div className='col-5'>
          <img className='img-fluid friimg' src={friendly} alt="friendly environment" />
        </div>
        <div className='col-5 text-center'>
          <h1 className='txtecoti'>
            "Get Eco-Friendly Solutions for a Sustainable Future! "
          </h1>
          <h4 className='txtecodesc'>
            Discover eco-friendly paper bags made from 100% recycled materials. Our brochure showcases various sizes, customizable options, and environmental benefits. Join the movement for a cleaner, greener world. Download now and make a positive impact!
          </h4>
          <div className='mt-4'>
            <a className='broucherbtn' href={broucherFile} download="Broucher.pdf">Download broucher</a>
          </div>
        </div>
        <div className='col-1'></div>
      </div>
      <div className='cusriv'>
        <h1 className='txtwcus'>
          What Customer
        </h1>
        <h1 className='txtcussay'>
          Says <span className='txtnr'> About NR Paper Products </span>
        </h1>
        <div className='row'>
          <div className='col-12 mt-5'>
            <div className='container-fluid'>
              <OwlCarousel items={4} className="owl-theme" loop
                margin={8} autoplay={true} >
                <div className='colo'>
                  <p className='txtreview'>
                    " I must say, I am thoroughly impressed with the product
                    quality of your paper bags. They are not only visually appealing
                    but also remarkably sturdy, offering a reliable packaging
                    solution for various items.
                  </p>
                </div>
                <div className='colo'>
                  <p className='txtreview'>
                    " I must say, I am thoroughly impressed with the product
                    quality of your paper bags. They are not only visually appealing
                    but also remarkably sturdy, offering a reliable packaging
                    solution for various items.
                  </p>
                </div>
                <div className='colo'>
                  <p className='txtreview'>
                    " I must say, I am thoroughly impressed with the product
                    quality of your paper bags. They are not only visually appealing
                    but also remarkably sturdy, offering a reliable packaging
                    solution for various items.
                  </p>
                </div>
                <div className='colo'>
                  <p className='txtreview'>
                    " I must say, I am thoroughly impressed with the product
                    quality of your paper bags. They are not only visually appealing
                    but also remarkably sturdy, offering a reliable packaging
                    solution for various items.
                  </p>
                </div>
                <div className='colo'>
                  <p className='txtreview'>
                    " I must say, I am thoroughly impressed with the product
                    quality of your paper bags. They are not only visually appealing
                    but also remarkably sturdy, offering a reliable packaging
                    solution for various items.
                  </p>
                </div>
              </OwlCarousel>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-2'></div>
        <div className='col-7 roundiv'>
          <div className='row p-3'>
            <div className='col-8'>
              <h1 className='p-3 txtdev'>
                Get additional Services Beyond Delivery
              </h1>
              <p className='ps-3 txtdevNr'>
                With NrPaper we can help you to levelup your buisness and take hand on pulse with your buisness through packaging
              </p>
            </div>
            <div className='col-3'>
              <img className='addimg' src={addition} alt="Additional" />
            </div>
          </div>
        </div>
        <div className='col-3'></div>
      </div>

      <div className=' row divAdd'>
        <div className='col-4'></div>
        <div className='col-4'>
          <p className='txtheader'>
            NR PAPER PRODUCTS
          </p>
          <h3 className='text-center txtAppAddress'>
            2/1,NR Thottam, Rudish colony,opp.
            Noochikatu valasu, Kollampalayam,
            Erode -2
          </h3>
        </div>
        <div className='col-4'></div>
      </div>
    </body >


  )
}

export default App
