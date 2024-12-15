import api from "./utils/api";
import auth from "./utils/auth";

test("create a record", async () => {
    const data = await api.loginUser("test@test.com", "test");
    auth.setAuthToken(data.token, data.user.id);
    let mockupList = {title: "test",tags:['test'], items:[{name:"test", date:"2026-12-25"}]}
    const dataList = await api.createShoppingList(mockupList);
    console.log(dataList);
});