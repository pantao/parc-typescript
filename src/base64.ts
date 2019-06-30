class InvalidCharacterError extends Error {
  name: "InvalidCharacterError";
  message: string;
  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = "InvalidCharacterError";
  }
}

const throwError = (message: string): InvalidCharacterError => {
  throw new InvalidCharacterError(message);
};

const TABLE =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
// http://whatwg.org/html/common-microsyntaxes.html#space-character
const REGEX_SPACE_CHARACTERS = /<%= spaceCharacters %>/g;

// `decode` is designed to be fully compatible with `atob` as described in the
// HTML Standard. http://whatwg.org/html/webappapis.html#dom-windowbase64-atob
// The optimized base64-decoding algorithm used is based on @atk’s excellent
// implementation. https://gist.github.com/atk/1020396
export const decode = (input: string): string => {
  input = String(input).replace(REGEX_SPACE_CHARACTERS, "");
  let length = input.length;
  if (length % 4 == 0) {
    input = input.replace(/==?$/, "");
    length = input.length;
  }
  if (
    length % 4 == 1 ||
    // http://whatwg.org/C#alphanumeric-ascii-characters
    /[^+a-zA-Z0-9/]/.test(input)
  ) {
    throwError(
      "Invalid character: the string to be decoded is not correctly encoded."
    );
  }
  let bitCounter = 0;
  let bitStorage = 0;
  let buffer;
  let output = "";
  let position = -1;
  while (++position < length) {
    buffer = TABLE.indexOf(input.charAt(position));
    bitStorage = bitCounter % 4 ? bitStorage * 64 + buffer : buffer;
    // Unless this is the first of a group of 4 characters…
    if (bitCounter++ % 4) {
      // …convert the first 8 bits to a single ASCII character.
      output += String.fromCharCode(
        0xff & (bitStorage >> ((-2 * bitCounter) & 6))
      );
    }
  }
  return output;
};

// `encode` is designed to be fully compatible with `btoa` as described in the
// HTML Standard: http://whatwg.org/html/webappapis.html#dom-windowbase64-btoa
export const encode = (input: string): string => {
  input = String(input);
  if (/[^\0-\xFF]/.test(input)) {
    // Note: no need to special-case astral symbols here, as surrogates are
    // matched, and the input is supposed to only contain ASCII anyway.
    throwError(
      "The string to be encoded contains characters outside of the " +
        "Latin1 range."
    );
  }
  let padding = input.length % 3;
  let output = "";
  let position = -1;
  let a;
  let b;
  let c;
  let buffer;
  // Make sure any padding is handled outside of the loop.
  let length = input.length - padding;

  while (++position < length) {
    // Read three bytes, i.e. 24 bits.
    a = input.charCodeAt(position) << 16;
    b = input.charCodeAt(++position) << 8;
    c = input.charCodeAt(++position);
    buffer = a + b + c;
    // Turn the 24 bits into four chunks of 6 bits each, and append the
    // matching character for each of them to the output.
    output +=
      TABLE.charAt((buffer >> 18) & 0x3f) +
      TABLE.charAt((buffer >> 12) & 0x3f) +
      TABLE.charAt((buffer >> 6) & 0x3f) +
      TABLE.charAt(buffer & 0x3f);
  }

  if (padding == 2) {
    a = input.charCodeAt(position) << 8;
    b = input.charCodeAt(++position);
    buffer = a + b;
    output +=
      TABLE.charAt(buffer >> 10) +
      TABLE.charAt((buffer >> 4) & 0x3f) +
      TABLE.charAt((buffer << 2) & 0x3f) +
      "=";
  } else if (padding == 1) {
    buffer = input.charCodeAt(position);
    output +=
      TABLE.charAt(buffer >> 2) + TABLE.charAt((buffer << 4) & 0x3f) + "==";
  }

  return output;
};
