const card = document.getElementById('card')
const inputField = document.getElementById('input-field')
const form = document.querySelector('form')

const message = document.getElementById('message')

function showErrorMessage(errorMessage) {
    message.innerText = errorMessage
    message.classList.remove('hidden')
    
    setTimeout(() => {
        message.innerText = ""
        message.classList.add('hidden')
    }, 2000);
}

function apiCall(username, callback) {
    const url = `https://api.github.com/users/${username}`
    const xhr = new XMLHttpRequest();

    let data = null

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
           if (xhr.status == 200) {
                const data = JSON.parse(xhr.responseText);
                callback(null, data); 
            } else {
                callback(new Error('Failed to fetch data'), null); 
            }
        }
    }

    xhr.open('GET', url)
    xhr.send()   
}

const image = document.querySelector('#card img')
const username = document.querySelector('#username a span')
const githubProfile = document.querySelector("#username a")
const name = document.querySelector('#name span')
const follower = document.querySelector('#followers span')
const repositories = document.querySelector('#repositories span')
const twitter = document.querySelector('#twitter a span')
const twitterProfile = document.querySelector("#twitter a")


function addData(data) {
    image.src = data["avatar_url"]
    username.innerText = data["login"]
    githubProfile.href = `https://github.com/${data["login"]}`
    name.innerText = data["name"]
    follower.innerText = data["followers"]
    repositories.innerText = data["public_repos"]
    twitter.innerText = data["twitter_username"]
    twitterProfile.href = `https://twitter.com/${data["twitter_username"]}`

    if (card.classList.contains('hidden'))
        card.classList.remove('hidden')
}

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const username = inputField.value.trim()
    
    if(username === "")
        showErrorMessage("Enter a username")
    else  {
        apiCall(username, (error, data) => {
            if (error)
                showErrorMessage("Failed to fetch data");
            else {
                if (!data || data.message === "Not Found") {
                    showErrorMessage("Enter a valid username")
                } else {
                    console.log(data);
                    addData(data)
                }
            }

        })
    }
    
    inputField.value = ""
})