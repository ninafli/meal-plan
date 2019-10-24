package com.nina.mealplan.dm;

import java.util.List;

import lombok.Data;

@Data
public class Recipe {
	private String id;
	private List<Ingredient> ingredients;
	private List<String> method;

}
