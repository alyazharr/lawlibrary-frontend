import '../Styles/LoginForm.css'
import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import classes from '../context/TargetReminder.module.css'
import { useNavigate } from "react-router-dom";
import {useAxiosPrivate} from '../utils/bookUtil';
    
const DetailPeminjamanAdmin = () => {
  const PrivateAxios = useAxiosPrivate()
  const navigate = useNavigate()
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

  const handleReject = (param) => async e => {
    e.preventDefault()
    try {
    const url = 'http://34.27.70.84/book/tolak-pinjam?idpeminjaman='+param
    const res = await PrivateAxios.put(url)
  .catch(error => {
      console.log("API put failed", error)
  });
    if (res.status === 200) {
        window.location.reload();
    } else {
    }
  } catch (err) {
    console.log(err);
  }
  }

  const handleConfirm = (param) => async e => {
      e.preventDefault()
      try {
      const url = 'http://34.27.70.84/book/konfirmasi-pinjam?idpeminjaman='+param+'&returndate='+getCurrentDate()
      const res = await PrivateAxios.put(url)

    .catch(error => {
        console.log("API put failed", error)
    });
      if (res.status === 200) {
          console.log(res['data'])
          window.location.reload();
      } else {
      }
    } catch (err) {
      console.log(err);
    }
    }

    const handleRejectPengembalian = (param) => async e => {
      e.preventDefault()
      try {
      const url = 'http://34.27.70.84/book/tolak-pengembalian?idpeminjaman='+param
      const res = await PrivateAxios.put(url)
    .catch(error => {
        console.log("API put failed", error)
    });
      if (res.status === 200) {
          window.location.reload();
      } else {
      }
    } catch (err) {
      console.log(err);
    }
    }

  const handleConfirmPengembalian = (param) => async e => {
      e.preventDefault()
      try {
        const url = 'http://34.27.70.84/book/konfirmasi-pengembalian?idpeminjaman='+param.id+'&returndate='+getCurrentDate()

      const res = await PrivateAxios.put(url)
      let updatedStok = book.stok+1;
      console.log("stok: "+updatedStok)
      let urlUpdate = 'http://34.27.70.84/stock/update?id='+params.idbuku+'&stok='+updatedStok
          console.log("url ",urlUpdate)
      const hasil = await PrivateAxios.put(urlUpdate)
    .catch(error => {
        console.log("API put failed", error)
    });
      if (res.status === 200 && hasil.status === 200) {
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
        <h1>Borrowed Book Detail</h1>
        <hr></hr>
        <h1>{book.title}</h1>
      <img className={classes.img} src={book.image_url_l} style={{ margin:'5px', padding:'10px'}}></img>
        <h3>Author: {book.author}</h3>
        <h3>Borrower: {data.username}</h3>
        <h3>Start Date: {mulai}</h3>
        <h3>End Date: {data.return_date}</h3>
        {data.status == 'dikembalikan'?<h3>Status: {cekStatus(data.status, data.return_date)}, {data.returned_date}</h3>:<h3>Status: {cekStatus(data.status, data.return_date)}</h3>}
        {data.reminder ? <h3>With Target Reminder: Yes</h3>:<h3>With Target Reminder: No</h3>}
        {data.status == 'dipinjam' ? <h3>Time Remaining: {getSelisih(data.return_date)} days</h3>:null}
        <div className={classes.item}>
        {data.status != 'diajukan' ? null: <div><button className="btn btn-success" onClick={handleConfirm(data.id)}> Confirm 
                  </button>
                   
            <button className="btn btn-danger" onClick={handleReject(data.id)}>
                    Reject 
                  </button></div>}
        {data.status != 'pengembalian' ? null: <div><button className="btn btn-success" onClick={handleConfirmPengembalian(data)}> Confirm
                  </button>
                   
            <button className="btn btn-danger" onClick={handleRejectPengembalian(data.id)}>
                    Reject 
                  </button></div>}
                  
                  <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
        </div>
    </div>
    </div>
  )
}

function getCurrentDate(separator='-'){
  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  
  return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date<10?`0${date}`:`${date}`}`
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
        return 'Already past the due date'
    } if (selisih == 0) {
        return 'Borrowed. Due date is today'
    } else {
        return 'Borrowed'
    }
} if (status=='diajukan') {
    return 'In request'
} if (status=='pengembalian') {
  return 'In request to return book'
} if (status=='ditolak') {
  return 'Rejected'
} else {
  return 'Returned'
}
}


export default DetailPeminjamanAdmin