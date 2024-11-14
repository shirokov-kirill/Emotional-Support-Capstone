from flask import Flask, request, jsonify
from typing import List, Tuple

app = Flask(__name__)


@app.route('/get-relevant-ads', methods=['POST'])
def get_relevant_ads():
    data = request.get_json()

    emojis: List[str] = data.get("emojis", [])
    doctor_id_and_specializations: List[Tuple[int, str]] = data.get("specializations", [])

    sorted_doctor_ids = [doctor_id for doctor_id, _ in
                         sorted(doctor_id_and_specializations, key=lambda x: x[1], reverse=True)]

    return jsonify({"sorted_doctor_ids": sorted_doctor_ids, "emojis": emojis})


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
