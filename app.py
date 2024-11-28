from flask import Flask, render_template, abort
import json

app = Flask(__name__)

def load_projects():
    with open('projects.json', 'r') as f:
        return json.load(f)['projects']

@app.route('/')
def index():
    projects = load_projects()
    featured_projects = [p for p in projects if p.get('featured', False)]
    return render_template('index.html', featured_projects=featured_projects)

@app.route('/archive')
def archive():
    projects = load_projects()
    return render_template('archive.html', projects=projects)

@app.route('/project/<string:project_id>')
def project(project_id):
    projects = load_projects()
    project = next((p for p in projects if p['id'] == project_id), None)
    if project is None:
        abort(404)
    return render_template('project.html', project=project)

if __name__ == '__main__':
    app.run(debug=True)