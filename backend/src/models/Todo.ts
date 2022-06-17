import { Document } from "mongoose";

export interface ITodo extends Document {
  id: string;
  name: string;
  status: boolean;
}
