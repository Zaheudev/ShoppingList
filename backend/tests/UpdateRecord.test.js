import api from "../../src/utils/api";
import auth from "../../src/utils/auth";

test("update a record", async () => {
  try {
    // this tests adds a new item to the first shoppingList;
    //login to test user for mockup data
    const data = await api.loginUser("test@test.com", "test");
    // set the headers so it can pass the auth criteria
    const token = { headers: { Authorization: "Bearer " + data.token } };
    let mockupItem = { name: "newItem", date: "2026-12-25" };
    const dataList = await api.getShoppingLists(token);
    const updateList = await api.addNewItems(
      dataList[0]._id,
      mockupItem,
      token
    );
    console.log(updateList);
  } catch (err) {
    console.log(
      "error in updateing record, mockup data invalid or login data invalid"
    );
  }
});
