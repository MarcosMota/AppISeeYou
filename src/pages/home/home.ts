import { ResultPage } from './../result/result';
import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, Loading } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AppService } from '../../app/app.service';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers:[AppService,CameraPreview]
})
export class HomePage {
    public base64Image: string;
    loading: Loading;

    constructor(
       private cameraPreview: CameraPreview,
       private appService: AppService,
        public navCtrl: NavController,
        private camera: Camera,
        private alertCtrl: AlertController,
        public loadingCtrl: LoadingController) {

    }

    ngAfterViewInit() {
        const cameraPreviewOpts: CameraPreviewOptions = {
            x: 0,
            y: 0,
            width: window.screen.width,
            height: window.screen.height,
            camera: 'rear',
            tapPhoto: true,
            previewDrag: true,
            toBack: true,
            alpha: 1
          };
          
          // start camera
          this.cameraPreview.startCamera(cameraPreviewOpts).then(
            (res) => {
              console.log(res)
            },
            (err) => {
              console.log(err)
            });
            
    }

    tirarFoto() {      
        const pictureOpts: CameraPreviewPictureOptions = {
            width: 1280,
            height: 1280,
            quality: 85
          }
        this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
            //this.picture = 'data:image/jpeg;base64,' + imageData;
             // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            this.cameraPreview.hide();
            let base64Image = 'data:image/jpeg;base64,' + imageData;
            this.processImage(base64Image);
          }, (err) => {
            console.log(err);
           // this.picture = 'assets/img/test.jpg';
          });  
        // const options: CameraOptions = {
        //     quality: 100,
        //     destinationType: this.camera.DestinationType.DATA_URL,
        //     encodingType: this.camera.EncodingType.JPEG,
        //     mediaType: this.camera.MediaType.PICTURE
        //   }
        // this.camera.getPicture(options).then((imageData) => {
        //     // imageData is either a base64 encoded string or a file URI
        //     // If it's base64:
        //     let base64Image = 'data:image/jpeg;base64,' + imageData;
        //     this.processImage(base64Image);
            
            
        //    }, (err) => {
        //     // Handle error
        //     debugger;
        //    });
    }
    
    processImage(image: any){
        this.loading = this.loadingCtrl.create({
            content: "Buscando produtos...",
            duration: 5000
        });
        this.loading.present();
        this.appService.sendImage(image)
        .subscribe(response => {
            this.loading.dismiss();
            this.cameraPreview.stopCamera();
            this.navCtrl.push(ResultPage,response);
        }
            ,
        error => this.handlerError())
        
    }

    handlerError(){
        let alert = this.alertCtrl.create({
            title: 'Problema de envio',
            subTitle: 'Não foi possivel enviar imagem',
            buttons: [
                {
                    text: 'Sair',
                    role: 'cancel',
                    handler: () => {
                        this.loading.dismiss();
                      this.cameraPreview.show();
                    }
                  },]
          });
          alert.present();
          
          this.cameraPreview.hide();
    }
}
