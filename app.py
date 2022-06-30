''' Importamos las librerias necesarias para
 la ejecución de nuestro aplicativo '''
import os
import os.path
from flask import Flask, render_template

''' Inicializamos la aplicación y las carpetas 
que continen los archivos del programa'''
app = Flask(__name__, template_folder="template")

''' Inicializamos la carpeta que contiene los
 archivos estáticos'''
app._static_folder = os.path.abspath("template/static/")

'''Creamos la ruta para que nos redirija a 
nuestra página Index'''
@app.route("/")
def index():
    return render_template("layouts/index.html")


''' Permite arrancar el aplicativo'''
if __name__ == "__main__":
    app.run(debug=True)


