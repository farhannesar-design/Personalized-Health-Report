from passlib.context import CryptContext

from werkzeug.security import generate_password_hash, check_password_hash
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class Hasher():
    @staticmethod
    def verify_password(plain_password, hashed_password):
        return pwd_context.verify(plain_password, hashed_password)
        # return check_password_hash(plain_password, hashed_password)


    @staticmethod
    def get_password_hash(password):
        return pwd_context.hash(password)
        # return generate_password_hash(password)
    
Hasher.get_password_hash("aa")
print("myprint=", Hasher.get_password_hash("aa"))
print(Hasher.verify_password("aa","$2b$12$YHxoKyEd4OWhg0cA8CVuieMEHwax0iDv.pmCdpZ8kd95JJzUFhsGy"))
print(Hasher.verify_password("aa","$2b$12$BI098xQLSIE3LDsb779mhu4Q9woSzavxkGgQJIGa342DiCm9kN.em"))
