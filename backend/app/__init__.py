import os

from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy

from .config import STATIC_DIR, TEMPLATE_DIR, get_database_uri

DB = SQLAlchemy()
login_manager = LoginManager()
login_manager.login_view = "main.login"
login_manager.login_message = ""


def create_app():
    app = Flask(
        __name__,
        template_folder=str(TEMPLATE_DIR),
        static_folder=str(STATIC_DIR),
    )
    app.config.from_mapping(
        SECRET_KEY=os.getenv("SECRET_KEY", "marketcompare-secret"),
        SQLALCHEMY_DATABASE_URI=get_database_uri(),
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
        PER_PAGE=10,
    )

    DB.init_app(app)
    login_manager.init_app(app)

    with app.app_context():
        from .routes import main
        from .seed_data import seed_database

        DB.create_all()
        app.register_blueprint(main)
        seed_database()

    return app
