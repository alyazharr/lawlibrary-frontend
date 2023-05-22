import React, { Component } from 'react'
import axios from 'axios'
import { Row, Col, Container, Button, Form, Card, Toast } from 'react-bootstrap'
import classes from '../context/Card.module.css'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import Pagination from './Pagination'
import { useAxiosPrivate } from '../utils/bookUtil';


const AddBuku = () => {

    const [errMsg, setErrMsg] = useState('')
    const [msg, setMsg] = useState('')

    const [book, setBook] = useState({
        title: '',
        author: '',
        isbn: '',
        publication_year: '',
        publisher: '',
        status: 'available',
        stok: 1,
        image_url_l: '',
        image_url_m: '',
        image_url_s: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedValue = name === 'publication_year' ? parseInt(value, 10) : value;
        setBook({ ...book, [name]: updatedValue });
    };

    const handleSubmit = async (e) => {
        console.log(book)
        setMsg('')
        setErrMsg('')
        e.preventDefault();

        axios.post('http://localhost:8080/book/add-book',
            book
        )
        .then(response => {
            if (response.status === 200){
                console.log('Buku successfully added to database')
                setMsg('Buku successfully added to database')
            }
        })
        .catch(error => {
            if (error.response.status === 409){
                setErrMsg('Book with given title already found in the database')
                console.log(error.response)
                console.log(errMsg)
            }
        });

    };

    return (
        <div className="layout">
            <div className={classes.content}>
                <Container>

                
                <h2 className="mb-4"><strong>Add Book</strong></h2>
                <p className={errMsg ? "errmsg" : "hide"} aria-live="assertive">{errMsg}</p>
                <p className={msg ? "msg" : "hide"} aria-live="polite">{msg}</p>
                <Card className='shadow'>
                    <Card.Body>
                        <Card.Title style={{ fontSize: '17px', marginBottom: '2%' }}><strong>Book form</strong></Card.Title>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label column sm={2}>
                                    Title
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control id="title" type="text" value={book.title}
                                        name="title" onChange={handleChange}
                                        placeholder="Book Title" required />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label column sm={2}>
                                    Author
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" value={book.author}
                                        onChange={handleChange} name="author"
                                        placeholder="Book Author" required/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label column sm={2}>
                                    ISBN
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" value={book.isbn}
                                        onChange={handleChange} name="isbn"
                                        placeholder="ISBN Book" required/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label column sm={2}>
                                    Publication Year
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="number" value={book.publication_year}
                                        onChange={handleChange} name="publication_year"
                                        placeholder="Publication year of book" required/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label column sm={2}>
                                    Publisher
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" value={book.publisher}
                                        onChange={handleChange} name="publisher"
                                        placeholder="Book Publisher" required/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label column sm={2}>
                                    Status
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" value={book.status}
                                        onChange={handleChange} name="status"
                                        placeholder="Book status" required/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label column sm={2}>
                                    Stock
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="number" value={book.stok}
                                        onChange={handleChange} name="stok"
                                        placeholder="Book stock" required/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label column sm={2}>
                                    Large Image URL
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" value={book.url_l}
                                        onChange={handleChange} name="url_l"
                                        placeholder="Large URL Image of Book" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label column sm={2}>
                                    Medium Image URL
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" value={book.url_m}
                                        onChange={handleChange} name="url_m"
                                        placeholder="Medium URL Image of Book" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-4">
                                <Form.Label column sm={2}>
                                    Small Image URL
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" value={book.url_s}
                                        onChange={handleChange} name="url_s"
                                        placeholder="Small URL Image of Book" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Col>
                                    <Button className='btn-success' type="submit">Add Book</Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
                </Container>
            </div>
        </div>
    );
}
 
export default AddBuku