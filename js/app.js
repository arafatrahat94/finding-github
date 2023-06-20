const loaddata = name => {
    const url = `https://api.github.com/users/${name}` 

    fetch(url)
    .then(res => {
        if(res.status === 404){
            alert('requested user is not found');
            return;
        }
        else{
            return res.json()
        }
    })
    .then(data => {
        displayData(data);
        showDetails(data);
        followerDetails1(data.login);
    })
}
const displayData = data => {
    console.log(data)
    const imageContainer = document.getElementById('imageContainer');
    const nameContainer = document.getElementById('name');
    nameContainer.innerText = data.name;
    const followingContainer = document.getElementById('followsContainer');
    followingContainer.innerHTML = `
    <a href="" id = "following" class="hover:text-blue-600"><i class="fa-solid fa-user "></i> Following ${data.following}</a> &nbsp; &nbsp; &nbsp;<a id="followers" class="hover:text-blue-600" href=""><i  class="fa-solid fa-user-group"></i> Followers ${data.followers}</a>`
    imageContainer.innerHTML = `<img class="rounded-full  shadow-xl shadow-black" src="${data.avatar_url}" alt="">`

    const followButton = document.getElementById('foll');
    followButton.innerHTML = `
    <a href="${data.html_url}">
    <div class="button hover:text-sky-400 lg:w-3/4 mx-auto text-center font-mono font-semibold rounded-lg shadow-xl shadow-black text-xl py-3 bg-gradient-to-l text-white border-2 border-black from-slate-900 via-purple-900 to-slate-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300">
        <i class="fa-brands fa-github text-2xl"></i> Follow
    </div>
    </a>`

}
const showDetails = data => {
    document.getElementById('followers').addEventListener('click', function(event){
        event.preventDefault();
        // document.getElementById('sec-name').innerText = `Followers`
        const url = data.followers_url;
        fetch(url)
        .then(res => res.json())
        .then(data => newData(data))
        const newData = data => {
            console.log(data)
            const repoContainer = document.getElementById('reposi');
            repoContainer.innerHTML = ''
        data.forEach(element => {
        const li = document.createElement('li');
        li.innerHTML=`
        <li class="py-3 sm:py-4">
        <div class="flex items-center justify-center">
                    <div class="flex-shrink-0">                    
                </div>
                <div class="flex-1 text-center min-w-0">
                <p class="text-sm font-medium uppercase truncate ">
                ${element.login}
                </p>
                <p class="text-sm hover:text-blue-600 text-gray-500 truncate dark:text-gray-400">
                web: <a href="${element.html_url}" target="_blank" >${element.html_url}</a>
                </p>
                </div>
                
                </div>
                </li>`
                
                repoContainer.appendChild(li)
            });
            document.getElementById('sec-name').innerText = `Followers`
        }
    })
}

const followerDetails1 = data => {
    console.log(data)
    url = `https://api.github.com/users/${data}/following`
    document.getElementById('following').addEventListener('click', function(event){
        event.preventDefault();
        console.log(url)
        fetch(url)
        .then(res => res.json())
        .then(data => newData(data))
        const newData = data => {
            console.log(data)
            const repoContainer = document.getElementById('reposi');
            repoContainer.innerHTML = ''
        data.forEach(element => {
        const li = document.createElement('li');
        li.innerHTML=`
        <li class="py-3 sm:py-4">
        <div class="flex items-center justify-center">
                    <div class="flex-shrink-0">                    
                </div>
                <div class="flex-1 text-center min-w-0">
                <p class="text-sm font-medium uppercase truncate ">
                ${element.login}
                </p>
                <p class="text-sm hover:text-blue-600 text-gray-500 truncate dark:text-gray-400">
                web: <a href="${element.html_url}" target="_blank" >${element.html_url}</a>
                </p>
                </div>
                
                </div>
                </li>`
                repoContainer.appendChild(li);
            });
            document.getElementById('sec-name').innerText = `Following`
        }
        
    })
}
const repo = name => {
    const url = `https://api.github.com/users/${name}/repos`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        show(data);
        showRepoSome(data);
      });
}
const showRepoSome = data => {
    const repoContainer = document.getElementById('reposi');
    repoContainer.innerHTML = ''
    data.slice(0,4).forEach(element => {
        const li = document.createElement('li');
        li.innerHTML=`
        <li class="py-3 sm:py-4">
        <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">                    
                </div>
                <div class="flex-1 min-w-0">
                <p class="text-sm font-medium uppercase truncate ">
                ${element.name}
                </p>
                <p class="text-sm hover:text-blue-600 text-gray-500 truncate dark:text-gray-400">
                web: <a href="${element.html_url}" target="_blank" >${element.html_url}</a>
                </p>
                </div>
                <div class="inline-flex items-center text-base font-semibold  ">
                <i class="fa-solid hover:text-blue-600 fa-file-arrow-down text-3xl me-3"><a href="${element.html_url}" target="_blank" ></a></i>
                </div>
                </div>
                </li>`
                repoContainer.appendChild(li)
            });
            
            
        }
        const show = data => {
    const repoContainer = document.getElementById('reposi');
    repoContainer.innerHTML = ''
    document.getElementById('viewAll').addEventListener('click', function(){
        data.forEach(element => {
            const li = document.createElement('li')
            li.innerHTML=`
            <li class="py-3 sm:py-4">
            <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">                    
            </div>
            <div class="flex-1 min-w-0">
            <p class="text-sm font-medium uppercase truncate ">
            ${element.name}
            </p>
            <p class="text-sm hover:text-blue-600 text-gray-500 truncate dark:text-gray-400">
            web: <a href="${element.html_url}" target="_blank" >${element.html_url}</a>
            </p>
            </div>
            <div class="inline-flex items-center text-base font-semibold  ">
            <i class="fa-solid hover:text-blue-600 fa-file-arrow-down text-3xl me-3"><a href="${element.html_url}" target="_blank" ></a></i>
            </div>
            </div>
            </li>`
            repoContainer.appendChild(li)})
        })
    }
document.getElementById('searchTap').addEventListener('click', function(event){
    event.preventDefault();
    const inputData = document.getElementById('default-search');
    console.log(inputData);
    
    const inputValu = inputData.value;
    if(inputValu === ''){
        alert('please enter name before searching')
        return
    }
    inputData.value = '';
    repo(inputValu);
    loaddata(inputValu);
})
