import { Pipe, PipeTransform } from '@angular/core';
import { Client } from '../model/client';

@Pipe({ name: 'clientAttendencePipe' })
export class ClientAttendencePipe implements PipeTransform {

    transform(value: Client): string {
        if (value == null){
            return " - ";
        }
        return value['name'];
    }

}
