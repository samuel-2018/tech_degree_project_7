import React from "react";
import PhotoContainer from "./PhotoContainer";
import NotFound from "./NotFound";
import Searching from "./Searching";
import Photos from "./Photos";

const Search = props => {
  const { data, query, lastQuery, handleQuery, searchStatus } = props;

  // Prevents infinite render loop.
  if (query !== lastQuery) {
    // Sends query to App.js.
    // Located here so that request can be made both on submit of search form and if url is entered directly in the browser.
    handleQuery(query);
  }

  const action = {
    searching: () => (
      <PhotoContainer title={query + " pictures"}>
        <Searching />
      </PhotoContainer>
    ),
    notFound: () => (
      <PhotoContainer title={query}>
        <NotFound />
      </PhotoContainer>
    ),
    found: () => (
      <PhotoContainer title={query + " pictures"}>
        <Photos data={data} />
      </PhotoContainer>
    )
  };

  return action[searchStatus]();
};

export default Search;
