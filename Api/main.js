function contenido()
{
    const URL='https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const imagen=document.getElementById('imagenRandom');
    const Nombre=document.getElementById('Nombre');
    const ID=document.getElementById('ID');
    const ingredientes=document.getElementById('ingredientes');
    const instruction=document.getElementById('intrucciones');
    fetch(URL)
        .then(response=>response.json())//pasamos el objeto a formato json
        .then(data =>{//informacion de la api
            console.log(data);
            const dataimg=data.drinks[0].strDrinkThumb;//lugar de la imagen
            const dataID=data.drinks[0].idDrink;//id de la bebida
            const dataName=data.drinks[0].strDrink;//nombre de la bebida
            const dataInstrucciones= data.drinks[0].strInstructions;//instrucciones

            imagen.src=dataimg;//agregamos en imagen la api
            Nombre.textContent='NOMBRE: '+dataName;
            ID.textContent='ID: '+dataID;
            instruction.textContent='Instrucciones: '+dataInstrucciones;

            let dataingrediente=[];//arreglo para guardar los ingredientes
            for(let i=1;i<=15;i++)
            {
                if(data.drinks[0][`strIngredient${i}`]!==null)//notacion de corchetes objeto[nombrePropiedad];
                {
                    dataingrediente.push(data.drinks[0][`strIngredient${i}`]);
                }
                
                //console.log(dataingrediente);
            }

            ingredientes.textContent='Ingredientes:'+dataingrediente;
            //favorites(); //si esta funcion se encuentra aca se duplican  ?????

        });
        //.catch(error => console.log('tipo de error', error));

    
}

function  random_buttom()
{
    const button=document.querySelector('button');
    button.addEventListener('click',contenido);
}

function favorites()//funcion para favoritos
{
    const favoritos=document.getElementById('favoritos');
    const aside=document.getElementById('elemFavs');
    let favs=[];
    aside.innerHTML = "";

    favoritos.addEventListener('click',()=>{

        const nam = document.createElement('span');
        const ide = document.createElement('span');
        const ingred=document.createElement('span');
        const intruc=document.createElement('p');
        const img = document.createElement('img');
        
        // Aplicar estilos para agregar espacio entre los elementos
        nam.style.display = 'block';
        ide.style.display = 'block';
        ingred.style.display = 'block';

        nam.textContent = document.getElementById("Nombre").innerText;
        ide.textContent = document.getElementById("ID").innerText;
        ingred.textContent=document.getElementById('ingredientes').innerText;
        intruc.textContent=document.getElementById('intrucciones').innerText;
        img.src = document.getElementById("imagenRandom").src;

        aside.appendChild(nam);
        aside.appendChild(ide);
        aside.appendChild(ingred);
        aside.appendChild(intruc);
        aside.appendChild(img);

        const elemfavo={//objeto para guardar los elementos favoritos
            name:nam.textContent,
            id:ide.textContent
        }
        favs.push(elemfavo);//lo agregamos a nuestro arreglo
        //console.log(elemfavo);
        localStorage.setItem('favoritos',JSON.stringify(favs));//convertimos el objeto a una cadena json

    })
}

window.onload = () =>{//sirve para cargar la ventana 
    contenido();//cargamos un primer elemento al documento
    random_buttom();
    favorites();//si pongo esta funcion aca no se duplican los elementos
}