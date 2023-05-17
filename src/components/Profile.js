import '../Styles/Layout.css'
import { Row, Col, Container, Button, Form, Card } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom";
import classes from '../context/Card.module.css'
import React, { useEffect, useState } from "react"
import Pagination from './Pagination';
import {useAxiosPrivate} from '../utils/bookUtil';
    
  const Profile = () => {
    const PrivateAxios = useAxiosPrivate()
    const [peminjaman, setpeminjaman] = useState([])
    const [targetreminder, settargetreminder] = useState([])
    const [books, setbooks] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const fetchpeminjaman = async () => {
      try {
        const response = await PrivateAxios.get("http://34.133.211.90/book/get-peminjaman-user")
        // const peminjaman = await response.json()
        if (response.status === 200) {
          setpeminjaman(response['data'])

          console.log(peminjaman)
      }
    } catch {
    }

    }
    const fetchtargetreminder = async () => {
        const response = await PrivateAxios.get("http://34.133.211.90/book/get-targetreminder-user")
        // const targetreminder = await response.json()
        if (response.status === 200) {
          settargetreminder(response['data'])

          console.log(targetreminder)
      }

    }

    useEffect(() => {
        fetchpeminjaman()
        fetchtargetreminder()

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
                <h1>Daftar Peminjaman</h1>
                <br></br>
                {peminjaman == '' ? <h2>Belum ada riwayat peminjaman</h2>:null}
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
                                    Tanggal Meminjam: {peminjaman.start_date.slice(0,10)}
                                </Card.Text>
                                <Card.Text>
                                    Tanggal Selesai: {peminjaman.return_date}
                                </Card.Text>
                                <Link to={{
                                    pathname: `/profiledetailpeminjaman/${peminjaman.id}/${peminjaman.id_buku}`,
                                }}
                                ><button className="btn btn-primary">
                                        Detail Peminjaman
                                    </button>
                                </Link>
                            </Card.Body>
                        </Card>

                    ))}
                </div>
            </div>
            <div className={classes.content}>
                <h1>Daftar Target Membaca</h1>
                <br></br>
                {targetreminder == '' ? <h2>Belum ada riwayat target membaca</h2>:null}
                <div className="d-flex flex-wrap">
                    {targetreminder?.map((targetmembaca) => (

                        <Card style={{ width: '13rem', margin: '5px' }} key={targetmembaca.id}>
                            <Card.Img variant="top" src={targetmembaca['buku'][0].image_url_l} />
                            <Card.Body>
                                <Card.Title>{targetmembaca['buku'][0].title}</Card.Title>
                                <Card.Text>
                                    {targetmembaca['buku'][0].author}
                                </Card.Text>
                                <Card.Text>
                                    Tanggal Mulai: {targetmembaca.start_date.slice(0,10)}
                                </Card.Text>
                                <Card.Text>
                                    Target Selesai: {targetmembaca.target_date}
                                </Card.Text>
                                <Link to={{
                                    pathname: `/profiledetailtargetreminder/${targetmembaca.id}/${targetmembaca.id_buku}`,
                                }}
                                ><button className="btn btn-primary">
                                        Detail Target Membaca
                                    </button>
                                </Link>
                            </Card.Body>
                        </Card>

                    ))}
                </div>
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

export default Profile