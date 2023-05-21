import '../Styles/LoginForm.css'
import { Link, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect,useContext } from 'react';
import classes from '../context/TargetReminder.module.css'
import {useAxiosPrivate} from '../utils/bookUtil';

function PinjamPage(props) {
  const PrivateAxios = useAxiosPrivate()
  const idbook = useParams();
  const [reminder, setreminder] = useState(false);
  const [book, setbook] = useState([])
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();
  
  const fetchbook = async () => {
    const url = "http://34.27.70.84/book/get-book-by-id?id=" + idbook.id
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
    let selesai = getTglSelesai()
    if (book.stock == 0){
        setErrMsg("Buku tidak tersedia untuk dipinjam.")
    } else {
        setErrMsg('')
    try {
        if (reminder){
                let url = 'http://34.27.70.84/book/target-reminder?idbuku='+idbook.id+'&targetdate='+selesai
                let res = await PrivateAxios.post(url)
                if (res.status === 200) {
                 
                console.log(res.data[1][0]['id'])
                let url2 = 'http://34.27.70.84/book/ajukan-pinjam?idbuku='+idbook.id+'&returndate='+selesai+'&reminder='+res.data[1][0]['id']
                let res2 = await PrivateAxios.post(url2)
                if (res2.status === 200) {
                  navigate('/detailpeminjaman/'+res2['data'][1][0]['id']+'/'+idbook.id)
                }
              }
        } else {
            let url = 'http://34.27.70.84/book/ajukan-pinjam?idbuku='+idbook.id+'&returndate='+selesai
            const res = await PrivateAxios.post(url)
            if (res.status === 200) {
                let updatedStok = book.stok-1;
                console.log("stok "+updatedStok)
                let url = 'http://34.27.70.84/stock/update?id='+idbook.id+'&stok='+updatedStok
                const rex = await PrivateAxios.put(url)

                if (rex.status === 200) {
                    navigate('/detailpeminjaman/' + res['data'][1][0]['id'] + '/' + idbook.id)
                }
                else {
                    console.log(rex.status)
                }
            } else {
            }
          }
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div className={classes.content}>
    <h1>Request to borrow the book</h1>
    <br></br>
        <div key={book.id}>
      <img className={classes.img} src={book.image_url_l}></img>
      <form onSubmit={handleSubmit}>
        <h3>Author: {book.author}</h3>
        <h2>{book.title}</h2>
        <div className={classes.item}>
            <hr></hr>
        </div>
        <div className={classes.item}>
          <div className={classes.formdate}>
          <input 
          type="checkbox" 
          id="reminder" 
          name="reminder"
          onChange={() => setreminder(!reminder)}
          value={reminder} />  Send me a reading reminder
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
            Request to Borrow
          </button>
        </div>
      </form>
    </div>
        </div>
  )
}

function getTglSelesai(separator='-'){
    let newDate = new Date()
    newDate.setDate(newDate.getDate()+7);
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date<10?`0${date}`:`${date}`}`
}

export default PinjamPage