const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// GET all items
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ADD item
router.post('/items', async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body); // DEBUG

    const newItem = new Item(req.body);
    await newItem.save();

    res.json(newItem);
  } catch (err) {
    console.log("ERROR:", err.message);
    res.status(500).json({ msg: err.message });
  }
});

// DELETE
router.delete('/items/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;