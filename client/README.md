# WorkOS Users + Roles Clients

### Running the project

Start the server.

In the parent folder, run the following commands

```
cd server
npm run api
```

Start the client:

```
cd client
npm run dev
```

### Project Structure

- `api` - service layer to fetch data from the server and manage the cache
- `components` - reusable UI components
- `RolesTab` - components specific to the roles tab
- `UsersTab` - components specific to the Users tab

### Libraries Used

[@tanstack/react-query](https://tanstack.com/query/latest/docs/framework/react)
[Radix](https://www.radix-ui.com/)

Built with https://vitejs.dev/ <img width="20" src="https://vitejs.dev/logo.svg"/>

### Environment Variables:

Environment variables are managed in .env

- `VITE_APP_API_URL` - the URL to the server - default http://localhost:3002
