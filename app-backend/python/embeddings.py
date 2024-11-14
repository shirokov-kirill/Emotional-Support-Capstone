import numpy as np
from sentence_transformers import SentenceTransformer
from typing import Callable


available_models = ["all-MiniLM-L6-v2", "all-MPNet-base-v2", "paraphrase-MiniLM-L6-v2", "paraphrase-mpnet-base-v2"]


def create_get_embedding(model_name: str = available_models[0]) -> Callable[[str], np.ndarray]:
    model = SentenceTransformer(model_name)

    def get_embedding(text):
        embedding = model.encode(text, convert_to_tensor=True)
        return embedding.cpu().numpy()

    return get_embedding
