import { pageLimit } from "@utils/constants";
import { format } from "date-fns";

export const or = (...args: boolean[]): boolean =>
  args.reduce((acc, curr) => acc || curr, args[0] || false);

export const isValidDate = (date: any): date is Date =>
  typeof date !== "number" && !isNaN(Date.parse(date));

export const formatDate = (date: Date | string) => {
  if (!isValidDate(date)) return "N/A";

  return format(new Date(date), "dd-MM-yyyy");
};
