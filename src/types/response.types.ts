import { AxiosResponse } from 'axios';

export type Response<T = any, D = any> = AxiosResponse<T, D>;
