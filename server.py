from flask import Flask, render_template, request, redirect, make_response

app = Flask(__name__)

@app.route('/')
def index():
    if request.cookies.get("gamemode"):
        resp = make_response(render_template('index.html'))
        resp.set_cookie('gamemode', expires=0)
        return resp
    return render_template('index.html')

@app.route('/game')
def game():
    return render_template('game.html')

@app.route('/setcookie')
def setcookie():
    gamemode = request.args.get("gamemode")
    redirect_to_index = redirect('/game')
    response = make_response(redirect_to_index)
    response.set_cookie('gamemode', value=gamemode)
    return response

if __name__ == '__main__':
    app.run(debug=True)