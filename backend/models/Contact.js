const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      minlength: [2, "Name must be at least 2 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      match: [/^[0-9]{10,15}$/, "Please enter a valid mobile number"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Contact", contactSchema);
