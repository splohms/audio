// import e = require("express");

//for pop up
window.addEventListener("load", function () {
  setTimeout(function open(event) {
    document.querySelector(".popup").style.display = "sblock";
  }, 500);
});

document.querySelector("#close").addEventListener("click", function () {
  document.querySelector(".popup").style.display = "none";
  document.querySelector("main").style.backgroundColor = "rgba(0,0,0,0)";
});

function playRecording(e, sound) {
  console.log("I'm being clicked")
  let button = e.target;
  if (button.tagName === "IMG") {
    // get parent button
    button = button.parentElement;
  }
  const audio = button.previousElementSibling;
  if (audio && audio.tagName === "AUDIO") {
    if (audio.paused) {
      console.log("playing sound")
      audio.play();
      button.firstElementChild.src = "images/pause.png";
    } else {
      audio.pause();
      button.firstElementChild.src = "images/play.png";
    }
  }
}

function makePost(parent, pos, file, sound, name, year, tag) {
  const fig = document.createElement("figure");
  fig.className = "column__item";

  fig.classList.add(tag);

  const wrapper = document.createElement("div");
  wrapper.className = "column__item-imgwrap";
  wrapper.setAttribute("data-pos", pos);

  // console.log(file);
  const img = document.createElement("div");

  if (file == undefined) {
    wrapper.style = "background-color: rgba(255,255,255,.25);";
  } else {
    img.className = "column__item-img";
    img.style = "background-image:url(" + file + ")";
  }

  const caption = document.createElement("figcaption");
  caption.className = "column__item-caption";

  const title = document.createElement("h6");
  const date = document.createElement("span");

  title.innerHTML = name;
  date.innerHTML = year;

  const audio = document.createElement("audio");
  audio.id = "story-sound";
  audio.onended = (e) => {
    e.target.nextElementSibling.firstElementChild.src = "images/play.png";
  };

  let text1 = "https://jotform.com/";
  // console.log(sound);
  let result = text1.concat(sound);

  if (sound != undefined) {
    audio.src = result;

    const playButton = document.createElement("button");
    playButton.classList.add(
      "play-button",
      "btn",
      "border",
      "shadow-sm",
      "text-center",
      "d-block",
      "mx-auto"
    );

    const playImage = document.createElement("img");
    playImage.src = "/images/play.png";
    playImage.classList.add("img-fluid");

    // make background image of play button the image or stick the image on top of the play button
    // playImage.style = "background-image:url(" + submissions[j]["Take Photo"] + ")";
    playButton.addEventListener("click", playRecording);
    playButton.appendChild(playImage);
    const audio_container = document.createElement("div");
    audio_container.className = "audio-container";

    if (name != "Philly Trip") {
      img.appendChild(audio_container);
      audio_container.appendChild(audio);
      audio_container.appendChild(playButton);
    }
  }

  // audio.setAttribute('controls', ''); // add controls

  caption.appendChild(title);
  caption.appendChild(date);

  wrapper.appendChild(img);

  fig.appendChild(wrapper);
  fig.appendChild(caption);

  parent.appendChild(fig);
}

function makeContent(name, year, text) {
  const content = document.getElementById("content-pop-up");

  const item = document.createElement("div");
  item.className = "content__item";

  const item_title = document.createElement("h2");
  item_title.className = "content__item-title";
  item_title.innerHTML = name;

  const item_text = document.createElement("div");
  item_text.className = "content__item-text";

  const item_caption = document.createElement("span");
  if (text != undefined) {
    item_caption.innerHTML = text;
  }

  const item_year = document.createElement("span");
  item_year.innerHTML = year;

  item_text.appendChild(item_caption);
  item_text.appendChild(item_year);

  item.appendChild(item_title);
  item.appendChild(item_text);

  content.append(item);
}

let currentFilter;
function filterPosts(filter = "") {
  // console.log("hi")
  

  const posts = document.querySelectorAll("figure");

  posts.forEach((post, index) => {
    // for loop if the currentFilter is getting turned off
    // console.log(post.classList);
    if (currentFilter === filter) {
      post.style.display = "block";
    } else if (post.classList.contains(filter)) {
      post.style.display = "block";
    } else {
      post.style.display = "none";
    }
  });

  if (currentFilter === filter) {
    currentFilter = null;
  } else {
    currentFilter = filter;

    const test = document.getElementsByClassName("column")

    for (let i = 0; i < test.length; i++) {
      const el = test[i];
  
      el.style.transform = "translate(0px)"
    }
  }
}

function modifyButtonColor(filterButton) {
  let otherButton;
  switch (filterButton.id) {
    case "community":
      console.log("community");
      otherButton = document.getElementById("spot");
      break;
    case "spot":
      console.log("spot");
      otherButton = document.getElementById("community");
      break;
    default:
    // code block
  }
  console.log("modifying button");
  if (filterButton.style.backgroundColor == "rgb(255, 249, 129)") {
    // console.log("To green")
    filterButton.style.backgroundColor = "#51988B";
  } else {
    // console.log("To yellow")
    filterButton.style.backgroundColor = "#FFF981";
    otherButton.style.backgroundColor = "#51988B";
    // console.log("the other button",filterButton.id)
  }

  // console.log("Color",filterButton.style.backgroundColor)
}

// create a new div

const buttonContainer = document.getElementById("scroll-container");
const filterList = ["Community-Inspiration", "Neighborhood-Spot"];

const filterContainer = document.createElement("div");
filterContainer.className = "remove-button";

filterList.forEach((filter, index) => {
  const filterButton = document.createElement("div");
  filterButton.className = "filter-button";
  if (index == 0) {
    console.log(0);
    filterButton.setAttribute("id", "community");
  }
  if (index == 1) {
    console.log(1);
    filterButton.setAttribute("id", "spot");
  }

  filterButton.innerHTML = filter.replace("-", " ");
  filterButton.addEventListener("click", (e) => {
    // console.log(index);


    modifyButtonColor(filterButton);
    filterPosts(filter);
    // document.body.scrollTop = 0;
    // document.documentElement.scrollTop = 0; // need help with this one from niko
    // https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_scroll_to_top
  });
  filterContainer.appendChild(filterButton);
});

buttonContainer.appendChild(filterContainer);

// api key to access JotForm, switch my key for yours
JF.initialize({ apiKey: "8ae1a9cbfe5470129d1af524cc098f4c" }); //PUT YOUR OWN KEY HERE

// get form submissions from JotForm Format: (formID, callback)
JF.getFormSubmissions("223027820929053", function (response) {
  // console.log("HI");

  const submissions = [];

  for (var i = 0; i < response.length; i++) {
    // create an object to store the submissions and structure as a json
    const submissionProps = {};

    // add all fields of response.answers to our object
    const keys = Object.keys(response[i].answers);
    const date = response[i].created_at;

    keys.forEach((answer) => {
      const lookup = response[i].answers[answer].cfname ? "cfname" : "name";
      submissionProps[response[i].answers[answer][lookup]] =
        response[i].answers[answer].answer;
    });

    submissionProps["date"] = date;
    console.log("Props", submissionProps);

    // add submission to submissions array
    submissions.push(submissionProps);
  }
  //  console.log("My Stories",submissions)

  for (var j = 0; j < submissions.length; j++) {
    if ((j + 1) % 3 == 0) {
      // console.log(3);
      parent = colTwo;
    } else if ((j + 1) % 3 == 1) {
      // console.log(1);
      parent = colThree;
    } else if ((j + 1) % 3 == 2) {
      // console.log(2);
      parent = colOne;
    }

    const img = submissions[j]["Take Photo"];
    const text = submissions[j]["whatsYour"];
    const title = submissions[j]["storyTitle"];
    const date = submissions[j]["date"].slice(0, 4);
    const audio = submissions[j]["Voice Recorder"];
    const tag = submissions[j]["questiontheme"];

    const filters = {
      "What's a core memory you have of your favorite spot in your neighborhood?": "Neighborhood-Spot",
      "Who is someone in your local community that inspires you? Can you tell us more about them?": "Community-Inspiration",
    };

    //  console.log(filters[tag]);

    makeContent(title, date, text);
    makePost(parent, j + 2, img, audio, title, date, filters[tag]);


  }

  // EXECUTE THE FUNCTION THAT FORECES THE PAGE TO RECALCULATE THE SIZE OF THE PARENT?

  // Post Format
  // makePost(colTwo,1,'/images/protest.jpg', 'Cyber Blue', 2022)

  // makePost(colOne, 2, "/images/protest.jpg", "Cyber Blue", 2011);
  // makePost(colOne, 5, "/images/flood.jpg", "Gnostic Will", 2012);
  // makePost(colOne, 8, "/images/space.jpg", "French Kiss", 2013);
  // makePost(colOne, 11, "/images/dumping.jpg", "Half Life", 2014);
  // makePost(colOne, 14, "/images/tire.jpg", "Love Boat", 2015);
  // makePost(colOne, 17, "/images/space.jpg", "Cold Blood", 2013);
  // makePost(colOne, 20, "/images/dumping.jpg", "Tulip Heat", 2014);
  // makePost(colOne, 23, "/images/tire.jpg", "Red Wrath", 2015);

  // makePost(colTwo, 1, "/images/protest.jpg", "Cyber Blue", 2022);
  // makePost(colTwo, 4, "/images/flood.jpg", "Gnostic Will", 2022);
  // makePost(colTwo, 7, "/images/space.jpg", "French Kiss", 2022);
  // makePost(colTwo, 10, "/images/dumping.jpg", "Half Life", 2022);
  // makePost(colTwo, 13, "/images/tire.jpg", "Love Boat", 2022);
  // makePost(colTwo, 16, "/images/space.jpg", "Cold Blood", 2022);
  // makePost(colTwo, 19, "/images/dumping.jpg", "Tulip Heat", 2022);
  // makePost(colTwo, 22, "/images/tire.jpg", "Red Wrath", 2022);

  // makePost(colThree, 3, "/images/protest.jpg", "Cyber Blue", 2023);
  // makePost(colThree, 6, "/images/flood.jpg", "Gnostic Will", 2023);
  // makePost(colThree, 9, "/images/space.jpg", "French Kiss", 2023);
  // makePost(colThree, 11, "/images/dumping.jpg", "Half Life", 2023);
  // makePost(colThree, 14, "/images/tire.jpg", "Love Boat", 2023);
  // makePost(colThree, 17, "/images/space.jpg", "Cold Blood", 2023);
  // makePost(colThree, 20, "/images/just.jpg", "Tulip Heat", 2023);
  // makePost(colThree, 23, "/images/tire.jpg", "Red Wrath", 2023);

  //  const posts = [{
  //   one: {
  //     col: colOne,
  //     url: /images/protest.jpg
  //   }

  //  }]
});

//the columns container
const container = document.getElementById("scroll-container");

//individual columns

// const storyblock = document.createElement("figure")
// storyblock.className = "column_item"

// colOne.appendChild(storyblock)

// col1
const childContainerOne = document.createElement("div");
childContainerOne.className = "column-wrap column-wrap--height";

const colOne = document.createElement("div");
colOne.className = "column";

makePost(colOne, 1, "/images/defaultpost.jpg", "", "Philly Trip", 2022);
// makePost(colOne,5,'/images/flood.jpg', 'Gnostic Will', 2012)
// makePost(colOne,8,'/images/space.jpg', 'French Kiss', 2013)
// makePost(colOne,11,'/images/dumping.jpg', 'Half Life', 2014)
// makePost(colOne,14,'/images/tire.jpg', 'Love Boat', 2015)
// makePost(colOne,17,'/images/space.jpg', 'Cold Blood', 2013)
// makePost(colOne,20,'/images/dumping.jpg', 'Tulip Heat', 2014)
// makePost(colOne,23,'/images/tire.jpg', 'Red Wrath', 2015)

childContainerOne.appendChild(colOne);
container.appendChild(childContainerOne);

// //col2
const childContainerTwo = document.createElement("div");
childContainerTwo.className = "column-wrap";

const colTwo = document.createElement("div");
colTwo.className = "column";
colTwo.setAttribute("data-scroll-section", "");

// makePost(colTwo,1,'/images/protest.jpg', 'Cyber Blue', 2022)
// makePost(colTwo,4,'/images/flood.jpg', 'Gnostic Will', 2022)
// makePost(colTwo,7,'/images/space.jpg', 'French Kiss', 2022)
// makePost(colTwo,10,'/images/dumping.jpg', 'Half Life', 2022)
// makePost(colTwo,13,'/images/tire.jpg', 'Love Boat', 2022)
// makePost(colTwo,16,'/images/space.jpg', 'Cold Blood', 2022)
// makePost(colTwo,19,'/images/dumping.jpg', 'Tulip Heat', 2022)
// makePost(colTwo,22,'/images/tire.jpg', 'Red Wrath', 2022)

childContainerTwo.appendChild(colTwo);

container.appendChild(childContainerTwo);

// //col3
const childContainerThree = document.createElement("div");
childContainerThree.className = "column-wrap column-wrap--height";

const colThree = document.createElement("div");
colThree.className = "column";

childContainerThree.appendChild(colThree);

// makePost(colThree,3,'/images/protest.jpg', 'Cyber Blue', 2023)
// makePost(colThree,6,'/images/flood.jpg', 'Gnostic Will', 2023)
// makePost(colThree,9,'/images/space.jpg', 'French Kiss', 2023)
// makePost(colThree,11,'/images/dumping.jpg', 'Half Life', 2023)
// makePost(colThree,14,'/images/tire.jpg', 'Love Boat', 2023)
// makePost(colThree,17,'/images/space.jpg', 'Cold Blood', 2023)
// makePost(colThree,20,'/images/just.jpg', 'Tulip Heat', 2023)
// makePost(colThree,23,'/images/tire.jpg', 'Red Wrath', 2023)

container.appendChild(childContainerThree);
