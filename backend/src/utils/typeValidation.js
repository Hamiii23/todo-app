import { z } from "zod";

const stringValidator = z.string();
const dateValidator = z.string().date();
const emailValidator = z.string().email();
const numberValidator = z.number();

export {
    stringValidator,
    dateValidator,
    emailValidator,
    numberValidator
};
