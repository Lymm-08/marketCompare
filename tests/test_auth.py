from decimal import Decimal

import pytest

from app import app
from backend.app.models import DB, Market, Price, Product, User, UserCadastro


@pytest.fixture()
def client():
    app.config.update(TESTING=True)
    with app.test_client() as client:
        yield client


def test_login_page_loads(client):
    response = client.get('/login')
    assert response.status_code == 200


def test_register_page_loads(client):
    response = client.get('/cadastro')
    assert response.status_code == 200


def test_reset_password_page_loads(client):
    response = client.get('/recuperar-senha')
    assert response.status_code == 200


def test_meus_cadastros_page_renders_with_existing_entry(client):
    email = 'meuscadastros@example.com'
    client.post('/cadastro', data={
        'name': 'Usuário Teste',
        'email': email,
        'password': '123456',
        'confirm_password': '123456'
    }, follow_redirects=True)

    with app.app_context():
        user = User.query.filter_by(email=email).first()
        market = Market(name='Mercado Teste', address='Rua A', city='São Paulo')
        product = Product(name='Produto Teste', brand='Marca Teste', category='Geral')
        DB.session.add_all([market, product])
        DB.session.commit()

        price = Price(product_id=product.id, market_id=market.id, price=Decimal('12.50'), created_by_id=user.id)
        DB.session.add(price)
        DB.session.commit()

        cadastro = UserCadastro(user_id=user.id, product_id=product.id, market_id=market.id, price_id=price.id)
        DB.session.add(cadastro)
        DB.session.commit()

    response = client.get('/meus-cadastros')
    assert response.status_code == 200
    assert b'Meus cadastros' in response.data
    assert b'Produto Teste' in response.data
