from flask import Flask, render_template, request, jsonify, redirect, url_for
from pynamelix.utils import get_names
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/name-generator')
def name_generator():
    business_types = ['Retail', 'Foodservice', 'E-commerce', 'Health Care', 'Real Estate', 'Educational Services', 'Arts, Entertainment, and Recreation']
    return render_template('name-generator.html', business_types=business_types)

@app.route('/generated-names', methods=['POST'])
def generated_names():
    industry = request.form.get('industry')
    style = request.form.get('style')
    lengths = request.form.get('lengths')
    keyword = request.form.get('keyword', '')

    # Generate business names using pynamelix
    generated_names = list(get_names(industry, styles=style, lengths=lengths, keyword=keyword))

    # Convert the generated names to a JSON string
    generated_names_json = json.dumps(generated_names)

    # Redirect to the generated-names.html page and pass the generated names as a parameter
    return redirect(url_for('generated_names_page', generated_names=generated_names_json))

@app.route('/generated-names-page')
def generated_names_page():
    # Retrieve the generated names from the query parameters
    generated_names_json = request.args.get('generated_names')

    # Convert the JSON string back to a list
    generated_names = json.loads(generated_names_json)

    # Render the template and pass the generated names to it
    return render_template('generated-names.html', generated_names=generated_names)

@app.route('/logo-maker')
def logo_maker():
    return render_template('logo-maker.html')

@app.route('/lm-color')
def lm_color():
    return render_template('lm-color.html')

@app.route('/lm-fonts')
def lm_fonts():
    return render_template('lm-fonts.html')

@app.route('/generated-logos')
def generated_logos():
    return render_template('generated-logos.html')

@app.route('/manual')
def manual():
    return render_template('manual.html')

@app.route('/creator')
def creator():
    return render_template('creator.html')

if __name__ == '__main__':
    app.run(debug=True)
