from flask import Flask, request, jsonify
import models.userModel as userModel
import models.categoryModel as categoryModel
import models.recipyModel as recipeModel
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
cors = CORS(app)


@app.route("/")
def server():
    return "server is running"


@app.route("/User")
def get_all_users():
    res, status = userModel.get_users()
    return res, status


@app.route("/User/<int:id>", methods=['GET'])
def get_user_by_id(id):
    res, status = userModel.get_user(id)
    return res, status


@app.route('/User', methods=['POST'])
def add_user():
    user = request.json
    res, status = userModel.post_user(user)
    return jsonify(res), status


@app.route("/User/<id>", methods=["PUT"])
def update_user(id):
    updated_user = request.json
    res, status = userModel.put_user(id, updated_user)
    return res, status


@app.route("/Category")
def get_categories():
    res = categoryModel.get_categories()
    return res


@app.route("/Category/<int:id>")
def get_category_by_id(id):
    res, status = categoryModel.get_category(id)
    return res, status


@app.route("/Recipe", methods=["GET"])
def get_recipes():
    res, status = recipeModel.get_all_recipes()
    return res, status


@app.route("/Recipe/<id>", methods=["GET"])
def get_recipe_by_id(id):
    res, status = recipeModel.get_recipe(id)
    return res, status


@app.route("/Recipe/<id>", methods=["DELETE"])
def remove_recipe(id):
    res, status = recipeModel.delete_recipe(id)
    return res, status


@app.route("/Recipe", methods=["POST"])
def add_recipe():
    recipe = request.json
    res, status = recipeModel.post_recipe(recipe)
    return res, status


@app.route("/Recipe/<int:id>", methods=["PUT"])
def update_recipe(id):
    data = request.json
    res, status = recipeModel.put_recipe(id, data)
    return jsonify(res), status


port_number = 3000
if __name__ == "__main__":
    app.run(port=port_number)
