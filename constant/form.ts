
export type FormItemKey =
  | "name"
  | "unit"
  | "price"
  | "number"
  | "remark"
  | "criterion"
  | "itemTotal";

export type FormItem = Record<FormItemKey, unknown>;