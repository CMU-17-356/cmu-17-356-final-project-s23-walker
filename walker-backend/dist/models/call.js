import { Schema, model } from 'mongoose';
var MAX_MONTH = 3; //number of months in advance users can set a walker call
var today = new Date();
var todayYear = today.getFullYear();
var todayMonth = today.getMonth() + 1;
var todayDay = today.getDate();
var maxDate = new Date(today);
maxDate.setMonth(maxDate.getMonth() + MAX_MONTH);
var maxYear = today.getFullYear();
var maxMonth = today.getMonth() + 1;
var maxDay = today.getDate();
var schema = new Schema({
    activity: {
        type: String,
        required: true,
        enum: ['Walk', 'Petsitting']
    },
    details: {
        type: String
    },
    date: {
        type: Date,
        default: function () { return new Date(Date.now()); },
        min: ["".concat(todayYear, "-").concat(todayMonth, "-").concat(todayDay), 'Date is in the past'],
        max: ["".concat(maxYear, "-").concat(maxMonth, "-").concat(maxDay), "Date is more than ".concat(MAX_MONTH, " months in the future")]
    }
    // requester: {
    //   type: User.schema
    // },
    // coop: {
    //   type: CoOp.schema
    // }
});
var Call = model('Call', schema);
export { Call };
