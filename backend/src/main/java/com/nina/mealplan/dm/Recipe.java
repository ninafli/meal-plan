package com.nina.mealplan.dm;

import java.util.List;

import com.google.cloud.firestore.annotation.Exclude;

import lombok.Data;

@Data
public class Recipe {

	private String id;
	private String name;
	private List<Ingredient> ingredients;
	private List<String> method;
	private List<String> tags;

	@Exclude
	public String getId() {
		return id;
	}

}
