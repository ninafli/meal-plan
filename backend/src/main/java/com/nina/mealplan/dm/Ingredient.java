package com.nina.mealplan.dm;

import lombok.Data;

@Data
public class Ingredient {

	private double amount;
	private String unit;
	private String prepMethod;
	private String rawIngredient;
}
