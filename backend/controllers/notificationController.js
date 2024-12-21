const Notification = require('../models/Notification');
const ShoppingList = require('../models/ShoppingList');
const User = require('../models/User');

exports.getNotifications = async (req, res) => {
  console.log("get notifications called");
  try {
    const notifications = await Notification.find({ userId: req.user.id, read: false });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createNotifcation = async (req, res) => {
  try {
    const { email } = req.body;
    const list = await ShoppingList.findById(req.params.id);
    const user = await User.findOne({email});
    if(!list){
      res.status(500).json({message:"ERROR: Shopping List id doesn't match any"});
    }
    if(!user){
      res.status(500).json({message:`ERROR: User with email ${email} doesn't exist`});
    }

    const notification = new Notification({
      userId: user._id,
      listId: req.params.id,
      message: `You've got an invitation to join the Shopping list with name: ${list.title} from the owner`,
    });
    await notification.save();
  }catch(error){
    res.status(500).json({message:'Server error'});
    console.log(error);
  }
};

exports.markAsRead = async (req, res) => {
  const { notificationId } = req.params;
  try {
    const notification = await Notification.findById(notificationId);
    if (!notification) return res.status(404).json({ message: 'Notification not found' });

    notification.read = true;
    await notification.save();

    res.status(200).json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteNotification = async (req, res) => {
  const { notificationId } = req.params;
  try {
    await Notification.findByIdAndDelete(notificationId);
  }catch(err) {
    res.status(500).json({message: err.message})
  }
}