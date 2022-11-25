function playRecording(e) {
  let button = e.target;
  if (button.tagName === 'IMG') {
    // get parent button
    button = button.parentElement;
  }
  const audio = button.previousElementSibling;
  if (audio && audio.tagName === 'AUDIO') {
    if (audio.paused) {
      audio.play();
      button.firstElementChild.src = 'images/pause.png';
    } else {
      audio.pause();
      button.firstElementChild.src = 'images/play.png';
    }
  }
}

function makePost(parent, pos, file, sound, name, year ) {
  const fig = document.createElement("figure")
  fig.className = "column_item"

  const wrapper = document.createElement("div")
  wrapper.className = "column__item-imgwrap"
  wrapper.setAttribute("data-pos", pos)

  const img = document.createElement("div")
  img.className = "column__item-img"
  img.style = "background-image:url(" + file + ")";

  const caption = document.createElement("figcaption")
  caption.className = "column__item-caption"

  const title = document.createElement("h6")
  const date = document.createElement("span")

  title.innerHTML = name
  date.innerHTML =  year

  const playButton = document.createElement('button');
  playButton.classList.add('play-button', 'btn', 'border', 'shadow-sm', 'text-center', 'd-block', 'mx-auto');

  const playImage = document.createElement('img');
  playImage.src = '/images/play.png';
  playImage.classList.add('img-fluid');

  // make background image of play button the image or stick the image on top of the play button
  // playImage.style = "background-image:url(" + submissions[j]["Take Photo"] + ")";
  playButton.addEventListener('click', playRecording);
  playButton.appendChild(playImage);


  const audio = document.createElement("audio");
  audio.id = "story-sound";
  audio.onended = (e) => {
    e.target.nextElementSibling.firstElementChild.src = 'images/play.png';
  };

  let text1 = "https://jotform.com/";
  let result = text1.concat(sound);

  audio.src = result;
  // audio.setAttribute('controls', ''); // add controls

  const audio_container = document.createElement("div");
  audio_container.className = "audio-container";

  audio_container.appendChild(audio);
  audio_container.appendChild(playButton);

  caption.appendChild(title)
  caption.append(date)

  img.appendChild(audio_container)
  wrapper.appendChild(img)

  fig.appendChild(wrapper)
  fig.appendChild(caption)

  parent.appendChild(fig)

}

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
  const keys = Object.keys(response[i].answers)
  const date = response[i].created_at

  keys.forEach((answer) => {
    const lookup = response[i].answers[answer].cfname ? "cfname" : "name";
    submissionProps[response[i].answers[answer][lookup]] =
      response[i].answers[answer].answer;
  });

  submissionProps["date"] = date
  // console.log("Props", submissionProps);

  // add submission to submissions array
  submissions.push(submissionProps);
}
 console.log("My Stories",submissions)

 for (var j = 0; j < submissions.length; j++){

  if ((j+1)%(3) == 0){
    console.log(3);
    parent = colTwo
  }
  else if((j+1)%(3) == 1) {
    console.log(1);
    parent = colThree;

  }

  else if((j+1)%(3) == 2) {
    console.log(2);
    parent = colOne;

  }



  const img = submissions[j]["Take Photo"];
  const title = submissions[j]["storyTitle"];
  const date =  submissions[j]["date"].slice(0,4);
  const audio =  submissions[j]["Voice Recorder"];

  makePost(parent,j+1,img,audio,title,date);








}

// Post Format
// makePost(colTwo,1,'/images/protest.jpg', 'Cyber Blue', 2022)

});




//the columns container
const container = document.getElementById("scroll-container")

//individual columns 


// const storyblock = document.createElement("figure")
// storyblock.className = "column_item"

// colOne.appendChild(storyblock)


// col1
const childContainerOne = document.createElement("div")
childContainerOne.className= "column-wrap column-wrap--height"

const colOne = document.createElement("div")
colOne.className="column"

// makePost(colOne,2,'/images/protest.jpg', 'Cyber Blue', 2011)
// makePost(colOne,5,'/images/flood.jpg', 'Gnostic Will', 2012)
// makePost(colOne,8,'/images/space.jpg', 'French Kiss', 2013)
// makePost(colOne,11,'/images/dumping.jpg', 'Half Life', 2014)
// makePost(colOne,14,'/images/tire.jpg', 'Love Boat', 2015)
// makePost(colOne,17,'/images/space.jpg', 'Cold Blood', 2013)
// makePost(colOne,20,'/images/dumping.jpg', 'Tulip Heat', 2014)
// makePost(colOne,23,'/images/tire.jpg', 'Red Wrath', 2015)


childContainerOne.appendChild(colOne)
container.appendChild(childContainerOne)




// //col2
const childContainerTwo = document.createElement("div")
childContainerTwo.className= "column-wrap"

const colTwo = document.createElement("div")
colTwo.className="column"
colTwo.setAttribute("data-scroll-section", "")

// makePost(colTwo,1,'/images/protest.jpg', 'Cyber Blue', 2022)
// makePost(colTwo,4,'/images/flood.jpg', 'Gnostic Will', 2022)
// makePost(colTwo,7,'/images/space.jpg', 'French Kiss', 2022)
// makePost(colTwo,10,'/images/dumping.jpg', 'Half Life', 2022)
// makePost(colTwo,13,'/images/tire.jpg', 'Love Boat', 2022)
// makePost(colTwo,16,'/images/space.jpg', 'Cold Blood', 2022)
// makePost(colTwo,19,'/images/dumping.jpg', 'Tulip Heat', 2022)
// makePost(colTwo,22,'/images/tire.jpg', 'Red Wrath', 2022)

childContainerTwo.appendChild(colTwo)

container.appendChild(childContainerTwo)

// //col3
const childContainerThree = document.createElement("div")
childContainerThree.className= "column-wrap column-wrap--height"

const colThree = document.createElement("div")
colThree.className="column"

childContainerThree.appendChild(colThree)

// makePost(colThree,3,'/images/protest.jpg', 'Cyber Blue', 2023)
// makePost(colThree,6,'/images/flood.jpg', 'Gnostic Will', 2023)
// makePost(colThree,9,'/images/space.jpg', 'French Kiss', 2023)
// makePost(colThree,11,'/images/dumping.jpg', 'Half Life', 2023)
// makePost(colThree,14,'/images/tire.jpg', 'Love Boat', 2023)
// makePost(colThree,17,'/images/space.jpg', 'Cold Blood', 2023)
// makePost(colThree,20,'/images/just.jpg', 'Tulip Heat', 2023)
// makePost(colThree,23,'/images/tire.jpg', 'Red Wrath', 2023)

container.appendChild(childContainerThree)




