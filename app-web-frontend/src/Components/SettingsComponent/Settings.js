import React, {Component} from 'react';
import './Settings.css';
import axios from "axios";
import {SERVER_ADDRESS} from "../../setupInfo"

const onButtonClick = async () => {
    try {
        await axios.post(`${SERVER_ADDRESS}/auth/endAllOtherSessions`, {});
    } catch (error) {
        console.error('Error during ending all other sessions', error);
    }
};

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        const {} = this.state;

        return (
            <div className="user-profile">
                <button className="logoutFromEverythingElse" onClick={onButtonClick}>Log out from all other sessions
                </button>
            </div>
        );
    }
}

export default UserProfile;