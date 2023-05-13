import '../Styles/LoginForm.css'
import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { API_REVIEW_BOOK, API_REVIEW_CREATE, API_REVIEW_RATING } from '../utils/reviewConstant'
import axios from 'axios'
import { Row, Col, Container, Button, Form, Card } from 'react-bootstrap'
import { useAxiosPrivate } from '../utils/bookUtil';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import Pagination from './Pagination';


function ReviewDetail(props) {
    const idbook = useParams();
    const [book, setBook] = useState([])
    const [reviewData, setReviewData] = useState({
        rating: 0,
        review_text: '',
    })
    const [reviews, setReviews] = useState([])
    const [avg_rating, setAvgRating] = useState([])
    const [errMsg, setErrMsg] = useState('')

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage 
    const sortedReviews = [...reviews].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const displayedReviews = sortedReviews.slice(startIndex, endIndex);

    const PrivateAxios = useAxiosPrivate();

    const fetchbook = async () => {
        const url = "http://34.72.52.78/book/get-book-by-id?id=" + idbook.id
        const response = await fetch(url)
        const buku = await response.json()
        setBook(Object.values(buku)[0])
    }

    const fetchAvgRating = async () => {
        const url_avg = API_REVIEW_RATING + `/${idbook.id}`
        const response = await fetch(url_avg)
        const rating_get = await response.json()
        setAvgRating(rating_get)
    }

    const fetcReviews = async () => {
        try {
            const response = await axios.get(API_REVIEW_BOOK + `/${idbook.id}`);
            setReviews(response.data);
            console.log(response.data);
            if (response.data.status_code === 404) {
                setErrMsg('Book with the correlated ID is not found');
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setErrMsg('Book with the correlated ID is not found');
            }
        }
    }

    useEffect(() => {
        fetchbook()
        setErrMsg()
        fetcReviews()
        fetchAvgRating()
    }, [])

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    const handleInputChange = (event) => {
        setReviewData({
            ...reviewData,
            [event.target.name]: event.target.value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (5 < reviewData.rating | reviewData.rating < 0) {
            setErrMsg("Rating must in range 0-5")
        } else {
            setErrMsg('')
        }
        try {
            const response = await PrivateAxios.post(API_REVIEW_CREATE + `/${idbook.id}`, reviewData,
                { method: "POST", withCredentials: true });
            if (response.status === 200) {
                console.log("SUKSES")
                setReviewData({
                    rating: "",
                    review_text: ""
                });
                const reviewResponse = await axios.get(API_REVIEW_BOOK + `/${idbook.id}`);
                setReviews(reviewResponse.data);
                fetchAvgRating();
            }
        } catch (error) {
            if (error.response.status === 409) {
                setErrMsg('You Already Reviewed This Book. Please Check My Reviews Page.');
            } else if (error.response.status === 400) {
                setErrMsg('Invalid Input. Unable to Add Review.');
            }
            else {
                console.error('POST Failed:', error);
            }
        }
    }

    return (
        <div>
            <div style={{ paddingLeft: '100px', marginTop: '2%' }}>
                <Link to={{
                    pathname: `/reviews`,
                }}
                >
                    <Button className='btn-light'>
                        <FontAwesomeIcon icon={faArrowLeft} style={{ height: '20px', paddingRight: '10px' }} /> Back
                    </Button>
                </Link>
            </div>
            <div style={{ marginTop: '1%' }}>
                <Container>
                    <Row>
                        {/* book */}
                        <Col xs={4} style={{ marginRight: '10%', textAlign: 'center', justifyContent: 'center' }}>
                            <h4><strong>{book.title}</strong></h4>
                            <br></br>
                            <div key={book.id}>
                                <img style={{ height: '400px', margin: '1%' }} src={book.image_url_l}></img>
                                <h6 style={{ paddingTop: '5%', fontSize: '18px' }}><strong>Author:</strong> {book.author}</h6>
                                <h6 style={{ fontSize: '18px' }}><strong>ISBN:</strong> {book.isbn}</h6>
                                <h6 style={{ fontSize: '18px' }}><strong>Publisher (Year):</strong> {book.publisher} ({book.publication_year})</h6>
                                <h6 style={{ fontSize: '18px' }}><strong>Rating ⭐:</strong> {avg_rating.avg_rating}/5</h6>
                            </div>
                        </Col>

                        {/* review */}
                        <Col xs={6}>
                            <p className={errMsg ? "errmsg" : "hide"} aria-live="assertive">{errMsg}</p>
                            <div>
                                <Card className='shadow'>
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: '17px', marginBottom: '2%' }}><strong>Write Your Review!</strong></Card.Title>
                                        <Form onSubmit={handleFormSubmit}>
                                            <Form.Group as={Row} className="mb-1">
                                                <Form.Label column sm={2}>
                                                    Rating ⭐
                                                </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control id="post-review" type="number" value={reviewData.rating}
                                                        name="rating" onChange={handleInputChange} style={{ width: '18%' }}
                                                        placeholder="(1-5)" step="0.1" min={1} max={5} required />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm={2}>
                                                    Review
                                                </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control as="textarea" value={reviewData.review_text}
                                                        onChange={handleInputChange} name="review_text" wrap="soft"
                                                        placeholder="Write your honest review here..." />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3">
                                                <Col sm={{ span: 10, offset: 2 }}>
                                                    <Button className='btn-success' type="submit">Send Review</Button>
                                                </Col>
                                            </Form.Group>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </div>
                            <hr></hr>
                            <Row>
                                <h4><strong>Reviews:</strong></h4>
                                {displayedReviews && displayedReviews.map((review_obj) => (
                                        <div key={review_obj.id}>
                                            <Card className='mb-3 shadow' >
                                                <Card.Body>
                                                    <Card.Title style={{ fontSize: '17px', color: 'blue' }}>@{review_obj.user_id}</Card.Title>
                                                    <Card.Subtitle style={{ fontSize: '14px' }} className="mb-2 text-muted">
                                                        {new Date(review_obj.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                        <span style={{ paddingLeft: '7px' }}>{new Date(review_obj.created_at).toLocaleTimeString('id-ID').replace(/\./g, ':')}</span>
                                                    </Card.Subtitle>
                                                    <Card.Text>
                                                        ⭐ {review_obj.rating}/5<br></br>
                                                        {review_obj.review_text}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    ))}
                            </Row>
                            <Row>
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <div className='mt-4'>
                                        <Pagination
                                            currentPage={currentPage}
                                            onPageChange={handlePageChange}
                                            totalCount={reviews.length}
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

    )
}

export default ReviewDetail