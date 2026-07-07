from datetime import datetime

from flask_login import UserMixin
from werkzeug.security import check_password_hash, generate_password_hash

from . import DB


class User(DB.Model, UserMixin):
    __tablename__ = "usuarios"

    id = DB.Column(DB.Integer, primary_key=True)
    name = DB.Column(DB.String(120), nullable=False)
    email = DB.Column(DB.String(255), unique=True, nullable=False)
    password_hash = DB.Column(DB.String(255), nullable=False)
    created_at = DB.Column(DB.DateTime, default=datetime.utcnow)

    favorites = DB.relationship("Favorite", backref="user", lazy=True, cascade="all, delete-orphan")
    cadastros = DB.relationship("UserCadastro", backref="user", lazy=True, cascade="all, delete-orphan")
    prices = DB.relationship("Price", backref="creator", lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class Market(DB.Model):
    __tablename__ = "mercados"

    id = DB.Column(DB.Integer, primary_key=True)
    name = DB.Column(DB.String(120), nullable=False, unique=True)
    address = DB.Column(DB.String(255), nullable=False)
    city = DB.Column(DB.String(120), nullable=False)
    created_at = DB.Column(DB.DateTime, default=datetime.utcnow)

    prices = DB.relationship("Price", backref="market", lazy=True, cascade="all, delete-orphan")
    cadastros = DB.relationship("UserCadastro", backref="market", lazy=True, cascade="all, delete-orphan")


class Product(DB.Model):
    __tablename__ = "produtos"

    id = DB.Column(DB.Integer, primary_key=True)
    name = DB.Column(DB.String(180), nullable=False)
    brand = DB.Column(DB.String(180), nullable=False)
    category = DB.Column(DB.String(120), nullable=False)
    image_url = DB.Column(DB.String(500), nullable=True)
    created_at = DB.Column(DB.DateTime, default=datetime.utcnow)

    prices = DB.relationship("Price", backref="product", lazy=True, cascade="all, delete-orphan")
    favorites = DB.relationship("Favorite", backref="product", lazy=True, cascade="all, delete-orphan")
    cadastros = DB.relationship("UserCadastro", backref="product", lazy=True, cascade="all, delete-orphan")


class Price(DB.Model):
    __tablename__ = "precos"

    id = DB.Column(DB.Integer, primary_key=True)
    product_id = DB.Column(DB.Integer, DB.ForeignKey("produtos.id"), nullable=False)
    market_id = DB.Column(DB.Integer, DB.ForeignKey("mercados.id"), nullable=False)
    price = DB.Column(DB.Numeric(10, 2), nullable=False)
    created_by_id = DB.Column(DB.Integer, DB.ForeignKey("usuarios.id"), nullable=True)
    created_at = DB.Column(DB.DateTime, default=datetime.utcnow)

    cadastros = DB.relationship("UserCadastro", backref="price", lazy=True, cascade="all, delete-orphan")


class Favorite(DB.Model):
    __tablename__ = "favoritos"

    id = DB.Column(DB.Integer, primary_key=True)
    user_id = DB.Column(DB.Integer, DB.ForeignKey("usuarios.id"), nullable=False)
    product_id = DB.Column(DB.Integer, DB.ForeignKey("produtos.id"), nullable=False)
    created_at = DB.Column(DB.DateTime, default=datetime.utcnow)

    __table_args__ = (DB.UniqueConstraint("user_id", "product_id", name="uq_favorite_user_product"),)


class UserCadastro(DB.Model):
    __tablename__ = "cadastros_usuario"

    id = DB.Column(DB.Integer, primary_key=True)
    user_id = DB.Column(DB.Integer, DB.ForeignKey("usuarios.id"), nullable=False)
    product_id = DB.Column(DB.Integer, DB.ForeignKey("produtos.id"), nullable=False)
    market_id = DB.Column(DB.Integer, DB.ForeignKey("mercados.id"), nullable=False)
    price_id = DB.Column(DB.Integer, DB.ForeignKey("precos.id"), nullable=False)
    created_at = DB.Column(DB.DateTime, default=datetime.utcnow)
    updated_at = DB.Column(DB.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    __table_args__ = (DB.UniqueConstraint("user_id", "price_id", name="uq_user_cadastro_price"),)
