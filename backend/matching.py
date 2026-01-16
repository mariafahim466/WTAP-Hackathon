import csv
from prompt import generate_meeting_prompt
from rapidfuzz import fuzz

def normalize(row):
    row['interests'] = [i.strip().lower() for i in row['interests'].split(',')]
    row['language'] = [l.strip().lower() for l in row['languages'].split(',')]
    row['mentorship_options'] = [m.strip().lower() for m in row['mentorship_options'].split(',')]
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

def load_users(path):
    mentors, mentees = [], []

    with open(path, newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            row = normalize(row)

            if row['role'] in ('mentor', 'both'):
                mentors.append(row)
            if row['role'] in ('mentee', 'both'):
                mentees.append(row)

    return mentors, mentees

def matching(mentors, mentees):
    matches = []
    used_one_on_one = set()

    for mentee in mentees:
        best_mentor = None
        best_score = -1

        for mentor in mentors:
            if mentor['username'] == mentee['username']:
                continue

            # optional: handle one-on-one restriction
            if mentor.get('one-on-one') and id(mentor) in used_one_on_one:
                continue

            # must have at least one shared language
            shared_languages = list(set(mentor['language']) & set(mentee['language']))
            if not shared_languages:
                continue

            # must have at least one shared mentorship option
            shared_options = list(set(mentor['mentorship_options']) & set(mentee['mentorship_options']))
            if not shared_options:
                continue

            # scoring
            score = 0
            # availability match gives points
            if mentor['availability'] == mentee['availability']:
                score += 2
            # exact interest overlap gives points
            shared_interests = list(set(mentor['interests']) & set(mentee['interests']))
            score += len(shared_interests) * 2

            # fallback: fuzzy interest scoring
            if not shared_interests:
                from rapidfuzz import fuzz
                best_fuzzy = 0
                for m_interest in mentor['interests']:
                    for me_interest in mentee['interests']:
                        s = fuzz.token_set_ratio(m_interest, me_interest)
                        if s >= 80:
                            best_fuzzy = max(best_fuzzy, s)
                score += best_fuzzy / 100

            if score > best_score:
                best_score = score
                best_mentor = mentor
                best_shared_interests = shared_interests
                best_shared_languages = shared_languages
                best_availability = mentee['availability']

        if best_mentor:
            matches.append({
                'mentor': best_mentor['username'],
                'mentee': mentee['username'],
                'shared_interests': best_shared_interests,
                'shared_languages': best_shared_languages,
                'availability': best_availability
            })
            if best_mentor.get('one-on-one'):
                used_one_on_one.add(id(best_mentor))

    return matches


mentors, mentees = load_users("users.csv")
mentors_dict = {m['username']: m for m in mentors}
mentees_dict = {m['username']: m for m in mentees}

results = matching(mentors, mentees)

for match in results:
    print(f"{match['mentee']} → {match['mentor']}")
    print(f"Shared interests: {', '.join(match['shared_interests'])}")
    print(f"Shared languages: {', '.join(match['shared_languages'])}")
    print(f"Availability: {match['availability']}")
    print("---")
