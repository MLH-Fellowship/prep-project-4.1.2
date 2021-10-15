import os
from fastapi import FastAPI
from routers import oauth
from starlette.middleware.sessions import SessionMiddleware
from starlette.responses import HTMLResponse
from starlette.requests import Request
from fastapi.middleware.cors import CORSMiddleware
from db import models
from db.database import engine


# Create DB tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()


# use app.include_router to add another app's routes
app.include_router(oauth.router, prefix="/oauth")

ALLOWED_HOSTS = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_HOSTS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Set up the middleware to read the request session
SECRET_KEY = os.environ.get('SECRET_KEY') or None
if SECRET_KEY is None:
    raise 'Missing SECRET_KEY'
app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get('/oauth2callback')
async def token(request: Request):
    return HTMLResponse('''
                <script>
                function send(){
                    var req = new XMLHttpRequest();
                    req.onreadystatechange = function() {
                        if (req.readyState === 4) {
                            console.log(req.response);
                            if (req.response["result"] === true) {
                                window.localStorage.setItem('jwt', req.response["access_token"]);
                                console.log(req.response)
                            }
                        }
                    }
                    req.withCredentials = true;
                    req.responseType = 'json';
                    req.open("get", "/oauth/oauth2callback?"+window.location.search.substr(1), true);
                    req.send("");

                }
                </script>
                <button onClick="send()">Get FastAPI JWT Token</button>
            ''')
