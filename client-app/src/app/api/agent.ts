import axios, { AxiosResponse } from 'axios';
import { IActivity } from '../models/activity';

axios.defaults.baseURL = 'http://localhost:5000/api';
const responeBody = (response: AxiosResponse) => response.data;

const sleep = (ms:number)=> (respone: AxiosResponse) => 
    new Promise<AxiosResponse>(resolve => setTimeout(()=> resolve(respone), ms));

const requests ={
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responeBody),
    post: (url: string, body: {}) => axios.post(url,body).then(sleep(1000)).then(responeBody),
    put: (url: string, body: {}) => axios.put(url,body).then(sleep(1000)).then(responeBody),
    del: (url: string) => axios.delete(url).then(sleep(1000)).then(responeBody)
}

const Activities = {
    list: (): Promise<IActivity[]> => requests.get('/activities'),
    details:(id: string)=> requests.get(`/activities/${id}`),
    create: (activity: IActivity) => requests.post('/activities', activity),
    update: (activity: IActivity) => requests.put(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del(`/activities/${id}`)
}

export default {
    Activities
}