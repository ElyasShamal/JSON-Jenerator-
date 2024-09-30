

// Element selectors 
const jsonButton = document.getElementById("generate");
// section buttion
const buttonContainer = document.querySelector('#buttonContainer');
// display container
const displayContainer = document.querySelector('#displayContainer');

const collection = ["Another", "More", "Next", "Continue", "Keep going", "Click me", "A new one"];

const generateJson = async () => {
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if(response.ok){
            const jsonResponse = await response.json();
            renderResponse(jsonResponse);
            changeButton();
        }

    }catch(error) {
      console.log(error)
    };
    
}

const formatJson = (resJson) => {
    resJson = JSON.stringify(resJson);
    let counter = 0;
    return resJson.split('')
    .map(char => {
      switch (char) {
        case ',':
          return `,\n${' '.repeat(counter * 2)}`;
        case '{':
          counter += 1;
          return `{\n${' '.repeat(counter * 2)}`;
        case '}':
          counter -= 1;
          return `\n${' '.repeat(counter * 2)}}`;
        default:
          return char;
      }
    })
    .join('');
  };

  const renderResponse = (jsonResponse) => {
    const jsonSelection = Math.floor(Math.random() * 10);
    displayContainer.innerHTML = `<pre>${formatJson(jsonResponse[jsonSelection])}</pre>`;
  };

  const changeButton = () => {
    const newText = Math.floor(Math.random() * 7);
    jsonButton.innerHTML = `${collection[newText]}!`;
  };

  // Listen for click on button
jsonButton.addEventListener('click', generateJson);