export * from './api.service';
import {ApiService} from './api.service';
import {AuthService} from './auth.service';

export * from './auth.service';
export const APIS = [ApiService, AuthService];
