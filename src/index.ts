const isValidPesel = (pesel: string): boolean => {

    // checking length and structure
    if (/^[\d]{11}$/.test(pesel) == false) return false;

    // checking month (from 2000 year month = month + 20) and day
    const month = parseInt(pesel.substring(2, 4));
    if (month < 1 || month > 31) return false;
    const day = parseInt(pesel.substring(4, 6));
    if (day < 1 || day > 32 || (day > 12 && day < 20)) return false;
    // if ((parseInt(pesel.substring(2, 4)) > 32) || (parseInt(pesel.substring(4, 6)) > 31)) return false;

    // checking checksum
    const weight = [1, 3, 7, 9];
    const digits = pesel.split('').map((digit) => parseInt(digit, 10));
    const control = digits.splice(-1)[0];
    let checksum = digits.reduce((prev, curr, index) => prev + curr * weight[index % 4]) % 10;

    return 10 - (checksum === 0 ? 10 : checksum) === control;
}

export const JoiPesel = (joi: any) => {
    return {
        type: 'string',
        base: joi.string(),
        messages: {
            'string.pesel': '{{#label}} is incorrect',
        },
        rules: {
            pesel: {
                validate(value: string, { error }: any) {
                    if (!isValidPesel(value)) {
                        return error('string.pesel', { value });
                    }
                    return value;
                },
            },
        },
    }
}

export default JoiPesel;