from decimal import Decimal

from . import DB
from .models import Market, Price, Product

SEED_PRODUCT_KEYS = set()
SEED_MARKET_KEYS = set()


def seed_database():
    global SEED_MARKET_KEYS
    if Market.query.count() == 0:
        markets = [
            Market(
                name="Assaí",
                address="Av. Paulista, 1000",
                city="São Paulo",
            ),
            Market(
                name="Atacadão",
                address="Rua do Comércio, 300",
                city="Campinas",
            ),
            Market(
                name="Carrefour",
                address="Rua das Flores, 450",
                city="São Paulo",
            ),
            Market(
                name="Extra",
                address="Av. Brasil, 200",
                city="Ribeirão Preto",
            ),
            Market(
                name="Sonda",
                address="Rua da Praia, 80",
                city="São Paulo",
            ),
            Market(
                name="Dia",
                address="Av. Nova, 520",
                city="Campinas",
            ),
        ]
        DB.session.add_all(markets)
        DB.session.commit()

    SEED_MARKET_KEYS = {
        market.name
        for market in Market.query.order_by(Market.id).all()
    }

    products = [
        {
            "name": "Achocolatado",
            "brand": "Nescau",
            "category": "Bebidas",
            "image_url": "/image/achocolatado nescau.jpg",
        },
        {
            "name": "Achocolatado",
            "brand": "Toddy",
            "category": "Bebidas",
            "image_url": "/image/achocolatado toddy.jpg",
        },
        {
            "name": "Achocolatado",
            "brand": "3 Corações",
            "category": "Bebidas",
            "image_url": "/image/achocolatado tres corações.jpg",
        },
        {
            "name": "Água",
            "brand": "Crystal",
            "category": "Bebidas",
            "image_url": "/image/agua.jpg",
        },
        {
            "name": "Arroz",
            "brand": "Camil",
            "category": "Alimentos",
            "image_url": "/image/arroz camil.jpg",
        },
        {
            "name": "Arroz",
            "brand": "Prato Fino",
            "category": "Alimentos",
            "image_url": "/image/arroz prato fino.png",
        },
        {
            "name": "Arroz",
            "brand": "Tio João",
            "category": "Alimentos",
            "image_url": "/image/arroz tio joao.png",
        },
        {
            "name": "Azeite",
            "brand": "Andorinha",
            "category": "Alimentos",
            "image_url": "/image/azeite andorinha.jpg",
        },
        {
            "name": "Azeite",
            "brand": "Gallo",
            "category": "Alimentos",
            "image_url": "/image/azeite galo.jpg",
        },
        {
            "name": "Azeite",
            "brand": "Sol da Toscana",
            "category": "Alimentos",
            "image_url": "/image/azeite sol da toscana.png",
        },
        {
            "name": "Biscoito",
            "brand": "Nestlé",
            "category": "Snacks",
            "image_url": "/image/biscoito da nestle.jpg",
        },
        {
            "name": "Biscoito",
            "brand": "Piraquê",
            "category": "Snacks",
            "image_url": "/image/biscoito piraquê.jpg",
        },
        {
            "name": "Biscoito",
            "brand": "Trakinas",
            "category": "Snacks",
            "image_url": "/image/biscoito trakinas.jpg",
        },
        {
            "name": "Bolacha",
            "brand": "Club Social",
            "category": "Snacks",
            "image_url": "/image/bolacha club social.jpg",
        },
        {
            "name": "Bolacha",
            "brand": "Oreo",
            "category": "Snacks",
            "image_url": "/image/bolacha oreo.jpg",
        },
        {
            "name": "Bolacha",
            "brand": "Passatempo",
            "category": "Snacks",
            "image_url": "/image/bolacha passatempo.jpg",
        },
        {
            "name": "Café",
            "brand": "Pilão",
            "category": "Bebidas",
            "image_url": "/image/café pilão.png",
        },
        {
            "name": "Café",
            "brand": "3 Corações",
            "category": "Bebidas",
            "image_url": "/image/café tres corações.jpg",
        },
        {
            "name": "Café",
            "brand": "Pelé",
            "category": "Bebidas",
            "image_url": "/image/café pelé.jpg",
        },
        {
            "name": "Condicionador",
            "brand": "Dove",
            "category": "Higiene",
            "image_url": "/image/condicionador dove.webp",
        },
        {
            "name": "Condicionador",
            "brand": "Elseve",
            "category": "Higiene",
            "image_url": "/image/condicionador elseve.jpg",
        },
        {
            "name": "Condicionador",
            "brand": "Pantene",
            "category": "Higiene",
            "image_url": "/image/condicionador pnatene.jpg",
        },
        {
            "name": "Desinfetante",
            "brand": "Pinho de Sol",
            "category": "Limpeza",
            "image_url": "/image/desinfetante pinho de sol.jpg",
        },
        {
            "name": "Desinfetante",
            "brand": "Ypê",
            "category": "Limpeza",
            "image_url": "/image/desinfetante ipê.jpg",
        },
        {
            "name": "Desinfetante",
            "brand": "Uau",
            "category": "Limpeza",
            "image_url": "/image/desinfetante uau.jpg",
        },
        {
            "name": "Detergente",
            "brand": "Limpol",
            "category": "Limpeza",
            "image_url": "/image/detergente limpou.jpg",
        },
        {
            "name": "Detergente",
            "brand": "Ypê",
            "category": "Limpeza",
            "image_url": "/image/detergente ypê.webp",
        },
        {
            "name": "Detergente",
            "brand": "Veja",
            "category": "Limpeza",
            "image_url": "/image/detergente veja.jpg",
        },
        {
            "name": "Feijão",
            "brand": "Camil",
            "category": "Alimentos",
            "image_url": "/image/feijão camil.png",
        },
        {
            "name": "Feijão",
            "brand": "Kicaldo",
            "category": "Alimentos",
            "image_url": "/image/feijão kicaldo.jpg",
        },
        {
            "name": "Feijão",
            "brand": "Patcha",
            "category": "Alimentos",
            "image_url": "/image/feijão patcha.jpg",
        },
        {
            "name": "Iogurte",
            "brand": "Danone",
            "category": "Laticínios",
            "image_url": "/image/iorgute danone.jpg",
        },
        {
            "name": "Iogurte",
            "brand": "Vigor",
            "category": "Laticínios",
            "image_url": "/image/iorgute vigor.webp",
        },
        {
            "name": "Iorgute",
            "brand": "Ninho",
            "category": "Laticínios",
            "image_url": "/image/iorgute ninho.jpg",
        },
        {
            "name": "Leite",
            "brand": "Desnatado Italac",
            "category": "Laticínios",
            "image_url": "/image/leite desnatado italac.jpg",
        },
        {
            "name": "Leite",
            "brand": "Desnatado Camponesa",
            "category": "Laticínios",
            "image_url": "/image/leite desnatado camponesa.jpg",
        },
        {
            "name": "Leite",
            "brand": "Desnatado Piracanjuba",
            "category": "Laticínios",
            "image_url": "/image/leite desnatado piracanjuba.jpg",
        },
        {
            "name": "Leite",
            "brand": "Integral Piracanjuba",
            "category": "Laticínios",
            "image_url": "/image/leite integral piracanjuba.jpg",
        },
        {
            "name": "Leite",
            "brand": "Integral Batavo",
            "category": "Laticínios",
            "image_url": "/image/leite integral batavo.jpg",
        },
        {
            "name": "Leite",
            "brand": "Integral",
            "category": "Laticínios",
            "image_url": "/image/leite integral.png",
        },
        {
            "name": "Macarrão",
            "brand": "Adria",
            "category": "Alimentos",
            "image_url": "/image/macarrão adria.png",
        },
        {
            "name": "Macarrão",
            "brand": "Amalia",
            "category": "Alimentos",
            "image_url": "/image/macarrão amalia.jpg",
        },
        {
            "name": "Macarrão",
            "brand": "Parmalat",
            "category": "Alimentos",
            "image_url": "/image/macarrão parmalat.png",
        },
        {
            "name": "Manteiga",
            "brand": "Liza",
            "category": "Laticínios",
            "image_url": "/image/manteiga liza.png",
        },
        {
            "name": "Manteiga",
            "brand": "Catupiry",
            "category": "Laticínios",
            "image_url": "/image/manteiga catupiry.webp",
        },
        {
            "name": "Manteiga",
            "brand": "Mococa",
            "category": "Laticínios",
            "image_url": "/image/manteiga mococa.jpg",
        },
        {
            "name": "Pão",
            "brand": "Balduco",
            "category": "Padaria",
            "image_url": "/image/pão balduco.webp",
        },
        {
            "name": "Pão",
            "brand": "Viscontti",
            "category": "Padaria",
            "image_url": "/image/pão viscontti.jpg",
        },
        {
            "name": "Papel Higiênico",
            "brand": "Dama",
            "category": "Higiene",
            "image_url": "/image/papel higenico dama.jpg",
        },
        {
            "name": "Papel Higiênico",
            "brand": "Neve",
            "category": "Higiene",
            "image_url": "/image/papel higenico neve.jpg",
        },
        {
            "name": "Papel Higiênico",
            "brand": "Cotton",
            "category": "Higiene",
            "image_url": "/image/papel higenico cotton.jpg",
        },
        {
            "name": "Queijo",
            "brand": "Mussarela Aurora",
            "category": "Laticínios",
            "image_url": "/image/queijo mussarela aurora.jpg",
        },
        {
            "name": "Queijo",
            "brand": "Mussarela Mandaká",
            "category": "Laticínios",
            "image_url": "/image/queijo mussarela mandaká.jpg",
        },
        {
            "name": "Queijo",
            "brand": "Mussarela Sadia",
            "category": "Laticínios",
            "image_url": "/image/queijo mussarela sadia.webp",
        },
        {
            "name": "Refrigerante",
            "brand": "Coca-Cola",
            "category": "Bebidas",
            "image_url": "/image/refrigerante coca cola.jpg",
        },
        {
            "name": "Refrigerante",
            "brand": "Fanta",
            "category": "Bebidas",
            "image_url": "/image/refrigerante fanta.jpg",
        },
        {
            "name": "Refrigerante",
            "brand": "Guaraná",
            "category": "Bebidas",
            "image_url": "/image/refrigerante guarana.jpg",
        },
        {
            "name": "Sabonete",
            "brand": "Dove",
            "category": "Higiene",
            "image_url": "/image/sabonete dove.jpg",
        },
        {
            "name": "Sabonete",
            "brand": "Lux",
            "category": "Higiene",
            "image_url": "/image/sabonete lux.jpg",
        },
        {
            "name": "Sabonete",
            "brand": "Protex",
            "category": "Higiene",
            "image_url": "/image/sabonete protex.jpg",
        },
        {
            "name": "Shampoo",
            "brand": "Head & Shoulders",
            "category": "Higiene",
            "image_url": "/image/Shampoo Head & Shoulders.jpg",
        },
        {
            "name": "Shampoo",
            "brand": "Pantene",
            "category": "Higiene",
            "image_url": "/image/shampoo pantene.jpg",
        },
        {
            "name": "Shampoo",
            "brand": "Elseve",
            "category": "Higiene",
            "image_url": "/image/shampoo elseve.jpg",
        },
        {
            "name": "Sopa",
            "brand": "Knorr",
            "category": "Alimentos",
            "image_url": "/image/sopa knorr.jpg",
        },
        {
            "name": "Sopa",
            "brand": "Maggi",
            "category": "Alimentos",
            "image_url": "/image/sopa maggi.jpg",
        },
        {
            "name": "Sopa",
            "brand": "Campibell",
            "category": "Alimentos",
            "image_url": "/image/sopa campibell.jpg",
        },
    ]

    global SEED_PRODUCT_KEYS
    SEED_PRODUCT_KEYS = {
        (payload["name"], payload["brand"])
        for payload in products
    }

    for payload in products:
        product = Product.query.filter_by(
            name=payload["name"],
            brand=payload["brand"],
        ).first()
        if product:
            product.category = payload["category"]
            product.image_url = payload["image_url"]
        else:
            product = Product(**payload)
            DB.session.add(product)

    DB.session.commit()

    def get_seed_product_keys():
        return {
            (payload["name"], payload["brand"])
            for payload in products
        }

    seed_product_keys = get_seed_product_keys()

    product_to_remove = Product.query.filter_by(
        name="Pão",
        brand="Banco Panco",
    ).first()
    if product_to_remove:
        DB.session.delete(product_to_remove)

    for old_test_product in Product.query.filter_by(name="Produto Teste").all():
        DB.session.delete(old_test_product)

    for test_market in Market.query.filter(Market.name.ilike("%teste%"), Market.name != "Atacadão").all():
        DB.session.delete(test_market)

    DB.session.commit()

    default_prices = {
        "Bebidas": Decimal("10.99"),
        "Alimentos": Decimal("8.99"),
        "Snacks": Decimal("6.49"),
        "Laticínios": Decimal("7.49"),
        "Padaria": Decimal("5.99"),
        "Higiene": Decimal("9.49"),
        "Limpeza": Decimal("7.99"),
    }
    seed_product_keys = {
        (payload["name"], payload["brand"])
        for payload in products
    }

    default_market = Market.query.filter_by(name="Assaí").first()
    if default_market is None:
        default_market = Market.query.first()

    markets = Market.query.order_by(Market.id).all()
    for product in Product.query.all():
        if (product.name, product.brand) not in seed_product_keys:
            continue

        base_price = default_prices.get(product.category, Decimal("9.99"))
        for index, market in enumerate(markets):
            existing_price = Price.query.filter_by(
                product_id=product.id,
                market_id=market.id,
            ).first()
            if existing_price:
                continue

            modifier = Decimal(index) * Decimal("1.45")
            brand_offset = Decimal(len(product.brand) % 9) * Decimal("0.55")
            price_value = base_price + modifier + brand_offset

            DB.session.add(
                Price(
                    product_id=product.id,
                    market_id=market.id,
                    price=price_value,
                )
            )

    DB.session.commit()
