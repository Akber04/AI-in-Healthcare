// Import document loaders for different file formats
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { CSVLoader } from "langchain/document_loaders/fs/csv";

import { ChatPromptTemplate } from "@langchain/core/prompts";
import { pull } from "langchain/hub";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";

// Import OpenAI language model and other related modules
import { RetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// Import dotenv for loading environment variables and fs for file system operations
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

// Initialize the document loader with supported file formats
const loader = new DirectoryLoader("./data", {
  ".csv": (path) => new CSVLoader(path),
});

//  Load documents from the specified directory
console.log("Loading docs...");
const docs = await loader.load();
console.log("Docs loaded.");

const VECTOR_STORE_PATH = "newdata.index";

// Define a function to normalize the content of the documents
function normalizeDocuments(docs) {
  return docs.map((doc) => {
    if (typeof doc.pageContent === "string") {
      return doc.pageContent;
    } else if (Array.isArray(doc.pageContent)) {
      return doc.pageContent.join(" ");
    }
  });
}

// Define the main function to run the entire process
const runEmbeddings = async (userData) => {
  try {
    let vectorStore;

    // Check if an existing vector store is available
    console.log("Checking for existing vector store...");
    if (fs.existsSync(VECTOR_STORE_PATH)) {
      //  Load the existing vector store
      console.log("Loading existing vector store...");
      vectorStore = await HNSWLib.load(
        VECTOR_STORE_PATH,
        new OpenAIEmbeddings()
      );
      console.log("Vector store loaded.");
    } else {
      //  Create a new vector store if one does not exist
      console.log("Creating new vector store...");
      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1500,
      });
      const normalizedDocs = normalizeDocuments(docs);
      const splitDocs = await textSplitter.createDocuments(normalizedDocs);

      //  Generate the vector store from the documents
      vectorStore = await HNSWLib.fromDocuments(
        splitDocs,
        new OpenAIEmbeddings()
      );
      //  Save the vector store to the specified path
      await vectorStore.save(VECTOR_STORE_PATH);

      console.log("Vector store created.");
    }
    // const retriever = vectorStore.similaritySearch(userData, 10)
    // Use the vector store as a retriever that returns a single document
    const retriever = vectorStore.asRetriever(3);

    // Retrieve the most similar text
    const retrievedDocuments = await retriever.invoke(`I have these symptoms: ${userData}, please tell me the possible diseases.`);
    // asRetriever({
    //   k: 6,
    //   searchType: "similarity",
    // });
    // const template = `
    // You are a helpful assistant. you will be given some symptoms and you have to provide the possible disease. do not provide any other answer other than the provided context.    
    
    // Context: ${context}

    // Symptoms: ${question}
    
    // `;

    // const customRagPrompt = PromptTemplate.fromTemplate(template);
    // const llm = new ChatOpenAI({
    //   model: "gpt-4o-mini",
    //   // model: "gpt-3.5-turbo-16k",
    //   temperature: 0,
    // });
    // const ragChain = await createStuffDocumentsChain({
    //   llm,
    //   prompt: customRagPrompt,
    //   outputParser: new StringOutputParser(),
    // });
    // const context = await retriever.getRelevantDocuments(userData);
    console.log({retrievedDocuments})
    // const res = await ragChain.invoke({
    //   question: userData,
    //   context,
    // });
    return retrievedDocuments;
  } catch (error) {
    console.error(error);
  }
};

// const userData =
//   "Suppose I have 85% in my matriculation in science subjects, which colleges I can opt in Karachi?";

//runEmbeddings(userData);

export default runEmbeddings;