-- WebInsight Analytics & Visualization System
-- Multi-Domain PostgreSQL Database Schema (Expanded 1000+ Records per Domain)

-- 1. Entertainment Analytics
DROP TABLE IF EXISTS entertainment_analytics CASCADE;
CREATE TABLE entertainment_analytics (
    id SERIAL PRIMARY KEY,
    content_id VARCHAR(50) NOT NULL,
    content_title VARCHAR(255) NOT NULL,
    platform VARCHAR(50) NOT NULL,
    content_type VARCHAR(50) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    views INT NOT NULL DEFAULT 0,
    likes INT NOT NULL DEFAULT 0,
    comments INT NOT NULL DEFAULT 0,
    shares INT NOT NULL DEFAULT 0,
    watch_time_sec INT NOT NULL DEFAULT 0,
    followers INT NOT NULL DEFAULT 0,
    region VARCHAR(50) NOT NULL,
    device VARCHAR(50) NOT NULL,
    user_type VARCHAR(20) NOT NULL,
    engagement_score NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    date DATE NOT NULL
);

-- 2. Education Analytics
DROP TABLE IF EXISTS education_analytics CASCADE;
CREATE TABLE education_analytics (
    id SERIAL PRIMARY KEY,
    student_id VARCHAR(20) NOT NULL,
    student_name VARCHAR(100) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    semester VARCHAR(20) NOT NULL,
    attendance_pct NUMERIC(5,2) NOT NULL,
    internal_marks INT NOT NULL,
    assignment_completion_pct NUMERIC(5,2) NOT NULL,
    quiz_score INT NOT NULL,
    study_hours NUMERIC(4,1) NOT NULL,
    course_completion_pct NUMERIC(5,2) NOT NULL,
    grade VARCHAR(5) NOT NULL,
    pass_status VARCHAR(10) NOT NULL,
    date DATE NOT NULL
);

-- 3. News Analytics
DROP TABLE IF EXISTS news_analytics CASCADE;
CREATE TABLE news_analytics (
    id SERIAL PRIMARY KEY,
    article_id VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    author VARCHAR(100) NOT NULL,
    sentiment VARCHAR(30) NOT NULL,
    views INT NOT NULL DEFAULT 0,
    reading_time_sec INT NOT NULL DEFAULT 0,
    likes INT NOT NULL DEFAULT 0,
    comments INT NOT NULL DEFAULT 0,
    shares INT NOT NULL DEFAULT 0,
    region VARCHAR(50) NOT NULL,
    user_type VARCHAR(20) NOT NULL,
    date DATE NOT NULL
);

-- 4. Sports Analytics
DROP TABLE IF EXISTS sports_analytics CASCADE;
CREATE TABLE sports_analytics (
    id SERIAL PRIMARY KEY,
    match_id VARCHAR(50) NOT NULL,
    match_title VARCHAR(255) NOT NULL,
    sport VARCHAR(50) NOT NULL,
    tournament VARCHAR(100) NOT NULL,
    team_1 VARCHAR(100) NOT NULL,
    team_2 VARCHAR(100) NOT NULL,
    top_player VARCHAR(100) NOT NULL,
    broadcaster VARCHAR(100) NOT NULL,
    views INT NOT NULL DEFAULT 0,
    likes INT NOT NULL DEFAULT 0,
    comments INT NOT NULL DEFAULT 0,
    shares INT NOT NULL DEFAULT 0,
    watch_time_min NUMERIC(5,1) NOT NULL DEFAULT 0.0,
    date DATE NOT NULL
);

-- 5. E-Commerce Analytics
DROP TABLE IF EXISTS ecommerce_analytics CASCADE;
CREATE TABLE ecommerce_analytics (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(50) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    views INT NOT NULL DEFAULT 0,
    clicks INT NOT NULL DEFAULT 0,
    add_to_cart INT NOT NULL DEFAULT 0,
    purchases INT NOT NULL DEFAULT 0,
    price NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    discount_pct INT NOT NULL DEFAULT 0,
    revenue NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    rating NUMERIC(3,1) NOT NULL DEFAULT 0.0,
    region VARCHAR(50) NOT NULL,
    date DATE NOT NULL
);

-- 6. Technology Analytics
DROP TABLE IF EXISTS technology_analytics CASCADE;
CREATE TABLE technology_analytics (
    id SERIAL PRIMARY KEY,
    content_id VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    topic VARCHAR(50) NOT NULL,
    difficulty VARCHAR(30) NOT NULL,
    content_type VARCHAR(50) NOT NULL,
    views INT NOT NULL DEFAULT 0,
    tutorial_views INT NOT NULL DEFAULT 0,
    downloads INT NOT NULL DEFAULT 0,
    github_stars INT NOT NULL DEFAULT 0,
    reading_time_sec INT NOT NULL DEFAULT 0,
    likes INT NOT NULL DEFAULT 0,
    comments INT NOT NULL DEFAULT 0,
    shares INT NOT NULL DEFAULT 0,
    date DATE NOT NULL
);

-- 7. Social Media Analytics
DROP TABLE IF EXISTS social_media_analytics CASCADE;
CREATE TABLE social_media_analytics (
    id SERIAL PRIMARY KEY,
    post_id VARCHAR(50) NOT NULL,
    platform VARCHAR(50) NOT NULL,
    account_name VARCHAR(100) NOT NULL,
    content_type VARCHAR(50) NOT NULL,
    followers INT NOT NULL DEFAULT 0,
    follower_growth NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    likes INT NOT NULL DEFAULT 0,
    comments INT NOT NULL DEFAULT 0,
    shares INT NOT NULL DEFAULT 0,
    impressions INT NOT NULL DEFAULT 0,
    reach INT NOT NULL DEFAULT 0,
    virality_score NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    region VARCHAR(50) NOT NULL,
    date DATE NOT NULL
);

-- Performance Indexes
CREATE INDEX idx_ent_plat_region ON entertainment_analytics(platform, region);
CREATE INDEX idx_edu_subj_dept ON education_analytics(subject, department);
CREATE INDEX idx_news_cat_auth ON news_analytics(category, author);
CREATE INDEX idx_sports_sport_tourn ON sports_analytics(sport, tournament);
CREATE INDEX idx_ecom_cat_brand ON ecommerce_analytics(category, brand);
CREATE INDEX idx_tech_topic_diff ON technology_analytics(topic, difficulty);
CREATE INDEX idx_soc_plat_type ON social_media_analytics(platform, content_type);
