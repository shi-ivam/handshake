import moment from 'moment';
import React, { useState } from 'react';
import { Col, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import s from './Create.module.scss';

const Create = (props) => {
    const [items, setItems] = useState([{ title: "Coffee", description: "Some good coffee", price: 12.00, quantity: 2 }]);
    const handleAddItem = () => {
        setItems(items.concat({title:"Coffee",description:"Some Coffee",price:12.00,quantity:2}));
    }
    const handleItemChange = (index, type, e) => {
        const new_items = [...items];
        const edited_item = {...new_items[index]};
        
        if (type === "name") {
            edited_item.title = e.target.value;
        }
        else if (type === "description") {
            edited_item.description = e.target.value;
        }
        else if (type === "price") {
            edited_item.price = e.target.value;
        }
        else if (type === "quantity") {
            edited_item.quantity = e.target.value;
        }
        console.log(edited_item)
        console.log(new_items)
        new_items.splice(index,1,edited_item);
        setItems(new_items)
    }
    const total = () => {
        let t = 0;
        for (let x = 0; x < items.length; x++) {
            t = t + items[x].price * items[x].quantity;
        }
        return t;
    }
    return (
        <Row>
            <Col lg={7}>

                <Form className="p-4">
                    <FormGroup>
                        <Label for="firstName">
                            First Name
                        </Label>
                        <Input id="firstName" name="firstName" placeHolder="John" type="text">
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="lastName">
                            Last Name
                        </Label>
                        <Input id="lastName" name="lastName" placeHolder="John" type="text">
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">
                            Email
                        </Label>
                        <Input id="email" name="email" placeHolder="johndoe@email.com" type="email">
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">
                            Description
                        </Label>
                        <Input
                            id="description"
                            name="description"
                            type="textarea"
                        />
                    </FormGroup>
                    <hr />
                    <Button onClick={handleAddItem} color="primary" outline >Add Item</Button>
                    <Col className="pt-4">
                        {
                            items.map((e, index) => (
                                <Row className="bg-white pt-3 mt-3">
                                    <Col xl={9}>
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
                    <Button color="primary">
                        Submit
                    </Button>
                </Form>
            </Col>
            <Col>
                <h3>Summary</h3>
                <Col>
                    <Row className="mt-4">
                        <Col>
                            <h5>Bill To</h5>
                            <p >
                                <p>Shivam Kumar</p>
                                <p>
                                    476-E Railway Loco Colony</p>
                                <p>
                                    Civil Lines</p>
                                <p>
                                    Allahabad</p>
                                <p>
                                    India </p>
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
                            <p className="h4 font-weight-normal"><span className="font-weight-bold">{"$500.99"}</span> due on {moment().add(2, 'days').format('DD MMMM, YYYY')}</p>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col className="p-3 ">
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
    )
}


export default Create;