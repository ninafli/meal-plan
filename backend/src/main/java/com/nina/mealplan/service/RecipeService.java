package com.nina.mealplan.service;

import java.util.List;

import com.nina.mealplan.dm.Recipe;
import com.nina.mealplan.exception.DatabaseException;

public interface RecipeService {

	Recipe save(Recipe recipe) throws DatabaseException;

	List<Recipe> findAll() throws DatabaseException;
}
