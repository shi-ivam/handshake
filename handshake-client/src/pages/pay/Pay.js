import React, { useState, useEffect } from "react";
import { Col, Row, Button } from 'reactstrap';
import moment from 'moment';
import server from '../../serverConfig';

import './Pay.css';

const Pay = (props) => {
    const [item, setItem] = useState(undefined);
    const [stripeOpen, setStripeOpen] = useState(false);
    const [loadingStripe, setLoadingStripe] = useState(false);
    const [stripePayLoading, setStripePayLoading] = useState(false);
    const [completed, setCompleted] = useState(false);
    const id = props.match.params.id;
    useEffect(() => {
        fetch(server.address + server.url + '/invoice/' + id)
            .then((response) => response.json())
            .then((response) => setItem(response.invoice))
            .catch(err => console.log(err));
    }, []);
    const handleStripePay = async () => {

        if (stripeOpen) {
            setStripeOpen(false);
            setLoadingStripe(false);
            return
        }


        setLoadingStripe(true);

        const clientSecret = await fetch(server.address+server.url+'/payment-intent/'+item.id)
            .then(response => response.json())
            .then(json => json.client_secret)
        setLoadingStripe(false);

        const scriptElem = document.createElement('script');
        scriptElem.src = "https://js.stripe.com/v3/";
        document.body.append(scriptElem);

        scriptElem.onload = () => {
            setStripeOpen(true);

            var stripe = window.Stripe("pk_test_aC2g6z6r52Yt7AzcLPJkqpdP007fZGd1fx", {
                locale: "in",
            });

            // Pass the appearance object to the Elements instance
            // const elements = stripe.elements({ clientSecret, appearance });

            var elements = stripe.elements();
            var style = {
                base: {
                    color: "#32325d",
                    fontFamily: "Arial, sans-serif",
                    fontSmoothing: "antialiased",
                    fontSize: "16px",
                    "::placeholder": {},
                },
                invalid: {
                    fontFamily: "Arial, sans-serif",
                    color: "#fa755a",
                },
            };
            var card = elements.create("card", { style: style });
            // Stripe injects an iframe into the DOM
            card.mount("#card-element");
            card.on("change", function (event) {
                // Disable the Pay button if there are no card details in the Element
                document.querySelector("button#submit").disabled = event.empty;
                document.querySelector("#card-error").textContent = event.error
                    ? event.error.message
                    : "";
            });
            var form = document.getElementById("payment-form");
            form.addEventListener("submit", function (event) {
                event.preventDefault();
                setStripePayLoading(true);
                // Complete payment when the submit button is clicked
                payWithCard(stripe, card, clientSecret);
            });

            var payWithCard = function (stripe, card) {
                stripe
                    .confirmCardPayment(clientSecret, {
                        payment_method: {
                            card: card,
                        },
                    })
                    .then(function (result) {
                        setStripePayLoading(false);
                        if (result.error) {
                            // Show error to your customer
                            console.log(result.error);
                        } else {
                            // The payment succeeded!

                            // Change Window.localtion with this is
                            console.log("success");
                            fetch(server.address + server.url + '/complete-payment', {
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                }, mode: 'cors', method: "POST", body: JSON.stringify({ id: item.id, ...result })
                            })
                                .then((res) => res.json())
                                .then((res) => {
                                    if (res.type === 'success') {
                                        setCompleted(true)
                                    }
                                    else {
                                        alert('Payment Failed')
                                    }
                                })
                        }
                    });
            };
        }
    }
    return (
        <div className="container">
            {
                completed ?
                    <div className="container vh-100 align-items-center d-flex justify-content-center">

                        <h1 className="display-4 text-center">Done!</h1>
                    </div>
                    :
                    <div>
                        {
                            item ?
                                <div>
                                    <Row className="my-4 mx-1">
                                        <h2 className="display-4 px-2">Pay</h2>
                                    </Row>
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
                                                            <p><span className="font-weight-bold">Created At</span> : {moment(item.createdAt).format('DD MMMM YYYY HH:MM')}</p>
                                                            <p><span className="font-weight-bold">Email</span> : {JSON.parse(item.billingAddress).email}</p>
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
                                                            JSON.parse(item.items).map(e => {

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
                                                            <p><span className="font-weight-bold">Name</span> : {JSON.parse(item.billingAddress).firstName+" " + JSON.parse(item.billingAddress).lastName}</p>
                                                            <p><span className="font-weight-bold">Address</span> : {JSON.parse(item.billingAddress).address}</p>
                                                            <p><span className="font-weight-bold">Street</span> : {JSON.parse(item.billingAddress).street}</p>
                                                            <p><span className="font-weight-bold">City</span> : {JSON.parse(item.billingAddress).city}</p>
                                                            <p><span className="font-weight-bold">Pincode</span> : {JSON.parse(item.billingAddress).pincode}</p>
                                                            <p><span className="font-weight-bold">Email</span> : {JSON.parse(item.billingAddress).email}</p>
                                                        </Col>
                                                    </Col>
                                                </Col>
                                            </Row>
                                            <Row className="">
                                                <div className=" w-100 col p-3 d-flex align-items-end">
                                                    <Col>
                                                        <form className={stripeOpen ? 'mb-3' : 'hidden'} id="payment-form" >
                                                            <div className={loadingStripe ? '' : "hidden"}>
                                                                <div className="spinner-border"></div>
                                                            </div>
                                                            <div id="card-element">
                                                            </div>
                                                            <button id="submit">
                                                                <div className={stripePayLoading ? 'spinner' : 'hidden'} id="spinner"></div>
                                                                <span id="button-text" className={stripePayLoading ? 'hidden' : '='}>Pay</span>
                                                            </button>
                                                            <p id="card-error" role="alert"></p>
                                                            <p class="result-message hidden">
                                                                Payment succeeded, see the result in your
                                                                <a href="" target="_blank">Stripe dashboard.</a> Refresh the
                                                                page to pay again.
                                                            </p>
                                                        </form>
                                                        <Button color="dark" className="w-100  p-3" onClick={handleStripePay}>
                                                            {
                                                                stripeOpen ? 'Close' : 'Pay Using Card'
                                                            }
                                                        </Button>
                                                        <Button color="dark" outline className="w-100 mt-2 p-3">
                                                            Pay Using Paypal
                                                        </Button>
                                                    </Col>
                                                </div>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                                :
                                <div className="container vh-100 align-items-center d-flex justify-content-center">

                                    <div className="spinner-border"></div>
                                </div>
                        }
                    </div>
            }
        </div>
    )
}

export default Pay;