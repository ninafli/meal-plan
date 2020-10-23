package com.nina.mealplan.service;

import java.util.List;
import java.util.Map;
import java.util.Set;

import com.nina.mealplan.dm.Recipe;
import com.nina.mealplan.exception.DatabaseException;

public interface RecipeService {

	Set<String> getTags() throws DatabaseException;

	Recipe create(Recipe recipe) throws DatabaseException;

	Recipe save(Recipe recipe) throws DatabaseException;

	List<Recipe> getAll() throws DatabaseException;

	Recipe get(String recipeId) throws DatabaseException;

	void delete(String id) throws DatabaseException;

	Map<String, Integer> getTagSummary() throws DatabaseException;

	List<Recipe> getRecipesWithTag(String tag) throws DatabaseException;

	List<Recipe> search(String searchString) throws DatabaseException;
}
