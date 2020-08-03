import axios, { AxiosResponse, AxiosPromise } from 'axios';
import { UserProps } from './User'

interface HasId {
    id?: number;
}

export class ApiSync<T extends HasId> {

    constructor(public rootURL: string) { }

    fetch(id: number): AxiosPromise {
        return axios.get(`${this.rootURL}/${id}`)
    }
    save(data: T): AxiosPromise {
        if (data.id) {
            //put
            return axios.put(`${this.rootURL}/${data.id}`, data)
        }
        else {
            return axios.post(`${this.rootURL}`, data)
        }
    }
}