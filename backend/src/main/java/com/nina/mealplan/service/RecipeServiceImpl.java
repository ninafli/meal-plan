package com.nina.mealplan.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.SetOptions;
import com.google.cloud.firestore.WriteResult;
import com.google.common.collect.Maps;
import com.nina.mealplan.dm.Recipe;
import com.nina.mealplan.exception.DatabaseException;

import lombok.Getter;

@Service
public class RecipeServiceImpl implements RecipeService {

	private static String TAGS_COLLECTION = "Recipe-Tags";
	@Autowired
	@Getter
	private Firestore fireStore;

	@Override
	public Set<String> getTags() throws DatabaseException {
		Set<String> result = new HashSet<String>();
		DocumentSnapshot documentSnapshot;
		try {
			documentSnapshot = getTagsCollection().get().get();
			if (documentSnapshot.exists()) {
				result = documentSnapshot.getData().keySet();
			}
		} catch (InterruptedException | ExecutionException e) {
			throw new DatabaseException(e);
		}

		return result;
	}

	private DocumentReference getTagsCollection() throws DatabaseException {
		return fireStore.collection(TAGS_COLLECTION).document(TAGS_COLLECTION);
	}

	@Override
	public Recipe save(Recipe recipe) throws DatabaseException {

		ApiFuture<DocumentReference> future = fireStore.collection(Recipe.class.getSimpleName()).add(recipe);

		Recipe addedRecipe = null;
		try {
			DocumentSnapshot recipeDocSnapshot = future.get().get().get();
			addedRecipe = recipeDocSnapshot.toObject(Recipe.class);
			addedRecipe.setId(recipeDocSnapshot.getId());
			if (recipe.getTags() != null && recipe.getTags().size() > 0) {
				fireStore.collection(TAGS_COLLECTION).document(TAGS_COLLECTION)
						.set(Maps.asMap(new HashSet<String>(recipe.getTags()), tag -> null), SetOptions.merge());
			}
		} catch (InterruptedException | ExecutionException e) {
			throw new DatabaseException(e);
		}

		return addedRecipe;
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

	@Override
	public Recipe find(String recipeId) throws DatabaseException {
		Recipe recipe = null;
		try {
			DocumentReference docRef = fireStore.collection(Recipe.class.getSimpleName()).document(recipeId);
			ApiFuture<DocumentSnapshot> future = docRef.get();
			DocumentSnapshot document = future.get();
			if (document.exists()) {
				// convert document to POJO
				recipe = document.toObject(Recipe.class);
				recipe.setId(document.getId());
			}
		} catch (InterruptedException | ExecutionException e) {
			throw new DatabaseException(e);
		}
		return recipe;
	}

	@Override
	public void delete(String recipeId) throws DatabaseException {
		Recipe recipe = null;
		try {
			ApiFuture<WriteResult> writeResult = fireStore.collection(Recipe.class.getSimpleName()).document(recipeId)
					.delete();
			writeResult.get();
		} catch (InterruptedException | ExecutionException e) {
			throw new DatabaseException(e);
		}
	}
}
