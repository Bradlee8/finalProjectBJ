from flask import Flask, render_template, request, redirect, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user,\
     current_user, logout_user, login_required

app = Flask(__name__, static_url_path='/static')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(40), nullable=False)
    bank = db.Column(db.Integer(), nullable=False)


app.config['SECRET_KEY'] = 'NotSecretAnymore'
login_manager = LoginManager(app)
login_manager.init_app(app)


#@app.route('/ajax')
#def ajax():
    #user = Player.query.filter_by(username=Table.query.get(1).player1).first()
    #return jsonify(n=user.username, id=user.id, b=user.bank)


#@app.route('/bet')
#def bet():
   # bet = Player.query.filter_by(userename=Table.query.get(1)).first()
    #return jsonify(n=bet.username, id=bet.id, b=bet.bank)


@app.route('/')
def home():
    return render_template('Home.html')


@app.route('/createUser', methods=['GET', 'POST'])
def create_user():
    if current_user.is_authenticated:
        fail = 'Can not create user while logged in'
        return render_template('home.html', logout=fail)
    if request.method == 'POST':
        username = str(request.form['username'])
        password = str(request.form['password'])
        player = str(request.form['player'])
        bank = int(500)
        user = User.query.filter_by(username=username).first()
        if user is not None:
                fail = "Username already exists"
                return render_template('createUser.html', fail=fail)
        user = User(username=username, password=password, bank=bank)
        db.session.add(user)
        db.session.commit()
        return redirect('/')
    return render_template('createUser.html')


@login_manager.user_loader
def load_user(uid):
    user = User.query.get(uid)
    return user


@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        fail = 'Can not login while logged in'
        return render_template('home.html', logout=fail)
    if request.method == 'POST':
        username = str(request.form['username'])
        password = str(request.form['password'])
        user = User.query.filter_by(username=username).first()
        if user != None:
            if password == user.password:
                login_user(user)
                return render_template('home.html')
        fail = "Failed to login"
        return render_template('login.html', fail=fail)
    return render_template('login.html')


@app.route('/logout')
@login_required
def logout():
        logout_user()
        logout = "You Logged Out"
        return render_template('Home.html', logout=logout)


@app.route('/secret')
@login_required
def secret():
        return current_user.player + ' secret message!'


@app.route('/table', methods=['GET', 'POST'])
@login_required
def table():
     #player = current_user.username
    #table = Table.query.get(1)
    #if table.player1 == None:
      #  table.player1 = player
    #elif table.player2 == None:
       # table.player2 = player
    #elif table.player3 == None:
     #   table.player3 = player
    #elif table.player4 == None:
     #   table.player4 = player
    #else:
        #logout = "Table is full try again later"
        #return render_template('Home.html', logout=logout)
    db.session.commit()
    return render_template('table.html', name=current_user.username)


@app.errorhandler(404)
def error404(err):
    return render_template('404.html', err=err)


@app.errorhandler(400)
def error400(err):
    return render_template('400.html', err=err)


@app.errorhandler(401)
def error401(err):
    return render_template('401.html', err=err)


@app.errorhandler(403)
def error403(err):
    return render_template('403.html', err=err)


@app.errorhandler(502)
def error502(err):
    return render_template('502.html', err=err)


if __name__ == '__main__':
    app.run(debug=True)