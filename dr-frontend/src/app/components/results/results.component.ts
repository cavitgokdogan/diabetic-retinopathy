import { Component, ElementRef, ViewChild } from '@angular/core';
import { PredictionResult } from 'src/app/models/predictionResult';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  results : PredictionResult | undefined;

  message : string | undefined;
  alertClass : string | undefined;
  filename : string | undefined;
  binaryScore : number | undefined;
  binaryScoreFixed : string | undefined;
  responseTime : string | undefined;
  inferenceTime : string | undefined;
  preprocessedImage : string | undefined;
  originalImage : string | undefined;
  detectedType : string | undefined;

  constructor(private dataService : DataService) {
    this.results = this.dataService.getPredictionResult();

    if(this.results){
      let score = this.results.getPrediction_result();

      if(score){
        this.binaryScore = score[0];
        if(this.binaryScore >= 0.5){
          this.alertClass = "alert-danger";
          this.message = "Diabetic Retinopathy Detected!";
          
          let tempList = this.results.getMultiClassPredictionResult();
          // console.log(tempList);
          if(tempList){
            let index = this.getIndexOfMaxValue(tempList);
  
            if(index == 0){
              this.detectedType = "Mild";
            }
            else if(index == 1){
              this.detectedType = "Moderate";
            }
            else if(index == 2){
              this.detectedType = "Severe";
            }
            else if(index == 3){
              this.detectedType = "Proliferative DR";
            }
          }
        }
        else{
          this.alertClass = "alert-success";
          this.message = "Diabetic Retinopathy Not Detected!"
        }
        this.binaryScoreFixed = score[0].toString().slice(0,6);
      }

      this.filename = this.results.getFilename();
      this.inferenceTime = this.results.getInference_time()?.toFixed(3);
      this.responseTime = this.results.getResponse_time()?.toFixed(3);
      this.originalImage = this.results.getOriginal_Image();
      this.preprocessedImage = this.results.getPreprocessed_image();
    }
  }

  getIndexOfMaxValue(array : Array<number>) : number{
    let maxValue = array[0];
    let indexOfMaxValue = 0;

    for (let i = 1; i < array.length; i++) {
      if (array[i] > maxValue) {
        maxValue = array[i];
        indexOfMaxValue = i;
      }
  }

    return indexOfMaxValue;
  }
}
