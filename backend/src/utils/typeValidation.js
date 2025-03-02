import { z } from "zod";

const titleType = z.string();
const dueDateType = z.string().date();
const descType = z.string();

export { titleType, dueDateType, descType };
