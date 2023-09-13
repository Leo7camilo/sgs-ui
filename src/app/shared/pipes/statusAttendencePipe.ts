import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'statusAttendencePipe' })
export class StatusAttendencePipe implements PipeTransform {

    transform(value: string): string {
        if (value == null || value.trim().length == 0){
            return "";
        }

        switch(value) {
            case "NOT_FIT": return "INAPTO"
            case "WAITING": return "AGUARDANDO"
            case "IN_ATTENDENCE": return "EM ATENDIMENTO"
            case "ATTENDED": return "ATENDIDO"
            default:  return "";
        }
    }

}
