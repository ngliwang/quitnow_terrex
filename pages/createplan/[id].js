import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from 'reactstrap';
import jwt from 'jwt-decode';
import { useState } from "react";
import axios from "axios";
import { CREATE_PLAN_URL } from "../../constants";
import { setAuthToken } from '../../functions/function';
import { RETOKEN_URL } from '../../constants';

const Forms = () => {
  const userid = ""
  console.log("create plan")
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem("token")
    setAuthToken(token)
    console.log(token)
      if (token){
          userid = jwt(localStorage.getItem("token"))['user_id']
          console.log(userid)
      }
      else{
          window.location.href = '/login/s'
      }
    }
  
  const CREATE_PLAN_URL2 = CREATE_PLAN_URL + userid

  const [type, setType] = useState("");
  const [frequency, setFrequency] = useState("1-5");
  const [start_day, setStartDay] = useState("");
  const [buddy, setBuddy] = useState("");
  const [amtSpent, setAmtSpent] = useState("")
  const [reason, setReason] = useState("")
  const [commitPeriod, setCommitPeriod] = useState("")
  const [priority, setPriority] = useState("1")
  const inputType = (x) => setType(x);
  const inputStartDay = (x) => setStartDay(x);
  const inputBuddy = (x) => setBuddy(x);
  const inputAmtSpent = (x) => setAmtSpent(x);
  const inputReason = (x) => setReason(x);
  const inputCommitPeriod = (x) => setCommitPeriod(x);



  const CreatePlan = () => {
    console.log(axios.defaults.headers);
    axios.post(CREATE_PLAN_URL2, {
      addiction_type: type.target.value,
      how_often: frequency,
      start_day: start_day.target.value,
      buddy: buddy.target.value,
      amt_spent_weekly: amtSpent.target.value,
      reason_to_quit: reason.target.value,
      priority: priority,
      commit_duration: commitPeriod.target.value,
      streak: 0,
      amt_saved: 0,
      days_succeed: 0,
    },
    ).then(res => {
      console.log(res.data)
      if (res.data == "success"){
          window.location.href = '/viewplan/' + userid
      }
      else if (res.data == "fail"){
        alert('one of the field is empty!');
        return;
      }
    }).catch(err => {
      console.log(err)
      
    });
  }




  return (
    <Row>
      <Col>
        {/* --------------------------------------------------------------------------------*/}
        {/* Card-1*/}
        {/* --------------------------------------------------------------------------------*/}
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Quiting Plan
          </CardTitle>
          <CardBody>
            <Form>
              <FormGroup>
                <Label for="textBox">Type of Addiction</Label>
                <Input
                  id="textBox"
                  name="atextBox"
                  placeholder="Enter name of the addiction"
                  type="textBox"
                  onChange={inputType}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleSelect">Frequency</Label>
                <Input id="exampleSelect" name="frequency" type="select" value={frequency} 
                onChange={(e) => setFrequency(e.target.value)}>
                  <option value="1-5">1 - 5 times perday</option>
                  <option value="6-10">6 - 10 times perday</option>
                  <option value="11-15">11 - 15 times perday</option>
                  <option value="more than 15">more than 15 times perday</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="textBox">Start day</Label>
                <Input
                  id="textBox"
                  name="textBox"
                  placeholder="Enter starting date (YYYY-MM-DD)"
                  type="textBox"
                  onChange={inputStartDay}
                />
              </FormGroup>
              <FormGroup>
                <Label for="textBox">Add buddy</Label>
                <Input
                  id="textBox"
                  name="textBox"
                  placeholder="Enter buddy email address"
                  type="textBox"
                  onChange={inputBuddy}
                />
              </FormGroup>
              <FormGroup>
                <Label for="textBox">How much do you spent per week on the addiction?</Label>
                <Input
                  id="textBox"
                  name="textBox"
                  placeholder=""
                  type="textBox"
                  onChange={inputAmtSpent}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleText">Reason for quitting the addiction.</Label>
                <Input id="exampleText" name="text" type="textarea" onChange={inputReason} />
              </FormGroup>
              <FormGroup>
                <Label for="exampleSelect">Priority</Label>
                <Input id="exampleSelect" name="select" type="select" value={priority}
                onChange={(e) => setPriority(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="commitPeriod">How many months do you want to commit?</Label>
                <Input id="textBox" 
                    name="select" 
                    type="number" 
                    onChange={inputCommitPeriod}>
                </Input>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </Col>
      <Col lg="12">
      <Button onClick={CreatePlan}>Submit</Button>
      </Col>
    </Row>
  );
};

export default Forms;
