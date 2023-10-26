let expanded = document.getElementById("add-expanded");

const apiEndpoint = "http://localhost:7777/topics/";

function expand() {
  expanded.classList.toggle("add-topic-expanded-open");
}

//variable for revision list
const revisionList = document.querySelector(".revision-list");
//
async function refreshTopics() {
  const response = await fetch(apiEndpoint, {
    mode: "cors",
  });
  console.log(response);
  const data = await response.json();
  revisionList.innerHTML = "";

  for (const topics of data.data) {
    renderTopic(topics);
  }
}
//
async function renderTopic(topics) {
  const li = document.createElement("li");
  const topicTitle = document.createElement("h3");
  topicTitle.textContent = topics.topic;
  topicTitle.className = "ListTitle";

  const topicContent = document.createElement("p");
  topicContent.textContent = topics.content;
  topicContent.className = "ListContent";

  const topicDate = document.createElement("p");
  topicDate.textContent = topics.added_date;
  topicDate.className = "ListDate";

  li.append(topicTitle, topicContent, topicDate);
  revisionList.appendChild(li);
}

window.addEventListener("load", refreshTopics());
