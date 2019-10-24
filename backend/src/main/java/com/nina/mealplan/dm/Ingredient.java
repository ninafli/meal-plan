package com.nina.mealplan.dm;

import lombok.Data;

@Data
public class Ingredient {

	private int id;
	private double amount;
	private String unit;
	private String prepMethod;
	private String rawIngredient;
}
