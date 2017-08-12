# No Thank! - card game

# Setup 🚧

## Installing Prerequisites

1. Node
* Install from [nodejs.org](https://nodejs.org)

2. Yarn
```sh
curl -o- -L https://yarnpkg.com/install.sh | bash
```

3. Python

* Install from [python.org] (https://www.python.org/downloads/)
* Both python 2 and 3 works, but python 2 is highly recommended due to better competibility

4. Django
* Install from [djangoproject.com](https://docs.djangoproject.com/en/1.11/topics/install/)
```sh
pip install Django
```


## Editor Packages

The following are helpful packages to install in your editor.

### Atom

* [linter-eslint](https://atom.io/packages/linter-eslint)
* [linter-flow](https://atom.io/packages/linter-flow)
* [language-babel](https://atom.io/packages/language-babel)

# Running No Thanks 🚀

To start No Thanks:
  1. Install dependencies with `yarn`
    ```
      yarn install
    ```
  2. Install python virtual environment (the name has to be venv)
    ```
      virtualenv venv
    ```
  3. ```
       source venv/bin/activate
     ```
  4. Install all the Django dependencies
    ```
      pip install -r requirements.txt
    ```
  5. Lastly for python 2 users
    ```
      npm run py2
    ```
     And for python 3 users
    ```
      npm run py3
    ```

Open your browser and type [`localhost:8000`](http://localhost:8000) to run No Thanks locally

# Style Guide 💅

All code must follow [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).
