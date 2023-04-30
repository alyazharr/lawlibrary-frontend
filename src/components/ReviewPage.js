import '../Styles/Layout.css'
import React, { Component } from 'react'
import { API_SEARCH } from '../utils/searchConstant'
import { API_REVIEW_RATING } from '../utils/reviewConstant'
import axios from 'axios'
import { Row, Col, Container, Button, Form, Card } from 'react-bootstrap'
import classes from '../context/Card.module.css'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import Pagination from './Pagination'

export default class ReviewPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchQuery: "",
            booksResult: [],
            currentPage: 1,
            itemsPerPage: 10,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        this.setState({ searchQuery: value });
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const query = this.state.searchQuery;
        axios.get(API_SEARCH + `/?keyword=${query}`)
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
        const startIndex = (this.state.currentPage - 1) * this.state.itemsPerPage;
        const endIndex = startIndex + this.state.itemsPerPage;

        return (
            <div className="layout">
                <div className={classes.content}>
                    <div>
                        <Container>
                            <Row>
                                <strong><h1 className='mb-4'>Book Review</h1></strong>
                            </Row>
                            <Row className="justify-content-center">
                                <Form onSubmit={this.handleFormSubmit} className="d-flex align-items-center w-50">
                                    <Form.Control type="text" id="search" value={this.state.searchQuery}
                                        onChange={this.handleInputChange}
                                        placeholder="Search Book by Keywords..." className="flex-grow-1 mr-2" />
                                    <Button type="submit" className="btn-icon-search w-auto">
                                        <FontAwesomeIcon icon={faSearch} />
                                    </Button>
                                </Form>
                            </Row>
                            <Row>
                                <Col>
                                    <br></br>
                                    <h6 className='text-muted'> Results from search <strong>{this.state.searchQuery} ...</strong></h6>
                                    <hr />
                                    <Row>
                                        {this.state.booksResult.slice(startIndex, endIndex).map((book) => (
                                            <Card key={book.id} style={{ width: '13rem', margin: '5px' }}>
                                                <Card.Img variant="top" src={book.image_url_m} />
                                                <Card.Body>
                                                    <Card.Title>{book.title}</Card.Title>
                                                    <Card.Text>
                                                        {book.author}
                                                    </Card.Text>
                                                    <Card.Text>
                                                        <RatingFetch book_id={book.id}/>
                                                    </Card.Text>
                                                    <Link to={{
                                                        pathname: `/reviews/book/${book.id}`,
                                                    }}
                                                    ><button className="btn btn-primary">
                                                            See Review
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

function RatingFetch(props) {
    const [avg_rating, setAvgRating] = useState(0);

    const fetchAvgRating = async () => {
        const url_avg = API_REVIEW_RATING + `/${props.book_id}`
        const response = await fetch(url_avg)
        const rating_get = await response.json()
        setAvgRating(rating_get.avg_rating)
    }

    useEffect(() => {
        fetchAvgRating();
    }, [props._book_id]);

    if (!avg_rating) {
        return <div>
            Rating ⭐ 0/5
        </div>
    }

    return (
        <div>
            Rating ⭐ {avg_rating}/5
        </div>
    );
}
