from flask import jsonify

from connectDB import select_db_query, update_db_query, insert_db_query, delete_db_query, instraction_query, \
    ingredient_query
from entities.recipe import Recipe


def get_all_recipes():
    query = "SELECT * FROM Recipe;"
    recipes_data = select_db_query(query, "all")
    recipe_list = []
    for recipe in recipes_data:
        recipe_id = recipe[0]
        query_instructions = f"SELECT Instruction FROM RecipeInstructions WHERE RecipeCode = {recipe_id};"
        instructions_data = select_db_query(query_instructions, "all")
        instructions = []
        for ins in instructions_data:
            instructions.append(ins[0])
        query_ingredients = f"SELECT Ingredient FROM RecipeIngredients WHERE RecipeCode = {recipe_id};"
        ingredients_data = select_db_query(query_ingredients, "all")
        ingredients = [ing[0] for ing in ingredients_data]
        recipe_dict = {
            'recipeCode': recipe[0],
            'recipeName': recipe[1],
            'preparation': recipe[2],
            'difficulty': recipe[3],
            'dateAdded': recipe[4],
            'image': recipe[5],
            'userCode': recipe[6],
            'categoryCode': recipe[7],
            'instructions': instructions,
            'ingredients': ingredients
        }
        recipe_list.append(recipe_dict)
    return recipe_list, 200


def get_recipe(id):
    query = f"SELECT * FROM Recipe WHERE RecipeCode = {id};"
    recipe_data = select_db_query(query, "one")
    if not recipe_data.__contains__("error"):
        query_instructions = f"SELECT Instruction FROM RecipeInstructions WHERE RecipeCode = {id};"
        instructions_data = select_db_query(query_instructions, "all")
        query_ingredients = f"SELECT Ingredient FROM RecipeIngredients WHERE RecipeCode = {id};"
        ingredients_data = select_db_query(query_ingredients, "all")
        instructions = [ins[0] for ins in instructions_data]
        ingredients = [ing[0] for ing in ingredients_data]
        recipe = {
            'recipeCode': recipe_data[0],
            'recipeName': recipe_data[1],
            'preparation': recipe_data[2],
            'difficulty': recipe_data[3],
            'dateAdded': recipe_data[4],
            'image': recipe_data[5],
            'userCode': recipe_data[6],
            'categoryCode': recipe_data[7],
            'instructions': instructions,
            'ingredients': ingredients
        }
        return recipe, 200
    elif recipe_data == "error: not found":
        return recipe_data, 404
    else:
        return recipe_data, 400


def post_recipe(data):
    if Recipe.required_fields(data):
        data['dateAdded'] = Recipe.convert_date(data['dateAdded'])
        new_recipe = Recipe(id, data['recipeName'], data['preparation'], data['difficulty'], data['dateAdded'],
                            data['image'], data['userCode'], data['categoryCode'], data.get('instructions', []),
                            data.get('ingredients', []))
        print(new_recipe.instructions)
        query = f" INSERT INTO Recipe ( RecipeName, CategoryCode, Preparation, Difficulty, DateAdded, Image, UserCode) VALUES ('{new_recipe.recipeName}', {new_recipe.categoryCode}, {new_recipe.preparation}, {new_recipe.difficulty},'{new_recipe.dateAdded}','{new_recipe.image}',{new_recipe.userCode})"
        res, new_id = insert_db_query(query)
        if res:
            for ingredient in new_recipe.ingredients:
                query_ingredient = f"INSERT INTO RecipeIngredients (RecipeCode, Ingredient) VALUES ({new_id},'{ingredient}')"
                res, new_id2 = insert_db_query(query_ingredient)
            for instruction in new_recipe.instructions:
                query_instruction = f"INSERT INTO RecipeInstructions (RecipeCode, Instruction) VALUES ({new_id},'{instruction}')"
                res, new_id3 = insert_db_query(query_instruction)
            created_recipe = {
                'recipeCode': new_id,
                'recipeName': new_recipe.recipeName,
                'preparation': new_recipe.preparation,
                'difficulty': new_recipe.difficulty,
                'dateAdded': new_recipe.dateAdded,
                'image': new_recipe.image,
                'userCode': new_recipe.userCode,
                'categoryCode': new_recipe.categoryCode,
                'instructions': new_recipe.instructions,
                'ingredients': new_recipe.ingredients
            }
            return created_recipe, 201
        else:
            return "Error retrieving created user", 500
    else:
        return "missing details", 500


def put_recipe(id, data):
    print(data)
    if Recipe.required_fields(data):
        data['dateAdded'] = Recipe.convert_date(data['dateAdded'])
        recipe_update = Recipe(id, data['recipeName'], data['preparation'],
                               data['difficulty'], data['dateAdded'], data['image'],
                               data['userCode'], data['categoryCode'],
                               data.get('instructions', []), data.get('ingredients', []))
        query = f"""UPDATE Recipe SET RecipeName='{recipe_update.recipeName}', Preparation='{recipe_update.preparation}',
         Difficulty='{recipe_update.difficulty}', DateAdded='{recipe_update.dateAdded}',Image='{recipe_update.image}',
         UserCode='{recipe_update.userCode}', CategoryCode='{recipe_update.categoryCode}' WHERE RecipeCode='{id}'"""
        res = update_db_query(query)
        if not res.__contains__("error"):
            for index, ingredient in enumerate(recipe_update.ingredients):
                query_ing = ingredient_query(ingredient, id, index)
                ing_data = update_db_query(query_ing)
            for index, instruction in enumerate(recipe_update.instructions):
                query_ins = instraction_query(instruction, id, index)
                ins_data = update_db_query(query_ins)
            recipe_update, status = get_recipe(id)
            return recipe_update, 201
        else:
            return res, 400
    else:
        return jsonify({"error": f"Missing required field"}), 400


def delete_recipe(id):
    delete_data = delete_db_query("RecipeIngredients", "RecipeCode", id)
    delete_data = delete_db_query("RecipeInstructions", "RecipeCode", id)
    delete_data = delete_db_query("Recipe", "RecipeCode", id)
    if not delete_data.__contains__("error"):
        return {"res": delete_data}, 200
    else:
        return {"res": delete_data}, 400
