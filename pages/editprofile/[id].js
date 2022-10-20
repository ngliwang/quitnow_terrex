import {
  Badge,
  Button,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Input,
} from "reactstrap";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { EDITPROFILE_URL } from "../../constants";
import jwt from "jwt-decode";

const EditProfile = () => {
  let userid = "";
  console.log("edit profile");
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      userid = jwt(localStorage.getItem("token"))["user_id"];
      console.log(userid);
    } else {
      window.location.href = "/login";
    }
  }

  const [vname, vsetName] = useState("");
  const [vnumber, vsetNumber] = useState("");
  const [vemail, vsetEmail] = useState("");
  const vinputName = (x) => vsetName(x);
  const vinputNumber = (x) => vsetNumber(x);
  const vinputEmail = (x) => vsetEmail(x);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const inputName = (x) => setName(x);
  const inputNumber = (x) => setNumber(x);
  const inputEmail = (x) => setEmail(x);

  const [isLoading, setLoading] = useState(true);
  let EDITPROFILE_URL2 = EDITPROFILE_URL + userid;
  axios.get(EDITPROFILE_URL2).then((res) => {
    vinputName(res.data["name"]);
    vinputEmail(res.data["email"]);
    vinputNumber(res.data["number"]);
    setLoading(false);
  });

  const update = (name, number, email) => {
    console.log(name);
    console.log(number);
    console.log(email);
    axios
      .post(EDITPROFILE_URL2, {
        name: name,
        number: number,
        email: email,
      })
      .then((res) => {
        console.log(res);
        if (res.data == "success") {
          window.location.href = "/profile/" + userid;
        }
      });
  };
  if (isLoading) {
    return <div className="App">Loading...</div>;
  } else {
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
                Edit Profile
              </CardTitle>
              <CardBody className="">
                
                <Row className="mt-3">
                  <Col sm={{ offset: 4, size: 2 }}>
                    <div style={{ textAlign: "right" }}>Name</div>
                  </Col>
                  <Col sm={{ offset: 0, size: 2 }}>
                    <Input
                      id="name"
                      name="name"
                      defaultValue={vname}
                      type="text"
                      onChange={(e) => inputName(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col sm={{ offset: 4, size: 2 }}>
                    <div style={{ textAlign: "right" }}>Email Address</div>
                  </Col>
                  <Col sm={{ offset: 0, size: 2 }}>
                    <Input
                      id="acd"
                      name="acd"
                      defaultValue={vemail}
                      type="text"
                      onChange={(e) => inputEmail(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col sm={{ offset: 4, size: 2 }}>
                    <div style={{ textAlign: "right" }}>Number</div>
                  </Col>
                  <Col sm={{ offset: 0, size: 2 }}>
                    <Input
                      id="num"
                      name="num"
                      defaultValue={vnumber}
                      type="text"
                      onChange={(e) => inputNumber(e.target.value)}
                    />
                  </Col>
                </Row>
                <br />
                <br />
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button onClick={ () => update(name, number, email)}>Update</Button>
                </div>
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

export default EditProfile;
