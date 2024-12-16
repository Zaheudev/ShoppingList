import api from "../../src/utils/api";
import auth from "../../src/utils/auth";

test("create a record", async () => {
  try {
    //login to test user for mockup data
    const data = await api.loginUser("test@test.com", "test");
    // set the headers so it can pass the auth criteria
    const token = { headers: { Authorization: "Bearer " + data.token } };
    let mockupList = {
      title: "test",
      tags: ["test"],
      items: [{ name: "test", date: "2026-12-25" }],
    };
    const dataList = await api.createShoppingList(mockupList, token);
    console.log(dataList);
  } catch (err) {
    console.log("eror in creating a record, incorrect mockup data");
  }
});
