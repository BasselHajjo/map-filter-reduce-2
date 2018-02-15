const btn = document.querySelector("button");
const hackYourFutureAmsterdamUrl = 'https://api.github.com/orgs/HackYourFuture/repos';
const resultHolder = document.querySelector("ol");

function loadingHackYourFutureData(){
    resultHolder.innerHTML = "";
    console.log("You clicked me!")
    fetchJsonData(hackYourFutureAmsterdamUrl, printJsonData);
};

btn.addEventListener("click",loadingHackYourFutureData);

function fetchJsonData(url, callBackFunction) {
    const request = new XMLHttpRequest();
    request.addEventListener('load', function(data) {
         if (this.status === 200) {
            console.log("Data loaded");
            const responseText = request.responseText;
            callBackFunction(JSON.parse(request.responseText));
        } else {
            console.log("Can't load data !");
        }
    });
    
    request.addEventListener('error',function(){
        console.log("Server error !")
    });

    request.open('get', url);
    request.send();
};

const printJsonData = function(data) {
    console.log(data);
    displayHackYourFutureInfo(data);
};

function displayHackYourFutureInfo(data){
    
    const firstResult = document.createElement("ul");
    resultHolder.appendChild(firstResult);
    firstResult.innerHTML = `<h3>The most forked Repos is: </h3>`;
    
            data.filter((x)=>{
            if(x.forks_count > 9){
            const mostForked = document.createElement("li");
            firstResult.appendChild(mostForked);
            mostForked.innerHTML = x.name; 
            };
            
        });    
    const secondResult = document.createElement("ul");
    resultHolder.appendChild(secondResult);
    secondResult.innerHTML = `<h3>The less forked Repos is: </h3>`;
            
            data.filter((x)=>{
            if(x.forks_count < 3){
            const lessForked = document.createElement("li");
            secondResult.appendChild(lessForked);
            lessForked.innerHTML = x.name;    
            };
            });
    
    const thirdResult = document.createElement("ul");
    resultHolder.appendChild(thirdResult);
    thirdResult.innerHTML = `<h3>The Total number of forked repos is: </h3>`;
    
            let totalForked = 0;
            data.filter((x)=>{
                totalForked += x.forks_count;
            });
    
    const totalForkedCount = document.createElement("p");
    thirdResult.appendChild(totalForkedCount);
    totalForkedCount.innerHTML = totalForked + " Repo";
    
    
//    const forthResult = document.createElement("ul");
//    resultHolder.appendChild(forthResult);
//    forthResult.innerHTML = `<h3>The Most recent commits for the most forked repos is :</h3>`
    
};




























