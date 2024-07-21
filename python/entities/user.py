class User:
    def __init__(self, name, address, email, password):
        self.name = name
        self.address = address
        self.email = email
        self.password = password

    def __str__(self):
        return f"name={self.name}, address={self.address}, email={self.email}, password={self.password}"

    def required_fields(data):
        required_fields = ['name', 'address', 'email', 'password']
        for field in required_fields:
            if field not in data:
                return False
        else:
            return True
