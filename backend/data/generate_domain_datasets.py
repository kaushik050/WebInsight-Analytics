import os
import random
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

DATA_DIR = os.path.dirname(__file__)

def random_dates(start_date, end_date, n=1000):
    start_ts = datetime.strptime(start_date, "%Y-%m-%d")
    end_ts = datetime.strptime(end_date, "%Y-%m-%d")
    delta = (end_ts - start_ts).days
    return [(start_ts + timedelta(days=random.randint(0, delta))).strftime("%Y-%m-%d") for _ in range(n)]

REGIONS = ["North America", "Europe", "Asia Pacific", "Latin America", "Middle East"]
DEVICES = ["Mobile", "Desktop", "Smart TV", "Tablet"]

def generate_datasets():
    os.makedirs(DATA_DIR, exist_ok=True)
    dates = random_dates("2026-01-01", "2026-08-15", 1000)

    # 1. ENTERTAINMENT (1000 records)
    platforms = ["Instagram", "YouTube", "Snapchat", "X", "Netflix", "Spotify"]
    content_types = ["Video", "Reel", "Short", "Movie", "Podcast", "Live Stream"]
    genres = ["Action", "Comedy", "Drama", "Music", "Tech Review", "Vlog"]
    
    ent_records = []
    for i in range(1000):
        views = random.randint(5000, 500000)
        likes = int(views * random.uniform(0.04, 0.18))
        comments = int(likes * random.uniform(0.05, 0.25))
        shares = int(likes * random.uniform(0.08, 0.35))
        watch_sec = random.randint(30, 7200)
        eng_score = round(((likes + comments + shares) / views) * 100, 2)
        
        ent_records.append({
            "content_id": f"ENT-{i+1001}",
            "content_title": f"{random.choice(genres)} {random.choice(content_types)} #{i+1}",
            "platform": random.choice(platforms),
            "content_type": random.choice(content_types),
            "genre": random.choice(genres),
            "views": views,
            "likes": likes,
            "comments": comments,
            "shares": shares,
            "watch_time_sec": watch_sec,
            "followers": random.randint(10000, 2500000),
            "region": random.choice(REGIONS),
            "device": random.choice(DEVICES),
            "user_type": random.choice(["New", "Returning", "Subscriber"]),
            "engagement_score": eng_score,
            "date": dates[i]
        })
    pd.DataFrame(ent_records).to_csv(os.path.join(DATA_DIR, "entertainment.csv"), index=False)
    print("Generated 1000 rich records for Entertainment.")

    # 2. EDUCATION (1000 records)
    subjects = ["Python", "Java", "Data Structures", "Database Management Systems", "Web Development", "Cloud Computing", "Cybersecurity", "Artificial Intelligence"]
    departments = ["Computer Science", "Information Technology", "Electronics & Comm", "Data Science", "AI & ML"]
    semesters = ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6"]
    
    edu_records = []
    for i in range(1000):
        att = round(random.uniform(50.0, 99.5), 1)
        study_h = round(random.uniform(2.0, 35.0), 1)
        base_mark = (att * 0.4) + (study_h * 1.5) + random.uniform(-10, 15)
        marks = int(max(30, min(100, base_mark)))
        assign_pct = round(min(100.0, att + random.uniform(-10, 10)), 1)
        quiz = int(max(25, min(100, marks + random.uniform(-12, 12))))
        course_comp = round(random.uniform(40.0, 100.0), 1)
        pass_status = "Pass" if marks >= 40 and att >= 60 else "Fail"
        grade = "A+" if marks >= 90 else ("A" if marks >= 80 else ("B" if marks >= 70 else ("C" if marks >= 50 else ("D" if marks >= 40 else "F"))))

        edu_records.append({
            "student_id": f"STU-{1000 + (i % 120) + 1}",
            "student_name": f"Student #{1000 + (i % 120) + 1}",
            "subject": random.choice(subjects),
            "department": random.choice(departments),
            "semester": random.choice(semesters),
            "attendance_pct": att,
            "internal_marks": marks,
            "assignment_completion_pct": assign_pct,
            "quiz_score": quiz,
            "study_hours": study_h,
            "course_completion_pct": course_comp,
            "grade": grade,
            "pass_status": pass_status,
            "date": dates[i]
        })
    pd.DataFrame(edu_records).to_csv(os.path.join(DATA_DIR, "education.csv"), index=False)
    print("Generated 1000 rich records for Education.")

    # 3. NEWS (1000 records)
    categories = ["Technology", "Sports", "Business", "World", "Entertainment", "Education", "Politics", "Science"]
    authors = ["Sarah Jenkins", "Alex Rivera", "David Chen", "Emily Watson", "Michael Brown", "Priya Sharma"]
    sentiments = ["Positive", "Neutral", "Critical", "Trending"]

    news_records = []
    for i in range(1000):
        views = random.randint(2000, 350000)
        likes = int(views * random.uniform(0.02, 0.12))
        comments = int(likes * random.uniform(0.08, 0.40))
        shares = int(likes * random.uniform(0.10, 0.50))
        read_time = random.randint(45, 600)

        news_records.append({
            "article_id": f"NEWS-{i+2001}",
            "title": f"Breaking {random.choice(categories)} Insights & Analysis #{i+1}",
            "category": random.choice(categories),
            "author": random.choice(authors),
            "sentiment": random.choice(sentiments),
            "views": views,
            "reading_time_sec": read_time,
            "likes": likes,
            "comments": comments,
            "shares": shares,
            "region": random.choice(REGIONS),
            "user_type": random.choice(["New", "Returning", "Subscriber"]),
            "date": dates[i]
        })
    pd.DataFrame(news_records).to_csv(os.path.join(DATA_DIR, "news.csv"), index=False)
    print("Generated 1000 rich records for News.")

    # 4. SPORTS (1000 records) - REAL ACCURATE SPORT & PLAYER MAPPING
    SPORTS_DATA = {
        "Cricket": {
            "players": ["Virat Kohli", "MS Dhoni", "Rohit Sharma", "Jasprit Bumrah", "Sachin Tendulkar", "Hardik Pandya"],
            "teams": [("India", "Australia"), ("Mumbai Indians", "Chennai Super Kings"), ("RCB", "KKR"), ("England", "India")],
            "tournaments": ["IPL 2026", "ICC World Cup", "T20 World Cup", "Ashes Test Series"],
            "broadcasters": ["Star Sports", "JioCinema", "Sony Sports"]
        },
        "Football": {
            "players": ["Lionel Messi", "Cristiano Ronaldo", "Kylian Mbappé", "Erling Haaland", "Neymar Jr", "Kevin De Bruyne"],
            "teams": [("Real Madrid", "FC Barcelona"), ("Manchester City", "Liverpool"), ("Bayern Munich", "PSG"), ("Arsenal", "Chelsea")],
            "tournaments": ["UEFA Champions League", "Premier League", "FIFA World Cup", "La Liga"],
            "broadcasters": ["ESPN", "Sky Sports", "DAZN", "Sony LIV"]
        },
        "Tennis": {
            "players": ["Novak Djokovic", "Rafael Nadal", "Carlos Alcaraz", "Jannik Sinner", "Iga Swiatek"],
            "teams": [("Novak Djokovic", "Rafael Nadal"), ("Carlos Alcaraz", "Jannik Sinner")],
            "tournaments": ["Wimbledon", "US Open", "French Open", "Australian Open"],
            "broadcasters": ["Eurosport", "Tennis Channel", "Star Sports"]
        },
        "Basketball": {
            "players": ["LeBron James", "Stephen Curry", "Giannis Antetokounmpo", "Luka Doncic", "Kevin Durant"],
            "teams": [("Lakers", "Warriors"), ("Celtics", "Bulls"), ("Nets", "Bucks")],
            "tournaments": ["NBA Finals", "NBA Playoffs", "FIBA World Cup"],
            "broadcasters": ["ESPN", "TNT", "NBA TV"]
        },
        "Formula 1": {
            "players": ["Max Verstappen", "Lewis Hamilton", "Charles Leclerc", "Lando Norris", "Fernando Alonso"],
            "teams": [("Red Bull Racing", "Ferrari"), ("Mercedes F1", "McLaren")],
            "tournaments": ["Monaco Grand Prix", "Silverstone GP", "Abu Dhabi GP", "Monza GP"],
            "broadcasters": ["Sky Sports F1", "F1 TV", "Star Sports"]
        }
    }

    sports_list = list(SPORTS_DATA.keys())
    sports_records = []
    for i in range(1000):
        sport_name = random.choice(sports_list)
        sport_cfg = SPORTS_DATA[sport_name]

        t1, t2 = random.choice(sport_cfg["teams"])
        top_player = random.choice(sport_cfg["players"])
        tournament = random.choice(sport_cfg["tournaments"])
        broadcaster = random.choice(sport_cfg["broadcasters"])

        views = random.randint(10000, 1200000)
        likes = int(views * random.uniform(0.05, 0.20))
        comments = int(likes * random.uniform(0.06, 0.30))
        shares = int(likes * random.uniform(0.08, 0.40))

        sports_records.append({
            "match_id": f"MATCH-{i+3001}",
            "match_title": f"{t1} vs {t2} - {tournament}",
            "sport": sport_name,
            "tournament": tournament,
            "team_1": t1,
            "team_2": t2,
            "top_player": top_player,
            "broadcaster": broadcaster,
            "views": views,
            "likes": likes,
            "comments": comments,
            "shares": shares,
            "watch_time_min": round(random.uniform(5.0, 120.0), 1),
            "date": dates[i]
        })
    pd.DataFrame(sports_records).to_csv(os.path.join(DATA_DIR, "sports.csv"), index=False)
    print("Generated 1000 rich records for Sports with accurate player & sport pairings.")

    # 5. E-COMMERCE (1000 records)
    ecom_cats = ["Electronics", "Clothing", "Books", "Home & Kitchen", "Beauty & Care", "Sports Gear"]
    brands = ["Apple", "Nike", "Sony", "Adidas", "Samsung", "Puma", "Logitech", "L'Oreal"]
    pay_methods = ["UPI Instant", "Credit Card", "PayPal", "Net Banking", "Cash on Delivery"]

    ecom_records = []
    for i in range(1000):
        views = random.randint(1000, 80000)
        clicks = int(views * random.uniform(0.20, 0.60))
        carts = int(clicks * random.uniform(0.15, 0.45))
        purchases = int(carts * random.uniform(0.30, 0.75))
        price = round(random.uniform(15.0, 1200.0), 2)
        revenue = round(purchases * price, 2)
        rating = round(random.uniform(3.2, 4.9), 1)
        discount = random.choice([0, 5, 10, 15, 20, 30, 50])

        ecom_records.append({
            "product_id": f"PRD-{i+4001}",
            "product_name": f"{random.choice(brands)} {random.choice(ecom_cats)} Item #{i+1}",
            "category": random.choice(ecom_cats),
            "brand": random.choice(brands),
            "payment_method": random.choice(pay_methods),
            "views": views,
            "clicks": clicks,
            "add_to_cart": carts,
            "purchases": purchases,
            "price": price,
            "discount_pct": discount,
            "revenue": revenue,
            "rating": rating,
            "region": random.choice(REGIONS),
            "date": dates[i]
        })
    pd.DataFrame(ecom_records).to_csv(os.path.join(DATA_DIR, "ecommerce.csv"), index=False)
    print("Generated 1000 rich records for E-Commerce.")

    # 6. TECHNOLOGY (1000 records)
    tech_topics = ["Python", "Java", "React", "Artificial Intelligence", "Cloud Computing", "Cybersecurity", "Data Analytics", "DevOps"]
    difficulties = ["Beginner", "Intermediate", "Advanced"]
    content_types = ["Article", "Video Tutorial", "GitHub Repo", "Documentation", "Architecture Guide"]

    tech_records = []
    for i in range(1000):
        views = random.randint(3000, 250000)
        tut_views = int(views * random.uniform(0.30, 0.75))
        downloads = int(views * random.uniform(0.05, 0.25))
        likes = int(views * random.uniform(0.04, 0.15))
        comments = int(likes * random.uniform(0.10, 0.35))
        shares = int(likes * random.uniform(0.12, 0.40))
        read_time = random.randint(60, 900)
        stars = random.randint(15, 2500)

        tech_records.append({
            "content_id": f"TECH-{i+5001}",
            "title": f"Mastering {random.choice(tech_topics)}: Complete {random.choice(difficulties)} Guide",
            "topic": random.choice(tech_topics),
            "difficulty": random.choice(difficulties),
            "content_type": random.choice(content_types),
            "views": views,
            "tutorial_views": tut_views,
            "downloads": downloads,
            "github_stars": stars,
            "reading_time_sec": read_time,
            "likes": likes,
            "comments": comments,
            "shares": shares,
            "date": dates[i]
        })
    pd.DataFrame(tech_records).to_csv(os.path.join(DATA_DIR, "technology.csv"), index=False)
    print("Generated 1000 rich records for Technology.")

    # 7. SOCIAL MEDIA (1000 records)
    sm_platforms = ["Instagram", "YouTube", "Snapchat", "X", "LinkedIn", "TikTok"]
    sm_types = ["Reel", "Carousel", "Story", "Text Post", "Infographic", "Short Video"]
    accounts = ["@TechInsider", "@CodeMaster", "@DesignHub", "@GlobalNews", "@FitnessGoals", "@StartupDaily"]

    sm_records = []
    for i in range(1000):
        reach = random.randint(5000, 500000)
        impressions = int(reach * random.uniform(1.2, 3.0))
        likes = int(reach * random.uniform(0.03, 0.16))
        comments = int(likes * random.uniform(0.05, 0.25))
        shares = int(likes * random.uniform(0.08, 0.45))
        followers = random.randint(20000, 3000000)
        growth = round(random.uniform(0.5, 18.5), 2)
        virality = round(((likes + comments + shares) / reach) * 100, 2)

        sm_records.append({
            "post_id": f"POST-{i+6001}",
            "platform": random.choice(sm_platforms),
            "account_name": random.choice(accounts),
            "content_type": random.choice(sm_types),
            "followers": followers,
            "follower_growth": growth,
            "likes": likes,
            "comments": comments,
            "shares": shares,
            "impressions": impressions,
            "reach": reach,
            "virality_score": virality,
            "region": random.choice(REGIONS),
            "date": dates[i]
        })
    pd.DataFrame(sm_records).to_csv(os.path.join(DATA_DIR, "social_media.csv"), index=False)
    print("Generated 1000 rich records for Social Media.")

if __name__ == "__main__":
    generate_datasets()
