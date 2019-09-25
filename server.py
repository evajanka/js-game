from flask import Flask, render_template, request, redirect, make_response

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/game')
def game():
    return render_template('game.html')


@app.route('/setcookie')
def setcookie():
    gamemode = request.args.get("gamemode")
    redirect_to_index = redirect('/game')
    response = make_response(redirect_to_index)
    response.set_cookie('gamecode', value=gamemode)
    return response


if __name__ == '__main__':
    app.run(debug=True)