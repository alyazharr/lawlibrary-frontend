import '../Styles/Layout.css'
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from "react-router-dom";
import classes from '../context/Card.module.css'
import React, { useEffect, useState } from "react"
import Todos from "./Todos";


const Home = () => {
    const [books, setBooks] = useState([])

    const fetchBooks = async () => {
        const response = await fetch("http://127.0.0.1:8000/book/get-books")
        const Books = await response.json()
        setBooks(Books)
    }

    useEffect(() => {
        fetchBooks()
    }, [])

    return (
        <div className="layout">

            <div className={classes.content}>
                <h1>List Buku</h1>
                <br></br>
                <div className="d-flex flex-wrap">
                    {books.map((book) => (
                        <Card style={{ width: '13rem', margin: '5px' }} key={book.id}>
                            <Card.Img variant="top" src={book.image_url_m} />
                            <Card.Body>
                                <Card.Title>{book.title}</Card.Title>
                                <Card.Text>
                                    {book.author}
                                </Card.Text>
                                <Link to={{
                                    pathname: `/detailBuku/${book.id}`,
                                }}
                                ><button className="btn btn-primary">
                                        Detail
                                    </button>
                                </Link>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>


        </div>

    )
}

export default Home