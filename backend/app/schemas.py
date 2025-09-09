from pydantic import BaseModel
from datetime import date

class MembroSchema(BaseModel):
    id: int | None = None
    name: str
    email: str | None = None
    tell: str
    endereco: str
    cpf: str | None = None
    nascimento: date

    model_config = {
        "from_attributes": True,
        "arbitrary_types_allowed": True
    }