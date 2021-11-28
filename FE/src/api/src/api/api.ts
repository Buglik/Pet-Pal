export * from './api.service';
import {ApiService} from './api.service';
import {AuthService} from './auth.service';
import {PetSittersService} from './petSitters.service';
import {ProfileService} from './profile.service';
import {ReviewsService} from './reviews.service';

export * from './auth.service';
export * from './petSitters.service';
export * from './profile.service';
export * from './reviews.service';
export const APIS = [ApiService, AuthService, PetSittersService, ProfileService, ReviewsService];
