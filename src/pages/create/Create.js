import moment from 'moment';
import React, { useState } from 'react';
import { Col, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import DatePicker from 'react-date-picker';
import './Create.datepicker.css';
import {Alert} from 'reactstrap';
import s from './Create.module.scss';

const Create = (props) => {
    const [items, setItems] = useState([{ title: "Coffee", description: "Some good coffee", price: 12.00, quantity: 2 }]);
    const [dueDate, setDueDate] = useState(new Date());
    const [itemDetails, setItemDetails] = useState({ title: 'Coffee', description: 'Something...' })
    const [details, setDetails] = useState({ firstName: 'John', lastName: 'Doe', email: '', address: '123 John', street: 'John Street', city: 'New York', country: 'United States', pincode: '10001' });
    const [createdInvoice, setCreateInvoice] = useState({});
    // useEffect(() => {
    //     console.log(
    //        )
    // }, []);

    const handleAddItem = () => {
        setItems(items.concat({ title: "Coffee", description: "Some Coffee", price: 12.00, quantity: 2 }));
    }
    const handleItemChange = (index, type, e) => {
        const new_items = [...items];
        const edited_item = { ...new_items[index] };

        if (type === "name") {
            edited_item.title = e.target.value;
        }
        else if (type === "description") {
            setItemDetails({ ...itemDetails, description: e.target.value });
        }
        else if (type === "title") {
            setItemDetails({ ...itemDetails, title: e.target.value })
        }
        else if (type === "price") {
            edited_item.price = e.target.value;
        }
        else if (type === "quantity") {
            edited_item.quantity = e.target.value;
        }
        console.log(edited_item)
        console.log(new_items)
        new_items.splice(index, 1, edited_item);
        setItems(new_items)
    }
    const total = () => {
        let t = 0;
        for (let x = 0; x < items.length; x++) {
            t = t + items[x].price * items[x].quantity;
        }
        return t;
    }
    const handleDetailChange = (type, event) => {
        if (type == 'firstName') {
            setDetails({ ...details, firstName: event.target.value })
        }
        else if (type == 'lastName') {
            setDetails({ ...details, lastName: event.target.value })
        }
        else if (type == 'email') {
            setDetails({ ...details, email: event.target.value })
        }
        else if (type == 'Address') {
            setDetails({ ...details, address: event.target.value })
        }
        else if (type == 'Street') {
            setDetails({ ...details, street: event.target.value })
        }
        else if (type == 'City') {
            setDetails({ ...details, city: event.target.value })
        }
        else if (type == 'Country') {
            setDetails({ ...details, country: event.target.value })
        }
        else if (type == 'Pincode') {
            setDetails({ ...details, pincode: event.target.value })
        }
        else {
            setDetails({ ...details, description: event.target.value })
        }
    }



    const handleSubmit = () => {
        setCreateInvoice({ type: 'success' })
        // fetch('/create', {
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     }, method: "POST", mode: "cors", body: JSON.parse({ items: items, ...itemDetails, billingAddress: { ...details } })
        // })
        //     .then((response) => response.json())
        //     .then((response) => {
        //         if (response.type === 'success') {
        //             setCreateInvoice({ type: 'success', invoice: response.invoice })
        //         }
        //         else {
        //             setCreateInvoice({ type: 'failed' })
        //         }
        //     })

        // console.log({ items: items, ...itemDetails, billingAddress: { ...details } })
    }
    return (
        <div>
            <Row>

                <Col lg={7} className="px-4">
                    <div className=" p-0">
                        {
                            createdInvoice.type === "success" ?
                            <Alert color="primary text-dark" className="text-center  mb-5">
                            Created!
                        </Alert>
                                :
                                createdInvoice.type === "failed" ?
                                    <Alert color="danger text-dark" className="text-center mb-5">
                                        Failed to Create
                                    </Alert>
                                    :

                                    false
                        }
                    </div>
                    <Form>

                        <Row className="pt-0 pb-2">
                            <Col>
                            <h4>Details</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="email">
                                        Title
                                    </Label>
                                    <Input className="w-100" id="title" name="title" placeHolder="Coffee" type="text" defaultValue={itemDetails.title} onChange={(event) => { handleDetailChange('title', event); }}>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="email">
                                        Description
                                    </Label>
                                    <Input
                                        id="description"
                                        name="description"
                                        defaultValue={itemDetails.description}
                                        type="textarea" onChange={(event) => { handleDetailChange('description', event) }}
                                    />
                                </FormGroup>
                            </Col>

                        </Row>
                        <Row className="pt-4 pb-2">
                            <Col>
                            <h4>Billing Details</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="firstName">
                                        First Name
                                    </Label>
                                    <Input id="firstName" name="firstName" placeHolder="John" type="text" onChange={(event) => { handleDetailChange('firstName', event); }}>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col>


                                <FormGroup>
                                    <Label for="lastName">
                                        Last Name
                                    </Label>
                                    <Input id="lastName" name="lastName" placeHolder="John" type="text" onChange={(event) => { handleDetailChange('lastName', event) }}>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="email">
                                Email
                            </Label>
                            <Input id="email" name="email" placeHolder="johndoe@email.com" type="email" onChange={(event) => { handleDetailChange('email', event) }}>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Due Date</Label>
                            <Row className="px-3">

                                <DatePicker
                                    onChange={(date) => { setDueDate(date); }}
                                    minDate={dueDate}
                                    maxDate={moment(dueDate).add(14, 'days').toDate()}
                                    value={dueDate}
                                />
                            </Row>
                        </FormGroup>

                        <Row className="pt-2">
                            <Col>
                                <FormGroup>
                                    <Label for="Address">
                                        Address
                                    </Label>
                                    <Input id="Address" name="Address" placeHolder="Address" type="text" onChange={(event) => { handleDetailChange('Address', event); }}>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col>


                                <FormGroup>
                                    <Label for="Street">
                                        Street
                                    </Label>
                                    <Input id="Street" name="Street" placeHolder="Street" type="text" onChange={(event) => { handleDetailChange('Street', event) }}>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>


                        <Row >
                            <Col>
                                <FormGroup>
                                    <Label for="City">
                                        City
                                    </Label>
                                    <Input id="City" name="City" placeHolder="City" type="text" onChange={(event) => { handleDetailChange('City', event); }}>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col>


                                <FormGroup>
                                    <Label for="Country">
                                        Country
                                    </Label>
                                    <Input id="Country" name="Country" placeHolder="Country" type="text" onChange={(event) => { handleDetailChange('Country', event) }}>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row >
                            <Col>
                                <FormGroup>
                                    <Label for="Pincode">
                                        Pincode
                                    </Label>
                                    <Input id="Pincode" name="Pincode" placeHolder="Pincode" type="number" onChange={(event) => { handleDetailChange('Pincode', event); }}>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col>
                            </Col>
                        </Row>
                        <div className="my-4">
                        </div>
                        <hr />
                        <Button onClick={handleAddItem} color="primary" outline >Add Item</Button>

                        <Col className="mt-5 p-0">

                            <h4 className="m-0 py-0">Items</h4>
                        </Col>
                        <Col className="pt-4">
                            {
                                items.map((e, index) => (
                                    <Row className="bg-white pt-1">
                                        <Col xl={8}>
                                            <FormGroup className="p-1 mb-3">
                                                <Label>Title</Label>
                                                <Input
                                                    type="name"
                                                    placeholder="Coffee"
                                                    defaultValue={e.title}
                                                    onChange={(event) => {
                                                        handleItemChange(index, "name", event)
                                                    }}
                                                >
                                                </Input>
                                            </FormGroup>
                                            <FormGroup className="p-2 mb-3">
                                                <Label>Description</Label>
                                                <Input
                                                    type="textarea"
                                                    placeholder="Coffee"
                                                    defaultValue={e.description}
                                                    onChange={(event) => {
                                                        handleItemChange(index, "description", event)
                                                    }}
                                                >
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup className="p-1 mb-3">
                                                <Label>
                                                    Price
                                                </Label>
                                                <Input
                                                    type="number"
                                                    placeholder="9.99"
                                                    defaultValue={e.price}
                                                    onChange={(event) => {
                                                        handleItemChange(index, "price", event)
                                                    }}
                                                >
                                                </Input>
                                            </FormGroup>
                                            <FormGroup className="p-1 mb-3">
                                                <Label>
                                                    Qty
                                                </Label>
                                                <Input
                                                    type="quantity"
                                                    placeholder="9.99"
                                                    defaultValue={e.quantity}
                                                    onChange={(event) => {
                                                        handleItemChange(index, "quantity", event)
                                                    }}
                                                >
                                                </Input>
                                            </FormGroup>

                                        </Col>

                                    </Row>
                                ))
                            }
                        </Col>
                        <hr />
                        <Button color="primary" className={[s.submitBtn,"mb-5 btn-lg submit-btn"]}  onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                </Col>
                <Col>
                            <Col>
                            <h4>Summary</h4>
                            </Col>
                    <Col>
                        <Row className="mt-4">
                            <Col>
                                <h5>Bill To</h5>
                                <p >
                                    <p>{details.firstName} {details.lastName}</p>
                                    <p>{details.email}</p>
                                    <p>
                                        {details.address}</p>
                                    <p>
                                        {details.street}</p>
                                    <p>
                                        {details.city}</p>
                                    <p>
                                        {details.country} </p>
                                    <p>{details.pincode}</p>
                                </p>
                            </Col>
                            <Col>
                                <h5>Date of Issue</h5>
                                <p>{moment().format('DD MMMM yyyy')}</p>
                                <p>{moment().format('hh:mm')}</p>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col>
                                <p className="h4 font-weight-normal"><span className="font-weight-bold">${total()}</span> due on {moment(dueDate).format('DD MMMM, YYYY')}</p>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col className="py-3 px-0">
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
                                            items.map(e => {

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
                                                $
                                                {
                                                    total()
                                                }
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="p-5">
                                <Row className=" h6 font-weight-light align-items-center justify-contents-left">
                                    <input className="mr-2" type="checkbox" id="flexSwitchCheckDefault" />
                                    <label className="m-0" for="flexSwitchCheckDefault">Send Email to Recipient</label>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Col>
            </Row>
        </div>
    )
}


export default Create;