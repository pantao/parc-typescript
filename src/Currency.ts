const { round, pow } = Math;

const defaultSettings: CurrencySettings = {
  symbol: "￥",
  separator: ",",
  decimal: ".",
  formatWithSymbol: false,
  errorOnInvalid: false,
  precision: 2,
  pattern: "!#",
  negativePattern: "-!#"
};

const groupPattern = /(\d)(?=(\d{3})+\b)/g;
const vedicPattern = /(\d)(?=(\d\d)+\d\b)/g;

const rounding = (value: number, increment: number) =>
  round(value / increment) * increment;

export default class Currency {
  static parse = (
    value: string | number | Currency,
    settings = { ...defaultSettings },
    useRounding = true
  ): number => {
    const { decimal, errorOnInvalid, precision: decimals } = settings;
    const precision = pow(10, decimals || 2);
    const isNumber = typeof value === "number";

    let v: number;

    if (isNumber) {
      v = (value as number) * precision;
    } else if (value instanceof Currency) {
      v = value.value * precision;
    } else if (typeof value === "string") {
      const regex = new RegExp(`[^-\\d${decimal}]`, "g");
      const decimalString = new RegExp(`\\${decimal}`, "g");
      v =
        parseFloat(
          value
            .replace(/\((.*)\)/, "-$1")
            .replace(regex, "")
            .replace(decimalString, ".")
        ) * precision || 0;
    } else {
      if (errorOnInvalid) {
        throw new Error("Invalid input");
      }
      v = 0;
    }

    return useRounding ? round(v) : v;
  };

  settings: CurrencySettings;
  precision: number;
  initialValue: number;
  value: number;
  constructor(value: string | number, settings = { ...defaultSettings }) {
    this.settings = {
      ...defaultSettings,
      ...settings
    };

    this.precision = pow(10, this.settings.precision || 2);

    this.initialValue = Currency.parse(value, this.settings);
    this.value = this.initialValue / this.precision;

    if (this.settings.useVedic) {
      this.settings.groups = vedicPattern;
    } else {
      this.settings.groups = groupPattern;
    }

    this.settings.increment = settings.increment || 1 / this.precision;
  }

  add = (number: number): Currency => {
    const { initialValue, settings, precision } = this;
    return new Currency(
      (initialValue + Currency.parse(number, settings)) / precision,
      settings
    );
  };

  subtract = (number: number): Currency => {
    const { initialValue, settings, precision } = this;
    return new Currency(
      (initialValue - Currency.parse(number, settings)) / precision,
      settings
    );
  };

  multiply = (number: number): Currency => {
    const { initialValue, settings } = this;
    return new Currency(
      (initialValue * number) / pow(10, settings.precision as number),
      settings
    );
  };

  divide = (number: number): Currency => {
    const { initialValue, settings } = this;
    return new Currency(
      initialValue / Currency.parse(number, settings, false),
      settings
    );
  };

  /**
   * 分分脏
   */
  distribute = (count: number): Currency[] => {
    const { initialValue, precision, settings } = this;
    const distribution = [];
    const split = Math[initialValue >= 0 ? "floor" : "ceil"](
      initialValue / count
    );
    let pennies = Math.abs(initialValue - split * count);

    for (let i = count; i !== 0; i -= 1) {
      let item = new Currency(split / precision, settings);

      if (pennies > 0) {
        item =
          initialValue >= 0
            ? item.add(1 / precision)
            : item.subtract(1 / precision);
      }
      pennies -= 1;
      distribution.push(item);
    }
    return distribution;
  };

  format = (useSymbol?: boolean): string => {
    const {
      pattern,
      negativePattern,
      formatWithSymbol,
      symbol,
      separator,
      decimal,
      groups
    } = this.settings;

    let values = this.toString()
      .replace(/^-/, "")
      .split(".");

    let dollars = values[0];
    let cents = values[1];

    const enableSymbol =
      typeof useSymbol === undefined ? formatWithSymbol : useSymbol;

    if (
      pattern === undefined ||
      negativePattern === undefined ||
      groups === undefined
    ) {
      throw new Error("unknown error");
    }

    return (this.value >= 0 ? pattern : negativePattern)
      .replace("!", enableSymbol ? `${symbol || ""}` : "")
      .replace(
        "#",
        `${dollars.replace(groups, "$1" + separator)}${
          cents ? decimal + cents : ""
        }`
      );
  };

  toString = () => {
    const { initialValue, precision, settings } = this;
    return rounding(
      initialValue / precision,
      settings.increment as number
    ).toFixed(settings.precision);
  };

  toJSON = () => this.value;
}

export type CurrencySettings = {
  symbol?: string;
  separator?: string;
  decimal?: string;
  formatWithSymbol?: boolean;
  errorOnInvalid?: boolean;
  precision?: number;
  pattern?: string;
  negativePattern?: string;
  useVedic?: boolean;
  groups?: RegExp;
  increment?: number;
};
