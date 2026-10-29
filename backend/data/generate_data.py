import csv
import random
from datetime import datetime, timedelta

# Realistic article titles per category
ARTICLES = {
    "Technology": [
        ("CNT-101", "The Future of AI in Software Engineering 2026"),
        ("CNT-102", "Understanding Quantum Computing Basics"),
        ("CNT-103", "Top 10 Cyber Security Practices for Developers"),
        ("CNT-104", "Building Scalable Microservices with Python"),
        ("CNT-105", "React 19 New Features and Architecture Changes"),
        ("CNT-106", "Cloud Native DevOps Strategies for Startups"),
        ("CNT-107", "How 6G Networks Will Change Web Infrastructure"),
        ("CNT-108", "Rust vs Go: Choosing the Right Backend Language"),
    ],
    "Sports": [
        ("CNT-201", "Champions League 2026 Tactical Breakdown"),
        ("CNT-202", "How Wearable Tech is Transforming Elite Athletics"),
        ("CNT-203", "NBA Season Preview and Rookie Rankings"),
        ("CNT-204", "The Science of Endurance: Marathon Training Tips"),
        ("CNT-205", "Cricket World Cup Analytics and Key Statistics"),
        ("CNT-206", "Formula 1 Aerodynamics and Race Strategy"),
    ],
    "Education": [
        ("CNT-301", "Mastering Data Structures and Algorithms for Coding Interviews"),
        ("CNT-302", "Effective Self-Study Techniques for Engineering Students"),
        ("CNT-303", "Guide to Higher Studies and GATE Examination Preparation"),
        ("CNT-304", "Interactive Learning vs Traditional Classroom Teaching"),
        ("CNT-305", "Top Online Certifications for Career Growth in Tech"),
        ("CNT-306", "How to Build a High-Impact Resume for College Graduates"),
    ],
    "Entertainment": [
        ("CNT-401", "Top 10 Sci-Fi Blockbusters Released This Year"),
        ("CNT-402", "The Evolution of Streaming Services and Content Creation"),
        ("CNT-403", "Behind the Scenes of Award-Winning Cinematography"),
        ("CNT-404", "Indie Game Developers Revolutionizing the Gaming Industry"),
        ("CNT-405", "Music Industry Trends: AI Generation vs Human Creativity"),
        ("CNT-406", "Podcast Culture: Why Audio Content is Exploding"),
    ],
    "Business": [
        ("CNT-501", "Global Market Trends and Economic Outlook 2026"),
        ("CNT-502", "How FinTech Startups are Disrupting Traditional Banking"),
        ("CNT-503", "Effective Leadership Strategies in Hybrid Work Environments"),
        ("CNT-504", "E-Commerce Growth Hacks for Small Businesses"),
        ("CNT-505", "Venture Capital Funding: Pitch Deck Essentials"),
        ("CNT-506", "Supply Chain Resilience and Global Logistics Solutions"),
    ]
}

DEVICES = ["Desktop", "Mobile", "Tablet"]
USER_TYPES = ["New", "Returning"]

def calculate_engagement_score(views, likes, comments, shares, time_spent):
    """
    Transparent Engagement Score Formula:
    Score = (Likes/Views * 25) + (Comments/Views * 25) + (Shares/Views * 25) + (min(1, time_spent/300) * 25)
    Result bounded between 0.00 and 100.00
    """
    if views <= 0:
        return 0.0
    
    like_ratio = min(1.0, likes / views)
    comment_ratio = min(1.0, comments / views)
    share_ratio = min(1.0, shares / views)
    time_ratio = min(1.0, time_spent / 300.0) # max baseline 5 minutes (300 sec)
    
    score = (like_ratio * 25.0) + (comment_ratio * 25.0) + (share_ratio * 25.0) + (time_ratio * 25.0)
    return round(score, 2)

def generate_dataset(file_path, num_records=250):
    start_date = datetime(2026, 5, 1)
    
    records = []
    headers = [
        "content_id", "content_title", "category", "date", 
        "views", "likes", "comments", "shares", "time_spent", 
        "device", "user_type", "engagement_score"
    ]

    random.seed(42) # Deterministic realistic seed for reproducible baseline

    for _ in range(num_records):
        category = random.choice(list(ARTICLES.keys()))
        content_id, title = random.choice(ARTICLES[category])
        
        # Pick date within past 100 days
        random_days = random.randint(0, 100)
        record_date = (start_date + timedelta(days=random_days)).strftime("%Y-%m-%d")
        
        # Views with realistic skew based on category
        base_views = random.randint(300, 3500)
        if category in ["Technology", "Entertainment"]:
            base_views += random.randint(500, 1500)
        
        views = base_views
        # Interaction ratios
        likes = int(views * random.uniform(0.08, 0.22))
        comments = int(views * random.uniform(0.02, 0.09))
        shares = int(views * random.uniform(0.01, 0.06))
        
        # Time spent in seconds (45 sec to 420 sec)
        time_spent = random.randint(45, 420)
        
        # Device distribution weights: Mobile 50%, Desktop 38%, Tablet 12%
        device = random.choices(DEVICES, weights=[38, 50, 12])[0]
        
        # User Type distribution: Returning 55%, New 45%
        user_type = random.choices(USER_TYPES, weights=[45, 55])[0]
        
        score = calculate_engagement_score(views, likes, comments, shares, time_spent)
        
        records.append({
            "content_id": content_id,
            "content_title": title,
            "category": category,
            "date": record_date,
            "views": views,
            "likes": likes,
            "comments": comments,
            "shares": shares,
            "time_spent": time_spent,
            "device": device,
            "user_type": user_type,
            "engagement_score": score
        })

    # Sort by date descending
    records.sort(key=lambda x: x["date"], reverse=True)

    with open(file_path, mode="w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=headers)
        writer.writeheader()
        writer.writerows(records)

    print(f"Successfully generated {len(records)} realistic records in {file_path}")

if __name__ == "__main__":
    generate_dataset("backend/data/content_engagement.csv", 250)
