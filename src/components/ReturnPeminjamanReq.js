import { Row, Col, Container, Button, Form, Card } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom";
import classes from '../context/Card.module.css'
import React, { useEffect, useState } from "react"
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

const ReturnPeminjamanReq = () => {
    const PrivateAxios = useAxiosPrivate()
    const navigate = useNavigate();
    const [books, setBooks] = useState([])
    const [data, setdata] = useState([])
    const [book, setbook] = useState([])
    const handleReject = (param) => async e => {
        e.preventDefault()
        try {
        const url = 'http://34.27.70.84/book/tolak-pengembalian?idpeminjaman='+param
        const res = await PrivateAxios.put(url)
      .catch(error => {
          console.log("API put failed", error)
      });
        if (res.status === 200) {
            window.location.reload();
        } else {
        }
      } catch (err) {
        console.log(err);
      }
      }

    const handleConfirm = (param) => async e => {

        e.preventDefault()
        try {
        const url = 'http://34.27.70.84/book/konfirmasi-pengembalian?idpeminjaman='+param+'&returndate='+getCurrentDate()
        const res = await PrivateAxios.put(url)
        let updatedStok = param.buku[0].stok+1;
        console.log("stok: "+updatedStok)
        let urlUpdate = 'http://34.27.70.84/stock/update?id='+param.buku[0].id+'&stok='+updatedStok
        const hasil = await PrivateAxios.put(urlUpdate)
      .catch(error => {
          console.log("API put failed", error)
      });
        if (res.status === 200 && hasil.status === 200) {
            window.location.reload();
        } else {
            console.log(hasil['data'])
        }
      } catch (err) {
        console.log(err);
      }
      }

    const fetchBooks = async () => {
        const response = await fetch("http://34.27.70.84/book/get-all-returning-request").then(async (response) => {
            if (response.status === 200) {
                const Books = await response.json()
                setBooks(Books)
            }
            throw new Error('not Found');
            })
            .then((responseJson) => {
            setBooks(responseJson)
            })
            .catch((error) => {
            console.log(error)
            });
    }

    useEffect(() => {
        fetchBooks()
    }, [])

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

    const lol = (param) => {
        console.log("idbuku"+param.buku[0].id)
        console.log("stok"+param.buku[0].stok)
        console.log("idpinjam"+param.id)
    }
    const column = [
        {
            dataField: "username",
            text: "User",
            formatter: (cell, row) => <Link to={{                            
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
                <button className="btn btn-success" onClick={handleConfirm(row)}> Confirm
                  </button>
                   
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
                            <strong><h1 className='mb-2'>Returning Book Request</h1></strong>
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

function getCurrentDate(separator='-'){
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date<10?`0${date}`:`${date}`}`
  }

export default ReturnPeminjamanReq