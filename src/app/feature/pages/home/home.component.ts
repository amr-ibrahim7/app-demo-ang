import { Component, inject, OnInit } from '@angular/core';
import { Meal } from '../../../shared/interfaces/meal';
import { MealsService } from '../../../shared/services/meals.service';
import { ProductCardComponent } from "../../../shared/components/product-card/product-card.component";
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { environment } from '../../../../environments/environment';
import { App_Config } from '../../../config';
import { HighlightDirective } from '../../../shared/directives/highlight.directive';

@Component({
  selector: 'app-home',
  imports: [ProductCardComponent, FormsModule,SearchPipe, HighlightDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

searchKey: string =''
  allFoods :Meal[] = []

  _App_Config = inject(App_Config);
 readonly _mealsService = inject(MealsService);

  ngOnInit():void {
    if(this._App_Config.mealFeature){
   this.getFood();
    }
  }


  getFood(){
     this._mealsService.getFood().subscribe({
      next: (data) => {
        // console.log(data);
        // this.allFoods = data.recipes;
        this.allFoods = data
      },
      error: (err) => {
        console.error(err);
      },
      complete:() => {
        console.log('Request completed');
      }
    });
  }

}
