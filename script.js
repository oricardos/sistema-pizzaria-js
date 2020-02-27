let modalQT = 1;
let cart = [];
let modalKey = 0;
let key;

const c = (el) => document.querySelector(el); // função
const cs = (el) => document.querySelectorAll(el);


pizzaJson.map((item, index) => {
    let pizzaItem = c('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);

    //informações das pizzas
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;    
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    //modal
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();

        key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQT = 1;

        modalKey = key;
        
        let pizzaModal = c('.pizzaWindowArea .pizzaInfo').cloneNode(true);
        //informações no modal
        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;

        //seleção do tamanho 
        c('.pizzaInfo--size.selected').classList.remove('selected');

        //tamanhos das pizzas
        cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if(sizeIndex == 2){
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });

        //quantidade do modal
        c('.pizzaInfo--qt').innerHTML = modalQT;
        
        //animação do modal
        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200);
    });

    c('.pizza-area').append(pizzaItem);
});

//Eventos do modal
function closeModal() {
    c('.pizzaWindowArea').style.opacity = 0;

    setTimeout(() => {
        c('.pizzaWindowArea').style.display = 'none';
    }, 200);
}
//fecha o modal
cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
})

//botão de menos
c('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if(modalQT > 1){
        modalQT--;
        c('.pizzaInfo--qt').innerHTML = modalQT;
    }
});
//botão de mais
c('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQT++;
    c('.pizzaInfo--qt').innerHTML = modalQT;
});
//seleciona o tamanho
cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', (e) => {
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
        if(sizeIndex == 0){
            c('.pizzaInfo--actualPrice').innerHTML = `R$ ${(pizzaJson[key].price - 5).toFixed(2) } `;
        } else if (sizeIndex == 1){
            c('.pizzaInfo--actualPrice').innerHTML = `R$ ${(pizzaJson[key].price - 3).toFixed(2) } `;
        }else {
            c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2) } `;
        }
    });    
});

//adicionar ao carrinho
c('.pizzaInfo--addButton').addEventListener('click', () => {
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));

    let identifier = pizzaJson[modalKey].id + '@' + size;

    let key = cart.findIndex((item) => item.identifier == identifier );

    if(key > -1){
        cart[key].qt += modalQT;
    } else {
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size,
            qt: modalQT
        });
    }    

    closeModal();
});