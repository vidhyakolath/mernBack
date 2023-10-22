const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    first_name
: {
      type: String,
      required: true,
    },
    company_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("Model", EmployeeSchema);
