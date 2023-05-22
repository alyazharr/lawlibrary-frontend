import '../Styles/LoginForm.css'
import { Link, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect,useContext } from 'react';
import classes from '../context/TargetReminder.module.css'
import classesCard from '../context/Card.module.css'

function Stock(props) {
    const idbook = useParams();
    const [stok, setStok] = useState(0);
    const [book, setbook] = useState([])
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();

    const fetchbook = async () => {
        const url = "http://localhost:8080/book/get-book-by-id?id=" + idbook.id
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
        if (stok < 0) {
            setStok(0)
        }
    }

    return (
        <div className={classes.content}>
            <h1>Stock Buku</h1>
            <br></br>
            <div key={book.id}>
                <img className={classes.img} src={book.image_url_l}></img>
                <form onSubmit={handleSubmit}>
                    <h3>Author: {book.author}</h3>
                    <h2>{book.title}</h2>
                    <div className={classes.item}>
                        <hr></hr>
                        <h4>Stock:</h4>
                        <h4>{book.stok}</h4>
                    </div>
                    <div className={classes.item}>
                        <h4 htmlFor='username'>Stock saat ini</h4>
                        <div className={classes.formdate}>
                            <input
                                type="number"
                                id='stok'
                                onChange={(e) => setStok(e.target.value)}
                                required
                                value={stok}
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

export default Stock