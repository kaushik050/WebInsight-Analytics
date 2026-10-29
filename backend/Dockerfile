FROM python:3.10-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Generate 1000 records per domain and seed SQLite DB
RUN python data/generate_domain_datasets.py
RUN python -c "from database import db_manager; db_manager.seed_databases()"

EXPOSE 5000

ENV FLASK_APP=app.py
ENV PORT=5000

CMD ["python", "app.py"]
