import { IResponse } from "../../interfaces/response/IResponse";

export class SuccessResponse implements IResponse<any> {
  constructor(status: string, result?: any | boolean) {
    this.status = status;
    this.result = result;
  }
  status: string;
  result?: any | boolean;
}
