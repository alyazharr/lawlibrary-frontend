import '../Styles/LoginForm.css'
import {Link, useNavigate, useParams} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import classes from '../context/TargetReminder.module.css'
import { useAuth } from "../context/GlobalStates";
import {useAxiosPrivate} from "../utils/bookUtil";

const DetailBuku = () => {
  const PrivateAxios = useAxiosPrivate()
  const idbook = useParams();
  const [book, setbook] = useState([])
  const {authState} = useAuth()
  const [stockInput, setStockInput] = useState("");
  const [showStockForm, setShowStockForm] = useState(false);
  const navigate = useNavigate();
  const handleUpdateStock = () => {
    setShowStockForm(true);
  };
  const handleSubmitStock = async (event) => {
    event.preventDefault();
    let urlx = 'http://34.27.70.84/stock/update?id='+idbook.id+'&stok='+stockInput
    const rex = await PrivateAxios.put(urlx)

    if (rex.status === 200) {
      window.location.reload();
    }
  };
  const handlePinjam = () => {
    console.log(book[0])
    if (book[0].stok === 0) {
      alert("Out of Stock, Please Borrow Another Book")
    }
    else {
      navigate('/pinjam/'+book[0].id)
    }
  }

  const fetchbook = async () => {
    const url = "http://34.27.70.84/book/get-book-by-id?id=" + idbook.id
    const response = await fetch(url)
    const books = await response.json()
    setbook(books)
    }

  useEffect(() => {
  fetchbook()
  }, [])

  return (
      <div className={classes.content}>
    {book.map((bok) => (
      <div>
        <h1>{bok.title}</h1>
      <img className={classes.img} src={bok.image_url_l} style={{ margin:'5px', padding:'10px'}}></img>
        <h3>Author: {bok.author}</h3>
        <h3>ISBN: {bok.isbn}</h3>
        <h3>Publication Year: {bok.publication_year}</h3>
        <h3>Publisher: {bok.publisher}</h3>
        <h3>Stock: {bok.stok}</h3>
        <div className={classes.item}>
            { authState?.roles === 'admin' ? <div>
            <button className="btn btn-warning" onClick={handleUpdateStock}>
              Update Stock 
            </button>
                  {showStockForm && authState?.roles === "admin" && (
                      <form onSubmit={handleSubmitStock}>
                        <input
                            type="number"
                            value={stockInput}
                            onChange={(e) => setStockInput(e.target.value)}
                            placeholder="Enter stock"
                        />
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </form>
                  )}
                </div>: 
                <div></div>}
                { authState?.roles === 'user' ?<div>
        <Link to={{                            
          pathname:`/targetreminderform/${bok.id}`,                            
        }}><button className="btn btn-secondary">
              Start Reading Target
            </button>
            </Link>
            <Link to={{                            
    pathname:`/reviews/book/${bok.id}`,                            
   }}><button className="btn btn-secondary">
              Book Review 
            </button>
            </Link>
            <button className="btn btn-warning" onClick={handlePinjam}>
              Borrow
            </button>
        </div>:<div></div>}
        </div>
        <div className={classes.item}>
        <Link to="/home"><button className="btn btn-secondary">
              Back 
            </button>
            </Link>
            </div>
    </div>
    ))}
    </div>
  )
}

export default DetailBuku