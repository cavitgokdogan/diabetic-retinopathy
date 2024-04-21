import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
import { PredictionResult } from '../models/predictionResult';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private predictionResult : PredictionResult | undefined;
  constructor() { }

  changePredictionResult(predictionResult: PredictionResult) {
    this.predictionResult = predictionResult;
  }

  getPredictionResult() : PredictionResult | undefined{
    return this.predictionResult;
  }
}
