import os

from flask import session, jsonify
from flask_session import Session
from sqlalchemy import or_
from werkzeug.datastructures import FileStorage

from config import FILE_SIZE_LIMIT
from models import User, db, Drawing, Comment
from utils import hash_password, ClientKnownError, success_response, get_new_file_name, check_static_folder_exist

sess = Session()
nb_sess = 0


def init_services(app):
    global sess
    check_static_folder_exist()
    sess.init_app(app)


def check_session():
    if 'connected' not in session:
        raise ClientKnownError('User is not connected')


def create_account(login, password):
    if User.query.filter_by(username=login).first() is not None:
        raise ClientKnownError("User already exist")

    me = User(username=login, password=hash_password(password))
    db.session.add(me)
    db.session.commit()
    return success_response()


def edit_account(new_user):
    user = User.query.filter_by(id=session['userid']).first()
    if user is None:
        raise ClientKnownError("User dosen't exist")

    user.avatar = str.encode(new_user['avatar'])
    db.session.commit()
    return user.as_dict()


def fetch_session_nb():
    result = db.engine.execute("select COUNT(*) FROM sessions")
    names = [row[0] for row in result]
    return names


def fetch_session():
    return session


def create_session(login, password):
    user = User.query.filter_by(username=login, password=hash_password(password)).first()
    if user is None:
        raise ClientKnownError("User not found")

    session['connected'] = True
    session['userid'] = user.id
    session['username'] = user.username
    return session


def remove_session():
    session['connected'] = False
    session['userid'] = None
    return success_response()


def fetch_user(name):
    user = User.query.filter_by(username=name).first()
    if user is None:
        raise ClientKnownError("No user found")

    return success_response(user.as_dict())


def fetch_current_user():
    user = User.query.filter_by(id=session['userid']).first()
    if user is None:
        raise ClientKnownError("No user found")

    return success_response(user.as_dict())


def fetch_user_drawings(name):
    user = User.query.filter_by(username=name).first()
    if user is None:
        raise ClientKnownError("No user found")

    all_drawings = list(map(lambda d: d.as_dict(['artist']), user.drawings))
    return jsonify(all_drawings)


def fetch_all_drawings():
    all_drawings = Drawing.query.limit(30).all()
    for drawing in all_drawings:
        setattr(drawing, 'user_name', drawing.artist.username)

    all_drawing_json = list(map(lambda x: x.as_dict(["artist"]), all_drawings))
    all_drawing_json.sort(key=lambda x: x['created_at'], reverse=True)
    return jsonify(all_drawing_json)


def search_all_drawings(username="", title=""):
    if username is None:
        username = ""
    if title is None:
        title = ""
    usernameLike = "%" + username + "%"
    titleLike = "%" + title + "%"

    drawings = Drawing.query.join(User).filter(
        or_(User.username.like(usernameLike), Drawing.title.like(titleLike))).limit(
        30).all()

    all_drawing_json = list(map(lambda x: x.as_dict(), drawings))
    all_drawing_json.sort(key=lambda x: x['created_at'], reverse=True)
    return jsonify(all_drawing_json)


def fetch_comments_user(name):
    user = User.query.filter_by(username=name).first()
    if user is None:
        raise ClientKnownError("No user found")

    all_comments = list(map(lambda x: x.as_dict(), user.comments))
    return jsonify(all_comments)


def fetch_comments_drawing(pk):
    drawing = Drawing.query.filter_by(id=pk).first()
    if drawing is None:
        raise ClientKnownError("No drawing found")

    all_comments = list(map(lambda x: x.as_dict(), drawing.comments))
    return jsonify(all_comments)


def fetch_drawing(pk):
    drawing = Drawing.query.filter_by(id=pk).first()

    if drawing is None:
        raise ClientKnownError("No drawing found")

    return drawing.as_dict(["artist"])


def remove_drawing(pk):
    drawing = Drawing.query.filter_by(id=pk).first()

    if drawing is None:
        raise ClientKnownError("No drawing found")

    if drawing.user_id != session['userid']:
        raise ClientKnownError("Not your drawing !")

    for comment in drawing.comments:
        db.session.delete(comment)
    db.session.delete(drawing)
    return success_response()


def create_drawing(title, file: FileStorage):
    drawing = Drawing(title=title, user_id=session["userid"])
    size = os.fstat(file.fileno()).st_size
    if size > FILE_SIZE_LIMIT:
        raise ClientKnownError("File is too big")

    [file_name, file_path] = get_new_file_name()
    drawing.static_path = "/static/" + file_name
    file.save(file_path)

    db.session.add(drawing)
    db.session.commit()
    return drawing.as_dict()


def create_comment(pk, text):
    comment = Comment(drawing_id=pk, user_id=session['userid'], text=text)
    db.session.add(comment)
    db.session.commit()
    return comment.as_dict()


def alter_comment(pk, text):
    comment = Comment.query.filter_by(id=pk).first()
    if comment.user_id != session['userid']:
        raise ClientKnownError("Not your comment !")

    comment.text = text
    db.session.commit()
    return comment.as_dict()


def remove_comment(pk):
    comment = Comment.query.filter_by(id=pk).first()
    if comment.user_id != session['userid']:
        raise ClientKnownError("Not your comment !")

    db.session.delete(comment)
    db.session.commit()
    return success_response()
