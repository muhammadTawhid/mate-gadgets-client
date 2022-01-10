import React, {useContext} from 'react';
import "./SuccessMessage.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { MyContext } from "../Admin/Admin";

const SuccessMessage = (props) => {
    const {setSuccessMessage, selectedComponent} = useContext(MyContext)
    console.log(selectedComponent, "selected component sucess message");
    return (
        <div>
            {selectedComponent.editProduct && <Alert severity="success" onClose={() => setSuccessMessage(false)}>
                <AlertTitle>Update Success</AlertTitle>
                Product is updated successfully <strong>check it out!</strong>
            </Alert>}
            {selectedComponent.addProduct && <div className="success-div">
            <div>
                <FontAwesomeIcon className="icon" icon={faCheckCircle} />
                <h2>Product Added Successfully</h2>
            </div>
            <button onClick={() => setSuccessMessage(false)}>ok</button>
        </div>}
        </div>
    );
};

export default SuccessMessage;