document.getElementById('jsonuploader').addEventListener('change', async (event) => {
  console.log('File Uploaded')
  let files = event.target.files
  let fileName = 'following.json' 
  for (let file of files) {
    if (file.name === fileName && file.webkitRelativePath.endsWith(fileName)) {
      const fileContent = await file.text()
      const jsonData = JSON.parse(fileContent)
      let values = []
      let currentfollowinglist = document.querySelector('#following-count')
      let followinglist = ''
      jsonData.relationships_following.forEach(item => {
        let accountuuid = ''
        if (item.string_list_data && item.string_list_data.length > 0) {
          item.string_list_data.forEach(data => {
            if (data.value) {
              values.push(data.value)
              accountuuid = self.crypto.randomUUID()
              console.log(`Username: ${data.value}, Timestamp: ${data.timestamp}`)
              followinglist += `<div class='following-div'><a href='https://instagram.com/${data.value}' target='_blank' class='username-h3-link'><h3 class='following-div-head'>@${data.value}</h3></a><p class='following-div-content'>You have been following <span id='following-${accountuuid}'>${data.value}</span> since <span id='following-date-${accountuuid}'>${new Date(data.timestamp * 1000)}</span></p></div>`
            }
          })
        }
      })
      document.querySelector('#followingcount').innerHTML = values.length
      currentfollowinglist.innerHTML = followinglist
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