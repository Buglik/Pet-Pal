export * from './api.service';
import {ApiService} from './api.service';
import {AuthService} from './auth.service';
import {ProfileService} from './profile.service';

export * from './auth.service';
export * from './profile.service';
export const APIS = [ApiService, AuthService, ProfileService];
