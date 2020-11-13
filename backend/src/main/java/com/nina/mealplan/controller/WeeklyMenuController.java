package com.nina.mealplan.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nina.mealplan.dm.WeeklyMenu;
import com.nina.mealplan.exception.DatabaseException;
import com.nina.mealplan.service.WeeklyMenuService;

import lombok.Getter;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/weeklyMenu")
@RestController
public class WeeklyMenuController {

	@Autowired
	@Getter
	private WeeklyMenuService weeklyMenuService;

	@GetMapping
	public WeeklyMenu get() throws DatabaseException {
		return new WeeklyMenu();
	}

	@PutMapping
	public WeeklyMenu update(@RequestBody WeeklyMenu weeklyMenu) throws DatabaseException {
		return weeklyMenu;
	}

}
