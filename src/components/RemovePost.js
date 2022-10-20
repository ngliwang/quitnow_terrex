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
  UncontrolledTooltip,
} from 'reactstrap';
import PropTypes from 'prop-types';
import axios from "axios";
import { VIEW_COMMUNITY_URL } from '../../constants';


function RemovePost(props) {
    const [modal, setModal] = useState(false);
    console.log(props.userid);
    let VIEW_COMMUNITY_URL2 = VIEW_COMMUNITY_URL + props.userid;
    const toggle = () => setModal(!modal);
    const ConfirmRemove = () => {
        axios.delete(VIEW_COMMUNITY_URL2, {data : {postid : props.postid}}).then(res => {
            console.log(res.data)
            if (res.data == "success"){
                window.location.href = "/community/" + props.userid;
            }
        })
        console.log("Removing post " + props.postid);
    }
    return (
        <div>
            <UncontrolledTooltip placement="top" target="delete">
                Delete
            </UncontrolledTooltip>
            <i onClick={toggle} className="bi bi-trash ms-auto float-end" id="delete" />
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

RemovePost.propTypes = {
  className: PropTypes.string,
};

export default RemovePost;