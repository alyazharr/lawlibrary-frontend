import '../Styles/LoginForm.css'
import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import classes from '../context/TargetReminder.module.css'

const ProfileDetailTargetReminder = () => {
  const params = useParams();
  const [data, setdata] = useState([])
  const [book, setbook] = useState([])
  const [mulai, setmulai] = useState([])
  
  const fetchdata = async () => {
    const url = "http://34.27.70.84/book/get-targetreminder?id=" + params.id
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

  useEffect(() => {
  fetchdata()
  getBook()
  }, [])


  return (
      <div className={classes.content}>
      <div>
        <h1>Reading Target Detail</h1>
        <hr></hr>
        <h1>{book.title}</h1>
      <img className={classes.img} src={book.image_url_l} style={{ margin:'5px', padding:'10px'}}></img>
        <h3>Author: {book.author}</h3>
        <h3>Start Date: {mulai}</h3>
        <h3>End Date Target: {data.target_date}</h3>
        {getSelisihNumb(data.target_date)<0 ?<h3>Status: Done</h3>:<h3>Time Remaining: {getSelisih(data.target_date)}</h3>}

        <div className={classes.item}>
        <Link to="/profile"><button className="btn btn-secondary">
              Back 
            </button>
            </Link>
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
  
  if (diffDays==0) {
    return 'Due today'
  }
  return diffDays + ' days'
}

function getSelisihNumb(selesai){
  let hariini = new Date(getCurrentDate())
  let selesaia = new Date(selesai)
  const diffTime = (selesaia - hariini);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  
  return diffDays
}

function getCurrentDate(separator='-'){
let newDate = new Date()
let date = newDate.getDate();
let month = newDate.getMonth() + 1;
let year = newDate.getFullYear();

return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date<10?`0${date}`:`${date}`}`
}

export default ProfileDetailTargetReminder