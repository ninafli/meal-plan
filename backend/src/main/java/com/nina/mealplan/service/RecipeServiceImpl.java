package com.nina.mealplan.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.FieldValue;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.common.collect.Maps;
import com.nina.mealplan.dm.Recipe;
import com.nina.mealplan.exception.DatabaseException;
import com.nina.mealplan.exception.RecipeNotFound;

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
		fireStore.collection(TAGS_COLLECTION).listDocuments().forEach(tag -> result.add(tag.getId()));
		return result;
	}

	@Override
	public Recipe save(Recipe recipe) throws DatabaseException {

		ApiFuture<DocumentReference> future = fireStore.collection(Recipe.class.getSimpleName()).add(recipe);

		Recipe addedRecipe = null;
		try {
			DocumentReference recipeRef = future.get();
			recipeRef.update("id", recipeRef.getId()).get();

			// save the recipe tags
			if (recipe.getTags() != null) {

				for (String tag : recipe.getTags()) {
					DocumentReference ref = fireStore.collection(TAGS_COLLECTION).document(tag);
					if (!ref.get().get().exists()) {
						// this is new tag, need to create it
						HashMap<String, FieldValue> values = Maps.newHashMap();
						values.put("reference", FieldValue.arrayUnion(recipeRef));
						ref.set(values).get();
					} else {
						ref.update("reference", FieldValue.arrayUnion(recipeRef)).get();
					}
				}
			}

			addedRecipe = recipeRef.get().get().toObject(Recipe.class);
		} catch (InterruptedException | ExecutionException e) {
			throw new DatabaseException(e);
		}

		return addedRecipe;
	}

	@Override
	public Recipe find(String recipeId) throws DatabaseException {
		Recipe recipe = null;
		try {
			DocumentReference ref = findRecipe(recipeId);
			DocumentSnapshot snapshot = ref.get().get();
			if (!snapshot.exists()) {
				throw new RecipeNotFound(recipeId);
			}
			recipe = snapshot.toObject(Recipe.class);
		} catch (InterruptedException | ExecutionException e) {
			throw new DatabaseException(e);
		}
		return recipe;
	}

	@Override
	public List<Recipe> findAll() throws DatabaseException {
		List<Recipe> recipes = new ArrayList<Recipe>();
		try {
			for (QueryDocumentSnapshot snapshot : fireStore.collection(Recipe.class.getSimpleName()).get().get()
					.getDocuments()) {
				recipes.add(snapshot.toObject(Recipe.class));
			}
		} catch (InterruptedException | ExecutionException e) {
			throw new DatabaseException(e);
		}
		return recipes;
	}

	@SuppressWarnings("unchecked")
	@Override
	public void delete(String recipeId) throws DatabaseException {
		try {
			DocumentReference recipeRef = findRecipe(recipeId);
			DocumentSnapshot snapshot = recipeRef.get().get();
			if (snapshot.exists()) {
				for (String tag : (List<String>) snapshot.get("tags")) {
					DocumentReference tagRef = fireStore.collection(TAGS_COLLECTION).document(tag);
					tagRef.update("reference", FieldValue.arrayRemove(recipeRef)).get();
				}

				recipeRef.delete().get();
			}
		} catch (InterruptedException | ExecutionException e) {
			throw new DatabaseException(e);
		}
	}

	@SuppressWarnings("rawtypes")
	@Override
	public HashMap<String, Integer> getTagSummary() throws DatabaseException {
		HashMap<String, Integer> result = new HashMap<String, Integer>();
		try {
			for (DocumentReference ref : fireStore.collection(TAGS_COLLECTION).listDocuments()) {
				result.put(ref.getId(), ((List) ref.get().get().get("reference")).size());
			}
		} catch (InterruptedException | ExecutionException e) {
			throw new DatabaseException(e);
		}
		return result;
	}

	@Override
	public List<Recipe> findWithTag(String tag) throws DatabaseException {
		List<Recipe> result = new ArrayList<Recipe>();
		try {
			DocumentSnapshot tagSnapshot = fireStore.collection(TAGS_COLLECTION).document(tag).get().get();
			if (tagSnapshot.exists()) {
				for (Object value : tagSnapshot.getData().values()) {
					DocumentSnapshot recipeSnapshot = ((DocumentReference) value).get().get();
					result.add(recipeSnapshot.toObject(Recipe.class));
				}
			}
		} catch (InterruptedException | ExecutionException e) {
			throw new DatabaseException(e);
		}

		return result;
	}

	private DocumentReference findRecipe(String recipeId)
			throws RecipeNotFound, InterruptedException, ExecutionException {
		return fireStore.collection(Recipe.class.getSimpleName()).document(recipeId);
	}
}
