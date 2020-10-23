package com.nina.mealplan.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ExecutionException;

import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.nina.mealplan.dm.Recipe;
import com.nina.mealplan.exception.DatabaseException;
import com.nina.mealplan.exception.RecipeNotFound;

import lombok.Getter;

@Service
public class RecipeServiceImpl implements RecipeService {

	@Autowired
	@Getter
	private Firestore fireStore;

	@SuppressWarnings("unchecked")
	@Override
	public Set<String> getTags() throws DatabaseException {
		Set<String> result = new HashSet<String>();

		try {
			Iterable<DocumentReference> refs = getRecipeCollection().listDocuments();
			for (DocumentReference ref : refs) {
				result.addAll((List<String>) ref.get().get().get("tags"));
			}
		} catch (InterruptedException | ExecutionException e) {
			throw new DatabaseException(e);
		}

		return result;
	}

	@Override
	public Recipe create(Recipe recipe) throws DatabaseException {
		ApiFuture<DocumentReference> future = getRecipeCollection().add(recipe);

		Recipe addedRecipe = null;
		try {
			DocumentReference recipeRef = future.get();
			recipeRef.update("id", recipeRef.getId()).get();
			addedRecipe = recipeRef.get().get().toObject(Recipe.class);
		} catch (InterruptedException | ExecutionException e) {
			throw new DatabaseException(e);
		}

		return addedRecipe;
	}

	@Override
	public Recipe save(Recipe recipe) throws DatabaseException {
		delete(recipe.getId());
		return create(recipe);
	}

	@Override
	public Recipe get(String recipeId) throws DatabaseException {
		Recipe recipe = null;
		try {
			DocumentReference ref = getRecipe(recipeId);
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
	public List<Recipe> getAll() throws DatabaseException {
		List<Recipe> recipes = new ArrayList<Recipe>();
		try {
			for (QueryDocumentSnapshot snapshot : getRecipeCollection().get().get().getDocuments()) {
				recipes.add(snapshot.toObject(Recipe.class));
			}
		} catch (InterruptedException | ExecutionException e) {
			throw new DatabaseException(e);
		}
		return recipes;
	}

	@Override
	public void delete(String recipeId) throws DatabaseException {
		try {
			DocumentReference recipeRef = getRecipe(recipeId);
			if (recipeRef.get().get().exists()) {
				recipeRef.delete().get();
			}
		} catch (InterruptedException | ExecutionException e) {
			throw new DatabaseException(e);
		}
	}

	@Override
	public Map<String, Integer> getTagSummary() throws DatabaseException {
		HashMap<String, Integer> result = new HashMap<String, Integer>();

		for (String tag : getTags()) {
			result.put(tag, getForTag(tag).size());
		}
		return result;
	}

	@Override
	public List<Recipe> getRecipesWithTag(String tag) throws DatabaseException {
		List<Recipe> result = new ArrayList<Recipe>();

		for (QueryDocumentSnapshot snapshot : getForTag(tag)) {
			result.add(snapshot.toObject(Recipe.class));
		}
		return result;
	}

	@Override
	public List<Recipe> search(String searchString) throws DatabaseException {
		if (Strings.isBlank(searchString)) {
			return this.getAll();
		}

		List<Recipe> result = new ArrayList<Recipe>();

		try {
			Query query = getRecipeCollection().whereArrayContains("ingredients.amount", "1");
			ApiFuture<QuerySnapshot> querySnapshot = query.get();
			for (DocumentSnapshot snapshot : querySnapshot.get().getDocuments()) {
				result.add(snapshot.toObject(Recipe.class));
			}
		} catch (InterruptedException | ExecutionException e) {
			throw new DatabaseException(e);
		}
		return result;
	}

	private List<QueryDocumentSnapshot> getForTag(String tag) throws DatabaseException {
		List<QueryDocumentSnapshot> result = null;
		try {
			result = getRecipeCollection().whereArrayContains("tags", tag).get().get().getDocuments();
		} catch (InterruptedException | ExecutionException e) {
			throw new DatabaseException(e);
		}
		return result;
	}

	private DocumentReference getRecipe(String recipeId)
			throws RecipeNotFound, InterruptedException, ExecutionException {
		return getRecipeCollection().document(recipeId);
	}

	private CollectionReference getRecipeCollection() {
		return fireStore.collection(Recipe.class.getSimpleName());
	}
}
