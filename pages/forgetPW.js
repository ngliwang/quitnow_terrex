import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import Link from 'next/link';
import { useState } from "react";
import axios from "axios";
import { LOGIN_URL } from "../constants";

export default function forgetPWPage(){

    return (
        <Form>
            <Row>
                <Col sm="12"
                md={{
                    offset: 2,
                    size: 8
                }}>
                    <h1>QuitNow</h1>
                    <h2>Forgot your password?</h2>
                </Col>
            </Row>
            <Row>
                <Col sm="12"
                md={{
                    offset: 2,
                    size: 8
                }}>
                    <FormGroup>
                        <Label for="email">Please enter your email</Label>
                        <Input type="email" id="email" placeholder="johndoe@gmail.com" />
                    </FormGroup>
                    <Button>
                        <Link href="/">Submit</Link>
                    </Button>

                </Col>
            </Row>
        </Form>
    )
}