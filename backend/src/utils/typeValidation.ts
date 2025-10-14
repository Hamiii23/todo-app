import { z } from "zod";

const stringValidator = z.string();
const dateValidator = z.string().date();
const emailValidator = z.string().email();
const passwordValidator = z.string().min(8);
const numberValidator = z.number();

export {
  stringValidator,
  dateValidator,
  emailValidator,
  numberValidator,
  passwordValidator,
};
