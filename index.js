const colorMode=document.getElementById('colorMode')
const colorInput=document.getElementById('colorInput')
const getColorButton=document.getElementById('getColorBtn')
const colorsContainer=document.getElementById('colors-container')
const copyMessage=document.getElementById('copyMessage')


const colorModesArray=['monochrome', 'monochrome-dark', 'monochrome-light', 'analogic' ,'complement' ,'analogic-complement', 'triad' ,'quad']

function getModeOptions(){
  let optionHtml=colorModesArray.map(item=>{
    return `<option>${item.charAt(0).toUpperCase()+item.slice(1)}</option> `
  })
  colorMode.innerHTML =optionHtml
}
getColorButton.addEventListener('click',renderColors)


function renderColors(){

  fetch(`https://www.thecolorapi.com/scheme?hex=${colorInput.value.slice(1)}&mode=${colorMode.value.toLowerCase()}`).then(res => res.json())
  .then(data => {
    let colorsHtml=``
    let colorsArray=[]
    for(color of data.colors){
      colorsArray.push(color.hex.value)
    }
    colorsHtml=colorsArray.map(item=>{
      return `
     <div onclick="clickboardCopy('${item}')">
      <div style='background-color:${item}' class="color"></div>
      <div class="hex">${item}</div>
      </div>
      `
    }).join('')
    colorsContainer.innerHTML =colorsHtml
  })

}
function clickboardCopy(item){
  navigator.clipboard.writeText(item)
  copyMessage.innerHTML=`${item} Copied To ClickBoard`
  copyMessage.style.display='block'
  setTimeout(()=>{
    copyMessage.style.display='none'
  },1700)
}
renderColors()
getModeOptions()