import api from "../../src/utils/api";
import auth from "../../src/utils/auth";

test("delete a record", async () => {
  try {
    //login to test user for mockup data
    const data = await api.loginUser("test@test.com", "test");
    // set the headers so it can pass the auth criteria
    const token = { headers: { Authorization: "Bearer " + data.token } };
    // let mockupList = {title: "test",tags:['test'], items:[{name:"test", date:"2026-12-25"}]}
    // const dataList = await api.createShoppingList(mockupList);
    const dataList = await api.getShoppingLists(token);
    const mockupListId = dataList[1]._id;
    const deleteList = await api.deleteShoppingList(mockupListId, token);
    console.log("list with id " + mockupListId + " deleted");
  } catch (err) {
    console.log(
      "error in deleting a record, mockup data might be inexistent or user doesn't exist"
    );
  }
});
