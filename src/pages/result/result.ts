import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
    selector: 'page-result',
    templateUrl: 'result.html'
})
export class ResultPage {

    result: any[] = [
        {
            "productID": 9220,
            "productName": "Energetico Tnt 269ml",
            "productURL": "http://lojamodelo.consinco.com.br/layout2/produto/9220/energetico-tnt-269ml",
            "productImage": "https://c5ecommercedevstorage.blob.core.windows.net/product/36816-energetico-tnt-269ml-m.jpg",
            "productImageCDN": "https://c5-ecommerce-dev-content.azureedge.net/product/36816-energetico-tnt-269ml-m.jpg",
            "productOldPrice": 4.04,
            "productSalePrice": 4.04,
            "showDiscount": false
        },
        {
            "productID": 2,
            "productName": "Energetico Red Bull 250ml Energy Drink",
            "productURL": "http://lojamodelo.consinco.com.br/layout2/produto/2/energetico-red-bull-250ml-energy-drink",
            "productImage": "https://c5ecommercedevstorage.blob.core.windows.net/product/4-energetico-red-bull-lata-250ml-m.jpg",
            "productImageCDN": "https://c5-ecommerce-dev-content.azureedge.net/product/4-energetico-red-bull-lata-250ml-m.jpg",
            "productOldPrice": 5.99,
            "productSalePrice": 5.45,
            "showDiscount": false
        },
        {
            "productID": 7540,
            "productName": "Cerveja Brahma Chopp 350ml Lata",
            "productURL": "http://lojamodelo.consinco.com.br/layout2/produto/7540/cerveja-brahma-chopp-350ml-lata",
            "productImage": "https://c5ecommercedevstorage.blob.core.windows.net/product/36829-cerveja-brahma-chopp-350ml-lata-m.jpg",
            "productImageCDN": "https://c5-ecommerce-dev-content.azureedge.net/product/36829-cerveja-brahma-chopp-350ml-lata-m.jpg",
            "productOldPrice": 1.39,
            "productSalePrice": 1.39,
            "showDiscount": false
        },
        {
            "productID": 12773,
            "productName": "Refrig.Coca Cola 350ml",
            "productURL": "http://lojamodelo.consinco.com.br/layout2/produto/12773/refrigcoca-cola-350ml",
            "productImage": "https://c5ecommercedevstorage.blob.core.windows.net/product/36831-refrigcoca-cola-350ml-m.jpg",
            "productImageCDN": "https://c5-ecommerce-dev-content.azureedge.net/product/36831-refrigcoca-cola-350ml-m.jpg",
            "productOldPrice": 1.29,
            "productSalePrice": 1.29,
            "showDiscount": false
        }
    ];
    constructor(public navCtrl: NavController) {

    }
}