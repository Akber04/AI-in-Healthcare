<div align="left" style="position: relative;">
<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" align="right" width="30%" style="margin: -20px 0 0 20px;">
<h1>AI-IN-HEALTHCARE</h1>
<p align="left">
	<em><code>AI-driven Clinical Diagnostic Tool Using Large Language Models</code></em>
</p>
<p align="left">
	<!-- Shields.io badges disabled, using skill icons. -->
</p>
<p align="left">Built with the tools and technologies:</p>
<p align="left">
	<a href="https://skillicons.dev">
		<img src="https://skillicons.dev/icons?i=express,nodejs" />
	</a>
</p>
</div>
<br clear="right">

## 🔗 Table of Contents

- [📍 Overview](#-overview)
- [👾 Features](#-features)
- [📁 Project Structure](#-project-structure)
  - [📂 Project Index](#-project-index)
- [🚀 Getting Started](#-getting-started)
  - [☑️ Prerequisites](#-prerequisites)
  - [⚙️ Installation](#-installation)
  - [🤖 Usage](#-usage)
- [🔰 Contributing](#-contributing)
- [🎗 License](#-license)

---

## 📍 Overview

**AI-IN-HEALTHCARE** is an AI-powered clinical diagnostic tool developed as part of my MSc project in Software Engineering. Leveraging Large Language Models (LLMs) like OpenAI's model and Llama3, this tool analyzes patient symptoms to provide relevant, interpretable diagnostic suggestions. It incorporates advanced machine learning and NLP techniques, aiming to support healthcare professionals with accurate, trustworthy insights.

---

## 👾 Features

- **Model Training**: Trained on extensive medical datasets to generate vector embeddings of symptoms and disease descriptions, enabling accurate interpretation of complex relationships.
- **Vector Store Management**: Utilizes `HNSWLib` for efficient storage and querying of embeddings, allowing real-time, relevant diagnostic results.
- **Re-Ranking Mechanism**: Scores diagnostic outputs, with results closest to 0 being prioritized for accuracy, ensuring the most relevant diagnoses are presented first.
- **LLM Comparison**: Compares the effectiveness of Llama3 and OpenAI’s model, showcasing strengths like broader diagnostic range versus high confidence in specific cases.

---

## 📁 Project Structure

```sh
└── AI-in-Healthcare/
    ├── LICENSE
    ├── README.md
    ├── build
    │   └── config.gypi
    ├── data
    │   └── dataset.csv
    ├── data2
    │   └── Diseases_Symptoms.csv
    ├── embeddings.js
    ├── index.js
    ├── llama_embeddings.js
    ├── openai_embeddings.js
    ├── package-lock.json
    ├── package.json
    └── store
        ├── llama.vectorstore.hnswlib
        ├── llama.vectorstore.hnswlib.combined
        ├── llama.vectorstore.hnswlib.splitDocs2
        ├── vectorstore.hnswlib
        ├── vectorstore.hnswlib.combined
        └── vectorstore.hnswlib.combined_openAI
```
## 📂 Project Index
<details open>
	<summary><b><code>AI-IN-HEALTHCARE/</code></b></summary>
	<details>
		<summary><b>__root__</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b>package-lock.json</b></td>
				<td>Dependency lock file</td>
			</tr>
			<tr>
				<td><b>llama_embeddings.js</b></td>
				<td>Embedding creation and vector store management for Llama3</td>
			</tr>
			<tr>
				<td><b>embeddings.js</b></td>
				<td>Coordinates embedding processes and re-ranking</td>
			</tr>
			<tr>
				<td><b>index.js</b></td>
				<td>Manages server and API endpoints for user interactions</td>
			</tr>
			<tr>
				<td><b>openai_embeddings.js</b></td>
				<td>Embedding creation and vector store management for OpenAI model</td>
			</tr>
			<tr>
				<td><b>package.json</b></td>
				<td>Project metadata and dependency management</td>
			</tr>
			</table>
		</blockquote>
	</details>
</details>

## 🚀 Getting Started

## ☑️ Prerequisites

Before setting up AI-in-Healthcare, ensure you have:
	•	Node.js (v14.0 or higher)
	•	NPM (v6.0 or higher)
	•	OpenAI API Key (if using OpenAI embeddings)

## ⚙️ Installation

1. Clone the Repository
```sh
git clone https://github.com/Akber04/AI-in-Healthcare
cd AI-in-Healthcare
```

2. Install Dependencie
```sh
npm install
```
3. Environment Setup
	•	Create a .env file and add your API keys (e.g., OpenAI API Key).
```sh
OPENAI_API_KEY=your_openai_api_key
```

## 🤖 Usage

To run the tool, execute the following commands based on the model you wish to use:

•	For Llama3
```sh
OPENAI_API_KEY=your_openai_api_key
```
•	For OpenAI
```sh
OPENAI_API_KEY=your_openai_api_key
```

Each command will load the relevant embeddings and provide diagnostic predictions based on input symptoms.


## 🔰 Contributing

We welcome contributions! Follow these steps to contribute:

•	<b>Fork the Repository:</b> Start by forking this repo.

•	<b>Clone Locally:</b> Clone the forked repo to your machine.
  ```sh
  git clone https://github.com/YourUsername/AI-in-Healthcare
  ```
•	<b>Create a New Branch:</b> Always create a new branch for your changes.
  ```sh
  git checkout -b feature-new-feature
  ```
•	<b>Make Changes and Commit:</b> Develop your changes and commit with a descriptive message.
  ```sh
  git commit -m "Add feature x"
  ```
•	<b>Push to GitHub:</b> Push your branch to your forked repo.
  ```sh
  git push origin feature-new-feature
  ```
•	<b>Open a Pull Request:</b> Submit your PR for review.

## 🎗 License

This project is licensed under the GNU General Public License v3.0. See the LICENSE file for more details.
