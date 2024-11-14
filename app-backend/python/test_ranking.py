from ranking import rank_by_cosine_similarity


emojis = ['😡', '😡', '😭', '😡']
specs = [(1, 'anxiety management'), (2, 'grief counseling'), (3, 'stress relief')]


def test_invariants():
    """
    Check that the function returns the same number of elements as the input list and that the elements contain the same ids
    """
    ranking = rank_by_cosine_similarity(emojis, specs)

    assert len(ranking) == len(specs)
    assert set(ranking) == set(specs)


def test_unrelated_spec():
    """
    Check that the function ranks unrelated specs last
    """
    specs_with_unrelated = specs + [(4, "That's a very unrelated sentence")]
    ranking = rank_by_cosine_similarity(emojis, specs_with_unrelated)

    assert ranking[3] == (4, "That's a very unrelated sentence"), ranking
