package com.nina.mealplan.service;

import java.util.List;

import com.nina.mealplan.dm.Recipe;

public interface RecipeService {

	Recipe save(Recipe recipe);

	List<Recipe> findAll();
}
