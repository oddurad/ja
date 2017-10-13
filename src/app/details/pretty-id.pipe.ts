import { Pipe, PipeTransform } from '@angular/core';

/*
 * Prettifies an Icelandic National Id Number (kennitala).
 * Usage:
 *   id | prettyId
 * Example:
 *   {{ '4308050530' | prettyId }}
 *   formats to: 430805-0530
*/
@Pipe({name: 'prettyId'})
export class PrettyIdPipe implements PipeTransform {
  transform(id: string): string {
    return [id.slice(0, 6), '-', id.slice(6)].join('');
  }
}
