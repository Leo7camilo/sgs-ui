import { Pipe, PipeTransform } from '@angular/core';
import { Terminal } from '../model/terminal';

@Pipe({ name: 'terminalAttendencePipe' })
export class TerminalAttendencePipe implements PipeTransform {

    transform(value: Terminal): string {
        if (value == null){
            return " - ";
        }
        return value['name'];
    }

}
