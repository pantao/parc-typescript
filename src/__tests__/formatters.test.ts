import * as fromatters from "../formatters";

test("test formatters.storageSize", () => {
  expect(fromatters.storageSize(1024)).toBe("1KB");
  expect(fromatters.storageSize(1025)).toBe("1.00KB");
  expect(fromatters.storageSize(2048)).toBe("2KB");
  expect(fromatters.storageSize(2049)).toBe("2.00KB");
  expect(fromatters.storageSize(2049, false)).toBe("2KB,1B");
  expect(fromatters.storageSize(2049, false, " ", 1024)).toBe("2KB 1B");
  expect(fromatters.storageSize(20490, false, " ", 1024)).toBe("20KB 10B");
  expect(fromatters.storageSize(2049000000, true, " ", 1024)).toBe("1.91GB");
  expect(fromatters.storageSize(1000, false, " ", 1000)).toBe("1KB");
  expect(fromatters.storageSize(1000000, false, " ", 1000)).toBe("1MB");
  expect(fromatters.storageSize(1000000000, false, " ", 1000)).toBe("1GB");
  expect(fromatters.storageSize(1000000000000, false, " ", 1000)).toBe("1TB");
  expect(fromatters.storageSize(1000000000000000, false, " ", 1000)).toBe(
    "1PB"
  );
  expect(fromatters.storageSize(1000000000000001, false, " ", 1000)).toBe(
    "1PB 1B"
  );
  expect(fromatters.storageSize(1000000000000001, true, " ", 1000)).toBe(
    "1.00PB"
  );
});
