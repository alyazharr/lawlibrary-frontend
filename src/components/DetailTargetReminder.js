import '../Styles/LoginForm.css'
import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import classes from '../context/TargetReminder.module.css'

const DetailTargetReminder = () => {
  const params = useParams();
  const [data, setdata] = useState([])
  const [book, setbook] = useState([])
  const [mulai, setmulai] = useState([])
  
  const fetchdata = async () => {
    const url = "http://127.0.0.1:8000/book/get-targetreminder?id=" + params.id
    const response = await fetch(url)
    const datas = await response.json()
    setdata(Object.values(datas)[0])
    setmulai(Object.values(datas)[0].created_at.slice(0,10))
    }
  const getBook = async () => {
    const url = "http://127.0.0.1:8000/book/get-book-by-id?id=" + params.idbuku
    const response = await fetch(url)
    const books = await response.json()
    setbook(Object.values(books)[0])
  }

  useEffect(() => {
  fetchdata()
  getBook()
  }, [])

  return (
      <div className={classes.content}>
      <div>
        <h1>Berhasil memulai target membaca!</h1>
        <hr></hr>
        <h1>{book.title}</h1>
      <img className={classes.img} src={book.image_url_l} style={{ margin:'5px', padding:'10px'}}></img>
        <h3>Author: {book.author}</h3>
        <h3>Mulai membaca: {mulai}</h3>
        <h3>Target selesai: {data.selesai}</h3>
        <h3>Sisa waktu membaca: {getSelisih(mulai, data.selesai)} hari</h3>
        <div className={classes.item}>
        <Link to="/home"><button className="btn btn-secondary">
              Back 
            </button>
            </Link>
        </div>
    </div>
    </div>
  )
}

function getSelisih(mulai, selesai){
    let mulaia = new Date(mulai)
    let selesaia = new Date(selesai)
    const diffTime = Math.abs(selesaia - mulaia);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    return diffDays
}

export default DetailTargetReminder