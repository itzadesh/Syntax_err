from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    events = [
        {"start_time": "09:00", "end_time": "10:00", "title": "Event 1"},
        {"start_time": "10:30", "end_time": "12:00", "title": "Event 2"},
        {"start_time": "14:00", "end_time": "15:30", "title": "Event 3"},
    ]
    return render_template('home.html', events=events)

if __name__ == '__main__':
    app.run(debug=True)