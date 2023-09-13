import { Pipe, PipeTransform } from '@angular/core';
import { Client } from '../model/client';
import { Queue } from '../model/queue';

@Pipe({ name: 'queueAttendencePipe' })
export class QueueAttendencePipe implements PipeTransform {

    transform(value: Queue): string {
        if (value == null){
            return " - ";
        }
        return value['description'];
    }

}
