package com.nina.mealplan.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.FieldPath;
import com.google.cloud.firestore.FieldValue;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.common.collect.Maps;
import com.nina.mealplan.dm.Recipe;
import com.nina.mealplan.exception.DatabaseException;
import com.nina.mealplan.exception.RecipeNotFound;

import lombok.Getter;

@Service
public class RecipeService {

	@Autowired
	@Getter
	private Firestore fireStore;

	public Set<String> getTags() throws DatabaseException {
		Set<String> result = new HashSet<String>();

		try {
			for (QueryDocumentSnapshot snapshot : getRecipeTagCollection().get().get().getDocuments()) {
				result.add(snapshot.getId());
			}

		} catch (InterruptedException | ExecutionException e) {
			throw new DatabaseException(e);
		}

		return result;
	}

	public Recipe create(Recipe recipe) throws DatabaseException {
		Recipe addedRecipe = null;

		try {
			// add recipe first
			recipe.setId(UUID.randomUUID().toString());
			DocumentReference recipeRef = getRecipeCollection().document(recipe.getId());
			recipeRef.set(recipe).get();

			for (String tag : recipe.getTags()) {
				DocumentReference tagRef = getTag(tag);
				if (!tagRef.get().get().exists()) {
					// this is new tag, need to create it
					Map<String, FieldValue> values = Maps.newHashMap();
					values.put("Recipes", FieldValue.arrayUnion(recipeRef));
					tagRef.set(values).get();
				} else {
					tagRef.update("Recipes", FieldValue.arrayUnion(recipeRef)).get();
				}
			}

			addedRecipe = recipeRef.get().get().toObject(Recipe.class);
		} catch (InterruptedException | ExecutionException e) {
			throw new DatabaseException(e);
		}

		return addedRecipe;
	}

	public Recipe save(Recipe recipe) throws DatabaseException {
		// FIXME: support real update; need to figure out which fields changed.
		delete(recipe.getId());
		return create(recipe);
	}

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

	@SuppressWarnings("unchecked")
	public void delete(String recipeId) throws DatabaseException {
		try {
			DocumentReference recipeRef = getRecipe(recipeId);
			DocumentSnapshot snapshot = recipeRef.get().get();
			if (snapshot.exists()) {
				// delete tags
				for (String tag : (List<String>) snapshot.get(FieldPath.of("tags"))) {
					DocumentReference tagRef = getTag(tag);
					tagRef.update("Recipes", FieldValue.arrayRemove(recipeRef));

					// if the tag contains no recipe, remove the tag
					List<DocumentReference> recipesRefs = (List<DocumentReference>) tagRef.get().get().get("Recipes");
					if (recipesRefs.size() == 0) {
						tagRef.delete().get();
					}
				}

				// delete recipe
				recipeRef.delete().get();

			}
		} catch (InterruptedException | ExecutionException e) {
			throw new DatabaseException(e);
		}
	}

	public Map<String, Integer> getTagSummary() throws DatabaseException {
		Map<String, Integer> result = new HashMap<String, Integer>();
		for (String tag : getTags()) {
			int size = getRecipeRefsWithTag(tag).size();
			if (size > 0) {
				result.put(tag, size);
			}
		}
		return result;
	}

	public List<Recipe> getRecipesWithTag(String tag) throws DatabaseException {
		List<Recipe> result = new ArrayList<Recipe>();

		for (DocumentReference recipeRef : getRecipeRefsWithTag(tag)) {
			try {
				result.add(recipeRef.get().get().toObject(Recipe.class));
			} catch (InterruptedException | ExecutionException e) {
				throw new DatabaseException(e);
			}
		}
		return result;
	}

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

	@SuppressWarnings("unchecked")
	private List<DocumentReference> getRecipeRefsWithTag(String tag) throws DatabaseException {
		List<DocumentReference> result = null;
		try {
			result = (List<DocumentReference>) getTag(tag).get().get().get(FieldPath.of("Recipes"));
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

	private CollectionReference getRecipeTagCollection() {
		return fireStore.collection("RecipeTag");
	}

	private DocumentReference getTag(String tag) {
		return getRecipeTagCollection().document(tag);
	}
}
