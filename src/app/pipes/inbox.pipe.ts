import {Pipe, PipeTransform} from '@angular/core';
@Pipe ({
   name : 'taskColor'
})
export class InboxPipe implements PipeTransform {
   transform(base: number, exponent: number): number {
      return null;
   }
}