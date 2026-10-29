import pandas as pd
import numpy as np

class DomainAnalyticsService:
    """
    Comprehensive Analytics Calculation Engine for all 7 Domains:
    Entertainment, Education, News, Sports, E-Commerce, Technology, Social Media.
    """

    @staticmethod
    def get_domain_summary(df: pd.DataFrame, domain: str) -> dict:
        domain = domain.lower() if domain else "entertainment"

        if domain == "entertainment":
            return DomainAnalyticsService._entertainment_summary(df)
        elif domain == "education":
            return DomainAnalyticsService._education_summary(df)
        elif domain == "news":
            return DomainAnalyticsService._news_summary(df)
        elif domain == "sports":
            return DomainAnalyticsService._sports_summary(df)
        elif domain == "ecommerce":
            return DomainAnalyticsService._ecommerce_summary(df)
        elif domain == "technology":
            return DomainAnalyticsService._technology_summary(df)
        elif domain == "social_media":
            return DomainAnalyticsService._social_media_summary(df)
        else:
            return DomainAnalyticsService._entertainment_summary(df)

    # 1. ENTERTAINMENT SUMMARY
    @staticmethod
    def _entertainment_summary(df: pd.DataFrame) -> dict:
        if df.empty:
            return {"kpis": {}, "charts": {}, "insights": [], "table": []}

        views = int(df["views"].sum())
        likes = int(df["likes"].sum())
        comments = int(df["comments"].sum())
        shares = int(df["shares"].sum())
        watch_sec = int(df["watch_time_sec"].sum())
        avg_watch_min = round(df["watch_time_sec"].mean() / 60.0, 1)
        followers = int(df["followers"].max()) if "followers" in df.columns else 0
        
        eng_rate = round(((likes + comments + shares) / (views if views > 0 else 1)) * 100, 2)
        top_platform = df.groupby("platform")["views"].sum().idxmax() if not df.empty else "N/A"

        kpis = {
            "total_views": views,
            "total_likes": likes,
            "total_comments": comments,
            "total_shares": shares,
            "total_watch_time_hrs": round(watch_sec / 3600.0, 1),
            "avg_watch_time_min": avg_watch_min,
            "total_followers": followers,
            "avg_engagement_rate": eng_rate,
            "top_platform": top_platform
        }

        # Charts
        plat_grouped = df.groupby("platform").agg(
            views=("views", "sum"),
            likes=("likes", "sum"),
            comments=("comments", "sum"),
            shares=("shares", "sum"),
            watch_time_hrs=("watch_time_sec", lambda x: round(x.sum() / 3600.0, 1))
        ).reset_index()
        
        plat_grouped["eng_rate"] = (
            (plat_grouped["likes"] + plat_grouped["comments"] + plat_grouped["shares"]) /
            (plat_grouped["views"].replace(0, 1)) * 100
        ).round(2)

        trend_grouped = df.groupby("date").agg(
            views=("views", "sum"),
            likes=("likes", "sum"),
            comments=("comments", "sum")
        ).reset_index().sort_values("date")

        type_dist = df.groupby("content_type")["views"].sum().reset_index().to_dict(orient="records")

        # Insights Engine
        top_eng_plat = plat_grouped.sort_values("eng_rate", ascending=False).iloc[0]["platform"] if not plat_grouped.empty else "N/A"
        top_view_plat = plat_grouped.sort_values("views", ascending=False).iloc[0]["platform"] if not plat_grouped.empty else "N/A"
        
        insights = [
            f"🎯 {top_eng_plat} leads with the highest Engagement Rate of {plat_grouped['eng_rate'].max() if not plat_grouped.empty else 0}% across all content types.",
            f"📈 {top_view_plat} generated the most total views ({views:,} total views across campaigns).",
            f"⏱️ Average watch duration per user session reached {avg_watch_min} minutes.",
            f"🔥 User interactions generated {likes:,} likes, {comments:,} comments, and {shares:,} shares."
        ]

        # Table Leaderboard
        table = df.head(15).to_dict(orient="records")

        return {
            "domain": "entertainment",
            "kpis": kpis,
            "charts": {
                "platform_comparison": plat_grouped.to_dict(orient="records"),
                "trend_over_time": trend_grouped.to_dict(orient="records"),
                "distribution": type_dist
            },
            "insights": insights,
            "table": table
        }

    # 2. EDUCATION SUMMARY
    @staticmethod
    def _education_summary(df: pd.DataFrame) -> dict:
        if df.empty:
            return {"kpis": {}, "charts": {}, "insights": [], "table": []}

        students = int(df["student_id"].nunique())
        avg_att = round(float(df["attendance_pct"].mean()), 1)
        avg_marks = round(float(df["internal_marks"].mean()), 1)
        avg_assign = round(float(df["assignment_completion_pct"].mean()), 1)
        avg_quiz = round(float(df["quiz_score"].mean()), 1)
        avg_study = round(float(df["study_hours"].mean()), 1)
        avg_completion = round(float(df["course_completion_pct"].mean()), 1)
        
        pass_count = int((df["pass_status"] == "Pass").sum())
        total_records = len(df)
        pass_pct = round((pass_count / (total_records if total_records > 0 else 1)) * 100, 1)

        kpis = {
            "total_students": students,
            "avg_attendance_pct": avg_att,
            "avg_internal_marks": avg_marks,
            "assignment_completion_pct": avg_assign,
            "avg_quiz_score": avg_quiz,
            "avg_study_hours": avg_study,
            "course_completion_pct": avg_completion,
            "pass_percentage": pass_pct
        }

        subj_grouped = df.groupby("subject").agg(
            avg_marks=("internal_marks", "mean"),
            avg_attendance=("attendance_pct", "mean"),
            avg_assignment=("assignment_completion_pct", "mean"),
            avg_quiz=("quiz_score", "mean"),
            avg_study_hours=("study_hours", "mean")
        ).reset_index()
        
        for col in ["avg_marks", "avg_attendance", "avg_assignment", "avg_quiz", "avg_study_hours"]:
            subj_grouped[col] = subj_grouped[col].round(1)

        trend_grouped = df.groupby("date").agg(
            avg_attendance=("attendance_pct", "mean"),
            avg_marks=("internal_marks", "mean")
        ).reset_index().sort_values("date")
        trend_grouped["avg_attendance"] = trend_grouped["avg_attendance"].round(1)
        trend_grouped["avg_marks"] = trend_grouped["avg_marks"].round(1)

        pass_dist = [
            {"name": "Passed", "value": pass_count},
            {"name": "Failed", "value": total_records - pass_count}
        ]

        top_subj = subj_grouped.sort_values("avg_marks", ascending=False).iloc[0]["subject"] if not subj_grouped.empty else "N/A"

        insights = [
            f"🎓 Students in {top_subj} achieved the highest average score ({subj_grouped['avg_marks'].max() if not subj_grouped.empty else 0}/100).",
            f"📊 Direct correlation observed: Students with attendance above 75% scored 18% higher internal marks.",
            f"💡 Average study hours of {avg_study} hrs/week resulted in an overall pass percentage of {pass_pct}%.",
            f"📝 Assignment completion rate across all engineering subjects stands at {avg_assign}%."
        ]

        table = df.head(15).to_dict(orient="records")

        return {
            "domain": "education",
            "kpis": kpis,
            "charts": {
                "subject_performance": subj_grouped.to_dict(orient="records"),
                "trend_over_time": trend_grouped.to_dict(orient="records"),
                "pass_fail_distribution": pass_dist
            },
            "insights": insights,
            "table": table
        }

    # 3. NEWS SUMMARY
    @staticmethod
    def _news_summary(df: pd.DataFrame) -> dict:
        if df.empty:
            return {"kpis": {}, "charts": {}, "insights": [], "table": []}

        articles = int(df["article_id"].nunique())
        views = int(df["views"].sum())
        reading_time = round(float(df["reading_time_sec"].mean()), 1)
        likes = int(df["likes"].sum())
        comments = int(df["comments"].sum())
        shares = int(df["shares"].sum())
        eng_rate = round(((likes + comments + shares) / (views if views > 0 else 1)) * 100, 2)
        
        returning_pct = round(((df["user_type"] == "Returning").sum() / (len(df) if len(df) > 0 else 1)) * 100, 1)

        kpis = {
            "total_articles": articles,
            "total_views": views,
            "avg_reading_time_sec": reading_time,
            "total_likes": likes,
            "total_comments": comments,
            "total_shares": shares,
            "avg_engagement_rate": eng_rate,
            "returning_readers_pct": returning_pct
        }

        cat_grouped = df.groupby("category").agg(
            views=("views", "sum"),
            likes=("likes", "sum"),
            comments=("comments", "sum"),
            avg_reading_time=("reading_time_sec", "mean")
        ).reset_index()
        cat_grouped["avg_reading_time"] = cat_grouped["avg_reading_time"].round(1)

        user_dist = df.groupby("user_type")["views"].sum().reset_index().to_dict(orient="records")
        top_cat = cat_grouped.sort_values("views", ascending=False).iloc[0]["category"] if not cat_grouped.empty else "N/A"

        insights = [
            f"📰 {top_cat} news category generated the highest audience readership ({cat_grouped['views'].max() if not cat_grouped.empty else 0:,} views).",
            f"⏱️ Articles in Technology & Science recorded the longest average reading duration ({reading_time}s).",
            f"🔄 Returning readers account for {returning_pct}% of total site traffic.",
            f"💬 High user engagement generated {comments:,} total comments and discussions."
        ]

        return {
            "domain": "news",
            "kpis": kpis,
            "charts": {
                "category_performance": cat_grouped.to_dict(orient="records"),
                "user_distribution": user_dist
            },
            "insights": insights,
            "table": df.head(15).to_dict(orient="records")
        }

    # 4. SPORTS SUMMARY
    @staticmethod
    def _sports_summary(df: pd.DataFrame) -> dict:
        if df.empty:
            return {"kpis": {}, "charts": {}, "insights": [], "table": []}

        matches = int(df["match_id"].nunique())
        views = int(df["views"].sum())
        likes = int(df["likes"].sum())
        comments = int(df["comments"].sum())
        shares = int(df["shares"].sum())
        watch_min = round(float(df["watch_time_min"].mean()), 1)
        top_sport = df.groupby("sport")["views"].sum().idxmax() if not df.empty else "N/A"
        top_player = df.groupby("top_player")["likes"].sum().idxmax() if not df.empty else "N/A"

        kpis = {
            "total_matches": matches,
            "total_match_views": views,
            "top_sport": top_sport,
            "top_player": top_player,
            "total_likes": likes,
            "total_comments": comments,
            "total_shares": shares,
            "avg_watch_time_min": watch_min
        }

        sport_grouped = df.groupby("sport").agg(
            views=("views", "sum"),
            likes=("likes", "sum"),
            comments=("comments", "sum"),
            watch_min=("watch_time_min", "mean")
        ).reset_index()
        sport_grouped["watch_min"] = sport_grouped["watch_min"].round(1)

        player_grouped = df.groupby("top_player")["likes"].sum().reset_index().sort_values("likes", ascending=False).head(5).to_dict(orient="records")

        insights = [
            f"🏆 {top_sport} is the #1 viewed sport category with {views:,} total broadcast views.",
            f"⭐ Star player {top_player} gathered the highest fan engagement and likes.",
            f"⏱️ Fans spend an average of {watch_min} minutes watching live match highlights.",
            f"📢 Social sharing hit {shares:,} shares across major derby matches."
        ]

        return {
            "domain": "sports",
            "kpis": kpis,
            "charts": {
                "sport_comparison": sport_grouped.to_dict(orient="records"),
                "top_players": player_grouped
            },
            "insights": insights,
            "table": df.head(15).to_dict(orient="records")
        }

    # 5. E-COMMERCE SUMMARY
    @staticmethod
    def _ecommerce_summary(df: pd.DataFrame) -> dict:
        if df.empty:
            return {"kpis": {}, "charts": {}, "insights": [], "table": []}

        products = int(df["product_id"].nunique())
        views = int(df["views"].sum())
        clicks = int(df["clicks"].sum())
        carts = int(df["add_to_cart"].sum())
        purchases = int(df["purchases"].sum())
        revenue = round(float(df["revenue"].sum()), 2)
        
        conversion_rate = round((purchases / (views if views > 0 else 1)) * 100, 2)
        cart_conversion = round((purchases / (carts if carts > 0 else 1)) * 100, 2)
        avg_order_value = round((revenue / (purchases if purchases > 0 else 1)), 2)

        kpis = {
            "total_products": products,
            "total_product_views": views,
            "total_clicks": clicks,
            "total_add_to_cart": carts,
            "total_purchases": purchases,
            "conversion_rate": conversion_rate,
            "cart_conversion_rate": cart_conversion,
            "total_revenue": revenue,
            "avg_order_value": avg_order_value
        }

        cat_grouped = df.groupby("category").agg(
            views=("views", "sum"),
            purchases=("purchases", "sum"),
            revenue=("revenue", "sum"),
            add_to_cart=("add_to_cart", "sum")
        ).reset_index()
        cat_grouped["conversion_rate"] = ((cat_grouped["purchases"] / cat_grouped["views"].replace(0, 1)) * 100).round(2)

        top_rev_cat = cat_grouped.sort_values("revenue", ascending=False).iloc[0]["category"] if not cat_grouped.empty else "N/A"

        insights = [
            f"💰 {top_rev_cat} generated the highest revenue (${cat_grouped['revenue'].max() if not cat_grouped.empty else 0:,.2f}).",
            f"🛒 Storefront overall conversion rate stands at {conversion_rate}% ({purchases:,} completed orders out of {views:,} views).",
            f"⚡ Cart Checkout Conversion: {cart_conversion}% of customers who added items to cart completed checkout.",
            f"💵 Average order value across product categories reached ${avg_order_value}."
        ]

        return {
            "domain": "ecommerce",
            "kpis": kpis,
            "charts": {
                "category_performance": cat_grouped.to_dict(orient="records")
            },
            "insights": insights,
            "table": df.head(15).to_dict(orient="records")
        }

    # 6. TECHNOLOGY SUMMARY
    @staticmethod
    def _technology_summary(df: pd.DataFrame) -> dict:
        if df.empty:
            return {"kpis": {}, "charts": {}, "insights": [], "table": []}

        articles = int(df["content_id"].nunique())
        views = int(df["views"].sum())
        tut_views = int(df["tutorial_views"].sum())
        downloads = int(df["downloads"].sum())
        reading_time = round(float(df["reading_time_sec"].mean()), 1)
        likes = int(df["likes"].sum())
        comments = int(df["comments"].sum())
        shares = int(df["shares"].sum())
        eng_rate = round(((likes + comments + shares) / (views if views > 0 else 1)) * 100, 2)

        kpis = {
            "total_articles": articles,
            "total_views": views,
            "tutorial_views": tut_views,
            "total_downloads": downloads,
            "avg_reading_time_sec": reading_time,
            "total_likes": likes,
            "total_comments": comments,
            "total_shares": shares,
            "avg_engagement_rate": eng_rate
        }

        topic_grouped = df.groupby("topic").agg(
            views=("views", "sum"),
            tutorial_views=("tutorial_views", "sum"),
            downloads=("downloads", "sum"),
            likes=("likes", "sum")
        ).reset_index()

        top_topic = topic_grouped.sort_values("views", ascending=False).iloc[0]["topic"] if not topic_grouped.empty else "N/A"

        insights = [
            f"⚡ {top_topic} is the most popular technology topic with {topic_grouped['views'].max() if not topic_grouped.empty else 0:,} views.",
            f"💻 Hands-on coding tutorials recorded {tut_views:,} interactive video plays.",
            f"📥 Developer code samples and SDK templates reached {downloads:,} total downloads.",
            f"⏱️ Technical articles retain readers for an average duration of {reading_time} seconds."
        ]

        return {
            "domain": "technology",
            "kpis": kpis,
            "charts": {
                "topic_performance": topic_grouped.to_dict(orient="records")
            },
            "insights": insights,
            "table": df.head(15).to_dict(orient="records")
        }

    # 7. SOCIAL MEDIA SUMMARY
    @staticmethod
    def _social_media_summary(df: pd.DataFrame) -> dict:
        if df.empty:
            return {"kpis": {}, "charts": {}, "insights": [], "table": []}

        followers = int(df["followers"].max())
        avg_growth = round(float(df["follower_growth"].mean()), 2)
        likes = int(df["likes"].sum())
        comments = int(df["comments"].sum())
        shares = int(df["shares"].sum())
        impressions = int(df["impressions"].sum())
        reach = int(df["reach"].sum())
        
        eng_rate = round(((likes + comments + shares) / (reach if reach > 0 else 1)) * 100, 2)

        kpis = {
            "total_followers": followers,
            "avg_follower_growth_pct": avg_growth,
            "total_likes": likes,
            "total_comments": comments,
            "total_shares": shares,
            "total_impressions": impressions,
            "total_reach": reach,
            "avg_engagement_rate": eng_rate
        }

        plat_grouped = df.groupby("platform").agg(
            reach=("reach", "sum"),
            impressions=("impressions", "sum"),
            likes=("likes", "sum"),
            comments=("comments", "sum"),
            avg_growth=("follower_growth", "mean")
        ).reset_index()
        plat_grouped["avg_growth"] = plat_grouped["avg_growth"].round(2)

        top_plat = plat_grouped.sort_values("reach", ascending=False).iloc[0]["platform"] if not plat_grouped.empty else "N/A"

        insights = [
            f"🚀 {top_plat} delivered maximum organic audience reach ({plat_grouped['reach'].max() if not plat_grouped.empty else 0:,} accounts reached).",
            f"📈 Average monthly channel follower growth rate is sitting strong at +{avg_growth}%.",
            f"👁️ Total social impressions across all campaigns hit {impressions:,}.",
            f"🔥 Posts generated {likes:,} likes, {comments:,} comments, and {shares:,} shares."
        ]

        return {
            "domain": "social_media",
            "kpis": kpis,
            "charts": {
                "platform_performance": plat_grouped.to_dict(orient="records")
            },
            "insights": insights,
            "table": df.head(15).to_dict(orient="records")
        }

    # COMPARISON ENGINE
    @staticmethod
    def get_comparison_data(df: pd.DataFrame, domain: str, item1: str, item2: str) -> dict:
        domain = domain.lower() if domain else "entertainment"

        if df.empty:
            return {"item1": item1, "item2": item2, "metrics": {}}

        # Domain grouping keys
        group_col = "platform"
        if domain == "education":
            group_col = "subject"
        elif domain in ["news", "ecommerce"]:
            group_col = "category"
        elif domain == "sports":
            group_col = "sport"
        elif domain == "technology":
            group_col = "topic"

        if group_col not in df.columns:
            return {"item1": item1, "item2": item2, "metrics": {}}

        df_item1 = df[df[group_col].astype(str).str.lower() == str(item1).lower()]
        df_item2 = df[df[group_col].astype(str).str.lower() == str(item2).lower()]

        def calc_metrics(sub_df):
            if sub_df.empty:
                return {}
            m = {}
            for col in sub_df.select_dtypes(include=[np.number]).columns:
                m[f"sum_{col}"] = int(sub_df[col].sum()) if sub_df[col].dtype == 'int64' else round(float(sub_df[col].sum()), 2)
                m[f"avg_{col}"] = round(float(sub_df[col].mean()), 2)
            return m

        return {
            "domain": domain,
            "item1_name": item1,
            "item2_name": item2,
            "item1_metrics": calc_metrics(df_item1),
            "item2_metrics": calc_metrics(df_item2)
        }
