export declare const JoiPesel: (joi: any) => {
    type: string;
    base: any;
    messages: {
        'string.pesel': string;
    };
    rules: {
        pesel: {
            validate(value: string, { error }: any): any;
        };
    };
};
export default JoiPesel;
