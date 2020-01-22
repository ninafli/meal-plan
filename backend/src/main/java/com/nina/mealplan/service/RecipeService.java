package com.nina.mealplan.service;

import java.util.List;
import java.util.Set;

import com.nina.mealplan.dm.Recipe;
import com.nina.mealplan.exception.DatabaseException;

public interface RecipeService {

	Set<String> getTags() throws DatabaseException;

	Recipe save(Recipe recipe) throws DatabaseException;

	List<Recipe> findAll() throws DatabaseException;

	Recipe find(String recipeId) throws DatabaseException;

	void delete(String id) throws DatabaseException;
}
