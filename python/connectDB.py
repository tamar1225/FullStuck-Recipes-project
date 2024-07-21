import pyodbc
from config import con_str


def select_db_query(query, fetch):
    try:
        with pyodbc.connect(con_str) as connection:
            cursor = connection.cursor()
            cursor.execute(query)
            if fetch == "all":
                res = cursor.fetchall()
            else:
                res = cursor.fetchone()
            if res:
                return res
            else:
                return "error: not found"
    except Exception as e:
        return f"error: {e}"


def update_db_query(query):
    try:
        with pyodbc.connect(con_str) as connection:
            cursor = connection.cursor()
            cursor.execute(query)
            connection.commit()
            if cursor.rowcount > 0:
                return "added successfully"
            else:
                return "error: could not update"
    except Exception as e:
        return False, f"error: {e}"


def insert_db_query(query):
    try:
        with pyodbc.connect(con_str) as connection:
            cursor = connection.cursor()
            cursor.execute(query)
            connection.commit()
            # Get the ID of the last record added
            cursor.execute("SELECT SCOPE_IDENTITY()")
            new_id = cursor.fetchone()[0]
            if new_id:
                return True, new_id
            return False, "failed to retrieve new ID"
    except Exception as e:
        return False, f"error: {e}"


def delete_db_query(table, coulmn, value):
    try:
        with pyodbc.connect(con_str) as connection:
            cursor = connection.cursor()
            cursor.execute(f"DELETE FROM {table} WHERE {coulmn} = {value};")
            connection.commit()
            if cursor.rowcount > 0:
                return "res: deleted successfully"
            else:
                return "error: could not delete"
    except Exception as e:
        return False, f"error: {e}"


def ingredient_query(ingredient, id, index):
    query2 = f"""
                    WITH OrderedIngredients AS (
                    SELECT IngredientID, ROW_NUMBER() OVER (ORDER BY IngredientID) AS RowNum
                    FROM RecipeIngredients
                    WHERE RecipeCode = {id}
                    )
                    UPDATE RI
                    SET Ingredient = '{ingredient}'
                    FROM RecipeIngredients RI
                    JOIN OrderedIngredients OI ON RI.IngredientID = OI.IngredientID
                    WHERE OI.RowNum = {index + 1};
                    """
    return query2


def instraction_query(instruction, id, index):
    query3 = f"""
                    WITH OrderedInstructions AS (
                    SELECT InstructionID, ROW_NUMBER() OVER (ORDER BY InstructionID) AS RowNum
                    FROM RecipeInstructions
                    WHERE RecipeCode = {id}
                    )
                    UPDATE RI
                    SET Instruction = '{instruction}'
                    FROM RecipeInstructions RI
                    JOIN OrderedInstructions OI ON RI.InstructionID = OI.InstructionID
                    WHERE OI.RowNum = {index + 1};
                    """
    return query3
