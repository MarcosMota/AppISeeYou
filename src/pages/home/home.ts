import { ResultPage } from './../result/result';
import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, Loading, ActionSheetController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AppService } from '../../app/app.service';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { File, FileEntry } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [AppService, CameraPreview]
})
export class HomePage {
    public base64Image: string;
    loading: Loading;
    lastImage: any;
    constructor(
        private cameraPreview: CameraPreview,
        private appService: AppService,
        public navCtrl: NavController,
        private camera: Camera,
        private alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        private transfer: FileTransfer,
        private file: File,
        private filePath: FilePath,
        public actionSheetCtrl: ActionSheetController,
        public toastCtrl: ToastController,
        private androidPermissions: AndroidPermissions) {
        this.androidPermissions.requestPermissions([
            this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
            this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
            this.androidPermissions.PERMISSION.MOUNT_FORMAT_FILESYSTEMS,

        ]);

    }

    ngAfterViewInit() {


    }

    tirarFoto() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.CAMERA,
            encodingType: this.camera.EncodingType.PNG,
            saveToPhotoAlbum: true
        }
        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            this.lastImage = imageData;
            this.uploadImage(imageData);

        }, (err) => {
            // Handle error
            debugger;
        });
    }
    handlerError() {
        let alert = this.alertCtrl.create({
            title: 'Problema de envio',
            subTitle: 'Não foi possivel enviar imagem',
            buttons: [
                {
                    text: 'Sair',
                    role: 'cancel',
                    handler: () => {
                        this.loading.dismiss();
                        //this.cameraPreview.show();
                    }
                },]
        });
        alert.present();

        //this.cameraPreview.hide();
    }

    private presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }

    // Always get the accurate path to your apps folder
    public pathForImage(img) {
        if (img === null) {
            return '';
        } else {
            return this.file.dataDirectory + img;
        }
    }

    public uploadImage(imageFileUri) {
        // this.error = null;
        this.loading = this.loadingCtrl.create({
            content: 'Buscando produtos...'
        });

        this.loading.present();


        this.file.resolveLocalFilesystemUrl(imageFileUri)
            .then(entry => (<FileEntry>entry).file(file => {
                this.readFile(file);
            })).catch(err => console.log(err));
    }

    private readFile(file: any) {

        const reader = new FileReader();
        reader.onloadend = () => {
            const formData = new FormData();
            const imgBlob = new Blob([reader.result], { type: file.type });
            formData.append('file', imgBlob, file.name);
            this.appService.postData(formData).then(response => {
                this.loading.dismissAll()
                this.presentToast('Image enviada com sucesso.');
            }).catch(error => {
                console.log(error)
                this.loading.dismissAll()
                this.presentToast('Problemas ao enviar.');
            });
        };
        reader.readAsArrayBuffer(file);
    }
}
