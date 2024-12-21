const ShoppingList = require("../models/ShoppingList");
const User = require("../models/User");
const Notification = require("../models/Notification");

// Get all shopping lists
exports.getShoppingLists = async (req, res) => {
  try {
    // console.log(req.user);
    const { archived } = req.query;
    const filter = {
      $or: [{ ownerId: req.user.id }, { members: req.user.id }],
    };
    if (archived !== undefined) filter.archived = archived === "true";

    const lists = await ShoppingList.find(filter);
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific shopping list
exports.getShoppingList = async (req, res) => {
  try {
    const { archived } = req.query;
    const filter = {
      $or: [{ _id: req.url.replace("/", "") }],
    };
    if (archived !== undefined) filter.archived = archived === "true";

    const lists = await ShoppingList.find(filter);
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new shopping list
exports.createShoppingList = async (req, res) => {
  // console.log(req.body);
  try {
    const { title, members, items, tags } = req.body;
    const user = await User.findById(req.user.id);

    const newList = new ShoppingList({
      title,
      ownerId: req.user.id,
      items,
      tags,
    });

    user.createdLists.push(newList);
    await user.save();
    await newList.save();
    members.forEach(async (email) => {
      //sending invites to list here
      const invited = await User.findOne({ email });
      if (invited) {
        const notification = new Notification({
          userId: invited,
          listId: newList._id,
          message: `You've got an invitation to join the Shopping list with name: ${newList.title} from the owner`,
        });
        await notification.save();
      }
    });
    res.status(201).json(newList);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

// Delete a shopping list
exports.deleteShoppingList = async (req, res) => {
  try {
    await ShoppingList.findByIdAndDelete(req.params.id);
    const user = await User.findById(req.user.id);
    for(let i=0; i<user.createdLists.length; i++){
      if(user.createdLists[i]._id.toString() === req.params.id){
        user.createdLists.splice(i,1);
      }
    }
    await user.save();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a shopping list
exports.updateShoppingList = async (req, res) => {
  try {
    const { archived, status } = req.body;
    const list = await ShoppingList.findById(req.params.id);

    if (!list)
      return res.status(404).json({ error: "Shopping list not found" });

    if (archived !== undefined) list.archived = archived;
    if (status !== undefined) list.status = status;

    await list.save();
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
