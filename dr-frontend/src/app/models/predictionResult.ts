export class PredictionResult {
  private _original_image : string | undefined;
  private _message: string | undefined;
  private _response_time: number | undefined;
  private _filename: string | undefined;
  private _inference_time: number | undefined;
  private _prediction_result: Array<number> | undefined;
  private _preprocessed_image: string | undefined;
  private _multiclass_prediction_result : Array<number> | undefined;

  
  getMultiClassPredictionResult() : Array<number> | undefined{
    return this._multiclass_prediction_result;
  }
  
  setMultiClassPredictionResult(value : Array<number>){
    this._multiclass_prediction_result = value;
  }
  
  getOriginal_Image() : string | undefined{
    return this._original_image;
  }

  setOriginal_Image(value: string) {
    this._original_image = value;
  }

  getMessage(): string | undefined {
    return this._message;
  }

  setMessage(value: string | undefined): void {
    this._message = value;
  }

  getResponse_time(): number | undefined {
    return this._response_time;
  }

  setResponse_time(value: number | undefined): void {
    this._response_time = value;
  }

  getFilename(): string | undefined {
    return this._filename;
  }

  setFilename(value: string | undefined): void {
    this._filename = value;
  }

  getInference_time(): number | undefined {
    return this._inference_time;
  }

  setInference_time(value: number | undefined): void {
    this._inference_time = value;
  }

  getPrediction_result(): Array<number> | undefined {
    return this._prediction_result;
  }

  setPrediction_result(value: Array<number> | undefined): void {
    this._prediction_result = value;
  }

  getPreprocessed_image(): string | undefined {
    return this._preprocessed_image;
  }

  setPreprocessed_image(value: string | undefined): void {
    this._preprocessed_image = value;
  }

  toString(): string {
    return `PredictionResult {
      message: ${this._message},
      response_time: ${this._response_time},
      filename: ${this._filename},
      inference_time: ${this._inference_time},
      prediction_result: ${this._prediction_result},
      preprocessed_image: ${this._preprocessed_image}
    }`;
  }
}

  