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
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css'
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
const AllPeminjamanPage = () => {
    const [books, setBooks] = useState([])
    const [currentPage, setCurrentPage] = useState(1);

    const fetchBooks = async () => {
        const response = await fetch("http://34.27.70.84/book/get-all-peminjaman").then(async (response) => {
            if (response.status == 200) {
                const Books = await response.json()
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

    useEffect(() => {
        fetchBooks()
    }, [])

    const selectOptions = {
        'dipinjam': 'Borrowed',
        'ditolak': 'Rejected',
        'dikembalikan': 'Returned'
      };
      

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
            dataField: "status",
            text: "Status",
            formatter: (cell, row) => <a>{cekStatus(cell)}</a>,
            filter: selectFilter({
                options: selectOptions
              })
            
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
                  </div>,

        },

    ]

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

    return (
        <div className="layout">

            <div className={classes.content}>
                <div>
                    <Container>
                        <Row>
                            <strong><h1 className='mb-2'>Borrowed Books</h1></strong>
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

function cekStatus(status){
    if (status=='dipinjam') {
          return 'Borrowed'
      } if (status=='diajukan') {
      return 'In request'
    } if (status=='ditolak') {
        return 'Rejected'
      } else {
        return 'Returned'
    }
}

export default AllPeminjamanPage