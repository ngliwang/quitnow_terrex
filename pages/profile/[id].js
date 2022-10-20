import { Badge, Button, Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import Link from "next/link"
import jwt from 'jwt-decode';
import axios from "axios";
import { VIEW_PROFILE_URL } from "../../constants";
import { setAuthToken } from "../../functions/function.js";
import { useState } from "react";

const Badges = ({data}) => {
  let userid = "";
  console.log("profile")


  // Get user token for authentication
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem("token")
        if (token){
            userid = jwt(localStorage.getItem("token"))['user_id']
            setAuthToken(token);
            console.log(userid)
        }
        else{
            window.location.href = '/login/'
        }
  }



  let VIEW_PROFILE_URL2 = VIEW_PROFILE_URL + userid;

  const [isLoading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const inputName = (x) => setName(x);
  const inputEmail = (x) => setEmail(x);
  const inputNumber = (x) => setNumber(x);

  axios.get(VIEW_PROFILE_URL2).then(res => {
    inputName(res.data['name']);
    inputEmail(res.data['email']);
    inputNumber(res.data['number']);
    setLoading(false);
  });
  console.log(name)
  if (isLoading){
    return <div className="App">Loading...</div>;
  }
  else {
    return (
      <div>
        {/* --------------------------------------------------------------------------------*/}
        {/* Row*/}
        {/* --------------------------------------------------------------------------------*/}
        <Row>
          <Col xs="12" md="12" sm="12">
            {/* --------------------------------------------------------------------------------*/}
            {/* Card-1*/}
            {/* --------------------------------------------------------------------------------*/}
            <Card>
              <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                Profile
              </CardTitle>
              <CardBody className="">
                <br/>
                <div style={{display: "flex",justifyContent: "center",}}><a href={"/editprofile/" + userid}><Button>Edit Profile</Button></a></div>
                <br/>
                
                  <Row className="mt-3">
                  <Col sm={{offset: 4,size: 2,}}>
                      <div style={{textAlign : "right"}}>Name :</div>
                  </Col>
                  <Col sm={{offset: 0,size: 2,}}>
                      <div>{name}</div>
                  </Col>
                  </Row>
                  
                  <Row className="mt-3">
                  <Col sm={{offset: 4,size: 2,}}>
                      <div style={{textAlign : "right"}} >Email Address :</div>
                  </Col>
                  <Col sm={{offset: 0,size: 2,}}>
                      <div >{email}</div>
                  </Col>
                  </Row>

                  <Row className="mt-3">
                  <Col sm={{offset: 4,size: 2,}}>
                      <div style={{textAlign : "right"}} >Number :</div>
                  </Col>
                  <Col sm={{offset: 0,size: 2,}}>
                      <div >{number}</div>
                  </Col>
                  </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* --------------------------------------------------------------------------------*/}
        {/* Row*/}
        {/* --------------------------------------------------------------------------------*/}
      </div>
    );
  }
};

export default Badges;
