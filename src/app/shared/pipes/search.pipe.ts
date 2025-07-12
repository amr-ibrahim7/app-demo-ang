import { Pipe, PipeTransform } from '@angular/core';
import { Meal } from '../interfaces/meal';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(meals: Meal[], key:string): Meal[] | [] {
    console.log('SearchPipe called with meals:', meals);
    
    return meals.filter(ele => ele.name.toLowerCase().includes(key.toLowerCase()));
  }

}
