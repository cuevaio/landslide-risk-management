import { customAlphabet } from "nanoid";

const alphabet =
	"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export const dbid = customAlphabet(alphabet, 12);
