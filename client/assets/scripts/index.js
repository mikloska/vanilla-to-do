const secretText = document.querySelector('.secret-text')
const secretForm = document.getElementById('secret-form')

const submitSecret= async (e) => {
  e.preventDefault()
  // window.location.href = "/secret";
  console.log('username: ',username.value, ' password: ',password.value)
  if(username.value === 'codesmith' && password.value === 'ilovetesting'){
    window.location.href = "/secret";
    const response = await fetch('signin/', {
      method: 'GET',
      //This is needed to creat a cookie!!!!!!
      credentials: 'include',
  
    })
    console.log(response);

  }

  
  username.value="";
  password.value="";
}

secretForm.addEventListener('submit', submitSecret);