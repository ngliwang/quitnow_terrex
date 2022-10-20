import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Progress,
  Form,
  FormGroup,
  Label,
  Input,
  UncontrolledTooltip,
} from 'reactstrap';
import React, { useState } from 'react';
import Image from "next/image";
import { VIEW_COMMUNITY_URL } from "../../constants";
import jwt from 'jwt-decode'
import axios from "axios";
import { setAuthToken } from "../../functions/function";
import RemovePost from "../../src/components/RemovePost.js";

import user1 from "../../src/assets/images/users/user1.jpg";
import user2 from "../../src/assets/images/users/user2.jpg";
import user3 from "../../src/assets/images/users/user3.jpg";
import user4 from "../../src/assets/images/users/user4.jpg";
import user5 from "../../src/assets/images/users/user5.jpg";

const usersData = [
  {
    avatar: user2,
    name: "Yi Jie",
    thoughts: "Day 43. Today was a difficult day. Hope everyone is doing well!",
    time: "15 Oct 2022",
  },
  {
    avatar: user3,
    name: "Marcus",
    thoughts: "Having a rough go at it today. Really fighting back wanting a drink.",
    time: "15 Oct 2022",
  },
  {
    avatar: user4,
    name: "Zijian",
    thoughts: "Dinner tonight with good friends. I'm more content that i've been in a long time.",
    time: "14 Oct 2022",
  },
  {
    avatar: user5,
    name: "Han Hua",
    thoughts: "Hit 60 days. Life is getting better. Thankful and proud of myself!",
    time: "13 Oct 2022",
  },
];


const Community = () => {
  
  const userid = "";
  console.log("view community");
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
  const [poste, setPost] = useState("");
  const inputPost = (x) => setPost(x);

  const post = () => {
    axios.post(VIEW_COMMUNITY_URL2, {
      post : poste
    }).then(res => {
      console.log(res)
      if (res.data == "success"){
        window.location.href  = '/community/' + userid
      }
    })
  }

  const [activeTab, setActiveTab] = useState('1');
  const [isLoading, setLoading] = useState(true);
  const [Name, setName] = useState("")
  const [postz, setPostz] = useState([]);
  const inputName = (x) => setName(x);

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  if (isLoading){
    setLoading(false);
    axios.get(VIEW_COMMUNITY_URL2).then(res => {
      inputName(res.data[0])
      for (let i = 0; i < res.data[1].length; i++){
        setPostz(current => [...current, res.data[1][i]]);
      }
    })
    console.log(postz);
    return <div className="App">Loading...</div>;
  }
  else{
    return (
      <Row>
        <Col xs="12" md="12" lg="4">
          <Card>
            <CardBody className="p-4">
              <div className="text-center mt-4">
                <Image src={user1} className="rounded-circle" width="150" height="150" alt="" />
                <CardTitle tag="h4" className="mt-2 mb-0">
                  {Name}
                </CardTitle>
              </div>
            </CardBody>
            <CardBody className="border-top p-4">
              <FormGroup>
                <Label for="title1" tag="h5">
                  Thoughts of the day
                </Label>
                <Input
                  id="title1"
                  name="title1"
                  type="textarea"
                  rows="5"
                  onChange={(e) => inputPost(e.target.value)}
                />
              </FormGroup>
              <div className="border-bottom text-end">
                <Button onClick = {post} className="btn btn-info ms-auto" size="sm">
                  Add Post
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" md="12" lg="8">
          <Card>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={activeTab === '1' ? 'active bg-transparent' : 'cursor-pointer'}
                  onClick={() => {
                    toggle('1');
                  }}
                >
                  Community
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === '2' ? 'active bg-transparent' : 'cursor-pointer'}
                  onClick={() => {
                    toggle('2');
                  }}
                >
                  Posts
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                {usersData.map((userData, index) => (
                  <Row key={index}>
                    <Col sm="12">
                      <div className="p-3">
                        <div className="sl-item border-bottom">
                          <div className="sl-left float-start text-center rounded-circle text-white ms-n3 me-3">
                            <Image src={userData.avatar} width="40" height="40" alt="user" className="rounded-circle" />
                          </div>
                          <div className="sl-right ps-4">
                              <a href="/" className="text-dark fs-4 text-decoration-none fw-bold">
                                {userData.name}
                              </a>
                              <Row className="ps-4">
                                <span className="ms-2 text-muted">{userData.time}</span>
                                <h6 className="text-muted ps-4">
                                  {userData.thoughts}
                                </h6>
                              </Row>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                ))}
              </TabPane>
              <TabPane tabId="2">
                {postz.map((post, index) => (
                    <Row key={index}>
                      <Col sm="12">
                        <div className="p-2">
                          <div className="sl-item border-bottom">
                            <div className="sl-right">
                              <Row className="ps-4">
                                <Col>
                                  <RemovePost postid={post.id} userid={post.userid}/>
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
              </TabPane>
            </TabContent>
          </Card>
        </Col>
      </Row>
    );
  };
};

export default Community;