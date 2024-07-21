from datetime import datetime


class Recipe:
    def __init__(self, recipeCode, recipeName, preparation, difficulty, dateAdded, image, userCode, categoryCode,
                 instruction, ingredient):
        self.recipeCode = recipeCode
        self.recipeName = recipeName
        self.preparation = preparation
        self.difficulty = difficulty
        self.dateAdded = dateAdded
        self.image = image
        self.userCode = userCode
        self.categoryCode = categoryCode
        self.instructions = instruction
        self.ingredients = ingredient

    def required_fields(data):
        required_fields = ['recipeName', 'preparation', 'difficulty', 'dateAdded', 'image', 'userCode', 'categoryCode']
        for field in required_fields:
            if field not in data:
                return False
        else:
            return True

    def convert_date(date_convert):
        try:
            date_obj = datetime.strptime(date_convert, "%Y-%m-%dT%H:%M:%S.%fZ")
        except ValueError:
            # אם התאריך לא תואם את הפורמט המצופה, יוחזר תאריך בפורמט רגיל
            date_obj = datetime.strptime(date_convert, "%Y-%m-%d")
        print(date_obj.strftime("%Y-%m-%d"))
        return date_obj.strftime("%Y-%m-%d")
