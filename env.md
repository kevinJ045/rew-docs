# Module `env`
The `env` module lets you look in the environment variables, set items, get items and so on...

```coffee{1}
env = imp 'env'

# check if exists
env.has('MY_VARIABLE') # boolean

# get variable
env.get('MY_VARIABLE') # string

# set variable
env.set('MY_VARIABLE', 'value')

# remove variable
env.rm('MY_VARIABLE')

# check if variable is a certain value
env.is('MY_VARIABLE', 'my value') # boolean
```