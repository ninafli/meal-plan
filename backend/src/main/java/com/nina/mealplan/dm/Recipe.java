package com.nina.mealplan.dm;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class Recipe {

	private String id;
	private String name;
	private List<Ingredient> ingredients;
	private List<String> method;
	private List<String> tags = new ArrayList<String>();
	private String image;
}
