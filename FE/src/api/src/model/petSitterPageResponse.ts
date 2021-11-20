/**
 * PetPal API
 * Pet Sitter Search App documentation
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import {PetSitterResponse} from './petSitterResponse';


export interface PetSitterPageResponse {
    data: Array<PetSitterResponse>;
    pageSize: number;
    pageIndex: number;
    length: number;
}
