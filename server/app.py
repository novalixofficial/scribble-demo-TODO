import json

from flask import Flask, request, Response, url_for, send_from_directory
from flask_cors import CORS

from models import init_db, prepare_db
from services import init_services, create_account, create_session, remove_session, fetch_session, check_session, \
    fetch_current_user, fetch_user, fetch_drawing, fetch_all_drawings, fetch_session_nb, create_drawing, remove_drawing, \
    fetch_comments_user, fetch_comments_drawing, create_comment, alter_comment, remove_comment, fetch_user_drawings, \
    edit_account, search_all_drawings
from utils import ServerKnownError, ClientKnownError

app = Flask(__name__)
app.config.from_object('config')

cors = CORS(app, resources={
    "*": {
        "origins": "*"
    }
}, supports_credentials=True)

prepare_db(app)
init_services(app)
init_db(app)


def handle_errors(e):
    response = Response()
    response.data = json.dumps({
        "code": e.code,
        "name": type(e).__name__,
        "error": e.message,
    })
    response.content_type = "application/json"
    response.status_code = e.code
    return response


app.register_error_handler(ServerKnownError, handle_errors)
app.register_error_handler(ClientKnownError, handle_errors)
app.register_error_handler(404, lambda e: handle_errors(ServerKnownError("Resource not found", code=404, ex=e)))
if not app.config['DEBUG']:
    app.register_error_handler(Exception, lambda e: handle_errors(ServerKnownError(str(e), ex=e)))


@app.route("/static")
def static_files(path):
    return send_from_directory('static', path)


@app.route("/")
def test():
    return "The app is running ! " + str(fetch_session_nb()) + " connected !"


@app.route("/signup", methods=['POST'])
def signup():
    return create_account(request.json['login'], request.json['password'])


@app.route("/session", methods=['GET', 'POST', 'DELETE'])
def session():
    if request.method == 'POST':
        return create_session(request.json['login'], request.json['password'])
    elif request.method == 'DELETE':
        return remove_session()
    elif request.method == 'GET':
        return fetch_session()


################ USER PROFILE ################


@app.route("/user/<string:name>/drawings", methods=['GET'])
def get_user_drawing(name):
    return fetch_user_drawings(name)


@app.route("/user/<string:name>/comments", methods=['GET'])
def get_comments_user(name):
    return fetch_comments_user(name)


@app.route("/user/<string:name>", methods=['GET'])
def get_user(name):
    return fetch_user(name)


@app.route("/user", methods=['GET'])
def get_current_user():
    check_session()
    return fetch_current_user()


@app.route("/user", methods=['POST'])
def edit_user():
    check_session()
    return edit_account(request.json)


################ DRAWING ################


@app.route("/drawing/<int:pk>/comments", methods=['GET'])
def get_comments_drawing(pk):
    return fetch_comments_drawing(pk)


@app.route("/drawing/<int:pk>/comments", methods=['POST'])
def publish_comment(pk):
    check_session()
    return create_comment(pk, request.json['text'])


@app.route("/drawing/<int:pk>", methods=['GET'])
def get_drawing(pk):
    return fetch_drawing(pk)


@app.route("/drawing/<int:pk>", methods=['DELETE'])
def clear_drawing(pk):
    check_session()
    return remove_drawing(pk)


@app.route("/drawing", methods=['POST'])
def publish_drawing():
    check_session()
    return create_drawing(request.form['title'], request.files['drawing'])


@app.route("/drawing", methods=['GET'])
def get_all_drawings():
    return fetch_all_drawings()


@app.route("/drawing/search", methods=['GET'])
def search_drawings():
    return search_all_drawings(request.args.get('username'), request.args.get('title'))


################ COMMENTS ################

@app.route("/comment/<int:pk>", methods=['POST'])
def edit_comment(pk):
    return alter_comment(pk, request.json['text'])


@app.route("/comment/<int:pk>", methods=['DELETE'])
def clear_comment(pk):
    check_session()
    remove_comment(pk)


app.run(app.config['HOST'], app.config['PORT'], app.config)
