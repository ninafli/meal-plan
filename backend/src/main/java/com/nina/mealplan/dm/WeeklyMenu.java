package com.nina.mealplan.dm;

import java.util.HashMap;

import lombok.Data;

@Data
public class WeeklyMenu {
	private HashMap<String, Recipe[]> dinner;
}
