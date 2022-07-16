import React, { useState } from "react";
import Moment from 'moment';
import {
  Col,
  Row,
  Progress,
} from "reactstrap";
import Widget from "../../components/Widget/Widget.js";
import * as eva from 'eva-icons';
import meal1 from "../../assets/dashboard/meal-1.svg";
import meal2 from "../../assets/dashboard/meal-2.svg";
import meal3 from "../../assets/dashboard/meal-3.svg";
// import upgradeImage from "../../assets/dashboard/upgradeImage.svg";
// import heartRed from "../../assets/dashboard/heartRed.svg";
// import heartTeal from "../../assets/dashboard/heartTeal.svg";
// import heartViolet from "../../assets/dashboard/heartViolet.svg";
// import heartYellow from "../../assets/dashboard/heartYellow.svg";
import ApexLineChart from "./components/ApexLineChart";
import { useEffect } from "react";
import s from "./Dashboard.module.scss";
import shoppingCart from "../../assets/dashboard/shopping-bag.png";
import paid from "../../assets/dashboard/paid.png";
import wallclock from "../../assets/dashboard/wall-clock.png";
import server from '../../serverConfig';
import cancel from "../../assets/dashboard/cancel.png";

const Dashboard = () => {
  const [checkboxes, setCheckboxes] = useState([true, false])
  const [chartLoading, setChartLoading] = useState(true);
  const [chartSeries, setChartSeries] = useState([]);
  const [chartDays, setChartDays] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [lastWeekInvoices,setLastWeekInvoices] = useState([]);
  useEffect(() => {
    // add this line
    eva.replace();
    fetchData();
  }, []);
  const toggleCheckbox = (id) => {
    setCheckboxes(checkboxes => checkboxes
      .map((checkbox, index) => index === id ? !checkbox : checkbox))
  }
  const fetchData = () => {
    fetch(server.address + server.url + "/series?lastDays=7")
      .then((response) => response.json())
      .then((data) => {
        setChartSeries(data.series);
        setChartDays(data.days);
        setLastWeekInvoices(data.lastWeekInvoices);
        setProgressData(data.orders);
        console.log(data.orders)
        setChartLoading(false);
      })
    // [
    //   {
    //     name: "Orders",
    //     data: [Math.round(Math.random()*1000), Math.round(Math.random()*1000), Math.round(Math.random()*1000), Math.round(Math.random()*1000), Math.round(Math.random()*1000), Math.round(Math.random()*1000), Math.round(Math.random()*1000)],
    //   },
    //   {
    //     name: "Last Week Orders",
    //     data: [Math.round(Math.random()*1000), Math.round(Math.random()*1000), Math.round(Math.random()*1000), Math.round(Math.random()*1000), Math.round(Math.random()*1000), Math.round(Math.random()*1000), Math.round(Math.random()*1000)],
    //   },
    // ];
  }

  const calculateTotal = (invoices,filter) => {
    let total = 0;
    if (filter){
      invoices.forEach(invoice => {
        if(invoice.status === filter){
          total += invoice.total;
        }
      })
    }
    else{
      invoices.forEach(invoice => {
        total += invoice.total;
      })
    }
    return total;
  }

  const meals = [meal1, meal2, meal3];

  return (
    <div>
      <Row>
        <Col className="pr-grid-col" xs={12} lg={12}>
          <Row className="gutter mb-4">
            <Col className="mb-4 mb-md-0" xs={12} md={6}>
              <Widget className="h-100">
                <div className="d-flex justify-content-between widget-p-md">
                  <div className="headline-3 d-flex align-items-center">Your activity</div>
                  {/* <UncontrolledDropdown>
                    <DropdownToggle caret>
                      &nbsp; Weekly &nbsp;
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>Daily</DropdownItem>
                      <DropdownItem>Weekly</DropdownItem>
                      <DropdownItem>Monthly</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown> */}
                </div>
                {
                  chartLoading ?
                    <div className="row justify-content-center align-items-center h-100">
                      <div className="spinner-border"></div>
                    </div>
                    :

                    <ApexLineChart className="pb-4" series={chartSeries} days={chartDays} />
                }
              </Widget>
            </Col>
            <Col xs={12} md={6}>
              <Widget className="widget-p-md">
                <div className="d-flex justify-content-between">
                  <div className="headline-3 d-flex align-items-center">Your Invoices</div>
                  {/* <UncontrolledDropdown>
                    <DropdownToggle caret>
                      &nbsp; Weekly &nbsp;
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>Daily</DropdownItem>
                      <DropdownItem>Weekly</DropdownItem>
                      <DropdownItem>Monthly</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown> */}
                </div>
                {
                  lastWeekInvoices.length === 0 ?
                    <div style={{height:"100px"}} className="d-flex flex-col justify-content-center align-items-center">
                      <p className="h6 text-muted">
                        You have no invoices
                      </p>
                    </div>
                    :
                    lastWeekInvoices.slice(0,4).map((invoice) =>
                  <div key={invoice.id} className={`mt-4 ${s.widgetBlock}`}>
                    <div className={s.widgetBody}>
                      <div className="d-flex">
                        <div className="d-flex justify-content-center align-items-center pr-2">
                          <i
                            data-eva="file"
                            data-eva-hover="false"
                            data-eva-infinite="true"
                          />
                        </div>
                        <div className="d-flex flex-column">
                          <p className="body-2">{invoice.title}</p>
                          <p className="body-3 muted">{Moment(invoice.createdAt).format('DD MMMM, YYYY')}</p>
                        </div>
                      </div>
                      <div className="body-3 muted">
                        ${invoice.total}
                      </div>
                    </div>
                  </div>
                )
                }
              </Widget>
            </Col>
          </Row>

          {chartLoading ?
          <div className="row justify-content-center align-items-center h-100">
            <div className="spinner-border"></div>
          </div>
          :
          <Row className="gutter">
            <Col className="mb-4 mb-xl-0" xs={6} sm={6} xl={3}>
              <Widget className="widget-p-sm">
                <div className={s.smallWidget}>
                  <div className="d-flex mb-4">
                    <img className="py-1 mr-2 img-fluid" style={{height:50,paddingRight:5,paddingLeft:5}} src={shoppingCart} alt="..." />
                    <div className="d-flex flex-column">
                      <p className="headline-3">Orders</p>
                      <p className="body-2">
                        ${
                        calculateTotal(lastWeekInvoices,false)
                      }<span className="body-3 muted">/ {progressData[0]}</span></p>
                    </div>
                  </div>
                  <div>
                    <Progress color="secondary-red" className={`progress-xs ${s.mutedPink}`} value="100" />
                  </div>
                </div>
              </Widget>
            </Col>
            <Col className="mb-4 mb-xl-0" xs={6} sm={6} xl={3}>
              <Widget className="widget-p-sm">
                <div className={s.smallWidget}>
                  <div className="d-flex mb-4">
                    <img className="py-1 mr-2 img-fluid" style={{height:50,paddingRight:5,paddingLeft:5}}  src={paid} alt="..." />
                    <div className="d-flex flex-column">
                      <p className="headline-3">Paid</p>
                      <p className="body-2">
                        ${
                        calculateTotal(lastWeekInvoices, 'completed')
                      }
                      <span className="body-3 muted">/ {lastWeekInvoices.filter(invoice => invoice.status == "completed").length}</span></p>
                    </div>
                  </div>
                  <div>
                    <Progress color="secondary-yellow" className={`progress-xs ${s.mutedYellow}`} value="100" />
                  </div>
                </div>
              </Widget>
            </Col>
            <Col xs={6} sm={6} xl={3}>
              <Widget className="widget-p-sm">
                <div className={s.smallWidget}>
                  <div className="d-flex mb-4">
                    <img className="py-1 mr-2 img-fluid" style={{height:50,paddingRight:5,paddingLeft:5}} src={wallclock} alt="..." />
                    <div className="d-flex flex-column">
                      <p className="headline-3">Unpaid</p>
                      <p className="body-2">
                        ${
                        calculateTotal(lastWeekInvoices, 'pending')
                      }<span className="body-3 muted">/ {lastWeekInvoices.filter(invoice => invoice.status === "pending").length}</span></p>
                    </div>
                  </div>
                  <div>
                    <Progress color="secondary-cyan" className={`progress-xs ${s.mutedTeal}`} value="100" />
                  </div>
                </div>
              </Widget>
            </Col>
            <Col xs={6} sm={6} xl={3}>
              <Widget className="widget-p-sm">
                <div className={s.smallWidget}>
                  <div className="d-flex mb-4">
                    <img className="py-1 mr-2 img-fluid" style={{height:50,paddingRight:5,paddingLeft:5}}  src={cancel} alt="..." />
                    <div className="d-flex flex-column">
                      <p className="headline-3">Cancelled</p>
                      <p className="body-2">
                        ${
                        calculateTotal(lastWeekInvoices, 'cancelled')
                      }<span className="body-3 muted">/ {lastWeekInvoices.filter(invoice => invoice.status === "cancelled").length}</span></p>
                    </div>
                  </div>
                  <div>
                    <Progress color="violet" className={`progress-xs ${s.mutedViolet}`} value="100" />
                  </div>
                </div>
              </Widget>
            </Col>
          </Row>}
        </Col>

      </Row>
    </div>
  )
}

export default Dashboard;
