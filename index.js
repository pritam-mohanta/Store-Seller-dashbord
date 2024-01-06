function handleFormSubmit(event){
  event.preventDefault()
  const name=event.target.name.value;
  const desc=event.target.desc.value;
  const price=event.target.price.value;
  const quan=event.target.quan.value;
  const obj={
    name,
    desc,
    price,
    quan
  }

  //store data into crud crud data base using network call and axios
  //post request and store data
  axios.post('https://crudcrud.com/api/7b8d9676dbcb408d9bd1be9e86bcde0d/sData',obj)
  .then((response) => {
    showNewUser(response.data)
    //console.log(response)
  }).catch((error) => {
    document.body.innerHTML = document.body.innerHTML + '<h4>Something Went Wrong</h4>'
    console.log(error)
  });


  //localStorage.setItem('userDetails',JSON.stringify(obj));
  //showNewUser(obj)
}

window.addEventListener('DOMContentLoaded',()=>{

  //get the data from crud crud or server storage and show it in screen and then after refresh data not go 
  axios.get('https://crudcrud.com/api/7b8d9676dbcb408d9bd1be9e86bcde0d/sData')
  .then((response)=>{
    console.log(response)
    for (let i = 0; i< response.data.length;i++) {
      showNewUser(response.data[i])
    }
  }).catch((error)=>{
    console.log(error)
  })

  // //get the data from local storage and show it in screen and then after refresh data not go 
  // const localStorageObj = localStorage
  // const localStorageKeys = Object.keys(localStorageObj)
  // for (let i = 0; i < localStorageKeys.length; i++) {
  //   const key = localStorageKeys[i]
  //   const userDetailsString = localStorageObj[key]
  //   const userDetailsObj = JSON.parse(userDetailsString)
  //   showNewUser(userDetailsObj) 
  // }


})


function showNewUser(user){
  document.getElementById('name').value=''
  document.getElementById('desc').value=''
  document.getElementById('price').value=''
  document.getElementById('quan').value=''
  // if(localStorage.getItem(user.price)!==null){
  //   removeUserFromScreen(user.email)
  // }

  // we change user.email to user._id becouse to get oerfect delete id
  const parentNode = document.getElementById('listOfItems')
  const childNode = `<li id=${user._id}> ${user.name}-${user.desc}- ${user.price}-${user.quan}
                      <button onclick=editUserdetails1('${user.name}','${user.desc}','${user.price}','${user.quan}','${user._id}')> Buy One </button>
                      
                      <button onclick=editUserdetails2('${user.name}','${user.desc}','${user.price}','${user.quan}','${user._id}')> Buy Two </button>
                    
                    <button onclick=editUserdetails3(${user.name}','${user.desc}','${user.price}','${user.quan}','${user._id}')> Buy Three </button>
                    <button onclick=deleteUser('${user._id}')> Delete </button>
                    </li>`
  parentNode.innerHTML = parentNode.innerHTML + childNode
}



function editUserdetails1(name,desc,price,quan,userId){
  axios.put(`https://crudcrud.com/api/7b8d9676dbcb408d9bd1be9e86bcde0d/sData/${userId}`,{
    'name': name,
    'desc':desc,
    'price':price,
    'quan':quan-1
  })
  .then(res=>console.log(res.data))
  .catch(err=>console.log(err))
}

function editUserdetails2(name,desc,price,quan,userId){
  axios.put(`https://crudcrud.com/api/7b8d9676dbcb408d9bd1be9e86bcde0d/sData/${userId}`,{
    'name': name,
    'desc':desc,
    'price':price,
    'quan':quan-2
  })
  .then(res=>console.log(res.data))
  .catch(err=>console.log(err))
}

function editUserdetails3(name,desc,price,quan,userId){
  axios.put(`https://crudcrud.com/api/7b8d9676dbcb408d9bd1be9e86bcde0d/sData/${userId}`,{
    'name': name,
    'desc':desc,
    'price':price,
    'quan':quan-3
  })
  .then(res=>console.log(res.data))
  .catch(err=>console.log(err))
}


function deleteUser(userId){
  axios.delete(`https://crudcrud.com/api/7b8d9676dbcb408d9bd1be9e86bcde0d/sData/${userId}`)
  .then((response)=>{
    removeUserFromScreen(userId)
  }).catch((error)=>{
    console.log(error)
  })

}


function removeUserFromScreen(userId){
  const parentNode=document.getElementById('listOfItems')
  const childNodeToRemoved=document.getElementById(userId)
  if(childNodeToRemoved){
    parentNode.removeChild(childNodeToRemoved)
  }
}
