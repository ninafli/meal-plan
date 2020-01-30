package com.nina.mealplan.exception;

@SuppressWarnings("serial")
public class RecipeNotFound extends DatabaseException {

	public RecipeNotFound(String recipeId) {
		super(new Exception("Recipe " + recipeId + " cannot be found."));
	}
}
