from flask import jsonify

from connectDB import select_db_query, update_db_query, insert_db_query
from entities.user import User


def get_users():
    query = "SELECT * FROM Users"
    data = select_db_query(query, "all")
    print(data)
    if not data.__contains__("error"):
        users_list = []
        for user in data:
            user_dict = {
                'code': user[0],
                'name': user[1],
                'address': user[2],
                'email': user[3],
                'password': user[4]
            }
            users_list.append(user_dict)
        return users_list, 200
    else:
        return data, 400


def get_user(id):
    query = f"SELECT * FROM Users WHERE code={id}"
    data = select_db_query(query, "one")
    print(data)
    if not data.__contains__("error"):
        user = {
            "code": data.Code,
            "name": data.Name,
            "address": data.Address,
            "email": data.Email,
            "password": data.Password
        }
        return user, 200
    elif data == "error: not found":
        return data, 404
    else:
        return data, 400


def post_user(data):
    if User.required_fields(data):
        new_user = User(name=data['name'], address=data['address'], email=data['email'], password=data['password'])
        query = f"INSERT INTO USERS (name, address, email, password) VALUES ('{new_user.name}', '{new_user.address}', '{new_user.email}', '{new_user.password}')"
        res, new_id = insert_db_query(query)
        if res:
            created_user = {
                "code": new_id,
                "name": new_user.name,
                "address": new_user.address,
                "email": new_user.email,
                "password": new_user.password
            }
            return created_user, 201
        else:
            return new_id, 400


def put_user(id, data):
    if User.required_fields(data):
        updated_user = User(name=data['name'], address=data['address'], email=data['email'], password=data['password'])
        query = f"UPDATE USERS SET name='{updated_user.name}', address='{updated_user.address}', email='{updated_user.email}', password='{updated_user.password}' WHERE code='{id}'"
        user_data = update_db_query(query)
        if not user_data.__contains__("error"):
            updated_user = {
                "code": id,
                "name": updated_user.name,
                "address": updated_user.address,
                "email": updated_user.email,
                "password": updated_user.password
            }
            return updated_user, 201
        elif data == "error: not found":
            return data, 404
        else:
            return user_data, 400
