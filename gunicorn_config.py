bind = "0.0.0.0:8000"
workers = 4  # nombre de processus de travail
worker_class = "sync"
timeout = 120
keepalive = 5
errorlog = "gunicorn-error.log"
accesslog = "gunicorn-access.log"
loglevel = "info"
