import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Meal } from '../interfaces/meal';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealsService {

  readonly _httpClient = inject(HttpClient);

  constructor() { }

    getFood(): Observable<Meal[]> {
   return this._httpClient.get<{limit:number, recipes: Meal[]}>(`https://dummyjson.com/recipes`)
  //  map not the array methods => return the result;
   .pipe(map(res => {
    console.log(res, "from services");
     res.recipes = res.recipes.map((food:Meal ) => ({ id: food.id, name: food.name, cuisine: food.cuisine, image: food.image, ingredients: food.ingredients, tags: food.tags, rating: food.rating  }))
    return res.recipes;
   }))
  }
}
