document.getElementById('jsonuploader').addEventListener('change', async (event) => {
    console.log('File Uploaded')
    let files = event.target.files
    let fileName = 'following.json' 
    for (let file of files) {
      if (file.name === fileName && file.webkitRelativePath.endsWith(fileName)) {
        const fileContent = await file.text()
        const jsonData = JSON.parse(fileContent)
        console.log(jsonData)
        let values = []
        jsonData.relationships_following.forEach(item => {
            if (item.string_list_data && item.string_list_data.length > 0) {
                item.string_list_data.forEach(data => {
                    if (data.value) {
                        values.push(data.value)
                    }
                })
            }
        })
        console.log(values)
        document.querySelector('#followingcount').innerHTML = values.length
        break
      }
  }
  fileName = 'followers_1.json' 
  for (let file of files) {
    if (file.name === fileName && file.webkitRelativePath.endsWith(fileName)) {
    fileContent = await file.text()
    jsonData = JSON.parse(fileContent)
    console.log(jsonData)
    values = []
    jsonData.relationships_following.forEach(item => {
      if (item.string_list_data && item.string_list_data.length > 0) {
        item.string_list_data.forEach(data => {
          if (data.value) {
            values.push(data.value)
          }
        })
      }
    })
      console.log(values)
      document.querySelector('#followerscount').innerHTML = values.length
      break
    }
  }
})