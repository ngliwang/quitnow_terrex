import Head from "next/head";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardGroup,
  CardImg,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import React from "react";
import Calendar from "react-calendar";
import { format } from "date-fns";
import { any, string } from "prop-types";
import jwt from "jwt-decode";
import axios from "axios";
import { setAuthToken } from "../../functions/function";
import { HOMEPAGE_URL } from "../../constants";
import { useState } from "react";
import PlanDropDown from "../../src/components/planDropDown";


// const dateArray = {'2022-09-19':'red', '2022-09-20':'green', '2022-09-21':'yellow'};

export default function HomePage() {
  
  let userid = "";
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      userid = jwt(localStorage.getItem("token"))["user_id"];
      console.log(userid);
      setAuthToken(token);
      // console.log(axios.defaults.headers);
    } else {
        window.location.href = "/login/";
    }
  }

  const [isLoading, setLoading] = useState(true);
  const [noPlans, setNoPlans] = useState(false);
  const [planz, setPlanz] = useState([]);
  const [planToShow, setPlanToShow] = useState({});

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

  const HOMEPAGE_URL2 = HOMEPAGE_URL + userid;

  // react state to manage the number of days clean
  const [numberOfDaysClean, setNumberOfDaysClean] = React.useState(0);
  function handleClickDaysClean() {
    return setNumberOfDaysClean(numberOfDaysClean + 1);
  }
  // react state to manage the amount of money saved
  const [amountSaved, setAmountSaved] = React.useState(0);
  function handleAmountSaved() {
    return setAmountSaved(amountSaved + 15);
  }
  const [color, setColor] = React.useState("");


  

  // react state to manage days update on calendar
  const [date, setDate] = React.useState(new Date());

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);



  function inputColor(x, id, date) {

    setColor(x);
    console.log("here")
    console.log("color: " + x)
    console.log("id :" + id)
    axios.post(HOMEPAGE_URL2, {
      color: x,
      planid: id,
      date: date,
      }).then(
        res => {
          console.log(res);
          axios.get(HOMEPAGE_URL2).then(res => {
            // console.log(res)
      
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
        })

  }

  
  function clickedDay(value, event) {
    // convert date to string
    const date = format(value, "yyyy-MM-dd");

    // get today's date using date-fns
    const today = format(new Date(), "yyyy-MM-dd");

    if (date != today){
      return;
    }

    let dateArray = planToShow.datearray;

    console.log("Datearray: ");
    console.log(dateArray);

    // if date not in dateArray
    
    if (!(date in dateArray)) {
      // add date to dateArray
      dateArray[date] = "green";
    }
    // change color of date in DateArray
    else if (dateArray[date] === "transparent") {
      dateArray[date] = "green";

    } 
    else if (dateArray[date] === "green") {
      dateArray[date] = "transparent";

    } 
    
    // console.log(dateArray);
    // console.log(dateArray[date]);
    // console.log(color);
    console.log("Plan to show")
    console.log(planToShow)
    inputColor(dateArray[date], planToShow.id, date)
    

  }


  if (isLoading){

    setLoading(false);
    axios.get(HOMEPAGE_URL2).then(res => {
      // console.log(res)

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

  }


  else {

    let dropDownHeader = 'Loading'
    if (planToShow === null || (planToShow && Object.keys(planToShow).length === 0)){
      
      if (noPlans){
        return (
        <div className="App">
          <h2>
            Welcome to QuitNow
          </h2>
          
          <p>
            Create a plan to start
          </p>
        
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
      <div>
        <Head>
          <title>TERREX - QuitNow</title>
          <meta name="description" content="generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>


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


        <h3>Calender</h3>
        <Calendar

          onClickDay={(value, event) => {
            // self-define function to handle click event
            // and set the state of date
            clickedDay(value, event);
            setDate(value);
          }}


          onChange={setDate}
          onViewChange={setDate}

          // dateArray is a dictionary with date as key and color as value
          // dateArray = {'2022-09-19':'red', '2022-09-20':'green', '2022-09-21':'yellow'};
          // retrieve from database supposingly
          // changes class names of the date tile
          tileClassName={({ date, view }) => {
            // date will return every date visible on calendar and view will view type (eg. month)
            //  if selected date is in dateArray then return 'selected-date' class
            // convert javascript date object to string using date-fns

            var testDate = format(date, "yyyy-MM-dd");
            // console.log("TestDate");
            // console.log(testDate);
            // // if date is in dateArray
            // // render its class with color accordingly
            console.log("Plantoshow")
            console.log(planToShow)
            // console.log("Showing datearray")
            // console.log(planToShow.datearray)
            const today = format(new Date(), "yyyy-MM-dd");
            if (testDate in planToShow['datearray']) {
              
              return `react-calendar__tile--${planToShow['datearray'][testDate]}`; // your class name
            }
            else if (testDate < today && testDate >= planToShow.start_day) {
              return `react-calendar__tile--${'red'}`;
            }
            
          }}
        />

        {/* Here is the tracking components in the dashboard
                  1. Days Streak Tracking
                  2. Money Tracking
                  3. Success Rate Tracking */}
        <Row>
          <div className="p-2">
          <h3>Statistics Tracker</h3>
          </div>
          <CardGroup>
            <Card>
              <CardBody>
                <CardTitle tag="h5">Streak</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Keep the streak going!
                </CardSubtitle>
                <CardText>{planToShow.streak}</CardText>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <CardTitle tag="h5">Money Saved</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Be smart with your money!
                </CardSubtitle>
                <CardText>{planToShow.amt_saved}</CardText>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <CardTitle tag="h5">Success Rate</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  I will be successful!
                </CardSubtitle>
                <CardText>
                  {planToShow.success_rate}
                </CardText>
              </CardBody>
            </Card>
          </CardGroup>
        </Row>
      </div>
    );
  };
};
