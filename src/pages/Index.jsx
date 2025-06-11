import TextInput from "../components/TextInput";
import styles from "./Index.module.css";
import Tweet from "../components/Tweet";
import { useState, useEffect } from "react";

export default function Index() {
  const [text, setText] = useState("");

  const [tweetList, setTweetList] = useState(() => {
    const tweetsFromStorage = localStorage.getItem("tweets");
    if (!tweetsFromStorage || tweetsFromStorage === "undefined") return [];
    try {
      return JSON.parse(tweetsFromStorage);
    } catch (e) {
      return [];
    }
  });

  const maxLength = 125;

  const tweet = {
    id: Date.now(),
    date: new Date(),
    text: text,
    user: {
      name: "Elaine Mikie",
      username: "@elainemikie",
      picture:
        "https://plus.unsplash.com/premium_photo-1739178656495-8109a8bc4f53?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  };

  useEffect(() => {
    localStorage.setItem("tweets", JSON.stringify(tweetList));
  }, [tweetList]);

  function onTextChange(event) {
    const text = event.target.value;
    if (text.length <= maxLength) {
      setText(text);
    }
  }

  function sendTweet() {
    if (text.trim().length === 0) return;
    setTweetList([...tweetList, tweet]);
    setText("");
  }

  function deleteTweet(id){
    setTweetList(tweetList.filter((tweet) => tweet.id !== id));
  }

  return (
    <div>
      <h1 className={styles.pageTitle}>Posts</h1>
      <div className={styles.tweetContainer}>
        <img
          src={
            "https://plus.unsplash.com/premium_photo-1739178656495-8109a8bc4f53?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          className={styles.avatar}
        />
        <TextInput
          placeholder={"O que está acontecendo?"}
          rows={3}
          maxLength={maxLength}
          value={text}
          onChange={onTextChange}
        />
      </div>
      <div className={styles.buttonContainer}>
        <div>
          {text.length} / {maxLength}
        </div>
        <button
          onClick={sendTweet}
          className={styles.postButton}
          disabled={text.length === 0}
        >
          Postar
        </button>
      </div>

      <ul className={styles.tweetList}>
        {tweetList.map((tweet) => {
          return (
            <li className={styles.tweetListItem} key={tweet.id}>
              <div className={styles.tweetActions} >
                <Tweet tweet={tweet} />
                <button 
                  onClick={() => deleteTweet(tweet.id)} 
                  className={styles.postButton}
                >
                  Excluir
                </button>
              </div>              
            </li>
          );
        })}
      </ul>
    </div>
  );
}
