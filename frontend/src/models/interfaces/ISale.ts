import { IClient } from "./IClient";
import { IProduct } from "./IProduct";

export interface ISaleProduct extends IProduct {
  stock: number;
}

export interface ISale {
  _id: string;
  date: Date;
  totalValue: number;
  client: IClient;
  status: string;
  products: ISaleProduct[];
}
