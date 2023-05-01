import '../Styles/LoginForm.css'
import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import classes from '../context/TargetReminder.module.css'

const DetailBuku = () => {
  const idbook = useParams();
  const [book, setbook] = useState([])
  
  const fetchbook = async () => {
    const url = "http://34.173.54.132/book/get-book-by-id?id=" + idbook.id
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
        <Link to="/home"><button className="btn btn-secondary">
              Back 
            </button>
            </Link>
        <Link to={{                            
          pathname:`/targetreminderform/${bok.id}`,                            
        }}><button className="btn btn-secondary">
              Mulai Target Membaca 
            </button>
            </Link>
            <Link to={{                            
    pathname:`/reviews/book/${bok.id}`,                            
   }}><button className="btn btn-secondary">
              Book Review 
            </button>
            </Link>
        </div>
     <div className={classes.item}>
     <Link to={{                            
          pathname:`/pinjam/${bok.id}`,                            
        }}><button className="btn btn-warning">
              Pinjam Buku
            </button>
            </Link>
        </div>
    </div>
    ))}
    </div>
  )
}

export default DetailBuku