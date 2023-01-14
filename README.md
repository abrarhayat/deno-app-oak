# A Deno app based on the Oak Framework

A demo To Do app written in TypeScript in Deno

- For this to work, deno MUST be installed.
  More info on installation:
  [deno](https://deno.land/manual/getting_started/installation)

  For example for Mac systems using Homebrew, in the terminal, enter this command:

- `brew install deno`
- Create a new file in the project root directory named **.env**
- Inside the **.env** file, copy the following and fill up with valid mysql database information :

```
PORT=8000
MY_SQL_SCHEMA=valid_schema_name
MY_SQL_HOST=valid_mysql_host
MY_SQL_USERNAME=valid_username
MY_SQL_PASSWORD=valid_password
MY_SQL_PORT=valid_port
```

More info: [DenoDB](https://eveningkid.com/denodb-docs/docs/getting-started)

- Now, in the terminal, enter:
- `deno run --allow-env --allow-net --allow-read app.ts`
- Server should now running with the endpoints in http://localhost:8000
