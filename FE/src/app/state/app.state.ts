import {UserState} from "./user/user.state";
import {SittersListState} from "./sitters/sitters.state";
import {SitterReviewsState} from "./reviews/reviews.state";

export interface AppState {
  user: UserState
  sitterList: SittersListState
  sitterReviews: SitterReviewsState
}

export const sitterListFeature = 'sitterList';
export const sitterReviewsFeature = 'sitterReviews';
