import {MeResponse} from "../../../api/src";

export interface UserState {
  user?: MeResponse;
  error: any;
  pending: boolean
}
