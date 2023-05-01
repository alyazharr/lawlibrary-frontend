import '../Styles/LoginForm.css'
import { Link, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect,useContext } from 'react';
import classes from '../context/TargetReminder.module.css'
import {useAxiosPrivate} from '../utils/clientUtil';

function TargetReminderForm(props) {
  const PrivateAxios = useAxiosPrivate()
  const idbook = useParams();
  const [tglselesai, settglselesai] = useState('');
  const [book, setbook] = useState([])
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();
  
  const fetchbook = async () => {
    const url = "http://34.173.54.132/book/get-book-by-id?id=" + idbook.id
    const response = await fetch(url)
    const buku = await response.json()
    setbook(Object.values(buku)[0])
    }

  useEffect(() => {
  fetchbook()
  setErrMsg()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tglselesai < getCurrentDate2()){
        setErrMsg("Tanggal selesai membaca tidak valid. Tanggal yang diisi tidak boleh sebelum tanggal mulai membaca.")
    } else {
        setErrMsg('')
    try {
        const url = 'http://34.173.54.132/book/target-reminder?idbuku='+idbook.id+'&targetdate='+tglselesai
        const res = await PrivateAxios.post(url)
      .catch(error => {
          console.log("API Review not catching data", error)
      });
        if (res.status === 200) {
          navigate('/detailtargetreminder/'+res['data'][1][0]['id']+'/'+idbook.id)
        } else {
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div className={classes.content}>
    <h1>Target Membaca</h1>
    <br></br>
        <div key={book.id}>
      <img className={classes.img} src={book.image_url_l}></img>
      <form onSubmit={handleSubmit}>
        <h3>Author: {book.author}</h3>
        <h2>{book.title}</h2>
        <div className={classes.item}>
            <hr></hr>
        <h4>Tanggal Mulai Membaca:</h4>
        <h4>{getCurrentDate()}</h4>
        </div>
        <div className={classes.item}>
          <h4 htmlFor='username'>Tanggal Target Selesai:</h4>
          <div className={classes.formdate}>
           <input
            type="date"
            id='tglselesai'
            onChange={(e) => settglselesai(e.target.value)}
            required
            value={tglselesai}
            className="form-control"
          />
           </div>
        </div>
        <div className={classes.item}>
        <p className={errMsg ? "errmsg" : "hide"} aria-live="assertive">{errMsg}</p>
        <Link to={{                            
    pathname:`/detailBuku/${book.id}`,                            
   }}
   ><button className="btn btn-secondary">
                                Back 
            </button>
            </Link>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
        </div>
  )
}

function getCurrentDate(separator='-'){
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${date<10?`0${date}`:`${date}`}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`
}
function getCurrentDate2(separator='-'){
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date<10?`0${date}`:`${date}`}`
}

export default TargetReminderForm