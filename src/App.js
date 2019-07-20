import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Search from "./Components/Search";
import SearchForm from "./Components/SearchForm";
import Nav from "./Components/Nav";
import PhotoContainer from "./Components/PhotoContainer";
import Error from "./Components/Error";
import axios from "axios";
import apiKey from "./config.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      // Data format: [[{photo1}, {photo2 etc}], [{photo1}, {photo2 etc}], [{photo1}, {photo2 etc}]]
      topics: [[], [], []],

      // Data format: [{photo1}, {photo2 etc}]
      results: [],

      // States: searching, notFound, found
      searchStatus: "searching",

      query: ""
    };
    // this.handleSearch = this.handleSearch.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
  }

  componentDidMount() {
    this.handleTopics();
  }

  handleTopics() {
    this.handleAPI("islands", 0);
    this.handleAPI("sunset", 1);
    this.handleAPI("waterfall", 2);
  }

  handleQuery(query) {
    this.setState({
      searchStatus: "searching",
      query
    });
    this.handleAPI(query, "search");
  }

  // requestType: search, topic #
  handleAPI = (query, requestType) => {
    const referenceToThis = this;

    // get no more than 24 images

    // Unsplash limits developer API requests to 50 per hour.
    setTimeout(() => {
      console.log("API Request will run.");

      axios
        .get("https://api.unsplash.com/search/photos/", {
          params: {
            client_id: apiKey,
            query: query
          }
        })
        .then(function(response) {
          // SEARCH
          if (requestType === "search") {
            if (response.data.results.length !== 0) {
              // console.log(response);
              //   store result in state
              referenceToThis.setState({
                results: response.data.results,
                // update search status
                searchStatus: "found"
              });
            } else {
              referenceToThis.setState({
                results: [],
                // update search status
                searchStatus: "notFound"
              });
            }
            // TOPICS
          } else {
            referenceToThis.setState(prevState => {
              // Copy of topics array in state.
              let updatedTopics = prevState.topics;
              // At index, adds current api response.
              updatedTopics[requestType] = response.data.results;
              // Updates state.
              return { topics: updatedTopics };
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        })
        .then(function() {
          // always executed
        });
    }, 3000);
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route component={SearchForm} />

          <Nav />

          <Switch>
            {/* TOPICS */}
            {/* Redirects '/', and displays new url.*/}
            <Route exact path="/" render={() => <Redirect to="/island" />} />

            <Route
              path="/island"
              render={() => (
                <PhotoContainer data={this.state.topics[0]} title="island" />
              )}
            />
            <Route
              path="/sunset"
              render={() => (
                <PhotoContainer data={this.state.topics[1]} title="sunset" />
              )}
            />
            <Route
              path="/moon"
              render={() => (
                <PhotoContainer data={this.state.topics[2]} title="moon" />
              )}
            />

            {/* SEARCH */}

            {/* <Route path="/search/:query" component={Search} /> */}

            <Route
              path="/search/:query"
              render={props => {
                console.log("running route:  /search/:query");

                // Prevents infinite render loop.
                if (props.match.params.query !== this.state.query) {
                  // Sends query to App.js.
                  // Located here so that request can be made both on submit of search form and if url is entered directly in the browser.
                  this.handleQuery(props.match.params.query);
                }

                return (
                  <Search
                    data={this.state.results}
                    query={props.match.params.query}
                    handleAPI={this.handleAPI}
                    searchStatus={this.state.searchStatus}
                  />
                );
              }}
            />

            {/* No matching url found, so creates a 404. */}
            <Route path="/" Component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
