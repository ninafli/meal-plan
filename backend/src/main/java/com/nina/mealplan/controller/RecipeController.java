package com.nina.mealplan.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nina.mealplan.dm.Recipe;
import com.nina.mealplan.service.RecipeService;

import lombok.Getter;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/recipe")
@RestController
public class RecipeController {

	@Autowired
	@Getter
	private RecipeService recipeService;

	@GetMapping
	public List<Recipe> getAll() {
		return null;
	}

	@PostMapping
	public Recipe save(@RequestBody Recipe recipe) {
		return getRecipeService().save(recipe);
	}
}
