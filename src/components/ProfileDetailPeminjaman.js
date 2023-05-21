import '../Styles/LoginForm.css'
import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import classes from '../context/TargetReminder.module.css'
import {useAxiosPrivate} from '../utils/bookUtil';

const ProfileDetailPeminjaman = () => {
  const PrivateAxios = useAxiosPrivate()
  const params = useParams();
  const [data, setdata] = useState([])
  const [book, setbook] = useState([])
  const [mulai, setmulai] = useState([])
  
  const fetchdata = async () => {
    const url = "http://34.27.70.84/book/get-peminjaman?id=" + params.id
    const response = await fetch(url)
    const datas = await response.json()
    setdata(Object.values(datas)[0])
    setmulai(Object.values(datas)[0].start_date.slice(0,10))
    }

  const getBook = async () => {
    const url = "http://34.27.70.84/book/get-book-by-id?id=" + params.idbuku
    const response = await fetch(url)
    const books = await response.json()
    setbook(Object.values(books)[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://34.27.70.84/book/ajukan-pengembalian?idpeminjaman='+params.id
      let resp = await PrivateAxios.put(url)
      if (resp.status === 200) {
        console.log(resp['data'])
        window.location.reload();
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
  fetchdata()
  getBook()
  }, [])

  return (
      <div className={classes.content}>
      <div>
        <h1>Borrowing Book Detail</h1>
        <hr></hr>
        <h1>{book.title}</h1>
      <img className={classes.img} src={book.image_url_l} style={{ margin:'5px', padding:'10px'}}></img>
        <h3>Author: {book.author}</h3>
        <h3>Start Date: {mulai}</h3>
        <h3>End Date: {data.return_date}</h3>
        {data.status == 'dikembalikan' | data.status == 'pengembalian' ? null:<h3>Time remaining: {getSelisih(data.return_date)} days</h3>}
        <h3>Status: {cekStatus(data.status, data.return_date)}</h3>
        <div className={classes.item}>
        <Link to="/profile"><button className="btn btn-secondary">
              Back 
            </button>
            </Link>
        {data.status == 'dikembalikan' |  data.status == 'pengembalian'? null:<button className="btn btn-success" onClick={handleSubmit}>Return Book</button>}
        </div>
    </div>
    </div>
  )
}

function getSelisih(selesai){
    let hariini = new Date(getCurrentDate())
    let selesaia = new Date(selesai)
    const diffTime = (selesaia - hariini);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    return diffDays
}

function cekStatus(status, selesai){
    let selisih = getSelisih(selesai)
    if (status=='dipinjam') {
      if (selisih<0) {
          return 'Already past the due date. Please return the book immediately.'
      } if (selisih == 0) {
          return 'Borrowed. Please return the book today.'
      } else {
          return 'Borrowed'
      }
  } if (status=='diajukan') {
      return 'In request, ask the librarian to accept your request.'
  } if (status=='pengembalian') {
    return 'In request to return book, ask the librarian to accept your request.'
  } else {
    return 'Returned'
  }
}

function getCurrentDate(separator='-'){
  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  
  return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date<10?`0${date}`:`${date}`}`
}

export default ProfileDetailPeminjaman