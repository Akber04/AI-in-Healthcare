// import { OpenAI } from "@langchain/openai";
import { ChatOllama } from "@langchain/community/chat_models/ollama";

import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
// import {  } from "@langchain/community/llama_embeddings";
import { OllamaEmbeddings } from "@langchain/ollama";

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// Loaders
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

import { config } from "dotenv";
import fs from "fs";

config();

// Read data useing directory loader
const loader = new DirectoryLoader("./data", {
  ".csv": (path) => new CSVLoader(path, { separator: "," }),
});

const loader2 = new DirectoryLoader("./data2", {
  ".csv": (path) => new CSVLoader(path, { separator: "," }),
});

// See contents of docs that are being being loaded
const docs = await loader.load();
const docs2 = await loader2.load();
// console.log(docs);
// console.log(docs2);
const csvContent = docs.map((doc) => doc.pageContent);
const csvContent2 = docs2.map((doc) => doc.pageContent);

const meta = docs.map((doc) => ({ meta: "keggle" }));
const meta2 = docs2.map((doc) => ({ meta: "keggle2" }));
// console.log(`Page Content ---> ${csvContent}`);

const askModel = async (question) => {
  let vectorStore;

  const textSplitter = new RecursiveCharacterTextSplitter({
    // To learn more about the parameters visit: https://dev.to/peterabel/what-chunk-size-and-chunk-overlap-should-you-use-4338
    chunkSize: 1000,
    chunkOverlap: 900,
  });
  console.log("Text Splitting......");
  // console.log(`Chunk size  ----> ${textSplitter.chunkSize}`);
  // console.log(`Chunk Overlap  ----> ${textSplitter.chunkOverlap}`);

  const splitDocs = await textSplitter.createDocuments(csvContent, meta);
  const splitDocs2 = await textSplitter.createDocuments(csvContent2, meta2);

  const combined = [...splitDocs, ...splitDocs2];

  //https://www.reddit.com/r/ollama/comments/1cmjp80/llama3_embedding/
  // https://ollama.com/library/mxbai-embed-large
  const vectr = "./store/llama.vectorstore.hnswlib.combined";
  let defOpt = {
    baseUrl: "http://localhost:11434",
    model: "mxbai-embed-large",
    keepAlive: "30m",
  };
  try {
    if (fs.existsSync(vectr)) {
      vectorStore = await HNSWLib.load(vectr, new OllamaEmbeddings(defOpt));
      console.log(`Vector store loaded`);
    } else {
      console.log(`creating Vector store`);
      vectorStore = await HNSWLib.fromDocuments(
        combined,
        new OllamaEmbeddings(defOpt)
      );
      await vectorStore.save(vectr);
      console.log(`Vector store created`);
    }
  } catch (error) {
    console.error("Error creating/loading vector store:", error);
  }

  const search = await vectorStore.similaritySearchWithScore(
    "headache, chest_pain, dizziness, loss_of_balance, lack_of_concentration",
    10000
  );

  // console.log(search);
  let map = new Map();
  search.map((doc) => {
    let source = doc[0].metadata.meta;
    let diseaseName = source + ":" + doc[0].pageContent.split("\n")[0];
    let lowerScore = Math.min(
      map.get(diseaseName) ? map.get(diseaseName).lowerScore : 1,
      doc[1]
    );
    let higherScore = Math.max(
      map.get(diseaseName) ? map.get(diseaseName).lowerScore : 0,
      doc[1]
    );
    let data = {
      lowerScore,
      higherScore,
    };
    map.set(diseaseName, data);
  });
  console.log(map);
};

askModel();
