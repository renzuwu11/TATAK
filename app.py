from flask import Flask, render_template, request, jsonify, redirect, url_for, session
from pynamelix.utils import get_names
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/name-generator')
def name_generator():
    business_types = ['Retail', 'Foodservice', 'E-commerce', 'Health Care', 'Real Estate', 'Educational Services', 'Arts, Entertainment, and Recreation']
    name_styles = ['Auto', 'Brandable', 'Language', 'Evocative', 'Alternate Spelling', 'Dictionary', 'Rhyme']
    name_lengths = ['Short', 'Medium', 'Long']
    return render_template('name-generator.html', business_types=business_types, name_styles=name_styles, name_lengths=name_lengths)

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

@app.route('/logo-maker', methods=['GET', 'POST'])
def logo_maker():
    if request.method == 'POST':
        business_name = request.form['business_name']
        # Redirect directly to create-logo with business_name as query parameter
        return redirect(url_for('create_logo', business_name=business_name))
    return render_template('logo-maker.html')

@app.route('/manual')
def manual():
    return render_template('manual.html')

@app.route('/creator')
def creator():
    return render_template('creator.html')

@app.route('/choices')
def choices():
    return render_template('choices.html')

@app.route('/get-fonts')
def get_fonts():
    with open('/src/assets/font-list.json') as f:
        fonts = json.load(f)
    return jsonify(fonts)

@app.route('/generated-logo')
def generated_logo():
    business_name = request.args.get('business_name')
    return render_template('generated-logo.html', business_name=business_name)

@app.route('/create-logo', methods=['GET', 'POST'])
def create_logo():
    if request.method == 'POST':
        business_name = request.form['business_name']
        return redirect(url_for('generated_logo', business_name=business_name))
    business_name = request.args.get('business_name')
    return render_template('create-logo.html', business_name=business_name)

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404
    
if __name__ == '__main__':
    app.run(debug=True)
