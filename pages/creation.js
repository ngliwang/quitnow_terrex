import { Button, Form, FormGroup, Label, Input, Row, Col, Card, CardTitle } from "reactstrap";
import Link from 'next/link';
import { useState } from "react";
import axios from "axios";
import { CREATION_URL } from "../constants";
import { TOKEN_URL } from "../constants";
import { setAuthToken } from "../functions/function.js";
import jwt from 'jwt-decode';


export default function CreationPage() {
    
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const inputEmail = (x) => setEmail(x);
    const inputNumber = (x) => setNumber(x);
    const inputPassword = (x) => setPassword(x);
    const inputPassword2 = (x) => setPassword2(x);
    const inputName = (x) => setName(x);

    const send = () => {
        let userid = ""
        if (password.target.value == password2.target.value) {
            console.log("Sending data")
            let result;
            try{
                axios.post(CREATION_URL, {
                    email: email.target.value,
                    number: number.target.value,
                    password: password.target.value,
                    name: name.target.value,
                }).then(res => {
                    if (res.data == "success"){
                        const loginPayload = {
                        email: email.target.value,
                        password: password.target.value
                        }
                        axios.post(TOKEN_URL, loginPayload).then(response => {
                            console.log(response);
                            const token = response.data['access'];
                            const retoken = response.data['refresh'];
                            if (typeof window !== 'undefined') {
                                localStorage.setItem("token", token);
                                localStorage.setItem("retoken", retoken)
                                console.log(localStorage.getItem("token"))
                                console.log(localStorage.getItem("retoken"))
                                userid = jwt(localStorage.getItem("token"))['user_id']
                            }
                            setAuthToken(token);
                            
                            window.location.href = '/homepage/' + userid
                            }).catch(err => {
                                console.log("threre")
                                console.log(err)}
                                );
                    }
                }).catch(err => {
                    console.log(err);
                    alert('email already in use!');
                    return;
                })
            }
            catch (error){
                console.log("here")
                console.log(error)
                alert('email already in use!');
                return;
            }
        }
        else{
            console.log("Password not same as confirm password");
        }
    }
    return (
        <Row>
            <Col
            // sm="12"
            // md={{
            //     offset: 0,
            //     size: 13
            // }}
            >
                <Card>
                <CardTitle tag="h3" className="border-bottom p-3 mb-0">
                    Account Registration
                </CardTitle>
                <Form className="creation-form">
                    <Row>
                        <Col
                        sm="12"
                        md={{
                            offset: 1,
                            size: 10,
                        }}>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email" id="email" placeholder="e.g. johndoe@gmail.com" 
                                onChange={inputEmail} 
                                required
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="name" id="name" placeholder="John Doe"
                                onChange={inputName} 
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="phonenumber">Phone Number</Label>
                                <Input type="number" id="phonenumber" placeholder="e.g. (+65) 91927347" 
                                onChange={inputNumber} 
                                required
                                pattern="/\+65(6|8|9)\d{8}/g"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password1">Please enter your password of length 6-16</Label>
                                <Input type="password" id="password1" placeholder="Password must include at least a number and a special character" 
                                onChange={inputPassword} 
                                required
                                pattern="/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password2">Please confirm your password</Label>
                                <Input type="password" id="password2" placeholder="Password confirmation" 
                                onChange={inputPassword2} 
                                required
                                pattern="/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/"/>
                            </FormGroup>
                            <FormGroup>
                                <Input type="checkbox" required/> 
                                <Label check> I accept the <Link href="/">terms and conditions</Link> of use</Label>
                            </FormGroup>
                            <Button onClick={send}>
                                To register 
                            </Button>
                            <div>
                                Already have an account? <Link href="/login">Click Here!</Link>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Col>
    </Row>
    )
}