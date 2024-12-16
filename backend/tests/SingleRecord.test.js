import api from "../../src/utils/api";
import auth from "../../src/utils/auth";

test("return a single record", async () => {
  //login to test user for mockup data
  try {
    const data = await api.loginUser("test@test.com", "test");
    // set the headers so it can pass the auth criteria
    const token = { headers: { Authorization: "Bearer " + data.token } };
    const mockupListId = "67536b7e8ac6ffc89398423a";
    const dataList = await api.getShoppingList(mockupListId, token);
    console.log(dataList);
  } catch (err) {
    console.log(
      "error in returning a single record, incorrect mockup data or login data invalid"
    );
  }
});
