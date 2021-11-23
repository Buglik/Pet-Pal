import {UserState} from "./user/user.state";
import {SittersListState} from "./sitters/sitters.state";

export interface AppState {
  user: UserState
  sitterList: SittersListState
}

export const sitterListFeature = 'sitterList';
