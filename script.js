const urlList = 'https://gist.githubusercontent.com/josejbocanegra/be0461060d1c2d899740b8247089ba22/raw/916d2141e32e04031bda79c8886e8e4df0ae7f24/productos.json';
const urlDetail = 'https://gist.githubusercontent.com/josejbocanegra/7b6febf87e9d986048a648487b35e693/raw/576531a2d0e601838fc3de997e021816a4b730f8/detallePedido.json';

let p = new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open('GET', urlList);
    req.onload = () => {
        if (req.status == 200)
            resolve(req.response);
        else
            reject(console.log(req.status));
    };
    req.send();
}).then( (resp) => new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open('GET', urlDetail);
    req.onload = () => {
        if (req.status == 200)
            resolve([resp, req.response]);
        else
            reject(console.log(req.status));
    };
    req.send();
})).then ( (reqs) => {
    let detailData = JSON.parse(reqs[1]);
    let productSales = {};
    let masPedido = [-1, -1];
    for (detail of detailData) {
        let cantidad = parseInt(detail.cantidad);
        let id = parseInt(detail.idproducto);
        if (productSales.hasOwnProperty(id)) 
            productSales[id] += cantidad;
        else 
            productSales[id] = cantidad;
        if (productSales[id] > masPedido[1])
            masPedido = [id, productSales[id]];
    }
    let listData = JSON.parse(reqs[0]);
    let i = 0;
    while (listData[i].idproducto != masPedido[0])
        i++;
    let name = listData[i].nombreProducto;
    let cant = masPedido[1];
    console.log(`Nombre del Producto: ${name}\nCantidad de Veces Pedido: ${cant}`)
})