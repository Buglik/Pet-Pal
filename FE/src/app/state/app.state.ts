import {UserState} from "./user/user.state";
import {SittersListState} from "./sitters/sitters.state";
import {SitterReviewsState} from "./reviews/reviews.state";
import {ProfilesListState} from "./profiles/profiles.state";

export interface AppState {
  user: UserState
  profileList: ProfilesListState
  sitterList: SittersListState
  sitterReviews: SitterReviewsState
}

export const profileListFeature = 'profileList';
export const sitterListFeature = 'sitterList';
export const sitterReviewsFeature = 'sitterReviews';
