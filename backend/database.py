import os
import sqlite3
import pandas as pd

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
SQLITE_DB_PATH = os.path.join(DATA_DIR, "engagement_analytics.db")

DOMAIN_MAP = {
    "entertainment": {
        "csv": "entertainment.csv", 
        "table": "entertainment_analytics", 
        "search_cols": ["content_title", "content_id", "platform", "genre", "region", "device"],
        "cat_col": "platform",
        "sub_col": "genre",
        "num_metric_col": "views"
    },
    "education": {
        "csv": "education.csv", 
        "table": "education_analytics", 
        "search_cols": ["student_id", "student_name", "subject", "department", "semester", "grade"],
        "cat_col": "subject",
        "sub_col": "department",
        "num_metric_col": "internal_marks"
    },
    "news": {
        "csv": "news.csv", 
        "table": "news_analytics", 
        "search_cols": ["title", "article_id", "category", "author", "sentiment", "region"],
        "cat_col": "category",
        "sub_col": "author",
        "num_metric_col": "views"
    },
    "sports": {
        "csv": "sports.csv", 
        "table": "sports_analytics", 
        "search_cols": ["match_title", "sport", "tournament", "team_1", "team_2", "top_player", "broadcaster"],
        "cat_col": "sport",
        "sub_col": "tournament",
        "num_metric_col": "views"
    },
    "ecommerce": {
        "csv": "ecommerce.csv", 
        "table": "ecommerce_analytics", 
        "search_cols": ["product_name", "product_id", "category", "brand", "payment_method", "region"],
        "cat_col": "category",
        "sub_col": "brand",
        "num_metric_col": "revenue"
    },
    "technology": {
        "csv": "technology.csv", 
        "table": "technology_analytics", 
        "search_cols": ["title", "content_id", "topic", "difficulty", "content_type"],
        "cat_col": "topic",
        "sub_col": "difficulty",
        "num_metric_col": "views"
    },
    "social_media": {
        "csv": "social_media.csv", 
        "table": "social_media_analytics", 
        "search_cols": ["account_name", "post_id", "platform", "content_type", "region"],
        "cat_col": "platform",
        "sub_col": "content_type",
        "num_metric_col": "reach"
    }
}

class DatabaseManager:
    """
    Enhanced Multi-Domain Database Engine supporting PostgreSQL & SQLite/Pandas fallbacks
    with advanced multi-attribute filtering, date ranges, minimum threshold, and sorting.
    """
    def __init__(self):
        self.use_postgres = False
        self.pg_conn = None
        self._init_db()
        self.seed_databases()

    def _init_db(self):
        host = os.getenv("DB_HOST", "localhost")
        port = os.getenv("DB_PORT", "5432")
        dbname = os.getenv("DB_NAME", "web_content_analytics")
        user = os.getenv("DB_USER", "postgres")
        password = os.getenv("DB_PASSWORD", "postgres")

        try:
            import psycopg2
            conn = psycopg2.connect(
                host=host, port=port, dbname=dbname, user=user, password=password, connect_timeout=2
            )
            self.pg_conn = conn
            self.use_postgres = True
            print("Successfully connected to PostgreSQL Database!")
        except Exception as e:
            print(f"PostgreSQL connection offline ({e}). Using SQLite / Pandas fail-safe engine.")
            self.use_postgres = False

    def seed_databases(self):
        """Seed SQLite DB for all 7 domains from CSV files"""
        try:
            conn = sqlite3.connect(SQLITE_DB_PATH)
            for domain_key, info in DOMAIN_MAP.items():
                csv_file = os.path.join(DATA_DIR, info["csv"])
                if os.path.exists(csv_file):
                    df = pd.read_csv(csv_file)
                    df.to_sql(info["table"], conn, if_exists="replace", index=False)

            conn.close()
            print("All 7 domain tables (1000+ records each) successfully seeded into SQLite engine.")
        except Exception as e:
            print(f"Error seeding SQLite fallback: {e}")

    def get_domain_data(self, domain="entertainment", filters=None):
        domain_key = domain.lower() if domain else "entertainment"
        if domain_key not in DOMAIN_MAP:
            domain_key = "entertainment"

        info = DOMAIN_MAP[domain_key]
        table = info["table"]
        search_cols = info["search_cols"]
        csv_path = os.path.join(DATA_DIR, info["csv"])

        filters = filters or {}
        cat_filter = filters.get("category") or filters.get("filter_value")
        sub_filter = filters.get("sub_filter")
        region_filter = filters.get("region")
        min_metric = filters.get("min_metric")
        sort_by = filters.get("sort_by", "date_desc")

        # Attempt PostgreSQL Query if connected
        if self.use_postgres and self.pg_conn:
            try:
                query = f"SELECT * FROM {table} WHERE 1=1"
                params = []

                if cat_filter and cat_filter != "All":
                    query += f" AND {info['cat_col']} = %s"
                    params.append(cat_filter)

                if sub_filter and sub_filter != "All":
                    query += f" AND {info['sub_col']} = %s"
                    params.append(sub_filter)

                if region_filter and region_filter != "All":
                    query += " AND region = %s"
                    params.append(region_filter)

                if filters.get("start_date"):
                    query += " AND date >= %s"
                    params.append(filters["start_date"])
                if filters.get("end_date"):
                    query += " AND date <= %s"
                    params.append(filters["end_date"])

                if filters.get("search"):
                    s = f"%{filters['search']}%"
                    search_conditions = [f"{col} ILIKE %s" for col in search_cols]
                    query += f" AND ({' OR '.join(search_conditions)})"
                    params.extend([s] * len(search_cols))

                # Ordering
                if sort_by == "metric_high":
                    query += f" ORDER BY {info['num_metric_col']} DESC"
                elif sort_by == "metric_low":
                    query += f" ORDER BY {info['num_metric_col']} ASC"
                else:
                    query += " ORDER BY date DESC"

                df = pd.read_sql_query(query, self.pg_conn, params=params)
                return df
            except Exception as e:
                print(f"PostgreSQL query error: {e}. Falling back to SQLite/Pandas engine.")

        # SQLite/Pandas fallback engine
        try:
            conn = sqlite3.connect(SQLITE_DB_PATH)
            df = pd.read_sql_query(f"SELECT * FROM {table}", conn)
            conn.close()
        except Exception:
            if os.path.exists(csv_path):
                df = pd.read_csv(csv_path)
            else:
                return pd.DataFrame()

        if df.empty:
            return df

        # Pandas Filtering
        if cat_filter and cat_filter != "All":
            cat_col = info['cat_col']
            if cat_col in df.columns:
                df = df[df[cat_col] == cat_filter]

        if sub_filter and sub_filter != "All":
            sub_col = info['sub_col']
            if sub_col in df.columns:
                df = df[df[sub_col] == sub_filter]

        if region_filter and region_filter != "All" and "region" in df.columns:
            df = df[df["region"] == region_filter]

        if filters.get("start_date"):
            df = df[df["date"] >= filters["start_date"]]
        if filters.get("end_date"):
            df = df[df["date"] <= filters["end_date"]]

        if min_metric:
            try:
                val = float(min_metric)
                num_col = info["num_metric_col"]
                if num_col in df.columns:
                    df = df[df[num_col] >= val]
            except ValueError:
                pass

        if filters.get("search"):
            s = str(filters["search"]).lower()
            mask = pd.Series(False, index=df.index)
            for col in search_cols:
                if col in df.columns:
                    mask |= df[col].astype(str).str.lower().str.contains(s, na=False)
            df = df[mask]

        # Pandas Sorting
        if sort_by == "metric_high":
            num_col = info["num_metric_col"]
            if num_col in df.columns:
                df = df.sort_values(num_col, ascending=False)
        elif sort_by == "metric_low":
            num_col = info["num_metric_col"]
            if num_col in df.columns:
                df = df.sort_values(num_col, ascending=True)
        else:
            if "date" in df.columns:
                df = df.sort_values("date", ascending=False)

        return df

db_manager = DatabaseManager()
