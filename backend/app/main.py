from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import datetime

# URL de conexão com o MySQL
DATABASE_URL = "mysql+pymysql://root:2012@localhost:3306/cadastro"

# Configuração do SQLAlchemy
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

# Modelo do banco de dados
class Membro(Base):
    __tablename__ = "membros"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=True)
    tell = Column(String(20), nullable=False)
    endereco = Column(String(255), nullable=False)
    cpf = Column(String(20), nullable=True)
    nascimento = Column(Date, nullable=False)

# Cria a tabela no banco de dados
Base.metadata.create_all(bind=engine)

# Schema do Pydantic para validação de dados
class MembroSchema(BaseModel):
    name: str
    email: str | None = None
    tell: str
    endereco: str
    cpf: str | None = None
    nascimento: str  # Recebido como string no formato YYYY-MM-DD

    class Config:
        from_attributes = True

# Inicializa a aplicação FastAPI
app = FastAPI(title="Cadastro de Membros")

# Configurações de CORS
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Endpoint para listar usuários
@app.get("/usuarios")
def listar_usuarios():
    db = SessionLocal()
    membros = db.query(Membro).all()
    db.close()
    return membros

# Endpoint para criar usuário
@app.post("/usuarios")
def criar_usuario(membro: MembroSchema):
    db = SessionLocal()
    try:
        # Converte string para date
        nascimento_date = datetime.datetime.strptime(membro.nascimento, "%Y-%m-%d").date()

        # Cria novo membro
        novo_membro = Membro(
            name=membro.name,
            email=membro.email,
            tell=membro.tell,
            endereco=membro.endereco,
            cpf=membro.cpf,
            nascimento=nascimento_date
        )

        db.add(novo_membro)
        db.commit()
        db.refresh(novo_membro)
        return novo_membro
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        db.close()