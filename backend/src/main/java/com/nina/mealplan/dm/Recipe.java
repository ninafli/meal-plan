package com.nina.mealplan.dm;

import java.util.List;

import com.google.cloud.firestore.annotation.Exclude;

import lombok.Data;

@Data
public class Recipe {

	private String id;
	private List<Ingredient> ingredients;
	private List<String> method;

	@Exclude
	public String getId() {
		return id;
	}

}
