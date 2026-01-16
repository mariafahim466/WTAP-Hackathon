
def matching(mentors, mentees):
    matches = []

    for mentee in mentees:
        best_mentor = None
        best_score = 0

        for mentor in mentors:
            exact_matches = len(set(mentor['skills']) & set(mentee['skills']))  # whatever 
