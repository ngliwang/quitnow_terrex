import {
  Row,
  Col,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter
} from "reactstrap";
import Image from "next/image";
import Link from "next/link";
import bg1 from "../../src/assets/images/bg/bg1.jpg";
import axios from "axios";
import jwt from "jwt-decode";
import { setAuthToken } from "../../functions/function.js";
import { VIEW_PLAN_URL } from "../../constants";
import { useState } from "react";
import RemovePlan from "../../src/components/RemovePlan.js";

const Plans = () => {


  const userid = "";

  console.log("view plan");



  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    setAuthToken(token);
    // console.log(token);
    if (token) {
      userid = jwt(localStorage.getItem("token"))["user_id"];
      console.log(userid);
    } else {
      window.location.href = "/login/";
    }
  }



  let VIEW_PLAN_URL2 = VIEW_PLAN_URL + userid;

  const [isLoading, setLoading] = useState(true);
  const [planz, setPlanz] = useState([]);
  
  if (isLoading){
    setLoading(false);
    axios.get(VIEW_PLAN_URL2).then(res => {
      console.log("get method done")
      console.log(res);
      for (let i = 0; i < res.data.length; i++) {
        setPlanz(current => [...current, res['data'][i]]);
      }
    });
    console.log("planz")
    console.log(planz)
    console.log("Loading")
    return <div className="App">Loading...</div>;
  }


  else {
    return (
      <div>
        <h3 className="mb-3">My Plans</h3>
        <Row>
          {planz.map((plan) => (
            <Col sm="6" lg="6" xl="3" key={plan["userid"]}>
              <Card>
                <Image alt="Card image cap" src={bg1} />
                <CardBody className="p-4">
                  <CardTitle tag="h5">{plan["id"]}</CardTitle>
                  <CardSubtitle>{plan.addiction_type}</CardSubtitle>
                  <CardText className="mt-3">{plan.email}</CardText>

                  {/* <Link 
                    href={{
                      pathname: "/updateplan/" + userid +'/' + plan.planid,
                      query: plan,
                    }}>
                    <Button color="secondary" style={{float: 'left'}}>Update</Button>
                  </Link> */}

                  <Link 
                    href={{
                      pathname: "/updateplan/" + userid +'/' + plan.pk,
                      query: plan,
                    }}>
                    <Button color="secondary" style={{float: 'left'}}>Update</Button>
                  </Link>

                  <RemovePlan pk={plan.pk} userid={plan.userid}/>

                  
                  

                  {/* <Link 
                    href={{
                      pathname: "/updateplan/" + userid +'/' + plan.planid,
                      query: plan,
                    }}>
                    <Button color="secondary">Remove</Button>
                  </Link> */}

                  
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
        <a href={"/createplan/" + userid}>
          <Button className="btn" color="primary" size="lg" block>
            Create new plan
          </Button>
        </a>
      </div>
    );
  };
};

export default Plans;
