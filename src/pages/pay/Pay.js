import React, { useState, useEffect,useParams } from "react";
import { Col, Row, Button } from 'reactstrap';
import moment from 'moment';
const Pay = (props) => {
    const [item, setItem] = useState(undefined);
    const id = props.match.params.id;
    useEffect(() => {
        setTimeout(() => {
            console.log(id);
            setItem({ id: 'invoice-1', title: "Coffee", description: "Some Good Coffee", status: "pending", url: "https://google.com", total: 24.00, items: [{ id: "1", title: "Coffee", description: "Some good coffee", price: 12.00, quantity: 2, total: 24.00 }] }, { id: 'invoice-2', title: "Coffee", description: "Some Good Coffee", status: "pending", url: "https://google.com", total: 24.00, items: [{ id: "1", title: "Coffee", description: "Some good coffee", price: 12.00, quantity: 2, total: 24.00 }] });
        }, 3333)
    }, []);
    
    return (
        <div className="container">
            <Row className="my-4 mx-1">
                <h2 className="display-4">Pay</h2>
            </Row>
            {
                item ?
                    <Row>
                        <Col lg={7} className="py-5">
                            <Row className='pb-5'>
                                <Col>
                                    <h4 className="mb-4  text-center">Details</h4>
                                    <hr />
                                    <Col>
                                        <h5>{item.title}</h5>
                                        <p>{item.description}</p>
                                        {/* <hr /> */}
                                        <Col className="mt-3 p-0">
                                            <p><span className="font-weight-bold">Created At</span> : {moment().format('DD MMMM YYYY HH:MM')}</p>
                                            <p><span className="font-weight-bold">Email</span> : shivam@shivam.com</p>
                                        </Col>
                                    </Col>
                                </Col>
                            </Row>
                            <h4 className="mb-4  text-center">Items</h4>
                            <hr />
                            <Col>
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
                                        item.items.map(e => {

                                            return <tr>
                                                <td>{e.title}</td>
                                                <td>{e.description}</td>
                                                <td>{e.quantity}</td>
                                                <td>${e.price}</td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="3" className="font-weight-normal">Total</td>
                                        <td className="font-weight-bold">
                                            ${item.total}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                            </Col>
                        </Col>
                        <Col className="p-2">

                            <Row className="p-0 mb-4">
                                <Col className="d-flex flex-column py-2 justify-content-between align-items-center">
                                    <Col>
                                        <h3 className="text-center font-weight-light mt-5">Total : <span className="font-weight-bold">${item.total}</span></h3>

                                        {/* <p className="text-capitalize mt-3">Status : <span className="font-weight-bold">{item.status}</span></p> */}
                                        <Col className="py-4 mt-3">
                                            <p className="h4  text-center">Billing Details</p>
                                            <hr />
                                            <p><span className="font-weight-bold">Name</span> : Shivam Kumar</p>
                                            <p><span className="font-weight-bold">Address</span> : 476E Railway Loco Colony</p>
                                            <p><span className="font-weight-bold">City</span> : Prayagraj</p>
                                            <p><span className="font-weight-bold">Pincode</span> : 211001</p>
                                            <p><span className="font-weight-bold">Phone No.</span> : 8840133xxx</p>
                                            <p><span className="font-weight-bold">Email</span> : shivam@gmail.com</p>
                                        </Col>
                                    </Col>
                                </Col>
                            </Row>
                            <Row className="">
                                <div className=" w-100 col p-3 d-flex align-items-end">
                                    <Col>
                                        <Button color="dark" className="w-100  p-3">
                                            Pay Using Stripe
                                        </Button>
                                        <Button color="dark" outline className="w-100 mt-2 p-3">
                                            Pay Using Paypal
                                        </Button>
                                    </Col>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                    :
                    <div className="spinner-border"></div>
            }
        </div>
    )
}

export default Pay;