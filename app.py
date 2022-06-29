
from flask import Flask, render_template
app = Flask(__name__, template_folder="template")

@app.route("/")
def index():
    return render_template("layouts/index.html")


# permite arrancar el aplicativo
if __name__ == "__main__":
    app.run(debug=True)


