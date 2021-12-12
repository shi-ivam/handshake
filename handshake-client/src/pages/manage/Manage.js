import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import server from '../../serverConfig';

const Manage = (props) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [morePage,setMorePage] = useState(false);
    const [currentPage,setPage] = useState(1);
    // const handleFilter = (type) => {

    // }
    useEffect(() => {
        setLoading(true);

        fetch(server.address + server.url + '/invoices?page='+currentPage.toString(), { mode: 'cors', method: "GET" })
            .then((response) => response.json())
            .then((res) => { 
                setItems(res.invoices); 
                console.log(res.invoices)
                setLoading(false);
                setPage(currentPage + 1);
                setMorePage(res.more)
            })

    }, [])
    const handleStatusChange = (e, event) => {
        const newItems = [...items];
        const elem = newItems.find(item => item.id === e);

        let index = undefined;
        for (let x = 0; x < items.length; x++) {
            if (items[x].id === e) {
                index = x;
            }
        }

        const value = event.target.value;

        elem.status = value;

        newItems.splice(index, 1, elem);
        setItems(newItems);


        // { title, creator, dueDate, billingAddress, items, total, description }

        fetch(server.address + server.url + '/update', {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST", body: JSON.stringify({
                type: 'status',
                id: e,
                updatedStatus:value
            })
        })
    }

    const handleLoadMore = () => {
        setLoading(true);
        console.log(morePage);
        fetch(server.address + server.url + '/invoices?page='+currentPage.toString(), { mode: 'cors', method: "GET" })
            .then((response) => response.json())
            .then((res) => {
                if (currentPage > 1){
                    
                setItems(items.concat(res.invoices)); 
                    setTimeout(() => {window.document.getElementById('load-more').scrollIntoView({ behavior: 'smooth' });},100)
                }
                else{
                    setItems(res.invoices)
                }
                setLoading(false);
                setMorePage(res.more)
            })
    }

    return (
        <Container>
            <Col>
                <h4 className="mb-3">All Invoices</h4>
                <Col>
                    {/* <Row>
                        <Button className='mr-2' outline type="button" color="primary">
                            Status : Any
                        </Button>
                        <Button className='mr-2' outline type="button" color="primary">
                            Created At : Any
                        </Button>
                        <Button className='mr-2' type="button" color="primary">
                            Sort : Descending
                        </Button>
                    </Row> */}
                    <Col className="p-0 mt-3">
                        {
                            loading ?
                                <div className="spinner-border"></div> :
                                items.map((e) => {
                                    const uid = 'id-' +e.id ;
                                    return (
                                        <Col className="p-0 mb-2">
                                            <Row className="bg-white p-4 rounded">
                                                <Col lg={9}>
                                                    <h5>{e.title}</h5>
                                                    <p>{e.description}</p>
                                                    <hr />
                                                    <p>Created At : {moment(e.createdAt).format('DD MMMM YYYY HH:MM')}</p>
                                                    <p>Email : shivam@shivam.com</p>
                                                </Col>
                                                <Col className="d-flex flex-column py-2 justify-content-between align-items-center">
                                                    <Col>
                                                        <h5 className="font-weight-light">Total : <span className="font-weight-bold">${e.total}</span></h5>

                                                        <p className="text-capitalize">Status : <span className="font-weight-bold">{e.status}</span></p>
                                                    </Col>
                                                    <Button onClick={() => {
                                                        if (document.querySelector("#" +uid).style.display === 'none') {
                                                            document.querySelector("#" + uid).style.display = "flex";
                                                        }
                                                        else {
                                                            document.querySelector("#" + uid).style.display = "none";
                                                        }
                                                    }} className="py-2">
                                                        <FontAwesomeIcon icon={faArrowDown} />
                                                    </Button>
                                                </Col>
                                            </Row>
                                            <Row className="p-4 bg-white" id={uid} style={{ display: "none" }} >
                                                <Col lg={9}>
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th>Title</th>
                                                                <th>Description</th>
                                                                <th>Quantity</th>
                                                                <th>Price</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                JSON.parse(e.items).map(e => {

                                                                    return <tr>
                                                                        <td>{e.title}</td>
                                                                        <td>{e.description}</td>
                                                                        <td>{e.quantity}</td>
                                                                        <td>{e.price}</td>
                                                                    </tr>
                                                                })
                                                            }
                                                        </tbody>
                                                        <tfoot>
                                                            <tr>
                                                                <td colSpan="3" className="font-weight-normal">Total</td>
                                                                <td className="font-weight-bold">
                                                                    ${e.total}
                                                                </td>
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                </Col>
                                                <Col>
                                                    <div className="btn-group-vertical w-100">
                                                        <Button className="w-10" color="primary" onClick={
                                                            () => {
                                                                navigator.clipboard.writeText('' + 'http://localhost:3000/pay/' + e.id);
                                                                /* Alert the copied text */
                                                                alert("Copied the text: " + 'http://localhost:3000/pay/' + e.id);
                                                            }
                                                        }>
                                                            Payment Url
                                                        </Button>
                                                        <Button className="w-100" color="secondary">
                                                            Delete
                                                        </Button>
                                                    </div>
                                                    <div className="mt-3">
                                                        <select onChange={(event) => { handleStatusChange(e.id, event) }} class="form-control text-capitalize btn border-primary form-control-lg">
                                                            <option selected={e.status === "completed"}>completed</option>
                                                            <option selected={e.status === "pending"}>pending</option>
                                                            <option selected={e.status === "cancelled"}>cancelled</option>
                                                        </select>
                                                    </div>
                                                </Col>
                                            </Row>

                                        </Col>
                                    )
                                })
                        }
                        <Row className={"py-4 align-items-center justify-content-center"}
                            style={{display:(morePage && !loading) ? 'flex' : "none"}}
                        >
                        {
                            <Button onClick={handleLoadMore} outline id="load-more" color="secondary">Load More</Button>
                        }
                        </Row>
                    </Col>
                </Col>
            </Col>
        </Container>
    );
}

export default Manage;