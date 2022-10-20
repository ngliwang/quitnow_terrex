import { Button, Form, FormGroup, Label, Input, Row, Col, Nav, NavItem, Card, CardTitle } from "reactstrap";
import Link from 'next/link';
import { useState } from "react";
import axios from "axios";
import { TOKEN_URL } from "../constants";
import { setAuthToken } from "../functions/function.js";
import { requestToBodyStream } from "next/dist/server/body-streams";
import jwt from 'jwt-decode'

export default function LoginPage() {
    console.log(axios.defaults.headers);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const inputEmail = (x) => setEmail(x);
    const inputPassword = (x) => setPassword(x);
    let userid = "";
    const login =() => {
        const loginPayload = null;
        try {
            loginPayload = {
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
            console.log(axios.defaults.headers);
            window.location.href = '/homepage/' + userid
            }).catch(err => console.log(err)); // DO EMPTY FIELDS AND SHOW WRONG PASSWORD/EMAIL HERE
        }
        catch (error) {
            console.log(error);
            alert('wrong email/password');
            return;
        }
    }

//get JsonResponse if user != None means password match -> homepage
//if user == None means password dont match -> throw error clear input fields

    return (
        <Row>
            <Col
            // sm="12"
            // md={{
            //     offset: 1,
            //     size: 10
            // }}
            >
                <Card>
                    <CardTitle tag="h3" className="border-bottom p-3 mb-0">
                        QuitNow - Your Quitting Buddy
                    </CardTitle>
                    <Form className="login-form">
                        <Row>
                            <Col
                            sm="12"
                            md={{
                            offset: 1,
                            size: 10,
                            }}>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input type="email" id="email" placeholder="johndoe@gmail.com" 
                                    onChange={inputEmail}
                                    required
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input type="password" id="password" placeholder="********" 
                                    onChange={inputPassword}
                                    required
                                    pattern="/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/"/>
                                </FormGroup>
                                <Link href="/forgetPW">Forgot your password? </Link>
                                <div>
                                    <Button onClick={login}>
                                        Log In
                                    </Button>
                                </div>
                                <div>
                                    Don&apos;t have an account? <Link href="/creation">Create one here!</Link>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
}
