const Item = require('../models/item');

const fetchItems = async (req, res) => {
  try {
    // Find the notes
    const items = await Item.find({ user: req.user._id });
    //Respond with them
    res.json({ items });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const fetchItem = async (req, res) => {
  try {
    // Get id off the url
    const itemId = req.params.id;
    // Find the note using that id
    const item = await Item.findOne({ _id: itemId, user: req.user._id });
    // Respond with a note
    res.json({ item });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const createItem = async (req, res) => {
  try {
    // Get the sent in data off requeest body
    const { name, location, amount } = req.body;

    // Create an item with it
    const item = await Item.create({
      name,
      location,
      amount,
      user: req.user._id,
    });

    // Respond with the new item
    res.json({ item });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const updateItem = async (req, res) => {
  try {
    // Get the id of the url
    const itemId = req.params.id;

    // Get the data of the req body
    const { name, location, amount } = req.body;

    // Find and update the record
    await Item.findOneAndUpdate(
      { _id: itemId, user: req.user._id },
      {
        name,
        location,
        amount,
      }
    );

    // Find updated item
    const item = await Item.findById(itemId);

    // Respond with it
    res.json({ item });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const deleteItem = async (req, res) => {
  try {
    // Get id of url
    const itemId = req.params.id;

    // Delete the record
    await Item.deleteOne({ _id: itemId, user: req.user._id });

    // Respond
    res.json({ success: 'Item deleted' });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

module.exports = {
  fetchItems,
  fetchItem,
  createItem,
  updateItem,
  deleteItem,
};
