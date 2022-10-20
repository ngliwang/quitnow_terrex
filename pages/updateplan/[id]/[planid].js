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
  import { useRouter } from 'next/router'
import axios from 'axios';
import { useState } from "react";
import { UPDATE_PLAN_URL } from "../../../constants";
import { setAuthToken } from '../../../functions/function';

  const Forms = () => {

    console.log("update plan")

    let userid = ""
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("token")
      setAuthToken(token);
      if (token){
          userid = jwt(localStorage.getItem("token"))["user_id"]
          console.log(userid)
      }
      else{
          window.location.href = '/login'
      }
    }

    const router = useRouter();
    const plan = router.query;
    console.log("Update plan: ")
    console.log(plan)

    let UPDATE_PLAN_URL2 = UPDATE_PLAN_URL + userid + '/' + plan.planid;

    const [type, setType] = useState(null);
    const [frequency, setFrequency] = useState(null);
    const [start_day, setStartDay] = useState(null);
    const [buddy, setBuddy] = useState(null);
    const [amtSpent, setAmtSpent] = useState(null)
    const [reason, setReason] = useState(null)
    const [commitPeriod, setCommitPeriod] = useState(null)
    const [priority, setPriority] = useState(null)
    const inputType = (x) => setType(x);
    const inputStartDay = (x) => setStartDay(x);
    const inputBuddy = (x) => setBuddy(x);
    const inputAmtSpent = (x) => setAmtSpent(x);
    const inputReason = (x) => setReason(x);
    const inputCommitPeriod = (x) => setCommitPeriod(x);

    const [isLoading, setLoading] = useState(true);

    const update = () => {
      axios.post(UPDATE_PLAN_URL2, {
        userid: userid,
        planid: plan.planid,
        addiction_type: type,
        how_often: frequency,
        start_day: start_day,
        buddy: buddy,
        amt_spent_weekly: amtSpent,
        reason_to_quit: reason,
        priority: priority,
        commit_duration: commitPeriod,
        }
      ).then(res => {
        if (res.data == "success"){
            window.location.href = '/viewplan/' + userid
        }
      }
      ).catch(err => console.log(err));
    }
    if (isLoading){
      setLoading(false);
      setType(plan.addiction_type);
      setFrequency(plan.how_often);
      setStartDay(plan.start_day);
      setBuddy(plan.buddy);
      setAmtSpent(plan.amt_spent_weekly);
      setReason(plan.reason_to_quit);
      setCommitPeriod(Math.round(parseInt(plan.commit_duration)/30));
      setPriority(plan.priority);
      return <div className="App">Loading...</div>;
    }
    else {
      return (
        <Row>
          <Col>
            {/* --------------------------------------------------------------------------------*/}
            {/* Card-1*/}
            {/* --------------------------------------------------------------------------------*/}
            <Card>
              <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                <i className="bi bi-bell me-2"> </i>
                Quitting Plan
              </CardTitle>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="textBox">Type of Addiction</Label>
                    <Input
                      id="textBox"
                      name="atextBox"
                      defaultValue={type}
                      type="textBox"
                      onChange={(e) => inputType(e.target.value)}
                    />
                  </FormGroup>
                  

                  <FormGroup>
                    <Label for="exampleSelect">Frequency</Label>
                    <Input id="exampleSelect" name="frequency" type="select" value={frequency} 
                    defaultValue = {frequency}
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
                      defaultValue={start_day}
                      placeholder="Enter starting date"
                      type="textBox"
                      onChange={(e) => inputStartDay(e.target.value)}
                    />
                  </FormGroup>


                  <FormGroup>
                    <Label for="textBox">Add buddy</Label>
                    <Input
                      id="textBox"
                      name="textBox"
                      defaultValue={buddy}
                      placeholder="Enter buddy email address"
                      type="textBox"
                      onChange={(e) => inputBuddy(e.target.value)}
                    />
                  </FormGroup>


                  <FormGroup>
                    <Label for="textBox">How much do you spent per week on the addiction?</Label>
                    <Input
                      id="textBox"
                      name="textBox"
                      defaultValue={amtSpent}
                      placeholder=""
                      type="textBox"
                      onChange={(e) => inputAmtSpent(e.target.value)}
                    />
                  </FormGroup>


                  <FormGroup>
                    <Label for="exampleText">Reason for quitting the addiction.</Label>
                    <Input 
                    id="exampleText" 
                    name="text" 
                    defaultValue={reason}
                    type="textBox" 
                    onChange={(e) => inputReason(e.target.value)}
                    />
                  </FormGroup>


                  <FormGroup>
                    <Label for="exampleSelect">Priority</Label>
                    <Input id="exampleSelect" name="select" type="select" defaultValue={priority}
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
                        defaultValue={commitPeriod}
                        onChange={(e) => inputCommitPeriod(e.target.value)}
                        >
                    </Input>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col lg="12">
          <Button onClick={update}>Update</Button>
          </Col>
        </Row>
      );
    };
  };
  
  export default Forms;