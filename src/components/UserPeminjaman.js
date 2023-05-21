import '../Styles/Layout.css'
import { Row, Col, Container, Button, Form, Card } from 'react-bootstrap'
import { Link, useNavigate, useParams } from "react-router-dom";
import classes from '../context/Card.module.css'
import React, { useEffect, useState } from "react"
import Pagination from './Pagination';
import {useAxiosPrivate} from '../utils/bookUtil';
    
const UserPeminjaman = () => {
    const PrivateAxios = useAxiosPrivate()
    const navigate = useNavigate()
    const params = useParams();
    const [peminjaman, setpeminjaman] = useState([])
    const [books, setbooks] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const fetchpeminjaman = async () => {
      try {
        const response = await PrivateAxios.get("http://34.27.70.84/book/get-peminjaman-user-admin?username="+params.user)
        if (response.status === 200) {
          setpeminjaman(response['data'])
      }
    } catch {
    }

    }

    useEffect(() => {
        fetchpeminjaman()

    }, [])

    // Calculate the index range for the books to display based on the current page and items per page
    const startIndex = (currentPage-1)*itemsPerPage;
    const endIndex = startIndex+itemsPerPage;
    const displayedBooks = peminjaman.slice(startIndex,endIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    return (
        <div className="layout">

            <div className={classes.content}>
                <h1>Borrowing Book History</h1>
                <h1>User: {params.user}</h1>
                <h2>Email: {params.email}</h2>
                <br></br>
                {peminjaman == '' ? <h2>No Data</h2>:null}
                <div className="d-flex flex-wrap">
                    {displayedBooks.map((peminjaman) => (

                        <Card style={{ width: '13rem', margin: '5px' }} key={peminjaman.id}>
                            <Card.Img variant="top" src={peminjaman['buku'][0].image_url_l} />
                            <Card.Body>
                                <Card.Title>{peminjaman['buku'][0].title}</Card.Title>
                                <Card.Text>
                                    {peminjaman['buku'][0].author}
                                </Card.Text>
                                <Card.Text>
                                    Status: {cekStatus(peminjaman.status)}
                                </Card.Text>
                                {peminjaman.status != 'diajukan' & peminjaman.status != 'pengembalian'& peminjaman.status != 'ditolak' ? <div><Card.Text>
                                    Start Date: {peminjaman.start_date.slice(0,10)}
                                </Card.Text>
                                <Card.Text>
                                    End Date: {peminjaman.return_date}
                                </Card.Text></div>:null}
                                <Link to={{
                                    pathname: `/detailpeminjamanadmin/${peminjaman.id}/${peminjaman.id_buku}`,
                                }}
                                ><button className="btn btn-primary">
                                        Detail
                                    </button>
                                </Link>
                            </Card.Body>
                        </Card>

                    ))}
                </div>
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
            </div>
            
            
            <Row>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className='mt-4'>
                        <Pagination
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                            totalCount={books.length}
                            pageSize={itemsPerPage}
                            siblingCount={1}
                        /></div>
                </div>
            </Row>

            

        </div>

    );
}

function getSelisih(selesai){
    let hariini = new Date(getCurrentDate())
    let selesaia = new Date(selesai)
    const diffTime = (selesaia - hariini);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    return diffDays
}

function cekStatus(status, selesai){
    let selisih = getSelisih(selesai)
    if (status=='dipinjam') {
      if (selisih<0) {
          return 'Already past the due date'
      } if (selisih == 0) {
          return 'Borrowed. Due date is today'
      } else {
          return 'Borrowed'
      }
  } if (status=='diajukan') {
      return 'In request'
  } if (status=='pengembalian') {
    return 'In request to return book'
    } if (status=='ditolak') {
        return 'Borrowing request is rejected'
        } else {
    return 'Returned'
  }
}

function getCurrentDate(separator='-'){
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date<10?`0${date}`:`${date}`}`
  }

export default UserPeminjaman