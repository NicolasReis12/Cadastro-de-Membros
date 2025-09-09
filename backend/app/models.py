from sqlalchemy import Column, Integer, String, Date
from .database import Base

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=True)
    tell = Column(String(20), nullable=False)
    endereco = Column(String(255), nullable=False)
    cpf = Column(String(20), nullable=True)
    nascimento = Column(Date, nullable=False)