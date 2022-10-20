import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup,
} from 'reactstrap';
import PropTypes from 'prop-types';
import axios from "axios";
import { VIEW_PLAN_URL } from '../../constants';


function RemovePlan(props) {
    const [modal, setModal] = useState(false);
    console.log(props.userid);
    let VIEW_PLAN_URL2 = VIEW_PLAN_URL + props.userid;
    const toggle = () => setModal(!modal);
    // const ConfirmRemove = () => {
    //     axios.delete(VIEW_PLAN_URL2, {data : {planid : props.planid}}).then(res => {
    //         console.log(res.data)
    //         if (res.data == "success"){
    //             window.location.href = "/viewplan/" + props.userid;
    //         }
    //     })
    //     console.log("Removing plan " + props.planid);
    // }
    const ConfirmRemove = () => {
        axios.delete(VIEW_PLAN_URL2, {data : {planid : props.pk}}).then(res => {
            console.log(res.data)
            if (res.data == "success"){
                window.location.href = "/viewplan/" + props.userid;
            }
        })
        console.log("Removing plan " + props.planid);
    }
    return (
        <div>
        
            <Button color="secondary" onClick={toggle} style={{float: 'right'}}>
                Remove
            </Button>
            <Modal
                isOpen={modal}
                toggle={toggle}
            >
            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
            <ModalBody>
                Confirm Delete?
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={ConfirmRemove}>
                Confirm
            </Button>{' '}
            <Button color="secondary" onClick={toggle}>
                Cancel
            </Button>
            </ModalFooter>
        </Modal>
        </div>
    );
}

RemovePlan.propTypes = {
  className: PropTypes.string,
};

export default RemovePlan;