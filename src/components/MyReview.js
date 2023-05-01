import '../Styles/LoginForm.css'
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { API_REVIEW_USER, API_REVIEW_UPDATE, API_REVIEW_DELETE } from '../utils/reviewConstant'
import { Row, Col, Container, Button, Form, Card } from 'react-bootstrap'
import { useAxiosPrivate } from '../utils/bookUtil';

function MyReview(props) {
    const [myReviews, setMyReviews] = useState([])
    const [formAppear, setFormAppear] = useState(false)
    const [selectedReview, setSelectedReview] = useState(null);
    const [reviewData, setReviewData] = useState({
        rating: 0,
        review_text: '',
    })
    const PrivateAxios = useAxiosPrivate();

    const fetchMyReviews = async () => {
        try {
            const response = await PrivateAxios.get(API_REVIEW_USER, { method: "GET", withCredentials: true });
            if (response.status === 200) {
                console.log(response.data)
                setMyReviews(response.data)
             };
            }
        catch (error) {
            console.error('GET Failed:', error);
        }
    }

    const handleEdit = (review) => {
        setSelectedReview(review.id);
        setReviewData({
            rating: review.rating,
            review_text: review.review_text,
        });
        setFormAppear(true);
    };

    const handleClose = () => {
        setSelectedReview(null);
        setReviewData({
            rating: 0,
            review_text: '',
        });
        setFormAppear(false);
    };

    const handleReviewChange = (event) => {
        setReviewData({
            ...reviewData,
            [event.target.name]: event.target.value,
        });
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const response = await PrivateAxios.put(API_REVIEW_UPDATE + `/${selectedReview}`, reviewData, { withCredentials: true });
            if (response.status === 200) {
                console.log(response.data);
                console.log(reviewData.rating);
                console.log(reviewData.review_text);

                fetchMyReviews();
                setFormAppear(false);
                setSelectedReview(null);
                setReviewData({
                    rating: 0,
                    review_text: '',
                });
                handleClose();
            }
        } catch (error) {
            console.error("PUT Failed:", error);
        }
    };

    const handleDelete = async (review) => {
        try {
            const response = await PrivateAxios.delete(API_REVIEW_DELETE + `/${review.id}`, { withCredentials: true });
            if (response.status === 200) {
                console.log(response.data);
                fetchMyReviews();
            }
        } catch (error) {
            console.error("DELETE Failed:", error);
        }
    };

    const handleCancel = () => {
        setSelectedReview(null);
        setFormAppear(false);
        setReviewData({
            rating: 0,
            review_text: '',
        });
    };

    useEffect(() => {
        fetchMyReviews();
    }, [])



    return (
        <div style={{ marginLeft: '12%', marginTop: '2%', marginRight: '12%' }}>
            <h2 style={{ textAlign: 'center' }}>My Review</h2>
            <br></br>
            {formAppear && (
                <Card className='shadow w-50 mb-4 mx-auto'>
                    <Card.Body >
                        <Card.Title className='text-muted' style={{ fontSize: '17px', marginBottom: '2%' }}><strong>Edit Review Here (Click Review Want to Be Changed)</strong></Card.Title>

                        <Form onSubmit={handleUpdate}>
                            <Form.Group as={Row} className="mb-1">
                                <Form.Label column sm={2}>
                                    Rating (Give Rate 1-5⭐)
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control id="update-review" type="number" value={reviewData.rating}
                                        name="rating" onChange={handleReviewChange} style={{ width: '18%' }}
                                        placeholder="Rating (1-5)" step="0.1" min={1} max={5} required />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>
                                    Review
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control as="textarea" value={reviewData.review_text} style={{ width: '90%' }}
                                        onChange={handleReviewChange} name="review_text" wrap="soft"
                                        placeholder="Give your honest review here..." />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Col sm={{ span: 10, offset: 2 }}>
                                    <Button type="submit" className='btn-success' style={{ marginRight: '2%' }} >Submit Change</Button>
                                    <Button type="submit" onClick={handleCancel} className='btn-secondary'>Cancel Change</Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            )}
            {myReviews.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((myrev) => (
                <Card key={myrev.id} className='mb-3 shadow' style={{ width: '100%', margin: '5px' }}>
                    <Container>
                        <Row>
                            <Col xs={2} style={{ margin: '2%' }}>
                                <BookDetails book_id={myrev.book_id} />
                            </Col>
                            <Col xs={5} style={{ margin: '2%' }}>
                                <div style={{fontSize:'17px'}}>
                                    <p><strong>Rating ⭐ </strong> {myrev.rating}/5</p>
                                    <p><strong>My Review : </strong> <p>{myrev.review_text}</p></p>
                                </div>

                            </Col >
                            <Col xs={3} className='justify-content-right' style={{ marginLeft: '3%', marginTop: '2%', textAlign: 'right' }}>
                                {/* to change */}
                                <Link to={{
                                    pathname: `/reviews/update/${myrev.id}`,
                                }}
                                ><button className="btn btn-warning" onClick={() => handleEdit(myrev)}
                                    style={{ marginRight: '3%' }}>
                                        Change
                                    </button>
                                </Link>
                                {/* to delete */}
                                <Link to={{
                                    pathname: `/reviews/delete/${myrev.id}`,
                                }}>
                                    <button className="btn btn-danger" onClick={() => handleDelete(myrev)} >
                                        Delete
                                    </button>
                                </Link>
                                <br></br>
                                <Link to={{
                                    pathname: `/reviews/book/${myrev.book_id}`,
                                }}>
                                    <button className="btn btn-primary" onClick={() => handleDelete(myrev)}
                                        style={{ marginTop: '10px' }}>
                                        See Book Reviews
                                    </button>
                                </Link>
                            </Col>
                        </Row>
                    </Container>
                </Card>
            ))}
        </div>
    )
}

function BookDetails(props) {
    const [book, setBook] = useState([]);

    const fetchbook = async () => {
        const url = `http://34.72.52.78/book/get-book-by-id?id=${props.book_id}`
        const response = await fetch(url)
        const buku = await response.json()
        setBook(Object.values(buku)[0])
    }

    useEffect(() => {
        fetchbook();
    }, [props.book_id]);

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div className='justify-content-center'>
            <Card.Img variant="top" className='d-flex align-item-center' src={book.image_url_s} style={{ height: '120px', width: 'auto', margin: '0 auto'}} />
            <Card.Subtitle style={{marginTop:'3%', textAlign:'center'}}>{book.title}</Card.Subtitle>
            <Card.Text className='text-muted'style={{marginTop:'2%', textAlign:'center'}}>{book.author} ({book.publication_year})</Card.Text>
        </div>
    );
}

export default MyReview