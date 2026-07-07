from . import DB
from .models import Market, Price, Product


def seed_database():
    if Market.query.count() == 0:
        markets = [
        Market(name="Assaí", address="Av. Paulista, 1000", city="São Paulo"),
        Market(name="Atacadão", address="Rua do Comércio, 300", city="Campinas"),
        Market(name="Carrefour", address="Rua das Flores, 450", city="São Paulo"),
        Market(name="Extra", address="Av. Brasil, 200", city="Ribeirão Preto"),
        Market(name="Sonda", address="Rua da Praia, 80", city="São Paulo"),
        Market(name="Dia", address="Av. Nova, 520", city="Campinas"),
    ]
        DB.session.add_all(markets)
        DB.session.commit()

    products = [
        {"name": "Arroz", "brand": "Camil", "category": "Alimentos", "image_url": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80"},
        {"name": "Arroz", "brand": "Tio João", "category": "Alimentos", "image_url": "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80"},
        {"name": "Arroz", "brand": "Prato Fino", "category": "Alimentos", "image_url": "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&w=600&q=80"},
        {"name": "Feijão", "brand": "Kicaldo", "category": "Alimentos", "image_url": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"},
        {"name": "Feijão", "brand": "Camil", "category": "Alimentos", "image_url": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"},
        {"name": "Feijão", "brand": "Urbano", "category": "Alimentos", "image_url": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"},
        {"name": "Macarrão", "brand": "Parmalat", "category": "Alimentos", "image_url": "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=600&q=80"},
        {"name": "Macarrão", "brand": "Adria", "category": "Alimentos", "image_url": "https://images.unsplash.com/photo-1619895092538-128341789043?auto=format&fit=crop&w=600&q=80"},
        {"name": "Macarrão", "brand": "Renata", "category": "Alimentos", "image_url": "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=600&q=80"},
        {"name": "Leite", "brand": "Integral", "category": "Laticínios", "image_url": "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80"},
        {"name": "Leite", "brand": "Batavo", "category": "Laticínios", "image_url": "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80"},
        {"name": "Leite", "brand": "Itambé", "category": "Laticínios", "image_url": "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80"},
        {"name": "Iogurte", "brand": "Danone", "category": "Laticínios", "image_url": "https://images.unsplash.com/photo-1571212515412-0b7f34f9f5d4?auto=format&fit=crop&w=600&q=80"},
        {"name": "Queijo", "brand": "Seara", "category": "Laticínios", "image_url": "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=600&q=80"},
        {"name": "Manteiga", "brand": "Liza", "category": "Laticínios", "image_url": "https://images.unsplash.com/photo-1589881133595-a3c085cb731d?auto=format&fit=crop&w=600&q=80"},
        {"name": "Pão", "brand": "Pullman", "category": "Padaria", "image_url": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"},
        {"name": "Pão", "brand": "Bimbo", "category": "Padaria", "image_url": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"},
        {"name": "Pão", "brand": "Panco", "category": "Padaria", "image_url": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"},
        {"name": "Café", "brand": "Pilão", "category": "Bebidas", "image_url": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80"},
        {"name": "Café", "brand": "3 Corações", "category": "Bebidas", "image_url": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80"},
        {"name": "Café", "brand": "Nescafé", "category": "Bebidas", "image_url": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80"},
        {"name": "Achocolatado", "brand": "Nescau", "category": "Bebidas", "image_url": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80"},
        {"name": "Refrigerante", "brand": "Coca-Cola", "category": "Bebidas", "image_url": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"},
        {"name": "Refrigerante", "brand": "Guaraná Antarctica", "category": "Bebidas", "image_url": "https://images.unsplash.com/photo-1581579185164-4c0df4c1c6f4?auto=format&fit=crop&w=600&q=80"},
        {"name": "Refrigerante", "brand": "Pepsi", "category": "Bebidas", "image_url": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"},
        {"name": "Água", "brand": "Crystal", "category": "Bebidas", "image_url": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80"},
        {"name": "Sabão em Pó", "brand": "OMO", "category": "Limpeza", "image_url": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80"},
        {"name": "Sabão em Pó", "brand": "Tixan", "category": "Limpeza", "image_url": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80"},
        {"name": "Sabão em Pó", "brand": "Ariel", "category": "Limpeza", "image_url": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80"},
        {"name": "Detergente", "brand": "Ypê", "category": "Limpeza", "image_url": "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?auto=format&fit=crop&w=600&q=80"},
        {"name": "Detergente", "brand": "Veja", "category": "Limpeza", "image_url": "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?auto=format&fit=crop&w=600&q=80"},
        {"name": "Desinfetante", "brand": "Pinho Sol", "category": "Limpeza", "image_url": "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=600&q=80"},
        {"name": "Papel Higiênico", "brand": "Neve", "category": "Higiene", "image_url": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"},
        {"name": "Papel Higiênico", "brand": "Softys", "category": "Higiene", "image_url": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"},
        {"name": "Shampoo", "brand": "Head & Shoulders", "category": "Higiene", "image_url": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80"},
        {"name": "Shampoo", "brand": "Pantene", "category": "Higiene", "image_url": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80"},
        {"name": "Sabonete", "brand": "Dove", "category": "Higiene", "image_url": "https://images.unsplash.com/photo-1608571424352-9261a1e1e6f2?auto=format&fit=crop&w=600&q=80"},
        {"name": "Sabonete", "brand": "Protex", "category": "Higiene", "image_url": "https://images.unsplash.com/photo-1608571424352-9261a1e1e6f2?auto=format&fit=crop&w=600&q=80"},
        {"name": "Biscoito", "brand": "Trakinas", "category": "Snacks", "image_url": "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=600&q=80"},
        {"name": "Biscoito", "brand": "Nestlé", "category": "Snacks", "image_url": "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=600&q=80"},
        {"name": "Bolacha", "brand": "Passatempo", "category": "Snacks", "image_url": "https://images.unsplash.com/photo-1588783948928-8e08b26e2efd?auto=format&fit=crop&w=600&q=80"},
        {"name": "Bolacha", "brand": "Oreos", "category": "Snacks", "image_url": "https://images.unsplash.com/photo-1588783948928-8e08b26e2efd?auto=format&fit=crop&w=600&q=80"},
        {"name": "Sopa", "brand": "Campbell", "category": "Alimentos", "image_url": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"},
        {"name": "Sopa", "brand": "Knorr", "category": "Alimentos", "image_url": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"},
        {"name": "Azeite", "brand": "Andorinha", "category": "Alimentos", "image_url": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"},
        {"name": "Carne bovina", "brand": "Friboi", "category": "Carnes", "image_url": "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=600&q=80"},
        {"name": "Carne suína", "brand": "Sadia", "category": "Carnes", "image_url": "https://images.unsplash.com/photo-1601924582975-2f949df0a8a4?auto=format&fit=crop&w=600&q=80"},
        {"name": "Linguiça", "brand": "Perdigão", "category": "Carnes", "image_url": "https://images.unsplash.com/photo-1606756793960-51e3571441b2?auto=format&fit=crop&w=600&q=80"},
        {"name": "Linguiça calabresa", "brand": "Perdigão", "category": "Carnes", "image_url": "https://images.unsplash.com/photo-1595152772835-219674b2a8a8?auto=format&fit=crop&w=600&q=80"},
        {"name": "Linguiça toscana", "brand": "Aurora", "category": "Carnes", "image_url": "https://images.unsplash.com/photo-1595152772835-219674b2a8a8?auto=format&fit=crop&w=600&q=80"},
        {"name": "Picanha", "brand": "Friboi", "category": "Carnes", "image_url": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80"},
        {"name": "Alcatra", "brand": "Friboi", "category": "Carnes", "image_url": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80"},
        {"name": "Coxa de frango", "brand": "Sadia", "category": "Carnes", "image_url": "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80"},
    ]

    for payload in products:
        if not Product.query.filter_by(name=payload["name"], brand=payload["brand"]).first():
            product = Product(**payload)
            DB.session.add(product)

    DB.session.commit()
