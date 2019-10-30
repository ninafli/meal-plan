package com.nina.mealplan.service;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.nina.mealplan.dm.Recipe;

import lombok.Getter;

@Service
public class RecipeServiceImpl implements RecipeService {

	@Autowired
	@Getter
	private Firestore fireStore;

	@Override
	public Recipe save(Recipe recipe) {

		ApiFuture<DocumentReference> future = fireStore.collection(Recipe.class.getSimpleName())
				.add(recipe);

		Recipe added = null;
		try {
			DocumentSnapshot documentSnapshot = future.get().get().get();
			added = documentSnapshot.toObject(Recipe.class);
			added.setId(documentSnapshot.getId());

		} catch (InterruptedException | ExecutionException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return added;
	}

	@Override
	public List<Recipe> findAll() {
		// TODO Auto-generated method stub
		return null;
	}
}
