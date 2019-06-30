import { utils, base64 } from "..";

test("test utils.uniqueId()", () => {
  expect(utils.uniqueId().length).toBe(36);
});

test("test utils.withAuthorizationPrefix()", () => {
  expect(utils.withAuthorizationPrefix("just-token")).toBe("token just-token");
  expect(utils.withAuthorizationPrefix("J.W.T")).toBe("bearer J.W.T");
  expect(utils.withAuthorizationPrefix(base64.encode("user:pass"))).toBe(
    `basic ${base64.encode("user:pass")}`
  );
  expect(utils.getPRCCitizenIDCheckCode("11010519491231002")).toBe("X");
});
