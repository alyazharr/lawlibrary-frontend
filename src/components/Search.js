import '../Styles/Layout.css'
import React, { Component } from 'react'
import { API_SEARCH_TITLE, API_SEARCH_AUTHOR, API_SEARCH_ISBN } from '../utils/searchConstant'
import axios from 'axios'
import { Row, Col, Container, Button, Form, Card } from 'react-bootstrap'
import classes from '../context/Card.module.css'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import Pagination from './Pagination'

export default class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchQueryTitle: "",
            searchQueryAuthor: "",
            searchQueryISBN: "",
            booksResult: [],
            currentPage: 1,
            itemsPerPage: 10,
        }
        this.handleInputChangeTitle = this.handleInputChangeTitle.bind(this);
        this.handleInputChangeAuthor = this.handleInputChangeAuthor.bind(this);
        this.handleInputChangeISBN = this.handleInputChangeISBN.bind(this);
        this.handleFormSubmitTitle = this.handleFormSubmitTitle.bind(this);
        this.handleFormSubmitAuthor = this.handleFormSubmitAuthor.bind(this);
        this.handleFormSubmitISBN = this.handleFormSubmitISBN.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handleInputChangeTitle(event) {
        const target = event.target;
        const value = target.value;
        this.setState({ searchQueryTitle: value });
        this.setState({ searchQueryAuthor: '' });
        this.setState({ searchQueryISBN: '' });
    }

    handleInputChangeAuthor(event) {
        const target = event.target;
        const value = target.value;
        this.setState({ searchQueryAuthor: value });
        this.setState({ searchQueryTitle: '' });
        this.setState({ searchQueryISBN: '' });
    }

    handleInputChangeISBN(event){
        const target = event.target;
        const value = target.value;
        this.setState({ searchQueryISBN: value });
        this.setState({ searchQueryAuthor: '' });
        this.setState({ searchQueryTitle: '' });
    }

    handleFormSubmitTitle(event) {
        event.preventDefault();
        const query = this.state.searchQueryTitle;
        axios.get(API_SEARCH_TITLE + `?title=${query}`)
            .then(res => {
                const bookRes = res.data;
                this.setState({ booksResult: bookRes });
            })
            .catch(error => {
                console.log("API not catching data", error)
            })
    }

    handleFormSubmitAuthor(event) {
        event.preventDefault();
        const query = this.state.searchQueryAuthor;
        axios.get(API_SEARCH_AUTHOR + `?author=${query}`)
            .then(res => {
                const bookRes = res.data;
                this.setState({ booksResult: bookRes });
            })
            .catch(error => {
                console.log("API not catching data", error)
            })
    }

    handleFormSubmitISBN(event){
        event.preventDefault();
        const query = this.state.searchQueryISBN;
        axios.get(API_SEARCH_ISBN + `?isbn=${query}`)
            .then(res => {
                const bookRes = res.data;
                this.setState({ booksResult: bookRes });
            })
            .catch(error => {
                console.log("API not catching data", error)
            })
    }

    handlePageChange(pageNumber) {
        this.setState({ currentPage: pageNumber });
    }

    render() {
        // Calculate the index range for the books to display based on the current page and items per page
        const startIndex = (this.state.currentPage - 1) * this.state.itemsPerPage;
        const endIndex = startIndex + this.state.itemsPerPage;

        return (
            <div className="layout">
                <div className={classes.content}>
                    <div>
                        <Container>
                            <Row>
                                <strong><h1 className='mb-4'>Search Book</h1></strong>
                            </Row>
                            <Row>
                                <Form onSubmit={this.handleFormSubmitTitle} className="d-flex align-items-center w-50">
                                    <Form.Label htmlFor="searchTitle" className="mr-sm-2">Search By Title</Form.Label>
                                    <Form.Control type="text" id="searchTitle" value={this.state.searchQueryTitle}
                                        onChange={this.handleInputChangeTitle}
                                        placeholder="Search by book title" className="flex-grow-1 mr-2" style={{ maxWidth: "calc(100% - 4rem)" }} />
                                    <Button type="submit" className="btn-icon-search w-auto">
                                        <FontAwesomeIcon icon={faSearch} /></Button>
                                </Form>

                                <Form onSubmit={this.handleFormSubmitAuthor} className="d-flex align-items-center w-50">
                                    <Form.Label htmlFor="searchAuthor" className="mr-sm-2">Search By Author</Form.Label>
                                    <Form.Control type="text" id="searchAuthor" value={this.state.searchQueryAuthor}
                                        onChange={this.handleInputChangeAuthor}
                                        placeholder="Search by book author" className="flex-grow-1 mr-2" style={{ maxWidth: "calc(100% - 4rem)" }} />
                                    <Button type="submit" className="btn-icon-search w-auto">
                                        <FontAwesomeIcon icon={faSearch} /></Button>
                                </Form>

                            </Row>
                            <Row className='justify-content-center'>
                                <Form onSubmit={this.handleFormSubmitISBN} className="d-flex align-items-center w-50">
                                    <Form.Label htmlFor="searchISBN" className="mr-sm-2">Search By ISBN</Form.Label>
                                    <Form.Control type="text" id="searchISBN" value={this.state.searchQueryISBN}
                                        onChange={this.handleInputChangeISBN}
                                        placeholder="Search by book ISBN" className="flex-grow-1 mr-2" style={{ maxWidth: "calc(100% - 4rem)" }} />
                                    <Button type="submit" className="btn-icon-search w-auto">
                                        <FontAwesomeIcon icon={faSearch} /></Button>
                                </Form>

                            </Row>
                            <Row>
                                <Col>
                                    <br></br>
                                    {this.state.searchQueryTitle !== '' && (
                                    <h6 className='text-muted'>Results from search <strong>{this.state.searchQueryTitle} ...</strong></h6>
                                    )}

                                    {this.state.searchQueryAuthor !== '' && (
                                    <h6 className='text-muted'>Results from search <strong>{this.state.searchQueryAuthor} ...</strong></h6>
                                    )}

                                    {this.state.searchQueryISBN !== '' && (
                                    <h6 className='text-muted'>Results from search <strong>{this.state.searchQueryISBN} ...</strong></h6>
                                    )}

                                    <hr />
                                    <Row>
                                        {this.state.booksResult.slice(startIndex, endIndex).map((book) => (
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
                                    </Row>
                                    <Row>
                                        <div style={{ display: "flex", justifyContent: "center" }}>
                                            <div className='mt-4'>
                                                <Pagination
                                                    currentPage={this.state.currentPage}
                                                    totalCount={this.state.booksResult.length}
                                                    siblingCount={1}
                                                    pageSize={this.state.itemsPerPage}
                                                    onPageChange={this.handlePageChange}
                                                /></div>
                                        </div>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
        );
    }
}
