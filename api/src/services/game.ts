import axios from "axios";
import dotenv from "dotenv";
import randomWords from "random-words";

dotenv.config();

const wordsApi = axios.create({
  baseURL: `https://${process.env.RAPIDAPI_HOST}/`,
  timeout: 1000,
  headers: {
    "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
    "X-RapidAPI-Host": process.env.RAPIDAPI_HOST,
  },
});

export const init = async () => {
  // const first = await fetchRandomWord();
  // const second = await fetchRandomWord();
  const word = randomWords({ exactly: 5, wordsPerString: 1 });
  return word;
};

const fetchRandomWord = async () =>
  await wordsApi
    .get("/words/", { params: { random: "true", hasDetails: "definitions" } })
    .then((res) => res.data)
    .catch((error) => console.log(error));

const fetchDefinition = async (word: string) => {
  await wordsApi
    .get(`/words/${word}/definition`)
    .then((res) => res.data.definition)
    .catch((error) => console.log(error));
};
