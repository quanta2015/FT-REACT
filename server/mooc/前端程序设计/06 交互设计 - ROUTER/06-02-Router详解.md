title: Router详解
theme: light

[slide]
# Router详解

[slide]
## Installation
使用npm安装 `react-router-dom`

```sh
npm install react-router-dom
```

## 范例1: 基本路由
下面范例通过 3 个`<Router>`控制 3个 `Page` 对象。

> `<a href="/">` 的功能被 `<Link to="/">` 代替了。

```jsx
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Index = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

const AppRouter = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about/">About</Link></li>
          <li><Link to="/users/">Users</Link></li>
        </ul>
      </nav>
      <Route path="/" exact component={Index} />
      <Route path="/about/" component={About} />
      <Route path="/users/" component={Users} />
    </div>
  </Router>
);
export default AppRouter;
```

## 范例2: 嵌套路由
路由 `/topics` 加载 `Topics` 对象, 而`Topics` 对象根据  `<Route>`传过来的 `:id` 渲染数据内容.

```jsx
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const App = () => (
  <Router>
    <div>
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/topics" component={Topics} />
    </div>
  </Router>
);
const Home = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;
const Topic = ({ match }) => <h3>Requested Param: {match.params.id}</h3>;
const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li><Link to={`${match.url}/components`}>Components</Link></li>
      <li><Link to={`${match.url}/props-v-state`}>Props v. State</Link></li>
    </ul>
    <Route path={`${match.path}/:id`} component={Topic} />
    <Route exact path={match.path} render={() => <h3>Please select a topic.</h3>}/>
  </div>
);
const Header = () => (
  <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/about">About</Link></li>
    <li><Link to="/topics">Topics</Link></li>
  </ul>
);
export default App;
```




# Basic Components

There are three types of components in React Router: router components, route matching components, and navigation components.

All of the components that you use in a web application should be imported from `react-router-dom`.

```js
import { BrowserRouter, Route, Link } from "react-router-dom";
```

## Routers

At the core of every React Router application should be a router component. For web projects, `react-router-dom` provides `<BrowserRouter>` and `<HashRouter>` routers. Both of these will create a specialized `history` object for you. Generally speaking, you should use a `<BrowserRouter>` if you have a server that responds to requests and a `<HashRouter>` if you are using a static file server.

```jsx
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  holder
);
```

## Route Matching

There are two route matching components: `<Route>` and `<Switch>`.

```js
import { Route, Switch } from "react-router-dom";
```

Route matching is done by comparing a `<Route>`'s `path` prop to the current location's `pathname`. When a `<Route>` matches it will render its content and when it does not match, it will render `null`. A `<Route>` with no path will always match.

```jsx
// when location = { pathname: '/about' }
<Route path='/about' component={About}/> // renders <About/>
<Route path='/contact' component={Contact}/> // renders null
<Route component={Always}/> // renders <Always/>
```

You can include a `<Route>` anywhere that you want to render content based on the location. It will often make sense to list a number of possible `<Route>`s next to each other. The `<Switch>` component is used to group `<Route>`s together.

```jsx
<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/contact" component={Contact} />
</Switch>
```

The `<Switch>` is not required for grouping `<Route>`s, but it can be quite useful. A `<Switch>` will iterate over all of its children `<Route>` elements and only render the first one that matches the current location. This helps when multiple route's paths match the same pathname, when animating transitions between routes, and in identifying when no routes match the current location (so that you can render a "404" component).

```jsx
<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/contact" component={Contact} />
  {/* when none of the above match, <NoMatch> will be rendered */}
  <Route component={NoMatch} />
</Switch>
```

## Route Rendering Props

You have three prop choices for how you render a component for a given `<Route>`: `component`, `render`, and `children`. You can check out the [`<Route>` documentation](../api/Route.md) for more information on each one, but here we'll focus on `component` and `render` because those are the two you will almost always use.

`component` should be used when you have an existing component (either a `React.Component` or a stateless functional component) that you want to render. `render`, which takes an inline function, should only be used when you have to pass in-scope variables to the component you want to render. You should **not** use the `component` prop with an inline function to pass in-scope variables because you will get undesired component unmounts/remounts.

```jsx
const Home = () => <div>Home</div>;

const App = () => {
  const someVariable = true;

  return (
    <Switch>
      {/* these are good */}
      <Route exact path="/" component={Home} />
      <Route
        path="/about"
        render={props => <About {...props} extra={someVariable} />}
      />
      {/* do not do this */}
      <Route
        path="/contact"
        component={props => <Contact {...props} extra={someVariable} />}
      />
    </Switch>
  );
};
```

## Navigation

React Router provides a `<Link>` component to create links in your application. Wherever you render a `<Link>`, an anchor (`<a>`) will be rendered in your application's HTML.

```jsx
<Link to="/">Home</Link>
// <a href='/'>Home</a>
```

The `<NavLink>` is a special type of `<Link>` that can style itself as "active" when its `to` prop matches the current location.

```jsx
// location = { pathname: '/react' }
<NavLink to="/react" activeClassName="hurray">
  React
</NavLink>
// <a href='/react' className='hurray'>React</a>
```

Any time that you want to force navigation, you can render a `<Redirect>`. When a `<Redirect>` renders, it will navigate using its `to` prop.

```jsx
<Redirect to="/login" />
```










# Server Rendering

Rendering on the server is a bit different since it's all stateless. The basic idea is that we wrap the app in a stateless [`<StaticRouter>`][staticrouter] instead of a [`<BrowserRouter>`][browserrouter]. We pass in the requested url from the server so the routes can match and a `context` prop we'll discuss next.

```jsx
// client
<BrowserRouter>
  <App/>
</BrowserRouter>

// server (not the complete story)
<StaticRouter
  location={req.url}
  context={context}
>
  <App/>
</StaticRouter>
```

When you render a [`<Redirect>`][redirect] on the client, the browser history changes state and we get the new screen. In a static server environment we can't change the app state. Instead, we use the `context` prop to find out what the result of rendering was. If we find a `context.url`, then we know the app redirected. This allows us to send a proper redirect from the server.

```jsx
const context = {};
const markup = ReactDOMServer.renderToString(
  <StaticRouter location={req.url} context={context}>
    <App />
  </StaticRouter>
);

if (context.url) {
  // Somewhere a `<Redirect>` was rendered
  redirect(301, context.url);
} else {
  // we're good, send the response
}
```

## Adding app specific context information

The router only ever adds `context.url`. But you may want some redirects to be 301 and others 302. Or maybe you'd like to send a 404 response if some specific branch of UI is rendered, or a 401 if they aren't authorized. The context prop is yours, so you can mutate it. Here's a way to distinguish between 301 and 302 redirects:

```jsx
const RedirectWithStatus = ({ from, to, status }) => (
  <Route
    render={({ staticContext }) => {
      // there is no `staticContext` on the client, so
      // we need to guard against that here
      if (staticContext) staticContext.status = status;
      return <Redirect from={from} to={to} />;
    }}
  />
);

// somewhere in your app
const App = () => (
  <Switch>
    {/* some other routes */}
    <RedirectWithStatus status={301} from="/users" to="/profiles" />
    <RedirectWithStatus status={302} from="/courses" to="/dashboard" />
  </Switch>
);

// on the server
const context = {};

const markup = ReactDOMServer.renderToString(
  <StaticRouter context={context}>
    <App />
  </StaticRouter>
);

if (context.url) {
  // can use the `context.status` that
  // we added in RedirectWithStatus
  redirect(context.status, context.url);
}
```

## 404, 401, or any other status

We can do the same thing as above. Create a component that adds some context and render it anywhere in the app to get a different status code.

```jsx
const Status = ({ code, children }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) staticContext.status = code;
      return children;
    }}
  />
);
```

Now you can render a `Status` anywhere in the app that you want to add the code to `staticContext`.

```jsx
const NotFound = () => (
  <Status code={404}>
    <div>
      <h1>Sorry, can’t find that.</h1>
    </div>
  </Status>
)

// somewhere else
<Switch>
  <Route path="/about" component={About}/>
  <Route path="/dashboard" component={Dashboard}/>
  <Route component={NotFound}/>
</Switch>
```

## Putting it all together

This isn't a real app, but it shows all of the general pieces you'll
need to put it all together.

```jsx
import { createServer } from "http";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App";

createServer((req, res) => {
  const context = {};

  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    });
    res.end();
  } else {
    res.write(`
      <!doctype html>
      <div id="app">${html}</div>
    `);
    res.end();
  }
}).listen(3000);
```

And then the client:

```jsx
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
```

## Data Loading

There are so many different approaches to this, and there's no clear best practice yet, so we seek to be composable with any approach, and not prescribe or lean toward one or the other. We're confident the router can fit inside the constraints of your application.

The primary constraint is that you want to load data before you render. React Router exports the `matchPath` static function that it uses internally to match locations to routes. You can use this function on the server to help determine what your data dependencies will be before rendering.

The gist of this approach relies on a static route config used to both render your routes and match against before rendering to determine data dependencies.

```js
const routes = [
  {
    path: "/",
    component: Root,
    loadData: () => getSomeData()
  }
  // etc.
];
```

Then use this config to render your routes in the app:

```jsx
import { routes } from "./routes";

const App = () => (
  <Switch>
    {routes.map(route => (
      <Route {...route} />
    ))}
  </Switch>
);
```

Then on the server you'd have something like:

```js
import { matchPath } from "react-router-dom";

// inside a request
const promises = [];
// use `some` to imitate `<Switch>` behavior of selecting only
// the first to match
routes.some(route => {
  // use `matchPath` here
  const match = matchPath(req.path, route);
  if (match) promises.push(route.loadData(match));
  return match;
});

Promise.all(promises).then(data => {
  // do something w/ the data so the client
  // can access it then render the app
});
```

And finally, the client will need to pick up the data. Again, we aren't in the business of prescribing a data loading pattern for your app, but these are the touch points you'll need to implement.

You might be interested in our [React Router Config][rrc] package to assist with data loading and server rendering with static route configs.

[staticrouter]: ../api/StaticRouter.md
[browserrouter]: ../api/BrowserRouter.md
[redirect]: ../api/Redirect.md
[rrc]: https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config












# Code Splitting

One great feature of the web is that we don't have to make our visitors download the entire app before they can use it. You can think of code splitting as incrementally downloading the app. To accomplish this we'll use [webpack], [`@babel/plugin-syntax-dynamic-import`], and [`react-loadable`].

[webpack] has built-in support for [dynamic imports][import]; however, if you are using [Babel] (e.g., to compile JSX to JavaScript) then you will need to use the [`@babel/plugin-syntax-dynamic-import`] plugin. This is a syntax-only plugin, meaning Babel won't do any additional transformations. The plugin simply allows Babel to parse dynamic imports so webpack can bundle them as a code split. Your `.babelrc` should look something like this:

```json
{
  "presets": ["@babel/react"],
  "plugins": ["@babel/plugin-syntax-dynamic-import"]
}
```

[`react-loadable`] is a higher-order component for loading components with dynamic imports. It handles all sorts of edge cases automatically and makes code splitting simple! Here's an example of how to use [`react-loadable`]:

```jsx
import Loadable from "react-loadable";
import Loading from "./Loading";

const LoadableComponent = Loadable({
  loader: () => import("./Dashboard"),
  loading: Loading
});

export default class LoadableDashboard extends React.Component {
  render() {
    return <LoadableComponent />;
  }
}
```

That's all there is to it! Simply use `LoadableDashboard` (or whatever you named your component) and it will automatically be loaded and rendered when you use it in your application. The `loader` option is a function which actually loads the component, and `loading` is a placeholder component to show while the real component is loading.

## Code Splitting and Server-Side Rendering

[`react-loadable`] includes [a guide for server-side rendering][ssr]. All you should need to do is include [`babel-plugin-import-inspector`] in your `.babelrc` and server-side rendering should just work™. Here is an example `.babelrc` file:

```json
{
  "presets": ["@babel/react"],
  "plugins": [
    "@babel/plugin-syntax-dynamic-import",
    [
      "import-inspector",
      {
        "serverSideRequirePath": true
      }
    ]
  ]
}
```

[babel]: https://babeljs.io/
[`@babel/plugin-syntax-dynamic-import`]: https://babeljs.io/docs/plugins/syntax-dynamic-import/
[`babel-plugin-import-inspector`]: https://github.com/thejameskyle/react-loadable/tree/6902cc87f618446c54daa85d8fecec6836c9461a#babel-plugin-import-inspector
[`react-loadable`]: https://github.com/thejameskyle/react-loadable
[import]: https://github.com/tc39/proposal-dynamic-import
[webpack]: https://webpack.js.org/
[ssr]: https://github.com/thejameskyle/react-loadable/tree/6902cc87f618446c54daa85d8fecec6836c9461a#server-side-rendering












# Scroll Restoration

In earlier versions of React Router we provided out-of-the-box support for scroll restoration and people have been asking for it ever since. Hopefully this document helps you get what you need out of the scroll bar and routing!

Browsers are starting to handle scroll restoration with `history.pushState` on their own in the same manner they handle it with normal browser navigation. It already works in chrome and it's really great. [Here's the Scroll Restoration Spec](https://majido.github.io/scroll-restoration-proposal/history-based-api.html#web-idl).

Because browsers are starting to handle the "default case" and apps have varying scrolling needs (like this website!), we don't ship with default scroll management. This guide should help you implement whatever scrolling needs you have.

## Scroll to top

Most of the time all you need is to "scroll to the top" because you have a long content page, that when navigated to, stays scrolled down. This is straightforward to handle with a `<ScrollToTop>` component that will scroll the window up on every navigation, make sure to wrap it in `withRouter` to give it access to the router's props:

```jsx
class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
```

Then render it at the top of your app, but below Router

```jsx
const App = () => (
  <Router>
    <ScrollToTop>
      <App/>
    </ScrollToTop>
  </Router>
)

// or just render it bare anywhere you want, but just one :)
<ScrollToTop/>
```

If you have a tab interface connected to the router, then you probably don't want to be scrolling to the top when they switch tabs. Instead, how about a `<ScrollToTopOnMount>` in the specific places you need it?

```jsx
class ScrollToTopOnMount extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return null;
  }
}

class LongContent extends Component {
  render() {
    <div>
      <ScrollToTopOnMount />
      <h1>Here is my long content page</h1>
    </div>;
  }
}

// somewhere else
<Route path="/long-content" component={LongContent} />;
```

## Generic Solution

For a generic solution (and what browsers are starting to implement natively) we're talking about two things:

1. Scrolling up on navigation so you don't start a new screen scrolled to the bottom
2. Restoring scroll positions of the window and overflow elements on "back" and "forward" clicks (but not Link clicks!)

At one point we were wanting to ship a generic API. Here's what we were headed toward:

```jsx
<Router>
  <ScrollRestoration>
    <div>
      <h1>App</h1>

      <RestoredScroll id="bunny">
        <div style={{ height: "200px", overflow: "auto" }}>I will overflow</div>
      </RestoredScroll>
    </div>
  </ScrollRestoration>
</Router>
```

First, `ScrollRestoration` would scroll the window up on navigation. Second, it would use `location.key` to save the window scroll position _and_ the scroll positions of `RestoredScroll` components to `sessionStorage`. Then, when `ScrollRestoration` or `RestoredScroll` components mount, they could look up their position from `sessionsStorage`.

What got tricky for me was defining an "opt-out" API for when I didn't want the window scroll to be managed. For example, if you have some tab navigation floating inside the content of your page you probably _don't_ want to scroll to the top (the tabs might be scrolled out of view!).

When I learned that chrome manages scroll position for us now, and realized that different apps are going to have different scrolling needs, I kind of lost the belief that we needed to provide something--especially when people just want to scroll to the top (which you saw is straight-forward to add to your app on your own).

Based on this, we no longer feel strongly enough to do the work ourselves (like you we have limited time!). But, we'd love to help anybody who feels inclined to implement a generic solution. A solid solution could even live in the project. Hit us up if you get started on it :)





# Philosophy

This guide's purpose is to explain the mental model to have when using React Router. We call it "Dynamic Routing", which is quite different from the "Static Routing" you're probably more familiar with.

## Static Routing

If you've used Rails, Express, Ember, Angular etc. you've used static routing. In these frameworks, you declare your routes as part of your app's initialization before any rendering takes place. React Router pre-v4 was also static (mostly). Let's take a look at how to configure routes in express:

```js
// Express Style routing:
app.get("/", handleIndex);
app.get("/invoices", handleInvoices);
app.get("/invoices/:id", handleInvoice);
app.get("/invoices/:id/edit", handleInvoiceEdit);

app.listen();
```

Note how the routes are declared before the app listens. The client side routers we've used are similar. In Angular you declare your routes up front and then import them to the top-level `AppModule` before rendering:

```js
// Angular Style routing:
const appRoutes: Routes = [
  {
    path: "crisis-center",
    component: CrisisListComponent
  },
  {
    path: "hero/:id",
    component: HeroDetailComponent
  },
  {
    path: "heroes",
    component: HeroListComponent,
    data: { title: "Heroes List" }
  },
  {
    path: "",
    redirectTo: "/heroes",
    pathMatch: "full"
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)]
})
export class AppModule {}
```

Ember has a conventional `routes.js` file that the build reads and
imports into the application for you. Again, this happens before
your app renders.

```js
// Ember Style Router:
Router.map(function() {
  this.route("about");
  this.route("contact");
  this.route("rentals", function() {
    this.route("show", { path: "/:rental_id" });
  });
});

export default Router;
```

Though the APIs are different, they all share the model of "static routes". React Router also followed that lead up until v4.

To be successful with React Router, you need to forget all that! :O

## Backstory

To be candid, we were pretty frustrated with the direction we'd taken React Router by v2. We (Michael and Ryan) felt limited by the API, recognized we were reimplementing parts of React (lifecycles, and more), and it just didn't match the mental model React has given us for composing UI.

We were walking through the hallway of a hotel just before a workshop discussing what to do about it. We asked each other: "What would it look like if we built the router using the patterns we teach in our workshops?"

It was only a matter of hours into development that we had a proof-of-concept that we knew was the future we wanted for routing. We ended up with API that wasn't "outside" of React, an API that composed, or naturally fell into place, with the rest of React. We think you'll love it.

## Dynamic Routing

When we say dynamic routing, we mean routing that takes place **as your app is rendering**, not in a configuration or convention outside of a running app. That means almost everything is a component in React Router. Here's a 60 second review of the API to see how it works:

First, grab yourself a `Router` component for the environment you're targeting and render it at the top of your app.

```jsx
// react-native
import { NativeRouter } from "react-router-native";

// react-dom (what we'll use here)
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  el
);
```

Next, grab the link component to link to a new location:

```jsx
const App = () => (
  <div>
    <nav>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  </div>
);
```

Finally, render a `Route` to show some UI when the user visits
`/dashboard`.

```jsx
const App = () => (
  <div>
    <nav>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
    <div>
      <Route path="/dashboard" component={Dashboard} />
    </div>
  </div>
);
```

The `Route` will render `<Dashboard {...props}/>` where `props` are some router specific things that look like `{ match, location, history }`. If the user is **not** at `/dashboard` then the `Route` will render `null`. That's pretty much all there is to it.

## Nested Routes

Lots of routers have some concept of "nested routes". If you've used versions of React Router previous to v4, you'll know it did too! When you move from a static route configuration to dynamic, rendered routes, how do you "nest routes"? Well, how do you nest a `div`?

```jsx
const App = () => (
  <BrowserRouter>
    {/* here's a div */}
    <div>
      {/* here's a Route */}
      <Route path="/tacos" component={Tacos} />
    </div>
  </BrowserRouter>
);

// when the url matches `/tacos` this component renders
const Tacos = ({ match }) => (
  // here's a nested div
  <div>
    {/* here's a nested Route,
        match.url helps us make a relative path */}
    <Route path={match.url + "/carnitas"} component={Carnitas} />
  </div>
);
```

See how the router has no "nesting" API? `Route` is just a component, just like `div`. So to nest a `Route` or a `div`, you just ... do it.

Let's get trickier.

## Responsive Routes

Consider a user navigates to `/invoices`. Your app is adaptive to different screen sizes, they have a narrow viewport, and so you only show them the list of invoices and a link to the invoice dashboard. They can navigate deeper from there.

```asciidoc
Small Screen
url: /invoices

+----------------------+
|                      |
|      Dashboard       |
|                      |
+----------------------+
|                      |
|      Invoice 01      |
|                      |
+----------------------+
|                      |
|      Invoice 02      |
|                      |
+----------------------+
|                      |
|      Invoice 03      |
|                      |
+----------------------+
|                      |
|      Invoice 04      |
|                      |
+----------------------+
```

On a larger screen we'd like to show a master-detail view where the navigation is on the left and the dashboard or specific invoices show up on the right.

```asciidoc
Large Screen
url: /invoices/dashboard

+----------------------+---------------------------+
|                      |                           |
|      Dashboard       |                           |
|                      |   Unpaid:             5   |
+----------------------+                           |
|                      |   Balance:   $53,543.00   |
|      Invoice 01      |                           |
|                      |   Past Due:           2   |
+----------------------+                           |
|                      |                           |
|      Invoice 02      |                           |
|                      |   +-------------------+   |
+----------------------+   |                   |   |
|                      |   |  +    +     +     |   |
|      Invoice 03      |   |  | +  |     |     |   |
|                      |   |  | |  |  +  |  +  |   |
+----------------------+   |  | |  |  |  |  |  |   |
|                      |   +--+-+--+--+--+--+--+   |
|      Invoice 04      |                           |
|                      |                           |
+----------------------+---------------------------+
```

Now pause for a minute and think about the `/invoices` url for both screen sizes. Is it even a valid route for a large screen? What should we put on the right side?

```asciidoc
Large Screen
url: /invoices
+----------------------+---------------------------+
|                      |                           |
|      Dashboard       |                           |
|                      |                           |
+----------------------+                           |
|                      |                           |
|      Invoice 01      |                           |
|                      |                           |
+----------------------+                           |
|                      |                           |
|      Invoice 02      |             ???           |
|                      |                           |
+----------------------+                           |
|                      |                           |
|      Invoice 03      |                           |
|                      |                           |
+----------------------+                           |
|                      |                           |
|      Invoice 04      |                           |
|                      |                           |
+----------------------+---------------------------+
```

On a large screen, `/invoices` isn't a valid route, but on a small screen it is! To make things more interesting, consider somebody with a giant phone. They could be looking at `/invoices` in portrait orientation and then rotate their phone to landscape. Suddenly, we have enough room to show the master-detail UI, so you ought to redirect right then!

React Router's previous versions' static routes didn't really have a composable answer for this. When routing is dynamic, however, you can declaratively compose this functionality. If you start thinking about routing as UI, not as static configuration, your intuition will lead you to the following code:

```js
const App = () => (
  <AppLayout>
    <Route path="/invoices" component={Invoices} />
  </AppLayout>
);

const Invoices = () => (
  <Layout>
    {/* always show the nav */}
    <InvoicesNav />

    <Media query={PRETTY_SMALL}>
      {screenIsSmall =>
        screenIsSmall ? (
          // small screen has no redirect
          <Switch>
            <Route exact path="/invoices/dashboard" component={Dashboard} />
            <Route path="/invoices/:id" component={Invoice} />
          </Switch>
        ) : (
          // large screen does!
          <Switch>
            <Route exact path="/invoices/dashboard" component={Dashboard} />
            <Route path="/invoices/:id" component={Invoice} />
            <Redirect from="/invoices" to="/invoices/dashboard" />
          </Switch>
        )
      }
    </Media>
  </Layout>
);
```

As the user rotates their phone from portrait to landscape, this code will automatically redirect them to the dashboard. _The set of valid routes change depending on the dynamic nature of a mobile device in a user's hands_.

This is just one example. There are many others we could discuss but we'll sum it up with this advice: To get your intuition in line with React Router's, think about components, not static routes. Think about how to solve the problem with React's declarative composability because nearly every "React Router question" is probably a "React question".









# Redux Integration

Redux is an important part of the React ecosystem. We want to make the integration of React Router and Redux as seamless as possible for people wanting to use both.

## Blocked Updates

Generally, React Router and Redux work just fine together. Occasionally though, an app can have a component that doesn't update when the location changes (child routes or active nav links don't update).

This happens if:

1. The component is connected to redux via `connect()(Comp)`.
2. The component is **not** a "route component", meaning it is not
   rendered like so: `<Route component={SomeConnectedThing}/>`

The problem is that Redux implements `shouldComponentUpdate` and there's no indication that anything has changed if it isn't receiving props from the router. This is straightforward to fix. Find where you `connect` your component and wrap it in `withRouter`.

```js
// before
export default connect(mapStateToProps)(Something)

// after
import { withRouter } from 'react-router-dom'
export default withRouter(connect(mapStateToProps)(Something))
```

## Deep integration

Some folks want to:

1. Synchronize the routing data with, and accessed from, the store.
2. Be able to navigate by dispatching actions.
3. Have support for time travel debugging for route changes in the Redux devtools.

All of this requires deeper integration.

Our recommendation is **not to keep your routes in your Redux store at all**. Reasoning:

1. Routing data is already a prop of most of your components that care about it. Whether it comes from the store or the router, your component's code is largely the same.
2. In most cases, you can use `Link`, `NavLink` and `Redirect` to perform navigation actions. Sometimes you might also need to navigate programmatically, after some asynchronous task that was originally initiated by an action. For example, you might dispatch an action when the user submits a login form. Your [thunk](https://github.com/reduxjs/redux-thunk), [saga](https://redux-saga.js.org/) or other async handler then authenticates the credentials, _then_ it needs to somehow navigate to a new page if successful. The solution here is simply to include the `history` object (provided to all route components) in the payload of the action, and your async handler can use this to navigate when appropriate.
3. Route changes are unlikely to matter for time travel debugging. The only obvious case is to debug issues with your router/store synchronization, and this problem goes away if you don't synchronize them at all.

But if you feel strongly about synchronizing your routes with your store, you may want to try [Connected React Router](https://github.com/supasate/connected-react-router), a third party binding for React Router v4 and Redux.
