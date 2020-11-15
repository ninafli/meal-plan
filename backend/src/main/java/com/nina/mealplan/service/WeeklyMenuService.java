package com.nina.mealplan.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.cloud.firestore.Firestore;

import lombok.Getter;

@Service
public class WeeklyMenuService {

	@Autowired
	@Getter
	private Firestore fireStore;
}
