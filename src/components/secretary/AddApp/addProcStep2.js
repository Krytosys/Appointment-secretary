/**
 *  Description: Contains the first two steps in creating an Appointment.
 *  
 *  Includes: Date Picking, Time Picking, Next Button, Cancel Button
 * 
 * 
 */
import React, {Component, useState} from 'react';
import moment from 'moment';
import { Button, Header, Image, Modal, Form, Dropdown, Step } from 'semantic-ui-react'
import axios from 'axios'

class addProcStep2 extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            procedure:'',
            procedures:[],
            doctors:[],
            doctor:''
        }
    }

    componentDidMount(){
        axios.get('http://localhost:8080/secretary/getData')
            .then(response => {
                if(response.data.length > 0){
                    this.setState({
                        procedures: [
                            ...response.data.map(procedure =>{
                                return{
                                    key: procedure._id,
                                    text: procedure.processname,
                                    value: procedure.processname
                                }
                            })
                        ],
                        // procedures: response.data.map(procedure => procedure.processname),
                        procedure: response.data[0].processname,
                        doctors: [
                            response.data.map(doctor =>{
                                return{
                                    key: doctor._id,
                                    text: doctor.firstname,
                                    value: doctor.firstname
                                }
                            })
                        ],
                        doctor: response.date[0].firstname

                    })
                }
            })
    }
    
    render(){
        const {values, handleChange} = this.props
        return(
            <Form>
                <Form.Input required
                    placeholder='First Name'
                    onChange = {handleChange('firstname')}
                    label="First Name"
                    value={values.firstname}
                    name="firstname"
                />
                <Form.Input required
                    placeholder='Last Name'
                    onChange = {handleChange('lastname')}
                    label="Last Name"
                    name="lastname"
                />
                <Dropdown
                    value={this.state.procedure}
                    onChange={handleChange('process')}
                    options={this.state.procedures}
                    selection fluid multiple>
                        {/* {
                        this.state.procedures.map(function(procedure){
                            return <option
                                        key={procedure}
                                        value={procedure}>{
                                            procedure}
                                    </option>;
                        })
                        } */}

                </Dropdown>
                <Dropdown
                    value={this.state.doctor}
                    onChange={handleChange('doctor')}
                    options={this.state.doctors}
                    selection fluid multiple>
                        {/* {
                        this.state.procedures.map(function(procedure){
                            return <option
                                        key={procedure}
                                        value={procedure}>{
                                            procedure}
                                    </option>;
                        })
                        } */}

                </Dropdown>

                
            </Form>
        )
    }
}
export default addProcStep2