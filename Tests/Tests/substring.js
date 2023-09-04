const submitButton = document.getElementById('submitString');

document.getElementById('stringInputField').value = '40 08 B4 39 40 0E D9 17 40 16 45 A2 43 69 00 00 43 6A 4C CD 43 68 66 66 43 68 66 66 43 C9 C0 00 43 CA 0C CD 43 C9 40 00 43 CA 0C CD 42 47 EB 85 44 C1 53 33 43 F7 8C CD 43 FF 8C CD 44 07 19 9A C2 E2 99 9A C1 C0 00 00 C2 75 33 33 C1 DF 33 33 44 C3 39 9A 43 F9 B3 33 44 01 6C CD 44 08 33 33 BF 7D 70 A4 BF 7D B2 2D BF 7C ED 91 BF 7D B2 2D 41 08 F5 C3 3F EC CC CD 40 55 C2 8F 40 57 AE 14 41 0B 5C 29 40 36 66 66 40 57 AE 14 40 5C CC CD 3E 19 99 9A 3F 80 00 00 3C F5 C2 8F 3D A3 D7 0A'

// submitButton.addEventListener('click',()=>{
//      console.log('it works, you clicked me');
//      const textInput = document.getElementById('stringInputField').value;
//      console.log(textInput);
//      let arr = textInput.split(',');
//      let n = 0;
//      arr.forEach(element => {
//           // console.log(n);
//           // console.log(element);
//           arr[n] = element.replaceAll(' ','');
//           // console.log(arr[n]);
//           n = n+1;
//      });
//      console.log(arr);
     
// })

let hexArray = 0;
submitButton.addEventListener('click', handleClick);


let object = {};
function handleClick(){
     console.log('it works, you clicked me');
     const textInput = document.getElementById('stringInputField').value;
     const hexArray = stringToArray(textInput);
     

     let floatArray = [] ;
     floatArray.length = hexArray.length;
     for (let index = 0; index < hexArray.length; index++) {
          const element = '0x'+hexArray[index];
          floatArray[index] = parseFloat(element);
     }

     
     for (let index = 0; index < floatArray.length; index++) {
      const element = floatArray[index].toFixed(3); // 3 digits after decimal
      object[`register${index}`] = element;
     }

    // start the list with no children
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
    // Loop through the values of the object
    for (let value of Object.values(object)) {
      // Create a new list item element
      let item = document.createElement("li");
      // Set its text content to the value
      item.textContent = value;
      // Append it to the list element
      list.appendChild(item);
    }
  }
  
  let list = document.createElement("ol");
  document.body.appendChild(list);


function stringifyJson(element){
  const output = JSON.stringify(element);
  return output;
}


// trim left and right, then split the string into an array of hex numbers
function stringToArray(inputString){
  let arr =inputString.trim();
      arr = arr.split(' ');
     let n = 0;
     arr.forEach(element => {
          arr[n] = element.replaceAll(' ','');
          n = n+1;
     });
     
     let fixedArray = [];
     fixedArray.length = arr.length / 4;
     console.log(`array length is ${fixedArray.length}`);
     
     let outerIndex = 0;
     for (let index = 0; index < fixedArray.length; index++) {
       // if Endian is different correct it here
      fixedArray[index] = arr[outerIndex]+arr[outerIndex+1]+arr[outerIndex+2]+arr[outerIndex+3];
      outerIndex +=4;
     }

     return fixedArray;
}

// parse HEX string numbrer to float number
function parseFloat(str) {
  var float = 0, sign, order, mantiss,exp,
      int = 0, multi = 1;
  if (/^0x/.exec(str)) {
    int = parseInt(str,16);
  }else{
    for (var i = str.length -1; i >=0; i -= 1) {
      if (str.charCodeAt(i)>255) {
        console.log('Wrong string parametr'); 
        return false;
      }
      int += str.charCodeAt(i) * multi;
      multi *= 256;
    }
  }
  sign = (int>>>31)?-1:1;
  exp = (int >>> 23 & 0xff) - 127;
  mantissa = ((int & 0x7fffff) + 0x800000).toString(2);
  for (i=0; i<mantissa.length; i+=1){
    float += parseInt(mantissa[i])? Math.pow(2,exp):0;
    exp--;
  }
  return float*sign;
}




