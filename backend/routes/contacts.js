const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// Get all contact form submissions
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new contact form submission
router.post("/", async (req, res) => {
  try {
    const { fullName, email, mobile, city } = req.body;

    if (!fullName || !email || !mobile || !city) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const contact = new Contact({
      fullName,
      email,
      mobile,
      city,
    });

    const savedContact = await contact.save();
    res.status(201).json({
      message: "Contact form submitted successfully",
      data: savedContact,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a contact
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
