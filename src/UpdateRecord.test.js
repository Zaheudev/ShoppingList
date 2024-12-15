import api from "./utils/api";
import auth from "./utils/auth";

test("update a record", async () => {
    // this tests adds a new item to the first shoppingList;
    const data = await api.loginUser("test@test.com", "test");
    auth.setAuthToken(data.token, data.user.id);
    let mockupItem = {name:"newItem", date:"2026-12-25"}
    const dataList = await api.getShoppingLists();
    const updateList = await api.addNewItems(dataList[0]._id, mockupItem);
    console.log(updateList);
});