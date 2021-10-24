import {MeResponse} from "../../../api/src";

export interface UserState {
  user: MeResponse | null;
  error: null;
  pending: boolean
}
