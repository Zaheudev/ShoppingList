const ShoppingList = require("../models/ShoppingList");
const User = require("../models/User");
const Notification = require("../models/Notification");

exports.inviteUser = async (req, res) => {
  console.log(req.body);
  try {
    const notification = await Notification.findById(req.body.notification)
    const invited = await User.findById(notification.userId.toString());
    const list = await ShoppingList.findById(notification.listId.toString());
    if (!invited) {
      return res.status(403).json({error: "user can't be found"});
    }
    if(!list){
      return res.status(403).json({error: "list can't be found"});
    }
    invited.invitedLists.push(notification.listId);
    list.members.push(invited);
    await list.save();
    await invited.save();
    await Notification.findByIdAndDelete(req.body.notification);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
