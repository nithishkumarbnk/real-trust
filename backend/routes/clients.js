const express = require("express");
const router = express.Router();
const Client = require("../models/Client");
const { uploadClient, cloudinary } = require("../middleware/upload");

// Get all clients
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new client
router.post("/", uploadClient.single("image"), async (req, res) => {
  try {
    const { name, description, designation } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const client = new Client({
      name,
      description,
      designation,
      image: req.file.path,
      imagePublicId: req.file.filename,
    });

    const savedClient = await client.save();
    res.status(201).json(savedClient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a client
router.delete("/:id", async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    if (client.imagePublicId) {
      await cloudinary.uploader.destroy(client.imagePublicId);
    }

    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
