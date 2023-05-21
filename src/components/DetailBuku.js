import '../Styles/LoginForm.css'
import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import classes from '../context/TargetReminder.module.css'
import { useAuth } from "../context/GlobalStates";

const DetailBuku = () => {
  const idbook = useParams();
  const [book, setbook] = useState([])
  const {authState} = useAuth()
  
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
            <Link to={{                            
          pathname:`/targetreminderform/${bok.id}`,                            
        }}><button className="btn btn-warning">
              Update Stock 
            </button>
            </Link>
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
     <Link to={{                            
          pathname:`/pinjam/${bok.id}`,                            
        }}><button className="btn btn-warning">
              Borrow
            </button>
            </Link>
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