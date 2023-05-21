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
import BootstrapTable from 'react-bootstrap-table-next';
import "bootstrap/dist/css/bootstrap.min.css"
import {useAxiosPrivate} from '../utils/bookUtil';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css'
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
const RequestPeminjamanPage = () => {
    const PrivateAxios = useAxiosPrivate()
    const navigate = useNavigate();
    const [books, setBooks] = useState([])

    const handleReject = (param) => async e => {
        e.preventDefault()
        console.log(param)
        try {
        const url = 'http://34.27.70.84/book/tolak-pinjam?idpeminjaman='+param
        const res = await PrivateAxios.put(url)
      .catch(error => {
          console.log("API put failed", error)
      });
        if (res.status === 200) {
            console.log(res['data'])
            window.location.reload();
        } else {
        }
      } catch (err) {
        console.log(err);
      }
      }

    const handleConfirm = (param) => async e => {
        e.preventDefault()
        console.log(param)
        try {
        const url = 'http://34.27.70.84/book/konfirmasi-pinjam?idpeminjaman='+param
        const res = await PrivateAxios.put(url)
      .catch(error => {
          console.log("API put failed", error)
      });
        if (res.status === 200) {
            console.log(res['data'])
            window.location.reload();
        } else {
        }
      } catch (err) {
        console.log(err);
      }
      }

    const handleConfirmReminder = (idreminder, idpeminjaman) => async e => {
        e.preventDefault()
        // console.log(id)
        // console.log(selesai)
        try { 
            let url = 'http://34.27.70.84/book/konfirmasi-pinjam?idpeminjaman='+idpeminjaman
            let res = await PrivateAxios.put(url)
            if (res.status === 200) {
            } 
            let url2 = 'http://34.27.70.84/book/target-reminder-start?idreminder='+idreminder
            const res2 = await PrivateAxios.get(url2)
            if (res.status === 200) {
               window.location.reload();
            } 
          } catch (err) {
            console.log(err);
          }
      }
    

    const fetchBooks = async () => {
        const response = await fetch("http://34.27.70.84/book/get-all-peminjaman-request").then(async (response) => {
            if (response.status == 200) {
                const Books = await response.json()
                console.log("ini")
                console.log(Books)
                setBooks(Books)
            }
            throw new Error('not Found');
            })
            .then((responseJson) => {
            console.log(responseJson)
            setBooks(responseJson)
            })
            .catch((error) => {
            console.log(error)
            });
    }
    const pagination = paginationFactory({
        page:1,
        sizePerPage: 10,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        prePageText: '<',
        showTotal: true,
        alwaysShowAllBtns: true,
    })

    useEffect(() => {
        fetchBooks()
    }, [])


    const column = [
        {
            dataField: "username",
            text: "User",
            formatter: (cell, row) =>  <Link to={{                            
                pathname:`/user-peminjaman/${cell}/${row.email_user}`,                            
              }}><a>
                    {cell} 
                  </a>
                  </Link>,
            sort: true,
            filter: textFilter()
            
        },
        {
            dataField: "buku[0].title",
            text: "Book Title",
            formatter: (cell, row) => <a href={'/detailb/' + row.buku[0].id}> {cell} </a>,
            sort: true,
            filter: textFilter()
            
        },
        {
            dataField: "start_date",
            text: "Start Date",
            formatter: (cell, row) => cell.slice(0,10),
            sort: true,
            filter: textFilter()
            
        },
        {
            dataField: "return_date",
            text: "Return Date",
            sort: true,
            filter: textFilter()
            
        },
        {
            text: "Action",
            formatter: (cell, row) => <div>
                <Link to={{                            
                    pathname:`/detailpeminjamanadmin/${row.id}/${row.buku[0].id}`,                            
                  }}><button className="btn btn-secondary">
                        Detail 
                      </button>
                      </Link>
                
            {row.reminder ?<button className="btn btn-success" onClick={handleConfirmReminder(row.reminder, row.id)}> Confirm
                  </button>:<button className="btn btn-success" onClick={handleConfirm(row.id)}> Confirm 
                  </button>}
                   
            <button className="btn btn-danger" onClick={handleReject(row.id)}>
                    Reject 
                  </button>
                  </div>,

        },

    ]

    return (
        <div className="layout">

            <div className={classes.content}>
                <div>
                    <Container>
                        <Row>
                            <strong><h1 className='mb-2'>Borrowing Book Request</h1></strong>
                        </Row>
                        <Row>
                            <Col>
                                <Row>
                        
                                <div className='App'>
                                {books.length!=0? <BootstrapTable bootstrap4 keyField='id' data={books} columns={column} pagination={pagination} filter={filterFactory()}></BootstrapTable>:<div><h1>no data</h1></div>}
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

export default RequestPeminjamanPage