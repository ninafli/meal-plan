package com.nina.mealplan.dm;

import java.time.DayOfWeek;
import java.util.HashMap;
import java.util.LinkedHashMap;

import lombok.Data;

@Data
public class WeeklyMenu {
	private HashMap<DayOfWeek, Recipe[]> dinner;

	public WeeklyMenu() {
		this.dinner = new LinkedHashMap<DayOfWeek, Recipe[]>();
		for (DayOfWeek day : DayOfWeek.values()) {
			dinner.put(day, new Recipe[0]);
		}
	}
}
