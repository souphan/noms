// import * as models from './models';

export interface ReservationsListResponse {
    createTime: string;
    
    reservationId?: string;

    restaurantFood: string;

    restaurantImage: string;

    restaurantName?: string;

    restaurantTime: any;

    userId: string;

}