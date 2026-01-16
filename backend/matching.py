from rapidfuzz import fuzz

def normalize(row):
    row['interests'] = [i.strip().lower() for i in row['interests'].split(',')]
    row['mentorship_options'] = [m.strip().lower() for m in row['mentorship_options'].split(',')]
    row['language'] = row['language'].lower()
    row['availability'] = row['availability'].lower()
    return row


def fuzzy_interest_score(a, b, threshold=80):
    best = 0
    for x in a:
        for y in b:
            score = fuzz.token_set_ratio(x, y)
            if score >= threshold:
                best = max(best, score)
    return best / 100

def matching(mentors, mentees):
    matches = []
    used_one_on_one = set()

    for mentee in mentees:
        best_mentor = None
        best_score = -1

        for mentor in mentors:
            # language must match
            if mentor['language'] != mentee['language']:
                continue

            # if mentor chooses one-on-one
            if mentor.get('one-on-one') and id(mentor) in used_one_on_one:
                continue

            score = 0

            # availability match preferred!
            if mentor['availability'] == mentee['availability']:
                score += 2

            # interest overlap
            exact = len(set(mentor['interests']) & set(mentee['interests']))
            score += exact * 2

            # fuzzy used if no exact interests
            if exact == 0:
                score += fuzzy_interest_score(
                    mentor['interests'],
                    mentee['interests']
                )

            if score > best_score:
                best_score = score
                best_mentor = mentor

        if best_mentor:
            matches.append({
                'mentor': best_mentor['username'],
                'mentee': mentee['username'],
                'language': mentee['language'],
                'availability': mentee['availability']
            })

            if best_mentor.get('one-on-one'):
                used_one_on_one.add(id(best_mentor))

    return matches
