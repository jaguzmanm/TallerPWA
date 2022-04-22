import React, { useEffect, useState } from "react";
import md5 from 'md5';

import Comic from "./comics";

function Marvel () {
    const [name, setName] = useState("");
    const [comics, setComics] = useState([]);
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");

    useEffect(()=>{
        if(!navigator.onLine){
            if(localStorage.getItem("name") === null) {
                setName("Loading...");
            } else {
                setName(localStorage.getItem("name"));
            }
            if(localStorage.getItem("image") === null) {
                setImage("");
            } else {
                setImage(localStorage.getItem("image"));
            }
            if(localStorage.getItem("description") === null) {
                setDescription("Loading...");
            } else {
                setDescription(localStorage.getItem("description"));
            }
            if(localStorage.getItem("comics") === null) {
                setComics([]);
            } else {
                setComics(localStorage.getItem("comics"));
            }
        } else {
            const baseUrl = "https://gateway.marvel.com/v1/public/characters";
            const ts = "1234";
            const publicKey = "332ae88362df51758aa524e2b2cc80f0";
            const privateKey = "17a8ab7fb342a3dfc3c5a24bf72dc766c3f05d06";

            const hash = md5(ts+privateKey+publicKey);

            const finalUrl = baseUrl + "?ts=" + ts + "&apikey=" + publicKey + "&hash=" + hash;

            fetch(finalUrl).then(res=>res.json()).then(res=>{
                const index = Math.floor(Math.random() * res.data.results.length);
                const hero = res.data.results[index];

                setName(hero.name);
                setComics(hero.comics.items);
                setImage(hero.thumbnail.path + "." + hero.thumbnail.extension);
                setDescription(hero.description);
            })
        }
    }, []);

    let renderComics = () => {
        return comics.map((item, i) => (
            <Comic key={i + 1} data={item} />
        ));
      };

      return (
          <div>
          <h1>
              Heroe: {name} 
          </h1>
          <h2>
              description: 
          </h2>
          <p> {description} </p>

        <img src={image} alt="Hero thumbnail"/>
        <h2>Comics:</h2>
        <ul>{renderComics()}</ul>
          </div>
      )
}

export default Marvel;