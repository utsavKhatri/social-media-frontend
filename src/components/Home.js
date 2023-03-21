import { Button } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { MyContext } from "../context";

import PostCard from "./PostCard";

const Home = () => {
  const { refresh, setRefresh} = useContext(MyContext);
  const userData = JSON.parse(localStorage.getItem("user-profile"));
  const [currentpage, setCurrentpage] = useState(1);
  const [feedData, setFeedData] = useState();
  const options = {
    method: "GET",
    url: `http://localhost:1337/home?page=${currentpage}`,
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  };

  const reFetchData = () => {
    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        setFeedData(response.data.displayData);
        setRefresh(!refresh);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    reFetchData();
  }, [currentpage]);

  return (
    <React.Fragment>
      <Container className="py-5">
        <Row>
          {feedData !== undefined ? (
            feedData.map((post) => (
              <Col xs={12} md={4}>
                <PostCard
                  key={post._id}
                  post={post}
                  reFetchData={reFetchData}
                />
              </Col>
            ))
          ) : (
            <div>Loading...</div>
          )}
          {feedData !== undefined && (
            <Row>

             
              {currentpage === 1 ? (
                <Col xs={12} md={4}>
                  <Button
                    onClick={() => {
                      setCurrentpage(currentpage + 1);
                    }}
                  >
                    Load More
                  </Button>
                </Col>
              ) : (
                <Row>
                  <Col mx={3}>
                    <Button
                      onClick={() => {
                        setCurrentpage(currentpage + 1);
                      }}
                    >
                      load more
                    </Button>
                  </Col>
                  <Col mx={3}>
                    <Button
                      onClick={() => {
                        setCurrentpage(1);
                      }}
                    >
                      back to home
                    </Button>
                  </Col>
                </Row>
              )}
            </Row>
          )}
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Home;
