from decimal import Decimal

from flask import (
    Blueprint,
    flash,
    jsonify,
    redirect,
    render_template,
    request,
    url_for,
)
from flask_login import current_user, login_required, login_user, logout_user
from sqlalchemy import or_

from . import DB, login_manager
from .models import Favorite, Market, Price, Product, User, UserCadastro

main = Blueprint("main", __name__)


def is_valid_email(email: str) -> bool:
    return "@" in email and email.count("@") == 1


def normalize_category(category: str) -> str:
    if not category:
        return category
    normalized = category.strip().lower()
    if normalized == "alimento":
        return "Alimentos"
    return normalized.title()


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@main.context_processor
def inject_user():
    return {"current_user": current_user}


@main.route("/")
def index():
    query = request.args.get("q", "").strip()
    category = request.args.get("category", "").strip()
    market = request.args.get("market", "").strip()
    sort = request.args.get("sort", "menor-preco")
    page = request.args.get("page", 1, type=int)

    products_query = Product.query
    if query:
        like_query = f"%{query}%"
        products_query = products_query.filter(
            or_(Product.name.ilike(like_query), Product.brand.ilike(like_query), Product.category.ilike(like_query))
        )
    if category:
        products_query = products_query.filter(Product.category.ilike(f"%{category}%"))
    if market:
        products_query = products_query.join(Product.prices).join(Price.market).filter(Market.name.ilike(f"%{market}%")).distinct()

    if sort == "menor-preco":
        products_query = products_query.order_by(Product.name.asc())
    else:
        products_query = products_query.order_by(Product.name.desc())

    pagination = products_query.paginate(page=page, per_page=10, error_out=False)
    products = []
    for product in pagination.items:
        prices = [float(price.price) for price in product.prices]
        cheapest = min(prices) if prices else None
        products.append({"product": product, "cheapest_price": cheapest})

    raw_categories = [item[0] for item in DB.session.query(Product.category).distinct().order_by(Product.category).all()]
    categories = []
    seen_categories = set()
    for item in raw_categories:
        normalized = normalize_category(item)
        if normalized not in seen_categories:
            seen_categories.add(normalized)
            categories.append(normalized)
    markets = [item[0] for item in DB.session.query(Market.name).distinct().order_by(Market.name).all()]

    return render_template(
        "index.html",
        products=products,
        pagination=pagination,
        categories=categories,
        markets=markets,
        query=query,
        category=category,
        market=market,
        sort=sort,
    )


@main.route("/api/produtos")
def api_produtos():
    query = request.args.get("q", "").strip()
    products_query = Product.query
    if query:
        like_query = f"%{query}%"
        products_query = products_query.filter(
            or_(Product.name.ilike(like_query), Product.brand.ilike(like_query), Product.category.ilike(like_query))
        )
    products = products_query.limit(10).all()
    payload = []
    for product in products:
        prices = [float(price.price) for price in product.prices]
        payload.append(
            {
                "id": product.id,
                "name": product.name,
                "brand": product.brand,
                "category": product.category,
                "image_url": product.image_url,
                "cheapest_price": min(prices) if prices else None,
            }
        )
    return jsonify(payload)


@main.route("/comparar/<int:product_id>")
def compare(product_id):
    product = Product.query.get_or_404(product_id)
    prices = (
        Price.query.filter_by(product_id=product_id)
        .join(Market)
        .order_by(Price.price.asc())
        .limit(3)
        .all()
    )
    if not prices:
        flash("Ainda não há preços cadastrados para este produto.", "warning")
        return redirect(url_for("main.index"))

    cheapest = float(prices[0].price)
    expensive = float(prices[-1].price)
    savings = round(expensive - cheapest, 2)
    return render_template("compare.html", product=product, prices=prices, savings=savings)


@main.route("/favoritar/<int:product_id>", methods=["POST"])
@login_required
def favoritar(product_id):
    product = Product.query.get_or_404(product_id)
    favorite = Favorite.query.filter_by(user_id=current_user.id, product_id=product.id).first()
    if not favorite:
        DB.session.add(Favorite(user_id=current_user.id, product_id=product.id))
        DB.session.commit()
        flash("Produto adicionado aos favoritos.", "success")
    else:
        flash("Este produto já está nos seus favoritos.", "info")
    return redirect(request.referrer or url_for("main.index"))


@main.route("/favoritos")
@login_required
def favoritos():
    favorites = Favorite.query.filter_by(user_id=current_user.id).order_by(Favorite.created_at.desc()).all()
    return render_template("favorites.html", favorites=favorites)


@main.route("/remover-favorito/<int:product_id>", methods=["POST"])
@login_required
def remover_favorito(product_id):
    favorite = Favorite.query.filter_by(user_id=current_user.id, product_id=product_id).first()
    if favorite:
        DB.session.delete(favorite)
        DB.session.commit()
        flash("Produto removido dos favoritos.", "success")
    return redirect(url_for("main.favoritos"))


@main.route("/adicionar-produto", methods=["GET", "POST"])
def adicionar_produto():
    if request.method == "POST":
        name = request.form.get("name", "").strip()
        brand = request.form.get("brand", "").strip()
        market_name = request.form.get("market_name", "").strip()
        address = request.form.get("address", "").strip()
        city = request.form.get("city", "").strip()
        price_value = request.form.get("price", "").strip()
        category = request.form.get("category", "").strip()
        image_url = request.form.get("image_url", "").strip()

        if not all([name, brand, market_name, address, city, price_value]):
            flash("Preencha todos os campos obrigatórios.", "warning")
            return redirect(url_for("main.adicionar_produto"))

        market = Market.query.filter_by(name=market_name.title()).first()
        if not market:
            market = Market(name=market_name.title(), address=address, city=city.title())
            DB.session.add(market)
            DB.session.flush()

        product = Product.query.filter_by(name=name.title(), brand=brand.title()).first()
        if not product:
            product = Product(name=name.title(), brand=brand.title(), category=category.title() or "Geral", image_url=image_url or None)
            DB.session.add(product)
            DB.session.flush()

        price = Price.query.filter_by(product_id=product.id, market_id=market.id).first()
        if not price:
            price = Price(product_id=product.id, market_id=market.id, price=Decimal(price_value), created_by_id=current_user.id if current_user.is_authenticated else None)
            DB.session.add(price)
            DB.session.flush()
        else:
            price.price = Decimal(price_value)

        if current_user.is_authenticated:
            existing_cadastro = UserCadastro.query.filter_by(user_id=current_user.id, price_id=price.id).first()
            if not existing_cadastro:
                DB.session.add(UserCadastro(user_id=current_user.id, product_id=product.id, market_id=market.id, price_id=price.id))

        DB.session.commit()
        flash("Produto cadastrado com sucesso.", "success")
        return redirect(url_for("main.index"))

    return render_template("add_product.html")


@main.route("/meus-cadastros")
@login_required
def meus_cadastros():
    cadastros = UserCadastro.query.filter_by(user_id=current_user.id).order_by(UserCadastro.created_at.desc()).all()
    return render_template("cadastros.html", cadastros=cadastros)


@main.route("/meus-cadastros/<int:cadastro_id>/editar", methods=["GET", "POST"])
@login_required
def editar_cadastro(cadastro_id):
    cadastro = UserCadastro.query.filter_by(id=cadastro_id, user_id=current_user.id).first_or_404()
    price = Price.query.get_or_404(cadastro.price_id)
    product = Product.query.get_or_404(cadastro.product_id)
    market = Market.query.get_or_404(cadastro.market_id)

    if request.method == "POST":
        product.name = request.form.get("name", "").strip().title()
        product.brand = request.form.get("brand", "").strip().title()
        product.category = request.form.get("category", "").strip().title() or "Geral"
        product.image_url = request.form.get("image_url", "").strip() or None
        market.name = request.form.get("market_name", "").strip().title()
        market.address = request.form.get("address", "").strip()
        market.city = request.form.get("city", "").strip().title()
        price.price = Decimal(request.form.get("price", "0"))
        DB.session.commit()
        flash("Cadastro atualizado com sucesso.", "success")
        return redirect(url_for("main.meus_cadastros"))

    return render_template("edit_cadastro.html", cadastro=cadastro, price=price, product=product, market=market)


@main.route("/meus-cadastros/<int:cadastro_id>/excluir", methods=["POST"])
@login_required
def excluir_cadastro(cadastro_id):
    cadastro = UserCadastro.query.filter_by(id=cadastro_id, user_id=current_user.id).first_or_404()
    DB.session.delete(cadastro)
    DB.session.commit()
    flash("Cadastro removido com sucesso.", "success")
    return redirect(url_for("main.meus_cadastros"))


@main.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form.get("email", "").strip().lower()
        password = request.form.get("password", "")

        if not is_valid_email(email):
            flash("Informe um e-mail válido contendo '@'.", "warning")
            return render_template("auth/login.html")

        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):
            login_user(user)
            flash("Login realizado com sucesso.", "success")
            next_page = request.args.get("next") or request.form.get("next") or url_for("main.index")
            return redirect(next_page)
        flash("Credenciais inválidas.", "danger")
    return render_template("auth/login.html")


@main.route("/cadastro", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        name = request.form.get("name", "").strip()
        email = request.form.get("email", "").strip().lower()
        password = request.form.get("password", "")
        confirm_password = request.form.get("confirm_password", "")

        if not all([name, email, password, confirm_password]):
            flash("Preencha todos os campos.", "warning")
            return render_template("auth/register.html")
        if password != confirm_password:
            flash("As senhas não conferem.", "warning")
            return render_template("auth/register.html")
        if not is_valid_email(email):
            flash("Informe um e-mail válido contendo '@'.", "warning")
            return render_template("auth/register.html")
        if User.query.filter_by(email=email).first():
            flash("Este e-mail já está cadastrado.", "warning")
            return render_template("auth/register.html")

        user = User(name=name, email=email)
        user.set_password(password)
        DB.session.add(user)
        DB.session.commit()
        login_user(user)
        flash("Conta criada com sucesso.", "success")
        return redirect(url_for("main.index"))

    return render_template("auth/register.html")


@main.route("/logout")
def logout():
    logout_user()
    flash("Você saiu da conta.", "info")
    return redirect(url_for("main.index"))


@main.route("/recuperar-senha", methods=["GET", "POST"])
def recuperar_senha():
    if request.method == "POST":
        email = request.form.get("email", "").strip().lower()
        password = request.form.get("password", "")
        confirm_password = request.form.get("confirm_password", "")

        if not is_valid_email(email):
            flash("Informe um e-mail válido contendo '@'.", "warning")
            return render_template("auth/reset_password.html")

        user = User.query.filter_by(email=email).first()
        if not user:
            flash("E-mail não encontrado.", "warning")
            return render_template("auth/reset_password.html")
        if password != confirm_password:
            flash("As senhas não conferem.", "warning")
            return render_template("auth/reset_password.html")
        user.set_password(password)
        DB.session.commit()
        flash("Senha redefinida com sucesso.", "success")
        return redirect(url_for("main.login"))
    return render_template("auth/reset_password.html")
