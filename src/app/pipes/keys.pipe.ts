import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'keys'
})
export class KeysPipe implements PipeTransform {

    transform(value: any, args?: any[]): Object[] {
        let returnArray = [];

        for (const key in value) {
            if (value.hasOwnProperty(key)) {
                returnArray.push({key: key, val: value[key]});
            }
        }

        return returnArray;
    }
}