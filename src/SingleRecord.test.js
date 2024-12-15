import api from "./utils/api";
import auth from "./utils/auth";

test("return a single record", async () => {
    const data = await api.loginUser("test@test.com", "test");
    auth.setAuthToken(data.token, data.user.id);
    const mockupListId = "67536b7e8ac6ffc89398423a";
    const dataList = await api.getShoppingList(mockupListId);
    console.log(dataList);
});