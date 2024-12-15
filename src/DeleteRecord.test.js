import api from "./utils/api";
import auth from "./utils/auth";

test("delete a record", async () => {
    const data = await api.loginUser("test@test.com", "test");
    auth.setAuthToken(data.token, data.user.id);
    // let mockupList = {title: "test",tags:['test'], items:[{name:"test", date:"2026-12-25"}]}
    // const dataList = await api.createShoppingList(mockupList);
    const dataList = await api.getShoppingLists();
    const mockupListId = dataList[1]._id;
    const deleteList = await api.deleteShoppingList(mockupListId);
    console.log("list with id " + mockupListId + " deleted");
});