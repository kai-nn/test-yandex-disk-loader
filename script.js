
const fetchData = async (path) => {

    let response = await fetch(path, {
        method: 'GET',
        // body: blob,
        headers: {
            Authorization: "OAuth y0_AgAAAAAJlBpGAAo-ZQAAAADoxIp3GyjgfFmASjeWLVvPU8BgIpk0Wv4"
        }
      })

    if (response.ok) {
        let json = await response.json()
        console.log(json.link)
        document.getElementById('link').innerHTML = json.link
    } else {
        console.log("Error", response);
    }
}

const convert = 'test.txt'
console.log(convert)
let path = `https://cloud-api.yandex.net/v1/disk/resources/upload
?path=%2Ftemp%2F${convert}
&overwrite=true`
// fetchData(path)



fetch(path, {
    method: 'GET',
    // body: blob,
    headers: {
        "Content-Type": 'application/json', 
        Accept: 'application/json',
        Authorization: "OAuth y0_AgAAAAAJlBpGAAo-ZQAAAADoxuYVwMK5E3s2RkiUnRsNUeOdB0anSOs"
    }
})
.then(response => response.json())
.then(result => {
    console.log(result)
    


    fetch(result.href, {
        method: 'PUT',
        // body: blob,
        headers: {
            // Accept: 'application/json',
            // Authorization: "OAuth y0_AgAAAAAJlBpGAAo-ZQAAAADoxuYVwMK5E3s2RkiUnRsNUeOdB0anSOs"
        }
    })
    // .then(response => response.json())
    // .then(result => {
    //     console.log(result)
    // })


})


  