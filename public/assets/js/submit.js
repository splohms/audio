// api key to access JotForm, switch my key for yours
JF.initialize({ apiKey: "8ae1a9cbfe5470129d1af524cc098f4c" }); //PUT YOUR OWN KEY HERE

// get form submissions from JotForm Format: (formID, callback)
JF.getFormSubmissions("223027820929053", function (response) {
  console.log("RESPONSe", response);
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

const col = document.getElementById('column');

// let filters = ["park", "friends", "food"]

for (var j = 0; j < submissions.length; j++){
  //
  // if (submissions[i].answers.tags.some(x => filters.includes(x))
  //
  // // const story = document.createElement("div");
  // // story.id = "story-block";
  // //
  // // //display title
  // // // console.log(submissions[j]["storyTitle"]);
  // // const title = document.createElement("div");
  // // title.id = "story-title";
  // // title.innerHTML = submissions[j]["storyTitle"];
  // //
  // // //diplay image
  // // const image = document.createElement("img");
  // // image.id = "story-img";
  // // image.src = submissions[j]["Take Photo"];
  // //
  // // //play audio
  // // const audio = document.createElement("audio");
  // // audio.id = "story-sound";
  // // // audio.src = submissions[j]["Voice Recorder"];
  // //
  // //
  // // let text1 = "https://jotform.com/";
  // // let text2 = submissions[j]["Voice Recorder"];
  // // let result = text1.concat(text2);
  // //
  // // audio.src = result;
  // // audio.setAttribute('controls', ''); // add controls
  // // // const audio_clip = new Audio(submissions[j]["Voice Recorder"]);
  // // // console.log(audio_clip);
  // // console.log(typeof submissions[j]["Voice Recorder"]);
  // //
  // //
  // // // join the string!!!
  // // story.appendChild(title);
  // // story.appendChild(image);
  // // story.appendChild(audio);
  // //
  // // document.body.appendChild(story);


   const story = document.createElement("figure");
   story.className = "column__item"

   const wrapper = document.createElement("div");
   wrapper.className = "column__item-imgwrap";

   const image = document.createElement("div");
   image.className = "column__item-img";
   image.style = "background-image:url(" + submissions[j]["Take Photo"] + ")";

   const title = document.createElement("figcaption");
   title.className = "column__item-caption";

   const span = document.createElement("h6");
   span.innerHTML= submissions[j]["storyTitle"];

   const date = document.createElement("span")
   console.log(typeof(submissions[j]["date"]))
   date.innerHTML = submissions[j]["date"].slice(0,4)

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
   let text2 = submissions[j]["Voice Recorder"];
   let result = text1.concat(text2);

   audio.src = result;
   // audio.setAttribute('controls', ''); // add controls

   const audio_container = document.createElement("div");
   audio_container.className = "audio-container";

   audio_container.appendChild(audio);
   audio_container.appendChild(playButton);

   title.appendChild(span);
   title.appendChild(date);
   image.appendChild(audio_container)
   wrapper.appendChild(image);
   // wrapper.appendChild(audio_container);
   story.appendChild(wrapper);
   story.appendChild(title);
   // story.appendChild(audio_container);

   document.getElementById('column').appendChild(story);





}

});
