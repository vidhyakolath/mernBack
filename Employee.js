const mongoose=require("mongoose");
const EmployeeUserDetailsSchema=new mongoose.Schema(
    { first_name
        : {
              type: String,
             // required: true,
            },
            company_name: {
              type: String,
              //required: true,
            },
            email: {
              type: String,
              //required: true,
            },
        },{collection:"EmployeeUserInfo",});
mongoose.model("EmployeeUserInfo",EmployeeUserDetailsSchema)