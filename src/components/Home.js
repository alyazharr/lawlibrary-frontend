import { Row, Col, Container, Button, Form, Card } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom";
import classes from '../context/Card.module.css'
import React, { useEffect, useState } from "react"
import Todos from "./Todos";
import { API_SEARCH } from '../utils/searchConstant'
import Pagination from './Pagination';
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"


const Home = () => {
    const [books, setBooks] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const [searchQuery, setSearchQuery] = useState('')

    // Calculate the index range for the books to display based on the current page and items per page
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const displayedBooks = books.slice(startIndex, endIndex);

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };
    

    const fetchBooks = async () => {
        const response = await fetch("http://34.72.52.78/book/get-books")
        const Books = await response.json()
        setBooks(Books)
    }

    useEffect(() => {
        fetchBooks()
        handleSubmitQuery()
    }, [])

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    const handleSubmitQuery = async (event) => {

        try {
            event.preventDefault();
            const response = await axios.get(API_SEARCH + `/?keyword=${searchQuery}`)
            if (response.status === 200) {
                setBooks(response.data)
                setSearchQuery('')
            }
        }

        catch (error) {
            console.error("API Fetch Failed:", error);
        }
    };

    return (
        <div className="layout">

            <div className={classes.content}>
                <div>
                    <Container>
                        <Row>
                            <strong><h1 className='mb-2'>Welcome to LawLibrary!</h1></strong>
                            <h6 className='text-muted mb-4'>The More You Read, The More You Know</h6>
                        </Row>
                        <Row className="justify-content-center">
                            <Form onSubmit={handleSubmitQuery} className="d-flex align-items-center w-50">
                                <Form.Control type="text" id="search" value={searchQuery}
                                    onChange={handleInputChange}
                                    placeholder="Search Book by Keywords..." className="flex-grow-1 mr-2" />
                                <Button type="submit" className="btn-icon-search w-auto">
                                    <FontAwesomeIcon icon={faSearch} />
                                </Button>
                            </Form>
                        </Row>
                        <Row>
                            <Col>
                                <br></br>
                                <h6 className='text-muted'> Results from search <strong>{searchQuery} ...</strong></h6>
                                <hr />
                                <Row>
                                    {displayedBooks.map((book) => (
                                        <Card key={book.id} style={{ width: '13rem', margin: '5px' }}>
                                            <Card.Img variant="top" src={book.image_url_l} />
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
                                </Row>

                                {/* </div> */}
                                {/* <br></br>
                <div className="d-flex flex-wrap">
                    {displayedBooks.map((book) => (
                        <Card style={{ width: '13rem', margin: '5px' }} key={book.id}>
                            <Card.Img variant="top" src={book.image_url_l} />
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
                    ))} */}
                                {/* </div> */}
                                {/* </div> */}

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
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    )
}

export default Home