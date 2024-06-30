function removeLoader() {
  if (followingComplete == true && followersComplete == true) {
    console.log('Loader to be removed')
    // Remove loader
  } else {
    console.log(`following:${followingComplete} followers:${followersComplete}`)
  }
}
let followingComplete = false
let followersComplete = false
let followingvalues = []
document.getElementById('jsonuploader').addEventListener('change', async (event) => {
  console.log('File Uploaded')
  let files = event.target.files
  let fileName = 'following.json'
  let accountuuid = '' 
  let followinglist = ''
  for (let file of files) {
    if (file.name === fileName && file.webkitRelativePath.endsWith(fileName)) {
      const fileContent = await file.text()
      const jsonData = JSON.parse(fileContent)
      
      let count = 0
      let currentfollowinglist = document.querySelector('#following-count')
      jsonData.relationships_following.forEach(item => {
        if (item.string_list_data && item.string_list_data.length > 0) {
          item.string_list_data.forEach(data => {
          if (data.value) {
            followingvalues.push(data.value)
            accountuuid = self.crypto.randomUUID()
            console.log(`Username: ${data.value}, Timestamp: ${data.timestamp}`)
            count += 1
              followinglist += `<div id=acc-${accountuuid} class='following-div'><a href='https://instagram.com/${data.value}' target='_blank' class='username-h3-link'><h3 class='following-div-head'>@${data.value}</h3></a><p class='following-div-content'>You have been following <span id='following-${accountuuid}' class='followerunderline pk-fo-u'>${data.value}</span> since <span id='following-date-${accountuuid}'>${new Date(data.timestamp * 1000)}</span></p></div>`
          }
        })
        }
      })
      document.querySelector('#followingcount').innerHTML = followingvalues.length
      currentfollowinglist.innerHTML = followinglist
      console.log(count)
      console.log(accountuuid)
      // document.querySelector(`#acc-${accountuuid}`).innerHTML = document.querySelector(`#acc-${accountuuid}`) + `<img src='https://cdn.prestonkwei.com/numberoneclipart.png`>
      followingComplete = true
      removeLoader()
      break
    }
  }
})
let followersvalues = []
document.getElementById('jsonuploader').addEventListener('change', async (event) => {
  console.log('File Uploaded')
  let files = event.target.files
  let fileName = 'followers_1.json'
  let accountuuid = '' 
  let followerslist = ''
  for (let file of files) {
    if (file.name === fileName && file.webkitRelativePath.endsWith(fileName)) {
      const fileContent = await file.text()
      const jsonData = JSON.parse(fileContent)
      
      let count = 0
      let currentfollowerslist = document.querySelector('#followers-count')
      jsonData.forEach(item => {
        if (item.string_list_data && item.string_list_data.length > 0) {
          item.string_list_data.forEach(data => {
          if (data.value) {
            followersvalues.push(data.value)
            accountuuid = self.crypto.randomUUID()
            console.log(`Username: ${data.value}, Timestamp: ${data.timestamp}`)
            count += 1
              // followinglist += `<div id=acc-${accountuuid} class='following-div'><a href='https://instagram.com/${data.value}' target='_blank' class='username-h3-link'><h3 class='following-div-head'>@${data.value}</h3></a><p class='following-div-content'>You have been following <span id='following-${accountuuid}' class='followerunderline pk-fo-u'>${data.value}</span> since <span id='following-date-${accountuuid}'>${new Date(data.timestamp * 1000)}</span></p></div>`
          }
        })
        }
      })
      document.querySelector('#followerscount').innerHTML = followersvalues.length
      currentfollowerslist.innerHTML = followerslist
      console.log(count)
      console.log(accountuuid)
      // document.querySelector(`#acc-${accountuuid}`).innerHTML = document.querySelector(`#acc-${accountuuid}`) + `<img src='https://cdn.prestonkwei.com/numberoneclipart.png`>
      followersComplete = true
      removeLoader()
      break
    }
  }
})

let followingSort = 1
document.querySelector('#following-sortby').addEventListener('click', () => {
  if (followingSort == 1) {
    followingSort = 2
    document.querySelector('#following-sortby-now').innerHTML = 'Oldest First'
    document.querySelector('#following-count').style.flexDirection = 'column-reverse'
  } else if (followingSort == 2) {
    followingSort = 1
    document.querySelector('#following-sortby-now').innerHTML = 'Newest First'
    document.querySelector('#following-count').style.flexDirection = 'column'
  }
})