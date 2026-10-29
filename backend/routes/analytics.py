from flask import Blueprint, request, jsonify, Response
from database import db_manager
from services.domain_analytics_service import DomainAnalyticsService
from services.analytics_service import AnalyticsService

analytics_bp = Blueprint("analytics", __name__, url_prefix="/api/analytics")

def extract_filters():
    return {
        "domain": request.args.get("domain", "entertainment"),
        "category": request.args.get("category") or request.args.get("filter_value", "All"),
        "start_date": request.args.get("start_date", ""),
        "end_date": request.args.get("end_date", ""),
        "search": request.args.get("search", "")
    }

# NEW DOMAIN-BASED ENDPOINTS

@analytics_bp.route("/domain-summary", methods=["GET"])
def get_domain_summary():
    filters = extract_filters()
    domain = filters["domain"]
    df = db_manager.get_domain_data(domain=domain, filters=filters)
    data = DomainAnalyticsService.get_domain_summary(df, domain=domain)
    return jsonify({"status": "success", "data": data})

@analytics_bp.route("/comparison", methods=["GET"])
def get_comparison():
    filters = extract_filters()
    domain = filters["domain"]
    item1 = request.args.get("item1", "")
    item2 = request.args.get("item2", "")
    df = db_manager.get_domain_data(domain=domain, filters=filters)
    data = DomainAnalyticsService.get_comparison_data(df, domain=domain, item1=item1, item2=item2)
    return jsonify({"status": "success", "data": data})

@analytics_bp.route("/explorer", methods=["GET"])
def get_explorer_data():
    filters = extract_filters()
    domain = filters["domain"]
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 15))
    
    df = db_manager.get_domain_data(domain=domain, filters=filters)
    total_records = len(df)
    
    start_idx = (page - 1) * limit
    end_idx = start_idx + limit
    paginated_df = df.iloc[start_idx:end_idx] if not df.empty else df

    return jsonify({
        "status": "success",
        "domain": domain,
        "page": page,
        "limit": limit,
        "total_records": total_records,
        "total_pages": (total_records + limit - 1) // limit if limit > 0 else 1,
        "data": paginated_df.to_dict(orient="records")
    })

# BACKWARDS COMPATIBILITY ROUTES

@analytics_bp.route("/overview", methods=["GET"])
def get_overview():
    filters = extract_filters()
    df = db_manager.get_domain_data(domain="entertainment", filters=filters)
    data = AnalyticsService.get_overview(df)
    return jsonify({"status": "success", "data": data})

@analytics_bp.route("/content", methods=["GET"])
def get_content_analytics():
    filters = extract_filters()
    df = db_manager.get_domain_data(domain="entertainment", filters=filters)
    data = AnalyticsService.get_content_analytics(df)
    return jsonify({"status": "success", "data": data, "count": len(data)})

@analytics_bp.route("/categories", methods=["GET"])
def get_category_analytics():
    filters = extract_filters()
    df = db_manager.get_domain_data(domain="entertainment", filters=filters)
    data = AnalyticsService.get_category_analytics(df)
    return jsonify({"status": "success", "data": data})

@analytics_bp.route("/devices", methods=["GET"])
def get_device_analytics():
    filters = extract_filters()
    df = db_manager.get_domain_data(domain="entertainment", filters=filters)
    data = AnalyticsService.get_device_analytics(df)
    return jsonify({"status": "success", "data": data})

@analytics_bp.route("/user-types", methods=["GET"])
def get_user_type_analytics():
    filters = extract_filters()
    df = db_manager.get_domain_data(domain="entertainment", filters=filters)
    data = AnalyticsService.get_user_type_analytics(df)
    return jsonify({"status": "success", "data": data})

@analytics_bp.route("/trends", methods=["GET"])
def get_trend_analytics():
    filters = extract_filters()
    df = db_manager.get_domain_data(domain="entertainment", filters=filters)
    data = AnalyticsService.get_trend_analytics(df)
    return jsonify({"status": "success", "data": data})

@analytics_bp.route("/top-content", methods=["GET"])
def get_top_content():
    filters = extract_filters()
    limit = int(request.args.get("limit", 10))
    df = db_manager.get_domain_data(domain="entertainment", filters=filters)
    data = AnalyticsService.get_top_content(df, limit=limit)
    return jsonify({"status": "success", "data": data})

@analytics_bp.route("/export", methods=["GET"])
def export_csv():
    filters = extract_filters()
    domain = filters["domain"]
    df = db_manager.get_domain_data(domain=domain, filters=filters)
    csv_data = df.to_csv(index=False)
    return Response(
        csv_data,
        mimetype="text/csv",
        headers={"Content-disposition": f"attachment; filename={domain}_analytics_export.csv"}
    )
