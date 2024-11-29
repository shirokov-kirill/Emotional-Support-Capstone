from typing import List, Tuple
from embeddings import create_get_embedding
import numpy as np


def cosine(x: np.ndarray, y: np.ndarray) -> float:
    return np.dot(x, y) / (np.linalg.norm(x) * np.linalg.norm(y))


emoji_to_emotion = {
    '😀': 'happy',
    '😂': 'amused',
    '😭': 'sad',
    '😡': 'angry',
}


def rank_by_cosine_similarity(emojis: List[str], specs: List[Tuple[int, str]]) -> List[Tuple[int, str]]:
    get_embedding = create_get_embedding()

    emotions = [emoji_to_emotion.get(emoji, "") for emoji in emojis]
    average_emotion_embedding = np.mean([get_embedding(emoji) for emoji in emotions], axis=0)

    specs_with_cosines = [(*spec, cosine(average_emotion_embedding, get_embedding(spec[1]))) for spec in specs]
    ranked_specs_with_cosines = sorted(specs_with_cosines, key=lambda x: x[2], reverse=True)

    return [spec[:2] for spec in ranked_specs_with_cosines]
