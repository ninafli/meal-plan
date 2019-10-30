package com.nina.mealplan.service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.nina.mealplan.dm.Recipe;
import com.nina.mealplan.exception.DatabaseException;

import lombok.Getter;

@Service
public class RecipeServiceImpl implements RecipeService {

	@Autowired
	@Getter
	private Firestore fireStore;

	@Override
	public Recipe save(Recipe recipe) throws DatabaseException {

		ApiFuture<DocumentReference> future = fireStore.collection(Recipe.class.getSimpleName()).add(recipe);

		Recipe added = null;
		try {
			DocumentSnapshot documentSnapshot = future.get().get().get();
			added = documentSnapshot.toObject(Recipe.class);
			added.setId(documentSnapshot.getId());

		} catch (InterruptedException | ExecutionException e) {
			throw new DatabaseException(e);
		}

		return added;
	}

	@Override
	public List<Recipe> findAll() throws DatabaseException {
		List<Recipe> recipes = new ArrayList<Recipe>();
		try {
			for (QueryDocumentSnapshot snapshot : fireStore.collection(Recipe.class.getSimpleName()).get().get()
					.getDocuments()) {
				Recipe recipe = snapshot.toObject(Recipe.class);
				recipe.setId(snapshot.getId());
				recipes.add(recipe);
			}
		} catch (InterruptedException | ExecutionException e) {
			throw new DatabaseException(e);
		}
		return recipes;
	}
}
