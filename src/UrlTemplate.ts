export default class UrlTemplate {
  static operators = ["+", "#", ".", "/", ";", "?", "&"];

  template: string;

  constructor(template: string) {
    if (!template) {
      throw new Error(`context must be supplied.`);
    }

    this.template = template;
  }

  expand = (context: { [propName: string]: any }): string =>
    UrlTemplate.expandTemplate(this.template, context);

  static expandTemplate = (template: string, context: any): string =>
    template.replace(
      /\{([^\{\}]+)\}|([^\{\}]+)/g,
      (_, expressionInput: string, literal: string): string => {
        if (expressionInput) {
          let operator: string = "";
          let expression: string = expressionInput;
          const values: Array<string> = [];

          if (UrlTemplate.operators.includes(expression.charAt(0))) {
            operator = expression.charAt(0);
            expression = expression.substr(1);
          }

          expression.split(/,/g).forEach(variable => {
            const tmp = /([^:*]*)(?::(\d+)|(\*))?/.exec(variable);
            if (tmp === null) {
              return;
            }
            Array.prototype.push.apply(
              values,
              UrlTemplate.getValues(context, operator, tmp[1], tmp[2] || tmp[3])
            );
          });

          if (operator && operator !== "+") {
            let separator = ",";

            if (operator === "?") {
              separator = "&";
            } else if (operator !== "#") {
              separator = operator;
            }
            return (
              (values.length !== 0 ? operator : "") + values.join(separator)
            );
          }
          return values.join(",");
        }
        return UrlTemplate.encodeReserved(literal);
      }
    );

  static isDefined = (value: any): boolean =>
    value !== undefined && value !== null;

  static isKeyOperator = (operator: string): boolean =>
    [";", "&", "?"].includes(operator);

  static encodeReserved = (str: string): string =>
    str
      .split(/(%[0-9A-Fa-f]{2})/g)
      .map(
        (part: any): any => {
          return /%[0-9A-Fa-f]/.test(part)
            ? part
            : encodeURI(part)
                .replace(/%5B/g, "[")
                .replace(/%5D/g, "]");
        }
      )
      .join("");

  static encodeUnreserved = (str: string): string =>
    encodeURIComponent(str).replace(
      /[!'()*]/g,
      c =>
        `%${c
          .charCodeAt(0)
          .toString(16)
          .toUpperCase()}`
    );

  static encodeValue = (
    operator: string,
    value: string,
    key?: string
  ): string => {
    const encodedValue =
      operator === "+" || operator === "#"
        ? UrlTemplate.encodeReserved(value)
        : UrlTemplate.encodeUnreserved(value);

    if (key) {
      return `${UrlTemplate.encodeUnreserved(key)}=${encodedValue}`;
    }
    return encodedValue;
  };

  static getValues = (
    context: any,
    operator: string,
    key: string,
    modifier: string
  ): Array<string> => {
    let value = context[key];
    const result: Array<string> = [];

    if (UrlTemplate.isDefined(value) && value !== "") {
      if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      ) {
        value = value.toString();

        if (modifier && modifier !== "*") {
          value = value.substring(0, parseInt(modifier, 10));
        }

        result.push(
          UrlTemplate.encodeValue(
            operator,
            value,
            UrlTemplate.isKeyOperator(operator) ? key : undefined
          )
        );
      } else if (modifier === "*") {
        if (Array.isArray(value)) {
          value.filter(UrlTemplate.isDefined).forEach(v => {
            result.push(
              UrlTemplate.encodeValue(
                operator,
                v,
                UrlTemplate.isKeyOperator(operator) ? key : undefined
              )
            );
          });
        } else {
          Object.keys(value).forEach(k => {
            if (UrlTemplate.isDefined(value[k])) {
              result.push(UrlTemplate.encodeValue(operator, value[k], k));
            }
          });
        }
      } else {
        var tmp: Array<string> = [];

        if (Array.isArray(value)) {
          value.filter(UrlTemplate.isDefined).forEach(function(value) {
            tmp.push(UrlTemplate.encodeValue(operator, value));
          });
        } else {
          Object.keys(value).forEach(function(k) {
            if (UrlTemplate.isDefined(value[k])) {
              tmp.push(UrlTemplate.encodeUnreserved(k));
              tmp.push(UrlTemplate.encodeValue(operator, value[k].toString()));
            }
          });
        }

        if (UrlTemplate.isKeyOperator(operator)) {
          result.push(UrlTemplate.encodeUnreserved(key) + "=" + tmp.join(","));
        } else if (tmp.length !== 0) {
          result.push(tmp.join(","));
        }
      }
    } else if (operator === ";") {
      if (UrlTemplate.isDefined(value)) {
        result.push(UrlTemplate.encodeUnreserved(key));
      }
    } else if (value === "" && (operator === "&" || operator === "?")) {
      result.push(`${UrlTemplate.encodeUnreserved(key)}=`);
    } else if (value === "") {
      result.push("");
    }
    return result;
  };
}
