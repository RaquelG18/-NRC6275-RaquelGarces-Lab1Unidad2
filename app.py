import numpy as np
import os
import os.path
from flask import Flask, render_template
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure

app = Flask(__name__, template_folder="template")
app._static_folder = os.path.abspath("template/static/")


@app.route("/")
def index():
    return render_template("layouts/index.html")


# permite arrancar el aplicativo
if __name__ == "__main__":
    app.run(debug=True)


