let expanded = document.getElementById("add-expanded");

const inputSubmit = document.querySelector(".inputForm");

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
  // console.log(response);
  const data = await response.json();
  revisionList.innerHTML = "";

  for (const topics of data.data) {
    renderTopic(topics);
  }
}

async function postTopic(event) {

  event.preventDefault();
  const formData = new FormData(event.target);
  const {topic, content} = Object.fromEntries(formData);
  const date = new Date();
  const dateString = date.toLocaleDateString("US");


  const response = await fetch(apiEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      topic, 
      content, 
      added_date: dateString}),
  });
  const data = await response.json();


  if (data.status !== "success") {
    const message =
      data.error ?? "Sorry, an error occurred whilst creating a topic.";
    alert(message);
    return;
  }
  
  event.target.reset();
  expanded.classList.toggle("add-topic-expanded-open")
  await refreshTopics();
}

// Form submit event listener
inputSubmit.addEventListener("submit", postTopic);





// Displays the data in the unordered list
async function renderTopic(topics) {
  const li = document.createElement("li");
  const topicTitle = document.createElement("h3");
  topicTitle.textContent = topics.topic;
  topicTitle.className = "ListTitle";

  const topicContent = document.createElement("p");
  topicContent.textContent = topics.content;
  topicContent.className = "ListContent";

  const topicDate = document.createElement("p");
  // console.log(topics.added_date);
  topicDate.textContent = topics.added_date.substring(0, 10);
  topicDate.className = "ListDate";

  li.append(topicTitle, topicContent, topicDate);
  revisionList.appendChild(li);
}

window.addEventListener("load", refreshTopics());
