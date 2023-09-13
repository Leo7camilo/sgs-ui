import { Pipe, PipeTransform } from '@angular/core';
import { Client } from '../model/client';

@Pipe({ name: 'nullResultPipe' })
export class NullResultPipe implements PipeTransform {

    transform(value: string): string {
        if (value == null){
            return " - ";
        }
        return value;
    }

}
