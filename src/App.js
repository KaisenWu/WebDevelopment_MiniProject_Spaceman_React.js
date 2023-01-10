import React, { useState, useEffect } from "react";
import SpacemanCard from "./components/SpacemanCard";

function App() {
  const spacemanNameUrl = "http://api.open-notify.org/astros.json";
  const spacemanInfoUrlPre =
    "https://en.wikipedia.org/api/rest_v1/page/summary/";

  const [spacemanArr, setSpacemanArr] = useState([]);

  useEffect(() => {
    fetch(spacemanNameUrl)
      .then((res) => res.json())
      .then((namesData) => {
        for (let i = 0; i < namesData.people.length; i++) {
          var fullName = namesData.people[i].name.replace(" ", "_");
          var spacemanInfoUrl = spacemanInfoUrlPre + fullName;
          fetch(spacemanInfoUrl)
            .then((res) => res.json())
            .then((currentSpacemanInfo) => {
              var currentSpaceman = {
                imgUrl: currentSpacemanInfo.thumbnail.source,
                title: currentSpacemanInfo.title,
                description: currentSpacemanInfo.description,
                extract: currentSpacemanInfo.extract,
              };
              setSpacemanArr((preSpacemanArr) => [
                ...preSpacemanArr,
                currentSpaceman,
              ]);
            });
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <h1>View People Currently in Space</h1>
      {spacemanArr.map((spaceman) => {
        return (
          <SpacemanCard
            imgUrl={spaceman.imgUrl}
            title={spaceman.title}
            description={spaceman.description}
            extract={spaceman.extract}
            key={spaceman.title}
          />
        );
      })}
    </div>
  );
}

export default App;
