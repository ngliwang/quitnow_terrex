import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    CardGroup,
    Navbar,
    NavbarBrand,
    Button,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import React, { useState } from 'react';
import Image from "next/image";
import { HOMEPAGE_URL, VIEW_COMMUNITY_URL } from "../../constants";
import jwt from 'jwt-decode'
import axios from "axios";
import { setAuthToken } from "../../functions/function";
import LogoWhite from "../../src/assets/images/logos/xtremelogowhite.svg";
import Calendar from "react-calendar";
import { format } from "date-fns";

import user1 from "../../src/assets/images/users/user1.jpg";


const Buddy = () => {

const userid = "";
console.log("view buddy");
if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    setAuthToken(token);
    console.log(token);
    if (token) {
    userid = jwt(localStorage.getItem("token"))["user_id"];
    console.log(userid);
    } else {
    window.location.href = "/login/";
    }
}
let VIEW_COMMUNITY_URL2 = VIEW_COMMUNITY_URL + userid
let HOMEPAGE_URL2 = HOMEPAGE_URL + userid;
let amt_saved = 0;
const [isOpen, setIsOpen] = React.useState(false);
const [isLoading, setLoading] = useState(true);
const [Name, setName] = useState("")
const [postz, setPostz] = useState([]);
const [noPlans, setNoPlans] = useState(false);
const [planz, setPlanz] = useState([]);
const [planToShow, setPlanToShow] = useState({});
const inputName = (x) => setName(x);
const Handletoggle = () => {
    setIsOpen(!isOpen);
  };

const [dropdownOpen, setDropdownOpen] = useState(false);
const toggle = () => setDropdownOpen((prevState) => !prevState);

function changePlanToShow (planid) {
    console.log("Inside change plan to show with planid: " + planid)
    console.log(planz.length)
    console.log(planz)
    if (planz.length > 0){
      console.log("Planz length greater than 0")
      for (let i = 0; i < planz.length; i ++){
        if (planz[i].id == planid){
          console.log("Planz: ");
          console.log(planz[i]);
          setPlanToShow(planz[i]);
          return;
        }
      }
    }
  }

if (isLoading){
    setLoading(false);
    axios.get(VIEW_COMMUNITY_URL2).then(res => {
    inputName(res.data[0])
    amt_saved = res.data['amt_saved'];
    for (let i = 0; i < res.data[1].length; i++){
        setPostz(current => [...current, res.data[1][i]]);
      }
    })
    axios.get(HOMEPAGE_URL2).then(res => {

        if (res.data.length > 0){
            console.log("Results")
            console.log(res.data)
            setPlanz(res.data)
            
            setNoPlans(false);
            console.log(res.data[0]);
            setPlanToShow(res.data[0]);
          }
    
          else{
            setNoPlans(true);
          }
        
    })
    return <div className="App">Loading...</div>;
}
else{
    let dropDownHeader = 'Loading';
    console.log("plan to show")
    console.log(planToShow)
    if (planToShow === null || (planToShow && Object.keys(planToShow).length === 0)){
      
      if (noPlans){
        return (
        <div className="App">
          <h3>
            The user does not have any plans
          </h3>
        
        </div>);
      }
      else{
        return <div className="App">Loading...</div>;
      }
    
    }
    else if (planToShow != undefined){

      dropDownHeader = planToShow.type;

    }

    else if (planToShow == undefined){
      return <div className="App">Loading...</div>;
      
    }
    return (
        
            <Row>
                <div>
                    <Navbar color="primary" dark expand="md">
                        <Image src={LogoWhite} alt="logo" />
                        <div className="d-flex p-5">
                            <Dropdown isOpen={dropdownOpen} toggle={toggle} direction='down'>
                                <DropdownToggle caret>{dropDownHeader}</DropdownToggle>
                                <DropdownMenu>

                                    {planz.map((plan) => (
                                        <DropdownItem onClick={() => changePlanToShow(plan.id)} key={plan.id}>
                                            {plan.type}
                                        </DropdownItem>
                                    ))},
                                    
                                
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </Navbar>
                </div>


                {/* user dp and name */}
                <Col xs="12" md="12" lg="4">
                    
                    <Card style={{height:"92%"}}>
                        <CardBody className="p-4">
                        <div className="text-center mt-4">
                            <Image src={user1} className="rounded-circle" width="150" height="150" alt="" />
                            <CardTitle tag="h4" className="mt-2 mb-0">
                                {Name}
                            </CardTitle>
                        </div>
                        </CardBody>


                    </Card>
                    
                </Col>


                {/* calendar */}
                <Col xs="12" md="12" lg="8">
                    <Card>
                        <Calendar className="p-4"
                            tileClassName={({ date, view }) => {
                            var testDate = format(date, "yyyy-MM-dd");
                            const today = format(new Date(), "yyyy-MM-dd");

                            if (testDate in planToShow['datearray']) {
                                return `react-calendar__tile--${planToShow['datearray'][testDate]}`;
                            }
                            else if (testDate < today) {
                                return `react-calendar__tile--${'red'}`;
                              }
                            }}
                        />
                    </Card>
                </Col>


                {/* user stats for plan */}
                <Col xs="12" md="12" lg="12">
                    
                    <Row sm="12">
                    <div className="p-2">
                    <CardGroup className="p-2">
                        <Card>
                            
                            <CardBody>
                            <CardTitle tag="h5">Money Saved</CardTitle>
                            <CardText>{planToShow.amt_saved}</CardText>
                            </CardBody>

                        </Card>

                        <Card>

                            <CardBody>
                            <CardTitle tag="h5">Streak</CardTitle>
                            <CardText>{planToShow.streak}</CardText>
                            </CardBody>

                        </Card>

                        <Card>

                            <CardBody>
                            <CardTitle tag="h5">Success Rate</CardTitle>
                            <CardText>{planToShow.success_rate}</CardText>
                            </CardBody>
                            
                        </Card>

                    </CardGroup>  
                    </div>
                    </Row>
                    
                </Col>

                <Col xs="12" md="12" lg="12">
                            
                </Col>


                {/* thoughts of the day */}
                <Col xs="12" md="12" lg="12">
                    <Card>
                        {postz.map((post, index) => (
                            <Row key={index}>
                                <Col sm="12">
                                <div className="p-2">
                                    <div className="sl-item border-bottom">
                                    <div className="sl-right">
                                        <Row className="ps-3">
                                        <Col>
                                            <span className="ms-2">{post.date_posted}</span>
                                            <h6 className="ps-2 p-1">
                                            {post.post}
                                            </h6>
                                        </Col>
                                        </Row>
                                    </div>
                                    </div>
                                </div>
                                </Col>
                            </Row>
                        ))}
                    </Card>
                </Col>


            </Row>
    );
};
};

export default Buddy