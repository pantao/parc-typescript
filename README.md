# Parc functions set

Parc functions set is a util functions library wrote with typescript.

## Features

This package includes these features:

- `formatters`
- `is` value guesser
- `to` value convertor
- `datetime` datetime value utilities
- `object` object value utilities
- `base64` base64 utilities
- `patterns` common regexp patterns
- `utils` common utilities
- `validators` validators
- `luhn` luhn algorithm
- `version` version number utilities
- `UrlTemplate` templated url builder
- `Currency` currency builder
- `func` funciton concerned utilities
- `random` random concerned utilities
- `geometry` geometry concerned utilities

## Usage

```js
import parc from "parc";

parc.is.mobile("13456788675");

parc.object.deepEqual(foo, bar);

parc.base64.encode("btoa");

// Chinese mobile number check
parc.patterns.MOBILE.test("13432343234");
```
