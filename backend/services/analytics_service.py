import pandas as pd
import numpy as np

class AnalyticsService:
    """
    Core Data Analytics Service using Pandas & NumPy.
    Processes content engagement data and calculates key metrics, trends, and aggregations.
    """

    @staticmethod
    def get_overview(df: pd.DataFrame) -> dict:
        if df.empty:
            return {
                "total_views": 0,
                "total_likes": 0,
                "total_comments": 0,
                "total_shares": 0,
                "avg_time_spent": 0.0,
                "avg_engagement_score": 0.0,
                "total_articles": 0,
                "total_records": 0
            }

        total_views = int(df["views"].sum())
        total_likes = int(df["likes"].sum())
        total_comments = int(df["comments"].sum())
        total_shares = int(df["shares"].sum())
        avg_time_spent = round(float(df["time_spent"].mean()), 2)
        avg_engagement_score = round(float(df["engagement_score"].mean()), 2)
        total_articles = int(df["content_id"].nunique())
        total_records = int(len(df))

        return {
            "total_views": total_views,
            "total_likes": total_likes,
            "total_comments": total_comments,
            "total_shares": total_shares,
            "avg_time_spent": avg_time_spent, # in seconds
            "avg_engagement_score": avg_engagement_score,
            "total_articles": total_articles,
            "total_records": total_records
        }

    @staticmethod
    def get_content_analytics(df: pd.DataFrame) -> list:
        if df.empty:
            return []

        grouped = df.groupby(["content_id", "content_title", "category"]).agg(
            total_views=("views", "sum"),
            total_likes=("likes", "sum"),
            total_comments=("comments", "sum"),
            total_shares=("shares", "sum"),
            avg_time_spent=("time_spent", "mean"),
            avg_engagement_score=("engagement_score", "mean"),
            record_count=("views", "count")
        ).reset_index()

        grouped["avg_time_spent"] = grouped["avg_time_spent"].round(2)
        grouped["avg_engagement_score"] = grouped["avg_engagement_score"].round(2)
        grouped = grouped.sort_values(by="avg_engagement_score", ascending=False)

        return grouped.to_dict(orient="records")

    @staticmethod
    def get_category_analytics(df: pd.DataFrame) -> list:
        if df.empty:
            return []

        grouped = df.groupby("category").agg(
            total_views=("views", "sum"),
            total_likes=("likes", "sum"),
            total_comments=("comments", "sum"),
            total_shares=("shares", "sum"),
            avg_time_spent=("time_spent", "mean"),
            avg_engagement_score=("engagement_score", "mean"),
            article_count=("content_id", "nunique")
        ).reset_index()

        grouped["avg_time_spent"] = grouped["avg_time_spent"].round(2)
        grouped["avg_engagement_score"] = grouped["avg_engagement_score"].round(2)
        grouped = grouped.sort_values(by="total_views", ascending=False)

        return grouped.to_dict(orient="records")

    @staticmethod
    def get_device_analytics(df: pd.DataFrame) -> list:
        if df.empty:
            return []

        grouped = df.groupby("device").agg(
            total_views=("views", "sum"),
            total_likes=("likes", "sum"),
            session_count=("views", "count"),
            avg_time_spent=("time_spent", "mean"),
            avg_engagement_score=("engagement_score", "mean")
        ).reset_index()

        total_views_sum = grouped["total_views"].sum()
        grouped["percentage"] = ((grouped["total_views"] / (total_views_sum if total_views_sum > 0 else 1)) * 100).round(2)
        grouped["avg_time_spent"] = grouped["avg_time_spent"].round(2)
        grouped["avg_engagement_score"] = grouped["avg_engagement_score"].round(2)

        return grouped.to_dict(orient="records")

    @staticmethod
    def get_user_type_analytics(df: pd.DataFrame) -> list:
        if df.empty:
            return []

        grouped = df.groupby("user_type").agg(
            total_views=("views", "sum"),
            total_likes=("likes", "sum"),
            total_comments=("comments", "sum"),
            session_count=("views", "count"),
            avg_time_spent=("time_spent", "mean"),
            avg_engagement_score=("engagement_score", "mean")
        ).reset_index()

        total_views_sum = grouped["total_views"].sum()
        grouped["percentage"] = ((grouped["total_views"] / (total_views_sum if total_views_sum > 0 else 1)) * 100).round(2)
        grouped["avg_time_spent"] = grouped["avg_time_spent"].round(2)
        grouped["avg_engagement_score"] = grouped["avg_engagement_score"].round(2)

        return grouped.to_dict(orient="records")

    @staticmethod
    def get_trend_analytics(df: pd.DataFrame) -> list:
        if df.empty:
            return []

        grouped = df.groupby("date").agg(
            total_views=("views", "sum"),
            total_likes=("likes", "sum"),
            total_comments=("comments", "sum"),
            total_shares=("shares", "sum"),
            avg_engagement_score=("engagement_score", "mean"),
            avg_time_spent=("time_spent", "mean")
        ).reset_index()

        grouped["avg_engagement_score"] = grouped["avg_engagement_score"].round(2)
        grouped["avg_time_spent"] = grouped["avg_time_spent"].round(2)
        grouped = grouped.sort_values(by="date", ascending=True)

        return grouped.to_dict(orient="records")

    @staticmethod
    def get_top_content(df: pd.DataFrame, limit: int = 10) -> list:
        if df.empty:
            return []

        grouped = df.groupby(["content_id", "content_title", "category"]).agg(
            total_views=("views", "sum"),
            total_likes=("likes", "sum"),
            total_comments=("comments", "sum"),
            total_shares=("shares", "sum"),
            avg_time_spent=("time_spent", "mean"),
            avg_engagement_score=("engagement_score", "mean")
        ).reset_index()

        grouped["avg_time_spent"] = grouped["avg_time_spent"].round(2)
        grouped["avg_engagement_score"] = grouped["avg_engagement_score"].round(2)
        
        # Rank by Engagement Score & Views
        grouped["rank"] = grouped["avg_engagement_score"].rank(ascending=False, method="min").astype(int)
        grouped = grouped.sort_values(by=["avg_engagement_score", "total_views"], ascending=[False, False])

        return grouped.head(limit).to_dict(orient="records")
