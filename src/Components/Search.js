import React, { Component } from "react";
import PhotoContainer from "./PhotoContainer";
import NotFound from "./NotFound";

const Search = props => {
  const { data, query, handleAPI, searchStatus } = props;

  const action = {
    searching() {
      return "Searching";
    },
    notFound() {
      return <NotFound />;
    },
    found() {
      return <PhotoContainer data={data} query={query} />;
    }
  };

  return action[searchStatus]();
};

export default Search;
