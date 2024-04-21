import { HttpResponse } from '@angular/common/http';
import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { faTimes, faUpload } from '@fortawesome/free-solid-svg-icons';
import { PredictionResult } from 'src/app/models/predictionResult';
import { DataService } from 'src/app/services/data.service';
import { ImageService } from 'src/app/services/image.service';


@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})

export class UploadImageComponent {
  // file properties
  selectedFiles: FileList | null = null;
  currentFile: File | null = null;
  base64Image: string | null = null;
  change: any = null;
  message = '';
  status : boolean = false;
  filename : string = '';
  info : string = "File not selected"; // default value is "file not selected"

  // Font awesome icons
  uploadIcon = faUpload;
  timesIcon = faTimes;

  constructor(
    private imageService: ImageService,
    private router : Router,
    private dataServce : DataService
    ) {}

  onFileSelected(event: any) {
    if(this.change != null){
      this.message = '';

      this.selectedFiles = event.target.files;
      this.base64Image = null; // Reset the URL

      if(this.selectedFiles){
        const file: File | null = this.selectedFiles[0];
        
        if(file){
          this.filename = file.name;
          this.currentFile = file;

          const reader = new FileReader();

          reader.onload = (e: any) => {
            this.base64Image = reader.result as string;
            // console.log(this.base64Image)
          };

          reader.readAsDataURL(this.currentFile);
        }
      }
    }
  }

  uploadFile(): void {
    if(this.selectedFiles){
      const file: File | null = this.selectedFiles[0];

      if(file){
        this.currentFile = file;
        this.status = true;
        this.info = "Loading..."

        if(this.base64Image != '' || this.base64Image != null){
          this.imageService.upload(this.base64Image, this.filename).subscribe({
            next: (event: any) => {
              if(event instanceof HttpResponse){
                this.message = event.body.message;
                const predictionResult = new PredictionResult();
                
                if(event.body){
                  predictionResult.setOriginal_Image(event.body.original_image);
                  predictionResult.setMessage(event.body.message);
                  predictionResult.setResponse_time(event.body.response_time);
                  predictionResult.setFilename(event.body.filename);
                  predictionResult.setInference_time(event.body.inference_time)
                  predictionResult.setPrediction_result(event.body.prediction_result);
                  predictionResult.setPreprocessed_image(event.body.preprocessed_image);
                  predictionResult.setMultiClassPredictionResult(event.body.multiclass_prediction_result);

                  this.dataServce.changePredictionResult(predictionResult);
                  
                  this.status = false;
                  this.router.navigate(['/results']);
                }
              }
            },
            error: (err:any) =>{
              console.log(err);
  
              if(err.error && err.error.message){
                this.message = err.error.message;
              }else{
                this.message = 'Could not upload the image!';
              }
  
              this.currentFile = null;
            },
          })
        }
      }
      this.selectedFiles = null;
      this.change = null;
    }
  }

  /* SEND IMAGE AS A FILE WITH FORMDATA */

  // uploadFile(): void {
  //   this.progress = 0;

  //   if(this.selectedFiles){
  //     const file: File | null = this.selectedFiles[0];

  //     if(file){
  //       this.currentFile = file;

  //       this.imageService.upload(this.currentFile).subscribe(response => {
  //         console.log(response);
  //       })
  //     }
  //     this.selectedFiles = null;
  //   }
  // }

  /* SEND IMAGE AS A STRING IN BLOB FORMAT */

  // uploadFile(): void {
  //   this.progress = 0;

  //   if(this.selectedFiles){
  //     const file: File | null = this.selectedFiles[0];

  //     if(file){
  //       this.currentFile = file;
  //       if(this.base64Image == null){
  //         this.base64Image = "";
  //       }

  //       this.imageService.upload(this.base64Image).subscribe(response => {
  //         console.log(response);
  //       })
  //     }
  //     this.selectedFiles = null;
  //   }
  // }

  removeFile(){
    this.selectedFiles = null;
    this.currentFile = null;
    this.base64Image = null;
    this.change = null;
    this.message = '';
  }
}
