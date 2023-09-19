import React, { useEffect, useRef, useState } from "react";
import "./Home.scss";
import lead from "../../../src/Lead-image.png";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";

const Home = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [inputValue, setInputValue] = useState("");
  const [text, setText] = useState("");
  // const ref = useRef();

  const fetchPictures = async () => {
    try {
      const data = await fetch(
        `https://pixabay.com/api/?key=39541490-31d7409aadf33766574925b00&q=${text}&image_type=photo&pretty=true`
      );
      if (!data.ok) {
        throw "api request failed";
      }
      const result = await data.json();
      const pictures = result.hits;
      console.log(pictures);
      setData(pictures);
      setLoading(false);
    } catch (error) {
      console.log("error");
      setLoading(false);
      setError(error);
    }
  };

  const inputChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const submitSearch = async (e) => {
    e.preventDefault();
    setText(inputValue);
    if (text !== "") {
      setLoading(true);
    } else {
      return;
    }
  };

  const handleDragDrop = (results) => {
    const { source, destination, type } = results;
    //when destination is not defined
    if (!destination) return;

    //check if the source and destination ids are the same
    if (
      destination.droppableId === source.droppableId &&
      source.index === destination.index
    )
      return;

    const reorderedPictures = [...data];
    const sourceIndex = source.index;
    const destinationIndex = destination.index;
    const [removedPicture] = reorderedPictures.splice(sourceIndex, 1);
    reorderedPictures.splice(destinationIndex, 0, removedPicture);
    console.log(results);
    console.log(reorderedPictures);
    return setData(reorderedPictures);
  };

  useEffect(() => {
    fetchPictures();
  }, [text]);

  if (loading)
    return (
      <Loader/>
    );
  if (error)
    return (
    <Error/>
    );

  return (
    <section className="home-section">
      <DragDropContext onDragEnd={handleDragDrop}>
        <div className="search-input-container">
          <input type="text" onChange={inputChangeHandler} />
          <button className="search-btn" onClick={(e) => submitSearch(e)}>
            search
          </button>
        </div>

        <Droppable droppableId="ROOT" type="group">
          {(provided) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="picture-grid"
              >
                {data.length < 1 ? (
                  <div className="no-results">
                    <p>No results found!</p>
                  </div>
                ) : (
                  data.map((pic, index) => (
                    <Draggable
                      draggableId={pic.id.toString()}
                      key={pic.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="picture-card"
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <img src={pic.largeImageURL} alt="" />
                          <div className="text">
                            <span className="pic-tag-heading">tag:</span>
                            <span className="pic-tag">{pic.tags}</span>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    </section>
  );
};

export default Home;
