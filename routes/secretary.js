const router = require('express').Router();
const moment = require('moment');

//Calls for model
let Account = require('../model/account');
let Appointment = require('../model/appointment');
let BreakTime = require('../model/breaktime');
let Doctor = require('../model/doctor');
let Procedure = require('../model/process');
let Schedule = require('../model/schedule');
let Unavailable = require('../model/unavailableDate');


router.route('/week_all').post(secretaryController.loadWeek);