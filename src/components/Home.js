import '../Styles/Layout.css'
import { Row, Col, Container, Button, Form, Card } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom";
import classes from '../context/Card.module.css'
import React, { useEffect, useState } from "react"
import Todos from "./Todos";
import Pagination from './Pagination';


const Home = () => {
    const [books, setBooks] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const fetchBooks = async () => {
        const response = await fetch("http://127.0.0.1:8000/book/get-books")
        const Books = await response.json()
        setBooks(Books)
    }

    useEffect(() => {
        fetchBooks()
    }, [])

    // Calculate the index range for the books to display based on the current page and items per page
    const startIndex = (currentPage-1)*itemsPerPage;
    const endIndex = startIndex+itemsPerPage;
    const displayedBooks = books.slice(startIndex,endIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    return (
        <div className="layout">

            <div className={classes.content}>
                <h1>List Buku</h1>
                <br></br>
                <div className="d-flex flex-wrap">
                    {displayedBooks.map((book) => (
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
            
            {/* Pagination */}
            <Row>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className='mt-4'>
                        <Pagination
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                            totalCount={books.length}
                            pageSize={itemsPerPage}
                            siblingCount={1}
                        /></div>
                </div>
            </Row>

        </div>

    );
}

export default Home