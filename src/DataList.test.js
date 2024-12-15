import api from "./utils/api";
import auth from "./utils/auth";

test("providing a data list", async () => {
    const data = await api.loginUser("test@test.com", "test");
    auth.setAuthToken(data.token, data.user.id);
    const dataList = await api.getShoppingLists();
    console.log(dataList);
});