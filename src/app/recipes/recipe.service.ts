import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>()
  
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     "A Test Recipe1",
  //     "This is simply a test",
  //     "https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg",
  //     [new Ingredient("Meat", 1), new Ingredient("Fries", 20)]
  //   ),
  //   new Recipe(
  //     "A Test Recipe2",
  //     "This is simply a test",
  //     "https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg",
  //     [new Ingredient("Meat2", 1), new Ingredient("Fries2", 20)]
  //   ),
  // ];
  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) { }
  
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes
    this.recipesChanged.next(this.recipes.slice())
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1)
    this.recipesChanged.next(this.recipes.slice())
  }
}
