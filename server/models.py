import datetime

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
my_app = None


def prepare_db(app):
    global my_app
    my_app = app
    app.config['SESSION_SQLALCHEMY'] = db
    db.init_app(app)


def init_db(app):
    with app.app_context():
        db.create_all()


def get_context():
    return my_app.app_context()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    avatar = db.Column(db.LargeBinary(), nullable=True)
    comments = db.relationship('Comment', backref=db.backref('author', lazy=True))
    drawings = db.relationship('Drawing', backref=db.backref('artist', lazy=True))

    def as_dict(self, includes=None):
        res = to_json(self, includes)
        del res['password']
        return res


class Drawing(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), unique=False, nullable=False)
    static_path = db.Column(db.Text, unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    likes = db.Column(db.Integer(), default=0)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    comments = db.relationship('Comment', backref=db.backref('drawing', lazy=True))

    def as_dict(self, includes=None):
        res = to_json(self, includes)
        res['user_name'] = self.artist.username
        res['nb_comments'] = len(self.comments)
        return res


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(), default=datetime.datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    drawing_id = db.Column(db.Integer, db.ForeignKey('drawing.id'), nullable=False)

    def as_dict(self, includes=None):
        res = to_json(self, includes)
        res['user_name'] = self.author.username
        res['drawing_name'] = self.drawing.title
        res['drawing_artist'] = self.drawing.artist.username
        return res


ALL_MODELS = [User, Drawing, Comment]


def is_model(obj):
    for model in ALL_MODELS:
        if isinstance(obj, model):
            return True

    return False


def to_json(obj, includes=None):
    if includes is None:
        includes = []
    res = {}

    fields = []
    for col in obj.__table__.columns:
        fields.append(col.name)
    for incl in includes:
        fields.append(incl)

    for field in fields:
        if is_model(getattr(obj, field)):
            res[field] = getattr(obj, field).as_dict()
        elif isinstance(getattr(obj, field), bytes):
            res[field] = getattr(obj, field).decode('utf-8')
        else:
            res[field] = getattr(obj, field)

    return res
