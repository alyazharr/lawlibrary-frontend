import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Container, Button, Form, Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import classes from '../context/Card.module.css';

const RetrieveRecommendation = () => {
  const [errMsg, setErrMsg] = useState('');
  const [taskId, setTaskId] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [pid, setPid] = useState('');
  const [hostname, setHostname] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const params = useParams();

  const handleInputChange = (e) => {
    setTaskId(e.target.value);
    console.log(taskId);
  };

  const handleFormSubmit = async (e) => {
    console.log('Button clicked!');
    console.log(taskId);
    setErrMsg('');
    setRecommendations([]);

    e.preventDefault();

    axios
      .get(`http://localhost:8080/book-recommendation/get-prediction/${taskId}`)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          console.log(response.data);
          console.log(response.data.task_status === 'SUCCESS');
          if (response.data.task_status === 'SUCCESS') {
            console.log('masuk sini');
            const recommend = response.data.task_result.recommendations;
            setRecommendations(recommend);
            console.log('SUCCESS');
            console.log(recommendations);
            setTaskStatus('SUCCESS');
          } else if (response.data.task_status === 'STARTED') {
            console.log('STARTED');
            setTaskStatus('STARTED');
            setPid(response.data.task_result.pid);
            setHostname(response.data.task_result.hostname);
          } else if (response.data.task_status === 'PENDING') {
            console.log('PENDING');
            setTaskStatus('PENDING');
          }
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div className="layout">
      <div className={classes.content}>
        <Container>
          <Row>
            <strong>
              <h1 className="mb-4">Retrieve Recommendation</h1>
            </strong>
          </Row>
          <Row className="justify-content-center mb-4">
            <Form onSubmit={handleFormSubmit} className="d-flex align-items-center w-50">
              <Form.Control
                type="text"
                id="title"
                value={taskId}
                onChange={handleInputChange}
                placeholder="Enter your ticket"
                className="flex-grow-1 mr-2"
              />
              <Button type="submit" className="w-auto">
                Submit
              </Button>
            </Form>
          </Row>
          <Row>
            {taskStatus && (
              <Card>
                <Card.Body>
                  <Card.Text>
                    {taskStatus === 'STARTED' && (
                      <div>
                        <p>Task Status: STARTED</p>
                        <p>Task ID: {taskId}</p>
                        <p>Process ID: {pid}</p>
                        <p>Hostname: {hostname}</p>
                      </div>
                    )}
                    {taskStatus === 'PENDING' && <p>Task Status: PENDING</p>}
                  </Card.Text>
                </Card.Body>
              </Card>
            )}
          </Row>
          <Row>
            {recommendations.map((recommendation) => (
              <Card key={recommendation.isbn} style={{ width: '13rem', margin: '5px' }}>
                <Card.Img variant="top" src={recommendation.image_url_l} />
                <Card.Body>
                  <Card.Title>{recommendation.title}</Card.Title>
                  <Card.Text>{recommendation.author}</Card.Text>
                  <Link to={{ pathname: `/detailBuku/${recommendation.id}` }}>
                    <button className="btn btn-primary">Detail</button>
                  </Link>
                </Card.Body>
              </Card>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default RetrieveRecommendation;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Row, Col, Container, Button, Form, Card } from 'react-bootstrap';
// import { Link, useParams } from "react-router-dom";
// import classes from '../context/Card.module.css'


// const RetrieveRecommendation = () => {
//     const [errMsg, setErrMsg] = useState('');
//     const [taskId, setTaskId] = useState('');
//     const [taskStatus, setTaskStatus] = useState('');
//     const [pid, setPid] = useState('');
//     const [hostname, setHostname] = useState('');
//     const [recommendations, setRecommendations] = useState([]);

//     const params = useParams();

//     const handleInputChange = (e) => {
//         setTaskId(e.target.value);
//         console.log(taskId);
//     };

//     const getBook = async (isbn) => {
//         const url = `http://localhost:8080/book/get-book-by-isbn?isbn=${isbn}`;
//         const response = await fetch(url);
//         const book = await response.json();
//         return Object.values(book)[0];
//     };

//     const handleFormSubmit = async (e) => {
//         console.log('Button clicked!');
//         console.log(taskId);
//         setErrMsg('');
//         setRecommendations([])

//         e.preventDefault();

//         axios.get(`http://localhost:8080/book-recommendation/get-prediction/${taskId}`)
//             .then((response) => {
//                 if (response.status === 200) {
//                     console.log(response);
//                     console.log(response.data);
//                     console.log(response.data.task_status === 'SUCCESS');
//                     // if (response.data.task_status === 'SUCCESS') {
//                     //     console.log('masuk sini');
//                     //     const recommend = response.data.task_result.recommendations;

//                     //     const bookPromises = recommend.map((rec) => getBook(rec.isbn));

//                     //     Promise.all(bookPromises)
//                     //         .then((books) => {
//                     //             setRecommendations(books);
//                     //             console.log('SUCCESS');
//                     //             console.log(recommendations);
//                     //             setTaskStatus('SUCCESS');
//                     //         })
//                     //         .catch((error) => {
//                     //             console.log(error);
//                     //         });
//                     // } else if (response.data.task_status === 'STARTED') {
//                     //     console.log('STARTED');
//                     //     setTaskStatus('STARTED');
//                     //     setPid(response.data.task_result.pid);
//                     //     setHostname(response.data.task_result.hostname);
//                     // } else if (response.data.task_status === 'PENDING') {
//                     //     console.log('PENDING');
//                     //     setTaskStatus('PENDING');
//                     // }
//                     if (response.data.task_status === 'SUCCESS') {
//                         console.log('masuk sini');
//                         const recommend = response.data.task_result.recommendations;
                    
//                         const bookPromises = recommend.map((rec) => {
//                             return getBook(rec.isbn)
//                                 .catch((error) => {
//                                     // If the book is not found, create a new book object
//                                     if (error.response && error.response.status === 404) {
//                                         const newBook = {
//                                             title: rec.title,
//                                             author: rec.author,
//                                             isbn: rec.isbn,
//                                             publication_year: rec.publication_year,
//                                             publisher: rec.publisher,
//                                             status: rec.status,
//                                             stok: rec.stok,
//                                             image_url_l: rec.image_url_l,
//                                             image_url_m: rec.image_url_m,
//                                             image_url_s: rec.image_url_s
//                                         };
                    
//                                         return axios.post('http://localhost:8080/book/add-book', newBook)
//                                             .then((response) => response.data);
//                                     }
                    
//                                     throw error;
//                                 });
//                         });
                    
//                         Promise.all(bookPromises)
//                             .then((books) => {
//                                 setRecommendations(books);
//                                 console.log('SUCCESS');
//                                 console.log(recommendations);
//                                 setTaskStatus('SUCCESS');
//                             })
//                             .catch((error) => {
//                                 console.log(error);
//                             });
//                     }
//                 }
//             })
//             .catch((error) => {
//                 console.log(error.response);
//             });
//     };

//     return (
//         <div className="layout">
//             <div className={classes.content}>
//                 <Container>
//                     <Row>
//                         <strong>
//                             <h1 className="mb-4">Retrieve Recommendation</h1>
//                         </strong>
//                     </Row>
//                     <Row className="justify-content-center mb-4">
//                         <Form onSubmit={handleFormSubmit} className="d-flex align-items-center w-50">
//                             <Form.Control
//                                 type="text"
//                                 id="title"
//                                 value={taskId}
//                                 onChange={handleInputChange}
//                                 placeholder="Enter your ticket"
//                                 className="flex-grow-1 mr-2"
//                             />
//                             <Button type="submit" className="w-auto">
//                                 Submit
//                             </Button>
//                         </Form>
//                     </Row>
//                     <Row>
//                         {taskStatus && (
//                             <Card>
//                                 <Card.Body>
//                                     <Card.Text>
//                                         {taskStatus === 'STARTED' && (
//                                             <div>
//                                                 <p>Task Status: STARTED</p>
//                                                 <p>Task ID: {taskId}</p>
//                                                 <p>Process ID: {pid}</p>
//                                                 <p>Hostname: {hostname}</p>
//                                             </div>
//                                         )}
//                                         {taskStatus === 'PENDING' && <p>Task Status: PENDING</p>}
//                                     </Card.Text>
//                                 </Card.Body>
//                             </Card>
//                         )}
//                     </Row>
//                     <Row>
//                         {recommendations.map((recommendation) => (
//                             <Card key={recommendation.isbn} style={{ width: '13rem', margin: '5px' }}>
//                                 <Card.Img variant="top" src={recommendation.image_url_l} />
//                                 <Card.Body>
//                                     <Card.Title>{recommendation.title}</Card.Title>
//                                     <Card.Text>{recommendation.author}</Card.Text>
//                                     <Link
//                                         to={{
//                                             pathname: `/detailBuku/${recommendation.id}`,
//                                         }}
//                                     >
//                                         <button className="btn btn-primary">Detail</button>
//                                     </Link>
//                                 </Card.Body>
//                             </Card>
//                         ))}
//                     </Row>
//                 </Container>
//             </div>
//         </div>
//     );
// };

// export default RetrieveRecommendation;


// // import React from 'react';
// // import axios from 'axios'
// // import { Row, Col, Container, Button, Form, Card, Toast } from 'react-bootstrap'
// // import classes from '../context/Card.module.css'
// // import { Link, useParams } from "react-router-dom";
// // import { useState, useEffect } from 'react';
// // import Pagination from './Pagination'
// // import { useAxiosPrivate } from '../utils/bookUtil';

// // const RetrieveRecommendation = () => {

// //     const [errMsg, setErrMsg] = useState('')
// //     const [taskId, setTaskId] = useState('')
// //     const [taskStatus, setTaskStatus] = useState('')
// //     const [pid, setPid] = useState('')
// //     const [hostname, setHostname] = useState('')
// //     const [bookList, setBookList] = useState([])
// //     const [recommendations, setRecommendations] = useState([])

// //     const handleInputChange = (e) => {
// //         setTaskId(e.target.value);
// //         console.log(taskId)
// //     }

// //     const getBook = async () => {
// //         const url = "http://localhost:8080/book/get-book-by-isbn?isbn=" + params.idbuku
// //         const response = await fetch(url)
// //         const books = await response.json()
// //         setbook(Object.values(books)[0])
// //       }

// //     const handleFormSubmit = async (e) => {
// //         console.log('Button clicked!')
// //         console.log(taskId)
// //         setErrMsg('')

// //         e.preventDefault();

// //         axios.get(`http://localhost:8080/book-recommendation/get-prediction/${taskId}`)
// //         .then(response => {
// //             if (response.status === 200){
// //                 console.log(response)
// //                 console.log(response.data)
// //                 console.log(response.data.task_status==='SUCCESS')
// //                 if (response.data.task_status === 'SUCCESS'){
// //                     console.log('masuk sini')
// //                     const recommend = response.data.task_result.recommendations;
// //                     setRecommendations(recommend);
// //                     console.log('SUCCESS')
// //                     console.log(recommendations)
// //                     setTaskStatus('SUCCESS')
// //                 }
// //                 else if (response.data.task_status === 'STARTED'){
// //                     console.log('STARTED')
// //                     setTaskStatus('STARTED')
// //                     setPid(response.data.task_result.pid)
// //                     setHostname(response.data.task_result.hostname)

// //                 }
// //                 else if (response.data.task_status === 'PENDING'){
// //                     console.log('PENDING')
// //                     setTaskStatus('PENDING')

// //                 }
// //             }
// //         })
// //         .catch(error => {
// //             console.log(error.response)

// //         });
// //     };


// //     return ( 
// //         <div className="layout">
// //             <div className={classes.content}>
// //                 <div>
// //                     <Container>
// //                         <Row>
// //                             <strong><h1 className='mb-4'>Retrieve Recommendation</h1></strong>
// //                         </Row>
// //                         <Row className="justify-content-center mb-4">
// //                             <Form onSubmit={handleFormSubmit} className="d-flex align-items-center w-50">
// //                                 <Form.Control
// //                                 type="text"
// //                                 id="title"
// //                                 value={taskId}
// //                                 onChange={handleInputChange}
// //                                 placeholder="Enter your ticket"
// //                                 className="flex-grow-1 mr-2" 
// //                                 />
// //                                 <Button type="submit" className="w-auto">
// //                                     Submit
// //                                 </Button>
// //                             </Form>
// //                         </Row>
// //                         <Row>
// //                             {taskStatus && (
// //                                 <Card>
// //                                     <Card.Body>
// //                                         <Card.Text>
// //                                             {taskStatus === 'STARTED' && (
// //                                             <div>
// //                                                 <p>Task Status: STARTED</p>
// //                                                 <p>Task ID: {taskId}</p>
// //                                                 <p>Process ID: {pid}</p>
// //                                                 <p>Hostname: {hostname}</p>
// //                                             </div>
// //                                             )}
// //                                             {taskStatus === 'PENDING' && (
// //                                             <p>Task Status: PENDING</p>
// //                                             )}
// //                                         </Card.Text>
// //                                     </Card.Body>
// //                                 </Card>
// //                             )}
// //                         </Row>
// //                         <Row>
// //                             {recommendations.map((book) => (
// //                                 <Card key={book.id} style={{ width: '13rem', margin: '5px' }}>
// //                                     <Card.Img variant="top" src={book.image_url_l} />
// //                                     <Card.Body>
// //                                         <Card.Title>{book.title}</Card.Title>
// //                                         <Card.Text>
// //                                             {book.author}
// //                                         </Card.Text>
// //                                         <Link to={{
// //                                             pathname: `/detailBuku/${book.id}`,
// //                                         }}
// //                                         ><button className="btn btn-primary">
// //                                                 Detail
// //                                             </button>
// //                                         </Link>
// //                                     </Card.Body>
// //                                 </Card>
// //                             ))}
// //                         </Row>
// //                     </Container>
// //                 </div>
// //             </div>
// //         </div>
// //      );
// // };
 
// // export default RetrieveRecommendation;