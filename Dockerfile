FROM python:3.9
ENV PYTHONUNBUFFERED=1
RUN mkdir /app
WORKDIR /app
RUN pip install --upgrade pip
COPY requirements.txt /app/
RUN pip install -r requirements.txt
COPY . /app
Expose 8000
#RUN python manage.py makemigrations
#RUN python manage.py migrate
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
