import { IResponse } from "../../interfaces/response/IResponse";

export class ErrorResponse implements IResponse<boolean> {
  constructor(status: string, result?: string, decription?: string | string[]) {
    this.status = status;
    this.result = result;
    this.description = decription;
  }
  status: string;
  result?: string;
  description?: string | string[];
}
