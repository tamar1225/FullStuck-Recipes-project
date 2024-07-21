from connectDB import select_db_query


def get_categories():
    query = "SELECT * FROM Category"
    data = select_db_query(query, "all")
    print(data)
    category_list = []
    for category in data:
        category_dict = {
            "code": category.Code,
            "name": category.Name,
            "url": category.Url
        }
        category_list.append(category_dict)
    return category_list, 200


def get_category(id):
    query = f"SELECT * FROM Category WHERE code={id}"
    data = select_db_query(query, "one")
    print(data)
    if not data.__contains__("error"):
        if data:
            category = {
                "code": data.Code,
                "name": data.Name,
                "url": data.Url
            }
            return category, 200
        else:
            return None, 204
    else:
        return data, 400
