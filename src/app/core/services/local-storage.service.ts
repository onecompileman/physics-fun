import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    private localStorage: Storage;

    constructor() {
        this.localStorage = localStorage;
    }

    getItem(itemName: string): any | any[] {
        const item = this.localStorage.getItem(itemName);
        return JSON.parse(item);
    }

    setItem(itemName: string, item: any | any[]): void {
        this.localStorage.setItem(itemName, JSON.stringify(item));
    }

    deleteItem(itemName: string): void {
        this.localStorage.removeItem(itemName);
    }
}
