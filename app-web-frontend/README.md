# Emotional-Support App --- Web Front-End

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Documentation URLs for our stack:

- [@fullcalendar](https://fullcalendar.io/docs)
- [axios](https://axios-http.com/docs/intro)
- [bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- [bootstrap-icons](https://icons.getbootstrap.com/)
- [bootswatch](https://bootswatch.com/)
- [emoji-mart](https://www.npmjs.com/package/emoji-mart)
- [react](https://react.dev/)
- [react-color](https://casesandberg.github.io/react-color/)
- [react-dom](https://react.dev/reference/react-dom)
- [react-router-dom](https://reactrouter.com/en/main)
- [react-scripts](https://create-react-app.dev/docs/getting-started/)
- [startbootstrap-sb-admin-2](https://startbootstrap.com/theme/sb-admin-2)
- [styled-components](https://styled-components.com/docs)
- [web-vitals](https://www.npmjs.com/package/web-vitals)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


### Deployment instruction

If you want to use a local version of the application, you can deploy our application. 
To deploy the application in Docker containers on a Linux machine with Docker installed, follow these steps:

1. Navigate inside the repository.
2. Execute: chmod +x deploy.sh.
3. Run the deploy script: ./deploy.sh.

The script deploys 3 Docker containers:

- Web app with Nginx: The Nginx serves the web app requests and proxies API requests sent to /api to the backend container.
- Backend: The backend processes data and interacts with the database.
- DB: The database container that stores all app-related data.

---

### Work Done

A list of all the work completed during the implementation sprints is available [here](https://docs.google.com/presentation/d/1uyN3Xe7WYpE58yw565GDzBhU4o4cmOs2Ut65KAcG2X8/edit?usp=sharing).
