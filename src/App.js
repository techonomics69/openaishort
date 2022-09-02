import React from "react";

import OpenAI from "openai-api";
import OpenAiAPI from "openai-api-node";

import "./styles.css";

const OPEN_AI_API_KEY = "";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opendata: {
        choices: []
      }
    };
  }

  openAIv1 = async () => {
    const content = document.querySelector("textarea").value;
    const openai = new OpenAI(document.querySelector("input").value);
    const gptResponse = await openai.complete({
      prompt: content,
      max_tokens: 32,
      temperature: 0.5,
      top_p: 1,
      n: 1,
      stream: false,
      logprobs: null,
      stop: "Stop"
    });

    console.log("data", gptResponse.data);
    this.setState({
      opendata: gptResponse.data
    });
  };

  openAI() {
    var content = document.querySelector("input").value;
    var o = new OpenAiAPI(OPEN_AI_API_KEY);
    o.CompletionsCreate(content)
      .then(function (data) {
        console.log("data", data);
        console.log("typeof data", typeof data);

        this.setState({
          opendata: data
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        <h1>OpenAI Short Stories</h1>
        <label>API Key:</label>
        <br />
        <input type="text" />
        <br />
        <label>Start your story:</label>
        <br />
        <textarea type="text" />
        <br />
        <button onClick={this.openAIv1}>Stop</button>

        {this.state.opendata.choices.map((item) => (
          <p key={item}>{item.text}</p>
        ))}
      </div>
    );
  }
}

export default Index;
