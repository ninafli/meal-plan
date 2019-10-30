package com.nina.mealplan.exception;

@SuppressWarnings("serial")
public class DatabaseException extends Exception {

	public DatabaseException(Exception e) {
		super(e);
	}

}
