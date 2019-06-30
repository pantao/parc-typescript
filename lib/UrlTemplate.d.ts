export default class UrlTemplate {
    static operators: string[];
    template: string;
    constructor(template: string);
    expand: (context: {
        [propName: string]: any;
    }) => string;
    static expandTemplate: (template: string, context: any) => string;
    static isDefined: (value: any) => boolean;
    static isKeyOperator: (operator: string) => boolean;
    static encodeReserved: (str: string) => string;
    static encodeUnreserved: (str: string) => string;
    static encodeValue: (operator: string, value: string, key?: string | undefined) => string;
    static getValues: (context: any, operator: string, key: string, modifier: string) => string[];
}
//# sourceMappingURL=UrlTemplate.d.ts.map