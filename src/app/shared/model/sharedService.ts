import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {
    public static instance: SharedService = null;

    selectedCompany = null;

    constructor() {
        return SharedService.instance = SharedService.instance || this;
    }

    public static getInstance() {
        if (this.instance == null) {
            this.instance = new SharedService();
        }
        return this.instance;
    }
}
