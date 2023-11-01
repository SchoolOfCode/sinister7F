let expanded = document.getElementById("add-expanded");

const inputSubmit = document.querySelector(".inputForm");

const apiEndpoint = "https://memoryecho.onrender.com/topics";

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
  const { topic, content } = Object.fromEntries(formData);
  const date = new Date();

  const response = await fetch(apiEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      topic,
      content,
      added_date: date,
    }),
  });
  const data = await response.json();

  if (data.status !== "success") {
    const message =
      data.error ?? "Sorry, an error occurred whilst creating a topic.";
    alert(message);
    return;
  }

  event.target.reset();
  expanded.classList.toggle("add-topic-expanded-open");
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

  topicDate.textContent = topics.added_date.substring(0, 10);
  topicDate.className = "ListDate";

  const testingDate = topics.added_date;

  // const todayDate = new Date();

  // Function to find the date which is 'n' number of days ago
  const daysAgo = n => {
    // Set the d variable to todays date
    let d = new Date();

    // Get the date from d and minus the number of days
    // We then re-set the date of d using .setDate() with the new date
    d.setDate(d.getDate() - n);

    // console.log(d.toISOString())
    // console.log(d.toISOString().split('T'))
    // console.log(d.toISOString().split('T')[0])

    // .toISOString set the date to a specific format as a string
    // .split('T') then splits that date at the time point into an array
    // After the split, return the string at index [0]
    return d.toISOString().split('T')[0];
  };

  // console.log(daysAgo(1))
  // console.log(testingDate.split('T')[0])

  switch (testingDate.substring(0, 10)) {
    case (daysAgo(1)):
      li.className = "listOfTopics review";
      break;
    case (daysAgo(3)).toString():
      li.className = "listOfTopics review";
      break;
    case (daysAgo(7)).toString():
      li.className = "listOfTopics review";
      break;
    case (daysAgo(21)).toString():
      li.className = "listOfTopics review";
      break;
    case (daysAgo(30)).toString():
      li.className = "listOfTopics review";
      break;
    case (daysAgo(45)).toString():
      li.className = "listOfTopics review";
      break;
    case (daysAgo(60)).toString():
      li.className = "listOfTopics review";
      break;
    default:
      li.className = "listOfTopics";
      break;
  }

  li.append(topicTitle, topicContent, topicDate);
  revisionList.appendChild(li);
}

window.addEventListener("load", refreshTopics());

// search function
async function searchTopic() {
  let search = document.getElementById("search-bar").value;
  const listOfTopics = document.getElementsByClassName("listOfTopics");
  // for loop which searches the api
  for (let i = 0; i < listOfTopics.length; i++) {
    if (!listOfTopics[i].innerHTML.toLowerCase().includes(search)) {
      listOfTopics[i].style.display = "none";
    } else {
      listOfTopics[i].style.display = "grid";
    }
  }
}
