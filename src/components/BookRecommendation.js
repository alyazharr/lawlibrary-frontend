import React, { Component } from 'react'
import axios from 'axios'
import { Row, Col, Container, Button, Form, Card, Toast } from 'react-bootstrap'
import classes from '../context/Card.module.css'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import Pagination from './Pagination'
import { useAxiosPrivate } from '../utils/bookUtil';



const BookRecommendation = () =>{

    const [bookTitle, setBookTitle] = useState('');
    const [ticket, setTicket] = useState('');
    const [recommendations, setRecommendations] = useState([]);

    const [errMsg, setErrMsg] = useState('')

    const PrivateAxios = useAxiosPrivate();

    const handleInputChange = (e) => {
        setBookTitle(e.target.value);
    };

    // const [bookTitle, setBookTitle] = useState('');
//   const [ticket, setTicket] = useState('');
//   const [recommendations, setRecommendations] = useState([]);

//   const handleInputChange = (e) => {
//     setBookTitle(e.target.value);
//   };

    const handleFormSubmit = async (e) => {
        console.log('Button clicked!')
        setErrMsg('')
        setTicket('')

        e.preventDefault();

        axios.post('http://34.27.70.84/book-recommendation/', {
            title: bookTitle
        })
        .then(response => {
            if (response.status === 200){
                setTicket(response.data.task_id);
                console.log(ticket);
            }
        })
        .catch(error => {
            setErrMsg('Book with the given title not found.')
            console.log(error.response)
            console.log(errMsg)

        });

    };
    
    return (
        <div className="layout">
            <div className={classes.content}>
                <div>
                    <Container>
                        <Row>
                            <strong><h1 className='mb-4'>Book Recommendation</h1></strong>
                            <p className="lead">
                                Please enter a valid book title to search for its recommendations.
                            </p>
                            {/* <p className={errMsg ? "errmsg" : "hide"} aria-live="polite">{errMsg}</p> */}

                        </Row>
                        <Row className="justify-content-center mb-4">
                            <Form onSubmit={handleFormSubmit} className="d-flex align-items-center w-50">
                                <Form.Control
                                type="text"
                                id="title"
                                value={bookTitle}
                                onChange={handleInputChange}
                                placeholder="Enter book title"
                                className="flex-grow-1 mr-2" 
                                />
                                <Button type="submit" className="w-auto">
                                    Submit
                                </Button>
                            </Form>
                        </Row>
                        <Row>
                            {/* {errMsg && (
                            <div className="alert alert-danger" role="alert">
                                {errMsg}
                            </div>
                            )} */}

                            <p className={errMsg ? "errmsg" : "hide"} aria-live="polite">{errMsg}</p>

                            {ticket && (
                            <div className="mb-4">
                                <p>Your ticket: {ticket}</p>
                                <Link to={{
                                    // pathname:`/retrieve-recommendation/${ticket}`
                                    pathname:`/retrieve-recommendation`
                                }}>
                                    <button className="btn btn-primary mt-2">
                                    Retrieve Recommendation
                                    </button>
                                </Link>

                            </div>
                            )}
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    );

};

export default BookRecommendation;