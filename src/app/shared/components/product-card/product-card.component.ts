import { Component, Input } from '@angular/core';
import { Meal } from '../../interfaces/meal';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
 @Input() food!: Meal;
}
