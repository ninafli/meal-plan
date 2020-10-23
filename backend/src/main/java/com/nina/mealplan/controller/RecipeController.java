package com.nina.mealplan.controller;

import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.nina.mealplan.dm.Recipe;
import com.nina.mealplan.exception.DatabaseException;
import com.nina.mealplan.service.RecipeService;

import lombok.Getter;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/recipe")
@RestController
public class RecipeController {

	@Autowired
	@Getter
	private RecipeService recipeService;

	@PostMapping
	public Recipe create(@RequestBody Recipe recipe) throws DatabaseException {
		return getRecipeService().create(recipe);
	}

	@PutMapping
	public Recipe update(@RequestBody Recipe recipe) throws DatabaseException {
		return getRecipeService().save(recipe);
	}

	@GetMapping
	public List<Recipe> find(@RequestParam(required = false) String tag) throws DatabaseException {
		if (tag == null) {
			return recipeService.getAll();
		} else {
			return recipeService.getRecipesWithTag(tag);
		}
	}

	@GetMapping("/{id}")
	public Recipe getRecipe(@PathVariable String id) throws DatabaseException {
		return getRecipeService().get(id);
	}

	@DeleteMapping("/{id}")
	public void deleteRecipe(@PathVariable String id) throws DatabaseException {
		getRecipeService().delete(id);
	}

	@GetMapping("/tag")
	public Set<String> getTags() throws DatabaseException {
		return recipeService.getTags();
	}

	@GetMapping("/tag-summary")
	public Map<String, Integer> getTagSummary() throws DatabaseException {
		return recipeService.getTagSummary();
	}

	@GetMapping("/search")
	@ResponseBody
	public List<Recipe> search(@RequestParam String searchString) throws DatabaseException {
		return recipeService.search(searchString);
	}
}
