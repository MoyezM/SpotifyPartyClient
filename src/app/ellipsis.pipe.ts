import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {

  transform(name: string, args?: any): any {
    console.log(name);
    let length = name.length;
    console.log(length);
    if (length > 30) {
      console.log('THIS IS WORKING');
      let newName = name.slice(0, 30) + '...';
      return newName;
    } else {
      return name;
    }
  }

}
