import api from "../../src/utils/api";
import auth from "../../src/utils/auth";

test("providing a data list", async () => {
  try {
    //login to test user for mockup data
    const data = await api.loginUser("test@test.com", "test");
    // set the headers so it can pass the auth criteria
    const token = { headers: { Authorization: "Bearer " + data.token } };
    const dataList = await api.getShoppingLists(token);
    console.log(dataList);
  } catch (err) {
    console.log("Error geting data from server, incorrect authorization token or login data");
  }
});
